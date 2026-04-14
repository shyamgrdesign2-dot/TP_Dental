"use client"

/**
 * Visual bridge from the summary / voice card to per-tooth cards below.
 */
export function DentalRecordsStackConnector({ message }: { message: string }) {
  return (
    <div className="mt-3 flex w-full flex-col items-center border-t border-tp-slate-100/90 pt-3">
      <p className="max-w-[min(100%,280px)] text-center text-[12px] font-medium leading-snug text-tp-slate-500">
        {message}
      </p>
      <div
        className="mt-2 h-8 w-0 shrink-0 border-l-2 border-dashed border-tp-slate-300"
        aria-hidden
      />
    </div>
  )
}
