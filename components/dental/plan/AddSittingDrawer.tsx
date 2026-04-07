"use client"

import { useState } from "react"
import {
  TPDrawer,
  TPDrawerContent,
} from "@/components/tp-ui/tp-drawer"
import { usePlanContext } from "./plan-context"
import { DrawerHeader } from "./plan-shared"
import { genId } from "./plan-types"

const DOCTORS = ["Dr. Sheela B R", "Dr. Shyam GR", "Dr. Riya Kapoor"]

export function AddSittingDrawer() {
  const { state, dispatch, closeDrawer, findService } = usePlanContext()
  const drawer = state.drawer

  const isOpen = drawer.type === "add-sitting"
  const serviceId = isOpen ? (drawer as { serviceId: string }).serviceId : undefined
  const service = serviceId ? findService(serviceId) : undefined

  const [date, setDate] = useState(new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }))
  const [doctor, setDoctor] = useState(DOCTORS[0])
  const [notes, setNotes] = useState("")

  const handleAdd = () => {
    if (!serviceId) return
    dispatch({
      type: "ADD_SITTING",
      serviceId,
      sitting: {
        id: genId("sit"),
        date: date || new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        doctor,
        notes: notes.trim() || undefined,
      },
    })
    closeDrawer()
    setDate(new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }))
    setDoctor(DOCTORS[0])
    setNotes("")
  }

  return (
    <TPDrawer open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <TPDrawerContent side="right" size="md" className="!rounded-none" style={{ background: "#F4F5F7" }}>
        <DrawerHeader
          title="Add Sitting"
          onClose={closeDrawer}
          action={
            <button
              type="button"
              onClick={handleAdd}
              className="h-[42px] min-w-[120px] rounded-[10px] px-[20px] font-sans text-[14px] font-semibold text-white bg-tp-blue-600 hover:bg-tp-blue-700 transition-colors shadow-sm"
            >
              Add Sitting
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
              <p className="font-sans text-[12px] text-tp-blue-400 mt-[2px]">
                Current sittings: {service.sittings.length}
              </p>
            </div>
          )}

          <div>
            <label className="block font-sans text-[12px] font-semibold text-tp-slate-600 mb-[4px]">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-[42px] rounded-[8px] border border-tp-slate-200 px-[12px] font-sans text-[14px] text-tp-slate-800 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/30 transition-colors"
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
              placeholder="What was done in this sitting..."
              rows={3}
              className="w-full rounded-[8px] border border-tp-slate-200 px-[12px] py-[8px] font-sans text-[14px] text-tp-slate-800 placeholder:text-tp-slate-300 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/30 transition-colors resize-none"
            />
          </div>
        </div>
      </TPDrawerContent>
    </TPDrawer>
  )
}
