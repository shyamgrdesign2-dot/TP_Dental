import React, { useState, useEffect, useCallback } from 'react';
import { Dropdown, message, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import CanvasEngine from './CanvasEngine';
import Toolbar from './Toolbar';
import TemplateSidebar from './TemplateSidebar';
import RxTemplateUploadDrawer from '../../smartSync/components/RxTemplateUploadDrawer';
import CommonModal from '../../../common/CommonModal';
import { getTemplates } from '../services/templateService';
import { A4_BASE_WIDTH, A4_BASE_HEIGHT, ZOOM_CONSTRAINTS } from '../utils/constants';
import { generateId } from '../utils/geometry';
import alertIcon from '../../../assets/images/alertIcon.svg';
import './TabRxCanvas.scss';

const INITIAL_TOOL_SETTINGS = {
  activeTool: 'pen',
  color: '#000000',
  thickness: 2,
  brushType: 'fine',
  eraserSize: 20,
  fontSize: 16
};

const TabRxCanvas = ({ 
  patient = null,
  onSave = null,
  onExit = null,
  backgroundImage = null 
}) => {
  // Application State - Multi-page support
  // Pages metadata: Array of page objects with { id, type: 'blank' | 'template', templateId, templateImageIndex }
  const [pagesMetadata, setPagesMetadata] = useState([{ id: generateId(), type: 'blank', templateId: null, templateImageIndex: null }]);
  
  // Store strokes and textElements per page: { [pageId]: data }
  const [strokesByPage, setStrokesByPage] = useState({});
  const [textElementsByPage, setTextElementsByPage] = useState({});
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  
  // Initialize strokes and textElements for all pages in metadata
  useEffect(() => {
    setStrokesByPage(prev => {
      const updated = { ...prev };
      pagesMetadata.forEach(page => {
        if (!updated[page.id]) {
          updated[page.id] = [];
        }
      });
      return updated;
    });
    setTextElementsByPage(prev => {
      const updated = { ...prev };
      pagesMetadata.forEach(page => {
        if (!updated[page.id]) {
          updated[page.id] = [];
        }
      });
      return updated;
    });
  }, [pagesMetadata]);
  
  // Current page data (derived from page-specific state)
  const currentPageId = pagesMetadata[currentPageIndex]?.id;
  const strokes = currentPageId ? (strokesByPage[currentPageId] || []) : [];
  const textElements = currentPageId ? (textElementsByPage[currentPageId] || []) : [];
  
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  
  // Viewport State
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [panOffset, setPanOffset] = useState({ x: 20, y: 20 }); 

  // Tool State
  const [toolSettings, setToolSettings] = useState(INITIAL_TOOL_SETTINGS);
  const [showToolbarSettings, setShowToolbarSettings] = useState(false);
  
  // UI State
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle');
  
  // Template State
  const [selectedTemplateId, setSelectedTemplateId] = useState('blank');
  const [showTemplateDrawer, setShowTemplateDrawer] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [uploadCanvasDrawer, setUploadCanvasDrawer] = useState(false);
  
  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pageToDeleteIndex, setPageToDeleteIndex] = useState(null);

  // Helper to fit canvas to available space
  const fitCanvasToScreen = useCallback(() => {
     const drawerWidth = showTemplateDrawer ? 320 : 0;
     const availableWidth = window.innerWidth - drawerWidth - 40; 
     
     let optimalZoom = availableWidth / A4_BASE_WIDTH;
     optimalZoom = Math.min(Math.max(optimalZoom, ZOOM_CONSTRAINTS.MIN), 1.2); 
     
     setZoomLevel(optimalZoom);
     const centeredX = (availableWidth - (A4_BASE_WIDTH * optimalZoom)) / 2 + 20;
     setPanOffset({ x: Math.max(20, centeredX), y: 40 });
  }, [showTemplateDrawer]);

  useEffect(() => {
    fitCanvasToScreen();
  }, [fitCanvasToScreen]);

  // Load templates on mount
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const result = await getTemplates();
        if (result.success) {
          setTemplates(result.data || []);
        }
      } catch (error) {
        console.error('Error loading templates:', error);
      }
    };
    loadTemplates();
  }, []);

  // Get background image for a specific page metadata
  const getBackgroundForPage = useCallback((pageMeta) => {
    if (!pageMeta || pageMeta.type === 'blank') {
      return null;
    }

    if (pageMeta.type === 'template' && pageMeta.templateId) {
      const template = templates.find(t => t.id === pageMeta.templateId);
      if (!template) {
        return null;
      }

      const imageIndex = pageMeta.templateImageIndex ?? 0;
      
      if (template.uploaded_files && template.uploaded_files.length > 0) {
        const file = template.uploaded_files[imageIndex];
        if (file) {
          return file.file_url || file.url || null;
        }
      } else if (template.pages && template.pages.length > 0) {
        const page = template.pages[imageIndex];
        if (page) {
          return typeof page === 'string' ? page : page.imageUrl || null;
        }
      }
    }

    return null;
  }, [templates]);

  // Handlers
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, ZOOM_CONSTRAINTS.MAX));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, ZOOM_CONSTRAINTS.MIN));
  const handleResetZoom = () => setZoomLevel(1.0);

  const handleInteractionStart = useCallback(() => {
    setShowToolbarSettings(false);
  }, []);

  const handleStrokeComplete = useCallback((pageId, newStroke) => {
    const pageStrokes = strokesByPage[pageId] || [];
    setUndoStack(prev => [...prev, pageStrokes]);
    setRedoStack([]); 
    setStrokesByPage(prev => ({
      ...prev,
      [pageId]: [...pageStrokes, newStroke]
    }));
    // Update currentPageIndex based on pageId
    const pageIndex = pagesMetadata.findIndex(p => p.id === pageId);
    if (pageIndex !== -1) {
      setCurrentPageIndex(pageIndex);
    }
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  }, [strokesByPage, pagesMetadata]);

  const handleEraseStart = useCallback((pageId) => {
    const pageStrokes = strokesByPage[pageId] || [];
    setUndoStack(prev => [...prev, pageStrokes]);
    setRedoStack([]);
  }, [strokesByPage]);

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0 || !currentPageId) return;
    const previousStrokes = undoStack[undoStack.length - 1];
    const newUndoStack = undoStack.slice(0, -1);
    setRedoStack(prev => [...prev, strokes]);
    setStrokesByPage(prev => ({
      ...prev,
      [currentPageId]: previousStrokes
    }));
    setUndoStack(newUndoStack);
  }, [undoStack, strokes, currentPageId]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0 || !currentPageId) return;
    const nextStrokes = redoStack[redoStack.length - 1];
    const newRedoStack = redoStack.slice(0, -1);
    setUndoStack(prev => [...prev, strokes]);
    setStrokesByPage(prev => ({
      ...prev,
      [currentPageId]: nextStrokes
    }));
    setRedoStack(newRedoStack);
  }, [redoStack, strokes, currentPageId]);

  const handleSave = useCallback(() => {
    if (onSave) {
      setSaveStatus('saving');
      const sessionData = {
        patientId: patient?.id || null,
        pagesMetadata, // Save page metadata
        strokesByPage, // Save all pages
        textElementsByPage, // Save all pages
        currentPageIndex,
        zoomLevel,
        panOffset,
        templateId: selectedTemplateId,
        status: 'draft'
      };
      
      onSave(sessionData);
      
      setTimeout(() => {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }, 1000);
    }
  }, [pagesMetadata, strokesByPage, textElementsByPage, currentPageIndex, zoomLevel, panOffset, patient, selectedTemplateId, onSave]);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplateId(templateId);
    // Reset to first page when template changes
    setCurrentPageIndex(0);
    
    // Initialize pages based on template
    if (templateId === 'blank' || !templateId) {
      // Blank template - single blank page
      const newPageId = generateId();
      setPagesMetadata([{ id: newPageId, type: 'blank', templateId: null, templateImageIndex: null }]);
      setStrokesByPage({ [newPageId]: [] });
      setTextElementsByPage({ [newPageId]: [] });
    } else {
      const template = templates.find(t => t.id === templateId);
      if (template) {
        const pageCount = template.uploaded_files?.length || template.pages?.length || 1;
        const newPages = Array.from({ length: pageCount }, (_, i) => ({
          id: generateId(),
          type: 'template',
          templateId: templateId,
          templateImageIndex: i
        }));
        setPagesMetadata(newPages);
        // Initialize strokes and textElements for new pages
        const newStrokes = {};
        const newTextElements = {};
        newPages.forEach(page => {
          newStrokes[page.id] = [];
          newTextElements[page.id] = [];
        });
        setStrokesByPage(newStrokes);
        setTextElementsByPage(newTextElements);
      }
    }
    // Keep drawer open - don't close after selection
  };

  // Add new page after a specific index
  const handleAddPage = useCallback((afterIndex, pageType) => {
    const newPageId = generateId();
    let newPageMeta;
    
    if (pageType === 'blank') {
      newPageMeta = { id: newPageId, type: 'blank', templateId: null, templateImageIndex: null };
    } else if (pageType === 'same') {
      // Add same canvas page - copy the metadata from the page at afterIndex
      const sourcePage = pagesMetadata[afterIndex];
      if (sourcePage) {
        newPageMeta = {
          id: newPageId,
          type: sourcePage.type,
          templateId: sourcePage.templateId,
          templateImageIndex: sourcePage.templateImageIndex
        };
      } else {
        newPageMeta = { id: newPageId, type: 'blank', templateId: null, templateImageIndex: null };
      }
    } else {
      return;
    }

    // Insert new page after afterIndex
    const newPages = [...pagesMetadata];
    newPages.splice(afterIndex + 1, 0, newPageMeta);
    setPagesMetadata(newPages);

    // Initialize empty strokes and textElements for the new page
    setStrokesByPage(prev => ({
      ...prev,
      [newPageId]: []
    }));
    setTextElementsByPage(prev => ({
      ...prev,
      [newPageId]: []
    }));

    // Focus on the new page
    setCurrentPageIndex(afterIndex + 1);
    setUndoStack([]);
    setRedoStack([]);
  }, [pagesMetadata]);

  // Show delete confirmation modal
  const showDeleteModal = useCallback((pageIndex) => {
    if (pagesMetadata.length <= 1) {
      message.warning('Cannot delete the last page');
      return;
    }
    setPageToDeleteIndex(pageIndex);
    setIsDeleteModalOpen(true);
  }, [pagesMetadata.length]);

  // Hide delete confirmation modal
  const hideDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setPageToDeleteIndex(null);
  }, []);

  // Delete a page (called after confirmation)
  const handleDeletePage = useCallback((pageIndex) => {
    if (pagesMetadata.length <= 1) {
      message.warning('Cannot delete the last page');
      return;
    }

    const pageToDelete = pagesMetadata[pageIndex];
    if (!pageToDelete) return;

    // Remove page from metadata
    const newPages = pagesMetadata.filter((_, i) => i !== pageIndex);
    setPagesMetadata(newPages);

    // Remove strokes and textElements for deleted page
    setStrokesByPage(prev => {
      const updated = { ...prev };
      delete updated[pageToDelete.id];
      return updated;
    });
    setTextElementsByPage(prev => {
      const updated = { ...prev };
      delete updated[pageToDelete.id];
      return updated;
    });

    // Adjust currentPageIndex
    if (currentPageIndex >= newPages.length) {
      setCurrentPageIndex(newPages.length - 1);
    } else if (currentPageIndex > pageIndex) {
      // If we deleted a page before the current one, adjust index
      setCurrentPageIndex(currentPageIndex - 1);
    } else if (currentPageIndex === pageIndex) {
      // If we deleted the current page, move to previous page or stay at 0
      setCurrentPageIndex(Math.max(0, pageIndex - 1));
    }

    setUndoStack([]);
    setRedoStack([]);
    message.success('Page deleted successfully');
  }, [pagesMetadata, currentPageIndex]);

  // Confirm and delete page
  const confirmDeletePage = useCallback(() => {
    if (pageToDeleteIndex !== null) {
      handleDeletePage(pageToDeleteIndex);
      hideDeleteModal();
    }
  }, [pageToDeleteIndex, handleDeletePage, hideDeleteModal]);

  const refreshTemplates = useCallback(async () => {
    try {
      const result = await getTemplates();
      if (result.success) {
        setTemplates(result.data || []);
      }
    } catch (error) {
      console.error('Error refreshing templates:', error);
    }
  }, []);

  const handleAddNewTemplate = () => {
    // Open template upload drawer
    setUploadCanvasDrawer(true);
  };

  // Handle drawer close
  const handleDrawerUploadCanvas = () => {
    setUploadCanvasDrawer(false);
  };

  // Handle canvas upload - refresh templates and auto-select new template
  const handleCanvasUploaded = useCallback(async (templateData) => {
    message.success(`Template "${templateData.title}" uploaded successfully!`);
    
    // Close the upload drawer first
    setUploadCanvasDrawer(false);
    
    // Refresh the templates list to show the newly uploaded template
    try {
      const result = await getTemplates();
      if (result.success) {
        const updatedTemplates = result.data || [];
        setTemplates(updatedTemplates);
        
        // Auto-select the newly created template using updated templates
        if (templateData && templateData.id) {
          const newTemplate = updatedTemplates.find(t => t.id === templateData.id);
          if (newTemplate) {
            // Use the updated templates directly for selection
            setSelectedTemplateId(templateData.id);
            setCurrentPageIndex(0);
            
            // Initialize pages based on the new template
            const pageCount = newTemplate.uploaded_files?.length || newTemplate.pages?.length || 1;
            const newPages = Array.from({ length: pageCount }, (_, i) => ({
              id: generateId(),
              type: 'template',
              templateId: templateData.id,
              templateImageIndex: i
            }));
            setPagesMetadata(newPages);
            
            // Initialize strokes and textElements for new pages
            const newStrokes = {};
            const newTextElements = {};
            newPages.forEach(page => {
              newStrokes[page.id] = [];
              newTextElements[page.id] = [];
            });
            setStrokesByPage(newStrokes);
            setTextElementsByPage(newTextElements);
          }
        }
      }
    } catch (error) {
      console.error('Error refreshing templates after upload:', error);
    }
  }, []);

  return (
    <div className="tab-rx-canvas-page">
      {/* Template Drawer */}
      <TemplateSidebar
        visible={showTemplateDrawer}
        onClose={() => setShowTemplateDrawer(false)}
        selectedTemplateId={selectedTemplateId}
        onTemplateSelect={handleTemplateSelect}
        onAddNew={handleAddNewTemplate}
        templates={templates}
        onTemplatesUpdate={setTemplates}
      />

      {/* Optional Header Bar */}
      {patient && (
        <div className="tab-rx-header">
          <div className="header-info">
            <h2>{patient.name || 'Patient'}</h2>
            {patient.age && <p>Age: {patient.age}</p>}
          </div>
          <div className="header-actions">
            <button
              onClick={() => setShowTemplateDrawer(true)}
              className="select-template-button"
            >
              Select Letterhead
            </button>
            {onSave && (
              <button
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="save-button"
              >
                {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save'}
              </button>
            )}
            {onExit && (
              <button
                onClick={onExit}
                className="exit-button"
              >
                Exit
              </button>
            )}
          </div>
        </div>
      )}
      
      <div className="canvas-wrapper-container">
        {/* Scrollable pages container - all pages stacked vertically */}
        {/* 
          Note: We add extra right padding when the template drawer is open so that 
          the canvas stays visually centered in the remaining middle section.
          This works even when TabRxCanvas is embedded inside a layout with its 
          own left sidebar, because we only adjust the internal right padding.
        */}
        <div 
          className="canvas-pages-scroll"
          style={{
            paddingRight: showTemplateDrawer ? 320 : 0
          }}
        >
          <div className="canvas-pages-content">
            {pagesMetadata.map((pageMeta, pageIndex) => {
              const pageId = pageMeta.id;
              const pageStrokes = strokesByPage[pageId] || [];
              const pageTextElements = textElementsByPage[pageId] || [];
              
              // Get dropdown menu items for add page
              const getAddPageMenuItems = () => [
                {
                  key: 'same',
                  label: 'Add Same Canvas Page',
                  onClick: () => handleAddPage(pageIndex, 'same')
                },
                {
                  key: 'blank',
                  label: 'Add Blank Page',
                  onClick: () => handleAddPage(pageIndex, 'blank')
                }
              ];

              const isSelected = currentPageIndex === pageIndex;

              return (
                <div 
                  key={pageId} 
                  className={`canvas-page-block ${isSelected ? 'selected' : ''}`}
                  style={{
                    width: A4_BASE_WIDTH * zoomLevel,
                    height: A4_BASE_HEIGHT * zoomLevel
                  }}
                >
                  {/* Page Number Label */}
                  <div className="page-number-label">
                    Page {pageIndex + 1}
                  </div>
                  
                  <CanvasEngine
                    strokes={pageStrokes}
                    setStrokes={(newStrokes) => {
                      setStrokesByPage(prev => ({
                        ...prev,
                        [pageId]: newStrokes
                      }));
                    }}
                    textElements={pageTextElements}
                    setTextElements={(newTextElements) => {
                      setTextElementsByPage(prev => ({
                        ...prev,
                        [pageId]: newTextElements
                      }));
                    }}
                    onStrokeComplete={(newStroke) => handleStrokeComplete(pageId, newStroke)}
                    onEraseStart={() => handleEraseStart(pageId)}
                    toolSettings={toolSettings}
                    setToolSettings={setToolSettings}
                    zoomLevel={zoomLevel}
                    setZoomLevel={setZoomLevel}
                    panOffset={{ x: 0, y: 0 }}
                    setPanOffset={() => {}}
                    onInteractionStart={handleInteractionStart}
                    onPageFocus={() => setCurrentPageIndex(pageIndex)}
                    backgroundImage={backgroundImage && pageIndex === 0 ? backgroundImage : getBackgroundForPage(pageMeta)}
                    embeddedInScroll={true}
                  />
                  
                  {/* Page Action Buttons */}
                  <div className="page-action-buttons">
                    <button
                      className="page-action-btn delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        showDeleteModal(pageIndex);
                      }}
                      disabled={pagesMetadata.length <= 1}
                      title="Delete Page"
                    >
                      <DeleteOutlined />
                    </button>
                    
                    <Dropdown
                      menu={{ items: getAddPageMenuItems() }}
                      trigger={['click']}
                      placement="topRight"
                      overlayClassName="page-add-dropdown"
                    >
                      <button 
                        className="page-action-btn add-btn"
                        onClick={(e) => e.stopPropagation()}
                        title="Add Page"
                      >
                        <PlusOutlined />
                      </button>
                    </Dropdown>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Toolbar
          toolSettings={toolSettings}
          setToolSettings={setToolSettings}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={undoStack.length > 0}
          canRedo={redoStack.length > 0}
          showSettings={showToolbarSettings}
          setShowSettings={setShowToolbarSettings}
          zoomLevel={zoomLevel}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onFit={fitCanvasToScreen}
        />
      </div>

      {/* Upload RX Template Drawer */}
      <RxTemplateUploadDrawer
        visible={uploadCanvasDrawer}
        onClose={handleDrawerUploadCanvas}
        onSave={handleCanvasUploaded}
        source="tab-rx"
      />

      {/* Delete Page Confirmation Modal */}
      <CommonModal
        isModalOpen={isDeleteModalOpen}
        onCancel={hideDeleteModal}
        modalWidth={500}
        title="You may lose your data"
        modalBody={
          <>
            <div className="alert-warning rounded-10px p-2 patient-details">
              <div className="d-flex align-items-center">
                <img className="me-3" src={alertIcon} alt="Warning" />
                <span>
                  Are you sure you want to delete this page? <br />
                  This action cannot be undone and you will lose all data on this page.
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="d-flex align-items-center mt-2 justify-content-end">
                <div
                  onClick={confirmDeletePage}
                  className="me-4 text-decoration-underline btn p-0 text-main"
                  style={{ cursor: 'pointer' }}
                >
                  Delete
                </div>
                <Button
                  onClick={hideDeleteModal}
                  className="lh-lg btn btn-primary3 btn-41 px-4"
                >
                  <span>No</span>
                </Button>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
};

export default TabRxCanvas;
