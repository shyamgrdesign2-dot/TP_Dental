import React, { useRef, useEffect, useState, useCallback } from 'react';
import { A4_BASE_WIDTH, A4_BASE_HEIGHT, ZOOM_CONSTRAINTS } from '../utils/constants';
import { getMidPoint, generateId, splitStroke } from '../utils/geometry';
import { FaGripVertical, FaGripHorizontal, FaTimes, FaCheck, FaTrash } from 'react-icons/fa';
import './CanvasEngine.scss';

const CanvasEngine = ({
  strokes,
  setStrokes,
  textElements,
  setTextElements,
  onStrokeComplete,
  onEraseStart,
  toolSettings,
  setToolSettings,
  zoomLevel,
  setZoomLevel,
  panOffset,
  setPanOffset,
  onInteractionStart,
  onPageFocus,
  backgroundImage,
  embeddedInScroll = false
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Local state
  const [currentStroke, setCurrentStroke] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState(null);
  const [bgImageObj, setBgImageObj] = useState(null);
  
  // Touch Zoom State
  const initialPinchDist = useRef(null);
  const initialZoom = useRef(1);
  // Store the actual point on the paper (canvas coordinate) where the pinch started
  const pinchStartCanvasPoint = useRef(null);
  
  // Text State
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [textDragState, setTextDragState] = useState(null);

  // Load background image
  useEffect(() => {
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => setBgImageObj(img);
    } else {
      setBgImageObj(null);
    }
  }, [backgroundImage]);

  // Helper to convert screen coordinates to canvas coordinates
  const getCanvasCoordinates = (e) => {
    if (!canvasRef.current) return { x: 0, y: 0, pressure: 0.5 };
    const rect = canvasRef.current.getBoundingClientRect();
    const pressure = e.pressure; 
    
    return {
      x: (e.clientX - rect.left) / zoomLevel,
      y: (e.clientY - rect.top) / zoomLevel,
      pressure: pressure !== undefined ? pressure : 0.5
    };
  };

  // Helper to center the view on a specific point (no-op when embedded in scroll)
  const centerViewOnPoint = (targetX, targetY) => {
     if (embeddedInScroll || !containerRef.current) return;
     const containerW = containerRef.current.clientWidth;
     const containerH = containerRef.current.clientHeight;

     const newPanX = (containerW / 2) - (targetX * zoomLevel);
     const newPanY = (containerH / 2) - (targetY * zoomLevel);

     setPanOffset({ x: newPanX, y: newPanY });
  };


  // --- Eraser Logic ---
  const performErase = (eraserPoint) => {
    const eraserRadius = (toolSettings.thickness * 4) / zoomLevel; 
    
    let hasChanges = false;
    let nextStrokes = [];
    
    for (const stroke of strokes) {
        const fragments = splitStroke(stroke, eraserPoint, eraserRadius);
        if (fragments.length === 1 && fragments[0].points.length === stroke.points.length) {
            nextStrokes.push(stroke); 
        } else {
            hasChanges = true;
            nextStrokes.push(...fragments);
        }
    }

    if (hasChanges) {
       setStrokes(nextStrokes);
    }
  };

  // --- Rendering Loop ---
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (bgImageObj) {
      ctx.drawImage(bgImageObj, 0, 0, canvas.width, canvas.height);
    } else {
      // Default Grid
      ctx.strokeStyle = '#F3F4F6';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 40) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); }
      for (let y = 0; y < canvas.height; y += 40) { ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); }
      ctx.stroke();
    }

    const drawStroke = (stroke) => {
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
    };

    strokes.forEach(drawStroke);

    if (currentStroke) {
      drawStroke(currentStroke);
    }

  }, [strokes, currentStroke, bgImageObj]);

  useEffect(() => {
    requestAnimationFrame(renderCanvas);
  }, [renderCanvas]);


  // --- Event Handlers ---

  const handlePointerDown = (e) => {
    if (!e.isPrimary) return;

    // --- PALM REJECTION / NATIVE IPAD BEHAVIOR ---
    const isTouch = e.pointerType === 'touch';
    
    // 1. Text Interaction Priority
    const target = e.target;
    const isInteractingWithText = target.closest('[data-text-element]');
    if (isInteractingWithText) return; 
    
    // 2. Text Creation Logic
    if (toolSettings.activeTool === 'text') {
        e.preventDefault();
        
        if (selectedTextId) return;

        const nonEmptyElements = textElements.filter(t => t.content.trim().length > 0);
        const pt = getCanvasCoordinates(e);
        const newText = {
           id: generateId(),
           x: pt.x,
           y: pt.y,
           content: '',
           color: toolSettings.color,
           fontSize: 14 // Start small as requested (14px)
       };
       setTextElements([...nonEmptyElements, newText]);
       setSelectedTextId(newText.id);
       
       centerViewOnPoint(pt.x, pt.y - 50); 
       return;
    }

    // 3. Deselect Text
    if (selectedTextId) {
       const currentText = textElements.find(t => t.id === selectedTextId);
       if (currentText && currentText.content.trim() === '') {
           setTextElements(prev => prev.filter(t => t.id !== selectedTextId));
       }
       setSelectedTextId(null);
    }

    e.preventDefault();
    e.target.setPointerCapture(e.pointerId);
    if (onInteractionStart) onInteractionStart();
    if (onPageFocus) onPageFocus();

    // 4. PANNING
    if (toolSettings.activeTool === 'move' || isTouch) {
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    // 5. DRAWING
    if (toolSettings.activeTool === 'eraser') {
       setIsErasing(true);
       onEraseStart(); 
       const point = getCanvasCoordinates(e);
       performErase(point);
       return;
    }

    setIsDrawing(true);
    const point = getCanvasCoordinates(e);
    
    setCurrentStroke({
      id: generateId(),
      tool: toolSettings.activeTool,
      color: toolSettings.color,
      thickness: toolSettings.thickness,
      opacity: 1,
      points: [point],
    });
  };

  const handlePointerMove = (e) => {
    if (!e.isPrimary) return;
    e.preventDefault();

    if (isPanning && lastPanPoint) {
      const dx = e.clientX - lastPanPoint.x;
      const dy = e.clientY - lastPanPoint.y;
      setPanOffset({ x: panOffset.x + dx, y: panOffset.y + dy });
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    if (isErasing) {
       const point = getCanvasCoordinates(e);
       performErase(point);
       return;
    }

    if (isDrawing && currentStroke) {
      const point = getCanvasCoordinates(e);
      if (point.x < -100 || point.y < -100 || point.x > A4_BASE_WIDTH + 100 || point.y > A4_BASE_HEIGHT + 100) return;
      
      const events = (e.nativeEvent && typeof e.nativeEvent.getCoalescedEvents === 'function') 
        ? e.nativeEvent.getCoalescedEvents() 
        : [e];
      
      setCurrentStroke(prev => {
        if (!prev) return null;
        const newPoints = events.map(ev => getCanvasCoordinates(ev));
        return {
           ...prev,
           points: [...prev.points, ...newPoints]
        };
      });
    }
  };

  const handlePointerUp = (e) => {
    e.preventDefault();
    
    if (isPanning) {
      setIsPanning(false);
      setLastPanPoint(null);
    }

    if (isErasing) {
      setIsErasing(false);
    }

    if (isDrawing && currentStroke) {
      setIsDrawing(false);
      onStrokeComplete(currentStroke);
      setCurrentStroke(null);
    }
  };

  // --- Pointer-Based Zoom Logic (Pinch) ---
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      
      const p1 = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      const p2 = { x: e.touches[1].clientX, y: e.touches[1].clientY };

      const screenCenterX = (p1.x + p2.x) / 2;
      const screenCenterY = (p1.y + p2.y) / 2;

      initialPinchDist.current = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      initialZoom.current = zoomLevel;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const containerX = screenCenterX - rect.left;
        const containerY = screenCenterY - rect.top;

        const canvasX = (containerX - panOffset.x) / zoomLevel;
        const canvasY = (containerY - panOffset.y) / zoomLevel;

        pinchStartCanvasPoint.current = { x: canvasX, y: canvasY };
      }

      if (isDrawing) {
         setIsDrawing(false);
         setCurrentStroke(null);
      }
      if (isErasing) setIsErasing(false);
      if (isPanning) setIsPanning(false);
    }
  };

  const handleTouchMove = (e) => {
     if (e.touches.length === 2 && initialPinchDist.current && pinchStartCanvasPoint.current && containerRef.current) {
        e.preventDefault();
        
        const p1 = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        const p2 = { x: e.touches[1].clientX, y: e.touches[1].clientY };
        
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        const screenCenterX = (p1.x + p2.x) / 2;
        const screenCenterY = (p1.y + p2.y) / 2;
        
        const scale = dist / initialPinchDist.current;
        const newZoom = Math.min(Math.max(initialZoom.current * scale, ZOOM_CONSTRAINTS.MIN), ZOOM_CONSTRAINTS.MAX);
        
        const rect = containerRef.current.getBoundingClientRect();
        const containerX = screenCenterX - rect.left;
        const containerY = screenCenterY - rect.top;

        const newPanX = containerX - (pinchStartCanvasPoint.current.x * newZoom);
        const newPanY = containerY - (pinchStartCanvasPoint.current.y * newZoom);

        setZoomLevel(newZoom);
        setPanOffset({ x: newPanX, y: newPanY });
     }
  };

  const handleTouchEnd = () => {
    initialPinchDist.current = null;
    pinchStartCanvasPoint.current = null;
  };

  // --- Pointer-Based Zoom Logic (Wheel) ---
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      
      const zoomSensitivity = 0.002;
      const delta = -e.deltaY * zoomSensitivity;
      const newZoom = Math.min(Math.max(zoomLevel + delta, ZOOM_CONSTRAINTS.MIN), ZOOM_CONSTRAINTS.MAX);
      
      if (embeddedInScroll) {
        // In scroll mode: only zoom, no pan (scroll handles navigation)
        setZoomLevel(newZoom);
      } else if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          const canvasX = (mouseX - panOffset.x) / zoomLevel;
          const canvasY = (mouseY - panOffset.y) / zoomLevel;

          const newPanX = mouseX - (canvasX * newZoom);
          const newPanY = mouseY - (canvasY * newZoom);

          setPanOffset({ x: newPanX, y: newPanY });
          setZoomLevel(newZoom);
      } else {
          setZoomLevel(newZoom);
      }

    } else if (!embeddedInScroll) {
      // Only pan when not in scroll mode (let scroll container handle vertical scroll)
       setPanOffset({ x: panOffset.x - e.deltaX, y: panOffset.y - e.deltaY });
    }
  };

  // --- Text Interaction Logic ---

  const handleTextInteractionStart = (e, id, type, handle) => {
     e.stopPropagation();
     if (onPageFocus) onPageFocus();
     const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
     const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

     if (toolSettings.activeTool === 'eraser') return; 

     setSelectedTextId(id);
     const el = textElements.find(t => t.id === id);
     if (el) {
         setTextDragState({
             id,
             type,
             handle,
             startX: clientX,
             startY: clientY,
             initialX: el.x,
             initialY: el.y,
             initialFontSize: el.fontSize
         });
     }
  };
  
  const handleDone = (e, id) => {
      e.stopPropagation();
      e.preventDefault();
      
      setSelectedTextId(null);
      
      setTextElements(prev => prev.filter(t => {
          // If content is empty after trimming, remove it
          if (t.id === id && !t.content.trim()) return false;
          return true;
      }));
  };

  const handleDelete = (e, id) => {
      e.stopPropagation();
      e.preventDefault();
      setTextElements(prev => prev.filter(t => t.id !== id));
      setSelectedTextId(null);
  };

  useEffect(() => {
     const handleGlobalMove = (e) => {
        if (!textDragState) return;

        const deltaX = (e.clientX - textDragState.startX) / zoomLevel;
        const deltaY = (e.clientY - textDragState.startY) / zoomLevel;

        setTextElements(prev => prev.map(t => {
             if (t.id !== textDragState.id) return t;

             if (textDragState.type === 'move') {
                 return { ...t, x: textDragState.initialX + deltaX, y: textDragState.initialY + deltaY };
             } else if (textDragState.type === 'resize') {
                 let scaleDelta = 0;
                 const sensitivity = 0.5; // Sensitivity for resizing

                 if (textDragState.handle === 'br') {
                    scaleDelta = deltaY + deltaX; 
                 } else if (textDragState.handle === 'bl') {
                    scaleDelta = deltaY - deltaX; 
                 } else if (textDragState.handle === 'tr') {
                    scaleDelta = -deltaY + deltaX; 
                 } else if (textDragState.handle === 'tl') {
                    scaleDelta = -deltaY - deltaX; 
                 }
                 
                 const newSize = Math.max(8, Math.min(160, textDragState.initialFontSize + (scaleDelta * sensitivity)));
                 
                 return { ...t, fontSize: newSize };
             }
             return t;
        }));
     };

     const handleGlobalUp = () => {
         setTextDragState(null);
     };

     if (textDragState) {
         window.addEventListener('pointermove', handleGlobalMove);
         window.addEventListener('pointerup', handleGlobalUp);
     }
     return () => {
         window.removeEventListener('pointermove', handleGlobalMove);
         window.removeEventListener('pointerup', handleGlobalUp);
     };
  }, [textDragState, zoomLevel, setTextElements]);

  const updateTextContent = (id, newContent) => {
      setTextElements(prev => prev.map(t => t.id === id ? { ...t, content: newContent } : t));
  };
  
  const uiScale = 1 / zoomLevel;

  return (
    <div 
      ref={containerRef}
      className={`tab-rx-canvas-container ${embeddedInScroll ? 'embedded-in-scroll' : ''}`}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="canvas-wrapper"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
        }}
      >
        <canvas
          ref={canvasRef}
          width={A4_BASE_WIDTH}
          height={A4_BASE_HEIGHT}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
        
        {/* Text Layer Overlay */}
        <div className="text-layer">
            {textElements.map(el => {
                const isSelected = selectedTextId === el.id;
                return (
                <div
                    key={el.id}
                    data-text-element
                    className={`text-element ${isSelected ? 'selected' : ''}`}
                    style={{
                        left: el.x,
                        top: el.y,
                        color: el.color,
                        fontSize: `${el.fontSize}px`,
                        minWidth: `${el.fontSize * 3}px`
                    }}
                    onMouseDown={(e) => {
                         if (!isSelected) {
                            if (onPageFocus) onPageFocus();
                            setSelectedTextId(el.id);
                         }
                    }}
                >
                    {/* Selection Frame (Visible only when selected) */}
                    {isSelected && (
                        <div className="text-selection-frame" style={{ transform: `scale(${uiScale})` }}>
                            
                            {/* CORNER RESIZE HANDLES (Dots) */}
                            {[
                              { handle: 'tl', cursor: 'nwse-resize' },
                              { handle: 'tr', cursor: 'nesw-resize' },
                              { handle: 'bl', cursor: 'nesw-resize' },
                              { handle: 'br', cursor: 'nwse-resize' }
                            ].map((h, i) => (
                               <div 
                                  key={i}
                                  className={`resize-handle ${h.handle}`}
                                  style={{ cursor: h.cursor }}
                                  onMouseDown={(e) => handleTextInteractionStart(e, el.id, 'resize', h.handle)}
                                  onTouchStart={(e) => handleTextInteractionStart(e, el.id, 'resize', h.handle)}
                               >
                                  <div className="handle-dot" />
                                </div>
                            ))}
                            
                            {/* Toolbar: Drag on Left */}
                            <div className="text-toolbar left-toolbar" style={{ transform: `translateY(-100%) scale(${uiScale})` }}>
                                <button 
                                    className="toolbar-button drag-button"
                                    onMouseDown={(e) => handleTextInteractionStart(e, el.id, 'move')}
                                    onTouchStart={(e) => handleTextInteractionStart(e, el.id, 'move')}
                                    title="Drag"
                                >
                                    <FaGripVertical size={18} />
                                </button>
                            </div>

                            {/* Toolbar: Actions on Right */}
                            <div className="text-toolbar right-toolbar" style={{ transform: `translateY(-100%) scale(${uiScale})` }}>
                                <button 
                                    className="toolbar-button delete-button"
                                    onMouseDown={(e) => handleDelete(e, el.id)}
                                    onTouchStart={(e) => handleDelete(e, el.id)}
                                    title="Delete"
                                >
                                    <FaTrash size={18} />
                                </button>
                                
                                <button 
                                    className="toolbar-button done-button"
                                    onMouseDown={(e) => handleDone(e, el.id)}
                                    onTouchStart={(e) => handleDone(e, el.id)}
                                    title="Done"
                                >
                                    <FaCheck size={20} />
                                </button>
                            </div>
                        </div>
                    )}

                    <div 
                        contentEditable
                        suppressContentEditableWarning
                        ref={(r) => { 
                            if (r && isSelected) {
                                if (!r.innerText && el.content) r.innerText = el.content;
                                if (document.activeElement !== r) r.focus();
                            }
                        }}
                        onInput={(e) => updateTextContent(el.id, e.currentTarget.innerText)}
                        className={`text-content ${isSelected ? 'selected' : ''}`}
                        style={{ 
                            maxWidth: '400px'
                        }}
                        onPointerDown={(e) => e.stopPropagation()} 
                        dangerouslySetInnerHTML={!isSelected ? { __html: el.content } : undefined}
                    />
                </div>
            )})}
        </div>
      </div>
    </div>
  );
};

export default CanvasEngine;
