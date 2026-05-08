import React from "react";
import { cn } from "../../../utils";
import styles from "./SectionSummaryBar.module.scss";

/**
 * Full-width section header row — canonical spec:
 * height 30px, icon 18px, label 14px semibold.
 * Default fill: TP Slate 100 at 70% opacity; label/icon tp-slate-500.
 * Specialty: tp-violet-50 + tp-violet-600.
 */
export function SectionSummaryBar({
  label,
  icon,
  iconSlot,
  variant = "default",
  trailing,
  className,
  marginBottom = true,
}) {
  const barClass = variant === "specialty" ? styles.bgSpecialty : styles.bgDefault;
  const labelClass = variant === "specialty" ? styles.labelSpecialty : styles.labelDefault;

  return (
    <div
      className={cn(
        styles.bar,
        barClass,
        marginBottom && styles.marginBottom,
        className
      )}>
      {iconSlot ?? (icon ? (
        <span
          className={styles.iconSlot}
          style={{ color: variant === "specialty" ? "var(--tp-violet-600, #7C3AED)" : "var(--tp-slate-500, #64748B)" }}>
          {/* TPMedicalIcon not available — render placeholder */}
          <span className={styles.medicalIcon} aria-hidden="true" />
        </span>
      ) : null)}
      <span className={cn(styles.label, labelClass)}>
        {label}
      </span>
      {trailing}
    </div>
  );
}
