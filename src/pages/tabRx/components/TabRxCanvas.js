import React, { useState, useEffect, useCallback } from 'react';
import CanvasEngine from './CanvasEngine';
import Toolbar from './Toolbar';
import TemplateSidebar from './TemplateSidebar';
import { getTemplates } from '../services/templateService';
import { A4_BASE_WIDTH, A4_BASE_HEIGHT, ZOOM_CONSTRAINTS } from '../utils/constants';
import { generateId } from '../utils/geometry';
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
  // Application State
  const [strokes, setStrokes] = useState([]);
  const [textElements, setTextElements] = useState([]);
  
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

  // Get active background image from selected template
  const getActiveBackground = useCallback(() => {
    // If blank template is selected, return undefined (no background)
    if (selectedTemplateId === 'blank' || !selectedTemplateId) {
      return null;
    }

    // Find the selected template
    const template = templates.find(t => t.id === selectedTemplateId);
    if (!template) {
      return null;
    }

    // Get the first page image URL
    // Support both uploaded_files format (from API) and pages format (from reference)
    if (template.uploaded_files && template.uploaded_files.length > 0) {
      const firstFile = template.uploaded_files[0];
      return firstFile.file_url || firstFile.url || null;
    } else if (template.pages && template.pages.length > 0) {
      const firstPage = template.pages[0];
      // Support both string format and object format
      return typeof firstPage === 'string' ? firstPage : firstPage.imageUrl || null;
    }

    return null;
  }, [selectedTemplateId, templates]);

  // Handlers
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, ZOOM_CONSTRAINTS.MAX));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, ZOOM_CONSTRAINTS.MIN));
  const handleResetZoom = () => setZoomLevel(1.0);

  const handleInteractionStart = useCallback(() => {
    setShowToolbarSettings(false);
  }, []);

  const handleStrokeComplete = useCallback((newStroke) => {
    setUndoStack(prev => [...prev, strokes]);
    setRedoStack([]); 
    setStrokes(prev => [...prev, newStroke]);
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  }, [strokes]);

  const handleEraseStart = useCallback(() => {
    setUndoStack(prev => [...prev, strokes]);
    setRedoStack([]);
  }, [strokes]);

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    const previousStrokes = undoStack[undoStack.length - 1];
    const newUndoStack = undoStack.slice(0, -1);
    setRedoStack(prev => [...prev, strokes]);
    setStrokes(previousStrokes);
    setUndoStack(newUndoStack);
  }, [undoStack, strokes]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    const nextStrokes = redoStack[redoStack.length - 1];
    const newRedoStack = redoStack.slice(0, -1);
    setUndoStack(prev => [...prev, strokes]);
    setStrokes(nextStrokes);
    setRedoStack(newRedoStack);
  }, [redoStack, strokes]);

  const handleSave = useCallback(() => {
    if (onSave) {
      setSaveStatus('saving');
      const sessionData = {
        patientId: patient?.id || null,
        strokes,
        textElements,
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
  }, [strokes, textElements, zoomLevel, panOffset, patient, selectedTemplateId, onSave]);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplateId(templateId);
    // Background image will be loaded automatically via getActiveBackground()
    // Keep drawer open - don't close after selection
  };

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
    // TODO: Open template upload drawer
    console.log('Open template upload drawer');
    // After template is uploaded, call refreshTemplates() to update the list
    // Keep drawer open - don't close after clicking add new
  };

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
        <CanvasEngine
          strokes={strokes}
          setStrokes={setStrokes}
          textElements={textElements}
          setTextElements={setTextElements}
          onStrokeComplete={handleStrokeComplete}
          onEraseStart={handleEraseStart}
          toolSettings={toolSettings}
          setToolSettings={setToolSettings}
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
          panOffset={panOffset}
          setPanOffset={setPanOffset}
          onInteractionStart={handleInteractionStart}
          backgroundImage={backgroundImage || getActiveBackground()}
        />

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
    </div>
  );
};

export default TabRxCanvas;
