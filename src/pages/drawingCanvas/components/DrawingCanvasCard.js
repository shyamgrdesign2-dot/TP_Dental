import React, { useState, useEffect } from "react";
import { Card, Switch, Dropdown, Input, Button, message } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { exportToBlob } from "@excalidraw/excalidraw";
import CommonModal from "../../../common/CommonModal";
import { ASSETS } from "../../../assets";
import "./DrawingCanvasCard.scss";
import { renameMapping, deleteMapping } from "../service";

const editIcon = ASSETS.images.documentEdit;
const trashIcon = ASSETS.images.trash;
const downloadIcon = ASSETS.images.documentDownload;
const duplicateIcon = ASSETS.images.copy;
const previewIcon = ASSETS.images.eyePreview;
const alertIcon = ASSETS.images.alerticon;

const DrawingCanvasCard = ({ canvas, rxDrawingCanvasIds = [], onToggleRx = () => {}, onOpen, onPreview, onRename, onDuplicate, onDelete, hideShowInRx = false }) => {
  const [localTitle, setLocalTitle] = useState(canvas?.title || canvas?.name || "Untitled Canvas");
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const isShowInRx = rxDrawingCanvasIds.includes(canvas?.id);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const generatePreview = async () => {
      let activeScene = canvas?.scene;

      if (!activeScene && (canvas?.url || canvas?.canvas_url)) {
        try {
          const targetUrl = canvas.url || canvas.canvas_url;
          const res = await fetch(targetUrl.replace("http://", "https://")); // ensure https if needed or just use verbatim
          activeScene = await res.json();
        } catch (error) {
          console.error("Failed to fetch scene for preview thumbnail:", error);
        }
      }

      if (!activeScene?.elements || activeScene.elements.length === 0) {
        setPreviewUrl(null);
        return;
      }

      try {
        const blob = await exportToBlob({
          elements: activeScene.elements,
          appState: {
            ...activeScene.appState,
            exportWithDarkMode: false,
            viewBackgroundColor: "#ffffff",
          },
          files: activeScene.files,
          mimeType: "image/png",
          quality: 0.8,
        });

        if (isMounted) {
          const url = URL.createObjectURL(blob);
          setPreviewUrl(url);
        }
      } catch (error) {
        console.error("Error generating thumbnail:", error);
      }
    };

    generatePreview();

    return () => {
      isMounted = false;
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [canvas?.scene]);

  const handleOpen = () => {
    if (!isRenaming && typeof onOpen === "function") {
      onOpen(canvas);
    }
  };

  const startRenaming = (e) => {
    e.stopPropagation();
    setRenameValue(localTitle);
    setIsRenaming(true);
  };

  const handleRenameSave = async (e) => {
    e.stopPropagation();
    const newName = renameValue.trim();
    if (newName) {
      if (canvas?.id && !canvas.id.toString().includes("new_")) {
        const res = await renameMapping(canvas.id, newName);
        if (!res.status) {
          message.error(res.message || "Failed to rename canvas");
          setIsRenaming(false);
          return;
        }
        message.success("Canvas renamed successfully");
      }
      
      setLocalTitle(newName);
      if (onRename) {
        onRename(canvas, newName);
      }
    }
    setIsRenaming(false);
  };

  const handleRenameCancel = (e) => {
    e.stopPropagation();
    setIsRenaming(false);
  };

  const handleToggleRx = (checked, e) => {
    e.stopPropagation();
    onToggleRx(checked);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (canvas?.id && !canvas.id.toString().includes("new_")) {
      const res = await deleteMapping(canvas.id);
      if (!res.status) {
        message.error(res.message || "Failed to delete canvas");
        setIsDeleteModalOpen(false);
        return;
      }
      message.success("Canvas deleted successfully");
    }

    if (onDelete) {
      onDelete(canvas);
    }
    setIsDeleteModalOpen(false);
  };

  const handleMenuClick = ({ key, domEvent }) => {
    domEvent.stopPropagation();
    switch (key) {
      case "addEdit":
        handleOpen();
        break;
      case "preview":
        if (onPreview) {
          onPreview(canvas);
        }
        break;
      case "rename":
        startRenaming(domEvent);
        break;
      case "download":
        if (previewUrl) {
          const a = document.createElement("a");
          a.href = previewUrl;
          a.download = `${localTitle || 'canvas'}.png`;
          a.click();
        }
        break;
      case "duplicate":
        if (onDuplicate) {
          onDuplicate(canvas);
        }
        break;
      case "delete":
        setIsDeleteModalOpen(true);
        break;
      default:
        break;
    }
  };

  const menuItems = [
    {
      key: "addEdit",
      label: (
        <div className="d-flex align-items-center">
          <img src={editIcon} alt="edit" className="me-2" style={{ width: 16 }} />
          Add/Edit
        </div>
      ),
    },
    {
      key: "preview",
      label: (
        <div className="d-flex align-items-center">
          <img src={previewIcon} alt="preview" className="me-2" style={{ width: 16 }} />
          Preview
        </div>
      ),
    },
    {
      key: "rename",
      label: (
        <div className="d-flex align-items-center">
          <img src={editIcon} alt="rename" className="me-2" style={{ width: 16 }} />
          Rename
        </div>
      ),
    },
    {
      key: "download",
      label: (
        <div className="d-flex align-items-center">
          <img src={downloadIcon} alt="download" className="me-2" style={{ width: 16 }} />
          Download
        </div>
      ),
    },
    {
      key: "duplicate",
      label: (
        <div className="d-flex align-items-center">
          <img src={duplicateIcon} alt="duplicate" className="me-2" style={{ width: 16 }} />
          Duplicate
        </div>
      ),
    },
    {
      key: "delete",
      label: (
        <div className="d-flex align-items-center text-danger">
          <img src={trashIcon} alt="delete" className="me-2" style={{ width: 16 }} />
          Delete
        </div>
      ),
    },
  ];

  return (
    <>
      <Card bordered={false} className="drawing-canvas-card">
        {!hideShowInRx && (
          <div className="drawing-canvas-card__rx-toggle" onClick={(e) => e.stopPropagation()}>
            <span>Show in Rx</span>
            <Switch checked={isShowInRx} onChange={handleToggleRx} size="small" />
          </div>
        )}

        <div
          className="drawing-canvas-card__thumb"
          aria-hidden="true"
          onClick={handleOpen}
        >
          {previewUrl ? (
            <img src={previewUrl} alt={localTitle} className="drawing-canvas-card__preview-image" />
          ) : (
            <div className="drawing-canvas-card__thumb-icon" />
          )}
        </div>

        <div className="drawing-canvas-card__footer">
          {isRenaming ? (
            <div className="drawing-canvas-card__rename-input-container" onClick={(e) => e.stopPropagation()}>
              <Input
                autoFocus
                className="drawing-canvas-card__rename-input"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                maxLength={16}
                suffix={`${renameValue.length}/16`}
                onPressEnter={handleRenameSave}
              />
              <CloseOutlined className="drawing-canvas-card__rename-action drawing-canvas-card__rename-cancel ms-1" onClick={handleRenameCancel} />
              <CheckOutlined className="drawing-canvas-card__rename-action drawing-canvas-card__rename-save" onClick={handleRenameSave} />
            </div>
          ) : (
            <>
              <div className="drawing-canvas-card__title-container" onClick={handleOpen}>
                <div className="drawing-canvas-card__title" title={localTitle}>
                  {localTitle}
                </div>
                {/* Dummy date for placeholder visualization */}
                <div className="drawing-canvas-card__subtitle">12 Aug&apos;26</div>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <Dropdown
                  menu={{ items: menuItems, onClick: handleMenuClick }}
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <div className="btn p-0" style={{ cursor: "pointer" }}>
                    <i className="icon-More iconrotate90" style={{ fontSize: 18 }} />
                  </div>
                </Dropdown>
              </div>
            </>
          )}
        </div>
      </Card>

      <CommonModal
        isModalOpen={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        modalWidth={510}
        title="Are you sure you want to delete this Canvas?"
        modalBody={
          <>
            <div className="alert-warning rounded-10px p-2 patient-details mt-2">
              <div className="d-flex align-items-center">
                <img className="me-3" src={alertIcon} alt="Warning" />
                <span>
                  This action cannot be undone. The &quot;<strong>{localTitle}</strong>&quot; canvas cannot be recovered once deleted
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="d-flex align-items-center mt-2 justify-content-end">
                <div
                  onClick={handleDeleteConfirm}
                  className="me-4 text-decoration-underline text-danger"
                  style={{ cursor: "pointer", fontWeight: 500 }}
                >
                  Delete Canvas
                </div>
                <Button
                  onClick={handleDeleteCancel}
                  className="btn btn-primary3 btn-41 px-4"
                  style={{ minWidth: 100 }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </>
        }
      />
    </>
  );
};

export default DrawingCanvasCard;

