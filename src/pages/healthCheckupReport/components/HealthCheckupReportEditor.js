import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { Button, message as antMessage } from "antd";
import html2canvas from "html2canvas";

import { HEALTH_CHECKUP_REPORT_TEMPLATE_HTML } from "../constants";
import { buildReportContentFromGroupedData } from "../utils/buildReportContentFromGroupedData";
import ApiHealthCheckupReport from "../../../api/services/ApiHealthCheckupReport";
import HealthCheckupDocument from "./HealthCheckupDocument";

import "./HealthCheckupReportEditor.scss";

/** Set to true to use Smart Web Components editor for the report body (HTML as source); save still uses TipTap JSON. Set false if smart-webcomponents-react is not installed or to use TipTap toolbar. */
const USE_SMART_EDITOR = true;

/**
 * Validates and cleans TipTap content to ensure it's valid
 * Deep clones to avoid mutating read-only objects
 * @param {Array} contentArray - Array of TipTap nodes
 * @param {boolean} isTopLevel - Whether this is top-level document content (text nodes not allowed)
 */
function validateAndCleanContent(contentArray, isTopLevel = true) {
  if (!Array.isArray(contentArray)) return [];

  return contentArray
    .filter((node) => {
      if (!node || typeof node !== "object" || !node.type) {
        console.warn("Invalid node (missing type):", node);
        return false;
      }

      // Text nodes must have a 'text' property
      if (node.type === "text") {
        if (typeof node.text !== "string") {
          console.warn("Text node missing text property:", node);
          return false;
        }
        // Text nodes are only invalid at document/table top level
        if (isTopLevel) {
          console.warn("Unwrapped text node at top level:", node);
          return false;
        }
      }

      return true;
    })
    .map((node) => {
      // Deep clone the node to avoid mutating read-only objects
      const clonedNode = JSON.parse(JSON.stringify(node));

      // Fix text nodes without text property
      if (clonedNode.type === "text" && typeof clonedNode.text !== "string") {
        clonedNode.text = "\u200B"; // Zero-width space
      }

      // Recursively validate nested content
      // Text nodes are allowed inside block elements (paragraphs, headings, etc.)
      if (clonedNode.content && Array.isArray(clonedNode.content)) {
        const allowTextNodes = [
          "paragraph",
          "heading",
          "listItem",
          "blockquote",
          "tableCell",
          "tableHeader",
        ].includes(clonedNode.type);
        clonedNode.content = validateAndCleanContent(
          clonedNode.content,
          !allowTextNodes,
        );
      }

      // Ensure paragraphs/headings have at least one text node
      if (["paragraph", "heading"].includes(clonedNode.type)) {
        if (!clonedNode.content || clonedNode.content.length === 0) {
          clonedNode.content = [{ type: "text", text: "\u200B" }];
        }
      }

      // Validate table structure
      if (clonedNode.type === "table" && clonedNode.content) {
        clonedNode.content = clonedNode.content.filter((row) => {
          if (row.type !== "tableRow") return false;
          if (row.content && Array.isArray(row.content)) {
            row.content = row.content.filter((cell) => {
              return cell.type === "tableCell" || cell.type === "tableHeader";
            });
          }
          return row.content && row.content.length > 0;
        });
      }

      return clonedNode;
    });
}

