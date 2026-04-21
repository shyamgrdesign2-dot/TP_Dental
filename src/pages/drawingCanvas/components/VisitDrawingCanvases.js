import React, { useState, useEffect } from 'react';
import DrawingCanvasCard from './DrawingCanvasCard';
import ExcalidrawEditor from './ExcalidrawEditor';
import CanvasPreview from './CanvasPreview';
import { Card, Drawer } from 'antd';

import { listPatientCanvasMapping } from '../service';

const VisitDrawingCanvases = ({ patientId, tcmId }) => {
    const [samples, setSamples] = useState([]);
    const [currentCanvas, setCurrentCanvas] = useState(null);
    const [shouldShowPreview, setShouldShowPreview] = useState(false);
    const [previewCanvasId, setPreviewCanvasId] = useState(null);

    useEffect(() => {
        let active = true;
        const fetchCanvases = async () => {
            if (patientId) {
                const res = await listPatientCanvasMapping(patientId, tcmId);
                if (res.status && res.records && active) {
                    const mapped = res.records.map(r => ({
                        id: r.mapping_id,
                        title: r.canvas_name,
                        url: r.canvas_url,
                        scene: null
                    }));
                    setSamples(mapped);
                }
            }
        };
        fetchCanvases();
        return () => { active = false; };
    }, [patientId, tcmId]);

    const handleDuplicate = (canvas) => {
        const newCanvas = {
            ...canvas,
            id: Date.now(),
            title: `${canvas.title} (Copy)`
        };
        setSamples([...samples, newCanvas]);
    };

    const handleDelete = (canvasId) => {
        setSamples(samples.filter(s => s.id !== canvasId));
    };

    const handleRename = (canvas, newTitle) => {
        setSamples(samples.map(s => s.id === canvas.id ? { ...s, title: newTitle } : s));
    };

    const handleOpen = async (canvas) => {
        let activeCanvas = canvas;
        if (!canvas.scene && canvas.url) {
            try {
                const res = await fetch(canvas.url);
                const sceneData = await res.json();
                activeCanvas = { ...canvas, scene: sceneData };
                setSamples(prev => prev.map(s => s.id === canvas.id ? activeCanvas : s));
            } catch (err) {
                console.error("Failed to load scene from url", err);
            }
        }
        setCurrentCanvas(activeCanvas);
    };

    const handlePreview = async (canvas) => {
        if (!canvas.scene && canvas.url) {
            try {
                const res = await fetch(canvas.url);
                const sceneData = await res.json();
                setSamples(prev => prev.map(s => s.id === canvas.id ? { ...s, scene: sceneData } : s));
            } catch (err) {
                console.error("Failed to load scene from url", err);
            }
        }
        setPreviewCanvasId(canvas?.id);
        setShouldShowPreview(true);
    };

    const handleBack = () => {
        setCurrentCanvas(null);
    };

    const handleSave = (payload) => {
        setSamples(samples.map(s => s.id === currentCanvas.id ? { ...s, scene: payload } : s));
        setCurrentCanvas(null);
    };

    return (
        <>
            <div className="appointment-wrap PatientDetailswrap p-2">
                <Card>
                    <div
                        className="d-flex flex-column"
                        style={{
                            height: "calc(100vh - 150px)",
                            paddingBottom: "40px",
                        }}
                    >
                        <div className="row">
                        {samples.map(sample => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={sample.id}>
                                <DrawingCanvasCard 
                                    canvas={sample} 
                                    hideShowInRx={true} 
                                    onOpen={handleOpen}
                                    onPreview={handlePreview}
                                    onDuplicate={handleDuplicate}
                                    onDelete={() => handleDelete(sample.id)}
                                    onRename={handleRename}
                                />
                            </div>
                        ))}
                        </div>
                    </div>
                </Card>
            </div>
            <Drawer
                title={null}
                placement="right"
                closable={false}
                onClose={handleBack}
                open={!!currentCanvas}
                width="100%"
                bodyStyle={{ padding: 0 }}
                push={false}
            >
                {currentCanvas && (
                    <div style={{ height: "100vh", position: "relative" }}>
                        <ExcalidrawEditor
                            canvasName={currentCanvas.title}
                            initialData={currentCanvas.scene}
                            onSave={handleSave}
                            onBack={handleBack}
                            onOpenTemplates={() => {}}
                            onSaveTemplate={() => {}}
                        />
                    </div>
                )}
            </Drawer>
            <Drawer
                title={null}
                placement="right"
                closable={false}
                onClose={() => setShouldShowPreview(false)}
                open={shouldShowPreview}
                width="100%"
                bodyStyle={{ padding: 0, backgroundColor: "#222222" }}
                push={false}
                zIndex={3000}
            >
                <CanvasPreview
                    onClose={() => setShouldShowPreview(false)}
                    canvasName={samples.find(c => c?.id === previewCanvasId)?.title || "Untitled Canvas"}
                    scene={samples.find(c => c?.id === previewCanvasId)?.scene}
                    handleEdit={() => {
                        setShouldShowPreview(false);
                        handleOpen(samples.find(c => c?.id === previewCanvasId));
                    }}
                    handleDelete={() => {
                        handleDelete(previewCanvasId);
                        setShouldShowPreview(false);
                    }}
                />
            </Drawer>
        </>
    );
};

export default VisitDrawingCanvases;
