"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import { ChevronRight, FolderOpen, Folder, File } from "lucide-react";
import { cn } from "@/lib/utils";
function TreeNode({ node, level, selectedId, onSelect, expanded, onToggle, }) {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded[node.id] ?? false;
    const isSelected = selectedId === node.id;
    return (_jsxs("div", { children: [_jsxs("button", { type: "button", onClick: () => {
                    if (hasChildren)
                        onToggle(node.id);
                    onSelect?.(node.id);
                }, className: cn("flex w-full items-center gap-1.5 rounded-lg py-1.5 pr-2 text-left text-sm transition-colors", isSelected
                    ? "bg-tp-blue-50 text-tp-blue-700 font-medium"
                    : "text-tp-slate-700 hover:bg-tp-slate-50"), style: { paddingLeft: `${level * 20 + 8}px` }, children: [hasChildren ? (_jsx(ChevronRight, { size: 14, style: { flexShrink: 0 }, className: cn("shrink-0 text-tp-slate-400 transition-transform", isExpanded && "rotate-90") })) : (_jsx("span", { className: "w-3.5 shrink-0" })), node.icon || (hasChildren ? (isExpanded ? (_jsx(FolderOpen, { size: 16, style: { flexShrink: 0 }, className: "shrink-0 text-tp-amber-500" })) : (_jsx(Folder, { size: 16, style: { flexShrink: 0 }, className: "shrink-0 text-tp-amber-500" }))) : (_jsx(File, { size: 16, style: { flexShrink: 0 }, className: "shrink-0 text-tp-slate-400" }))), _jsx("span", { className: "truncate", children: node.label })] }), hasChildren && isExpanded && (_jsx("div", { children: node.children.map((child) => (_jsx(TreeNode, { node: child, level: level + 1, selectedId: selectedId, onSelect: onSelect, expanded: expanded, onToggle: onToggle }, child.id))) }))] }));
}
export function TPTreeView({ nodes, selectedId, onSelect, className }) {
    const [expanded, setExpanded] = useState({});
    const handleToggle = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    return (_jsx("div", { className: cn("rounded-xl border border-tp-slate-200 bg-white p-2", className), children: nodes.map((node) => (_jsx(TreeNode, { node: node, level: 0, selectedId: selectedId, onSelect: onSelect, expanded: expanded, onToggle: handleToggle }, node.id))) }));
}
