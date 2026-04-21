"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { AiBrandSparkIcon } from "@/components/doctor-agent/ai-brand"

// -----------------------------------------------------------------
// TypingIndicator — rotating “thinking” copy for clinicians
//
// Every ~900ms the line advances (with a quick slide), so it feels
// alive even when the model takes a few seconds. queryHint is always
// the first beat; follow-ups are quirky, ward-round flavoured lines.
// -----------------------------------------------------------------

/** How long each line stays readable before sliding away */
const HOLD_MS = 900
/** Slide-out / swap / slide-in budget */
const TRANSITION_MS = 260

/** When no hint (e.g. design-system preview) — still rotates */
const DEFAULT_THINKING_SEQUENCE = [
  "Stitching the chart into a coherent story",
  "Skipping the fluff — surfacing what matters",
  "Like a sharp ward round, minus the pager beeps",
  "Correlating vitals, history, and the question you asked",
  "Pulling the signal out of the noise",
  "Almost there — bedside manner loading",
]

/** Extra beats after the contextual first line (must stay one line in UI) */
const HINT_FOLLOWUPS: Record<string, string[]> = {
  "Checking drug interactions": [
    "Cross-checking doses with age and renal function",
    "Scanning for awkward pairings you’d flag yourself",
    "No white coat — still obsessive about safety",
  ],
  "Fetching lab results": [
    "Trends beat single snapshots — grabbing both",
    "Separating ‘watch’ from ‘act now’",
    "Numbers first, interpretation on deck",
  ],
  "Looking up patient records": [
    "Skimming encounters without missing the pivot",
    "Demographics, problems, recent trajectory",
    "The chart is thick — the answer won’t be",
  ],
  "Loading intake data": [
    "Patient-reported symptoms — reading carefully",
    "Triaging what’s new vs chronic backdrop",
    "Pre-visit forms, decoded",
  ],
  "Reviewing clinical guidelines": [
    "Guidelines in one tab, your patient in the other",
    "Evidence first, then how it fits this case",
    "DDx seasoning — not cookbook medicine",
  ],
  "Reviewing investigation protocols": [
    "Right test, right urgency",
    "Avoiding the ‘scan everything’ reflex",
    "Who ordered what, and was it enough?",
  ],
  "Analyzing document": [
    "OCR and sense-making in parallel",
    "Tables, impressions, fine print",
    "If it’s illegible, we still squint politely",
  ],
  "Reviewing clinical data": [
    "Vitals, labs, narrative — one thread",
    "Teaching-file brain, real-shift speed",
    "Connecting dots the EMR scattered",
  ],
  "Comparing clinical data": [
    "Then vs now — what actually moved?",
    "Same patient, different chapter",
    "Delta matters more than absolutes",
  ],
  "Fetching clinic data": [
    "Queue, revenue, reality — operational lens",
    "Big-picture clinic pulse",
    "From the waiting room to the spreadsheet",
  ],
  "Preparing response": [
    "Compressing thought into something you can skim",
    "Attending-grade summary, intern-grade latency",
    "Almost clipboard-ready",
  ],
}

const GENERIC_FOLLOWUPS = [
  "Still thinking — medicine isn’t multiple choice",
  "Organizing thoughts like a quiet pre-clinic huddle",
  "Brewing something concise enough for a busy OPD",
]

function buildThinkingSequence(queryHint?: string): string[] {
  const hint = queryHint?.trim()
  if (!hint) return [...DEFAULT_THINKING_SEQUENCE]
  const extras = HINT_FOLLOWUPS[hint] ?? GENERIC_FOLLOWUPS
  // De-dupe if hint accidentally matches a follow-up
  const seen = new Set<string>([hint])
  const uniqueExtras = extras.filter((x) => {
    if (seen.has(x)) return false
    seen.add(x)
    return true
  })
  return [hint, ...uniqueExtras]
}

interface TypingIndicatorProps {
  className?: string
  /** Context-aware first line — then we rotate through themed follow-ups */
  queryHint?: string
}

export function TypingIndicator({ className, queryHint }: TypingIndicatorProps) {
  const messages = useMemo(() => buildThinkingSequence(queryHint), [queryHint])
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<"in" | "out">("in")
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  // Reset carousel when the hint (and thus sequence) changes
  useEffect(() => {
    setIdx(0)
    setPhase("in")
  }, [messages])

  useEffect(() => {
    clearTimers()
    if (messages.length <= 1) return

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms)
      timersRef.current.push(id)
      return id
    }

    /** One full beat: hold → slide out → swap → slide in → schedule next beat */
    const step = () => {
      schedule(() => {
        setPhase("out")
        schedule(() => {
          setIdx((i) => (i + 1) % messages.length)
          setPhase("in")
          schedule(step, HOLD_MS)
        }, TRANSITION_MS)
      }, HOLD_MS)
    }

    schedule(step, HOLD_MS)

    return () => {
      clearTimers()
    }
  }, [messages])

  const displayText = messages[idx] ?? ""

  return (
    <div className={cn("flex items-start gap-[8px]", className)}>
      <AiBrandSparkIcon
        size={20}
        className="da-typing-spark-pulse mt-[1px] shrink-0"
      />

      <div className="typing-carousel-wrap min-w-0 flex-1">
        <span
          className={cn(
            "typing-carousel-item",
            phase === "out" ? "typing-slide-out" : "typing-slide-in",
          )}
        >
          {displayText}
          <span className="typing-ellipsis" aria-hidden="true">
            <span className="typing-ellipsis-dot" style={{ animationDelay: "0ms" }}>.</span>
            <span className="typing-ellipsis-dot" style={{ animationDelay: "180ms" }}>.</span>
            <span className="typing-ellipsis-dot" style={{ animationDelay: "360ms" }}>.</span>
          </span>
        </span>
      </div>

      <style>{`
        @keyframes daTypingSpark {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(0.96); }
        }
        .da-typing-spark-pulse {
          animation: daTypingSpark 1.25s ease-in-out infinite;
        }

        .typing-carousel-wrap {
          overflow: hidden;
          height: 18px;
          display: flex;
          align-items: center;
          padding-top: 1px;
        }

        .typing-carousel-item {
          display: inline-flex;
          align-items: center;
          max-width: 100%;
          font-size: 12.5px;
          font-weight: 500;
          line-height: 18px;
          color: var(--tp-slate-500, #717179);
          white-space: nowrap;
          text-overflow: ellipsis;
          will-change: transform, opacity;
        }

        .typing-slide-in {
          animation: typingSlideIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .typing-slide-out {
          animation: typingSlideOut 0.26s cubic-bezier(0.55, 0, 1, 0.45) forwards;
        }

        @keyframes typingSlideIn {
          0% {
            transform: translateY(10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes typingSlideOut {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-10px);
            opacity: 0;
          }
        }

        .typing-ellipsis {
          display: inline;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }

        .typing-ellipsis-dot {
          display: inline-block;
          animation: ellipsisFade 1.4s ease-in-out infinite;
          opacity: 0.3;
        }

        @keyframes ellipsisFade {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
