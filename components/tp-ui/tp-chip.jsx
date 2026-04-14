"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import MuiChip from "@mui/material/Chip";
export function TPChip({ variant = "filled", color = "default", ...props }) {
    return _jsx(MuiChip, { variant: variant, color: color, ...props });
}
