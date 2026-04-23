import React, { useState, useEffect } from 'react';
import { Excalidraw, MainMenu, exportToBlob } from '@excalidraw/excalidraw';
import { Button, Switch, Tooltip, Drawer, Input, message } from 'antd';
import CommonModal from "../../../common/CommonModal";
import { ASSETS } from "../../../assets";
import { 
  ArrowLeftOutlined, 
  EditOutlined, 
  PlayCircleFilled,
  LayoutOutlined,
  SaveOutlined,
  PrinterOutlined,
  CaretRightOutlined,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';
import './ExcalidrawEditor.scss';

const alertIcon = ASSETS.images.alerticon;


export default function ExcalidrawEditor({ 
  canvasId,
  canvasName, 
  initialData, 
  onSave, 
  onBack,
  onOpenTemplates,
  onSaveTemplate,
  templateData = null,
  templateTrigger = 0
}) {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [showInRx, setShowInRx] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [localTitle, setLocalTitle] = useState(canvasName || "Untitled Canvas");
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveTemplateDrawerOpen, setSaveTemplateDrawerOpen] = useState(false);
  const [templateNameInput, setTemplateNameInput] = useState("");
  const [templatePreviewUrl, setTemplatePreviewUrl] = useState(null);
  const [isSubmittingTemplate, setIsSubmittingTemplate] = useState(false);

  useEffect(() => {
    setLocalTitle(canvasName || "Untitled Canvas");
  }, [canvasName]);

  const handleBackClick = () => {
    setIsBackModalOpen(true);
  };

  const handleConfirmLeave = () => {
    setIsBackModalOpen(false);
    onBack();
  };

  const showHideBackModal = () => {
    setIsBackModalOpen(false);
  };

  const startRenaming = () => {
    setRenameValue(localTitle);
    setIsRenaming(true);
  };

  const handleRenameSave = () => {
    if (renameValue.trim()) {
      setLocalTitle(renameValue.trim());
      // Placeholder: Add API call here to save the new title to backend
      console.log("Mock API Call: Saving new renamed title -> ", renameValue.trim());
    }
    setIsRenaming(false);
  };

  const handleRenameCancel = () => {
    setIsRenaming(false);
  };

  useEffect(() => {
    // Wait for the Drawer's sliding animation to finish before mounting Excalidraw.
    // If we mount during the animation, Excalidraw incorrectly calculates its coordinate offsets.
    const timer = setTimeout(() => setIsReady(true), 350);
    return () => clearTimeout(timer);
  }, []);

  const sanitizedData = React.useMemo(() => {
    if (!initialData) return { elements: [], appState: {}, files: {} };
    // Deep clone appState to avoid mutating original
    const appState = { ...initialData.appState };
    if (appState.collaborators) {
      delete appState.collaborators;
    }
    // We NO LONGER strip scrollX, scrollY, and zoom here.
    // This allows drawings to open at their saved coordinates if available.

    return {
      elements: initialData.elements || [],
      appState,
      files: initialData.files || {}
    };
  }, [initialData]);

  // Track the current canvas ID to detect when we switch to a different drawing
  const activeCanvasIdRef = React.useRef(null);

  useEffect(() => {
    if (excalidrawAPI && sanitizedData) {
      const currentId = canvasId ?? initialData?.id ?? 'new';
      
      // ONLY update the scene if we are switching to a DIFFERENT canvas
      // or if it's the very first time we've loaded anything.
      if (activeCanvasIdRef.current !== currentId) {
        activeCanvasIdRef.current = currentId;

        excalidrawAPI.updateScene({
          elements: sanitizedData.elements,
          appState: {
            ...sanitizedData.appState,
            // Optimization: If the data lacks viewport, Excalidraw defaults to (0,0)
          },
          files: sanitizedData.files
        });

        // If no saved viewport, auto-scroll once with a delay to ensure container is ready
        const hasSavedViewport = sanitizedData.appState?.scrollX !== undefined;
        if (!hasSavedViewport && sanitizedData.elements?.length > 0) {
          const timer = setTimeout(() => {
            excalidrawAPI.scrollToContent(sanitizedData.elements, { fitToViewport: true });
          }, 200);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [excalidrawAPI, sanitizedData, initialData, canvasId]);

  const handleSave = async () => {
    if (!excalidrawAPI || isSaving) return;

    const currentAppState = excalidrawAPI.getAppState();
    
    // Pick only essential keys to keep the payload clean and environment-agnostic
    const sanitizedAppState = {
      theme: currentAppState.theme,
      viewBackgroundColor: currentAppState.viewBackgroundColor,
      gridSize: currentAppState.gridSize,
      name: currentAppState.name,
      scrollX: currentAppState.scrollX,
      scrollY: currentAppState.scrollY,
      zoom: currentAppState.zoom,
    };

    const payload = {
      elements: excalidrawAPI.getSceneElements(),
      appState: sanitizedAppState,
      files: excalidrawAPI.getFiles(),
    };

    if (onSave) {
      setIsSaving(true);
      try {
        await onSave(payload, localTitle);
      } finally {
        setIsSaving(false);
      }
    }
  };

  useEffect(() => {
    if (excalidrawAPI && templateTrigger > 0 && templateData) {
      const isArrayLike = Array.isArray(templateData);
      const newElements = isArrayLike ? templateData : (templateData.elements || []);
      const newAppState = isArrayLike ? {} : (templateData.appState || {});
      const newFiles = isArrayLike ? {} : (templateData.files || {});

      // Add template to the CURRENT board directly but with unique IDs to allow repeated insertions
      const generateId = () => Math.random().toString(36).substring(2, 10);
      const idMap = {};
      const newElementsDuplicated = JSON.parse(JSON.stringify(newElements)).map(el => {
        const oldId = el.id;
        const newId = generateId();
        idMap[oldId] = newId;
        el.id = newId;
        return el;
      });

      newElementsDuplicated.forEach(el => {
        if (Array.isArray(el.groupIds)) {
          el.groupIds = el.groupIds.map(gId => {
            if (!idMap[gId]) idMap[gId] = generateId();
            return idMap[gId];
          });
        }
        if (Array.isArray(el.boundElements)) {
          el.boundElements = el.boundElements.map(b => ({ ...b, id: idMap[b.id] || b.id }));
        }
        if (el.startBinding) {
          el.startBinding.elementId = idMap[el.startBinding.elementId] || el.startBinding.elementId;
        }
        if (el.endBinding) {
          el.endBinding.elementId = idMap[el.endBinding.elementId] || el.endBinding.elementId;
        }
      });

      // Add template to the CURRENT board directly
      const currentElements = excalidrawAPI.getSceneElements() || [];
      const currentFiles = excalidrawAPI.getFiles() || {};

      const mergedElements = [...currentElements, ...newElementsDuplicated];

      console.log("🔥 Template Trigger Fired!", {
          templateTrigger,
          currentElementsCount: currentElements.length,
          newElementsCount: newElementsDuplicated.length,
          newElements: newElementsDuplicated
      });

      excalidrawAPI.updateScene({
        elements: mergedElements,
        appState: { ...excalidrawAPI.getAppState(), ...newAppState },
      });

      // Images in Excalidraw are loaded out-of-band via addFiles
      // We must extract them from the files object and pass them directly as an array
      if (Object.keys(newFiles).length > 0) {
        excalidrawAPI.addFiles(Object.values(newFiles));
      }

      if (newElements.length > 0) {
        setTimeout(() => {
          excalidrawAPI.scrollToContent(newElements, { fitToViewport: true });
        }, 100);
      }
    }
  }, [excalidrawAPI, templateTrigger, templateData]);

  const closeSaveTemplateDrawer = React.useCallback(() => {
    setSaveTemplateDrawerOpen(false);
    setTemplateNameInput("");
    setIsSubmittingTemplate(false);
    setTemplatePreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }, []);

  useEffect(() => {
    if (!saveTemplateDrawerOpen || !excalidrawAPI) return undefined;

    let cancelled = false;

    (async () => {
      try {
        const elements = excalidrawAPI.getSceneElements();
        const currentAppState = excalidrawAPI.getAppState();
        const files = excalidrawAPI.getFiles();

        if (!elements?.length) {
          if (!cancelled) {
            setTemplatePreviewUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return null;
            });
          }
          return;
        }

        const blob = await exportToBlob({
          elements,
          appState: {
            ...currentAppState,
            exportWithDarkMode: false,
            viewBackgroundColor: currentAppState.viewBackgroundColor || "#ffffff",
          },
          files,
          mimeType: "image/png",
          quality: 0.8,
        });

        if (cancelled) return;

        const url = URL.createObjectURL(blob);
        setTemplatePreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      } catch (e) {
        console.error("Template preview export failed", e);
        if (!cancelled) {
          setTemplatePreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [saveTemplateDrawerOpen, excalidrawAPI]);

  const openSaveTemplateDrawer = () => {
    if (!excalidrawAPI || !onSaveTemplate) return;
    setTemplateNameInput("");
    setSaveTemplateDrawerOpen(true);
  };

  const buildTemplatePayload = () => {
    if (!excalidrawAPI) return null;
    const currentAppState = excalidrawAPI.getAppState();
    const sanitizedAppState = {
      theme: currentAppState.theme,
      viewBackgroundColor: currentAppState.viewBackgroundColor,
      gridSize: currentAppState.gridSize,
      name: currentAppState.name,
      scrollX: currentAppState.scrollX,
      scrollY: currentAppState.scrollY,
      zoom: currentAppState.zoom,
    };
    return {
      elements: excalidrawAPI.getSceneElements(),
      appState: sanitizedAppState,
      files: excalidrawAPI.getFiles(),
    };
  };

  const handleConfirmSaveTemplate = async () => {
    if (!excalidrawAPI || !onSaveTemplate) return;
    const name = templateNameInput.trim();
    if (!name) return;

    const payload = buildTemplatePayload();
    if (!payload) return;

    setIsSubmittingTemplate(true);
    try {
      const ok = await Promise.resolve(onSaveTemplate(payload, name));
      if (ok === true) {
        message.open({
          type: "success",
          content: "Canvas Template saved successfully",
          className: "canvas-template-saved-message",
          style: { zIndex: 5000 },
          duration: 3,
        });
        closeSaveTemplateDrawer();
      }
    } catch (e) {
      message.open({
        type: "error",
        content: e?.message || "Template save failed",
        style: { zIndex: 5000 },
        duration: 4,
      });
    } finally {
      setIsSubmittingTemplate(false);
    }
  };

  return (
    <div className="excalidraw-editor-container">
      <div className="excalidraw-header">
        <div className="header-left">
          <div className="back-btn-wrapper" onClick={handleBackClick}>
            <ArrowLeftOutlined />
          </div>
          <div className="divider"></div>
          <div className="canvas-title-container">
            {isRenaming ? (
              <div className="rename-input-container d-flex align-items-center">
                <Input
                  autoFocus
                  className="rename-input"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  maxLength={30}
                  onPressEnter={handleRenameSave}
                  style={{ width: '200px', marginRight: '10px' }}
                />
                <CloseOutlined onClick={handleRenameCancel} style={{ cursor: "pointer", color: "#ff4d4f", fontSize: '16px', marginRight: '10px' }} title="Cancel" />
                <CheckOutlined onClick={handleRenameSave} style={{ cursor: "pointer", color: "#2e8b57", fontSize: '16px' }} title="Save" />
              </div>
            ) : (
              <>
                <h2 className="canvas-name" onClick={startRenaming} style={{ cursor: "pointer" }}>{localTitle}</h2>
                <EditOutlined className="edit-icon" onClick={startRenaming} style={{ cursor: "pointer", marginLeft: '8px' }} />
              </>
            )}
          </div>
        </div>

        <div className="header-right">
          <Tooltip title="Watch Tutorial">
            <div className="icon-btn play-btn" onClick={() => console.log("Tutorial Clicked")}>
               <div className="play-circle">
                 <CaretRightOutlined />
               </div>
            </div>
          </Tooltip>
          
          <div className="divider"></div>

          <Tooltip title="Templates">
            <div className="icon-btn" onClick={onOpenTemplates}>
              <LayoutOutlined />
            </div>
          </Tooltip>

          {onSaveTemplate ? (
            <Tooltip title="Save to Template">
              <div className="icon-btn" onClick={openSaveTemplateDrawer}>
                <SaveOutlined />
              </div>
            </Tooltip>
          ) : null}

          <div className="divider"></div>

          <div className="show-in-rx-container">
            <span>Show in Rx</span>
            <Switch 
                checked={showInRx} 
                onChange={(checked) => setShowInRx(checked)}
                size="small"
                style={{ backgroundColor: showInRx ? '#4b4ad5' : undefined }}
            />
          </div>

          <Button 
            className="pill-btn print-btn btn-outline-primary" 
            icon={<PrinterOutlined />}
            onClick={() => console.log("Print placeholder")}
          >
            Print
          </Button>

          <Button 
            className="pill-btn save-btn-canvas" 
            onClick={handleSave}
            loading={isSaving}
            disabled={isSaving}
          >
            Save
          </Button>
        </div>
      </div>

      <div className="excalidraw-wrapper">
        {isReady && (
          <Excalidraw
            initialData={sanitizedData}
            excalidrawAPI={(api) => setExcalidrawAPI(api)}
          >
            <MainMenu>
              <MainMenu.DefaultItems.LoadScene />
              <MainMenu.DefaultItems.Export />
              <MainMenu.DefaultItems.SaveAsImage />
              <MainMenu.DefaultItems.Help />
              <MainMenu.DefaultItems.ClearCanvas />
              <MainMenu.Separator />
              <MainMenu.DefaultItems.ToggleTheme />
              <MainMenu.DefaultItems.ChangeCanvasBackground />
            </MainMenu>
          </Excalidraw>
        )}
      </div>

      <Drawer
        title={null}
        placement="right"
        width={440}
        open={saveTemplateDrawerOpen}
        closable={false}
        onClose={closeSaveTemplateDrawer}
        zIndex={2500}
        maskClosable
        destroyOnClose={false}
        bodyStyle={{ padding: 0 }}
        rootStyle={{ top: 0 }}
      >
        <div className="save-template-drawer">
          <div className="save-template-drawer__header">
            <button
              type="button"
              className="save-template-drawer__icon-btn"
              onClick={closeSaveTemplateDrawer}
              aria-label="Close"
            >
              <CloseOutlined />
            </button>
            <h2 className="save-template-drawer__title">Save This Canvas as a Template</h2>
            <Button
              type="primary"
              className="save-template-drawer__save-btn"
              disabled={!templateNameInput.trim() || isSubmittingTemplate}
              loading={isSubmittingTemplate}
              onClick={handleConfirmSaveTemplate}
            >
              Save
            </Button>
          </div>

          <div className="save-template-drawer__body">
            <label className="save-template-drawer__label" htmlFor="template-name-input">
              Enter Template Name
            </label>
            <div className="save-template-drawer__input-wrap">
              <Input
                id="template-name-input"
                value={templateNameInput}
                onChange={(e) => setTemplateNameInput(e.target.value.slice(0, 30))}
                maxLength={30}
                placeholder="e.g., Dental Diagram"
                className="save-template-drawer__input"
                autoFocus
              />
              <span className="save-template-drawer__counter">
                {templateNameInput.length}/30
              </span>
            </div>

            <p className="save-template-drawer__label save-template-drawer__label--preview">Template Preview</p>
            <div className="save-template-drawer__preview">
              {templatePreviewUrl ? (
                <img src={templatePreviewUrl} alt="Template preview" className="save-template-drawer__preview-img" />
              ) : (
                <span className="save-template-drawer__preview-empty">Nothing to preview yet</span>
              )}
            </div>
          </div>
        </div>
      </Drawer>

      <CommonModal
        isModalOpen={isBackModalOpen}
        onCancel={showHideBackModal}
        modalWidth={500}
        title={"You may lose your data"}
        modalBody={
          <>
            <div className="alert-warning rounded-10px p-2 patient-details">
              <div className="d-flex align-items-center">
                <img className="me-3" src={alertIcon} alt="Warning" />
                <span>
                  Are you sure you want to leave? <br />
                  You will permanently lose your data.
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="d-flex align-items-center mt-2 justify-content-end">
                <div
                  onClick={handleConfirmLeave}
                  className="me-4 text-decoration-underline btn p-0 text-main"
                >
                  Yes Leave
                </div>
                <Button
                  onClick={showHideBackModal}
                  className="lh-lg btn btn-primary3 btn-41 px-4"
                >
                  <span>No, Stay</span>
                </Button>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}
