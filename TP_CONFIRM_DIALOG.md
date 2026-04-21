# TPConfirmDialog — reusable confirmation / alert modal

A single shared component for every "are you sure?" or "this is important" modal across the TP design system. Replaces the default shadcn `AlertDialog` look with a tighter, more legible shell that supports four intent tones, an optional amber warning callout, and arbitrary body content (textareas, chip lists, etc.).

- Built on top of Radix's `@radix-ui/react-alert-dialog` primitive (same a11y guarantees as shadcn).
- Pure JSX, no extra runtime dependencies besides `iconsax-reactjs` (warning icon) and `lucide-react` (close icon).
- 480 px fixed width, `max-w-[94vw]` on small screens.
- Ships with a companion `useDirtyDrawerGuard` hook for the "close drawer with unsaved changes?" flow.

---

## 1. Visual spec

```
┌─────────────────────────────────────────────┐
│  <title>                              [ × ] │   header — 16px semibold slate-900 + 28×28 dark close pill
├─────────────────────────────────────────────┤   hairline slate-100
│  ⚠  <warning copy on amber chip>            │   optional warning callout (bg-tp-warning-50)
│  <description text>                         │   optional plain body copy
│  <children — textareas, chips, forms>       │
├─────────────────────────────────────────────┤   hairline slate-100
│                     <secondary>  <primary>  │   footer — right-aligned, 14 px gap
└─────────────────────────────────────────────┘
```

- **Shell**: `rounded-[14px] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.15)]`. No outer border.
- **Overlay**: `bg-black/40` with Radix's built-in fade + scale animations.
- **Header**: title on the left (16 px semibold), filled-slate close button on the right (`bg-tp-slate-900 text-white`). Separated from body by `h-px bg-tp-slate-100`.
- **Warning callout**: `bg-tp-warning-50` pill with the iconsax `Danger` triangle in `text-tp-warning-500` and copy in `text-tp-slate-700 leading-[1.45]`.
- **Footer**: right-aligned, `border-t border-tp-slate-100`. Secondary sits on the left of the primary. Secondary is a **blue underlined link** by default (visually subordinate to the primary solid button); swap to `"muted"` for a bordered neutral button when both actions are equally weighted.
- **Primary tone palette**:

  | `primaryTone`    | Background        | Hover             | Typical usage                    |
  | ---------------- | ----------------- | ----------------- | -------------------------------- |
  | `primary`        | `tp-blue-600`     | `tp-blue-700`     | Confirm / continue               |
  | `destructive`    | `tp-error-600`    | `tp-error-700`    | Delete / cancel / discard        |
  | `success`        | `tp-success-600`  | `tp-success-700`  | Mark done / activate / complete  |
  | `warning`        | `tp-warning-600`  | `tp-warning-700`  | Revert / reopen / move           |

---

## 2. Props API

```ts
type TPConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void

  title: string

  /** Amber-chip copy. Shown at the top of the body when set. */
  warning?: React.ReactNode

  /** Plain paragraph copy rendered below the warning callout. */
  description?: React.ReactNode

  /** Any extra JSX — textareas, chip pickers, preview cards, etc. */
  children?: React.ReactNode

  /** Left button (defaults to "Cancel"). */
  secondaryLabel?: string
  onSecondary?: () => void
  /** "link" (default, blue underlined) | "muted" (bordered neutral). */
  secondaryTone?: "link" | "muted"

  /** Right button (required). */
  primaryLabel: string
  onPrimary: () => void
  primaryTone?: "primary" | "destructive" | "success" | "warning"
  primaryDisabled?: boolean
}
```

---

## 3. Required design tokens

If you're lifting this into a project without the TP token system, replace the classes in the source with your own equivalents:

| Token                | Suggested value       | Used in                                      |
| -------------------- | --------------------- | -------------------------------------------- |
| `tp-slate-900`       | `#0f172a`             | Title, close-button bg                       |
| `tp-slate-700`       | `#334155`             | Body copy                                    |
| `tp-slate-600`       | `#475569`             | Description                                  |
| `tp-slate-200`       | `#e2e8f0`             | Muted secondary border                       |
| `tp-slate-100`       | `#f1f5f9`             | Hairline dividers                            |
| `tp-slate-50`        | `#f8fafc`             | Muted secondary hover                        |
| `tp-blue-600/700`    | `#4B4AD5 / #3A39B2`   | Primary tone, secondary link                 |
| `tp-error-600/700`   | `#dc2626 / #b91c1c`   | Destructive tone                             |
| `tp-success-600/700` | `#16a34a / #15803d`   | Success tone                                 |
| `tp-warning-600/700` | `#d97706 / #b45309`   | Warning tone (footer button)                 |
| `tp-warning-500`     | `#f59e0b`             | Warning-callout triangle icon                |
| `tp-warning-50`      | `#fef3c7` (softer)    | Warning-callout background                   |

