"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import MuiButton from "@mui/material/Button";
export function TPButton({ variant = "contained", size = "medium", color = "primary", loading = false, disabled, children, ...props }) {
    return (_jsx(MuiButton, { variant: variant, size: size, color: color === "secondary" ? "secondary" : color === "error" ? "error" : "primary", disabled: disabled || loading, ...props, children: loading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent", "aria-hidden": true }), _jsx("span", { className: "sr-only", children: "Loading" })] })) : (children) }));
}
