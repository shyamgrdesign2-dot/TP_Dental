import React, { useState, useEffect, useCallback, useRef, useImperativeHandle, forwardRef } from 'react';
import { Dropdown, message, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import CanvasEngine from './CanvasEngine';
import Toolbar from './Toolbar';
import TemplateSidebar from './TemplateSidebar';
import RxTemplateUploadDrawer from '../../smartSync/components/RxTemplateUploadDrawer';
import CommonModal from '../../../common/CommonModal';
import { getTemplates } from '../services/templateService';
import { A4_BASE_WIDTH, A4_BASE_HEIGHT, ZOOM_CONSTRAINTS } from '../utils/constants';
import { generateId } from '../utils/geometry';
import { generateStandardTemplateBackground } from '../utils/standardTemplateHelper';
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

const TabRxCanvas = forwardRef(({
  patient = null,
  profile = null,
  initialTemplateId = 'blank',
  onSave = null,
  onExit = null,
  backgroundImage = null,
  showTemplateDrawer = true,
  onToggleTemplateDrawer = null,
  onContentChange = null,
  backgroundImages = []
}, ref) => {
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
  const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplateId);
  const [templates, setTemplates] = useState([]);
  const [uploadCanvasDrawer, setUploadCanvasDrawer] = useState(false);

  // Sync with prop when it arrives from parent component (e.g. from backend metadata fetch)
  useEffect(() => {
    if (initialTemplateId && initialTemplateId !== selectedTemplateId) {
      setSelectedTemplateId(initialTemplateId);
      setCurrentPageIndex(0);

      const newPageId = generateId();
      if (initialTemplateId === 'blank') {
        setPagesMetadata([{ id: newPageId, type: 'blank', templateId: null, templateImageIndex: null }]);
      } else if (initialTemplateId === 'standard') {
        setPagesMetadata([{ id: newPageId, type: 'template', templateId: 'standard', templateImageIndex: null }]);
      } else {
        // If it's a custom template, we let handleTemplateSelect handle it or rely on the user.
        // For standard and blank, we initialize directly.
        setPagesMetadata([{ id: newPageId, type: 'template', templateId: initialTemplateId, templateImageIndex: null }]);
      }
      setStrokesByPage({ [newPageId]: [] });
      setTextElementsByPage({ [newPageId]: [] });
    }
  }, [initialTemplateId]);

  // Handle external multi-page custom background images
  const backgroundImagesStr = backgroundImages ? backgroundImages.join(',') : '';
  useEffect(() => {
    if (backgroundImages && backgroundImages.length > 0) {
      // Check if we already have the same number of 'custom' pages with the same image content
      // Ignore if we manually added more pages than what was initially passed
      const hasInitialImages = backgroundImages.every((img, i) =>
        pagesMetadata[i]?.type === 'custom' && pagesMetadata[i]?.customImage === img
      );
      if (hasInitialImages && pagesMetadata.length >= backgroundImages.length) return;

      const newPages = backgroundImages.map((img, i) => ({
        id: generateId(),
        type: 'custom',
        templateId: null,
        templateImageIndex: i,
        customImage: img
      }));

      setCurrentPageIndex(0);
      setPagesMetadata(newPages);

      const newStrokes = {};
      const newTextElements = {};
      newPages.forEach(page => {
        newStrokes[page.id] = [];
        newTextElements[page.id] = [];
      });
      setStrokesByPage(newStrokes);
      setTextElementsByPage(newTextElements);
    }
  }, [backgroundImagesStr]);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pageToDeleteIndex, setPageToDeleteIndex] = useState(null);

  // Template switch confirmation modal state
  const [isTemplateSwitchModalOpen, setIsTemplateSwitchModalOpen] = useState(false);
  const [pendingTemplateId, setPendingTemplateId] = useState(null);

  // Refs to access canvas elements for export
  const canvasRefsByPage = useRef({});

  // Expose export method via ref
  useImperativeHandle(ref, () => ({
    exportToImages: async () => {
      console.log('📤 [TabRxCanvas] exportToImages called', { pagesCount: pagesMetadata.length });
      const files = [];
      const blobs = [];

      for (let i = 0; i < pagesMetadata.length; i++) {
        const pageMeta = pagesMetadata[i];
        const pageId = pageMeta.id;
        const canvasEngineRef = canvasRefsByPage.current[pageId];

        console.log(`📄 [TabRxCanvas] Processing page ${i + 1} (${pageId}):`, {
          hasRef: !!canvasEngineRef,
          hasGetCanvas: !!(canvasEngineRef?.getCanvas),
          refType: typeof canvasEngineRef,
          refKeys: canvasEngineRef ? Object.keys(canvasEngineRef) : []
        });

        if (!canvasEngineRef || typeof canvasEngineRef.getCanvas !== 'function') {
          console.warn(`⚠️ [TabRxCanvas] No valid ref for page ${i + 1}:`, {
            hasRef: !!canvasEngineRef,
            hasGetCanvas: typeof canvasEngineRef?.getCanvas === 'function'
          });
          continue;
        }

        // Get the actual canvas element from CanvasEngine
        // Note: canvasEngineRef is the imperative handle object (not a ref with .current)
        // It directly has getCanvas() method
        const canvas = canvasEngineRef.getCanvas();

        if (!canvas) {
          console.warn(`⚠️ [TabRxCanvas] No canvas element for page ${i + 1}`);
          continue;
        }

        console.log(`✅ [TabRxCanvas] Got canvas for page ${i + 1}:`, {
          width: canvas.width,
          height: canvas.height,
          hasStrokes: strokesByPage[pageId]?.length > 0,
          strokesCount: strokesByPage[pageId]?.length || 0,
          hasText: textElementsByPage[pageId]?.length > 0,
          textCount: textElementsByPage[pageId]?.length || 0
        });

        try {
          // Try to convert canvas to blob directly
          let blob;
          try {
            blob = await new Promise((resolve, reject) => {
              canvas.toBlob((blob) => {
                if (blob) {
                  resolve(blob);
                } else {
                  reject(new Error('Canvas to Blob conversion failed'));
                }
              }, 'image/jpeg', 0.95);
            });
          } catch (taintedError) {
            // If canvas is tainted, create a new canvas and redraw everything
            if (taintedError.message?.includes('Tainted') || taintedError.name === 'SecurityError') {
              console.warn(`⚠️ [TabRxCanvas] Canvas tainted for page ${i + 1}, using fallback export method`);
              blob = await exportCanvasWithFallback(pageMeta, strokesByPage[pageId] || [], textElementsByPage[pageId] || []);
            } else {
              throw taintedError;
            }
          }

          const fileName = `${uuidv4()}.jpeg`;
          const file = new File([blob], fileName, { type: 'image/jpeg' });

          console.log(`📦 [TabRxCanvas] Page ${i + 1} converted:`, {
            fileName,
            fileSize: `${(file.size / 1024).toFixed(2)}KB`,
            sizeInBytes: file.size,
            threshold: 5 * 1000,
            passesThreshold: file.size > 5 * 1000
          });

          // Check if file has meaningful content (5KB threshold)
          // OR if there are actual strokes/text elements (even if file is small)
          const hasStrokes = strokesByPage[pageId]?.length > 0;
          const hasText = textElementsByPage[pageId]?.some(el => el.content && el.content.trim().length > 0);
          const hasContent = hasStrokes || hasText;

          if (file.size > 5 * 1000 || hasContent) {
            console.log(`✅ [TabRxCanvas] Including page ${i + 1} in export:`, {
              reason: file.size > 5 * 1000 ? 'file size' : 'has content',
              hasStrokes,
              hasText
            });
            blobs.push(blob);
            files.push(file);
          } else {
            console.log(`⏭️ [TabRxCanvas] Skipping page ${i + 1}: blank canvas (no content and size < 5KB)`);
          }
        } catch (error) {
          console.error(`❌ [TabRxCanvas] Error converting canvas for page ${i + 1}:`, error);
        }
      }

      console.log(`✅ [TabRxCanvas] Export complete:`, {
        filesCount: files.length,
        blobsCount: blobs.length,
        fileNames: files.map(f => f.name),
        fileSizes: files.map(f => `${(f.size / 1024).toFixed(2)}KB`)
      });

      return { files, blobs };
    },
    getCanvasData: () => {
      return {
        pagesMetadata,
        strokesByPage,
        textElementsByPage,
        selectedTemplateId
      };
    },
    clearCanvas: () => {
      // Reset to blank canvas
      const newPageId = generateId();
      setPagesMetadata([{ id: newPageId, type: 'blank', templateId: null, templateImageIndex: null }]);
      setStrokesByPage({ [newPageId]: [] });
      setTextElementsByPage({ [newPageId]: [] });
      setCurrentPageIndex(0);
      setSelectedTemplateId('blank');
      // Notify parent that content is cleared
      if (onContentChange) {
        onContentChange(false);
      }
    }
  }), [pagesMetadata, strokesByPage, textElementsByPage, selectedTemplateId, onContentChange]);

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
      if (pageMeta.templateId === 'standard') {
        return generateStandardTemplateBackground(profile);
      }

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

  // Fallback export method: Create a new canvas and redraw everything to avoid tainted canvas errors
  const exportCanvasWithFallback = useCallback(async (pageMeta, strokes, textElements) => {
    console.log(`🔄 [TabRxCanvas] Using fallback export for page with template:`, {
      templateId: pageMeta.templateId,
      imageIndex: pageMeta.templateImageIndex,
      strokesCount: strokes.length,
      textCount: textElements.length
    });

    // Create a new canvas
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = A4_BASE_WIDTH;
    exportCanvas.height = A4_BASE_HEIGHT;
    const ctx = exportCanvas.getContext('2d');

    // Draw white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Load and draw background image with CORS
    const backgroundUrl = getBackgroundForPage(pageMeta);
    if (backgroundUrl) {
      try {
        const bgImg = new Image();
        bgImg.crossOrigin = "anonymous";
        await new Promise((resolve, reject) => {
          bgImg.onload = resolve;
          bgImg.onerror = () => {
            console.warn('⚠️ [TabRxCanvas] Failed to load background image for fallback export, using blank background');
            resolve(); // Continue without background image
          };
          bgImg.src = backgroundUrl;
        });

        if (bgImg.complete && bgImg.naturalWidth > 0) {
          ctx.drawImage(bgImg, 0, 0, exportCanvas.width, exportCanvas.height);
        }
      } catch (error) {
        console.warn('⚠️ [TabRxCanvas] Error loading background image for fallback export:', error);
      }
    }

    // Draw strokes
    const { getMidPoint } = require('../utils/geometry');
    strokes.forEach((stroke) => {
      if (stroke.points.length < 2) return;

      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.thickness;

      if (stroke.tool === 'highlighter') {
        ctx.globalAlpha = 0.3;
        ctx.globalCompositeOperation = 'multiply';
        ctx.lineWidth = stroke.thickness * 2;
      } else {
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = 'source-over';
      }

      const p0 = stroke.points[0];
      ctx.moveTo(p0.x, p0.y);

      for (let i = 1; i < stroke.points.length - 1; i++) {
        const p1 = stroke.points[i];
        const p2 = stroke.points[i + 1];
        const mid = getMidPoint(p1, p2);
        ctx.quadraticCurveTo(p1.x, p1.y, mid.x, mid.y);
      }

      const last = stroke.points[stroke.points.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();

      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';
    });

    // Draw text elements
    textElements.forEach((textEl) => {
      if (!textEl.content || !textEl.content.trim()) return;

      ctx.fillStyle = textEl.color || '#000000';
      ctx.font = `${textEl.fontSize || 16}px Arial`;
      ctx.textBaseline = 'top';
      ctx.fillText(textEl.content, textEl.x, textEl.y);
    });

    // Convert to blob
    return new Promise((resolve, reject) => {
      exportCanvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Fallback canvas to Blob conversion failed'));
        }
      }, 'image/jpeg', 0.95);
    });
  }, [getBackgroundForPage]);

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
    setStrokesByPage(prev => {
      const updated = {
        ...prev,
        [pageId]: [...pageStrokes, newStroke]
      };
      return updated;
    });
    
    // ✅ CRITICAL: Call onContentChange OUTSIDE of setStrokesByPage
    // This prevents React warning: "Cannot update component during render"
    // Use setTimeout to defer to next tick, ensuring it's not during render phase
    if (onContentChange) {
      setTimeout(() => {
        onContentChange(true);
      }, 0);
    }
    
    // Update currentPageIndex based on pageId
    const pageIndex = pagesMetadata.findIndex(p => p.id === pageId);
    if (pageIndex !== -1) {
      setCurrentPageIndex(pageIndex);
    }
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  }, [strokesByPage, pagesMetadata, onContentChange]);

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

  const hasAnyCanvasContent = useCallback(() => {
    const hasStrokes = Object.values(strokesByPage || {}).some((arr) => (arr || []).length > 0);
    const hasText = Object.values(textElementsByPage || {}).some((arr) =>
      (arr || []).some((el) => el?.content && el.content.trim().length > 0),
    );
    return hasStrokes || hasText;
  }, [strokesByPage, textElementsByPage]);

  const executeTemplateSelect = useCallback((templateId) => {
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
    } else if (templateId === 'standard') {
      // Standard template - single template page
      const newPageId = generateId();
      setPagesMetadata([{ id: newPageId, type: 'template', templateId: 'standard', templateImageIndex: null }]);
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
  }, [templates]);

  const handleTemplateSelect = useCallback((templateId) => {
    // No-op if selecting same template
    if (templateId === selectedTemplateId) return;

    // If there is any existing content, confirm before switching (data will be cleared)
    if (hasAnyCanvasContent()) {
      setPendingTemplateId(templateId);
      setIsTemplateSwitchModalOpen(true);
      return;
    }

    executeTemplateSelect(templateId);
  }, [selectedTemplateId, hasAnyCanvasContent, executeTemplateSelect]);

  const hideTemplateSwitchModal = useCallback(() => {
    setIsTemplateSwitchModalOpen(false);
    setPendingTemplateId(null);
  }, []);

  const confirmTemplateSwitch = useCallback(() => {
    if (!pendingTemplateId) return;
    executeTemplateSelect(pendingTemplateId);
    hideTemplateSwitchModal();
  }, [pendingTemplateId, executeTemplateSelect, hideTemplateSwitchModal]);

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
    // message.success(`Template "${templateData.title}" uploaded successfully!`);

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
        onClose={onToggleTemplateDrawer || (() => { })}
        selectedTemplateId={selectedTemplateId}
        onTemplateSelect={handleTemplateSelect}
        onAddNew={handleAddNewTemplate}
        templates={templates}
        onTemplatesUpdate={setTemplates}
        profile={profile}
      />


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
                    ref={(canvasRef) => {
                      if (canvasRef) {
                        canvasRefsByPage.current[pageId] = canvasRef;
                      } else {
                        delete canvasRefsByPage.current[pageId];
                      }
                    }}
                    strokes={pageStrokes}
                    setStrokes={(newStrokes) => {
                      setStrokesByPage(prev => {
                        const prevStrokes = prev[pageId] || [];
                        const updated = {
                          ...prev,
                          [pageId]: newStrokes
                        };
                        // Notify parent if content changed
                        if (onContentChange) {
                          const hasContent = newStrokes.length > 0;
                          // Check if content state changed
                          const prevHasContent = prevStrokes.length > 0;
                          if (hasContent !== prevHasContent) {
                            onContentChange(hasContent);
                          } else if (hasContent) {
                            // Content exists, ensure parent knows
                            onContentChange(true);
                          }
                        }
                        return updated;
                      });
                    }}
                    textElements={pageTextElements}
                    setTextElements={(newTextElements) => {
                      setTextElementsByPage(prev => {
                        const prevTextElements = prev[pageId] || [];
                        const updated = {
                          ...prev,
                          [pageId]: newTextElements
                        };
                        // Notify parent if content changed
                        if (onContentChange) {
                          const hasContent = newTextElements.length > 0 &&
                            newTextElements.some(el => el.content && el.content.trim().length > 0);
                          const prevHasContent = prevTextElements.length > 0 &&
                            prevTextElements.some(el => el.content && el.content.trim().length > 0);
                          if (hasContent !== prevHasContent) {
                            onContentChange(hasContent);
                          } else if (hasContent) {
                            // Content exists, ensure parent knows
                            onContentChange(true);
                          }
                        }
                        return updated;
                      });
                    }}
                    onStrokeComplete={(newStroke) => handleStrokeComplete(pageId, newStroke)}
                    onEraseStart={() => handleEraseStart(pageId)}
                    toolSettings={toolSettings}
                    setToolSettings={setToolSettings}
                    zoomLevel={zoomLevel}
                    setZoomLevel={setZoomLevel}
                    panOffset={{ x: 0, y: 0 }}
                    setPanOffset={() => { }}
                    onInteractionStart={handleInteractionStart}
                    onPageFocus={() => setCurrentPageIndex(pageIndex)}
                    backgroundImage={
                      pageMeta.type === 'custom'
                        ? pageMeta.customImage
                        : (backgroundImage && pageIndex === 0 ? backgroundImage : getBackgroundForPage(pageMeta))
                    }
                    embeddedInScroll={true}
                    onContentChange={onContentChange}
                  />

                  {/* Page Action Buttons */}
                  <div
                    className="page-action-buttons"
                    style={{
                      pointerEvents: 'auto',
                    }}
                  >
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

      {/* Template Switch Confirmation Modal */}
      <CommonModal
        isModalOpen={isTemplateSwitchModalOpen}
        onCancel={hideTemplateSwitchModal}
        modalWidth={500}
        title="You may lose your data"
        modalBody={
          <>
            <div className="alert-warning rounded-10px p-2 patient-details">
              <div className="d-flex align-items-center">
                <img className="me-3" src={alertIcon} alt="Warning" />
                <span>
                  Switching the letterhead/template will clear the current canvas pages and content. <br />
                  Do you want to continue?
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="d-flex align-items-center mt-2 justify-content-end">
                <div
                  onClick={confirmTemplateSwitch}
                  className="me-4 text-decoration-underline btn p-0 text-main"
                  style={{ cursor: 'pointer' }}
                >
                  Yes, switch
                </div>
                <Button
                  onClick={hideTemplateSwitchModal}
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
});

TabRxCanvas.displayName = 'TabRxCanvas';

export default TabRxCanvas;
