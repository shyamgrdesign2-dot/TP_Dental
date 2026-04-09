"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft2,
  ClipboardText,
  DocumentText,
  Folder,
  Receipt1,
  Health,
  Activity,
  Card,
  Calendar2,
  CallCalling,
  User,
} from "iconsax-reactjs"
import { TPMedicalIcon } from "@/components/tp-ui/medical-icons"
// TreatmentPlanTab removed — dental-plan now navigates to /treatment-plan page

// ─── Sidebar nav items ──────────────────────────────────────────────────────

type SidebarId =
  | "visit-summary"
  | "prescription"
  | "medical-records"
  | "add-bill"
  | "health-checkup"
  | "dental-plan"

interface SidebarItem {
  id: SidebarId
  label: string
  icon: React.ReactNode
}

function SideIcon({ name, active }: { name: string; active: boolean }) {
  return (
    <TPMedicalIcon
      name={name}
      variant={active ? "bulk" : "line"}
      size={20}
      color={active ? "var(--tp-blue-600)" : "var(--tp-slate-500)"}
    />
  )
}

// ─── Mock patient data ──────────────────────────────────────────────────────

const PATIENTS: Record<string, { name: string; gender: string; age: number; dob: string; mobile: string; patientId: string; bloodGroup: string }> = {
  "apt-1": { name: "Shyam GR", gender: "Male", age: 25, dob: "24 Jul 2000", mobile: "9567933357", patientId: "PAT0061", bloodGroup: "B+" },
  "apt-2": { name: "Riya Kapoor", gender: "Female", age: 32, dob: "12 Mar 1993", mobile: "9876543210", patientId: "PAT0062", bloodGroup: "A+" },
}

const PAST_VISITS = [
  {
    id: "v1",
    date: "19 Feb 2026, 17:02",
    doctor: "Dr. Sheela B R",
    specialty: "Paediatrics",
    clinic: "Apex Ortho Clinic",
    location: "Bengaluru, Karnataka",
    symptoms: "chest pain, heart burn",
    examinations: "Fever",
    diagnosis: "lung infection and blockage, body pain",
    consultation: "Follow-up",
  },
  {
    id: "v2",
    date: "10 Jan 2026, 11:00",
    doctor: "Dr. Shyam GR",
    specialty: "Dentistry",
    clinic: "Apex Ortho Clinic",
    location: "Bengaluru, Karnataka",
    symptoms: "tooth pain, sensitivity",
    examinations: "Oral cavity",
    diagnosis: "Caries tooth 16, scaling required",
    consultation: "New",
  },
]

// ─── Section content components ─────────────────────────────────────────────

