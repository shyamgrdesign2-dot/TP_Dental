"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MuiSelect from "@mui/material/Select";
import MuiFormControl from "@mui/material/FormControl";
import MuiInputLabel from "@mui/material/InputLabel";
export function TPSelect({ variant = "outlined", label, ...props }) {
    const id = props.id ?? `tp-select-${Math.random().toString(36).slice(2)}`;
    return (_jsxs(MuiFormControl, { variant: variant, fullWidth: props.fullWidth, size: props.size, children: [label && _jsx(MuiInputLabel, { id: `${id}-label`, children: label }), _jsx(MuiSelect, { labelId: label ? `${id}-label` : undefined, id: id, label: label, variant: variant, ...props })] }));
}
