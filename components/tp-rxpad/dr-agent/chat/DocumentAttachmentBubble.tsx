"use client"

import React from "react"
import { DocumentText1, Image as ImageIcon } from "iconsax-reactjs"
import { cn } from "@/lib/utils"
import type { ChatAttachment } from "../types"

interface DocumentAttachmentBubbleProps {
  attachment: ChatAttachment
  /** Inside user message bubble — file strip with TP accent, matches chat attachment pattern */
  embedded?: boolean
}

export function inferChatAttachmentKind(a: ChatAttachment): "pdf" | "image" {
  if (a.type === "image" || a.type === "pdf") return a.type
  return /\.(jpe?g|png|webp|gif)$/i.test(a.fileName) ? "image" : "pdf"
}

function EmbeddedAttachmentTile({ attachment }: { attachment: ChatAttachment }) {
  const kind = inferChatAttachmentKind(attachment)
  const meta = attachment.pageCount
    ? `${attachment.pageCount} ${attachment.pageCount === 1 ? "page" : "pages"}`
    : kind === "image"
      ? "Image"
      : "Attachment"

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 basis-[min(100%,240px)] gap-3 rounded-[10px] bg-white/60 py-2.5 pl-3 pr-3",
        "backdrop-blur-[2px]",
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-white/85 shadow-[inset_0_0_0_1px_rgba(75,74,213,0.06)]">
          {kind === "image" ? (
            <ImageIcon size={22} variant="Bold" className="text-[var(--tp-blue-600,#4338CA)]" />
          ) : (
            <DocumentText1 size={22} variant="Bold" className="text-[var(--tp-blue-600,#4338CA)]" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold leading-snug text-tp-slate-900" title={attachment.fileName}>
            {attachment.fileName}
          </p>
          <p className="mt-0.5 text-[11px] font-medium leading-tight text-tp-slate-500">{meta}</p>
        </div>
      </div>
    </div>
  )
}

/** Renders every attachment in the user bubble (multi-upload). */
export function DocumentAttachmentsStrip({
  attachments,
  embedded,
}: {
  attachments: ChatAttachment[]
  embedded?: boolean
}) {
  if (embedded) {
    return (
      <div className="flex flex-wrap gap-2">
        {attachments.map((a, i) => (
          <EmbeddedAttachmentTile key={`${a.fileName}-${i}`} attachment={a} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {attachments.map((a, i) => (
        <DocumentAttachmentBubble key={`${a.fileName}-${i}`} attachment={a} embedded={false} />
      ))}
    </div>
  )
}

export function DocumentAttachmentBubble({ attachment, embedded }: DocumentAttachmentBubbleProps) {
  if (embedded) {
    return <DocumentAttachmentsStrip attachments={[attachment]} embedded />
  }

  return (
    <div className="flex items-center gap-[8px] rounded-[8px] border border-tp-slate-200 bg-white px-[10px] py-[8px] shadow-sm">
      <div className="flex h-[32px] w-[26px] shrink-0 items-center justify-center rounded-[4px] bg-tp-error-50">
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
          <path
            d="M10 1H3C2.44772 1 2 1.44772 2 2V16C2 16.5523 2.44772 17 3 17H13C13.5523 17 14 16.5523 14 16V5L10 1Z"
            fill="var(--tp-error-100, #FFE4E6)"
            stroke="var(--tp-error-500, #E11D48)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 1V5H14" stroke="var(--tp-error-500, #E11D48)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="8" y="13" textAnchor="middle" fill="var(--tp-error-500, #E11D48)" fontSize="5" fontWeight="700" fontFamily="sans-serif">
            PDF
          </text>
        </svg>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[14px] font-medium leading-[1.3] text-tp-slate-700">
          {attachment.fileName}
        </span>
        {attachment.pageCount && (
          <span className="text-[12px] leading-[1.3] text-tp-slate-400">
            {attachment.pageCount} {attachment.pageCount === 1 ? "page" : "pages"}
          </span>
        )}
      </div>
    </div>
  )
}
