"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import MuiLinearProgress from "@mui/material/LinearProgress";
export function TPProgress({ variant = "determinate", ...props }) {
    return _jsx(MuiLinearProgress, { variant: variant, ...props });
}
