"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TEETH, PEDIATRIC_TEETH } from './types';

const SCOPE_BUTTONS = [
    { id: 'UR', label: 'UR' },
    { id: 'UL', label: 'UL' },
    { id: 'LR', label: 'LR' },
    { id: 'LL', label: 'LL' },
    { id: 'RIGHT_ARCH', label: 'R' },
    { id: 'LEFT_ARCH', label: 'L' },
    { id: 'UPPER_ARCH', label: 'Max' },
    { id: 'LOWER_ARCH', label: 'Man' },
    { id: 'FULL', label: 'Full' },
];

export function ToothSelector({
    selectedTooth,
    patientType = 'adult',
    onSelectTooth,
    toothDiagnoses,
    viewMode,
    onBackToDentition,
    surfaceSelector,
    onSelectScope,
}) {
    const activeTeeth = patientType === 'adult'
        ? TEETH
        : patientType === 'pediatric'
            ? PEDIATRIC_TEETH
            : [...TEETH, ...PEDIATRIC_TEETH];

    const upperRight = activeTeeth.filter(t => t.quadrant === 'upper-right').sort((a, b) => b.position - a.position);
    const upperLeft = activeTeeth.filter(t => t.quadrant === 'upper-left').sort((a, b) => a.position - b.position);
    const lowerRight = activeTeeth.filter(t => t.quadrant === 'lower-right').sort((a, b) => b.position - a.position);
    const lowerLeft = activeTeeth.filter(t => t.quadrant === 'lower-left').sort((a, b) => a.position - b.position);

    // For mixed dentition, separate adult & pediatric within each quadrant
    const isMixed = patientType === 'mixed';

    const quadrantCard = (teeth, scopeId) => {
        // Split into adult (Q1-4) and pediatric (Q5-8) for mixed mode
        let adultTeeth, pedTeeth;
        if (isMixed) {
            adultTeeth = teeth.filter(t => ['1','2','3','4'].includes(t.fdi[0]));
            pedTeeth = teeth.filter(t => ['5','6','7','8'].includes(t.fdi[0]));
        }
        return _jsx("div", {
        key: scopeId,
        style: {
            background: '#f1f5f9',
            borderRadius: '6px',
            padding: '3px',
            display: 'flex',
            flexDirection: 'column',
            gap: isMixed ? '2px' : '2px',
        },
        children: isMixed
            ? [
                _jsx("div", { key: "adult", style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }, children: adultTeeth.map((t) => renderToothBtn(t)) }),
                pedTeeth.length > 0 && _jsx("div", { key: "ped", style: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px' }, children: pedTeeth.map((t) => renderToothBtn(t)) }),
            ]
            : _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }, children: teeth.map((t) => renderToothBtn(t)) }),
    }); };

    const renderToothBtn = (t) => {
        const isSelected = selectedTooth?.fdi === t.fdi;
        const diagSet = toothDiagnoses?.[t.fdi];
        const hasDiag = diagSet?.size > 0;
        const diagColor = hasDiag ? (diagSet.has('Missing') ? '#ef4444' : '#8b5cf6') : null;
        return _jsxs("button", {
            type: "button",
            className: `tooth-pick ${isSelected ? 'active' : ''} ${hasDiag ? 'has-diagnosis' : ''}`,
            onClick: (e) => { e.stopPropagation(); onSelectTooth(t); },
            title: `${t.name} (${t.fdi})`,
            children: [
                t.fdi,
                diagColor && _jsx("span", { className: "tooth-pick-dot", style: { background: isSelected ? '#fff' : diagColor } }),
            ],
        }, t.fdi);
    };

    return _jsxs("div", {
        className: "tooth-selector",
        children: [
            surfaceSelector && _jsx("div", { className: "tooth-selector-surface", children: surfaceSelector }),

            _jsxs("div", {
                className: "tooth-chart",
                children: [
                    // ── Scope bar: same gray bg as quadrant cards, white fill-width chips ──
                    onSelectScope && _jsx("div", {
                        style: {
                            display: 'flex',
                            gap: '2px',
                            background: '#f1f5f9',
                            borderRadius: '6px',
                            padding: '3px',
                            marginBottom: '3px',
                        },
                        children: SCOPE_BUTTONS.map((btn) => _jsx("button", {
                            type: "button",
                            onClick: () => onSelectScope(btn.id),
                            title: btn.label,
                            style: {
                                flex: '1 1 0',
                                height: '22px',
                                padding: '0',
                                fontSize: '9px',
                                fontWeight: 700,
                                fontFamily: "'Inter', system-ui, sans-serif",
                                letterSpacing: '0.03em',
                                lineHeight: 1,
                                border: '0.5px solid rgba(226,232,240,0.6)',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                color: '#475569',
                                background: '#fff',
                                transition: 'color 0.1s, background 0.1s',
                            },
                            onMouseEnter: (e) => {
                                e.currentTarget.style.color = '#1e40af';
                                e.currentTarget.style.background = '#eff6ff';
                                e.currentTarget.style.borderColor = '#60a5fa';
                            },
                            onMouseLeave: (e) => {
                                e.currentTarget.style.color = '#475569';
                                e.currentTarget.style.background = '#fff';
                                e.currentTarget.style.borderColor = 'rgba(226,232,240,0.6)';
                            },
                            children: btn.label,
                        }, btn.id)),
                    }),

                    // ── 2×2 quadrant grid ──
                    _jsx("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '3px',
                        },
                        children: [
                            quadrantCard(upperRight, 'UR'),
                            quadrantCard(upperLeft, 'UL'),
                            quadrantCard(lowerRight, 'LR'),
                            quadrantCard(lowerLeft, 'LL'),
                        ],
                    }),
                ],
            }),
        ],
    });
}