function HealthCheckupReportEditor({
  initialContent,
  initialHeader,
  editingReportId = null,
  onClose,
  onSave,
  onPreview,
  isSaving = false,
  groupedConsultationData = null,
  editable = true,
  reportDate = null,
  patient_data = null,
}) {

  const { profile } = useSelector((state) => state.doctors);

  const documentRef = useRef(null);

  const smartEditorRef = useRef(null);
  const toolbarSlotRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);

  // When USE_SMART_EDITOR: initial content is HTML from template or buildReportContentFromGroupedData (no TipTap getHTML)
  const initialHtmlWhenSmart = useMemo(() => {
    if (!USE_SMART_EDITOR) return "";
    if (groupedConsultationData) {
      return buildReportContentFromGroupedData(
        groupedConsultationData,
        patient_data,
        profile
      );
    }
    if (
      typeof initialContent === "string" &&
      initialContent.trim().startsWith("<")
    ) {
      return initialContent;
    }
    return HEALTH_CHECKUP_REPORT_TEMPLATE_HTML;
  }, [
    groupedConsultationData,
    patient_data,
    profile,
    initialContent,
  ]);

  // Set htmlContent when report is loaded (Smart editor path): from template/builder or from saved HTML
  useEffect(() => {
    if (!USE_SMART_EDITOR) return;
    setHtmlContent(initialHtmlWhenSmart);
  }, [initialHtmlWhenSmart]);

  /**
   * Generate thumbnail from document (first page, JPEG, good quality)
   * @returns {Promise<File|null>} - Thumbnail file or null if generation fails
   */
  const generateThumbnail = useCallback(async () => {
    if (!documentRef.current) return null;

    // Use the smart editor's internal container for exact boundaries, fallback to outer paper wrap
    const targetElement = documentRef.current.querySelector('.smart-editor-content-container') || documentRef.current;

    try {
      const canvas = await html2canvas(targetElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: targetElement.offsetWidth,
        height: Math.min(targetElement.offsetHeight, 1100), // Capture ~first page
      });

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], `thumbnail-${Date.now()}.jpg`, {
                type: "image/jpeg",
              });
              resolve(file);
            } else {
              resolve(null);
            }
          },
          "image/jpeg",
          0.85, // Good quality
        );
      });
    } catch (error) {
      console.error("Failed to generate thumbnail:", error);
      return null;
    }
  }, []);

  const handleSave = useCallback(async () => {
    if (typeof onSave !== "function") return;

    setIsGeneratingThumbnail(true);
    // Yield to the browser so the loading spinner actually renders before html2canvas freezes the main thread
    await new Promise(resolve => setTimeout(resolve, 50));

    let thumbnailUrl = null;

    try {
      // Step 1: Generate thumbnail
      const thumbnailFile = await generateThumbnail();

      // Step 2: Upload thumbnail (optional - don't fail if it fails)
      if (thumbnailFile) {
        try {
          const uploadResult =
            await ApiHealthCheckupReport.uploadThumbnail(thumbnailFile);

          if (uploadResult && uploadResult.thumbnail_file) {
            thumbnailUrl = uploadResult.thumbnail_file;
          }
        } catch (uploadError) {
          console.warn(
            "Thumbnail upload failed, proceeding without thumbnail:",
            uploadError,
          );
        }
      }

      // Step 4: Call onSave with document and thumbnail URL
      const html = smartEditorRef.current?.getHtml?.() ?? htmlContent;

      onSave({
        id: editingReportId,
        html,
        thumbnailUrl,
      });
    } catch (error) {
      console.error("Save failed:", error);
      antMessage.error("Failed to save report");
    } finally {
      setIsGeneratingThumbnail(false);
    }
  }, [
    onSave,
    editingReportId,
    generateThumbnail,
    htmlContent,
  ]);

  return (
    <div
      className={`health-checkup-editor health-checkup-editor--drawer`}
    >
      {<header className="health-checkup-editor__header">
        <div className="health-checkup-editor__header-left">
          <button
            type="button"
            className="health-checkup-editor__back"
            onClick={onClose}
            aria-label="Back"
          >
            <i className="icon-right"></i>
          </button>
          <h2 className="health-checkup-editor__header-title">
            Health Check-up Report
          </h2>
        </div>
        <div className="health-checkup-editor__header-right">
          <Button
            type="primary"
            className="health-checkup-editor__save-btn"
            loading={isSaving || isGeneratingThumbnail}
            onClick={handleSave}
            disabled={isSaving || isGeneratingThumbnail}
          >
            {isSaving || isGeneratingThumbnail ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>}

      <div
        className="health-checkup-editor__document-wrap"
      >
        <HealthCheckupDocument
          documentRef={documentRef}
          editable={editable}
          useSmartEditor={USE_SMART_EDITOR}
          smartEditorHtml={htmlContent}
          onSmartEditorChange={setHtmlContent}
          smartEditorRef={smartEditorRef}
          hideSmartToolbar={false}
          toolbarSlotRef={USE_SMART_EDITOR ? toolbarSlotRef : null}
        />
      </div>
    </div>
  );
}

export default React.memo(HealthCheckupReportEditor);
