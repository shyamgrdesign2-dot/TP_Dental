"use client"

import React from "react"
import styles from "./TPRxPadShell.module.scss"

export function TPRxPadShell({ topNav, sidebar, children }) {
  return (
    <div className={styles.root}>
      {topNav}
      <div className={styles.bodyRow}>
        <aside className={styles.aside}>{sidebar}</aside>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}
