"use client"

/**
 * AddProcedureDrawer — Add sub-procedures to a service.
 * Follows the examination procedures pattern: search → select → table with doctor/date/notes.
 */

import { useState, useRef, useEffect, useMemo } from "react"
import { Search, Trash2 } from "lucide-react"
import {
  TPDrawer,
  TPDrawerContent,
} from "@/components/tp-ui/tp-drawer"
import { usePlanContext } from "./plan-context"
import { DrawerHeader } from "./plan-shared"
import { genId } from "./plan-types"
import { createPortal } from "react-dom"

const DOCTORS = ["Dr. Sheela B R", "Dr. Shyam GR", "Dr. Riya Kapoor"]

// Common dental procedures for search
const PROCEDURE_CATALOG = [
  "Access Opening",
  "Canal Shaping",
  "Obturation",
  "BMP Placement",
  "Crown Preparation",
  "Impression Taking",
  "Crown Cementation",
  "Temporary Crown",
  "Post & Core",
  "Tooth Preparation",
  "Composite Layering",
  "Etching & Bonding",
  "Suture Placement",
  "Suture Removal",
  "Incision & Drainage",
  "Flap Elevation",
  "Bone Grafting",
  "Socket Preservation",
  "Splinting",
  "Occlusal Adjustment",
]

interface ProcedureRow {
  id: string
  name: string
  doctor: string
  date: string
  notes: string
}

