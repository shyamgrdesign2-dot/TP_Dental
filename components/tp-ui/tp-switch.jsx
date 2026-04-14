"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import MuiSwitch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
export function TPSwitch({ color = "primary", label, ...props }) {
    const switchEl = _jsx(MuiSwitch, { color: color, ...props });
    if (label) {
        return _jsx(FormControlLabel, { control: switchEl, label: label });
    }
    return switchEl;
}
