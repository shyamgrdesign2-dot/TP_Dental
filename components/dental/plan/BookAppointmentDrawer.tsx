"use client"

import { useState } from "react"
import {
  TPDrawer,
  TPDrawerContent,
} from "@/components/tp-ui/tp-drawer"
import { Calendar2 } from "iconsax-reactjs"
import { usePlanContext } from "./plan-context"
import { DrawerHeader } from "./plan-shared"

const DOCTORS = ["Dr. Sheela B R", "Dr. Shyam GR", "Dr. Riya Kapoor"]

export function BookAppointmentDrawer() {
  const { state, closeDrawer, findService } = usePlanContext()
  const drawer = state.drawer

  const isOpen = drawer.type === "book-appointment"
  const serviceId = isOpen ? (drawer as { serviceId?: string }).serviceId : undefined
  const service = serviceId ? findService(serviceId) : undefined

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [doctor, setDoctor] = useState(DOCTORS[0])
  const [notes, setNotes] = useState("")

  const handleBook = () => {
    closeDrawer()
    setDate("")
    setTime("")
    setDoctor(DOCTORS[0])
    setNotes("")
  }

  return (
    <TPDrawer open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <TPDrawerContent side="right" size="md" className="!rounded-none" style={{ background: "#F4F5F7" }}>
        <DrawerHeader
          title="Book Appointment"
          onClose={closeDrawer}
          action={
            <button
              type="button"
              onClick={handleBook}
              disabled={!date || !time}
              className="inline-flex items-center gap-[6px] h-[42px] min-w-[120px] rounded-[10px] px-[20px] font-sans text-[14px] font-semibold text-white bg-tp-blue-600 hover:bg-tp-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Calendar2 size={16} variant="Linear" />
              Book
            </button>
          }
        />

        <div className="flex-1 overflow-y-auto px-[24px] py-[16px] space-y-[14px]" style={{ background: "#F4F5F7" }}>
          {service && (
            <div className="rounded-[8px] bg-tp-blue-50 px-[12px] py-[10px]">
              <p className="font-sans text-[14px] font-semibold text-tp-blue-700">
                {service.treatment}
              </p>
              <p className="font-sans text-[12px] text-tp-blue-500">
                {service.toothFdi === "full-mouth" ? "Full Mouth" : `T${service.toothFdi} — ${service.toothLabel}`}
              </p>
            </div>
          )}

          {!service && (
            <div className="rounded-[8px] bg-tp-slate-50 px-[12px] py-[10px]">
              <p className="font-sans text-[14px] text-tp-slate-500 italic">
                Open appointment booking module to schedule visits for this patient.
              </p>
            </div>
          )}

          <div>
            <label className="block font-sans text-[12px] font-semibold text-tp-slate-600 mb-[4px]">
              Date <span className="text-tp-error-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-[42px] rounded-[8px] border border-tp-slate-200 px-[12px] font-sans text-[14px] text-tp-slate-800 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/30 focus:border-tp-blue-400 transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-[12px] font-semibold text-tp-slate-600 mb-[4px]">
              Time <span className="text-tp-error-500">*</span>
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full h-[42px] rounded-[8px] border border-tp-slate-200 px-[12px] font-sans text-[14px] text-tp-slate-800 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/30 focus:border-tp-blue-400 transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-[12px] font-semibold text-tp-slate-600 mb-[4px]">Doctor</label>
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="w-full h-[42px] rounded-[8px] border border-tp-slate-200 px-[12px] font-sans text-[14px] text-tp-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-tp-blue-500/30 transition-colors"
            >
              {DOCTORS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-sans text-[12px] font-semibold text-tp-slate-600 mb-[4px]">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={3}
              className="w-full rounded-[8px] border border-tp-slate-200 px-[12px] py-[8px] font-sans text-[14px] text-tp-slate-800 placeholder:text-tp-slate-300 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/30 transition-colors resize-none"
            />
          </div>
        </div>

      </TPDrawerContent>
    </TPDrawer>
  )
}
