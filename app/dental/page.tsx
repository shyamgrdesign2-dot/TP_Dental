import { Suspense } from "react"
import { DentalModuleShell } from "@/components/dental/DentalModuleShell"

export const metadata = {
  title: "Dental Module — TatvaPractice",
  description: "Tooth-wise examination + treatment planning.",
}

export default function DentalPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-tp-slate-500">Loading…</div>}>
      <DentalModuleShell />
    </Suspense>
  )
}