function VisitSummaryContent({ patientId }: { patientId: string }) {
  const [selectedVisit, setSelectedVisit] = useState(0)

  return (
    <div className="flex h-full min-h-0 overflow-hidden gap-0">
      {/* Visit list */}
      <div className="w-[260px] shrink-0 border-r border-tp-slate-100 overflow-y-auto bg-white">
        <div className="p-[14px] border-b border-tp-slate-100">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.6px] text-tp-slate-500">
            Visit History
          </p>
        </div>
        {PAST_VISITS.map((v, i) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setSelectedVisit(i)}
            className={`w-full text-left px-[14px] py-[12px] border-b border-tp-slate-100 transition-colors ${
              selectedVisit === i ? "bg-tp-blue-50" : "hover:bg-tp-slate-50"
            }`}
          >
            <p className={`font-sans text-[12px] font-semibold truncate ${selectedVisit === i ? "text-tp-blue-700" : "text-tp-slate-800"}`}>
              {v.doctor}
            </p>
            <p className="font-sans text-[11px] text-tp-slate-500 mt-[1px]">{v.specialty}</p>
            <p className="font-sans text-[10px] text-tp-slate-400 mt-[2px]">{v.date}</p>
          </button>
        ))}
      </div>

      {/* Visit detail */}
      <div className="flex-1 overflow-y-auto bg-white p-[20px]">
        {PAST_VISITS[selectedVisit] && (
          <div>
            <div className="flex items-center justify-between mb-[16px]">
              <div>
                <h3 className="font-sans text-[16px] font-semibold text-tp-slate-900">
                  {PAST_VISITS[selectedVisit].doctor} | {PAST_VISITS[selectedVisit].specialty}
                </h3>
                <p className="font-sans text-[12px] text-tp-slate-500 mt-[2px]">
                  {PAST_VISITS[selectedVisit].date}
                </p>
              </div>
              <span className="inline-flex h-[24px] items-center rounded-[6px] bg-tp-slate-100 px-[10px] font-sans text-[10px] font-semibold text-tp-slate-600">
                {selectedVisit + 1} / {PAST_VISITS.length}
              </span>
            </div>

            <div className="rounded-[12px] border border-tp-slate-200 p-[16px] mb-[12px]">
              <div className="grid grid-cols-2 gap-y-[10px] gap-x-[16px] mb-[12px]">
                <div>
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 mb-[2px]">Clinic</p>
                  <p className="font-sans text-[12px] text-tp-blue-600 font-medium">{PAST_VISITS[selectedVisit].clinic}</p>
                  <p className="font-sans text-[11px] text-tp-slate-500">{PAST_VISITS[selectedVisit].location}</p>
                </div>
                <div>
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.5px] text-tp-slate-400 mb-[2px]">Doctor</p>
                  <p className="font-sans text-[12px] font-semibold text-tp-blue-600">{PAST_VISITS[selectedVisit].doctor}</p>
                  <p className="font-sans text-[11px] text-tp-slate-500">{PAST_VISITS[selectedVisit].specialty}</p>
                </div>
              </div>

              <div className="space-y-[8px]">
                <InfoRow label="Symptoms" value={PAST_VISITS[selectedVisit].symptoms} />
                <InfoRow label="Examinations" value={PAST_VISITS[selectedVisit].examinations} />
                <InfoRow label="Diagnosis" value={PAST_VISITS[selectedVisit].diagnosis} />
                <InfoRow label="Consultation" value={PAST_VISITS[selectedVisit].consultation} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-[8px]">
      <span className="font-sans text-[12px] font-semibold text-tp-slate-700 min-w-[120px]">{label}:</span>
      <span className="font-sans text-[12px] text-tp-slate-600">{value}</span>
    </div>
  )
}

function PrescriptionContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-[12px] text-tp-slate-400">
      <ClipboardText size={48} color="currentColor" variant="Bulk" />
      <p className="font-sans text-[14px] font-medium">Prescription records will appear here</p>
    </div>
  )
}

function MedicalRecordsContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-[12px] text-tp-slate-400">
      <Folder size={48} color="currentColor" variant="Bulk" />
      <p className="font-sans text-[14px] font-medium">Medical records will appear here</p>
    </div>
  )
}

function AddBillContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-[12px] text-tp-slate-400">
      <Receipt1 size={48} color="currentColor" variant="Bulk" />
      <p className="font-sans text-[14px] font-medium">Billing information will appear here</p>
    </div>
  )
}

function HealthCheckupContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-[12px] text-tp-slate-400">
      <Activity size={48} color="currentColor" variant="Bulk" />
      <p className="font-sans text-[14px] font-medium">Health checkup reports will appear here</p>
    </div>
  )
}

// ─── Main page ──────────────────────────────────────────────────────────────

function PatientDetailInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams?.get("patientId") ?? "apt-1"
  const fromPage = searchParams?.get("from") ?? "appointments"
  const [activeSection, setActiveSection] = useState<SidebarId>("visit-summary")

  const patient = PATIENTS[patientId] ?? PATIENTS["apt-1"]

  const sidebarItems: Array<{ id: SidebarId; label: string; medicalIcon?: string; icon?: React.ReactNode }> = [
    { id: "visit-summary",   label: "Visit Summary",         medicalIcon: "clipboard-activity" },
    { id: "prescription",    label: "Prescription",          medicalIcon: "medical-document" },
    { id: "medical-records", label: "Medical Records",       medicalIcon: "health-file-03" },
    { id: "add-bill",        label: "Add Bill/Payment",      medicalIcon: "medical-information" },
    { id: "health-checkup",  label: "Health Checkup Report", medicalIcon: "cardiogram" },
    { id: "dental-plan",     label: "Treatment Plan",        medicalIcon: "surgical-scissors-02" },
  ]

  const handleBack = () => {
    if (fromPage === "rxpad") {
      router.push(`/rxpad?patientId=${patientId}`)
    } else {
      router.push("/appointments")
    }
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-tp-slate-50">
      {/* Top header */}
      <header className="shrink-0 bg-white border-b border-tp-slate-100 shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
        <div className="flex h-[62px] items-center gap-[16px] px-[16px]">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex h-[36px] items-center gap-[6px] rounded-[10px] px-[12px] font-sans text-[13px] font-medium text-tp-slate-600 transition-colors hover:bg-tp-slate-100"
          >
            <ArrowLeft2 size={18} color="currentColor" variant="Linear" />
            Back
          </button>
          <div className="bg-gradient-to-b from-[rgba(208,213,221,0.2)] h-[42px] opacity-80 shrink-0 to-[rgba(208,213,221,0.2)] via-1/2 via-[#d0d5dd] w-[1.05px]" />
          <div className="flex items-center gap-[10px]">
            <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-tp-violet-100">
              <User size={20} color="var(--tp-violet-600)" variant="Bulk" />
            </div>
            <div>
              <p className="font-sans text-[14px] font-semibold text-tp-slate-900">{patient.name}</p>
              <p className="font-sans text-[11px] text-tp-slate-500">{patient.gender} · {patient.age}y · {patient.dob}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-[14px]">
            <div className="flex items-center gap-[6px]">
              <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-tp-slate-100">
                <CallCalling size={14} color="var(--tp-slate-500)" variant="Linear" />
              </div>
              <span className="font-sans text-[12px] text-tp-slate-600">{patient.mobile}</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-tp-slate-100">
                <Card size={14} color="var(--tp-slate-500)" variant="Linear" />
              </div>
              <span className="font-sans text-[12px] text-tp-slate-600">{patient.patientId}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Page title */}
      <div className="shrink-0 bg-white px-[20px] py-[10px] border-b border-tp-slate-100">
        <h1 className="font-sans text-[18px] font-semibold text-tp-slate-800">Patient Details</h1>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left sidebar */}
        <nav className="w-[220px] shrink-0 overflow-y-auto bg-white border-r border-tp-slate-100">
          <div className="py-[8px]">
            {sidebarItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.id === "dental-plan") {
                      router.push(`/treatment-plan?patientId=${patientId}`)
                      return
                    }
                    setActiveSection(item.id)
                  }}
                  className={`w-full flex items-center gap-[10px] px-[16px] py-[11px] text-left transition-colors relative ${
                    isActive
                      ? "bg-tp-blue-50 text-tp-blue-700"
                      : "text-tp-slate-700 hover:bg-tp-slate-50"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-[4px] bottom-[4px] w-[3px] rounded-r-full bg-tp-blue-500" />
                  )}
                  <span className="flex h-[22px] w-[22px] items-center justify-center flex-shrink-0">
                    {item.medicalIcon && (
                      <TPMedicalIcon
                        name={item.medicalIcon}
                        variant={isActive ? "bulk" : "line"}
                        size={20}
                        color={isActive ? "var(--tp-blue-600)" : "var(--tp-slate-500)"}
                      />
                    )}
                  </span>
                  <span className={`font-sans text-[13px] font-medium ${isActive ? "font-semibold" : ""}`}>
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Right content */}
        <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
          {activeSection === "visit-summary"   && <VisitSummaryContent patientId={patientId} />}
          {activeSection === "prescription"    && <PrescriptionContent />}
          {activeSection === "medical-records" && <MedicalRecordsContent />}
          {activeSection === "add-bill"        && <AddBillContent />}
          {activeSection === "health-checkup"  && <HealthCheckupContent />}
          {/* dental-plan navigates to /treatment-plan page */}
        </div>
      </div>
    </div>
  )
}

export function PatientDetailPage() {
  return (
    <Suspense>
      <PatientDetailInner />
    </Suspense>
  )
}
