"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Slide from "@mui/material/Slide"
import { ArrowDown2, DocumentDownload, Edit2, LanguageSquare, Printer, ReceiptText, Setting2, User } from "iconsax-reactjs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RxPreviewDocument } from "@/components/tp-rxpad/RxPreviewDocument"
import { getComposedRxPreviewSnapshot } from "@/components/tp-rxpad/rx-preview-composer"
import type { RxPreviewComposedSnapshot } from "@/components/tp-rxpad/rx-preview-store"
import { TPSnackbar } from "@/components/tp-ui"
import svgPaths from "@/components/tp-rxpad/imports/svg-gb0jbe9ifm"

const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam"]

function ActionTile({
  label,
  icon,
  onClick,
}: {
  label: string
  icon: ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-[10px] border border-tp-blue-500 bg-white px-[16px] py-[8px] text-left transition-colors hover:bg-tp-blue-50/40"
    >
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-[6px]">
          <span className="text-tp-blue-500">{icon}</span>
          <span className="font-sans text-[14px] font-semibold text-tp-blue-500">{label}</span>
        </div>
        <ChevronRight size={18} className="text-tp-blue-500" />
      </div>
    </button>
  )
}

export function EndVisitPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams?.get("patientId") ?? "apt-1"
  const [language, setLanguage] = useState("English")
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [isEditConfirmOpen, setIsEditConfirmOpen] = useState(false)
  const [previewSnapshot, setPreviewSnapshot] = useState<RxPreviewComposedSnapshot | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const snackbarType = searchParams?.get("snackbar")
    const pendingKey = "tp.snackbar.end-visit"
    if (snackbarType === "visit-ended") {
      window.sessionStorage.setItem(pendingKey, "1")
      const params = new URLSearchParams(searchParams?.toString() ?? "")
      params.delete("snackbar")
      const next = params.toString()
      router.replace(next ? `/rxpad/end-visit?${next}` : "/rxpad/end-visit")
      return
    }
    if (window.sessionStorage.getItem(pendingKey) === "1") {
      window.sessionStorage.removeItem(pendingKey)
      setSnackbarMessage("Visit ended successfully")
      setSnackbarOpen(true)
    }
  }, [router, searchParams])

  useEffect(() => {
    setPreviewSnapshot(getComposedRxPreviewSnapshot(patientId))
  }, [patientId])

  const openEditRxConfirm = () => {
    setIsEditConfirmOpen(true)
  }

  const handleConfirmEditRx = () => {
    setIsEditConfirmOpen(false)
    router.push(`/rxpad?patientId=${patientId}`)
  }

  const patient = useMemo(
    () => ({
      name: "Shyam GR",
      gender: "M",
      age: "25y",
    }),
    [],
  )

  const downloadRx = async () => {
    const lines: string[] = []
    lines.push("Digital Rx")
    lines.push("")
    if (previewSnapshot) {
      const pushSection = (title: string, rows: { title: string; metaParts: string[] }[]) => {
        if (!rows.length) return
        lines.push(title)
        rows.forEach((row) => {
          const suffix = row.metaParts.length ? ` (${row.metaParts.join(" | ")})` : ""
          lines.push(`- ${row.title}${suffix}`)
        })
        lines.push("")
      }
      if (previewSnapshot.vitals.length) {
        lines.push("Vitals")
        previewSnapshot.vitals.forEach((row) => lines.push(`- ${row.label} (${row.unit}): ${row.value}`))
        lines.push("")
      }
      pushSection("Symptoms", previewSnapshot.symptoms)
      pushSection("Examination", previewSnapshot.examinations)
      pushSection("Diagnosis", previewSnapshot.diagnoses)
      pushSection("Lab Investigation", previewSnapshot.labInvestigations)
      pushSection("Medication (Rx)", previewSnapshot.medications)
      pushSection("Advice", previewSnapshot.advice)
      if (previewSnapshot.labResults.length) {
        lines.push("Lab Results (Today)")
        previewSnapshot.labResults.forEach((row) => lines.push(`- ${row.label} ${row.unit}: ${row.value}`))
        lines.push("")
      }
      if (previewSnapshot.dentalExamination.length) {
        lines.push("Dental Examination")
        previewSnapshot.dentalExamination.forEach((block) => {
          lines.push(`- ${block.toothLabel}`)
          block.treatmentHistory.forEach((item) =>
            lines.push(`  - Treatment History: ${item.title}${item.metaParts.length ? ` (${item.metaParts.join(" | ")})` : ""}`),
          )
          block.findings.forEach((item) =>
            lines.push(`  - Findings: ${item.title}${item.metaParts.length ? ` (${item.metaParts.join(" | ")})` : ""}`),
          )
          block.procedures.forEach((item) =>
            lines.push(`  - Procedures: ${item.title}${item.metaParts.length ? ` (${item.metaParts.join(" | ")})` : ""}`),
          )
          if (block.overallToothNote) {
            lines.push(`  - Overall Tooth Notes: ${block.overallToothNote}`)
          }
        })
        lines.push("")
      }
      if (previewSnapshot.followUp) {
        lines.push(`Follow Up: ${previewSnapshot.followUp}`)
      }
      if (previewSnapshot.additionalNotes) {
        lines.push(`Additional Notes: ${previewSnapshot.additionalNotes}`)
      }
    } else {
      lines.push("No Rx data available yet.")
    }
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "digital-rx.txt"
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-tp-slate-100">
      <header className="h-[62px] border-b border-tp-slate-100/70 bg-white pr-[16px] pl-0">
        <div className="mx-auto flex h-full w-full items-center justify-between">
          <div className="inline-flex h-full items-center">
            <button
              aria-label="Go back"
              className="bg-white content-stretch flex h-[62px] items-center justify-center px-[15px] py-[20px] relative shrink-0 w-[80px] transition-colors hover:bg-tp-slate-50"
              data-name="Back Button"
              onClick={openEditRxConfirm}
              type="button"
            >
              <div aria-hidden="true" className="absolute border-[#f1f1f5] border-r-[0.5px] border-solid inset-[0_-0.25px_0_0] pointer-events-none" />
              <div className="relative shrink-0 size-[24px]" data-name="Back Arrow">
                <ChevronLeft color="#454551" size={24} strokeWidth={2} style={{ opacity: 0.7 }} />
              </div>
            </button>

            <div className="inline-flex items-center gap-[6px] pl-[12px]">
              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-tp-slate-100">
                <User size={24} variant="Bulk" color="var(--tp-slate-600)" />
              </div>
              <div>
                <p className="font-sans text-[14px] font-semibold text-tp-slate-700">{patient.name}</p>
                <p className="font-sans text-[12px] text-tp-slate-600">{patient.gender} | {patient.age}</p>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-[14px]">
            <button
              type="button"
              aria-label="Tutorial"
              className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[10.5px] text-[#8A4DBB] hover:bg-tp-slate-50"
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
            <div className="bg-gradient-to-b from-[rgba(208,213,221,0.2)] h-[42px] opacity-80 shrink-0 to-[rgba(208,213,221,0.2)] via-1/2 via-[#d0d5dd] w-[1.05px]" />

            <button
              type="button"
              className="inline-flex h-[42px] items-center gap-[6px] rounded-[10.5px] bg-tp-slate-100 px-[12px] text-tp-slate-700 transition-colors hover:bg-tp-slate-200/80"
            >
              <Setting2 size={20} variant="Linear" />
              <span className="font-sans text-[14px] font-semibold">Print Settings</span>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-[42px] items-center gap-[6px] rounded-[10.5px] bg-tp-slate-100 px-[12px] text-tp-slate-700 transition-colors hover:bg-tp-slate-200/80"
                >
                  <LanguageSquare size={20} variant="Linear" />
                  <span className="font-sans text-[14px] font-semibold">{language}</span>
                  <ArrowDown2 size={18} variant="Linear" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[170px] rounded-[10px] border border-tp-slate-100/70 bg-white p-1">
                {LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className="rounded-[8px] focus:bg-tp-slate-100 data-[highlighted]:bg-tp-slate-100"
                  >
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              type="button"
              onClick={() => router.push("/appointments?snackbar=appointment-completed")}
              className="inline-flex h-[42px] min-w-[100px] items-center justify-center rounded-[10.5px] bg-tp-blue-600 px-[12px] font-sans text-[14px] font-semibold text-white hover:bg-tp-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      </header>

      <main className="flex h-[calc(100vh-62px)] w-full overflow-hidden">
        <aside className="w-[300px] shrink-0 bg-white p-[18px]">
          <div className="flex flex-col gap-[20px]">
            <ActionTile label="Create Bill" icon={<ReceiptText size={20} variant="Linear" />} />
            <ActionTile label="Print Digital Rx" icon={<Printer size={20} variant="Linear" />} onClick={() => window.print()} />
            <ActionTile label="Download Digital Rx" icon={<DocumentDownload size={20} variant="Linear" />} onClick={downloadRx} />
            <ActionTile label="Edit Digital Rx" icon={<Edit2 size={20} variant="Linear" />} onClick={openEditRxConfirm} />
          </div>
        </aside>

        <section className="relative flex-1 overflow-auto bg-tp-slate-100 p-[24px]">
          <RxPreviewDocument snapshot={previewSnapshot} />
        </section>
      </main>

      <AlertDialog open={isEditConfirmOpen} onOpenChange={setIsEditConfirmOpen}>
        <AlertDialogContent className="max-w-[420px] rounded-[16px] p-[24px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-sans text-[18px] font-semibold text-tp-slate-900">
              Edit Digital Rx?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-sans text-[14px] leading-[1.5] text-tp-slate-600">
              Are you sure you want to edit this Rx? You will be taken back to the Rx page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-[18px] flex gap-[10px]">
            <AlertDialogCancel className="min-w-[100px] h-[40px] rounded-[10px] border border-tp-blue-500 bg-white px-4 font-sans text-[13px] font-semibold text-tp-blue-500 transition-colors hover:border-tp-blue-500 hover:bg-tp-blue-50/40 hover:text-tp-blue-500">
              No, Stay Here
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmEditRx}
              className="min-w-[100px] h-[40px] rounded-[10px] bg-tp-blue-600 px-4 font-sans text-[13px] font-semibold text-white hover:bg-tp-blue-700"
            >
              Yes, Edit Rx
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TPSnackbar
        open={snackbarOpen}
        message={snackbarMessage ?? ""}
        severity="success"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "down" }}
        autoHideDuration={1800}
        onClose={(_, reason) => {
          if (reason === "clickaway") return
          setSnackbarOpen(false)
          setSnackbarMessage(null)
        }}
      />
    </div>
  )
}

