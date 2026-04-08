import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

// Smart UI default styles (required for toolbar and editor to display correctly)
import "smart-webcomponents-react/source/styles/smart.default.css";

import "./SmartHealthCheckupEditor.scss";
import { HEALTH_CHECKUP_REPORT_TEMPLATE_HTML } from "../constants";
import { Spin } from "antd";
// Toolbar items matching current editor: format, font/size, color, case, block, alignment, lists, link, table, image, clear, code, fullscreen, undo/redo, sub/superscript, delete
const TOOLBAR_ITEMS = [
  "Bold",
  "Italic",
  "Underline",
  "StrikeThrough",
  "FontName",
  "FontSize",
  "FontColor",
  "BackgroundColor",
  "LowerCase",
  "UpperCase",
  "|",
  "Formats",
  "Alignment",
  "OrderedList",
  "UnorderedList",
  "Outdent",
  "Indent",
  "|",
  "hyperlink",
  "table",
  "Image",
  "|",
  "ClearFormat",
  "SourceCode",
  "FullScreen",
  "|",
  "Undo",
  "Redo",
  "subscript",
  "superscript",
  "delete",
];

function SmartHealthCheckupEditor(
  { value = "", onChange, readonly = false, className = "", toolbarItems = TOOLBAR_ITEMS, hideToolbar = true, toolbarSlotRef = null },
  ref
) {
  const containerRef = useRef(null);
  const [EditorComponent, setEditorComponent] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const valueRef = useRef(value);

  const resizeObserverRef = useRef(null);
  const timeoutIdsRef = useRef([]);

  useEffect(() => {
    return () => {
      resizeObserverRef.current?.disconnect();
      timeoutIdsRef.current.forEach(clearTimeout);
      timeoutIdsRef.current = [];
    };
  }, []);

  useImperativeHandle(ref, () => ({
    getHtml: () => {
      const container = containerRef.current;
      if (!container) return "";
      const native = container.querySelector?.("smart-editor") || container.firstElementChild;
      if (!native) return "";
      return native.value ?? native.innerHTML ?? "";
    },
    executeCommand: (commandName, valueArg) => {
      const container = containerRef.current;
      if (!container) return;
      const native = container.querySelector?.("smart-editor") || container.firstElementChild;
      if (native?.executeCommand) native.executeCommand(commandName, valueArg);
    },
    clearContent: () => {
      const container = containerRef.current;
      if (!container) return;
      const native = container.querySelector?.("smart-editor") || container.firstElementChild;
      if (native?.clearContent) native.clearContent();
    },
  }));

  useEffect(() => {
    let cancelled = false;
    import("smart-webcomponents-react/editor")
      .then((mod) => {
        if (cancelled) return;
        setEditorComponent(() => mod.Editor);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const handleChange = useCallback(
    (e) => {
      if (!onChange) return;
      const html = e?.detail?.value ?? e?.target?.value ?? e?.target?.innerHTML ?? "";
      onChange(html);
    },
    [onChange]
  );

  // Initial/controlled content (Editor supports value prop)
  const initialContent = value || HEALTH_CHECKUP_REPORT_TEMPLATE_HTML;


  // Force HTML paste handler for Microsoft Word content to avoid brackets/JSON formatting issues
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !EditorComponent) return;

    const queryNative = () => container.querySelector("smart-editor");

    const cleanWordHtml = (html) => {
      if (!html) return "";
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // 1. Unwrap problematic inline wrappers that fragment selection and block formatting
      const unwrapTags = Array.from(doc.querySelectorAll('*')).filter(el => {
        const tag = el.tagName.toLowerCase();
        return tag === 'span' || tag === 'font' || tag.includes(':');
      });

      unwrapTags.forEach(el => {
        const parent = el.parentNode;
        if (parent) {
          while (el.firstChild) {
            parent.insertBefore(el.firstChild, el);
          }
          parent.removeChild(el);
        }
      });

      // 2. Strip all remaining layout-locking attributes from structural elements (p, table, etc)
      const structuralElements = doc.querySelectorAll('*');
      structuralElements.forEach(el => {
        el.removeAttribute('style');
        el.removeAttribute('class');
        el.removeAttribute('id');
        el.removeAttribute('lang');
      });

      return doc.body.innerHTML;
    };

    const handlePaste = (e) => {
      const htmlData = e.clipboardData.getData("text/html");
      const textData = e.clipboardData.getData("text/plain");

      // Check for Word/structured paste or broken JSON list structure
      if (htmlData && (
        htmlData.toLowerCase().indexOf("microsoft") > -1 ||
        htmlData.toLowerCase().indexOf("office") > -1 ||
        htmlData.toLowerCase().indexOf("word") > -1 ||
        (textData && textData.trim().startsWith("[["))
      )) {
        // Prevent the editor's internal "smart" logic from firing at all
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const cleanedHtml = cleanWordHtml(htmlData);
        let native = queryNative();

        if (native && native.executeCommand) {
          native.executeCommand("insertHTML", cleanedHtml);
          // Move cursor to end of pasted content
          setTimeout(() => {
            native.focus();
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              range.collapse(false);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }, 0);
        } else {
          document.execCommand("insertHTML", false, cleanedHtml);
        }
      }
    };

    // Attach listeners recursively to both host and shadow root contents if available
    let retryCount = 0;
    const attachListeners = () => {
      const native = queryNative();
      if (!native) {
        if (retryCount < 10) {
          retryCount++;
          setTimeout(attachListeners, 200);
        }
        return;
      }

      // 1. Host listener
      native.addEventListener("paste", handlePaste, true);

      // 2. Try to find contenteditable inside shadow root
      if (native.shadowRoot) {
        const content = native.shadowRoot.querySelector(".smart-editor-content") ||
          native.shadowRoot.querySelector("[contenteditable]");
        if (content) {
          content.addEventListener("paste", handlePaste, true);
        }
      }
    };

    attachListeners();
    return () => {
      const native = queryNative();
      if (native) {
        native.removeEventListener("paste", handlePaste, true);
        if (native.shadowRoot) {
          const content = native.shadowRoot.querySelector(".smart-editor-content") ||
            native.shadowRoot.querySelector("[contenteditable]");
          if (content) content.removeEventListener("paste", handlePaste, true);
        }
      }
    };
  }, [EditorComponent]);

  if (loadError) {
    return (
      <div className={`smart-health-checkup-editor smart-health-checkup-editor--error ${className}`}>
        <p>Smart Editor could not be loaded. Using fallback.</p>
        <pre>{String(loadError.message)}</pre>
      </div>
    );
  }

  if (!EditorComponent || !initialContent) {
    return (
      <div className={`smart-health-checkup-editor smart-health-checkup-editor--loading ${className}`}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`smart-health-checkup-editor ${className}`} style={{ height: "auto" }}>
      <EditorComponent
        toolbarItems={toolbarItems}
        hideToolbar={hideToolbar}
        toolbarViewMode="multiRow"
        // onReady={handleReady}
        readonly={readonly}
        value={initialContent}
        onChange={handleChange}
        className="health-checkup-editor__document-body"
      />
    </div>
  );
}

export default React.forwardRef(SmartHealthCheckupEditor);
export { TOOLBAR_ITEMS };
