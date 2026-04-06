import { Mulish } from "next/font/google"
import { TreatmentPlanPage } from "@/components/dental/plan/TreatmentPlanPage"

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata = {
  title: "Dental Treatment Plan — TatvaPractice",
  description: "Manage dental treatment plans, estimates, progress and completion.",
}

export default function TreatmentPlanRoute() {
  return (
    <div className={mulish.variable}>
      <TreatmentPlanPage />
    </div>
  )
}
