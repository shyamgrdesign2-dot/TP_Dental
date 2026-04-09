"use client"

/**
 * plan-shared.tsx — Shared sub-components for the Treatment Plan module.
 */

import { cn } from "@/lib/utils"
import type { PlanTabId } from "./plan-types"

// ─── Currency formatter ─────────────────────────────────────

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`
}

// ─── Tab pill ───────────────────────────────────────────────

interface TabPillProps {
  id: PlanTabId
  label: string
  count: number
  active: boolean
  onClick: () => void
}

export function TabPill({ label, count, active, onClick }: TabPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-[7px] rounded-[10px] px-[20px] h-[42px] font-sans text-[14px] font-semibold transition-all whitespace-nowrap relative",
        active
          ? "bg-white text-tp-slate-900 shadow-sm"
          : "bg-transparent text-tp-slate-500 hover:text-tp-slate-700",
      )}
    >
      {label}
      <span
        className={cn(
          "inline-flex h-[20px] min-w-[20px] items-center justify-center rounded-full px-[6px] text-[10px] font-bold",
          active ? "bg-tp-blue-600 text-white" : "bg-tp-slate-200/80 text-tp-slate-400",
        )}
      >
        {count}
      </span>
    </button>
  )
}

// ─── Section frame ──────────────────────────────────────────

interface SectionFrameProps {
  children: React.ReactNode
  className?: string
}

export function SectionFrame({ children, className }: SectionFrameProps) {
  return (
    <div className={cn("h-full flex-1 min-h-0 overflow-y-auto px-[20px] py-[16px]", className)}>
      {children}
    </div>
  )
}

// ─── Empty state ────────────────────────────────────────────

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-[60px] gap-[14px] text-center">
      <div className="text-tp-slate-300">{icon}</div>
      <div>
        <p className="font-sans text-[16px] font-semibold text-tp-slate-600">{title}</p>
        <p className="font-sans text-[14px] text-tp-slate-400 mt-[4px]">{description}</p>
      </div>
      {action && <div className="mt-[10px]">{action}</div>}
    </div>
  )
}

// ─── Plan total helper ──────────────────────────────────────

import type { PlanService } from "./plan-types"

// ─── Clipboard-tick icon (for completed state) ─────────────

export function ClipboardTickIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path opacity="0.4" d="M16.24 3.65039H7.76004C5.29004 3.65039 3.29004 5.66039 3.29004 8.12039V17.5304C3.29004 19.9904 5.30004 22.0004 7.76004 22.0004H16.23C18.7 22.0004 20.7 19.9904 20.7 17.5304V8.12039C20.71 5.65039 18.7 3.65039 16.24 3.65039Z"/>
      <path d="M14.3498 2H9.64977C8.60977 2 7.75977 2.84 7.75977 3.88V4.82C7.75977 5.86 8.59977 6.7 9.63977 6.7H14.3498C15.3898 6.7 16.2298 5.86 16.2298 4.82V3.88C16.2398 2.84 15.3898 2 14.3498 2Z"/>
      <path d="M10.81 16.9506C10.62 16.9506 10.43 16.8806 10.28 16.7306L8.78 15.2306C8.49 14.9406 8.49 14.4606 8.78 14.1706C9.07 13.8806 9.55 13.8806 9.84 14.1706L10.81 15.1406L14.28 11.6706C14.57 11.3806 15.05 11.3806 15.34 11.6706C15.63 11.9606 15.63 12.4406 15.34 12.7306L11.34 16.7306C11.2 16.8806 11 16.9506 10.81 16.9506Z"/>
    </svg>
  )
}

// ─── Close square icon (shared across drawers) ─────────────

export function CloseSquareIcon({ size = 24, color = "var(--tp-slate-700)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z"/>
    </svg>
  )
}

// ─── Custom drawer header with close-square icon ────────────
// Pattern: [✕ close] | divider | Title        [Action CTAs →]

interface DrawerHeaderProps {
  title: string
  onClose: () => void
  /** Optional action CTA in the right side of the header */
  action?: React.ReactNode
}

export function DrawerHeader({ title, onClose, action }: DrawerHeaderProps) {
  return (
    <div className="shrink-0 flex items-center border-b border-tp-slate-100/70 px-4 gap-0 h-[56px] bg-white">
      {/* Close icon */}
      <button
        type="button"
        onClick={onClose}
        className="flex items-center justify-center transition-opacity hover:opacity-70 shrink-0"
      >
        <CloseSquareIcon size={24} color="var(--tp-slate-700)" />
      </button>
      {/* Divider — full header height */}
      <div className="bg-gradient-to-b from-[rgba(208,213,221,0.2)] self-stretch opacity-80 shrink-0 to-[rgba(208,213,221,0.2)] via-1/2 via-[#d0d5dd] w-[1.05px] mx-3" />
      {/* Title */}
      <h2 className="text-[16px] font-semibold text-tp-slate-900 flex-1 min-w-0 truncate">{title}</h2>
      {/* Action area */}
      {action && <div className="shrink-0 ml-3">{action}</div>}
    </div>
  )
}

export function computePlanTotal(services: PlanService[]): number {
  return services.reduce((sum, s) => sum + s.amount, 0)
}

export function computePlanDiscount(services: PlanService[]): number {
  return services.reduce((sum, s) => sum + s.discount, 0)
}

export type ServiceWorkflowStatus = "not-started" | "in-progress" | "completed" | "no-show" | "not-interested"
export type PlanCompletionStatus = "not-completed" | "partially-completed" | "completed"

export function getServiceWorkflowStatus(service: PlanService): ServiceWorkflowStatus {
  if (service.status === "completed") return "completed"
  if (service.status === "no-show") return "no-show"
  if (service.status === "not-interested") return "not-interested"

  const hasActivity =
    service.sittings.length > 0 ||
    service.procedures.length > 0 ||
    (service.appointments?.length ?? 0) > 0

  return hasActivity ? "in-progress" : "not-started"
}

export function getPlanCompletionStatus(services: PlanService[]): PlanCompletionStatus {
  if (services.length === 0) return "not-completed"
  const completedCount = services.filter((s) => s.status === "completed").length
  if (completedCount === 0) return "not-completed"
  if (completedCount === services.length) return "completed"
  return "partially-completed"
}
