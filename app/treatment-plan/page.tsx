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
      <div style={{ animation: "pageSlideInRight 400ms cubic-bezier(0.16, 1, 0.3, 1) both" }}>
        <style>{`
          @keyframes pageSlideInRight {
            from { opacity: 0; transform: translateX(100px); }
            to   { opacity: 1; transform: translateX(0); }
          }
        `}</style>
        <TreatmentPlanPage />
      </div>
    </div>
  )
}
