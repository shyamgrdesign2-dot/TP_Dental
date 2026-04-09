"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowDown2,
  Calendar2,
  CallCalling,
  Card,
  ClipboardText,
  DocumentSketch,
  Edit2,
  Eye,
  Grid5,
  Ram,
  Setting2,
  User,
} from "iconsax-reactjs"
import { ChevronLeft, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TPDrawer, TPDrawerContent } from "@/components/tp-ui/tp-drawer"
import { TPSplitButton } from "@/components/tp-ui/button-system"
import { RxPreviewDocument } from "@/components/tp-rxpad/RxPreviewDocument"
import { getComposedRxPreviewSnapshot } from "@/components/tp-rxpad/rx-preview-composer"
import type { RxPreviewComposedSnapshot } from "@/components/tp-rxpad/rx-preview-store"
import svgPaths from "./svg-gb0jbe9ifm";

type RxpadHeaderProps = {
  className?: string
  onBack?: () => void
}

export default function RxpadHeader({ className, onBack }: RxpadHeaderProps) {
  const router = useRouter()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewSnapshot, setPreviewSnapshot] = useState<RxPreviewComposedSnapshot | null>(null)

  const getCurrentPatientId = () => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
    return params.get("patientId") ?? "apt-1"
  }

  useEffect(() => {
    if (!isPreviewOpen) return
    setPreviewSnapshot(getComposedRxPreviewSnapshot(getCurrentPatientId()))
  }, [isPreviewOpen])

  const openEndVisit = () => {
    const pid = getCurrentPatientId()
    router.push(`/rxpad/end-visit?patientId=${pid}&snackbar=visit-ended`)
  }

  return (
    <div className={`bg-white relative h-[62px] w-full overflow-x-auto ${className ?? ""}`} data-name="Rxpad_Header">
      <div className="flex h-full min-w-[980px] w-full flex-row items-center">
        <div className="content-stretch flex items-center justify-between pr-[16px] py-[10px] relative size-full max-xl:pr-[10px]">
          <div className="content-stretch flex min-w-0 items-center gap-[16px] relative max-xl:gap-[10px]">
            <button
              aria-label="Go back"
              className="bg-white content-stretch flex h-[62px] items-center justify-center px-[15px] py-[20px] relative shrink-0 w-[80px] transition-colors hover:bg-tp-slate-50"
              data-name="Back Button"
              onClick={onBack}
              type="button"
            >
              <div aria-hidden="true" className="absolute border-[#f1f1f5] border-r-[0.5px] border-solid inset-[0_-0.25px_0_0] pointer-events-none" />
              <div className="relative shrink-0 size-[24px]" data-name="Back Arrow">
                <ChevronLeft color="#454551" size={24} strokeWidth={2} style={{ opacity: 0.7 }} />
              </div>
            </button>
            <div className="content-stretch flex items-center min-h-px min-w-0 relative" data-name="User Info">
              <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="content-stretch flex gap-[6px] items-center relative shrink-0 min-w-0 max-w-[200px] rounded-[10px] px-1 py-0.5 text-left transition-colors hover:bg-tp-slate-50"
                    data-name="Container"
                  >
                    <div className="bg-[#f1f1f5] relative rounded-[1250px] shrink-0 size-[40px]" data-name="Profile Image">
                      <div className="absolute left-[8.57px] size-[22.857px] top-[8.57px]" data-name="User">
                        <User color="#545460" size={22.857} variant="Bulk" />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative shrink-0 min-w-0 w-[200px] max-w-[200px]" data-name="User Details">
                      <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Header">
                        <p className="font-['Inter',sans-serif] font-semibold leading-[normal] max-w-[150px] min-w-0 truncate not-italic relative shrink text-tp-slate-700 text-[14px]">
                          Shyam GR
                        </p>
                        <div className="relative shrink-0 size-[18px]" data-name="Dropdown Icon">
                          <ArrowDown2
                            color="var(--tp-slate-700)"
                            size={20}
                            strokeWidth={2}
                            variant="Linear"
                            className={`transition-transform duration-150 ${isProfileOpen ? "rotate-180" : ""}`}
                          />
                        </div>
                      </div>
                      <div
                        className="content-stretch flex items-start leading-[18px] relative shrink-0 text-[12px] tracking-[0.1px] w-full font-['Inter',sans-serif] font-medium text-tp-slate-600"
                        data-name="Age & gender"
                      >
                        <p className="relative shrink-0 whitespace-nowrap">Male</p>
                        <p className="relative shrink-0 text-tp-slate-300 text-center w-[8px]">|</p>
                        <p className="relative shrink-0 whitespace-nowrap">25y</p>
                      </div>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={6}
                  className="relative z-[120] w-[320px] rounded-[22px] border border-tp-slate-100 bg-white p-4 shadow-[0_14px_28px_rgba(15,23,42,0.14)]"
                >
                  <div className="pointer-events-none absolute -top-[11px] left-[94px] h-0 w-0 border-b-[11px] border-l-[11px] border-r-[11px] border-b-tp-slate-100 border-l-transparent border-r-transparent" />
                  <div className="pointer-events-none absolute -top-[10px] left-[95px] h-0 w-0 border-b-[10px] border-l-[10px] border-r-[10px] border-b-white border-l-transparent border-r-transparent" />
                  <div className="space-y-4">
                    {[
                      { key: "patient-id", label: "Patient ID", value: "PAT0061", icon: <Card color="var(--tp-violet-500)" size={18} strokeWidth={1.5} variant="Linear" /> },
                      { key: "mobile", label: "Mobile Number", value: "9567933357", icon: <CallCalling color="var(--tp-violet-500)" size={18} strokeWidth={1.5} variant="Linear" /> },
                      { key: "dob", label: "DOB", value: "24 Jul 2000", icon: <Calendar2 color="var(--tp-violet-500)" size={18} strokeWidth={1.5} variant="Linear" /> },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center gap-3.5">
                        <div className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full bg-tp-violet-50">{item.icon}</div>
                        <div className="min-w-0">
                          <p className="font-['Inter',sans-serif] text-[14px] leading-[20px] font-medium text-tp-slate-600">{item.label}</p>
                          <p className="font-['Inter',sans-serif] text-[16px] leading-[22px] font-semibold text-tp-slate-700">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 space-y-3">
                    <button
                      type="button"
                      className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[14px] border border-tp-blue-200 bg-white px-4 text-tp-blue-500 hover:bg-tp-blue-50/40"
                    >
                      <Edit2 color="currentColor" size={20} strokeWidth={1.5} variant="Linear" />
                      <span className="font-['Inter',sans-serif] text-[16px] leading-[20px] font-semibold">Edit Profile</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false)
                        // Navigate to patient detail page; use patientId from URL if available
                        const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
                        const pid = params.get("patientId") ?? "apt-1"
                        router.push(`/patient-detail?patientId=${pid}&from=rxpad`)
                      }}
                      className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[14px] border border-tp-blue-200 bg-white px-4 text-tp-blue-500 hover:bg-tp-blue-50/40"
                    >
                      <ClipboardText color="currentColor" size={20} strokeWidth={1.5} variant="Linear" />
                      <span className="font-['Inter',sans-serif] text-[16px] leading-[20px] font-semibold">Visit Summary</span>
                    </button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="content-stretch flex gap-[14px] items-center relative shrink-0 ml-4 max-xl:gap-[10px]" data-name="Toolbar">
            <button
              type="button"
              aria-label="Tutorial"
              className="relative inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10.5px] transition-colors hover:bg-tp-slate-50"
              data-name="Tutorial"
            >
              <svg className="block h-[42px] w-[42px]" fill="none" preserveAspectRatio="none" viewBox="0 0 42 42">
                <g id="Tutorial">
                  <g id="Union" opacity="0.8">
                    <path clipRule="evenodd" d={svgPaths.p3172ac80} fill="var(--fill-0, #8A4DBB)" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p2ee5cec0} fill="var(--fill-0, #8A4DBB)" fillRule="evenodd" />
                  </g>
                </g>
              </svg>
            </button>
            <div className="bg-gradient-to-b from-[rgba(208,213,221,0.2)] h-[42px] opacity-80 shrink-0 to-[rgba(208,213,221,0.2)] via-1/2 via-[#d0d5dd] w-[1.05px]" data-name="Divider" />
            <button
              type="button"
              aria-label="Template"
              className="bg-[#f1f1f5] content-stretch flex h-[42px] items-center justify-center p-[8.4px] relative rounded-[10.5px] shrink-0 transition-colors hover:bg-[#e9e9ef]"
              data-name="Template"
            >
              <Grid5 color="#454551" size={24} strokeWidth={1.5} variant="Linear" />
            </button>
            <button
              type="button"
              aria-label="Save"
              className="bg-[#f1f1f5] content-stretch flex h-[42px] items-center justify-center p-[8.4px] relative rounded-[10.5px] shrink-0 transition-colors hover:bg-[#e9e9ef]"
              data-name="Save"
            >
              <Ram color="#454551" size={24} strokeWidth={1.5} variant="Linear" />
            </button>
            <button
              type="button"
              aria-label="Customisation"
              className="bg-[rgba(233,233,239,1)] content-stretch flex h-[42px] items-center justify-center p-[8.4px] relative rounded-[10.5px] shrink-0 transition-colors hover:bg-[#e9e9ef]"
              data-name="Customisation"
            >
              <Setting2 color="#454551" size={24} strokeWidth={1.5} variant="Linear" />
            </button>
            <div className="bg-gradient-to-b from-[rgba(208,213,221,0.2)] h-[42px] opacity-80 shrink-0 to-[rgba(208,213,221,0.2)] via-1/2 via-[#d0d5dd] w-[1.05px]" data-name="Divider" />
            <button
              type="button"
              aria-label="Preview"
              onClick={() => setIsPreviewOpen(true)}
              className="bg-white border border-tp-blue-500 content-stretch flex gap-[6.3px] items-center justify-center px-[16px] py-[8px] relative rounded-[10.5px] shrink-0 transition-colors hover:bg-tp-blue-50/40"
              data-name="Preview"
            >
              <Eye color="var(--tp-blue-500)" size={24} strokeWidth={1.5} variant="Linear" />
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-tp-blue-500 text-[14.7px] text-center whitespace-nowrap">Preview</p>
            </button>
            {/* Primary action: End Visit (split) → dropdown also offers Save as Draft */}
            <TPSplitButton
              primaryAction={{
                label: "End Visit",
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8.9 7.56c.31-3.6 2.16-5.07 6.21-5.07h.13c4.47 0 6.26 1.79 6.26 6.26v6.52c0 4.47-1.79 6.26-6.26 6.26h-.13c-4.02 0-5.87-1.45-6.2-4.99" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 12h12.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12.65 8.65L16 12l-3.35 3.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                onClick: openEndVisit,
              }}
              secondaryActions={[
                { id: "end-visit", label: "End Visit", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M8.9 7.56c.31-3.6 2.16-5.07 6.21-5.07h.13c4.47 0 6.26 1.79 6.26 6.26v6.52c0 4.47-1.79 6.26-6.26 6.26h-.13c-4.02 0-5.87-1.45-6.2-4.99" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 12h12.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12.65 8.65L16 12l-3.35 3.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>, onClick: openEndVisit },
                { id: "draft", label: "Save as Draft", icon: <DocumentSketch color="currentColor" size={14} variant="Linear" />, onClick: () => {} },
              ]}
              variant="solid"
              theme="primary"
              size="md"
            />
            <button
              type="button"
              aria-label="More options"
              className="flex items-center justify-center relative shrink-0 size-[25.2px] rounded-[8px] transition-colors hover:bg-tp-slate-100"
              style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as React.CSSProperties}
            >
              <MoreVertical color="#454551" size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px bg-tp-slate-100 pointer-events-none" />

      <TPDrawer open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <TPDrawerContent side="right" size="xl" className="!rounded-none !sm:max-w-[min(90vw,760px)] !p-0 !bg-tp-slate-100">
          <div className="shrink-0 flex items-center border-b border-tp-slate-100/70 px-4 gap-0 h-[56px] bg-white">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="flex items-center justify-center transition-opacity hover:opacity-70 shrink-0"
              aria-label="Close preview"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--tp-slate-700)" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z"/>
              </svg>
            </button>
            <div className="w-px self-stretch bg-tp-slate-200/60 mx-3 shrink-0" />
            <h2 className="text-[16px] font-semibold text-tp-slate-900 flex-1 min-w-0 truncate">Preview Rx</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <RxPreviewDocument snapshot={previewSnapshot} />
          </div>
        </TPDrawerContent>
      </TPDrawer>
    </div>
  );
}
