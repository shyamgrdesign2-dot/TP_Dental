"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowDown2, DocumentDownload, Edit2, LanguageSquare, Printer, ReceiptText, Setting2, User } from "iconsax-reactjs"
import { ChevronRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TPSnackbar } from "@/components/tp-ui"
import svgPaths from "@/components/tp-rxpad/imports/svg-gb0jbe9ifm"

const RX_PREVIEW_IMAGE = "https://www.figma.com/api/mcp/asset/959a3623-63f1-4a6f-ae03-324d9f5a4af3"

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

  useEffect(() => {
    const snackbarType = searchParams?.get("snackbar")
    if (snackbarType !== "visit-ended") return
    setSnackbarMessage("Visit ended successfully")
    const params = new URLSearchParams(searchParams?.toString() ?? "")
    params.delete("snackbar")
    const next = params.toString()
    router.replace(next ? `/rxpad/end-visit?${next}` : "/rxpad/end-visit")
  }, [router, searchParams])

  const patient = useMemo(
    () => ({
      name: "Shyam GR",
      gender: "M",
      age: "25y",
    }),
    [],
  )

  const downloadRx = async () => {
    try {
      const res = await fetch(RX_PREVIEW_IMAGE)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "digital-rx-preview.png"
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {
      window.open(RX_PREVIEW_IMAGE, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="min-h-screen bg-tp-slate-100">
      <header className="h-[62px] border-b border-tp-slate-100/70 bg-white px-[16px]">
        <div className="mx-auto flex h-full w-full items-center justify-between">
          <div className="inline-flex items-center gap-[6px]">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-tp-slate-100">
              <User size={24} variant="Bulk" color="var(--tp-slate-600)" />
            </div>
            <div>
              <p className="font-sans text-[14px] font-semibold text-tp-slate-700">{patient.name}</p>
              <p className="font-sans text-[12px] text-tp-slate-600">{patient.gender} | {patient.age}</p>
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
            <div className="h-[42px] w-px bg-tp-slate-200/60" />

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
            <ActionTile label="Edit Digital Rx" icon={<Edit2 size={20} variant="Linear" />} onClick={() => router.push(`/rxpad?patientId=${patientId}`)} />
          </div>
        </aside>

        <section className="relative flex-1 overflow-auto bg-tp-slate-100 p-[24px]">
          <div className="mx-auto w-full max-w-[590px] rounded-[16px] shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
            <img
              src={RX_PREVIEW_IMAGE}
              alt="Digital Rx preview"
              className="block h-auto w-full rounded-[16px] object-cover"
            />
          </div>
          <div className="absolute right-[22px] top-[32px] h-[146px] w-px bg-tp-slate-300/70" />
        </section>
      </main>

      <TPSnackbar
        open={Boolean(snackbarMessage)}
        message={snackbarMessage ?? ""}
        severity="success"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1800}
        onClose={(_, reason) => {
          if (reason === "clickaway") return
          setSnackbarMessage(null)
        }}
      />
    </div>
  )
}

