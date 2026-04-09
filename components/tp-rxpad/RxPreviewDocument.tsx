"use client"

import { Calendar2, ClipboardText, Health, SearchNormal1 } from "iconsax-reactjs"
import { Building2 } from "lucide-react"
import { ToothIcon } from "@/components/dental/ToothIcon"
import type { RxPreviewComposedSnapshot, RxPreviewLine } from "@/components/tp-rxpad/rx-preview-store"

function formatDate(value: string) {
  const dt = new Date(value)
  if (Number.isNaN(dt.getTime())) return value
  return dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
}

function renderMeta(metaParts: string[]) {
  if (metaParts.length === 0) return null
  return (
    <span className="text-tp-slate-500">
      {" ("}
      {metaParts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {index > 0 ? <span className="text-tp-slate-400"> | </span> : null}
          {part}
        </span>
      ))}
      {")"}
    </span>
  )
}

function SectionList({
  title,
  rows,
  icon,
}: {
  title: string
  rows: RxPreviewLine[]
  icon?: React.ReactNode
}) {
  if (!rows.length) return null
  return (
    <section className="space-y-[4px]">
      <div className="flex items-center gap-[5px]">
        {icon ? <span className="inline-flex h-[14px] w-[14px] items-center justify-center">{icon}</span> : null}
        <h3 className="font-sans text-[13px] font-semibold leading-[18px] text-tp-slate-900">{title}</h3>
      </div>
      <ul className="space-y-1 pl-[18px]">
        {rows.map((row, index) => (
          <li key={`${title}-${index}`} className="list-disc marker:text-tp-slate-500 font-sans text-[11px] leading-[16px] text-tp-slate-700">
            <span className="font-medium text-tp-slate-900">{row.title}</span>
            {renderMeta(row.metaParts)}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function RxPreviewDocument({
  snapshot,
}: {
  snapshot: RxPreviewComposedSnapshot | null
}) {
  const prescriptionDate = snapshot ? formatDate(snapshot.updatedAt) : formatDate(new Date().toISOString())
  const dentalBlocks = snapshot?.dentalExamination ?? []
  const firstPageDentalBlocks = dentalBlocks.slice(0, 4)
  const remainingDentalBlocks = dentalBlocks.slice(4)

  const renderLetterhead = () => (
    <>
      <header className="rounded-[6px] bg-tp-slate-100/60 px-[10px] py-[8px]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[8px] bg-tp-blue-50">
              <Building2 size={22} className="text-tp-blue-600" strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-sans text-[15px] font-semibold leading-[20px] text-tp-blue-700">TP Dental Care</p>
              <p className="font-sans text-[11px] font-medium leading-[16px] text-tp-slate-700">Dr. Umesh Aggarwal, BDS, MDS</p>
              <p className="font-sans text-[10px] leading-[14px] text-tp-slate-600">
                Reg. ID: DCI-2342342 | +91 78945 61230
              </p>
              <p className="font-sans text-[10px] leading-[14px] text-tp-slate-600">K9 Sardar Bungalow, Prahladnagar, Ahmedabad</p>
            </div>
          </div>
        </div>
      </header>

      <div className="h-px w-full bg-tp-slate-300" />
    </>
  )

  const renderPatientDetails = () => (
    <>
      <section className="py-[8px]">
        <div className="flex items-start justify-between gap-[24px]">
          <div className="min-w-0 flex-1 space-y-[2px]">
            <p className="font-sans text-[11px] leading-[16px] text-tp-slate-700"><span className="font-semibold text-tp-slate-900">Patient Name:</span> Shyam GR</p>
            <p className="font-sans text-[11px] leading-[16px] text-tp-slate-700"><span className="font-semibold text-tp-slate-900">Age/Gender:</span> 25 Years, Male</p>
            <p className="font-sans text-[11px] leading-[16px] text-tp-slate-700"><span className="font-semibold text-tp-slate-900">Height/Weight:</span> 170 cm / 68 kg</p>
            <p className="font-sans text-[11px] leading-[16px] text-tp-slate-700"><span className="font-semibold text-tp-slate-900">Address:</span> Prahladnagar, Ahmedabad</p>
          </div>
          <div className="shrink-0 space-y-[2px] text-right">
            <p className="font-sans text-[11px] leading-[16px] text-tp-slate-700"><span className="font-semibold text-tp-slate-900">Patient ID:</span> {snapshot?.patientId ?? "apt-1"}</p>
            <p className="font-sans text-[11px] leading-[16px] text-tp-slate-700"><span className="font-semibold text-tp-slate-900">Mobile:</span> 9567933357</p>
            <p className="font-sans text-[11px] leading-[16px] text-tp-slate-700"><span className="font-semibold text-tp-slate-900">Blood Group:</span> A+</p>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-tp-slate-300" />
    </>
  )

  const renderFooter = () => (
    <>
      <div className="h-px w-full bg-tp-slate-300" />
      <footer className="pt-[10px]">
        <p className="text-right font-sans text-[10px] leading-[14px] text-tp-slate-500">
          support@tpdentalcare.com | www.tpdentalcare.com
        </p>
      </footer>
    </>
  )

  const renderDentalSection = (blocks: RxPreviewComposedSnapshot["dentalExamination"], titleSuffix?: string) => {
    if (!blocks.length) return null
    return (
      <section className="space-y-[6px]">
        <h3 className="flex items-center gap-[5px] font-sans text-[13px] font-semibold leading-[18px] text-tp-slate-900">
          <ToothIcon size={12} color="var(--tp-slate-500)" variant="Bulk" />
          Dental Examination{titleSuffix ? ` ${titleSuffix}` : ""}
          <span className="font-medium text-tp-slate-600">
            {" "}
            ({formatDate(snapshot?.dentalUpdatedAt ?? snapshot?.updatedAt ?? new Date().toISOString())})
          </span>
        </h3>
        <div className="space-y-[4px] pl-[6px]">
          {blocks.map((block, index) => (
            <div key={`${block.toothLabel}-${index}`} className="space-y-[2px]">
              <p className="font-sans text-[11px] font-semibold leading-[16px] text-tp-slate-900">
                <span className="mr-[6px] text-tp-slate-500">•</span>
                {block.toothLabel}
              </p>

              <div className="space-y-[2px] pl-[18px]">
                {block.treatmentHistory.length ? (
                  <p className="font-sans text-[11px] leading-[16px] text-tp-slate-700">
                    <span className="mr-[6px] text-tp-slate-400">◦</span>
                    <span className="font-medium text-tp-slate-900">Treatment History:</span>{" "}
                    {block.treatmentHistory.map((item, itemIndex) => (
                      <span key={`th-${itemIndex}`}>
                        {itemIndex > 0 ? <span className="text-tp-slate-400">, </span> : null}
                        <span>{item.title}</span>
                        {renderMeta(item.metaParts)}
                      </span>
                    ))}
                  </p>
                ) : null}
                {block.findings.length ? (
                  <p className="font-sans text-[11px] leading-[16px] text-tp-slate-700">
                    <span className="mr-[6px] text-tp-slate-400">◦</span>
                    <span className="font-medium text-tp-slate-900">Findings:</span>{" "}
                    {block.findings.map((item, itemIndex) => (
                      <span key={`finding-${itemIndex}`}>
                        {itemIndex > 0 ? <span className="text-tp-slate-400">, </span> : null}
                        <span>{item.title}</span>
                        {renderMeta(item.metaParts)}
                      </span>
                    ))}
                  </p>
                ) : null}
                {block.procedures.length ? (
                  <p className="font-sans text-[11px] leading-[16px] text-tp-slate-700">
                    <span className="mr-[6px] text-tp-slate-400">◦</span>
                    <span className="font-medium text-tp-slate-900">Procedures:</span>{" "}
                    {block.procedures.map((item, itemIndex) => (
                      <span key={`proc-${itemIndex}`}>
                        {itemIndex > 0 ? <span className="text-tp-slate-400">, </span> : null}
                        <span>{item.title}</span>
                        {renderMeta(item.metaParts)}
                      </span>
                    ))}
                  </p>
                ) : null}
                {block.overallToothNote ? (
                  <p className="font-sans text-[11px] leading-[16px] text-tp-slate-700">
                    <span className="mr-[6px] text-tp-slate-400">◦</span>
                    <span className="font-medium text-tp-slate-900">Overall Tooth Notes:</span>{" "}
                    {block.overallToothNote}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <div className="mx-auto w-full max-w-[760px] space-y-[20px]">
      <article className="flex w-full aspect-[210/297] flex-col overflow-hidden rounded-[14px] bg-white p-[16px] shadow-[0_1px_2px_rgba(16,24,40,0.08)]">
        {renderLetterhead()}
        {renderPatientDetails()}

        <div className="flex-1 overflow-hidden">
          {!snapshot ? (
            <div className="py-[20px]">
              <p className="font-sans text-[11px] leading-[16px] text-tp-slate-600">
                No Rx data available yet. Add details in Clinical or Dental Examination to preview here.
              </p>
            </div>
          ) : (
            <div className="space-y-[10px] py-[8px]">
              <SectionList title="Symptoms" rows={snapshot.symptoms} icon={<Health size={14} color="var(--tp-slate-500)" variant="Bulk" />} />
              <SectionList title="Examination" rows={snapshot.examinations} icon={<SearchNormal1 size={14} color="var(--tp-slate-500)" variant="Bulk" />} />
              <SectionList title="Diagnosis" rows={snapshot.diagnoses} icon={<ClipboardText size={14} color="var(--tp-slate-500)" variant="Bulk" />} />
              <SectionList title="Lab Investigation" rows={snapshot.labInvestigations} icon={<SearchNormal1 size={14} color="var(--tp-slate-500)" variant="Bulk" />} />
              <SectionList title="Medication (Rx)" rows={snapshot.medications} icon={<Health size={14} color="var(--tp-slate-500)" variant="Bulk" />} />
              <SectionList title="Advice" rows={snapshot.advice} icon={<ClipboardText size={14} color="var(--tp-slate-500)" variant="Bulk" />} />

              {renderDentalSection(firstPageDentalBlocks)}

              {snapshot.followUp ? (
                <section className="space-y-[2px]">
                  <h3 className="flex items-center gap-[5px] font-sans text-[13px] font-semibold leading-[18px] text-tp-slate-900">
                    <Calendar2 size={14} color="var(--tp-slate-500)" variant="Bulk" />
                    Follow Up
                  </h3>
                  <p className="font-sans text-[11px] leading-[16px] text-tp-slate-700">{snapshot.followUp}</p>
                </section>
              ) : null}
              {snapshot.additionalNotes ? (
                <section className="space-y-[2px]">
                  <h3 className="font-sans text-[13px] font-semibold leading-[18px] text-tp-slate-900">Additional Notes</h3>
                  <p className="font-sans text-[11px] leading-[16px] text-tp-slate-700">{snapshot.additionalNotes}</p>
                </section>
              ) : null}
            </div>
          )}
        </div>

        {renderFooter()}
      </article>

      {remainingDentalBlocks.length > 0 ? (
        <article className="flex w-full aspect-[210/297] flex-col overflow-hidden rounded-[14px] bg-white p-[16px] shadow-[0_1px_2px_rgba(16,24,40,0.08)]">
          {renderLetterhead()}
          {renderPatientDetails()}
          <div className="flex-1 overflow-hidden py-[8px]">
            {renderDentalSection(remainingDentalBlocks, "(contd.)")}
          </div>
          {renderFooter()}
        </article>
      ) : null}
    </div>
  )
}

