import { Mulish } from "next/font/google"
import { PatientDetailPage } from "@/components/patient-detail/PatientDetailPage"

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata = {
  title: "Patient Detail — TatvaPractice",
  description: "View patient visit history, prescriptions, medical records, and dental treatment plans.",
}

export default function PatientDetailRoute() {
  return (
    <div className={mulish.variable}>
      <PatientDetailPage />
    </div>
  )
}
