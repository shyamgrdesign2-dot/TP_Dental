"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { tpTheme } from "@/lib/tp-mui-theme";
export function TPThemeProvider({ children }) {
    return (_jsxs(ThemeProvider, { theme: tpTheme, children: [_jsx(CssBaseline, {}), children] }));
}
