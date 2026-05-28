"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import clsx from "clsx"
import {
  ArrowDown2,
  Calendar2,
  CallCalling,
  Card,
  DocumentSketch,
  DocumentText,
  Edit2,
  Eye,
  Grid5,
  Ram,
  Setting2,
  User,
} from "iconsax-reactjs"
import { ChevronLeft, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { TPDrawer, TPDrawerContent } from "@/components/tp-ui/tp-drawer"
import { TPSplitButton } from "@/components/tp-ui/button-system"
import { RxPreviewDocument } from "@/components/tp-rxpad/RxPreviewDocument"
import { getComposedRxPreviewSnapshot } from "@/components/tp-rxpad/rx-preview-composer"
import { hasHistoricalData } from "@/components/dental/examination/DentalChartPrint"
import svgPaths from "./svg-gb0jbe9ifm"
import styles from "./RxpadHeader.module.scss"
import { getAppointmentPatient } from "@/lib/appointment-patients"
import { pushPlanConsultationFromRxPage } from "@/lib/plan-consultation-queue"

function buildProfileFields(patientId) {
  const p = getAppointmentPatient(patientId)
  return [
    {
      key: "patient-id",
      label: "Patient ID",
      value: p.patientCode,
      icon: <Card color="var(--tp-violet-500)" size={18} strokeWidth={1.5} variant="Linear" />,
    },
    {
      key: "mobile",
      label: "Mobile Number",
      value: p.mobile.replace(/^\+91-/, ""),
      icon: <CallCalling color="var(--tp-violet-500)" size={18} strokeWidth={1.5} variant="Linear" />,
    },
    {
      key: "dob",
      label: "DOB",
      value: p.dob,
      icon: <Calendar2 color="var(--tp-violet-500)" size={18} strokeWidth={1.5} variant="Linear" />,
    },
  ]
}

function EndVisitIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M8.9 7.56c.31-3.6 2.16-5.07 6.21-5.07h.13c4.47 0 6.26 1.79 6.26 6.26v6.52c0 4.47-1.79 6.26-6.26 6.26h-.13c-4.02 0-5.87-1.45-6.2-4.99"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 12h12.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12.65 8.65L16 12l-3.35 3.35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function RxpadHeader({ className, onBack, patientId: patientIdProp }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const ctxTreatment = searchParams?.get("ctxTreatment")?.trim() ?? ""
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewSnapshot, setPreviewSnapshot] = useState(null)
  // Inline Preview-Rx settings — toggled via the gear icon in the drawer header.
  const [previewSettings, setPreviewSettings] = useState({ view: "list", showDentalChart: true, includeHistorical: false })
  const [isPreviewSettingsOpen, setIsPreviewSettingsOpen] = useState(false)

  const getCurrentPatientId = () => {
    if (patientIdProp) return patientIdProp
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
    return params.get("patientId") ?? "apt-1"
  }

  const headerPatient = getAppointmentPatient(getCurrentPatientId())
  const profileFields = buildProfileFields(getCurrentPatientId())

  useEffect(() => {
    if (!isPreviewOpen) return
    setPreviewSnapshot(getComposedRxPreviewSnapshot(getCurrentPatientId()))
  }, [isPreviewOpen])

  const openEndVisit = () => {
    const pid = getCurrentPatientId()
    pushPlanConsultationFromRxPage(pid)
    // Mark this patient as having a completed visit so the dental exam shows the
    // save/collapse controls on the NEXT (return) visit.
    try { if (typeof window !== "undefined") window.localStorage.setItem(`dental.exam.visited.${pid}`, "1") } catch {}
    const src = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
    const next = new URLSearchParams()
    next.set("patientId", pid)
    next.set("snackbar", "visit-ended")
    const planId = src.get("planId")
    const serviceId = src.get("serviceId")
    const appointmentId = src.get("appointmentId")
    const returnTo = src.get("returnTo")
    const ctx = src.get("ctxTreatment")
    if (planId) next.set("planId", planId)
    if (serviceId) next.set("serviceId", serviceId)
    if (appointmentId) next.set("appointmentId", appointmentId)
    if (returnTo) next.set("returnTo", returnTo)
    if (ctx) next.set("ctxTreatment", ctx)
    router.push(`/rxpad/end-visit?${next.toString()}`)
  }

  return (
    <div className={clsx(styles.root, className)} data-name="Rxpad_Header">
      <div className={styles.innerRow}>
        <div className={styles.bar}>
          <div className={styles.leftCluster}>
            <button
              aria-label="Go back"
              className={styles.backBtn}
              data-name="Back Button"
              onClick={onBack}
              type="button"
            >
              <div className={styles.backBtnBorder} aria-hidden />
              <div className={styles.backIconWrap} data-name="Back Arrow">
                <ChevronLeft color="#454551" size={24} strokeWidth={2} style={{ opacity: 0.7 }} />
              </div>
            </button>

            <div className={styles.userInfoWrap} data-name="User Info">
              <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <DropdownMenuTrigger asChild>
                  <button type="button" className={styles.profileTrigger} data-name="Container">
                    <div className={styles.avatarRing} data-name="Profile Image">
                      <div className={styles.avatarIcon} data-name="User">
                        <User color="var(--tp-slate-500)" size={22.857} variant="Bulk" />
                      </div>
                    </div>
                    <div className={styles.userTextCol} data-name="User Details">
                      <div className={styles.nameRow} data-name="Header">
                        <p className={styles.patientName}>{headerPatient.name}</p>
                        <div
                          className={clsx(styles.chevronWrap, styles.chevronSpin, isProfileOpen && styles.chevronSpinOpen)}
                          data-name="Dropdown Icon"
                        >
                          <ArrowDown2 color="var(--tp-slate-700)" size={20} strokeWidth={2} variant="Linear" />
                        </div>
                        {ctxTreatment ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className={styles.planProcedureChip} tabIndex={0}>
                                {ctxTreatment}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent
                              side="bottom"
                              sideOffset={8}
                              className={styles.planProcedureTooltip}
                              arrowClassName="bg-white fill-white"
                            >
                              <div className={styles.planProcedureTooltipTitle}>Plan Context</div>
                              <p className={styles.planProcedureTooltipSummary}>{ctxTreatment}</p>
                              <ul className={styles.planProcedureTooltipList}>
                                <li>This Rx session is linked to this treatment line.</li>
                                <li>Use End Visit to attach notes back to the treatment plan.</li>
                              </ul>
                            </TooltipContent>
                          </Tooltip>
                        ) : null}
                      </div>
                      <div className={styles.metaRow} data-name="Age & gender">
                        <p className={styles.metaItem}>{headerPatient.genderShort}</p>
                        <p className={styles.metaSep} aria-hidden>
                          ·
                        </p>
                        <p className={styles.metaItem}>{`${headerPatient.age}Y`}</p>
                      </div>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" sideOffset={6} className={styles.menuContent}>
                  <div className={styles.menuArrowOuter} />
                  <div className={styles.menuArrowInner} />
                  <div className={styles.menuFields}>
                    {profileFields.map((item) => (
                      <div key={item.key} className={styles.menuFieldRow}>
                        <div className={styles.menuIconCircle}>{item.icon}</div>
                        <div className={styles.menuFieldText}>
                          <p className={styles.menuLabel}>{item.label}</p>
                          <p className={styles.menuValue}>{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.menuActions}>
                    <button
                      type="button"
                      className={styles.menuActionBtn}
                      onClick={() => {
                        setIsProfileOpen(false)
                        const pid = getCurrentPatientId()
                        const qs = new URLSearchParams()
                        if (pid) qs.set("patientId", pid)
                        const suffix = qs.toString() ? `?${qs.toString()}` : ""
                        router.push(`/patient-detail${suffix}`)
                      }}
                    >
                      <DocumentText color="currentColor" size={20} strokeWidth={1.5} variant="Linear" />
                      <span className={styles.menuActionLabel}>View patient summary</span>
                    </button>
                    <button
                      type="button"
                      className={styles.menuActionBtn}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Edit2 color="currentColor" size={20} strokeWidth={1.5} variant="Linear" />
                      <span className={styles.menuActionLabel}>Edit patient details</span>
                    </button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className={styles.toolbar} data-name="Toolbar">
            <button type="button" aria-label="Tutorial" className={styles.iconBtn} data-name="Tutorial">
              <svg className={styles.tutorialSvg} fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
                <g id="Tutorial">
                  <g id="Union" opacity="0.8">
                    <path
                      clipRule="evenodd"
                      d={svgPaths.p3172ac80}
                      fill="var(--fill-0, #8A4DBB)"
                      fillRule="evenodd"
                    />
                    <path
                      clipRule="evenodd"
                      d={svgPaths.p2ee5cec0}
                      fill="var(--fill-0, #8A4DBB)"
                      fillRule="evenodd"
                    />
                  </g>
                </g>
              </svg>
            </button>
            <div className={styles.toolbarDivider} data-name="Divider" aria-hidden />
            <button type="button" aria-label="Template" className={styles.toolGrey} data-name="Template">
              <Grid5 color="#454551" size={24} strokeWidth={1.5} variant="Linear" />
            </button>
            <button type="button" aria-label="Save" className={styles.toolGrey} data-name="Save">
              <Ram color="#454551" size={24} strokeWidth={1.5} variant="Linear" />
            </button>
            <button type="button" aria-label="Customisation" className={styles.toolGreyAlt} data-name="Customisation">
              <Setting2 color="#454551" size={24} strokeWidth={1.5} variant="Linear" />
            </button>
            <div className={styles.toolbarDivider} data-name="Divider" aria-hidden />
            <button
              type="button"
              aria-label="Preview"
              onClick={() => setIsPreviewOpen(true)}
              className={styles.previewBtn}
              data-name="Preview"
            >
              <Eye color="var(--tp-blue-500)" size={24} strokeWidth={1.5} variant="Linear" />
              <p className={styles.previewLabel}>Preview</p>
            </button>
            <TPSplitButton
              primaryAction={{
                label: "End Visit",
                icon: <EndVisitIcon size={24} />,
                onClick: openEndVisit,
              }}
              secondaryActions={[
                {
                  id: "end-visit",
                  label: "End Visit",
                  icon: <EndVisitIcon size={14} />,
                  onClick: openEndVisit,
                },
                {
                  id: "draft",
                  label: "Save as Draft",
                  icon: <DocumentSketch color="currentColor" size={14} variant="Linear" />,
                  onClick: () => {},
                },
              ]}
              variant="solid"
              theme="primary"
              size="md"
            />
            <button
              type="button"
              aria-label="More options"
              className={styles.moreBtn}
              style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" }}
            >
              <MoreVertical color="#454551" size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.bottomRule} aria-hidden />
      <TPDrawer open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <TPDrawerContent side="right" size="xl" className={styles.drawerContent}>
          <div className={styles.drawerHeader} style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className={styles.drawerClose}
              aria-label="Close preview"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--tp-slate-700)" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" />
              </svg>
            </button>
            <div className={styles.drawerDivider} aria-hidden />
            <h2 className={styles.drawerTitle}>Preview Rx</h2>
            {/* Settings gear at the far right of the header — opens a small popover
                with toggles for chart visibility + historical-data inclusion. */}
            {/* Match the topbar `.toolGreyAlt` treatment so every settings/gear
                affordance in the Rx surface reads identically (grey square,
                no border). Layered margin-left:auto pushes it to the far right
                of the drawer header. */}
            <button
              type="button"
              aria-label="Preview settings"
              onClick={() => setIsPreviewSettingsOpen((o) => !o)}
              className={styles.toolGreyAlt}
              style={{ marginLeft: "auto", color: isPreviewSettingsOpen ? "var(--tp-blue-500)" : "var(--tp-slate-700)", background: isPreviewSettingsOpen ? "#dcdce4" : undefined }}
            >
              <Setting2 size={20} variant={isPreviewSettingsOpen ? "Bold" : "Linear"} />
            </button>
            {isPreviewSettingsOpen ? (
              <>
                <div
                  onClick={() => setIsPreviewSettingsOpen(false)}
                  style={{ position: "fixed", inset: 0, zIndex: 40 }}
                  aria-hidden
                />
                <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 16, zIndex: 41, width: 300, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, boxShadow: "0 16px 40px rgba(2,6,23,0.20)", padding: 10, fontFamily: "Inter, sans-serif" }}>
                  <div style={{ padding: "4px 8px 8px", fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Preview options</div>
                  {[
                    { key: "showDentalChart", label: "Show dental chart", desc: "Include the odontogram in the preview." },
                    { key: "includeHistorical", label: "Include past dental & oral history", desc: "Adds tooth records and oral examination entries from previous visits, dated per tooth." },
                  ].map((opt) => {
                    const on = opt.key === "showDentalChart" ? previewSettings.showDentalChart !== false : previewSettings[opt.key] === true
                    // Gate the historical toggle off the same chart-store
                    // check the Print Dental Chart dropdown uses — a patient
                    // with no chart data sees a disabled toggle + tooltip.
                    const historyAvailable = opt.key !== "includeHistorical" || hasHistoricalData(patientId)
                    const disabled = !historyAvailable
                    const effectiveOn = disabled ? false : on
                    return (
                      <label
                        key={opt.key}
                        title={disabled ? "There is no past dental or oral history for this patient." : undefined}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 8px", borderRadius: 8, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.55 : 1 }}>
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#334155" }}>{opt.label}</span>
                          <span style={{ display: "block", fontSize: 12, color: "#94a3b8", marginTop: 1, lineHeight: 1.4 }}>{disabled ? "There is no past dental or oral history for this patient." : opt.desc}</span>
                        </span>
                        <span
                          onClick={(e) => { e.preventDefault(); if (!disabled) setPreviewSettings({ ...previewSettings, [opt.key]: !on }) }}
                          style={{ position: "relative", width: 40, height: 22, borderRadius: 999, background: effectiveOn ? "var(--tp-blue-500)" : "#cbd5e1", flexShrink: 0, cursor: disabled ? "not-allowed" : "pointer", transition: "background 0.15s", opacity: disabled ? 0.6 : 1 }}
                        >
                          <span style={{ position: "absolute", top: 2, left: effectiveOn ? 20 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.15s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                        </span>
                      </label>
                    )
                  })}
                </div>
              </>
            ) : null}
          </div>
          <div className={styles.drawerBody}>
            <RxPreviewDocument snapshot={previewSnapshot} settings={previewSettings} />
          </div>
        </TPDrawerContent>
      </TPDrawer>
    </div>
  )
}
