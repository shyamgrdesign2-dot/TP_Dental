import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Button, Drawer, message } from "antd";
import { saveAs } from "file-saver";

import DrawingCanvasEmptyState from "./components/DrawingCanvasEmptyState";
import DrawingCanvasCard from "./components/DrawingCanvasCard";
import ExcalidrawEditor from "./components/ExcalidrawEditor";
import TemplatesDrawer from "./components/TemplatesDrawer";
import SaveTemplateDrawer from "./components/SaveTemplateDrawer";
import CanvasPreview from "./components/CanvasPreview";
import { 
  createCustomCanvas, 
  linkCanvasToPatient, 
  editMapping,
  getShowCanvasPopup,
  setShowCanvasPopup
} from "./service";

import "./DrawingCanvas.scss";

const DrawingCanvas = ({
  patientId = null,
  tcmId = null,
  canvases = [],
  rxDrawingCanvasIds = [],
  onToggleRx = () => {},
  onCreateCanvas = () => {},
  onSave = () => {},
  onClose = null,
  onKnowMore = () => {},
}) => {
  const emptyScene = { elements: [], appState: {}, files: {} };
  const fromProps = Array.isArray(canvases) && canvases.length > 0;

  const [editorOpen, setEditorOpen] = useState(false);
  const [editorCanvasId, setEditorCanvasId] = useState(null);
  const [internalCanvases, setInternalCanvases] = useState(canvases || []);
  const [templateDrawerOpen, setTemplateDrawerOpen] = useState(false);
  const [shouldShowPreview, setShouldShowPreview] = useState(false);
  const [previewCanvasId, setPreviewCanvasId] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [templateTrigger, setTemplateTrigger] = useState(0);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [saveTemplateDrawerOpen, setSaveTemplateDrawerOpen] = useState(false);
  const excalidrawApiRef = useRef(null);

  const hasCanvases = Array.isArray(internalCanvases) && internalCanvases.length > 0;

  const editorInitialShowInRx = useMemo(() => {
    if (editorCanvasId === "new" || editorCanvasId == null) return true;
    return rxDrawingCanvasIds.some((id) => String(id) === String(editorCanvasId));
  }, [editorCanvasId, rxDrawingCanvasIds]);

  useEffect(() => {
    setInternalCanvases(prev => {
      if (!Array.isArray(canvases)) return prev;
      return canvases.map(newCanvas => {
        const existing = prev.find(p => p.id === newCanvas.id);
        if (existing && existing.scene) {
          return { ...newCanvas, scene: existing.scene };
        }
        return newCanvas;
      });
    });
  }, [canvases]);
  
  useEffect(() => {
    const fetchMetadata = async () => {
      const res = await getShowCanvasPopup();
      if (res.status && typeof res.isCanvasPopup !== 'undefined') {
        setIsFirstTimeUser(res.isCanvasPopup);
      }
    };
    fetchMetadata();
  }, []);

  const openEditorForCanvas = useCallback(async (canvasId) => {
    // If scene is missing but we have a url, fetch it
    const canvas = internalCanvases.find(c => c.id === canvasId);
    if (canvas && !canvas.scene && canvas.url) {
      try {
        const res = await fetch(canvas.url);
        const sceneData = await res.json();
        setInternalCanvases(prev => prev.map(c => c.id === canvasId ? { ...c, scene: sceneData } : c));
      } catch (err) {
        console.error("Failed to load scene from url", err);
      }
    }
    setEditorCanvasId(canvasId);
    setEditorOpen(true);
  }, [internalCanvases]);

  const previewCanvas = useCallback(async (canvas) => {
    if (!canvas.scene && canvas.url) {
      try {
        const res = await fetch(canvas.url);
        const sceneData = await res.json();
        setInternalCanvases(prev => prev.map(c => c.id === canvas.id ? { ...c, scene: sceneData } : c));
      } catch (err) {
        console.error("Failed to load scene from url", err);
      }
    }
    setPreviewCanvasId(canvas?.id);
    setShouldShowPreview(true);
  }, []);

  const handleDuplicate = useCallback((canvas) => {
    const newCanvas = { ...canvas, id: Date.now().toString(), name: `${canvas.name || canvas.title} (Copy)` };
    const updated = [...internalCanvases, newCanvas];
    setInternalCanvases(updated);
    if (typeof onSave === "function") onSave(updated);
  }, [internalCanvases, onSave]);

  const handleDelete = useCallback((canvas) => {
    const updated = internalCanvases.filter(c => c.id !== canvas.id);
    setInternalCanvases(updated);
    if (typeof onSave === "function") onSave(updated);
  }, [internalCanvases, onSave]);

  const handleRename = useCallback((canvas, newName) => {
    const updated = internalCanvases.map(c => c.id === canvas.id ? { ...c, name: newName } : c);
    setInternalCanvases(updated);
    if (typeof onSave === "function") onSave(updated);
  }, [internalCanvases, onSave]);

  const openEditorForNewCanvas = useCallback(async () => {
    if (isFirstTimeUser) {
      await setShowCanvasPopup(false);
      setIsFirstTimeUser(false);
    }
    setEditorCanvasId("new");
    setEditorOpen(true);
    if (typeof onCreateCanvas === "function") onCreateCanvas();
  }, [onCreateCanvas, isFirstTimeUser]);

  const handleCloseEditor = useCallback(() => {
    setEditorOpen(false);
    setTemplateData(null);
    setTemplateTrigger(0);
    setEditorCanvasId(null);
    setSaveTemplateDrawerOpen(false);
    excalidrawApiRef.current = null;
  }, []);

  const handleOpenSaveTemplateDrawer = useCallback(() => {
    setSaveTemplateDrawerOpen(true);
  }, []);

  const handleCloseSaveTemplateDrawer = useCallback(() => {
    setSaveTemplateDrawerOpen(false);
  }, []);

  const getExcalidrawApi = useCallback(() => excalidrawApiRef.current, []);

  const handleEditorSave = useCallback(
    async (payload, canvasTitle, saveMeta = {}) => {
      if (!editorCanvasId) return false;

      const showInRxValue = saveMeta?.showInRx !== false;

      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
      const file = new File([blob], `${canvasTitle || 'new_canvas'}.json`, { type: "application/json" });

      if (editorCanvasId === "new") {
          const linkRes = await linkCanvasToPatient(canvasTitle || "New Canvas", file, patientId, tcmId);
          if (linkRes.status === true) {
              const mappingId =
                linkRes.mapping_id ??
                linkRes.mappingId ??
                linkRes?.data?.mapping_id;
              if (typeof onSave === "function") {
                if (mappingId != null && mappingId !== "") {
                  onSave(null, { mappingId, showInRx: showInRxValue });
                } else {
                  onSave();
                }
              }
              message.open({
                type: "success",
                content: "Canvas saved successfully",
                style: { zIndex: 5000 },
                duration: 3,
              });
              handleCloseEditor();
              return true;
          }
          message.open({
            type: "error",
            content: linkRes.message || "Failed to save canvas",
            style: { zIndex: 5000 },
            duration: 4,
          });
          return false;
      }
      const editRes = await editMapping(editorCanvasId, file);
      if (editRes.status === true) {
          if (typeof onSave === "function") {
            onSave(null, { mappingId: editorCanvasId, showInRx: showInRxValue });
          }
          message.open({
            type: "success",
            content: "Canvas saved successfully",
            style: { zIndex: 5000 },
            duration: 3,
          });
          handleCloseEditor();
          return true;
      }
      message.open({
        type: "error",
        content: editRes.message || "Failed to save canvas",
        style: { zIndex: 5000 },
        duration: 4,
      });
      return false;
    },
    [editorCanvasId, patientId, tcmId, onSave, handleCloseEditor]
  );

  const handleTemplatesToggle = useCallback(() => {
    setTemplateDrawerOpen(prev => !prev);
  }, []);

  const handleSelectTemplate = useCallback(async (template) => {
    if (!editorCanvasId) return;

    const templateUrl = template?.canvas_url || template?.url;
    const templateFileType = String(template?.file_type || "").toLowerCase();
    const isImageTemplate = ["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(templateFileType);

    if (isImageTemplate && templateUrl) {
      setTemplateData({
        templateType: "image",
        url: templateUrl,
        name: template?.name || "Template image",
        fileType: templateFileType,
      });
      setTemplateTrigger(prev => prev + 1);
      setTemplateDrawerOpen(false);
      return;
    }

    let templateScene = null;
    if (templateUrl) {
        try {
            const res = await fetch(templateUrl);
            templateScene = await res.json();
        } catch(e) {
            console.error("Error fetching template", e);
        }
    }

    if (!templateScene) templateScene = emptyScene;

    setTemplateData(templateScene);
    setTemplateTrigger(prev => prev + 1);
    setTemplateDrawerOpen(false);
  }, [editorCanvasId, emptyScene]);

  const handleSaveTemplateWrapper = useCallback(async (payload, canvasTitle) => {
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const file = new File([blob], `${canvasTitle || "new_template"}.json`, { type: "application/json" });

    const res = await createCustomCanvas(canvasTitle || "New Template", file);
    if (res.status === true) {
      return true;
    }
    message.open({
      type: "error",
      content: res.message || "Template save failed",
      style: { zIndex: 5000 },
      duration: 4,
    });
    console.error("Template save failed", res.message);
    return false;
  }, []);

  const editorInitialData = useMemo(() => {
    if (!editorCanvasId) return emptyScene;
    const c = internalCanvases.find((x) => x?.id === editorCanvasId);
    return c?.scene || emptyScene;
  }, [editorCanvasId, internalCanvases]);

  return (
    <div className="drawing-canvas">
      <div
        className="modalCard-header align-items-center justify-content-between d-flex"
        style={{
          position: "sticky",
          top: "0px",
          zIndex: 2,
          height: "60px",
        }}
      >
        <div className="align-items-center d-flex">
          {onClose && (
            <Button
              type="text"
              className="btn btn-delete-prescription px-3 focus-none h-100"
              onClick={onClose}
            >
              <i className="icon-Cross fs-3"></i>
            </Button>
          )}
          <div className="modal-title">Drawing Canvas</div>
        </div>

        <div className="d-flex align-items-center" style={{ padding: "0 20px" }}>
          <Button
            className="btn-41 btn ant-btn-text btn-input"
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
            onClick={openEditorForNewCanvas}
          >
            <span className="drawing-canvas__create-btn-plus" aria-hidden="true" style={{ fontSize: "20px", fontWeight: "300" }}>
              +
            </span>
            <span>Create New Canvas</span>
          </Button>
        </div>
      </div>

      <div className="drawing-canvas__body">
        {!hasCanvases ? (
          <DrawingCanvasEmptyState
            isFirstTimeUser={isFirstTimeUser}
            onCreateCanvas={openEditorForNewCanvas}
            onKnowMore={onKnowMore}
          />
        ) : (
          <div className="drawing-canvas__grid">
            {internalCanvases.map((canvas, idx) => (
              <div key={canvas?.id ?? idx} className="drawing-canvas__grid-item">
                <DrawingCanvasCard
                  canvas={canvas}
                  rxDrawingCanvasIds={rxDrawingCanvasIds}
                  onToggleRx={(checked) => onToggleRx(canvas?.id, checked)}
                  onOpen={() => openEditorForCanvas(canvas?.id)}
                  onPreview={previewCanvas}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                  onRename={handleRename}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {editorOpen && (
        <Drawer
          open={editorOpen}
          closable={false}
          maskClosable
          mask={true}
          placement="right"
          width="100%"
          bodyStyle={{ padding: 0, backgroundColor: "#ffffff" }}
          style={{ top: 0, height: "100vh" }}
          zIndex={2000}
          onClose={handleCloseEditor}
        >
          <ExcalidrawEditor
            canvasId={editorCanvasId}
            canvasName={internalCanvases.find(c => c?.id === editorCanvasId)?.name || internalCanvases.find(c => c?.id === editorCanvasId)?.title || "Untitled Canvas"}
            initialData={editorInitialData}
            onSave={handleEditorSave}
            onBack={handleCloseEditor}
            onOpenTemplates={handleTemplatesToggle}
            onOpenSaveTemplate={handleOpenSaveTemplateDrawer}
            excalidrawApiRef={excalidrawApiRef}
            initialShowInRx={editorInitialShowInRx}
            templateData={templateData}
            templateTrigger={templateTrigger}
          />
        </Drawer>
      )}

      {shouldShowPreview && (
        <Drawer
            closeIcon={false}
            placement="right"
            bodyStyle={{ backgroundColor: "#222222", padding: 0 }}
            onClose={() => setShouldShowPreview(false)}
            open={shouldShowPreview}
            width="100%"
            height={"100%"}
            push={false}
            zIndex={3000}
        >
          <CanvasPreview
            onClose={() => setShouldShowPreview(false)}
            canvasName={internalCanvases.find(c => c?.id === previewCanvasId)?.name || internalCanvases.find(c => c?.id === previewCanvasId)?.title || "Untitled Canvas"}
            scene={internalCanvases.find(c => c?.id === previewCanvasId)?.scene}
            handleEdit={() => {
               setShouldShowPreview(false);
               openEditorForCanvas(previewCanvasId);
            }}
            handleDelete={() => {
               const canvas = internalCanvases.find(c => c?.id === previewCanvasId);
               if (canvas) handleDelete(canvas);
               setShouldShowPreview(false);
            }}
          />
        </Drawer>
      )}

      <Drawer 
        title={null}
        closable={false}
        placement="right"
        onClose={handleTemplatesToggle}
        open={templateDrawerOpen}
        push={false}
        width={500}
        zIndex={3000}
        bodyStyle={{ padding: '0 20px' }}
      >
        <TemplatesDrawer 
          onClose={handleTemplatesToggle} 
          onSelectTemplate={handleSelectTemplate} 
        />
      </Drawer>

      <SaveTemplateDrawer
        open={saveTemplateDrawerOpen}
        onClose={handleCloseSaveTemplateDrawer}
        getExcalidrawApi={getExcalidrawApi}
        onSaveTemplate={handleSaveTemplateWrapper}
      />
    </div>
  );
};

export default DrawingCanvas;
