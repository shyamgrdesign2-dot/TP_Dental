import React, { useState, useEffect } from 'react';
import { Excalidraw, MainMenu, exportToBlob } from '@excalidraw/excalidraw';
import { Button, Switch, Tooltip, Input, message } from 'antd';
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
import { printCanvasWithIframe } from '../utils/printCanvasWithIframe';
import './ExcalidrawEditor.scss';

const alertIcon = ASSETS.images.alerticon;


export default function ExcalidrawEditor({ 
  canvasId,
  canvasName, 
  initialData, 
  onSave, 
  onBack,
  onOpenTemplates,
  onOpenSaveTemplate,
  excalidrawApiRef,
  initialShowInRx = true,
  templateData = null,
  templateTrigger = 0
}) {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [showInRx, setShowInRx] = useState(initialShowInRx !== false);
  const [isReady, setIsReady] = useState(false);
  const [localTitle, setLocalTitle] = useState(canvasName || "Untitled Canvas");
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [canvasHasContent, setCanvasHasContent] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [pendingCanvasName, setPendingCanvasName] = useState("");

  useEffect(() => {
    setLocalTitle(canvasName || "Untitled Canvas");
  }, [canvasName]);

  // New canvas: default Show in Rx on when opening editor only (do not re-sync from parent — it stays always "true" in parent useMemo and would reset the toggle).
  useEffect(() => {
    if (canvasId === "new" || canvasId == null) {
      setShowInRx(true);
    }
  }, [canvasId]);

  useEffect(() => {
    if (canvasId && canvasId !== "new") {
      setShowInRx(initialShowInRx === true);
    }
  }, [canvasId, initialShowInRx]);

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

  useEffect(() => {
    if (!excalidrawApiRef) return;
    excalidrawApiRef.current = excalidrawAPI ?? null;
    if (excalidrawAPI) {
      const elements = excalidrawAPI.getSceneElements();
      setCanvasHasContent(
        (elements || []).filter((el) => !el.isDeleted).length > 0
      );
    } else {
      setCanvasHasContent(false);
    }
  }, [excalidrawAPI, excalidrawApiRef]);

  const handleExcalidrawChange = React.useCallback((elements) => {
    setCanvasHasContent(
      (elements || []).filter((el) => !el.isDeleted).length > 0
    );
  }, []);

  const handleSaveTemplateClick = () => {
    if (!onOpenSaveTemplate) return;
    if (!canvasHasContent) return;
    onOpenSaveTemplate();
  };

  const performSave = async (titleToSave) => {
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
        await onSave(payload, titleToSave, { showInRx });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleSave = async () => {
    const isUntitled = !localTitle || localTitle.trim().toLowerCase() === "untitled canvas";
    if (isUntitled) {
      setPendingCanvasName("");
      setIsNameModalOpen(true);
      return;
    }
    await performSave(localTitle.trim());
  };

  const handleConfirmNameAndSave = async () => {
    const nextName = pendingCanvasName.trim();
    if (!nextName) return;
    setLocalTitle(nextName);
    setIsNameModalOpen(false);
    await performSave(nextName);
  };

  const handlePrint = async () => {
    if (!excalidrawAPI || isPrinting) return;

    setIsPrinting(true);
    try {
      const result = await printCanvasWithIframe({
        excalidrawAPI,
        title: localTitle || "Canvas",
      });

      if (result?.status === false && result?.reason === "EMPTY_CANVAS") {
        message.open({
          type: "warning",
          content: "Canvas is empty. Add drawing before printing.",
          style: { zIndex: 5000 },
          duration: 3,
        });
      }
    } catch (error) {
      console.error("Print failed", error);
      message.open({
        type: "error",
        content: "Failed to prepare print preview",
        style: { zIndex: 5000 },
        duration: 4,
      });
    } finally {
      setIsPrinting(false);
    }
  };

  const suggestedCanvasNames = React.useMemo(() => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const patientToken = "Patient";
    return [
      `${patientToken}_${dateStr}`,
      `${dateStr}_${patientToken}`,
      `${patientToken}_Canvas_${dateStr}`,
    ];
  }, []);

  useEffect(() => {
    if (!excalidrawAPI || templateTrigger <= 0 || !templateData) return;

    let cancelled = false;

    const generateId = () => `${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    const insertImageTemplate = async () => {
      const imageUrl = templateData?.url;
      if (!imageUrl) return;

      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const mimeType = blob.type || (templateData?.fileType ? `image/${templateData.fileType}` : "image/png");

        const dataURL = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        if (cancelled) return;

        const dimensions = await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve({ width: img.naturalWidth || 400, height: img.naturalHeight || 300 });
          img.onerror = reject;
          img.src = dataURL;
        });

        if (cancelled) return;

        const fileId = generateId();
        const elementId = generateId();
        const now = Date.now();

        excalidrawAPI.addFiles([
          {
            id: fileId,
            dataURL,
            mimeType,
            created: now,
            lastRetrieved: now,
          },
        ]);

        const currentElements = excalidrawAPI.getSceneElements() || [];
        const imageElement = {
          id: elementId,
          type: "image",
          x: 120,
          y: 120,
          width: dimensions.width,
          height: dimensions.height,
          angle: 0,
          strokeColor: "transparent",
          backgroundColor: "transparent",
          fillStyle: "hachure",
          strokeWidth: 1,
          strokeStyle: "solid",
          roughness: 0,
          opacity: 100,
          groupIds: [],
          seed: Math.floor(Math.random() * 2147483647),
          version: 1,
          versionNonce: Math.floor(Math.random() * 2147483647),
          isDeleted: false,
          boundElements: null,
          updated: now,
          link: null,
          locked: false,
          fileId,
          status: "saved",
          scale: [1, 1],
        };

        excalidrawAPI.updateScene({
          elements: [...currentElements, imageElement],
          appState: { ...excalidrawAPI.getAppState() },
        });

        setTimeout(() => {
          if (!cancelled) {
            excalidrawAPI.scrollToContent([imageElement], { fitToViewport: true });
          }
        }, 100);
      } catch (error) {
        console.error("Failed to insert template image", error);
        message.open({
          type: "error",
          content: "Failed to load template image",
          style: { zIndex: 5000 },
          duration: 4,
        });
      }
    };

    if (templateData?.templateType === "image") {
      insertImageTemplate();
      return () => {
        cancelled = true;
      };
    }

    if (excalidrawAPI && templateTrigger > 0 && templateData) {
      const isArrayLike = Array.isArray(templateData);
      const newElements = isArrayLike ? templateData : (templateData.elements || []);
      const newAppState = isArrayLike ? {} : (templateData.appState || {});
      const newFiles = isArrayLike ? {} : (templateData.files || {});

      // Add template to the CURRENT board directly but with unique IDs to allow repeated insertions
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
    return () => {
      cancelled = true;
    };
  }, [excalidrawAPI, templateTrigger, templateData]);

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
                <CloseOutlined onClick={handleRenameCancel} style={{ cursor: "pointer", color: "#ff4d4f", fontSize: '16px', marginRight: '10px' }} title="Cancel" className='cross-icon'/>
                <CheckOutlined onClick={handleRenameSave} style={{ cursor: "pointer", color: "#2e8b57", fontSize: '16px' }} title="Save" className='tick-icon'/>
              </div>
            ) : (
              <>
                <h2 className="canvas-name" onClick={startRenaming} style={{ cursor: "pointer" }}>{localTitle}</h2>
                <i
                  className="icon-Edit fs-21 cursor-pointer"
                  onClick={startRenaming}
                  style={{cursor: 'pointer' }}
                ></i>
                {/* <EditOutlined className="edit-icon" onClick={startRenaming} style={{ cursor: "pointer", marginLeft: '8px' }} /> */}
              </>
            )}
          </div>
        </div>

        <div className="header-right">
          {/* <Tooltip title="Watch Tutorial">
            <div className="icon-btn play-btn" onClick={() => console.log("Tutorial Clicked")}>
               <div className="play-circle">
                 <CaretRightOutlined />
               </div>
            </div>
          </Tooltip> */}
          
          {/* <div className="divider"></div> */}

          <Tooltip title="Templates">
            <div className="icon-btn" onClick={onOpenTemplates}>
              <LayoutOutlined />
            </div>
          </Tooltip>

          {onOpenSaveTemplate ? (
            <Tooltip
              title={canvasHasContent ? "Save to Template" : "No content available"}
            >
              <div
                className="icon-btn"
                onClick={handleSaveTemplateClick}
                style={{ cursor: canvasHasContent ? "pointer" : "default" }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSaveTemplateClick();
                  }
                }}
              >
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
            onClick={handlePrint}
            loading={isPrinting}
            disabled={isPrinting}
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
            onChange={handleExcalidrawChange}
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

      <CommonModal
        isModalOpen={isNameModalOpen}
        onCancel={() => setIsNameModalOpen(false)}
        modalWidth={540}
        title={"Give this canvas a name"}
        modalBody={
          <>
            <div className="mb-3">
              <Input
                autoFocus
                placeholder="Enter canvas name"
                value={pendingCanvasName}
                maxLength={40}
                onChange={(e) => setPendingCanvasName(e.target.value)}
                onPressEnter={handleConfirmNameAndSave}
              />
            </div>
            <div className="mb-2 text-muted" style={{ fontSize: 13 }}>
              Suggestions
            </div>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {suggestedCanvasNames.map((name) => (
                <Button
                  key={name}
                  size="small"
                  onClick={() => setPendingCanvasName(name)}
                >
                  {name}
                </Button>
              ))}
            </div>
            <div className="d-flex align-items-center justify-content-end mt-2">
              <Button
                onClick={() => setIsNameModalOpen(false)}
                className="me-2"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                className="btn btn-primary3 btn-41 px-4"
                disabled={!pendingCanvasName.trim()}
                loading={isSaving}
                onClick={handleConfirmNameAndSave}
              >
                Save
              </Button>
            </div>
          </>
        }
      />

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