export function AddProcedureDrawer() {
  const { state, dispatch, closeDrawer, findService } = usePlanContext()
  const drawer = state.drawer

  const isOpen = drawer.type === "add-procedure"
  const serviceId = isOpen ? (drawer as { serviceId: string }).serviceId : undefined
  const service = serviceId ? findService(serviceId) : undefined

  const [rows, setRows] = useState<ProcedureRow[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const searchRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (isOpen) {
      setRows([])
      setSearchQuery("")
      setSearchOpen(false)
    }
  }, [isOpen])

  const filteredProcedures = useMemo(() => {
    return PROCEDURE_CATALOG.filter((p) => {
      if (!searchQuery.trim()) return true
      return p.toLowerCase().includes(searchQuery.toLowerCase())
    }).slice(0, 8)
  }, [searchQuery])

  useEffect(() => {
    if (!searchOpen || !searchRef.current) return
    const rect = searchRef.current.getBoundingClientRect()
    setDropdownPos({ top: rect.bottom + 4, left: rect.left, width: rect.width })
  }, [searchOpen, searchQuery])

  useEffect(() => {
    if (!searchOpen) return
    const handler = (e: MouseEvent) => {
      if (searchRef.current?.contains(e.target as Node)) return
      if (dropdownRef.current?.contains(e.target as Node)) return
      setSearchOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [searchOpen])

  const addProcedure = (name: string) => {
    setRows((prev) => [
      ...prev,
      {
        id: genId("proc-row"),
        name,
        doctor: DOCTORS[0],
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        notes: "",
      },
    ])
    setSearchQuery("")
    setSearchOpen(false)
    searchRef.current?.focus()
  }

  const updateRow = (id: string, patch: Partial<ProcedureRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  const removeRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((prev) => Math.min(prev + 1, filteredProcedures.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (searchQuery.trim() && filteredProcedures.length === 0) {
        addProcedure(searchQuery.trim())
      } else if (filteredProcedures[highlightedIndex]) {
        addProcedure(filteredProcedures[highlightedIndex])
      }
    } else if (e.key === "Escape") {
      setSearchOpen(false)
    }
  }

  const handleSave = () => {
    if (!serviceId || rows.length === 0) return
    for (const row of rows) {
      dispatch({
        type: "ADD_SUB_PROCEDURE",
        serviceId,
        procedure: {
          id: genId("proc"),
          name: row.name,
          date: row.date,
          doctor: row.doctor,
          notes: row.notes.trim() || undefined,
        },
      })
    }
    closeDrawer()
    setRows([])
  }

  return (
    <TPDrawer open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <TPDrawerContent side="right" size="md" className="!rounded-none" style={{ background: "#F4F5F7" }}>
        <DrawerHeader
          title="Add Procedures"
          onClose={closeDrawer}
          action={
            <button
              type="button"
              onClick={handleSave}
              disabled={rows.length === 0}
              className="h-[42px] min-w-[120px] rounded-[10px] px-[20px] font-sans text-[14px] font-semibold text-white bg-tp-blue-600 hover:bg-tp-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Add Procedures
            </button>
          }
        />

        <div className="flex-1 overflow-y-auto px-[20px] py-[16px] space-y-[14px]" style={{ background: "#F4F5F7" }}>
          {/* Service context */}
          {service && (
            <div className="rounded-[10px] bg-tp-blue-50 px-[12px] py-[10px]">
              <p className="font-sans text-[14px] font-semibold text-tp-blue-700">
                {service.treatment}
              </p>
              <p className="font-sans text-[12px] text-tp-blue-500">
                {service.toothFdi === "full-mouth" ? "Full Mouth" : `T${service.toothFdi} — ${service.toothLabel}`}
              </p>
            </div>
          )}

          {/* Procedures cluster card */}
          <div className="rounded-[16px] border border-tp-slate-100 bg-white">
            {/* Table */}
            {rows.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full font-['Inter',sans-serif] text-[14px]">
                  <thead>
                    <tr className="h-[34px] bg-tp-slate-50">
                      <th className="px-3 text-left font-sans text-[12px] font-semibold text-tp-slate-400 w-[36px] border-r border-tp-slate-100">#</th>
                      <th className="px-3 text-left font-sans text-[12px] font-semibold text-tp-slate-400 border-r border-tp-slate-100">Procedure</th>
                      <th className="px-3 text-left font-sans text-[12px] font-semibold text-tp-slate-400 w-[140px] border-r border-tp-slate-100">Doctor</th>
                      <th className="px-3 text-left font-sans text-[12px] font-semibold text-tp-slate-400 w-[110px] border-r border-tp-slate-100">Date</th>
                      <th className="px-3 text-left font-sans text-[12px] font-semibold text-tp-slate-400">Notes</th>
                      <th className="w-[44px]" />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) => (
                      <tr key={row.id} className="h-[42px] border-t border-tp-slate-100 bg-white align-middle">
                        <td className="px-3 font-sans text-[12px] text-tp-slate-400 border-r border-tp-slate-100">{idx + 1}</td>
                        <td className="border-r border-tp-slate-100 p-0">
                          <div className="h-[42px] flex items-center px-3">
                            <p className="font-['Inter',sans-serif] text-[14px] font-medium text-[#454551] truncate">{row.name}</p>
                          </div>
                        </td>
                        <td className="border-r border-tp-slate-100 p-0">
                          <select
                            value={row.doctor}
                            onChange={(e) => updateRow(row.id, { doctor: e.target.value })}
                            className="h-[42px] w-full border-0 bg-transparent px-3 font-['Inter',sans-serif] text-[12px] text-[#454551] focus:bg-tp-blue-50/30 focus:outline-none rounded-none"
                          >
                            {DOCTORS.map((d) => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </td>
                        <td className="border-r border-tp-slate-100 p-0">
                          <input
                            type="text"
                            value={row.date}
                            onChange={(e) => updateRow(row.id, { date: e.target.value })}
                            className="h-[42px] w-full border-0 bg-transparent px-3 font-['Inter',sans-serif] text-[12px] text-[#454551] focus:bg-tp-blue-50/30 focus:outline-none rounded-none"
                          />
                        </td>
                        <td className="p-0">
                          <input
                            type="text"
                            value={row.notes}
                            onChange={(e) => updateRow(row.id, { notes: e.target.value })}
                            placeholder="Optional..."
                            className="h-[42px] w-full border-0 bg-transparent px-3 font-['Inter',sans-serif] text-[12px] text-[#454551] placeholder:text-tp-slate-300 focus:bg-tp-blue-50/30 focus:outline-none rounded-none"
                          />
                        </td>
                        <td className="p-0">
                          <div className="h-[42px] flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removeRow(row.id)}
                              className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] text-tp-slate-400 hover:text-tp-error-500 hover:bg-tp-error-50 transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Search below table */}
            <div className={`px-[14px] py-[12px] ${rows.length > 0 ? "border-t border-tp-slate-100" : ""}`}>
              <div className="relative">
                <Search
                  size={16}
                  strokeWidth={1.5}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-tp-slate-400"
                />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setSearchOpen(true)
                    setHighlightedIndex(0)
                  }}
                  onFocus={() => setSearchOpen(true)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search procedures — e.g., Obturation, Crown Prep..."
                  className="w-full h-[42px] rounded-[10px] border border-tp-slate-200 bg-white pl-10 pr-3 text-[14px] font-sans text-tp-slate-700 placeholder:text-tp-slate-300 transition-colors hover:border-tp-slate-300 focus:border-tp-blue-500 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20"
                />
              </div>

              {/* Suggestive pills */}
              {!searchOpen && (
                <div className="mt-[8px] flex flex-wrap gap-[5px]">
                  {PROCEDURE_CATALOG.slice(0, 6).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => addProcedure(p)}
                      className="inline-flex h-[26px] items-center rounded-[6px] bg-tp-slate-100 px-[8px] font-sans text-[12px] font-medium text-tp-slate-600 hover:bg-tp-slate-200 transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </TPDrawerContent>

      {/* Search dropdown portal */}
      {searchOpen && mounted && filteredProcedures.length > 0 && createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: "fixed",
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: dropdownPos.width,
            zIndex: 9999,
          }}
          className="rounded-[10px] border border-tp-slate-200 bg-white shadow-lg overflow-hidden"
        >
          <div className="max-h-[200px] overflow-y-auto">
            {filteredProcedures.map((p, i) => (
              <button
                key={p}
                type="button"
                onClick={() => addProcedure(p)}
                className={`w-full flex items-center px-[12px] py-[8px] text-left transition-colors ${
                  i === highlightedIndex ? "bg-tp-blue-50" : "hover:bg-tp-slate-50"
                }`}
              >
                <p className="font-sans text-[12px] font-medium text-tp-slate-800">{p}</p>
              </button>
            ))}
          </div>
        </div>,
        document.body,
      )}
    </TPDrawer>
  )
}
