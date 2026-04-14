"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import MuiRadio from "@mui/material/Radio";
import MuiRadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
export function TPRadio({ color = "primary", ...props }) {
    return _jsx(MuiRadio, { color: color, ...props });
}
export function TPRadioGroup(props) {
    return _jsx(MuiRadioGroup, { ...props });
}
export { FormControlLabel };
