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
