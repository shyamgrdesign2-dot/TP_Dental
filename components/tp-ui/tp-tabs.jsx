"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
export function TPTabs(props) {
    return _jsx(MuiTabs, { indicatorColor: "primary", textColor: "primary", ...props });
}
export function TPTab(props) {
    return _jsx(MuiTab, { ...props });
}
