"use client";
/**
 * TPConfirmDialog — "Are you sure?" modal in TP design-system styling.
 *
 * Mirrors the VoiceRx `ConfirmDialog` molecule:
 *   Header (title + dark close ×) → divider → optional warning callout →
 *   description → footer (cancel link + primary solid button).
 *
 * Built on Radix AlertDialog (already used elsewhere in the dental app) and
 * styled with a local SCSS module so it matches the reference pixel-for-pixel
 * without depending on Tailwind utilities.
 */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
// We pull from the shadcn wrapper only for the styled Content + Title +
// Description + Overlay shells (which give us the centered modal layout +
// accessibility hooks). Action / Cancel come straight from the Radix
// primitive so we don't inherit the shadcn `buttonVariants({outline})` /
// `bg-background border shadow-xs` defaults onto our footer buttons.
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import styles from "./tp-confirm-dialog.module.scss";
const AlertDialogCancel = AlertDialogPrimitive.Cancel;
const AlertDialogAction = AlertDialogPrimitive.Action;

export function TPConfirmDialog({
  open,
  onOpenChange,
  title,
  warning,
  description,
  children,
  // Primary (confirming / destructive) action — accepts both legacy and
  // canonical prop names so consumers can pick whichever reads better.
  primaryLabel,
  onPrimary,
  primaryTone = "primary", // "primary" | "destructive"
  primaryDisabled = false,
  confirmLabel,
  onConfirm,
  // Secondary (cancel) action
  secondaryLabel = "Cancel",
  onSecondary,
  cancelLabel,
  onCancel,
  secondaryTone = "default", // "default" | "destructive"
  // Optional tertiary action — when present, renders a third button between
  // the cancel link and the primary solid (e.g. "Go back without saving"
  // sitting between Stay and Save & Go Back).
  tertiaryLabel,
  onTertiary,
  tertiaryTone = "default", // "default" | "destructive"
}) {
  const _primaryLabel = primaryLabel ?? confirmLabel ?? "Confirm";
  const _onPrimary = onPrimary ?? onConfirm;
  const _secondaryLabel = cancelLabel ?? secondaryLabel;
  const _onSecondary = onCancel ?? onSecondary;
  const primaryClass =
    primaryTone === "destructive" ? styles.primaryDestructive : styles.primary;
  const secondaryClass =
    secondaryTone === "destructive" ? styles.secondaryDestructive : styles.secondary;
  const tertiaryClass =
    tertiaryTone === "destructive" ? styles.tertiaryDestructive : styles.tertiary;
  return _jsx(AlertDialog, {
    open,
    onOpenChange,
    children: _jsx(AlertDialogPortal, {
      children: _jsxs(AlertDialogContent, {
        className: styles.content,
        children: [
          // ── Header ────────────────────────────────────────────────
          _jsxs("div", {
            className: styles.header,
            children: [
              _jsx(AlertDialogTitle, { className: styles.title, children: title }),
              _jsx(AlertDialogCancel, {
                asChild: true,
                children: _jsx("button", {
                  type: "button",
                  "aria-label": "Close",
                  className: styles.closeBtn,
                  // X always just dismisses — no callback. Letting Radix's
                  // built-in close fire (no preventDefault) ensures the
                  // dialog actually closes; firing onSecondary here would
                  // wrongly trigger the destructive action.
                  children: _jsxs("svg", {
                    width: 16,
                    height: 16,
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: 2.5,
                    strokeLinecap: "round",
                    children: [
                      _jsx("path", { d: "M18 6L6 18" }),
                      _jsx("path", { d: "M6 6l12 12" }),
                    ],
                  }),
                }),
              }),
            ],
          }),
          // ── Divider ──────────────────────────────────────────────
          _jsx("div", { className: styles.divider, "aria-hidden": true }),
          // ── Body ─────────────────────────────────────────────────
          (warning || description || children) &&
            _jsxs("div", {
              className: styles.body,
              children: [
                warning &&
                  _jsxs("div", {
                    className: styles.warning,
                    children: [
                      _jsx("svg", {
                        width: 20,
                        height: 20,
                        viewBox: "0 0 24 24",
                        fill: "none",
                        className: styles.warningIcon,
                        children: _jsx("path", {
                          d: "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
                          stroke: "var(--tp-warning-500, #F59E0B)",
                          strokeWidth: 2,
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                        }),
                      }),
                      _jsx("p", { className: styles.warningText, children: warning }),
                    ],
                  }),
                description &&
                  _jsx(AlertDialogDescription, {
                    className: styles.description,
                    children: description,
                  }),
                children,
              ].filter(Boolean),
            }),
          // ── Footer ───────────────────────────────────────────────
          _jsxs("div", {
            className: styles.footer,
            children: [
              _jsx(AlertDialogCancel, {
                asChild: true,
                children: _jsx("button", {
                  type: "button",
                  className: secondaryClass,
                  // Fire the callback (often the destructive action when
                  // `secondaryTone === "destructive"`) and let Radix's auto-
                  // close run. No preventDefault — it was swallowing the close.
                  onClick: () => { if (typeof _onSecondary === "function") _onSecondary(); },
                  children: _secondaryLabel,
                }),
              }),
              tertiaryLabel &&
                _jsx(AlertDialogAction, {
                  asChild: true,
                  children: _jsx("button", {
                    type: "button",
                    className: tertiaryClass,
                    onClick: () => { if (typeof onTertiary === "function") onTertiary(); },
                    children: tertiaryLabel,
                  }),
                }),
              _jsx(AlertDialogAction, {
                asChild: true,
                children: _jsx("button", {
                  type: "button",
                  className: primaryClass,
                  disabled: primaryDisabled,
                  // Same fix — drop preventDefault so the "No, Keep It" /
                  // safe-cancel primary actually dismisses the dialog when
                  // there's no custom handler. If `onPrimary` is defined,
                  // run it and still allow the close.
                  onClick: () => {
                    if (!primaryDisabled && typeof _onPrimary === "function") _onPrimary();
                  },
                  children: _primaryLabel,
                }),
              }),
            ].filter(Boolean),
          }),
        ].filter(Boolean),
      }),
    }),
  });
}

TPConfirmDialog.displayName = "TPConfirmDialog";
export default TPConfirmDialog;
