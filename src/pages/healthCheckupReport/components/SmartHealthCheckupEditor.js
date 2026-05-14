import React, { useCallback, useEffect, useImperativeHandle, useRef, useState, useMemo } from "react";
import JoditEditor from "jodit-react";
import "./SmartHealthCheckupEditor.scss";

const TOOLBAR_ITEMS = [
  "Bold", "Italic", "Underline", "StrikeThrough", "FontName", "FontSize",
  "FontColor", "BackgroundColor", "LowerCase", "UpperCase", "|",
  "Formats", "Alignment", "OrderedList", "UnorderedList", "Outdent", "Indent", "|",
  "hyperlink", "table", "Image", "|",
  "ClearFormat", "SourceCode", "FullScreen", "|",
  "Undo", "Redo", "subscript", "superscript", "delete"
];

function SmartHealthCheckupEditor(
  { value = "", onChange, readonly = false, className = "", toolbarItems = TOOLBAR_ITEMS, hideToolbar = true },
  ref
) {
  const joditRef = useRef(null);
  const containerRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const pasteActiveRef = useRef(false);
  const [internalValue, setInternalValue] = useState(value || "");

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!pasteActiveRef.current && value !== internalValue) {
      setInternalValue(value || "");
    }
  }, [value, internalValue]);

  const handleChange = useCallback((newContent) => {
    if (pasteActiveRef.current) return;
    setInternalValue(newContent);
    if (onChangeRef.current) {
      onChangeRef.current(newContent);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    getHtml: () => {
      return internalValue;
    },
    executeCommand: (commandName, valueArg) => {
      // Basic mapping to Jodit's execCommand if needed
      if (joditRef.current && joditRef.current.editor) {
        joditRef.current.editor.execCommand(commandName, false, valueArg);
      }
    },
    clearContent: () => {
      setInternalValue("");
    },
  }), [internalValue]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || readonly) return;
  }, [readonly]);

  const safeListInsert = useCallback((editor, listType) => {
    const current = editor.selection.current();
    if (!current) {
      editor.execCommand(listType === 'ul' ? 'insertUnorderedList' : 'insertOrderedList');
      return;
    }
    
    let box = current.nodeType === 3 ? current.parentNode : current;
    let tdNode = null;
    while (box && box !== editor.editor) {
      if (box.tagName === 'TD' || box.tagName === 'TH' || (box.classList && box.classList.contains('report-section-box'))) {
        tdNode = box;
        break;
      }
      box = box.parentNode;
    }

    if (tdNode) {
      const hasList = tdNode.querySelector(listType);
      if (hasList) {
        // Toggle OFF: convert all LIs to Ps
        const lis = Array.from(tdNode.querySelectorAll('li'));
        if (lis.length > 0) {
          tdNode.innerHTML = lis.map(li => `<p>${li.innerHTML}</p>`).join('');
        } else {
          tdNode.innerHTML = '<p><br></p>';
        }
      } else {
        const otherListType = listType === 'ul' ? 'ol' : 'ul';
        const hasOtherList = tdNode.querySelector(otherListType);
        if (hasOtherList) {
          // Switch type
          const lis = Array.from(tdNode.querySelectorAll('li'));
          tdNode.innerHTML = `<${listType}>${lis.map(li => `<li>${li.innerHTML}</li>`).join('')}</${listType}>`;
        } else {
          // Convert current content to list
          const pTags = Array.from(tdNode.querySelectorAll('p, div'));
          if (pTags.length > 0) {
            tdNode.innerHTML = `<${listType}>${pTags.map(p => `<li>${p.innerHTML}</li>`).join('')}</${listType}>`;
          } else {
            let inner = tdNode.innerHTML.trim();
            inner = inner.replace(/<span[^>]*data-jodit-selection_marker[^>]*>.*?<\/span>/gi, '');
            if (inner === '' || inner === '<br>' || inner === '&#8203;' || inner === '&ZeroWidthSpace;') {
              inner = '<br>';
            }
            tdNode.innerHTML = `<${listType}><li>${inner}</li></${listType}>`;
          }
        }
      }
      
      const target = tdNode.querySelector('li, p');
      if (target) {
        editor.selection.setCursorIn(target, false);
      } else {
        editor.selection.setCursorIn(tdNode, false);
      }
      return;
    }
    
    // Fallback
    editor.execCommand(listType === 'ul' ? 'insertUnorderedList' : 'insertOrderedList');
  }, []);

  const config = useMemo(() => ({
    readonly: readonly,
    toolbar: !hideToolbar,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    disablePlugins: "resizer,table-keyboard-navigation,add-new-line",
    cleanHTML: {
      fillEmptyParagraph: false,
      replaceNBSP: false,
    },
    buttons: [
      "bold", "italic", "underline", "strikethrough", "font", "fontsize", "brush", "eraser", "|",
      "ul", "ol", "outdent", "indent", "align", "|",
      "link", "table", "image", "|",
      "source", "fullsize", "|",
      "undo", "redo", "superscript", "subscript"
    ],
    width: '100%',
    minHeight: 800,
    height: 'auto',
    style: {
      background: "transparent",
    },
    controls: {
      ul: {
        command: 'insertUnorderedList',
        tags: ['ul'],
        tooltip: 'Insert Unordered List',
        exec: (editor) => safeListInsert(editor, 'ul')
      },
      ol: {
        command: 'insertOrderedList',
        tags: ['ol'],
        tooltip: 'Insert Ordered List',
        exec: (editor) => safeListInsert(editor, 'ol')
      }
    }
  }), [readonly, hideToolbar, safeListInsert]);

  return (
    <div ref={containerRef} className={`smart-health-checkup-editor ${className}`} style={{ height: "auto" }}>
      <JoditEditor
        ref={joditRef}
        value={internalValue}
        config={config}
        onBlur={handleChange} // Jodit recommends onBlur for performance, but onChange can be used too
        onChange={handleChange}
        className="health-checkup-editor__document-body"
      />
    </div>
  );
}

export default React.forwardRef(SmartHealthCheckupEditor);
export { TOOLBAR_ITEMS };
