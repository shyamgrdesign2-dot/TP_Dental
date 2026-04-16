"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Slide from "@mui/material/Slide";
import { ArrowDown2, DocumentDownload, Edit2, LanguageSquare, Printer, ReceiptText, Setting2, User } from "iconsax-reactjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RxPreviewDocument } from "@/components/tp-rxpad/RxPreviewDocument";
import { getComposedRxPreviewSnapshot } from "@/components/tp-rxpad/rx-preview-composer";
import { TPSnackbar } from "@/components/tp-ui";
import svgPaths from "@/components/tp-rxpad/imports/svg-gb0jbe9ifm";
import ev from "./EndVisitPage.module.scss";
import { getAppointmentPatient } from "@/lib/appointment-patients";
const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam"];
function ActionTile({ label, icon, onClick, }) {
    return (_jsx("button", { type: "button", onClick: onClick, className: ev.actionTile, children: _jsxs("div", { className: ev.actionTileInner, children: [_jsxs("div", { className: ev.actionTileLeft, children: [_jsx("span", { className: ev.actionIcon, children: icon }), _jsx("span", { className: ev.actionLabel, children: label })] }), _jsx(ChevronRight, { size: 18, className: ev.chevronBlue })] }) }));
}
export function EndVisitPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const patientId = searchParams?.get("patientId") ?? "apt-1";
    const buildRxResumeQuery = () => {
        const q = new URLSearchParams();
        q.set("patientId", patientId);
        for (const key of ["planId", "serviceId", "appointmentId", "returnTo", "ctxTreatment"]) {
            const v = searchParams?.get(key);
            if (v)
                q.set(key, v);
        }
        return q.toString();
    };
    const returnToPlan = () => {
        const r = searchParams?.get("returnTo");
        if (r && r.startsWith("/") && !r.startsWith("//"))
            router.push(r);
        else
            router.push("/appointments?snackbar=appointment-completed");
    };
    const [language, setLanguage] = useState("English");
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isEditConfirmOpen, setIsEditConfirmOpen] = useState(false);
    const [previewSnapshot, setPreviewSnapshot] = useState(null);
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        const snackbarType = searchParams?.get("snackbar");
        const pendingKey = "tp.snackbar.end-visit";
        if (snackbarType === "visit-ended") {
            window.sessionStorage.setItem(pendingKey, "1");
            const params = new URLSearchParams(searchParams?.toString() ?? "");
            params.delete("snackbar");
            const next = params.toString();
            router.replace(next ? `/rxpad/end-visit?${next}` : "/rxpad/end-visit");
            return;
        }
        if (window.sessionStorage.getItem(pendingKey) === "1") {
            window.sessionStorage.removeItem(pendingKey);
            setSnackbarMessage("Visit ended successfully");
            setSnackbarOpen(true);
        }
    }, [router, searchParams]);
    useEffect(() => {
        setPreviewSnapshot(getComposedRxPreviewSnapshot(patientId));
    }, [patientId]);
    const openEditRxConfirm = () => {
        setIsEditConfirmOpen(true);
    };
    const handleConfirmEditRx = () => {
        setIsEditConfirmOpen(false);
        router.push(`/rxpad?${buildRxResumeQuery()}`);
    };
    const handleEndVisitBack = () => {
        const r = searchParams?.get("returnTo");
        if (r && r.startsWith("/") && !r.startsWith("//")) {
            router.push(r);
            return;
        }
        openEditRxConfirm();
    };
    const patient = useMemo(() => {
        const p = getAppointmentPatient(patientId);
        return {
            name: p.name,
            gender: p.genderShort,
            age: `${p.age}y`,
        };
    }, [patientId]);
    const downloadRx = async () => {
        const lines = [];
        lines.push("Digital Rx");
        lines.push("");
        if (previewSnapshot) {
            const pushSection = (title, rows) => {
                if (!rows.length)
                    return;
                lines.push(title);
                rows.forEach((row) => {
                    const suffix = row.metaParts.length ? ` (${row.metaParts.join(" | ")})` : "";
                    lines.push(`- ${row.title}${suffix}`);
                });
                lines.push("");
            };
            if (previewSnapshot.vitals.length) {
                lines.push("Vitals");
                previewSnapshot.vitals.forEach((row) => lines.push(`- ${row.label} (${row.unit}): ${row.value}`));
                lines.push("");
            }
            pushSection("Symptoms", previewSnapshot.symptoms);
            pushSection("Examination", previewSnapshot.examinations);
            pushSection("Diagnosis", previewSnapshot.diagnoses);
            pushSection("Lab Investigation", previewSnapshot.labInvestigations);
            pushSection("Medication (Rx)", previewSnapshot.medications);
            pushSection("Advice", previewSnapshot.advice);
            if (previewSnapshot.labResults.length) {
                lines.push("Lab Results (Today)");
                previewSnapshot.labResults.forEach((row) => lines.push(`- ${row.label} ${row.unit}: ${row.value}`));
                lines.push("");
            }
            if (previewSnapshot.dentalExamination.length) {
                lines.push("Dental Examination");
                previewSnapshot.dentalExamination.forEach((block) => {
                    lines.push(`- ${block.toothLabel}`);
                    block.treatmentHistory.forEach((item) => lines.push(`  - Treatment History: ${item.title}${item.metaParts.length ? ` (${item.metaParts.join(" | ")})` : ""}`));
                    block.findings.forEach((item) => lines.push(`  - Findings: ${item.title}${item.metaParts.length ? ` (${item.metaParts.join(" | ")})` : ""}`));
                    block.procedures.forEach((item) => lines.push(`  - Procedures: ${item.title}${item.metaParts.length ? ` (${item.metaParts.join(" | ")})` : ""}`));
                    if (block.overallToothNote) {
                        lines.push(`  - Overall Tooth Notes: ${block.overallToothNote}`);
                    }
                });
                lines.push("");
            }
            if (previewSnapshot.followUp) {
                lines.push(`Follow Up: ${previewSnapshot.followUp}`);
            }
            if (previewSnapshot.additionalNotes) {
                lines.push(`Additional Notes: ${previewSnapshot.additionalNotes}`);
            }
        }
        else {
            lines.push("No Rx data available yet.");
        }
        const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "digital-rx.txt";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };
    return (_jsxs("div", { className: ev.page, children: [_jsx("header", { className: ev.header, children: _jsxs("div", { className: ev.headerInner, children: [_jsxs("div", { className: ev.headerLeft, children: [_jsxs("button", { "aria-label": "Go back", className: ev.backBtn, "data-name": "Back Button", onClick: handleEndVisitBack, type: "button", children: [_jsx("div", { "aria-hidden": "true", className: ev.backBtnRule }), _jsx("div", { className: ev.backIconWrap, "data-name": "Back Arrow", children: _jsx(ChevronLeft, { color: "#454551", size: 24, strokeWidth: 2, style: { opacity: 0.7 } }) })] }), _jsxs("div", { className: ev.patientRow, children: [_jsx("div", { className: ev.avatar, children: _jsx(User, { size: 24, variant: "Bulk", color: "var(--tp-slate-600)" }) }), _jsxs("div", { children: [_jsx("p", { className: ev.patientName, children: patient.name }), _jsxs("p", { className: ev.patientMeta, children: [patient.gender, " | ", patient.age] })] })] })] }), _jsxs("div", { className: ev.headerRight, children: [_jsx("button", { type: "button", "aria-label": "Tutorial", className: ev.iconBtnTutorial, children: _jsx("svg", { className: ev.tutorialSvg, fill: "none", preserveAspectRatio: "none", viewBox: "0 0 42 42", children: _jsx("g", { id: "Tutorial", children: _jsxs("g", { id: "Union", opacity: "0.8", children: [_jsx("path", { clipRule: "evenodd", d: svgPaths.p3172ac80, fill: "var(--fill-0, #8A4DBB)", fillRule: "evenodd" }), _jsx("path", { clipRule: "evenodd", d: svgPaths.p2ee5cec0, fill: "var(--fill-0, #8A4DBB)", fillRule: "evenodd" })] }) }) }) }), _jsx("div", { className: ev.dividerV }), _jsxs("button", { type: "button", className: ev.headerPillBtn, children: [_jsx(Setting2, { size: 20, variant: "Linear" }), _jsx("span", { className: ev.pillBtnLabel, children: "Print Settings" })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs("button", { type: "button", className: ev.headerPillBtn, children: [_jsx(LanguageSquare, { size: 20, variant: "Linear" }), _jsx("span", { className: ev.pillBtnLabel, children: language }), _jsx(ArrowDown2, { size: 18, variant: "Linear" })] }) }), _jsx(DropdownMenuContent, { align: "end", className: ev.dropdownPanel, children: LANGUAGES.map((lang) => (_jsx(DropdownMenuItem, { onClick: () => setLanguage(lang), className: ev.dropdownItem, children: lang }, lang))) })] }), _jsx("button", { type: "button", onClick: returnToPlan, className: ev.doneBtn, children: "Done" })] })] }) }), _jsxs("main", { className: ev.main, children: [_jsx("aside", { className: ev.sidebar, children: _jsxs("div", { className: ev.sidebarStack, children: [_jsx(ActionTile, { label: "Create Bill", icon: _jsx(ReceiptText, { size: 20, variant: "Linear" }) }), _jsx(ActionTile, { label: "Print Digital Rx", icon: _jsx(Printer, { size: 20, variant: "Linear" }), onClick: () => window.print() }), _jsx(ActionTile, { label: "Download Digital Rx", icon: _jsx(DocumentDownload, { size: 20, variant: "Linear" }), onClick: downloadRx }), _jsx(ActionTile, { label: "Edit Digital Rx", icon: _jsx(Edit2, { size: 20, variant: "Linear" }), onClick: openEditRxConfirm })] }) }), _jsx("section", { className: ev.previewSection, children: _jsx(RxPreviewDocument, { snapshot: previewSnapshot }) })] }), _jsx(AlertDialog, { open: isEditConfirmOpen, onOpenChange: setIsEditConfirmOpen, children: _jsxs(AlertDialogContent, { className: ev.alertContent, children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { className: ev.alertTitle, children: "Edit Digital Rx?" }), _jsx(AlertDialogDescription, { className: ev.alertDesc, children: "Are you sure you want to edit this Rx? You will be taken back to the Rx page." })] }), _jsxs(AlertDialogFooter, { className: ev.alertFooter, children: [_jsx(AlertDialogCancel, { className: ev.alertCancel, children: "No, Stay Here" }), _jsx(AlertDialogAction, { onClick: handleConfirmEditRx, className: ev.alertAction, children: "Yes, Edit Rx" })] })] }) }), _jsx(TPSnackbar, { open: snackbarOpen, message: snackbarMessage ?? "", severity: "success", anchorOrigin: { vertical: "top", horizontal: "center" }, TransitionComponent: Slide, TransitionProps: { direction: "down" }, autoHideDuration: 1800, onClose: (_, reason) => {
                    if (reason === "clickaway")
                        return;
                    setSnackbarOpen(false);
                    setSnackbarMessage(null);
                } })] }));
}
