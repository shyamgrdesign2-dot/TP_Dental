/**
 * Shared primitive sub-components for the Secondary Sidebar.
 */
import React from "react"
import clsx from "clsx"
import svgPaths from "./imports/svg-g7iuydxwol"
import { tpSectionCardStyle } from "./tokens"
import p from "./rxSidebarPrimitives.module.scss"
import s from "./shared.module.scss"

export function SvgLayer13({ children }) {
  return (
    <div className={s.svgLayer13}>
      <svg className={s.svgFull} fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
        {children}
      </svg>
    </div>
  )
}

export function SvgLayer20({ children }) {
  return (
    <div className={s.svgLayer20Wrap}>
      <svg className={s.svgFull} fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  )
}

export function NavIconWrapper({ active, children }) {
  return (
    <div
      className={clsx(p.iconPill, active ? p.iconPillActiveBg : p.iconPillBg)}
    >
      <div className={p.iconInner}>{children}</div>
    </div>
  )
}

export function RowWrapper({ children, className = "" }) {
  return (
    <div className={clsx(s.rowOuter, className)}>
      <div className={s.rowFlex}>
        <div className={s.rowInner}>{children}</div>
      </div>
    </div>
  )
}

export function DataColumn({ children }) {
  return (
    <div className={s.dataCol}>
      <div className={s.dataColInner}>{children}</div>
    </div>
  )
}

export function GreyTextColumn({ children }) {
  return (
    <div className={s.greyTextCol}>
      <div className={s.greyTextInner}>
        <ul>
          <li className={s.listDisc}>{children}</li>
        </ul>
      </div>
    </div>
  )
}

export function MutedTextColumn({ children }) {
  return (
    <div className={s.mutedCol}>
      <div className={s.mutedInner}>{children}</div>
    </div>
  )
}

export function FieldLabelColumn({ children }) {
  return (
    <div className={s.fieldLabel}>
      <p className={s.fieldLabelP}>{children}</p>
    </div>
  )
}

export function BulletItem({ label, detail }) {
  return (
    <ul>
      <li className={s.bulletLi}>
        <span className={s.bulletLabel}>{label}</span>
        <span className={s.bulletLead}> (</span>
        <span className={s.bulletLead}>{detail}</span>
        <span className={s.bulletLead}>)</span>
      </li>
    </ul>
  )
}

export function CollapsedDateCard({ text }) {
  return (
    <div className={s.dateCardRoot} style={tpSectionCardStyle}>
      <div className={s.dateCardInner}>
        <div className={s.dateCardBg}>
          <DateCardHeader>
            <p className={s.bulletLead}>{text}</p>
          </DateCardHeader>
        </div>
      </div>
    </div>
  )
}

export function DateCardHeader({ children }) {
  return (
    <div className={s.dateHeaderRow}>
      <div className={s.dateHeaderInner}>
        <div className={s.dateHeaderTitle}>{children}</div>
        <div className={s.arrowWrap}>
          <div className={s.arrowClip}>
            <div className={s.arrowSvgAbs}>
              <svg className={s.svgFull} fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                <g id="arrow-square-down">
                  <path
                    d={svgPaths.p274dc900}
                    stroke="var(--tp-slate-300)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={svgPaths.p3e19eb80}
                    stroke="var(--tp-slate-700)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g opacity="0" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MedRxIcon() {
  return (
    <div className={s.medRxIcon}>
      <div className={s.medRxInset}>
        <svg className={s.medRxSvg} fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.8333">
          <g>
            <path clipRule="evenodd" d={svgPaths.p13413000} fill="var(--tp-slate-400)" fillRule="evenodd" />
            <path d={svgPaths.pb7dd600} fill="var(--tp-slate-400)" opacity="0.35" />
            <path d={svgPaths.pc60990} fill="var(--tp-slate-400)" />
          </g>
        </svg>
      </div>
    </div>
  )
}

export function MedRxFieldLabel({ text }) {
  return (
    <div className={s.medRxLabelRow}>
      <MedRxIcon />
      <FieldLabelColumn>{text}</FieldLabelColumn>
    </div>
  )
}
