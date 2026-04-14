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

  // Fix Cmd+A / Ctrl+A collapsing styled content to plain text.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !EditorComponent) return;

    const queryNative = () => container.querySelector("smart-editor");

    const handleSelectAll = (e) => {
      const isSelectAll = (e.metaKey || e.ctrlKey) && (e.key === "a" || e.keyCode === 65);
      if (!isSelectAll) return;

      const native = queryNative();
      if (!native) return;

      const editable = native.shadowRoot?.querySelector(".smart-editor-editable") ||
                       native.querySelector(".smart-editor-editable") ||
                       native.shadowRoot?.querySelector("[contenteditable='true']") ||
                       native.querySelector("[contenteditable='true']");
      
      if (editable) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        // Use text node boundaries instead of the container element.
        // This makes the selection look like a manual mouse drag, bypassing the editor's 
        // internal 'Select All' block-conversion logic which fires when anchorNode is the container.
        const getFirstText = (node) => {
          if (node.nodeType === 3 && node.textContent.trim().length > 0) return node;
          for (let i = 0; i < (node.childNodes?.length || 0); i++) {
             const res = getFirstText(node.childNodes[i]);
             if (res) return res;
          }
          return null;
        };

        const getLastText = (node) => {
          if (node.nodeType === 3 && node.textContent.trim().length > 0) return node;
          for (let i = (node.childNodes?.length || 0) - 1; i >= 0; i--) {
             const res = getLastText(node.childNodes[i]);
             if (res) return res;
          }
          return null;
        };

        try {
          editable.focus();
          const firstText = getFirstText(editable) || editable;
          const lastText = getLastText(editable) || editable;

          const selection = window.getSelection();
          const range = document.createRange();
          
          if (firstText === editable) {
            range.selectNodeContents(editable);
          } else {
            range.setStart(firstText, 0);
            range.setEnd(lastText, lastText.nodeType === 3 ? lastText.textContent.length : lastText.childNodes.length);
          }
          
          selection.removeAllRanges();
          selection.addRange(range);
        } catch (err) {
          console.error("Advanced manual selection failed", err);
        }
      }
    };

    const tryPatchNative = () => {
      const native = queryNative();
      if (!native) return false;

      const editable = native.shadowRoot?.querySelector(".smart-editor-editable") ||
                       native.querySelector(".smart-editor-editable");
      
      if (editable) {
        editable.addEventListener("keydown", handleSelectAll, { capture: true });
        
        const safeSelectAll = function() {
           handleSelectAll({ 
             metaKey: true, key: 'a', 
             preventDefault: () => {}, stopPropagation: () => {}, stopImmediatePropagation: () => {} 
           });
        };

        // Suppress editor's internal selectAll overrides completely
        ['selectAll', '_selectAll', '_selectAllClick', '_selectAllHandler'].forEach(m => {
          native[m] = safeSelectAll;
        });
        
        // Also prevent the standard document.execCommand('selectAll') from bubbling into the editor
        editable.addEventListener("selectall", (e) => {
          e.preventDefault();
          e.stopPropagation();
          safeSelectAll();
        }, { capture: true });

        return true;
      }
      return false;
    };

    let retryCount = 0;
    const interval = setInterval(() => {
      if (tryPatchNative() || retryCount > 50) {
        clearInterval(interval);
      }
      retryCount++;
    }, 150);

    window.addEventListener("keydown", handleSelectAll, { capture: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleSelectAll, { capture: true });
    };
  }, [EditorComponent]);

  // Intercept ALL paste events to prevent the editor's native paste handler from
  // restructuring the document and stripping CSS classes from the report template.
  //
  // KEY INSIGHT: The Smart editor registers its paste handler at window/document level
  // with capture:true, so attaching to the element or shadow root fires too late.
  // We must register at window capture to beat it, and use direct Range DOM insertion
  // (not executeCommand / native.executeCommand) to bypass the editor's block-wrapping pipeline.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !EditorComponent) return;

    const queryNative = () => container.querySelector("smart-editor");

    // Tags that are safe to preserve in pasted content
    const SAFE_TAGS = new Set([
      'p', 'br', 'b', 'strong', 'i', 'em', 'u', 's', 'strike', 'del',
      'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code', 'a',
      'sub', 'sup',
    ]);
    // Attributes that are safe to keep on pasted elements
    const SAFE_ATTRS = new Set(['href', 'target', 'colspan', 'rowspan']);

    /**
     * Sanitize arbitrary clipboard HTML into clean, minimal markup:
     * - Remove Word/Office comment blocks (<!--[if ...]>...<![endif]-->)
     * - Unwrap vendor-specific wrapper elements (span, font, o:p, w:t, mso:*, etc.)
     *   while preserving their text content.
     * - Strip all inline styles, Word/Office classes, and non-essential attributes.
     * - Flatten any unsupported tags to plain text.
     */
    const sanitizePastedHtml = (html) => {
      if (!html) return "";
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Step 1 – Remove comment nodes (Word <!--[if ...]>...<![endif]--> junk)
      const removeComments = (node) => {
        Array.from(node.childNodes).forEach((child) => {
          if (child.nodeType === Node.COMMENT_NODE) {
            node.removeChild(child);
          } else {
            removeComments(child);
          }
        });
      };
      removeComments(doc.body);

      // Step 2 – Unwrap any element NOT in SAFE_TAGS, bottom-up loop handles nesting
      let keepGoing = true;
      while (keepGoing) {
        keepGoing = false;
        for (const el of Array.from(doc.body.querySelectorAll('*'))) {
          if (!SAFE_TAGS.has(el.tagName.toLowerCase())) {
            const parent = el.parentNode;
            if (parent) {
              while (el.firstChild) parent.insertBefore(el.firstChild, el);
              parent.removeChild(el);
              keepGoing = true;
            }
          }
        }
      }

      // Step 3 – Strip all unsafe attributes from remaining elements
      for (const el of Array.from(doc.body.querySelectorAll('*'))) {
        const toRemove = Array.from(el.attributes)
          .map((a) => a.name)
          .filter((n) => !SAFE_ATTRS.has(n.toLowerCase()));
        toRemove.forEach((a) => el.removeAttribute(a));
      }

      return doc.body.innerHTML;
    };

    /**
     * Locate the shadow-DOM contenteditable surface and the host element.
     */
    const getEditorParts = () => {
      const native = queryNative();
      if (!native) return { native: null, editable: null };
      const editable =
        native.shadowRoot?.querySelector(".smart-editor-editable") ||
        native.shadowRoot?.querySelector("[contenteditable='true']") ||
        native.querySelector(".smart-editor-editable") ||
        native.querySelector("[contenteditable='true']");
      return { native, editable };
    };

    /**
     * Returns true when focus / selection is inside our editor's editable surface.
     * The editable lives in a shadow root, so document.activeElement == host element;
     * shadowRoot.activeElement gives the actual focused node.
     */
    const isEditorFocused = () => {
      const { native, editable } = getEditorParts();
      if (!native || !editable) return false;
      if (native.shadowRoot?.activeElement === editable) return true;
      const sel = window.getSelection();
      if (sel?.rangeCount > 0) {
        return editable.contains(sel.getRangeAt(0).commonAncestorContainer);
      }
      return false;
    };

    /**
     * Insert sanitized HTML at the current cursor position by directly manipulating
     * the DOM via the Range API — completely bypassing the editor's paste pipeline
     * which wraps content in its own <div data-block-id class="smart-editor-block">.
     */
    const insertAtCursor = (html) => {
      const { editable } = getEditorParts();
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || !editable) return;

      const range = sel.getRangeAt(0);
      if (!editable.contains(range.commonAncestorContainer)) return;

      range.deleteContents();

      const frag = range.createContextualFragment(html);
      const lastNode = frag.lastChild;
      range.insertNode(frag);

      // Place cursor just after inserted content
      if (lastNode) {
        try {
          const newRange = document.createRange();
          newRange.setStartAfter(lastNode);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
        } catch (_) {
          range.collapse(false);
        }
      }
    };

    /**
     * Master paste handler registered at window-capture — fires before the Smart
     * editor's own window/document-level capture listeners.
     */
    const handlePaste = (e) => {
      if (!isEditorFocused()) return; // only intercept when inside our editor

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const htmlData = e.clipboardData?.getData("text/html") || "";
      const textData = e.clipboardData?.getData("text/plain") || "";

      let contentToInsert;
      if (htmlData) {
        contentToInsert = sanitizePastedHtml(htmlData);
      } else if (textData) {
        // Plain-text paste: escape HTML special chars and convert newlines to <br>
        contentToInsert = textData
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\n/g, "<br>");
      } else {
        return; // Nothing in clipboard
      }

      // Insert directly via Range API — bypasses the editor's block-wrapping pipeline
      insertAtCursor(contentToInsert);
    };

    /**
     * Block `beforeinput` with inputType "insertFromPaste" — modern browsers fire this
     * before the paste event and the Smart editor uses it to trigger its block-replace logic.
     */
    const handleBeforeInput = (e) => {
      if (
        e.inputType === "insertFromPaste" ||
        e.inputType === "insertFromPasteAsQuotation"
      ) {
        if (isEditorFocused()) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      }
    };

    // Register at window-capture level — fires before any element-level or
    // document-level handler the Smart editor may have installed.
    window.addEventListener("paste", handlePaste, { capture: true });
    window.addEventListener("beforeinput", handleBeforeInput, { capture: true });

    return () => {
      window.removeEventListener("paste", handlePaste, { capture: true });
      window.removeEventListener("beforeinput", handleBeforeInput, { capture: true });
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
        editMode="html"
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
