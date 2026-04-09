"use client"

import { forwardRef, type ReactElement, type ReactNode, type SyntheticEvent } from "react"
import MuiSnackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import type { SnackbarProps } from "@mui/material/Snackbar"

export interface TPSnackbarProps extends Omit<SnackbarProps, "message"> {
  message?: string | ReactNode
  severity?: "error" | "warning" | "info" | "success"
}

const SuccessSnackbarContent = forwardRef<
  HTMLDivElement,
  {
    message: ReactNode
    onClose?: (event: SyntheticEvent<Element, Event>) => void
  }
>(function SuccessSnackbarContent({ message, onClose }, ref) {
  return (
    <div
      ref={ref}
      className="rounded-[10px] bg-[rgba(23,23,37,0.9)] px-[15px] py-[10px] shadow-[0_8px_20px_-8px_rgba(15,23,42,0.45)]"
    >
      <div className="flex items-center gap-[14px]">
        <span className="inline-flex h-[32px] w-[32px] items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path
              d="M15.9999 29.3334C23.3637 29.3334 29.3333 23.3639 29.3333 16.0001C29.3333 8.63628 23.3637 2.66675 15.9999 2.66675C8.63612 2.66675 2.66659 8.63628 2.66659 16.0001C2.66659 23.3639 8.63612 29.3334 15.9999 29.3334Z"
              stroke="#19BB7A"
              strokeWidth="2.4"
            />
            <path
              d="M11.3333 16.0001L14.5333 19.2001L20.6666 13.0667"
              stroke="#19BB7A"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="font-sans text-[16px] font-medium leading-[26px] tracking-[0.1px] text-white">
          {message}
        </p>
        {onClose ? (
          <button
            type="button"
            aria-label="Close notification"
            onClick={onClose}
            className="ml-auto inline-flex h-[20px] w-[20px] items-center justify-center rounded-[6px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  )
})

export function TPSnackbar({
  severity = "info",
  message,
  onClose,
  ...props
}: TPSnackbarProps) {
  const handleAlertClose = (event: SyntheticEvent<Element, Event>) => {
    onClose?.(event, "escapeKeyDown")
  }

  const content: ReactElement | undefined =
    message == null
      ? undefined
      : severity === "success"
        ? <SuccessSnackbarContent message={message} onClose={onClose ? handleAlertClose : undefined} />
        : typeof message === "string"
        ? (
          <MuiAlert severity={severity} variant="filled" onClose={onClose ? handleAlertClose : undefined}>
            {message}
          </MuiAlert>
        )
        : <>{message}</>

  return (
    <MuiSnackbar {...props} onClose={onClose}>
      {content}
    </MuiSnackbar>
  )
}
