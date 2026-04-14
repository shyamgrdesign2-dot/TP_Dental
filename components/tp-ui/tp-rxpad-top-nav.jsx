"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import RxpadHeader from "@/components/tp-rxpad/imports/RxpadHeader";
export function TPRxPadTopNav({ className, onBack, patientId }) {
    return _jsx(RxpadHeader, { className: className, onBack: onBack, patientId: patientId });
}