Font stack: `font-['Inter',sans-serif]`. Swap to your default sans if Inter isn't on the project.

---

## 4. Dependencies

```bash
npm install @radix-ui/react-alert-dialog iconsax-reactjs lucide-react clsx tailwind-merge
```

`cn()` is the shadcn classname helper (`clsx + tailwind-merge`). If you don't have it, inline a trivial version:

```ts
export const cn = (...args: Array<string | false | null | undefined>) =>
  args.filter(Boolean).join(" ")
```

---

## 5. Component source — `TPConfirmDialog.jsx`

```jsx
"use client";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Danger } from "iconsax-reactjs";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * TPConfirmDialog — canonical confirmation / alert shell for the TP design system.
 *
 * Layout:
 *   ┌───────────────────────────────────────┐
 *   │  <title>                         [×]  │  header row
 *   ├───────────────────────────────────────┤  divider
 *   │  ⚠  <warning copy on amber chip>       │  optional warning callout
 *   │  <children — extra body content>       │
 *   ├───────────────────────────────────────┤  divider
 *   │                <secondary>  <primary>  │  footer
 *   └───────────────────────────────────────┘
 */
const PRIMARY_TONE_CLASS = {
  primary: "bg-tp-blue-600 text-white hover:bg-tp-blue-700",
  destructive: "bg-tp-error-600 text-white hover:bg-tp-error-700",
  success: "bg-tp-success-600 text-white hover:bg-tp-success-700",
  warning: "bg-tp-warning-600 text-white hover:bg-tp-warning-700",
};

export function TPConfirmDialog({
  open,
  onOpenChange,
  title,
  warning,
  description,
  children,
  secondaryLabel = "Cancel",
  onSecondary,
  secondaryTone = "link",
  primaryLabel,
  onPrimary,
  primaryTone = "primary",
  primaryDisabled = false,
}) {
  const handleSecondary = (e) => {
    if (onSecondary) {
      e?.preventDefault?.();
      onSecondary();
    }
  };
  const handlePrimary = (e) => {
    if (onPrimary) {
      e?.preventDefault?.();
      onPrimary();
    }
  };

  const primaryBtnClass = cn(
    "inline-flex h-[40px] items-center justify-center rounded-[10px] px-[16px] font-['Inter',sans-serif] text-[14px] font-semibold transition-colors",
    PRIMARY_TONE_CLASS[primaryTone] || PRIMARY_TONE_CLASS.primary,
    primaryDisabled && "opacity-50 cursor-not-allowed",
  );

  const secondaryBtnClass =
    secondaryTone === "muted"
      ? "inline-flex h-[40px] items-center justify-center rounded-[10px] border border-tp-slate-200 bg-white px-[16px] font-['Inter',sans-serif] text-[14px] font-semibold text-tp-slate-700 hover:bg-tp-slate-50 transition-colors"
      : "inline-flex h-[40px] items-center justify-center rounded-[10px] bg-transparent px-[8px] font-['Inter',sans-serif] text-[14px] font-semibold text-tp-blue-600 underline underline-offset-[4px] decoration-2 hover:text-tp-blue-700";

  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <AlertDialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[480px] max-w-[94vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[14px] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.15)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          {/* Header */}
          <div className="flex items-center justify-between gap-[12px] px-[20px] py-[16px]">
            <AlertDialogPrimitive.Title className="font-['Inter',sans-serif] text-[16px] font-semibold text-tp-slate-900">
              {title}
            </AlertDialogPrimitive.Title>
            <AlertDialogPrimitive.Cancel asChild>
              <button
                type="button"
                aria-label="Close"
                className="inline-flex h-[28px] w-[28px] items-center justify-center rounded-[6px] bg-tp-slate-900 text-white transition-colors hover:bg-tp-slate-700"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </AlertDialogPrimitive.Cancel>
          </div>

          <div className="h-px bg-tp-slate-100" aria-hidden />

          {/* Body */}
          {(warning || description || children) && (
            <div className="flex flex-col gap-[14px] px-[20px] py-[16px]">
              {warning && (
                <div className="flex items-start gap-[12px] rounded-[10px] bg-tp-warning-50 px-[16px] py-[14px]">
                  <Danger
                    size={20}
                    variant="Linear"
                    className="mt-[2px] shrink-0 text-tp-warning-500"
                  />
                  <p className="font-['Inter',sans-serif] text-[14px] leading-[1.45] text-tp-slate-700">
                    {warning}
                  </p>
                </div>
              )}
              {description && (
                <AlertDialogPrimitive.Description className="font-['Inter',sans-serif] text-[14px] leading-[1.5] text-tp-slate-600">
                  {description}
                </AlertDialogPrimitive.Description>
              )}
              {children}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-[14px] border-t border-tp-slate-100 px-[20px] py-[14px]">
            <AlertDialogPrimitive.Cancel asChild>
              <button
                type="button"
                onClick={handleSecondary}
                className={secondaryBtnClass}
              >
                {secondaryLabel}
              </button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <button
                type="button"
                onClick={handlePrimary}
                disabled={primaryDisabled}
                className={primaryBtnClass}
              >
                {primaryLabel}
              </button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
```

