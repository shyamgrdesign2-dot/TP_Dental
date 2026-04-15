"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { Search, XCircle } from "lucide-react"
import { Eraser, Grid5, Ram, Trash } from "iconsax-reactjs"
import styles from "./RxPadSection.module.scss"

export function RxPadSection({
  title,
  icon,
  children,
  showHeaderActions = true,
  onTemplateClick,
  onSaveClick,
  onClearClick,
  clearDisabled = false,
  autofillLabel,
}) {
  return (
    <div className={styles.section}>
      <div className={styles.headerRow}>
        <div className={styles.titleCluster}>
          <span className={styles.iconWrap}>{icon}</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        {showHeaderActions ? (
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.iconBtn}
              title="Template"
              onClick={onTemplateClick}
            >
              <Grid5 color="var(--tp-slate-700)" size={18} strokeWidth={1.5} variant="Linear" />
            </button>
            <button type="button" className={styles.iconBtn} title="Save" onClick={onSaveClick}>
              <Ram color="var(--tp-slate-700)" size={18} strokeWidth={1.5} variant="Linear" />
            </button>
            <button
              type="button"
              className={styles.iconBtn}
              title="Clear"
              onClick={onClearClick}
              disabled={clearDisabled}
            >
              <Eraser color="var(--tp-slate-700)" size={18} strokeWidth={1.5} variant="Linear" />
            </button>
          </div>
        ) : null}
      </div>
      {autofillLabel ? (
        <div className={styles.autofillWrap}>
          <button type="button" className={styles.autofillBtn}>
            <span className={styles.autofillDot} />
            {autofillLabel}
          </button>
        </div>
      ) : null}
      <div className={styles.body}>{children}</div>
    </div>
  )
}

export function ChipSearchInput({ placeholder, suggestions, selectedItems, onAdd, onRemove }) {
  const [query, setQuery] = useState("")
  const filtered =
    query.length > 0
      ? suggestions
          .filter((s) => s.toLowerCase().includes(query.toLowerCase()) && !selectedItems.includes(s))
          .slice(0, 8)
      : suggestions.filter((s) => !selectedItems.includes(s)).slice(0, 10)

  const handleAdd = useCallback(
    (item) => {
      onAdd(item)
      setQuery("")
    },
    [onAdd],
  )

  return (
    <div className={styles.chipStack}>
      <div className={styles.searchWrap}>
        <Search size={16} strokeWidth={1.5} className={styles.searchIcon} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={styles.searchInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim()) {
              handleAdd(query.trim())
            }
          }}
        />
      </div>
      <div className={styles.suggestRow}>
        {filtered.map((s) => (
          <button key={s} type="button" onClick={() => handleAdd(s)} className={styles.suggestChip}>
            {s}
          </button>
        ))}
      </div>
      {selectedItems.length > 0 ? (
        <div className={styles.selectedRow}>
          {selectedItems.map((item) => (
            <span key={item} className={styles.selectedChip}>
              {item}
              <button type="button" onClick={() => onRemove(item)} className={styles.chipRemove}>
                <XCircle size={12} strokeWidth={1.5} />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function MedicationTable({ rows, onRemove }) {
  const medTableScrollRef = useRef(null)
  const [medActionOverflow, setMedActionOverflow] = useState(false)
  const [medActionEdge, setMedActionEdge] = useState(false)

  const updateMedSticky = useCallback(() => {
    const el = medTableScrollRef.current
    if (!el) return
    const hasOverflow = el.scrollWidth > el.clientWidth + 1
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth)
    setMedActionOverflow(hasOverflow)
    setMedActionEdge(hasOverflow && maxScroll > 1 && el.scrollLeft > 0 && el.scrollLeft < maxScroll - 0.5)
  }, [])

  useEffect(() => {
    const el = medTableScrollRef.current
    if (!el) return
    updateMedSticky()
    const ro = new ResizeObserver(updateMedSticky)
    ro.observe(el)
    const table = el.querySelector("table")
    if (table) ro.observe(table)
    window.addEventListener("resize", updateMedSticky)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", updateMedSticky)
    }
  }, [updateMedSticky, rows.length])

  return (
    <div className={styles.medStack}>
      <div ref={medTableScrollRef} className={styles.tableScroll} onScroll={updateMedSticky}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.theadRow}>
              <th className={`${styles.th} ${styles.thNarrow}`} />
              <th className={`${styles.th} ${styles.thMed}`}>MEDICINE</th>
              <th className={`${styles.th} ${styles.thSmall}`}>UNIT PER DOSE</th>
              <th className={`${styles.th} ${styles.thSmall}`}>FREQUENCY</th>
              <th className={`${styles.th} ${styles.thWhen}`}>WHEN</th>
              <th className={`${styles.th} ${styles.thDur}`}>DURATION</th>
              <th className={`${styles.th} ${styles.thNote}`}>NOTE</th>
              <th
                className={clsx(
                  styles.th,
                  styles.thTrash,
                  medActionOverflow && styles.medActionTh,
                  medActionEdge && styles.medActionThEdge,
                )}
              />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className={styles.tbodyRow}>
                <td className={styles.td}>
                  <div className={styles.dragCell}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <circle cx="4" cy="3" r="1" />
                      <circle cx="8" cy="3" r="1" />
                      <circle cx="4" cy="6" r="1" />
                      <circle cx="8" cy="6" r="1" />
                      <circle cx="4" cy="9" r="1" />
                      <circle cx="8" cy="9" r="1" />
                    </svg>
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.medName}>{row.medicine}</div>
                </td>
                <td className={`${styles.td} ${styles.tdMuted}`}>{row.unitPerDose}</td>
                <td className={styles.td}>
                  <span className={styles.freqPill}>{row.frequency}</span>
                </td>
                <td className={`${styles.td} ${styles.tdMuted}`}>{row.when}</td>
                <td className={`${styles.td} ${styles.tdMuted}`}>{row.duration}</td>
                <td className={styles.td}>
                  <span className={styles.notePill}>{row.note || "Note"}</span>
                </td>
                <td
                  className={clsx(
                    styles.td,
                    medActionOverflow && styles.medActionTd,
                    medActionEdge && styles.medActionTdEdge,
                  )}
                >
                  <button type="button" onClick={() => onRemove(row.id)} className={styles.rowDelete}>
                    <Trash color="currentColor" size={18} strokeWidth={1.5} variant="Linear" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.medSearchWrap}>
        <Search size={16} strokeWidth={1.5} className={styles.searchIcon} />
        <input type="text" placeholder="Search Medication (Rx)" className={styles.medSearchInput} />
      </div>
    </div>
  )
}
