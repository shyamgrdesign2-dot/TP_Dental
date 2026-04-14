"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export function TPAccordion(props) {
    return _jsx(MuiAccordion, { disableGutters: true, ...props });
}
export function TPAccordionSummary(props) {
    return (_jsx(MuiAccordionSummary, { expandIcon: _jsx(ExpandMoreIcon, {}), ...props }));
}
export function TPAccordionDetails(props) {
    return _jsx(MuiAccordionDetails, { ...props });
}