---

## 6. Usage examples

### 6.1 Destructive confirm (delete)

```jsx
const [open, setOpen] = useState(false)

<TPConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Delete Service"
  warning="This will delete this service from the plan. This action cannot be undone."
  secondaryLabel="Cancel"
  primaryLabel="Delete"
  primaryTone="destructive"
  onPrimary={() => {
    dispatch({ type: "DELETE_SERVICE", serviceId })
    setOpen(false)
  }}
/>
```

### 6.2 Success confirm (mark done / activate)

```jsx
<TPConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Mark as Completed"
  warning="This moves the service to Completed. You can revert if needed."
  secondaryLabel="Cancel"
  primaryLabel="Mark Done"
  primaryTone="success"
  onPrimary={confirm}
/>
```

### 6.3 Warning confirm (revert / move)

```jsx
<TPConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Revert Plan to Estimates"
  warning="All appointments, consultations and sittings linked to this plan will be cleared."
  secondaryLabel="Cancel"
  primaryLabel="Revert to Estimates"
  primaryTone="warning"
  onPrimary={confirm}
/>
```

### 6.4 Primary confirm with a form inside (cancel-appointment with reason)

```jsx
const [reason, setReason] = useState("")

<TPConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Cancel Appointment"
  warning={`Cancelling ${doctor}'s appointment ${dateLabel}. Record a reason to keep it visible in the visit history.`}
  secondaryLabel="Keep appointment"
  primaryLabel="Cancel appointment"
  primaryTone="destructive"
  primaryDisabled={!reason.trim()}
  onPrimary={() => { confirm(reason); setOpen(false) }}
>
  <textarea
    value={reason}
    onChange={(e) => setReason(e.target.value)}
    placeholder="Reason for cancelling…"
    className="h-[92px] w-full resize-none rounded-[10px] border border-tp-slate-200 bg-white px-[12px] py-[10px] text-[14px] text-tp-slate-800 placeholder:text-tp-slate-400 focus:border-tp-blue-500 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20"
  />
  <div className="flex flex-wrap gap-[6px]">
    {["Patient no-show", "Doctor unavailable", "Rescheduled by patient"].map((q) => (
      <button
        key={q}
        type="button"
        onClick={() => setReason(q)}
        className="inline-flex h-[26px] items-center rounded-[8px] bg-tp-slate-100 px-[10px] text-[12px] font-medium text-tp-slate-600 hover:bg-tp-slate-200"
      >
        {q}
      </button>
    ))}
  </div>
</TPConfirmDialog>
```

### 6.5 Unsaved-changes confirm (back-button guard)

When the primary CTA is the **safe** path ("Stay on this drawer") and the secondary is the destructive path ("Discard and go back"), keep both the blue-link secondary and the blue primary tone — the visual order reads "keep editing" → "leave".

```jsx
<TPConfirmDialog
  open={guard.confirmOpen}
  onOpenChange={(open) => { if (!open) guard.cancelDiscard() }}
  title="Are you sure you want to go back?"
  warning="If you go back now, your changes will not be saved."
  secondaryLabel="Yes, Go Back"
  onSecondary={guard.confirmDiscard}
  primaryLabel="No, Stay"
  primaryTone="primary"
  onPrimary={guard.cancelDiscard}
