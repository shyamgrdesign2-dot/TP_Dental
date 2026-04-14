"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { Calendar2, Notepad2, Trash } from "iconsax-reactjs";
import { ChevronDown, GripVertical, Plus, Search, } from "lucide-react";
import { diagnosisSuggestions, examinationSuggestions, medicationSuggestions, symptomSuggestions, } from "../sample-data";
import { useRxPadSync } from "@/components/tp-rxpad/rxpad-sync-context";
import { saveRxPreviewSnapshot } from "@/components/tp-rxpad/rx-preview-store";
import clsx from "clsx";
import { TPMedicalIcon, TPRxPadSearchInput, TPRxPadSection, TPTooltip, } from "@/components/tp-ui";
import rx from "./RxPadFunctional.module.scss";
function getRowId(prefix) {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return `${prefix}-${crypto.randomUUID()}`;
    }
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function normalizeText(value) {
    return value.trim().toLowerCase();
}
function rowHasValues(row) {
    return Object.entries(row).some(([key, value]) => key !== "id" && value.trim().length > 0);
}
function getColumnMinWidth(column) {
    return column.minWidth ?? column.width;
}
function getScrollParent(node) {
    if (!node)
        return null;
    let current = node.parentElement;
    while (current) {
        const style = window.getComputedStyle(current);
        const scrollable = /(auto|scroll)/.test(style.overflowY);
        if (scrollable && current.scrollHeight > current.clientHeight) {
            return current;
        }
        current = current.parentElement;
    }
    return null;
}
function snapFieldToViewportTop(element, offset = 96) {
    if (typeof window === "undefined")
        return;
    const scrollParent = getScrollParent(element);
    if (scrollParent) {
        const parentRect = scrollParent.getBoundingClientRect();
        const fieldRect = element.getBoundingClientRect();
        const delta = fieldRect.top - parentRect.top - offset;
        scrollParent.scrollTo({
            top: Math.max(0, scrollParent.scrollTop + delta),
            behavior: "smooth",
        });
        return;
    }
    const targetTop = window.scrollY + element.getBoundingClientRect().top - offset;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
}
function firstPositiveInteger(value) {
    const match = value.match(/\d+/);
    if (!match)
        return 1;
    const parsed = Number.parseInt(match[0], 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}
function pluralize(base, count) {
    return `${count} ${base}${count > 1 ? "s" : ""}`;
}
function getSinceOptions(query) {
    const n = firstPositiveInteger(query);
    return [
        pluralize("hour", n),
        pluralize("day", n),
        pluralize("month", n),
        pluralize("year", n),
    ];
}
function getMedicationUnitOptions(query) {
    const n = firstPositiveInteger(query);
    return [
        pluralize("tablet", n),
        pluralize("unit", n),
        pluralize("capsule", n),
    ];
}
function getFrequencyOptions(query) {
    const n = firstPositiveInteger(query);
    const options = [
        `${n}-0-${n}`,
        `${n}-0-0-${n}`,
        `${n}-${n}-${n}`,
        `${n}-0-${Math.max(1, n - 1)}`,
        `${n}-1-${n}`,
        "1-0-1",
        "1-0-0-1",
        "0-1-0",
        "SOS",
    ];
    return Array.from(new Set(options));
}
const MEDICATION_WHEN_OPTIONS = [
    "Before Breakfast",
    "After Breakfast",
    "Before Lunch",
    "After Lunch",
    "Before Dinner",
    "After Dinner",
    "Before Food",
    "After Food",
    "With Food",
];
const ADVICE_SUGGESTIONS = [
    "Stay hydrated daily",
    "Take steam inhalation",
    "Avoid oily foods",
    "Complete medication course",
    "Monitor blood pressure",
    "Regular morning walk",
    "Salt restricted diet",
    "Follow sleep hygiene",
];
const LAB_INVESTIGATION_BASE_OPTIONS = [
    "Complete Blood Count",
    "Liver Function Test",
    "Renal Function Test",
    "Lipid Profile",
    "Thyroid Profile",
    "HbA1c",
    "Fasting Blood Sugar",
    "Urine Routine",
    "Chest X-Ray",
    "ECG",
];
const SURGERY_SUGGESTIONS = [
    "Thoracic Relief Procedure",
    "Pulmonary Enhancement Surgery",
    "Abdominal Reconstruction Surgery",
    "Urological Restoration Procedure",
    "Articular Repair Surgery",
    "Laparoscopic Appendectomy",
    "Sinus Endoscopy",
    "Tonsillectomy",
];
function getDurationOptions(query) {
    const n = firstPositiveInteger(query);
    const options = [
        "Stat",
        "To Be Continued",
        "Only If Required",
        pluralize("day", n),
        pluralize("week", n),
        pluralize("month", n),
        pluralize("year", n),
    ];
    return Array.from(new Set(options));
}
function getSeedQuery(query, fallback) {
    const next = query.trim();
    if (next.length > 0)
        return next;
    return fallback;
}
function filterByQuery(options, query) {
    const needle = normalizeText(query);
    if (!needle)
        return options;
    const filtered = options.filter((option) => normalizeText(option).includes(needle));
    return filtered.length > 0 ? filtered : options;
}
const CUSTOM_OPTION_PREFIX = "__custom__:";
function toCustomOption(value) {
    return `${CUSTOM_OPTION_PREFIX}${value.trim()}`;
}
function isCustomOption(value) {
    return value.startsWith(CUSTOM_OPTION_PREFIX);
}
function getOptionValue(value) {
    return isCustomOption(value) ? value.slice(CUSTOM_OPTION_PREFIX.length) : value;
}
function getOptionLabel(value) {
    return isCustomOption(value) ? `Add custom: ${getOptionValue(value)}` : value;
}
function withCustomOption(options, query) {
    const trimmed = query.trim();
    if (!trimmed)
        return options;
    const customOption = toCustomOption(trimmed);
    const hasCustomAlready = options.some((option) => isCustomOption(option) &&
        normalizeText(getOptionValue(option)) === normalizeText(trimmed));
    if (hasCustomAlready)
        return options;
    return [...options, customOption];
}
function getCatalogOptions(catalog, query, limit = 10) {
    const needle = normalizeText(query);
    const filtered = needle
        ? catalog.filter((option) => normalizeText(option).includes(needle))
        : catalog;
    return withCustomOption(filtered.slice(0, limit), query);
}
function moveSelectedOptionToTop(options, selectedValue) {
    const selected = normalizeText(selectedValue);
    if (!selected)
        return options;
    const selectedIndex = options.findIndex((option) => !isCustomOption(option) && normalizeText(getOptionValue(option)) === selected);
    if (selectedIndex <= 0)
        return options;
    const next = [...options];
    const [picked] = next.splice(selectedIndex, 1);
    next.unshift(picked);
    return next;
}
function useTabletMode() {
    const [tabletMode, setTabletMode] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        const widthQuery = window.matchMedia("(max-width: 1180px)");
        const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
        const update = () => {
            const isTabletWidth = window.innerWidth <= 1180;
            const touchLike = touchQuery.matches || window.navigator.maxTouchPoints > 0;
            setTabletMode(isTabletWidth && touchLike);
        };
        update();
        widthQuery.addEventListener("change", update);
        touchQuery.addEventListener("change", update);
        window.addEventListener("resize", update);
        return () => {
            widthQuery.removeEventListener("change", update);
            touchQuery.removeEventListener("change", update);
            window.removeEventListener("resize", update);
        };
    }, []);
    return tabletMode;
}
function buildDefaultRow(moduleId, columns, primaryKey, seedText = "") {
    const row = { id: getRowId(moduleId) };
    for (const column of columns) {
        if (column.key === primaryKey && seedText.trim()) {
            row[column.key] = seedText.trim();
            continue;
        }
        row[column.key] = "";
    }
    return row;
}
function EditableTableModule({ id, title, icon, columns, primaryKey, rows, onChangeRows, searchPlaceholder, cannedChips, searchSuggestions = [], onRowAdded, onSaveClick, onTemplateClick, onClearClick, pulseRowIds = [], }) {
    const isTablet = useTabletMode();
    const [searchText, setSearchText] = useState("");
    const [activeMenu, setActiveMenu] = useState(null);
    const [draggingRowId, setDraggingRowId] = useState(null);
    const [dragOverRowId, setDragOverRowId] = useState(null);
    const [activeCell, setActiveCell] = useState(null);
    const [editingCellValues, setEditingCellValues] = useState({});
    const [isActionSticky, setIsActionSticky] = useState(false);
    const [menuIndicator, setMenuIndicator] = useState({
        hasOverflow: false,
        thumbTop: 0,
        thumbHeight: 18,
    });
    const moduleRootRef = useRef(null);
    const tableWrapRef = useRef(null);
    const searchInputRef = useRef(null);
    const menuListRef = useRef(null);
    const inputRefs = useRef({});
    const transparentDragImageRef = useRef(null);
    const rowTopByIdRef = useRef({});
    const dragPreviewTargetRef = useRef(null);
    const colIndexByKey = useMemo(() => Object.fromEntries(columns.map((column, idx) => [column.key, idx])), [columns]);
    const searchCatalog = useMemo(() => (searchSuggestions.length > 0 ? searchSuggestions : cannedChips), [cannedChips, searchSuggestions]);
    const searchCatalogKey = useMemo(() => searchCatalog.join("||"), [searchCatalog]);
    const [dynamicSearchCatalog, setDynamicSearchCatalog] = useState(searchCatalog);
    const shouldFilterCellOnOpen = useCallback((column) => column.key === primaryKey && Boolean(column.getOptions) && !column.restrictToOptions, [primaryKey]);
    useEffect(() => {
        setDynamicSearchCatalog(searchCatalog);
    }, [searchCatalog, searchCatalogKey]);
    useEffect(() => {
        // Keep committed primary-field values discoverable in future dropdown searches.
        setDynamicSearchCatalog((prev) => {
            const seen = new Set(prev.map((item) => normalizeText(item)));
            const additions = [];
            for (const row of rows) {
                const value = (row[primaryKey] ?? "").trim();
                if (!value)
                    continue;
                const key = normalizeText(value);
                if (seen.has(key))
                    continue;
                seen.add(key);
                additions.push(value);
            }
            if (additions.length === 0)
                return prev;
            return [...additions, ...prev];
        });
    }, [rows, primaryKey]);
    const totalColumnWidth = useMemo(() => Math.max(1, columns.reduce((sum, column) => sum + Math.max(column.width, getColumnMinWidth(column)), 0)), [columns]);
    const getResponsiveColumnStyle = useCallback((column) => ({
        width: `${(column.width / totalColumnWidth) * 100}%`,
        minWidth: getColumnMinWidth(column),
        maxWidth: column.maxWidth,
    }), [totalColumnWidth]);
    const setCellValue = useCallback((rowId, key, value) => {
        onChangeRows(rows.map((row) => row.id === rowId
            ? {
                ...row,
                [key]: value,
            }
            : row));
    }, [onChangeRows, rows]);
    const registerCustomValue = useCallback((value) => {
        const nextValue = value.trim();
        if (!nextValue)
            return;
        setDynamicSearchCatalog((prev) => {
            const exists = prev.some((item) => normalizeText(item) === normalizeText(nextValue));
            if (exists)
                return prev;
            return [nextValue, ...prev];
        });
    }, []);
    const beginDropdownEditing = useCallback((key, value) => {
        setEditingCellValues((prev) => {
            if (prev[key] === value)
                return prev;
            return { ...prev, [key]: value };
        });
    }, []);
    const endDropdownEditing = useCallback((key) => {
        setEditingCellValues((prev) => {
            if (!(key in prev))
                return prev;
            const next = { ...prev };
            delete next[key];
            return next;
        });
    }, []);
    const ensureCellVisibleInTable = useCallback((element) => {
        const wrapper = tableWrapRef.current;
        if (!wrapper)
            return;
        const wrapperRect = wrapper.getBoundingClientRect();
        const cellRect = element.getBoundingClientRect();
        const rightSafetyInset = 62;
        const leftSafetyInset = 8;
        if (cellRect.right > wrapperRect.right - rightSafetyInset) {
            const delta = cellRect.right - (wrapperRect.right - rightSafetyInset);
            wrapper.scrollBy({ left: delta + 8, behavior: "smooth" });
        }
        else if (cellRect.left < wrapperRect.left + leftSafetyInset) {
            const delta = wrapperRect.left + leftSafetyInset - cellRect.left;
            wrapper.scrollBy({ left: -delta - 8, behavior: "smooth" });
        }
    }, []);
    const addRow = useCallback((seedText = "") => {
        const row = buildDefaultRow(id, columns, primaryKey, seedText);
        onChangeRows([...rows, row]);
        onRowAdded?.(seedText);
    }, [columns, id, onChangeRows, onRowAdded, primaryKey, rows]);
    const hasAnyData = useMemo(() => rows.some((row) => rowHasValues(row)), [rows]);
    const handleTemplateClick = useCallback(() => {
        if (onTemplateClick) {
            onTemplateClick();
            return;
        }
        addRow(cannedChips[0] ?? "");
    }, [addRow, cannedChips, onTemplateClick]);
    const handleSaveClick = useCallback(() => {
        onSaveClick?.();
    }, [onSaveClick]);
    const handleClearClick = useCallback(() => {
        if (onClearClick) {
            onClearClick();
            return;
        }
        onChangeRows([]);
    }, [onChangeRows, onClearClick]);
    const removeRow = useCallback((rowId) => {
        onChangeRows(rows.filter((row) => row.id !== rowId));
    }, [onChangeRows, rows]);
    const moveRow = useCallback((sourceId, targetId) => {
        if (sourceId === targetId)
            return;
        const sourceIndex = rows.findIndex((row) => row.id === sourceId);
        const targetIndex = rows.findIndex((row) => row.id === targetId);
        if (sourceIndex < 0 || targetIndex < 0)
            return;
        const clone = [...rows];
        const [picked] = clone.splice(sourceIndex, 1);
        clone.splice(targetIndex, 0, picked);
        onChangeRows(clone);
    }, [onChangeRows, rows]);
    const focusCell = useCallback((rowIndex, colIndex) => {
        const nextRow = rows[rowIndex];
        const nextColumn = columns[colIndex];
        if (!nextRow || !nextColumn)
            return;
        const key = `${nextRow.id}:${nextColumn.key}`;
        const element = inputRefs.current[key];
        if (!element)
            return;
        element.focus();
        const len = element.value.length;
        element.setSelectionRange(len, len);
    }, [columns, rows]);
    const focusOwnSearch = useCallback(() => {
        const node = searchInputRef.current;
        if (!node)
            return;
        node.focus();
        node.select();
        if (isTablet) {
            snapFieldToViewportTop(node);
        }
    }, [isTablet]);
    const focusNextModuleSearch = useCallback(() => {
        if (typeof document === "undefined")
            return;
        const current = searchInputRef.current;
        if (!current)
            return;
        const allSearches = Array.from(document.querySelectorAll('[data-rx-module-search="true"]'));
        const idx = allSearches.findIndex((node) => node === current);
        if (idx < 0 || idx >= allSearches.length - 1) {
            current.focus();
            current.select();
            return;
        }
        const next = allSearches[idx + 1];
        next.focus();
        next.select();
        if (isTablet) {
            snapFieldToViewportTop(next);
        }
    }, [isTablet]);
    const focusPreviousModuleSearch = useCallback(() => {
        if (typeof document === "undefined")
            return;
        const current = searchInputRef.current;
        if (!current)
            return;
        const allSearches = Array.from(document.querySelectorAll('[data-rx-module-search="true"]'));
        const idx = allSearches.findIndex((node) => node === current);
        if (idx <= 0) {
            current.focus();
            current.select();
            return;
        }
        const prev = allSearches[idx - 1];
        prev.focus();
        prev.select();
        if (isTablet) {
            snapFieldToViewportTop(prev);
        }
    }, [isTablet]);
    const focusFirstCellInModule = useCallback((moduleRoot) => {
        if (!moduleRoot)
            return false;
        const firstCell = moduleRoot.querySelector('[data-rx-cell-input="true"]');
        if (firstCell) {
            firstCell.focus();
            const len = firstCell.value.length;
            firstCell.setSelectionRange(len, len);
            if (isTablet) {
                snapFieldToViewportTop(firstCell);
            }
            return true;
        }
        const moduleSearch = moduleRoot.querySelector('[data-rx-module-search="true"]');
        if (moduleSearch) {
            moduleSearch.focus();
            moduleSearch.select();
            if (isTablet) {
                snapFieldToViewportTop(moduleSearch);
            }
            return true;
        }
        return false;
    }, [isTablet]);
    const focusNextModuleFirstCell = useCallback(() => {
        if (typeof document === "undefined")
            return;
        const currentRoot = moduleRootRef.current;
        if (!currentRoot) {
            focusNextModuleSearch();
            return;
        }
        const allRoots = Array.from(document.querySelectorAll('[data-rx-module-root="true"]'));
        const idx = allRoots.findIndex((node) => node === currentRoot);
        if (idx < 0 || idx >= allRoots.length - 1) {
            focusOwnSearch();
            return;
        }
        const nextRoot = allRoots[idx + 1];
        if (!focusFirstCellInModule(nextRoot)) {
            focusNextModuleSearch();
        }
    }, [focusFirstCellInModule, focusNextModuleSearch, focusOwnSearch]);
    const focusPreviousModuleLastCell = useCallback(() => {
        if (typeof document === "undefined")
            return;
        const currentRoot = moduleRootRef.current;
        if (!currentRoot) {
            focusPreviousModuleSearch();
            return;
        }
        const allRoots = Array.from(document.querySelectorAll('[data-rx-module-root="true"]'));
        const idx = allRoots.findIndex((node) => node === currentRoot);
        if (idx <= 0) {
            focusOwnSearch();
            return;
        }
        const prevRoot = allRoots[idx - 1];
        const cells = Array.from(prevRoot.querySelectorAll('[data-rx-cell-input="true"]'));
        const lastCell = cells[cells.length - 1];
        if (lastCell) {
            lastCell.focus();
            const len = lastCell.value.length;
            lastCell.setSelectionRange(len, len);
            if (isTablet) {
                snapFieldToViewportTop(lastCell);
            }
            return;
        }
        focusPreviousModuleSearch();
    }, [focusOwnSearch, focusPreviousModuleSearch, isTablet]);
    const focusNextFromCell = useCallback((rowIndex, colIndex) => {
        const lastColIndex = columns.length - 1;
        if (colIndex < lastColIndex) {
            focusCell(rowIndex, colIndex + 1);
            return;
        }
        if (rowIndex < rows.length - 1) {
            focusCell(rowIndex + 1, 0);
            return;
        }
        focusOwnSearch();
    }, [columns.length, focusCell, focusOwnSearch, rows.length]);
    const focusPreviousFromCell = useCallback((rowIndex, colIndex) => {
        const lastColIndex = columns.length - 1;
        if (colIndex > 0) {
            focusCell(rowIndex, colIndex - 1);
            return;
        }
        if (rowIndex > 0) {
            focusCell(rowIndex - 1, lastColIndex);
            return;
        }
        focusOwnSearch();
    }, [columns.length, focusCell, focusOwnSearch]);
    const closeMenu = useCallback(() => setActiveMenu(null), []);
    const optionsForMenu = useMemo(() => {
        if (!activeMenu)
            return [];
        if (activeMenu.mode === "search") {
            return getCatalogOptions(dynamicSearchCatalog, activeMenu.query, 10);
        }
        const rowId = activeMenu.rowId ?? "";
        const colKey = activeMenu.colKey ?? "";
        const row = rows.find((item) => item.id === rowId);
        const column = columns.find((item) => item.key === colKey);
        if (!row || !column?.getOptions)
            return [];
        if (column.key === primaryKey && !column.restrictToOptions) {
            const filtered = getCatalogOptions(dynamicSearchCatalog, activeMenu.query, 10);
            return moveSelectedOptionToTop(filtered, row[colKey] ?? "");
        }
        const filtered = filterByQuery(column.getOptions(activeMenu.query, row), activeMenu.query);
        return moveSelectedOptionToTop(filtered, row[colKey] ?? "");
    }, [activeMenu, columns, rows, dynamicSearchCatalog, primaryKey]);
    const getMenuHighlightedIndex = useCallback((row, column, query, selectedValue) => {
        if (!column.getOptions)
            return 0;
        const options = column.key === primaryKey && !column.restrictToOptions
            ? moveSelectedOptionToTop(getCatalogOptions(dynamicSearchCatalog, query, 10), selectedValue)
            : moveSelectedOptionToTop(filterByQuery(column.getOptions(query, row), query), selectedValue);
        if (options.length === 0)
            return 0;
        const selected = normalizeText(selectedValue);
        const selectedIndex = options.findIndex((option) => !isCustomOption(option) && normalizeText(getOptionValue(option)) === selected);
        return selectedIndex >= 0 ? selectedIndex : 0;
    }, [dynamicSearchCatalog, primaryKey]);
    const openCellMenu = useCallback((row, column, anchorRect, selectedValue, query, showAllOptions = false) => {
        if (!column.getOptions)
            return;
        const nextQuery = showAllOptions ? "" : query;
        setActiveMenu({
            mode: "cell",
            rowId: row.id,
            colKey: column.key,
            query: nextQuery,
            highlightedIndex: getMenuHighlightedIndex(row, column, nextQuery, selectedValue),
            anchorRect,
        });
    }, [getMenuHighlightedIndex]);
    const openSearchMenu = useCallback((query, showAllOptions = false) => {
        const anchorRect = searchInputRef.current?.getBoundingClientRect();
        if (!anchorRect)
            return;
        const nextQuery = showAllOptions ? "" : query;
        const options = getCatalogOptions(dynamicSearchCatalog, nextQuery, 10);
        const selected = normalizeText(query);
        const selectedIndex = options.findIndex((option) => !isCustomOption(option) && normalizeText(getOptionValue(option)) === selected);
        setActiveMenu({
            mode: "search",
            query: nextQuery,
            highlightedIndex: selectedIndex >= 0 ? selectedIndex : 0,
            anchorRect,
        });
    }, [dynamicSearchCatalog]);
    useEffect(() => {
        if (!activeMenu)
            return;
        const updateAnchor = () => {
            const anchor = activeMenu.mode === "search"
                ? searchInputRef.current
                : inputRefs.current[`${activeMenu.rowId ?? ""}:${activeMenu.colKey ?? ""}`];
            if (!anchor)
                return;
            setActiveMenu((current) => {
                if (!current)
                    return current;
                return {
                    ...current,
                    anchorRect: anchor.getBoundingClientRect(),
                };
            });
        };
        updateAnchor();
        window.addEventListener("resize", updateAnchor);
        window.addEventListener("scroll", updateAnchor, true);
        return () => {
            window.removeEventListener("resize", updateAnchor);
            window.removeEventListener("scroll", updateAnchor, true);
        };
    }, [activeMenu]);
    useEffect(() => {
        const node = menuListRef.current;
        if (!activeMenu || !node) {
            setMenuIndicator((prev) => prev.hasOverflow || prev.thumbTop !== 0
                ? { hasOverflow: false, thumbTop: 0, thumbHeight: 18 }
                : prev);
            return;
        }
        const updateIndicator = () => {
            const clientHeight = node.clientHeight;
            const scrollHeight = node.scrollHeight;
            const scrollTop = node.scrollTop;
            const hasOverflow = scrollHeight > clientHeight + 1;
            const trackPadding = 8;
            const trackHeight = Math.max(0, clientHeight - trackPadding * 2);
            const thumbHeight = hasOverflow
                ? Math.max(18, Math.min(trackHeight, (clientHeight / scrollHeight) * trackHeight))
                : trackHeight;
            const maxThumbTop = Math.max(0, trackHeight - thumbHeight);
            const thumbTop = hasOverflow && scrollHeight > clientHeight
                ? (scrollTop / (scrollHeight - clientHeight)) * maxThumbTop
                : 0;
            setMenuIndicator((prev) => {
                if (prev.hasOverflow === hasOverflow &&
                    Math.abs(prev.thumbTop - thumbTop) < 0.5 &&
                    Math.abs(prev.thumbHeight - thumbHeight) < 0.5) {
                    return prev;
                }
                return { hasOverflow, thumbTop, thumbHeight };
            });
        };
        updateIndicator();
        node.addEventListener("scroll", updateIndicator, { passive: true });
        window.addEventListener("resize", updateIndicator);
        return () => {
            node.removeEventListener("scroll", updateIndicator);
            window.removeEventListener("resize", updateIndicator);
        };
    }, [activeMenu, optionsForMenu.length]);
    useEffect(() => {
        const node = menuListRef.current;
        if (!activeMenu || !node)
            return;
        const index = activeMenu.highlightedIndex;
        if (index < 0)
            return;
        const target = node.querySelector(`[data-rx-menu-index="${index}"]`);
        if (!target)
            return;
        const targetTop = target.offsetTop;
        const targetBottom = targetTop + target.offsetHeight;
        const viewTop = node.scrollTop;
        const viewBottom = viewTop + node.clientHeight;
        if (targetTop < viewTop) {
            node.scrollTo({ top: Math.max(0, targetTop - 4), behavior: "smooth" });
            return;
        }
        if (targetBottom > viewBottom) {
            node.scrollTo({ top: targetBottom - node.clientHeight + 4, behavior: "smooth" });
        }
    }, [
        activeMenu?.mode,
        activeMenu?.rowId,
        activeMenu?.colKey,
        activeMenu?.highlightedIndex,
        optionsForMenu.length,
    ]);
    useEffect(() => {
        if (rows.length > 0)
            return;
        setActiveCell(null);
        setActiveMenu(null);
    }, [rows.length]);
    useLayoutEffect(() => {
        const wrapper = tableWrapRef.current;
        const tbody = wrapper?.querySelector("tbody");
        if (!tbody) {
            rowTopByIdRef.current = {};
            return;
        }
        const rowElements = Array.from(tbody.querySelectorAll("tr[data-row-id]"));
        const nextTopById = {};
        for (const rowElement of rowElements) {
            const rowId = rowElement.dataset.rowId;
            if (!rowId)
                continue;
            const nextTop = rowElement.getBoundingClientRect().top;
            nextTopById[rowId] = nextTop;
            const prevTop = rowTopByIdRef.current[rowId];
            if (prevTop == null)
                continue;
            const deltaY = prevTop - nextTop;
            if (Math.abs(deltaY) < 1)
                continue;
            rowElement.style.transition = "transform 0s";
            rowElement.style.transform = `translateY(${deltaY}px)`;
            rowElement.getBoundingClientRect();
            rowElement.style.transition = "transform 220ms cubic-bezier(0.22,1,0.36,1)";
            rowElement.style.transform = "";
        }
        rowTopByIdRef.current = nextTopById;
    }, [rows]);
    useEffect(() => {
        if (!draggingRowId)
            return;
        const handleDocumentDragOver = (event) => {
            if (event.clientX === 0 && event.clientY === 0)
                return;
            const wrapper = tableWrapRef.current;
            if (!wrapper)
                return;
            const rect = wrapper.getBoundingClientRect();
            const withinX = event.clientX >= rect.left && event.clientX <= rect.right;
            const withinY = event.clientY >= rect.top && event.clientY <= rect.bottom;
            if (!withinX || !withinY) {
                setDragOverRowId(null);
            }
        };
        const handleDocumentDrop = () => {
            setDraggingRowId(null);
            setDragOverRowId(null);
            dragPreviewTargetRef.current = null;
        };
        const handleDocumentDragEnd = () => {
            setDraggingRowId(null);
            setDragOverRowId(null);
            dragPreviewTargetRef.current = null;
        };
        document.addEventListener("dragover", handleDocumentDragOver);
        document.addEventListener("drop", handleDocumentDrop);
        document.addEventListener("dragend", handleDocumentDragEnd);
        return () => {
            document.removeEventListener("dragover", handleDocumentDragOver);
            document.removeEventListener("drop", handleDocumentDrop);
            document.removeEventListener("dragend", handleDocumentDragEnd);
        };
    }, [draggingRowId]);
    useEffect(() => {
        const wrapper = tableWrapRef.current;
        if (!wrapper || rows.length === 0) {
            setIsActionSticky(false);
            return;
        }
        const updateStickyState = () => {
            const hasOverflow = wrapper.scrollWidth > wrapper.clientWidth + 1;
            setIsActionSticky(hasOverflow);
        };
        updateStickyState();
        window.addEventListener("resize", updateStickyState);
        wrapper.addEventListener("scroll", updateStickyState, { passive: true });
        let observer = null;
        if (typeof ResizeObserver !== "undefined") {
            observer = new ResizeObserver(updateStickyState);
            observer.observe(wrapper);
            const table = wrapper.querySelector("table");
            if (table) {
                observer.observe(table);
            }
        }
        return () => {
            window.removeEventListener("resize", updateStickyState);
            wrapper.removeEventListener("scroll", updateStickyState);
            observer?.disconnect();
        };
    }, [rows.length, columns.length]);
    const stickyActionHeaderClass = isActionSticky ? rx.stickyTh : "";
    const stickyActionCellClass = isActionSticky ? rx.stickyTd : "";
    const menuPosition = activeMenu
        ? (() => {
            const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1280;
            const activeColumn = activeMenu.mode === "cell"
                ? columns.find((column) => column.key === activeMenu.colKey)
                : undefined;
            const allowWideCellDropdown = Boolean(activeColumn && shouldFilterCellOnOpen(activeColumn));
            const desiredWidth = (() => {
                if (activeMenu.mode === "search") {
                    return Math.max(activeMenu.anchorRect.width, isTablet ? 620 : 760);
                }
                if (allowWideCellDropdown) {
                    return activeMenu.anchorRect.width + (isTablet ? 32 : 40);
                }
                return activeMenu.anchorRect.width;
            })();
            const minWidth = activeMenu.mode === "search" ? 220 : 120;
            const width = Math.min(desiredWidth, Math.max(minWidth, viewportWidth - 16));
            const rawLeft = Math.max(8, activeMenu.anchorRect.left);
            const left = Math.min(rawLeft, Math.max(8, viewportWidth - width - 8));
            return {
                left,
                top: activeMenu.anchorRect.bottom + 6,
                width,
            };
        })()
        : null;
    const regularOptionEntries = useMemo(() => optionsForMenu
        .map((option, index) => ({ option, index }))
        .filter((entry) => !isCustomOption(entry.option)), [optionsForMenu]);
    const customOptionEntry = useMemo(() => {
        const index = optionsForMenu.findIndex((option) => isCustomOption(option));
        if (index < 0)
            return null;
        return { option: optionsForMenu[index], index };
    }, [optionsForMenu]);
    const showMenuFooter = activeMenu?.mode === "search" || Boolean(customOptionEntry);
    const sideColumnStyle = {
        width: 50,
        minWidth: 50,
        maxWidth: 50,
    };
    return (_jsxs(TPRxPadSection, { title: title, icon: icon, onTemplateClick: handleTemplateClick, onSaveClick: handleSaveClick, onClearClick: handleClearClick, clearDisabled: !hasAnyData, children: [_jsxs("div", { ref: moduleRootRef, "data-rx-module-root": "true", className: rx.moduleStack, children: [rows.length > 0 ? (_jsx("div", { ref: tableWrapRef, className: rx.tableWrap, onDragOver: (event) => {
                            if (!draggingRowId)
                                return;
                            event.preventDefault();
                        }, onDragLeave: (event) => {
                            if (!draggingRowId)
                                return;
                            const rect = event.currentTarget.getBoundingClientRect();
                            const withinX = event.clientX >= rect.left && event.clientX <= rect.right;
                            const withinY = event.clientY >= rect.top && event.clientY <= rect.bottom;
                            if (withinX && withinY)
                                return;
                            setDragOverRowId(null);
                        }, children: _jsxs("table", { className: rx.dataTable, children: [_jsxs("colgroup", { children: [_jsx("col", { style: sideColumnStyle }), columns.map((column) => (_jsx("col", { style: getResponsiveColumnStyle(column) }, `col-${column.key}`))), _jsx("col", { style: sideColumnStyle })] }), _jsx("thead", { children: _jsxs("tr", { className: rx.theadRow, children: [_jsx("th", { className: rx.thSide, style: sideColumnStyle }), columns.map((column) => (_jsx("th", { className: rx.thData, style: getResponsiveColumnStyle(column), children: column.label }, column.key))), _jsx("th", { className: clsx(rx.thSticky, stickyActionHeaderClass), style: sideColumnStyle })] }) }), _jsx("tbody", { children: rows.map((row, rowIndex) => ((() => {
                                        const isDraggingRow = draggingRowId === row.id;
                                        const isDropTargetRow = dragOverRowId === row.id && !isDraggingRow;
                                        return (_jsxs("tr", { "data-row-id": row.id, className: clsx(rx.tr, pulseRowIds.includes(row.id) && rx.trRxEnter, isDraggingRow && rx.trDragging, !isDraggingRow && isDropTargetRow && rx.trDrop, !isDraggingRow && !isDropTargetRow && rx.trHover), onDragOver: (event) => {
                                                if (!draggingRowId)
                                                    return;
                                                event.preventDefault();
                                                setDragOverRowId(row.id);
                                                if (draggingRowId !== row.id && dragPreviewTargetRef.current !== row.id) {
                                                    dragPreviewTargetRef.current = row.id;
                                                    moveRow(draggingRowId, row.id);
                                                }
                                            }, onDrop: (event) => {
                                                event.preventDefault();
                                                if (!draggingRowId)
                                                    return;
                                                setDragOverRowId(null);
                                                setDraggingRowId(null);
                                                dragPreviewTargetRef.current = null;
                                            }, children: [_jsx("td", { className: rx.tdSide, style: sideColumnStyle, children: _jsx("button", { type: "button", "data-drag-handle": "true", draggable: true, className: clsx(rx.dragHandle, isDraggingRow ? rx.dragHandleActive : rx.dragHandleIdle), "aria-label": "Drag to reorder row", onDragStart: (event) => {
                                                            setDraggingRowId(row.id);
                                                            setDragOverRowId(row.id);
                                                            dragPreviewTargetRef.current = row.id;
                                                            event.dataTransfer.effectAllowed = "move";
                                                            try {
                                                                event.dataTransfer.setData("application/x-rx-row-id", row.id);
                                                            }
                                                            catch {
                                                                // keep drag alive in strict browser modes without polluting clipboard text
                                                            }
                                                            if (!transparentDragImageRef.current) {
                                                                const transparent = new Image();
                                                                transparent.src =
                                                                    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                                                                transparentDragImageRef.current = transparent;
                                                            }
                                                            event.dataTransfer.setDragImage(transparentDragImageRef.current, 0, 0);
                                                        }, onDragEnd: () => {
                                                            setDraggingRowId(null);
                                                            setDragOverRowId(null);
                                                            dragPreviewTargetRef.current = null;
                                                        }, children: _jsx(GripVertical, { size: 18, strokeWidth: 1.5 }) }) }), columns.map((column) => {
                                                    const key = `${row.id}:${column.key}`;
                                                    const hasDropdown = Boolean(column.getOptions);
                                                    const showDropdownToggle = column.showDropdownToggle ?? true;
                                                    const isMultiline = false;
                                                    const isMenuOpen = Boolean(activeMenu &&
                                                        activeMenu.rowId === row.id &&
                                                        activeMenu.colKey === column.key);
                                                    const value = row[column.key] ?? "";
                                                    const displayValue = hasDropdown ? (editingCellValues[key] ?? value) : value;
                                                    const fieldClass = clsx(rx.fieldInput, hasDropdown && rx.fieldWithDropdown, isMultiline ? rx.fieldMultiline : rx.fieldTruncate);
                                                    return (_jsx("td", { className: clsx(rx.tdCell, activeCell?.rowId === row.id && activeCell?.colKey === column.key && rx.tdCellActive), style: getResponsiveColumnStyle(column), children: _jsxs("div", { className: rx.cellShell, children: [activeCell?.rowId === row.id && activeCell?.colKey === column.key ? (_jsx("span", { className: rx.focusRing })) : null, isMultiline ? (_jsx("textarea", { "data-rx-cell-input": "true", ref: (node) => {
                                                                        inputRefs.current[key] = node;
                                                                    }, value: displayValue, title: displayValue || undefined, rows: column.maxLines ?? 2, placeholder: column.placeholder, className: fieldClass, style: { maxHeight: `${(column.maxLines ?? 2) * 18 + 20}px`, resize: "none" }, onFocus: (event) => {
                                                                        setActiveCell({ rowId: row.id, colKey: column.key });
                                                                        if (hasDropdown) {
                                                                            beginDropdownEditing(key, value);
                                                                            ensureCellVisibleInTable(event.currentTarget);
                                                                            const len = event.currentTarget.value.length;
                                                                            event.currentTarget.setSelectionRange(len, len);
                                                                        }
                                                                        if (isTablet) {
                                                                            snapFieldToViewportTop(event.currentTarget);
                                                                        }
                                                                        if (hasDropdown) {
                                                                            openCellMenu(row, column, event.currentTarget.getBoundingClientRect(), value, value, !shouldFilterCellOnOpen(column));
                                                                        }
                                                                    }, onClick: (event) => {
                                                                        if (hasDropdown) {
                                                                            beginDropdownEditing(key, value);
                                                                            ensureCellVisibleInTable(event.currentTarget);
                                                                        }
                                                                        if (hasDropdown) {
                                                                            openCellMenu(row, column, event.currentTarget.getBoundingClientRect(), value, value, !shouldFilterCellOnOpen(column));
                                                                        }
                                                                    }, onChange: (event) => {
                                                                        const next = event.currentTarget.value;
                                                                        if (hasDropdown) {
                                                                            beginDropdownEditing(key, next);
                                                                        }
                                                                        else {
                                                                            setCellValue(row.id, column.key, next);
                                                                        }
                                                                        openCellMenu(row, column, event.currentTarget.getBoundingClientRect(), next, next);
                                                                    }, onBlur: () => {
                                                                        window.setTimeout(() => {
                                                                            if (hasDropdown) {
                                                                                endDropdownEditing(key);
                                                                            }
                                                                            setActiveMenu((current) => {
                                                                                if (!current)
                                                                                    return current;
                                                                                if (current.rowId !== row.id || current.colKey !== column.key)
                                                                                    return current;
                                                                                return null;
                                                                            });
                                                                            setActiveCell((current) => {
                                                                                if (!current)
                                                                                    return current;
                                                                                if (current.rowId !== row.id || current.colKey !== column.key)
                                                                                    return current;
                                                                                return null;
                                                                            });
                                                                        }, 80);
                                                                    }, onKeyDown: (event) => {
                                                                        const colIndex = colIndexByKey[column.key];
                                                                        const menuOpened = activeMenu &&
                                                                            activeMenu.rowId === row.id &&
                                                                            activeMenu.colKey === column.key &&
                                                                            optionsForMenu.length > 0;
                                                                        if (menuOpened && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
                                                                            event.preventDefault();
                                                                            const delta = event.key === "ArrowDown" ? 1 : -1;
                                                                            setActiveMenu((current) => {
                                                                                if (!current)
                                                                                    return current;
                                                                                const next = (current.highlightedIndex + delta + optionsForMenu.length) % optionsForMenu.length;
                                                                                return { ...current, highlightedIndex: next };
                                                                            });
                                                                            return;
                                                                        }
                                                                        if (menuOpened && event.key === "Enter") {
                                                                            event.preventDefault();
                                                                            const picked = optionsForMenu[activeMenu.highlightedIndex] ?? optionsForMenu[0];
                                                                            if (picked) {
                                                                                const pickedValue = getOptionValue(picked);
                                                                                setCellValue(row.id, column.key, pickedValue);
                                                                                if (isCustomOption(picked)) {
                                                                                    registerCustomValue(pickedValue);
                                                                                }
                                                                                endDropdownEditing(key);
                                                                            }
                                                                            closeMenu();
                                                                            focusNextFromCell(rowIndex, colIndex);
                                                                            return;
                                                                        }
                                                                        if (event.key === "Escape") {
                                                                            closeMenu();
                                                                            return;
                                                                        }
                                                                        if (event.key === "ArrowUp") {
                                                                            event.preventDefault();
                                                                            if (rowIndex <= 0) {
                                                                                focusPreviousModuleLastCell();
                                                                            }
                                                                            else {
                                                                                focusCell(rowIndex - 1, colIndex);
                                                                            }
                                                                            return;
                                                                        }
                                                                        if (event.key === "ArrowDown") {
                                                                            event.preventDefault();
                                                                            if (rowIndex >= rows.length - 1) {
                                                                                focusOwnSearch();
                                                                            }
                                                                            else {
                                                                                focusCell(rowIndex + 1, colIndex);
                                                                            }
                                                                            return;
                                                                        }
                                                                        if (event.key === "ArrowLeft") {
                                                                            event.preventDefault();
                                                                            focusPreviousFromCell(rowIndex, colIndex);
                                                                            return;
                                                                        }
                                                                        if (event.key === "ArrowRight") {
                                                                            event.preventDefault();
                                                                            focusNextFromCell(rowIndex, colIndex);
                                                                            return;
                                                                        }
                                                                        if (event.key === "Enter") {
                                                                            event.preventDefault();
                                                                            focusNextFromCell(rowIndex, colIndex);
                                                                        }
                                                                    } })) : (_jsx("input", { "data-rx-cell-input": "true", ref: (node) => {
                                                                        inputRefs.current[key] = node;
                                                                    }, value: displayValue, title: displayValue || undefined, placeholder: column.placeholder, className: fieldClass, onFocus: (event) => {
                                                                        setActiveCell({ rowId: row.id, colKey: column.key });
                                                                        if (hasDropdown) {
                                                                            beginDropdownEditing(key, value);
                                                                            ensureCellVisibleInTable(event.currentTarget);
                                                                            const len = event.currentTarget.value.length;
                                                                            event.currentTarget.setSelectionRange(len, len);
                                                                        }
                                                                        if (isTablet) {
                                                                            snapFieldToViewportTop(event.currentTarget);
                                                                        }
                                                                        if (hasDropdown) {
                                                                            openCellMenu(row, column, event.currentTarget.getBoundingClientRect(), value, value, !shouldFilterCellOnOpen(column));
                                                                        }
                                                                    }, onClick: (event) => {
                                                                        if (hasDropdown) {
                                                                            beginDropdownEditing(key, value);
                                                                            ensureCellVisibleInTable(event.currentTarget);
                                                                        }
                                                                        if (hasDropdown) {
                                                                            openCellMenu(row, column, event.currentTarget.getBoundingClientRect(), value, value, !shouldFilterCellOnOpen(column));
                                                                        }
                                                                    }, onChange: (event) => {
                                                                        const next = event.currentTarget.value;
                                                                        if (hasDropdown) {
                                                                            beginDropdownEditing(key, next);
                                                                        }
                                                                        else {
                                                                            setCellValue(row.id, column.key, next);
                                                                        }
                                                                        openCellMenu(row, column, event.currentTarget.getBoundingClientRect(), next, next);
                                                                    }, onBlur: () => {
                                                                        window.setTimeout(() => {
                                                                            if (hasDropdown) {
                                                                                endDropdownEditing(key);
                                                                            }
                                                                            setActiveMenu((current) => {
                                                                                if (!current)
                                                                                    return current;
                                                                                if (current.rowId !== row.id || current.colKey !== column.key)
                                                                                    return current;
                                                                                return null;
                                                                            });
                                                                            setActiveCell((current) => {
                                                                                if (!current)
                                                                                    return current;
                                                                                if (current.rowId !== row.id || current.colKey !== column.key)
                                                                                    return current;
                                                                                return null;
                                                                            });
                                                                        }, 80);
                                                                    }, onKeyDown: (event) => {
                                                                        const colIndex = colIndexByKey[column.key];
                                                                        const menuOpened = activeMenu &&
                                                                            activeMenu.rowId === row.id &&
                                                                            activeMenu.colKey === column.key &&
                                                                            optionsForMenu.length > 0;
                                                                        if (menuOpened && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
                                                                            event.preventDefault();
                                                                            const delta = event.key === "ArrowDown" ? 1 : -1;
                                                                            setActiveMenu((current) => {
                                                                                if (!current)
                                                                                    return current;
                                                                                const next = (current.highlightedIndex + delta + optionsForMenu.length) % optionsForMenu.length;
                                                                                return { ...current, highlightedIndex: next };
                                                                            });
                                                                            return;
                                                                        }
                                                                        if (menuOpened && event.key === "Enter") {
                                                                            event.preventDefault();
                                                                            const picked = optionsForMenu[activeMenu.highlightedIndex] ?? optionsForMenu[0];
                                                                            if (picked) {
                                                                                const pickedValue = getOptionValue(picked);
                                                                                setCellValue(row.id, column.key, pickedValue);
                                                                                if (isCustomOption(picked)) {
                                                                                    registerCustomValue(pickedValue);
                                                                                }
                                                                                endDropdownEditing(key);
                                                                            }
                                                                            closeMenu();
                                                                            focusNextFromCell(rowIndex, colIndex);
                                                                            return;
                                                                        }
                                                                        if (event.key === "Escape") {
                                                                            closeMenu();
                                                                            return;
                                                                        }
                                                                        if (event.key === "ArrowUp") {
                                                                            event.preventDefault();
                                                                            if (rowIndex <= 0) {
                                                                                focusPreviousModuleLastCell();
                                                                            }
                                                                            else {
                                                                                focusCell(rowIndex - 1, colIndex);
                                                                            }
                                                                            return;
                                                                        }
                                                                        if (event.key === "ArrowDown") {
                                                                            event.preventDefault();
                                                                            if (rowIndex >= rows.length - 1) {
                                                                                focusOwnSearch();
                                                                            }
                                                                            else {
                                                                                focusCell(rowIndex + 1, colIndex);
                                                                            }
                                                                            return;
                                                                        }
                                                                        if (event.key === "ArrowLeft") {
                                                                            event.preventDefault();
                                                                            focusPreviousFromCell(rowIndex, colIndex);
                                                                            return;
                                                                        }
                                                                        if (event.key === "ArrowRight") {
                                                                            event.preventDefault();
                                                                            focusNextFromCell(rowIndex, colIndex);
                                                                            return;
                                                                        }
                                                                        if (event.key === "Enter") {
                                                                            event.preventDefault();
                                                                            focusNextFromCell(rowIndex, colIndex);
                                                                        }
                                                                    } })), hasDropdown && showDropdownToggle ? (_jsx(TPTooltip, { title: "Use \u2191 \u2193 to navigate options, press Enter to select", placement: "top", arrow: true, children: _jsx("button", { type: "button", "aria-label": "Toggle options", className: rx.dropdownToggle, onMouseDown: (event) => event.preventDefault(), onClick: () => {
                                                                            const inputNode = inputRefs.current[key];
                                                                            if (!inputNode)
                                                                                return;
                                                                            if (isMenuOpen) {
                                                                                closeMenu();
                                                                                return;
                                                                            }
                                                                            inputNode.focus();
                                                                            openCellMenu(row, column, inputNode.getBoundingClientRect(), value, value, !shouldFilterCellOnOpen(column));
                                                                        }, children: _jsx(ChevronDown, { size: 14, strokeWidth: 1.5, className: clsx(rx.chevron, isMenuOpen && rx.chevronOpen) }) }) })) : null] }) }, column.key));
                                                }), _jsx("td", { className: clsx(rx.tdAction, stickyActionCellClass), style: sideColumnStyle, children: _jsx("button", { type: "button", onClick: () => removeRow(row.id), className: rx.deleteRow, "aria-label": "Delete row", children: _jsx(Trash, { color: "currentColor", size: 18, strokeWidth: 1.5, variant: "Linear" }) }) })] }, row.id));
                                    })())) })] }) })) : null, _jsx(TPRxPadSearchInput, { ref: searchInputRef, "data-rx-module-search": "true", value: searchText, onFocus: () => {
                            openSearchMenu(searchText);
                        }, onClick: () => {
                            openSearchMenu(searchText);
                        }, onChange: (event) => {
                            const next = event.currentTarget.value;
                            setSearchText(next);
                            openSearchMenu(next);
                        }, onBlur: () => {
                            window.setTimeout(() => {
                                setActiveMenu((current) => (current?.mode === "search" ? null : current));
                            }, 90);
                        }, onKeyDown: (event) => {
                            const searchMenuOpen = activeMenu?.mode === "search" && optionsForMenu.length > 0;
                            if (searchMenuOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
                                event.preventDefault();
                                const delta = event.key === "ArrowDown" ? 1 : -1;
                                setActiveMenu((current) => {
                                    if (!current || current.mode !== "search")
                                        return current;
                                    const next = (current.highlightedIndex + delta + optionsForMenu.length) % optionsForMenu.length;
                                    return { ...current, highlightedIndex: next };
                                });
                                return;
                            }
                            if (searchMenuOpen && event.key === "Enter") {
                                event.preventDefault();
                                const picked = optionsForMenu[activeMenu.highlightedIndex] ?? optionsForMenu[0];
                                const value = picked ? getOptionValue(picked).trim() : searchText.trim();
                                if (!value) {
                                    focusNextModuleFirstCell();
                                    return;
                                }
                                if (picked && isCustomOption(picked)) {
                                    registerCustomValue(value);
                                }
                                const nextRowIndex = rows.length;
                                addRow(value);
                                setSearchText("");
                                closeMenu();
                                window.requestAnimationFrame(() => {
                                    focusCell(nextRowIndex, 0);
                                });
                                return;
                            }
                            if (searchMenuOpen && event.key === "Escape") {
                                event.preventDefault();
                                closeMenu();
                                return;
                            }
                            if (event.key === "Enter") {
                                event.preventDefault();
                                const value = searchText.trim();
                                if (!value) {
                                    focusNextModuleFirstCell();
                                    return;
                                }
                                openSearchMenu(value);
                                return;
                            }
                            if (event.key === "ArrowDown") {
                                event.preventDefault();
                                focusNextModuleFirstCell();
                                return;
                            }
                            if (event.key === "ArrowUp") {
                                event.preventDefault();
                                if (rows.length > 0) {
                                    focusCell(rows.length - 1, Math.max(0, columns.length - 1));
                                }
                                else {
                                    focusPreviousModuleLastCell();
                                }
                                return;
                            }
                            if (event.key === "ArrowRight") {
                                event.preventDefault();
                                focusNextModuleSearch();
                                return;
                            }
                            if (event.key === "ArrowLeft") {
                                event.preventDefault();
                                focusPreviousModuleSearch();
                            }
                        }, placeholder: searchPlaceholder }), isTablet ? (_jsx("div", { className: rx.tabletChips, children: cannedChips.map((chip) => (_jsx("button", { type: "button", className: rx.tabletChip, onClick: () => addRow(chip), children: chip }, `${id}-${chip}`))) })) : null] }), activeMenu && menuPosition && optionsForMenu.length > 0 && typeof document !== "undefined"
                ? createPortal(_jsxs("div", { className: rx.portalMenu, style: {
                        left: menuPosition.left,
                        top: menuPosition.top,
                        width: menuPosition.width,
                    }, children: [activeMenu.mode === "search" && activeMenu.query.trim().length === 0 ? (_jsx("div", { className: rx.menuSectionHeader, children: _jsx("span", { className: rx.menuSectionLabel, children: "Frequently used" }) })) : null, _jsxs("div", { className: rx.menuListWrap, children: [_jsxs("div", { ref: menuListRef, className: clsx(rx.menuList, rx.menuListSpaced), style: {
                                        msOverflowStyle: "none",
                                    }, children: [regularOptionEntries.length === 0 ? (_jsxs("div", { className: rx.menuEmpty, children: [_jsx(Search, { size: 14, strokeWidth: 1.5, className: rx.menuSearchIcon }), _jsx("span", { children: "No results found" })] })) : null, regularOptionEntries.map(({ option, index }) => (_jsx("button", { type: "button", "data-rx-menu-index": index, className: clsx(rx.menuOption, index === activeMenu.highlightedIndex && rx.menuOptionHi), onMouseDown: (event) => event.preventDefault(), onClick: () => {
                                                const value = getOptionValue(option).trim();
                                                if (!value) {
                                                    closeMenu();
                                                    return;
                                                }
                                                if (activeMenu.mode === "search") {
                                                    const nextRowIndex = rows.length;
                                                    addRow(value);
                                                    setSearchText("");
                                                    closeMenu();
                                                    window.requestAnimationFrame(() => {
                                                        focusCell(nextRowIndex, 0);
                                                    });
                                                    return;
                                                }
                                                if (activeMenu.rowId && activeMenu.colKey) {
                                                    setCellValue(activeMenu.rowId, activeMenu.colKey, value);
                                                    endDropdownEditing(`${activeMenu.rowId}:${activeMenu.colKey}`);
                                                }
                                                closeMenu();
                                            }, children: getOptionLabel(option) }, `${activeMenu.mode}-${activeMenu.colKey ?? "search"}-${option}`)))] }), menuIndicator.hasOverflow ? (_jsxs(_Fragment, { children: [_jsx("div", { className: rx.scrollTrack }), _jsx("div", { className: rx.scrollThumb, style: {
                                                top: `${menuIndicator.thumbTop + 8}px`,
                                                height: `${menuIndicator.thumbHeight}px`,
                                            } })] })) : null] }), showMenuFooter ? (_jsxs("div", { className: rx.menuFooter, children: [customOptionEntry ? (_jsxs("button", { type: "button", className: clsx(rx.customAdd, customOptionEntry.index === activeMenu.highlightedIndex && rx.customAddHi), onMouseDown: (event) => event.preventDefault(), onClick: () => {
                                        const value = getOptionValue(customOptionEntry.option).trim();
                                        if (!value) {
                                            closeMenu();
                                            return;
                                        }
                                        registerCustomValue(value);
                                        if (activeMenu.mode === "search") {
                                            const nextRowIndex = rows.length;
                                            addRow(value);
                                            setSearchText("");
                                            closeMenu();
                                            window.requestAnimationFrame(() => {
                                                focusCell(nextRowIndex, 0);
                                            });
                                            return;
                                        }
                                        if (activeMenu.rowId && activeMenu.colKey) {
                                            setCellValue(activeMenu.rowId, activeMenu.colKey, value);
                                            endDropdownEditing(`${activeMenu.rowId}:${activeMenu.colKey}`);
                                        }
                                        closeMenu();
                                    }, children: [_jsx(Plus, { size: 14, strokeWidth: 1.5 }), _jsx("span", { className: rx.customTruncate, children: `Add custom: "${getOptionValue(customOptionEntry.option)}"` })] })) : _jsx("span", {}), activeMenu.mode === "search" ? (_jsxs("div", { className: rx.hintRow, children: [_jsxs("span", { className: rx.hintItem, children: [_jsx("kbd", { className: rx.kbd, children: "\u2191" }), "Up"] }), _jsxs("span", { className: rx.hintItem, children: [_jsx("kbd", { className: rx.kbd, children: "\u2193" }), "Down"] }), _jsxs("span", { className: rx.hintItem, children: [_jsx("kbd", { className: rx.kbd, children: "\u21B5" }), "Enter"] }), _jsxs("span", { className: rx.hintItem, children: [_jsx("kbd", { className: rx.kbd, children: "Esc" }), "Close"] })] })) : null] })) : null] }), document.body)
                : null] }));
}
export function RxPadFunctional() {
    const searchParams = useSearchParams();
    const patientId = searchParams?.get("patientId") ?? "apt-1";
    const { lastCopyRequest } = useRxPadSync();
    const lastHandledCopyId = useRef(0);
    const [symptomRows, setSymptomRows] = useState([]);
    const [examinationRows, setExaminationRows] = useState([]);
    const [examinationPulseIds, setExaminationPulseIds] = useState([]);
    const [diagnosisRows, setDiagnosisRows] = useState([]);
    const [medicationRows, setMedicationRows] = useState([]);
    const [adviceRows, setAdviceRows] = useState([]);
    const [labRows, setLabRows] = useState([]);
    const [surgeryRows, setSurgeryRows] = useState([]);
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [followUp, setFollowUp] = useState("");
    const toPreviewLine = useCallback((title, metaParts) => ({
        title: title.trim(),
        metaParts: metaParts.map((part) => (part ?? "").trim()).filter(Boolean),
    }), []);
    useEffect(() => {
        if (!lastCopyRequest || lastHandledCopyId.current === lastCopyRequest.id)
            return;
        lastHandledCopyId.current = lastCopyRequest.id;
        const payload = lastCopyRequest.payload;
        if (payload.symptoms?.length) {
            setSymptomRows((prev) => [
                ...prev,
                ...(payload.symptoms?.map((item) => ({
                    id: getRowId("symptoms"),
                    name: item,
                    since: "1 day",
                    status: "Moderate",
                    note: `From ${payload.sourceDateLabel}`,
                })) ?? []),
            ]);
        }
        if (payload.examinations?.length) {
            const added = payload.examinations.map((item) => ({
                id: getRowId("exam"),
                name: item,
                note: `From ${payload.sourceDateLabel}`,
            }));
            setExaminationRows((prev) => [...prev, ...added]);
            setExaminationPulseIds(added.map((r) => r.id));
            window.setTimeout(() => setExaminationPulseIds([]), 650);
        }
        if (payload.diagnoses?.length) {
            setDiagnosisRows((prev) => [
                ...prev,
                ...(payload.diagnoses?.map((item) => ({
                    id: getRowId("diagnosis"),
                    name: item,
                    since: "1 day",
                    status: "Suspected",
                    note: `From ${payload.sourceDateLabel}`,
                })) ?? []),
            ]);
        }
        if (payload.medications?.length) {
            setMedicationRows((prev) => [
                ...prev,
                ...(payload.medications?.map((item) => ({
                    id: getRowId("med"),
                    medicine: item.medicine,
                    unitPerDose: item.unitPerDose,
                    frequency: item.frequency,
                    when: item.when,
                    duration: item.duration,
                    note: item.note || `From ${payload.sourceDateLabel}`,
                })) ?? []),
            ]);
        }
        if (payload.labInvestigations?.length) {
            setLabRows((prev) => [
                ...prev,
                ...(payload.labInvestigations?.map((item) => ({
                    id: getRowId("lab"),
                    investigation: item,
                    note: `From ${payload.sourceDateLabel}`,
                })) ?? []),
            ]);
        }
        if (payload.advice) {
            setAdviceRows((prev) => [
                ...prev,
                {
                    id: getRowId("advice"),
                    advice: payload.advice || "",
                    note: `From ${payload.sourceDateLabel}`,
                },
            ]);
        }
        if (payload.followUp) {
            setFollowUp(payload.followUp);
        }
        if (payload.additionalNotes) {
            setAdditionalNotes(payload.additionalNotes);
        }
    }, [lastCopyRequest]);
    useEffect(() => {
        const snapshot = {
            patientId,
            updatedAt: new Date().toISOString(),
            symptoms: symptomRows
                .filter((row) => (row.name ?? "").trim().length > 0)
                .map((row) => toPreviewLine(row.name ?? "", [row.since, row.status, row.note])),
            examinations: examinationRows
                .filter((row) => (row.name ?? "").trim().length > 0)
                .map((row) => toPreviewLine(row.name ?? "", [row.note])),
            diagnoses: diagnosisRows
                .filter((row) => (row.name ?? "").trim().length > 0)
                .map((row) => toPreviewLine(row.name ?? "", [row.since, row.status, row.note])),
            labInvestigations: labRows
                .filter((row) => (row.investigation ?? "").trim().length > 0)
                .map((row) => toPreviewLine(row.investigation ?? "", [row.note])),
            medications: medicationRows
                .filter((row) => (row.medicine ?? "").trim().length > 0)
                .map((row) => toPreviewLine(row.medicine ?? "", [row.unitPerDose, row.frequency, row.when, row.duration, row.note])),
            advice: adviceRows
                .filter((row) => (row.advice ?? "").trim().length > 0)
                .map((row) => toPreviewLine(row.advice ?? "", [row.note])),
            followUp: followUp.trim() || undefined,
            additionalNotes: additionalNotes.trim() || undefined,
        };
        saveRxPreviewSnapshot(patientId, snapshot);
    }, [
        patientId,
        symptomRows,
        examinationRows,
        diagnosisRows,
        labRows,
        medicationRows,
        adviceRows,
        followUp,
        additionalNotes,
        toPreviewLine,
    ]);
    const symptomsColumns = useMemo(() => [
        {
            key: "name",
            label: "SYMPTOMS NAME",
            width: 275,
            minWidth: 220,
            maxWidth: 320,
            placeholder: "e.g. Fever",
            showDropdownToggle: false,
            getOptions: (query) => getCatalogOptions(symptomSuggestions, query),
        },
        {
            key: "since",
            label: "SINCE",
            width: 130,
            minWidth: 120,
            maxWidth: 140,
            placeholder: "e.g. 2 days",
            getOptions: (query, row) => getSinceOptions(getSeedQuery(query, row.since ?? "")),
            restrictToOptions: true,
        },
        {
            key: "status",
            label: "STATUS",
            width: 150,
            minWidth: 135,
            maxWidth: 170,
            placeholder: "e.g. Moderate",
            getOptions: (query) => filterByQuery(["Severe", "Moderate", "Mild"], query),
            restrictToOptions: true,
        },
        { key: "note", label: "NOTE", width: 180, minWidth: 140, maxWidth: 220, multiline: true, maxLines: 2, placeholder: "Notes" },
    ], []);
    const examinationsColumns = useMemo(() => [
        {
            key: "name",
            label: "EXAMINATION NAME",
            width: 300,
            minWidth: 240,
            maxWidth: 360,
            placeholder: "e.g. Left knee tenderness",
            showDropdownToggle: false,
            getOptions: (query) => getCatalogOptions(examinationSuggestions, query),
        },
        { key: "note", label: "NOTE", width: 180, minWidth: 140, maxWidth: 220, multiline: true, maxLines: 2, placeholder: "Notes" },
    ], []);
    const diagnosisColumns = useMemo(() => [
        {
            key: "name",
            label: "DIAGNOSIS NAME",
            width: 300,
            minWidth: 240,
            maxWidth: 360,
            placeholder: "e.g. Viral pharyngitis",
            showDropdownToggle: false,
            getOptions: (query) => getCatalogOptions(diagnosisSuggestions, query),
        },
        {
            key: "since",
            label: "SINCE",
            width: 130,
            minWidth: 120,
            maxWidth: 140,
            placeholder: "e.g. 2 days",
            getOptions: (query, row) => getSinceOptions(getSeedQuery(query, row.since ?? "")),
            restrictToOptions: true,
        },
        {
            key: "status",
            label: "STATUS",
            width: 150,
            minWidth: 135,
            maxWidth: 170,
            placeholder: "e.g. Suspected",
            getOptions: (query) => filterByQuery(["Suspected", "Ruled Out", "Confirmed"], query),
            restrictToOptions: true,
        },
        { key: "note", label: "NOTE", width: 180, minWidth: 140, maxWidth: 220, multiline: true, maxLines: 2, placeholder: "Notes" },
    ], []);
    const medicationColumns = useMemo(() => [
        {
            key: "medicine",
            label: "MEDICINE NAME",
            width: 240,
            minWidth: 200,
            maxWidth: 300,
            multiline: true,
            maxLines: 2,
            placeholder: "e.g. Paracetamol 650mg",
            showDropdownToggle: false,
            getOptions: (query) => getCatalogOptions(medicationSuggestions, query),
        },
        {
            key: "unitPerDose",
            label: "UNIT PER DOSE",
            width: 140,
            minWidth: 120,
            maxWidth: 160,
            placeholder: "e.g. 1 tablet",
            getOptions: (query) => getMedicationUnitOptions(query),
            restrictToOptions: true,
        },
        {
            key: "frequency",
            label: "FREQUENCY",
            width: 150,
            minWidth: 130,
            maxWidth: 170,
            placeholder: "e.g. 1-0-1",
            getOptions: (query) => getFrequencyOptions(query),
            restrictToOptions: true,
        },
        {
            key: "when",
            label: "WHEN",
            width: 150,
            minWidth: 120,
            maxWidth: 180,
            placeholder: "e.g. After Food",
            getOptions: (query) => filterByQuery(MEDICATION_WHEN_OPTIONS, query),
            restrictToOptions: true,
        },
        {
            key: "duration",
            label: "DURATION",
            width: 150,
            minWidth: 130,
            maxWidth: 190,
            placeholder: "e.g. 5 days",
            getOptions: (query, row) => getDurationOptions(getSeedQuery(query, row.duration ?? "")),
        },
        { key: "note", label: "NOTE", width: 190, minWidth: 150, maxWidth: 240, multiline: true, maxLines: 2, placeholder: "Notes" },
    ], []);
    const adviceColumns = useMemo(() => [
        {
            key: "advice",
            label: "ADVICE NAME",
            width: 420,
            minWidth: 320,
            maxWidth: 560,
            multiline: true,
            maxLines: 3,
            placeholder: "e.g. Drink warm water",
            showDropdownToggle: false,
            getOptions: (query) => getCatalogOptions(ADVICE_SUGGESTIONS, query),
        },
        { key: "note", label: "NOTE", width: 220, minWidth: 160, maxWidth: 260, multiline: true, maxLines: 2, placeholder: "Notes" },
    ], []);
    const labColumns = useMemo(() => [
        {
            key: "investigation",
            label: "INVESTIGATION NAME",
            width: 420,
            minWidth: 320,
            maxWidth: 560,
            multiline: true,
            maxLines: 2,
            placeholder: "e.g. Complete blood count",
            showDropdownToggle: false,
            getOptions: (query) => getCatalogOptions(LAB_INVESTIGATION_BASE_OPTIONS, query),
        },
        { key: "note", label: "NOTE", width: 220, minWidth: 160, maxWidth: 260, multiline: true, maxLines: 2, placeholder: "Notes" },
    ], []);
    const surgeryColumns = useMemo(() => [
        {
            key: "surgery",
            label: "SURGERY NAME",
            width: 420,
            minWidth: 320,
            maxWidth: 560,
            multiline: true,
            maxLines: 2,
            placeholder: "e.g. Laparoscopic appendectomy",
            showDropdownToggle: false,
            getOptions: (query) => getCatalogOptions(SURGERY_SUGGESTIONS, query),
        },
        { key: "note", label: "NOTE", width: 220, minWidth: 160, maxWidth: 260, multiline: true, maxLines: 2, placeholder: "Notes" },
    ], []);
    return (_jsxs("div", { className: rx.rxRoot, children: [_jsx(EditableTableModule, { id: "symptoms", title: "Symptoms", icon: _jsx(TPMedicalIcon, { name: "Virus", variant: "bulk", size: 24, color: "var(--tp-violet-500)" }), columns: symptomsColumns, primaryKey: "name", rows: symptomRows, onChangeRows: setSymptomRows, searchPlaceholder: "Search & Add Symptoms", searchSuggestions: symptomSuggestions, cannedChips: symptomSuggestions.slice(0, 12) }), _jsx(EditableTableModule, { id: "lab", title: "Lab Investigation", icon: _jsx(TPMedicalIcon, { name: "Test Tube", variant: "bulk", size: 24, color: "var(--tp-violet-500)" }), columns: labColumns, primaryKey: "investigation", rows: labRows, onChangeRows: setLabRows, searchPlaceholder: "Search & Add Lab Investigation", cannedChips: LAB_INVESTIGATION_BASE_OPTIONS }), _jsx(EditableTableModule, { id: "medication", title: "Medication (Rx)", icon: _jsx(TPMedicalIcon, { name: "Tablets", variant: "bulk", size: 24, color: "var(--tp-violet-500)" }), columns: medicationColumns, primaryKey: "medicine", rows: medicationRows, onChangeRows: setMedicationRows, searchPlaceholder: "Search & Add Medication (Rx)", searchSuggestions: medicationSuggestions, cannedChips: [
                    "Paracetamol 650mg",
                    "Amoxicillin 500mg",
                    "Pantoprazole 40mg",
                    "Cetirizine 10mg",
                    "Ondansetron 4mg",
                    "ORS Sachet",
                    "Multivitamin",
                    "Ibuprofen 400mg",
                ] }), _jsx(EditableTableModule, { id: "advice", title: "Advices", icon: _jsx(TPMedicalIcon, { name: "health care", variant: "bulk", size: 24, color: "var(--tp-violet-500)" }), columns: adviceColumns, primaryKey: "advice", rows: adviceRows, onChangeRows: setAdviceRows, searchPlaceholder: "Search & Add Advice", cannedChips: ADVICE_SUGGESTIONS }), _jsx(EditableTableModule, { id: "examinations", title: "Examinations", icon: _jsx(TPMedicalIcon, { name: "medical service", variant: "bulk", size: 24, color: "var(--tp-violet-500)" }), columns: examinationsColumns, primaryKey: "name", rows: examinationRows, onChangeRows: setExaminationRows, searchPlaceholder: "Search & Add Examinations", searchSuggestions: examinationSuggestions, cannedChips: examinationSuggestions.slice(0, 12), pulseRowIds: examinationPulseIds }), _jsx(EditableTableModule, { id: "diagnosis", title: "Diagnosis", icon: _jsx(TPMedicalIcon, { name: "Diagnosis", variant: "bulk", size: 24, color: "var(--tp-violet-500)" }), columns: diagnosisColumns, primaryKey: "name", rows: diagnosisRows, onChangeRows: setDiagnosisRows, searchPlaceholder: "Search & Add Diagnosis", searchSuggestions: diagnosisSuggestions, cannedChips: diagnosisSuggestions.slice(0, 12) }), _jsxs("div", { className: rx.notesGrid, children: [_jsx(TPRxPadSection, { title: "Additional Notes", icon: _jsx(Notepad2, { size: 24, variant: "Bulk", color: "var(--tp-violet-500)" }), showHeaderActions: false, children: _jsx("textarea", { value: additionalNotes, onChange: (event) => setAdditionalNotes(event.currentTarget.value), rows: 5, className: rx.notesTextarea, placeholder: "Enter additional notes" }) }), _jsx(TPRxPadSection, { title: "Follow-up", icon: _jsx(Calendar2, { size: 24, variant: "Bulk", color: "var(--tp-violet-500)" }), showHeaderActions: false, children: _jsxs("div", { className: rx.followStack, children: [_jsx("input", { value: followUp, onChange: (event) => setFollowUp(event.currentTarget.value), className: rx.followInput, placeholder: "e.g. 3 days" }), _jsx("div", { className: rx.followQuickRow, children: ["2 days", "1 week", "1 month", "3 months"].map((quick) => (_jsx("button", { type: "button", className: rx.followQuick, onClick: () => setFollowUp(quick), children: quick }, quick))) })] }) })] })] }));
}
