import { Suspense } from "react"
import { EndVisitPage } from "@/components/tp-rxpad/EndVisitPage"

export const metadata = {
  title: "End Visit — TatvaPractice",
  description: "End Visit screen with bill and Rx actions.",
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <EndVisitPage />
    </Suspense>
  )
}