/>
```

---

## 7. Companion hook — `useDirtyDrawerGuard`

Small hook that intercepts a drawer close attempt when the form inside has unsaved edits. It owns the `confirmOpen` state + intent helpers; rendering the `TPConfirmDialog` is the caller's responsibility.

### Source — `use-dirty-drawer-guard.js`

```jsx
"use client";
import { useCallback, useState } from "react";

export function useDirtyDrawerGuard({ isDirty, onClose }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const attemptClose = useCallback(() => {
    if (isDirty) {
      setConfirmOpen(true);
      return;
    }
    onClose?.();
  }, [isDirty, onClose]);

  const confirmDiscard = useCallback(() => {
    setConfirmOpen(false);
    onClose?.();
  }, [onClose]);

  const cancelDiscard = useCallback(() => {
    setConfirmOpen(false);
  }, []);

  return { confirmOpen, setConfirmOpen, attemptClose, confirmDiscard, cancelDiscard };
}
```

### Usage

```jsx
function MyDrawer({ open, onClose }) {
  const [name, setName] = useState(initial.name)
  const isDirty = name !== initial.name

  const guard = useDirtyDrawerGuard({ isDirty, onClose })

  return (
    <>
      <Drawer
        open={open}
        onOpenChange={(o) => { if (!o) guard.attemptClose() }}
      >
        <DrawerHeader onClose={() => guard.attemptClose()} />
        {/* form fields... */}
      </Drawer>

      <TPConfirmDialog
        open={guard.confirmOpen}
        onOpenChange={(o) => { if (!o) guard.cancelDiscard() }}
        title="Are you sure you want to go back?"
        warning="If you go back now, your changes will not be saved."
        secondaryLabel="Yes, Go Back"
        onSecondary={guard.confirmDiscard}
        primaryLabel="No, Stay"
        primaryTone="primary"
        onPrimary={guard.cancelDiscard}
      />
    </>
  )
}
```

---

## 8. Porting to a non-TP project

If you're dropping this into a project that doesn't use the `tp-*` token naming:

1. Replace every `tp-slate-*`, `tp-blue-*`, `tp-error-*`, `tp-success-*`, `tp-warning-*` class with your project's equivalent (see the token table in §3).
2. Swap the iconsax `<Danger />` import for a warning triangle you already ship (`lucide-react`'s `<AlertTriangle />` works — same ~20 px size, same stroke weight).
3. Swap the `lucide-react` `<X />` for your own close icon if needed.
4. If your project doesn't use the `shadcn` `cn()` helper, inline the trivial version from §4.
5. Fonts: `font-['Inter',sans-serif]` can be replaced with your default sans stack or your Tailwind font utility (`font-sans`, etc.).

---

## 9. Accessibility

- Inherits `role="alertdialog"` semantics, focus trap, `Esc`-to-close, and focus return from Radix `AlertDialogPrimitive`.
- Title is announced via `AlertDialogPrimitive.Title`.
- Description (plain body copy) is announced via `AlertDialogPrimitive.Description` — when you only pass a `warning` (amber chip), it won't be wired to `aria-describedby`. Prefer `description` for screen-reader-critical context, `warning` for visual-only emphasis.
- The close button carries `aria-label="Close"`.
- The primary action is always the **right-hand** button; secondary is always the left — consistent with platform conventions and keyboard reading order.

---

## 10. Common mistakes to avoid

- **Don't reverse the tone/side mapping.** Primary action on the right, tone-colored. Secondary on the left, blue link (or muted). Swapping positions breaks muscle memory across the whole app.
- **Don't omit the warning callout for destructive actions.** The amber chip is the signal that the primary CTA has consequences; a plain description reads like an FYI.
- **Don't duplicate copy between `warning` and `description`.** Pick one.
- **For "go-back-while-dirty" flows, remember that the primary CTA is the safe one** ("No, Stay" — keep editing), not the destructive one. The secondary link is the exit.
- **Don't use `primaryTone="destructive"` for `Cancel appointment`-style flows.** *Canceling* is destructive to the appointment record, so it's correct there. But the primary "activate / continue" flow should always be `success` or `primary`, never red.
- **Keep `children` short.** One textarea + a row of quick-pick chips is the ceiling — anything more and you want a drawer, not a modal.
