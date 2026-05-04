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
  { value = "", onChange, readonly = false, className = "", toolbarItems = TOOLBAR_ITEMS, hideToolbar = true },
  ref
) {
  const containerRef = useRef(null);
  const [EditorComponent, setEditorComponent] = useState(null);
  const [loadError, setLoadError] = useState(null);


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

  // Keep paste behavior scoped to this editor and use editor commands
  // so internal selection/caret state stays consistent.
  const sanitizePastedHtml = useCallback((html) => {
    if (!html) return "";
    const SAFE_TAGS = new Set([
      "p",
      "br",
      "b",
      "strong",
      "i",
      "em",
      "u",
      "s",
      "strike",
      "del",
      "ul",
      "ol",
      "li",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "pre",
      "code",
      "a",
      "sub",
      "sup",
    ]);
    const SAFE_ATTRS = new Set(["href", "target", "colspan", "rowspan"]);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const removeComments = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.COMMENT_NODE) node.removeChild(child);
        else removeComments(child);
      });
    };
    removeComments(doc.body);

    let keepGoing = true;
    while (keepGoing) {
      keepGoing = false;
      for (const el of Array.from(doc.body.querySelectorAll("*"))) {
        if (!SAFE_TAGS.has(el.tagName.toLowerCase())) {
          const parent = el.parentNode;
          if (!parent) continue;
          while (el.firstChild) parent.insertBefore(el.firstChild, el);
          parent.removeChild(el);
          keepGoing = true;
        }
      }
    }

    for (const el of Array.from(doc.body.querySelectorAll("*"))) {
      const toRemove = Array.from(el.attributes)
        .map((a) => a.name)
        .filter((n) => !SAFE_ATTRS.has(n.toLowerCase()));
      toRemove.forEach((a) => el.removeAttribute(a));
    }

    return doc.body.innerHTML;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !EditorComponent) return;

    const queryNative = () =>
      container.querySelector("smart-editor") || container.firstElementChild;

    const toHtmlFromPlainText = (text) =>
      (text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\r\n|\r|\n/g, "<br>");

    const toPlainTextFromHtml = (html) => {
      if (!html) return "";
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const blockLike = new Set([
        "p",
        "div",
        "li",
        "tr",
        "td",
        "th",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "pre",
      ]);

      let out = "";
      const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          out += node.textContent || "";
          return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const tag = node.tagName.toLowerCase();
        if (tag === "br") {
          out += "\n";
          return;
        }
        const isBlock = blockLike.has(tag);
        Array.from(node.childNodes).forEach(walk);
        if (isBlock && out && !out.endsWith("\n")) out += "\n";
      };

      Array.from(doc.body.childNodes).forEach(walk);
      return out.replace(/\n{3,}/g, "\n\n").trim();
    };

    let cleanup = () => {};
    let attempts = 0;
    const bindListeners = () => {
      const native = queryNative();
      const editable =
        native?.shadowRoot?.querySelector(".smart-editor-editable") ||
        native?.shadowRoot?.querySelector("[contenteditable='true']") ||
        native?.querySelector(".smart-editor-editable") ||
        native?.querySelector("[contenteditable='true']");

      if (!native || !editable) return false;

      const getActiveSelection = () =>
        native.shadowRoot?.getSelection?.() || window.getSelection();

      const getSectionBoxFromSelection = (selection) => {
        if (!selection || selection.rangeCount === 0) return null;
        const range = selection.getRangeAt(0);
        const node = range.commonAncestorContainer;
        const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
        if (!element) return null;
        return element.closest?.(".report-section-box") || null;
      };

      const insertPlainTextWithinSectionBox = (text, sectionBox) => {
        const selection = getActiveSelection();
        if (!selection || selection.rangeCount === 0 || !sectionBox) return false;
        const range = selection.getRangeAt(0);
        const ancestor = range.commonAncestorContainer;
        const inSameBox = sectionBox.contains(
          ancestor.nodeType === Node.ELEMENT_NODE ? ancestor : ancestor.parentNode,
        );
        if (!inSameBox) return false;

        range.deleteContents();
        const lines = String(text || "").split(/\r\n|\r|\n/);
        const frag = document.createDocumentFragment();
        lines.forEach((line, idx) => {
          frag.appendChild(document.createTextNode(line));
          if (idx < lines.length - 1) frag.appendChild(document.createElement("br"));
        });

        const lastNode = frag.lastChild;
        range.insertNode(frag);

        if (lastNode) {
          const newRange = document.createRange();
          if (lastNode.nodeType === Node.TEXT_NODE) {
            newRange.setStart(lastNode, lastNode.textContent?.length || 0);
          } else {
            newRange.setStartAfter(lastNode);
          }
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
        return true;
      };

      const handlePaste = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const textData = e.clipboardData?.getData("text/plain") || "";
        const htmlData = e.clipboardData?.getData("text/html") || "";
        const htmlAsText = toPlainTextFromHtml(htmlData);
        const plainTextLooksTruncated =
          Boolean(htmlAsText) &&
          (textData.trim().length === 0 || textData.trim().length < Math.min(8, htmlAsText.trim().length)) &&
          /<br[\s/]*>|<\/(p|div|li|tr|td|th|h[1-6]|blockquote|pre)>/i.test(htmlData);
        const preferredText = plainTextLooksTruncated ? htmlAsText : textData;
        const payload = preferredText
          ? toHtmlFromPlainText(preferredText)
          : sanitizePastedHtml(htmlData);

        if (!payload) return;

        const activeSelection = getActiveSelection();
        const activeSectionBox = getSectionBoxFromSelection(activeSelection);
        if (activeSectionBox && preferredText) {
          if (insertPlainTextWithinSectionBox(preferredText, activeSectionBox)) {
            return;
          }
        }

        const insertWithRangeFallback = () => {
          const selection =
            native.shadowRoot?.getSelection?.() || window.getSelection();
          if (!selection || selection.rangeCount === 0) return false;
          const range = selection.getRangeAt(0);
          if (!editable.contains(range.commonAncestorContainer)) return false;

          range.deleteContents();
          const frag = range.createContextualFragment(payload);
          const lastNode = frag.lastChild;
          range.insertNode(frag);

          if (lastNode) {
            const newRange = document.createRange();
            if (lastNode.nodeType === Node.TEXT_NODE) {
              newRange.setStart(lastNode, lastNode.textContent?.length || 0);
            } else {
              newRange.selectNodeContents(lastNode);
              newRange.collapse(false);
            }
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
          return true;
        };

        // Keep editor model + caret in sync by preferring editor commands first.
        editable.focus();
        if (typeof native.executeCommand === "function") {
          const commandCandidates = ["insertHTML", "insertHtml", "insertText"];
          for (const command of commandCandidates) {
            try {
              native.executeCommand(command, payload);
              return;
            } catch (_) {
              // try next command
            }
          }
        }

        if (typeof document.execCommand === "function") {
          const ok =
            document.execCommand("insertHTML", false, payload) ||
            document.execCommand("insertText", false, payload.replace(/<br\s*\/?>/gi, "\n"));
          if (ok) return;
        }

        insertWithRangeFallback();
      };

      editable.addEventListener("paste", handlePaste, { capture: true });
      cleanup = () => editable.removeEventListener("paste", handlePaste, { capture: true });
      return true;
    };

    const timer = setInterval(() => {
      attempts += 1;
      if (bindListeners() || attempts > 40) clearInterval(timer);
    }, 120);

    return () => {
      clearInterval(timer);
      cleanup();
    };
  }, [EditorComponent, sanitizePastedHtml]);

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
        editMode="html"
        readonly={readonly}
        value={initialContent}
        onChange={handleChange}
        className="health-checkup-editor__document-body"
        autoSuggest={false}
      />
    </div>
  );
}

export default React.forwardRef(SmartHealthCheckupEditor);
export { TOOLBAR_ITEMS };
