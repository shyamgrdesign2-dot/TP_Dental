"use client"

import { useEffect, useState } from "react"
import {
  TPDrawer,
  TPDrawerContent,
} from "@/components/tp-ui/tp-drawer"
import { Calendar2 } from "iconsax-reactjs"
import { usePlanContext } from "./plan-context"
import { DrawerHeader } from "./plan-shared"
import { genId } from "./plan-types"

const DOCTORS = ["Dr. Sheela B R", "Dr. Shyam GR", "Dr. Riya Kapoor"]

export function BookAppointmentDrawer() {
  const { state, closeDrawer, findService, dispatch } = usePlanContext()
  const drawer = state.drawer

  const isOpen = drawer.type === "book-appointment"
  const serviceId = isOpen ? (drawer as { serviceId?: string }).serviceId : undefined
  const appointmentId = isOpen ? (drawer as { appointmentId?: string }).appointmentId : undefined
  const service = serviceId ? findService(serviceId) : undefined
  const editingAppointment = appointmentId ? service?.appointments?.find((a) => a.id === appointmentId) : undefined

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [doctor, setDoctor] = useState("")
  const [notes, setNotes] = useState("")

  const resetForm = () => {
    setDate("")
    setTime("")
    setDoctor("")
    setNotes("")
  }

  useEffect(() => {
    if (!isOpen) return
    if (editingAppointment) {
      setDate(editingAppointment.date)
      setTime(editingAppointment.time)
      setDoctor(editingAppointment.doctor)
      setNotes(editingAppointment.notes ?? "")
      return
    }
    resetForm()
  }, [isOpen, editingAppointment])

  const handleBook = () => {
    if (!serviceId) return
    if (editingAppointment) {
      dispatch({
        type: "UPDATE_APPOINTMENT",
        serviceId,
        appointmentId: editingAppointment.id,
        patch: {
          date,
          time,
          doctor,
          notes: notes.trim() || undefined,
        },
      })
    } else {
      dispatch({
        type: "ADD_APPOINTMENT",
        serviceId,
        appointment: {
          id: genId("appt"),
          date,
          time,
          doctor,
          notes: notes.trim() || undefined,
        },
      })
    }
    closeDrawer()
    resetForm()
  }

  return (
    <TPDrawer open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <TPDrawerContent side="right" size="md" className="!rounded-none" style={{ background: "#F4F5F7" }}>
        <DrawerHeader
          title={editingAppointment ? "Edit Appointment" : "Book Appointment"}
          onClose={closeDrawer}
          action={
            <button
              type="button"
              onClick={handleBook}
              disabled={!doctor || !date || !time}
              className="inline-flex h-[42px] min-w-[120px] items-center justify-center gap-[6px] rounded-[10px] px-[20px] font-sans text-[14px] font-semibold leading-none text-white bg-tp-blue-600 hover:bg-tp-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Calendar2 size={16} variant="Linear" className="shrink-0" />
              <span className="leading-none">{editingAppointment ? "Save" : "Book"}</span>
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
              Doctor <span className="text-tp-error-500">*</span>
            </label>
            <select
              value={doctor}
              onChange={(e) => {
                setDoctor(e.target.value)
                setTime("")
              }}
              className="w-full h-[42px] rounded-[8px] border border-tp-slate-200 px-[12px] font-sans text-[14px] text-tp-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-tp-blue-500/30 transition-colors"
            >
              <option value="" disabled>
                Select doctor
              </option>
              {DOCTORS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-sans text-[12px] font-semibold text-tp-slate-600 mb-[4px]">
              Date <span className="text-tp-error-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
                setTime("")
              }}
              disabled={!doctor}
              className="w-full h-[42px] rounded-[8px] border border-tp-slate-200 px-[12px] font-sans text-[14px] text-tp-slate-800 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/30 focus:border-tp-blue-400 transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-[12px] font-semibold text-tp-slate-600 mb-[6px]">
              Available Time Slots <span className="text-tp-error-500">*</span>
            </label>
            {!doctor || !date ? (
              <div className="flex h-[80px] w-full items-center justify-center rounded-[8px] border border-dashed border-tp-slate-200 bg-tp-slate-50">
                <p className="font-sans text-[12px] text-tp-slate-400">Select doctor and date to view available time slots.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-[8px]">
                {["10:00 AM", "10:30 AM", "11:15 AM", "12:00 PM", "02:30 PM", "03:45 PM", "05:00 PM", "06:15 PM"].map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`h-[36px] rounded-[8px] font-sans text-[13px] font-medium transition-colors ${
                      time === slot 
                        ? "bg-tp-blue-600 text-white border-transparent" 
                        : "bg-white text-tp-slate-600 border border-tp-slate-200 hover:border-tp-blue-400 hover:text-tp-blue-600"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
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
