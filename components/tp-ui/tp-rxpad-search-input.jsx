"use client"

import React from "react"
import { Search } from "lucide-react"
import clsx from "clsx"
import styles from "./TPRxPadSearchInput.module.scss"

export const TPRxPadSearchInput = React.forwardRef(
  ({ className, wrapperClassName, ...props }, ref) => {
    return (
      <div className={clsx(styles.wrapper, wrapperClassName)}>
        <Search size={16} strokeWidth={1.5} className={styles.icon} />
        <input ref={ref} {...props} className={clsx(styles.input, className)} />
      </div>
    )
  },
)
TPRxPadSearchInput.displayName = "TPRxPadSearchInput"
