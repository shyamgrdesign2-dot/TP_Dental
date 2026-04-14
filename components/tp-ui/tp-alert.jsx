"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MuiAlert from "@mui/material/Alert";
import MuiAlertTitle from "@mui/material/AlertTitle";
export function TPAlert({ severity = "info", title, children, ...props }) {
    return (_jsxs(MuiAlert, { severity: severity, ...props, children: [title ? _jsx(MuiAlertTitle, { children: title }) : null, children] }));
}
