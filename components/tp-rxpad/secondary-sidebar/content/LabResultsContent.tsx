/**
 * Lab Results content panel — date-based expandable cards.
 */
import React, { useState } from "react";
import clsx from "clsx";
import { ArrowSquareDown, ArrowSquareUp } from "iconsax-reactjs";
import { ActionButton, useStickyHeaderState } from "../detail-shared";
import { tpSectionCardStyle } from "../tokens";
import { LAB_PRIMARY_DATE_LABEL, LAB_PRIMARY_ROWS, type LabRowType } from "./today-data";

type LabEntry = {
  id: string;
  dateLabel: string;
  rows: LabRowType[];
};

const BASE_ROWS: LabRowType[] = LAB_PRIMARY_ROWS;

const LAB_ENTRIES: LabEntry[] = [
  { id: "l-27", dateLabel: LAB_PRIMARY_DATE_LABEL, rows: BASE_ROWS },
  {
    id: "l-26",
    dateLabel: "26 Jan'26",
    rows: BASE_ROWS.map((row, index) =>
      index % 4 === 0
        ? { ...row, value: (Number.parseFloat(row.value) * 0.98).toFixed(1) }
        : row
    ),
  },
  {
    id: "l-24",
    dateLabel: "24 Jan'26",
    rows: BASE_ROWS.map((row, index) =>
      index % 5 === 0
        ? { ...row, value: (Number.parseFloat(row.value) * 1.02).toFixed(1) }
        : row
    ),
  },
  {
    id: "l-22",
    dateLabel: "22 Jan'26",
    rows: BASE_ROWS.map((row, index) =>
      index % 3 === 0
        ? { ...row, value: (Number.parseFloat(row.value) * 1.01).toFixed(1) }
        : row
    ),
  },
  {
    id: "l-20",
    dateLabel: "20 Jan'26",
    rows: BASE_ROWS.map((row, index) =>
      index % 6 === 0
        ? { ...row, value: (Number.parseFloat(row.value) * 0.97).toFixed(1) }
        : row
    ),
  },
];

function LabRow({
  label,
  unit,
  value,
  abnormal = false,
}: LabRowType) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] w-full">
        <div className="flex items-baseline gap-[6px] min-w-0">
          <span className="font-sans font-normal text-tp-slate-700 text-[14px] tracking-[0.012px] leading-[20px] truncate">
            {label}
          </span>
          <span className="font-sans text-tp-slate-400 text-[14px] leading-[20px] whitespace-nowrap">
            {unit}
          </span>
        </div>
        <span className={clsx("font-sans font-normal text-[14px] leading-[20px] whitespace-nowrap", abnormal ? "text-tp-error-500" : "text-tp-slate-700")}>
          {value}
        </span>
      </div>
    </div>
  );
}

function LabDateCard({
  entry,
  expanded,
  onToggle,
}: {
  entry: LabEntry;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { headerRef, isStuck } = useStickyHeaderState();

  return (
    <div className="relative shrink-0 w-full" style={tpSectionCardStyle}>
      <button
        ref={headerRef as React.Ref<HTMLButtonElement>}
        type="button"
        onClick={onToggle}
        className={clsx(
          "bg-tp-slate-100 sticky top-0 z-[2] shrink-0 w-full text-left",
          expanded
            ? isStuck
              ? "rounded-tl-none rounded-tr-none"
              : "rounded-tl-[10px] rounded-tr-[10px]"
            : "rounded-[10px]",
        )}
      >
        <div className="content-stretch flex items-center justify-between px-[10px] py-[8px] w-full">
          <p className="font-['Inter',sans-serif] font-semibold leading-[20px] text-tp-slate-700 text-[14px] whitespace-nowrap">
            {entry.dateLabel}
          </p>
          <div className="relative shrink-0 size-[18px]">
            {expanded ? (
              <ArrowSquareUp color="var(--tp-slate-500)" size={18} strokeWidth={1.5} variant="Linear" />
            ) : (
              <ArrowSquareDown color="var(--tp-slate-500)" size={18} strokeWidth={1.5} variant="Linear" />
            )}
          </div>
        </div>
      </button>

      {expanded ? (
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          {entry.rows.map((row) => (
            <LabRow key={`${entry.id}-${row.label}`} {...row} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function LabResultsContent() {
  const [expandedState, setExpandedState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(LAB_ENTRIES.map((entry, index) => [entry.id, index === 0]))
  );

  return (
    <div className="content-stretch flex flex-col items-center relative size-full">
      <ActionButton label="Add/Edit Details" icon="plus" />
      <div className="flex-[1_0_0] min-h-px min-w-px overflow-y-auto relative w-full" data-sticky-scroll-root="true">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[12px] relative w-full">
          {LAB_ENTRIES.map((entry) => (
            <LabDateCard
              key={entry.id}
              entry={entry}
              expanded={Boolean(expandedState[entry.id])}
              onToggle={() => {
                setExpandedState((prev) => ({
                  ...prev,
                  [entry.id]: !prev[entry.id],
                }));
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
