"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Note1, Glass, Ruler, Notepad2, DocumentText, Calendar2, Messages2, ReceiptText, Profile2User, CalendarAdd, Shop, Hospital, DocumentLike, MessageProgramming, } from "iconsax-reactjs";
import { TPMedicalIcon } from "@/components/tp-ui";
import { SecondarySidebar } from "@/components/tp-rxpad/secondary-sidebar/SecondarySidebar";
const SECONDARY_NAV_TOKENS = {
    panelWidth: 80,
    panelHeight: 740,
    itemPaddingX: 6,
    itemPaddingY: 12,
    iconLabelGap: 6,
    iconContainerSize: 32,
    iconContainerRadius: 10,
    iconSize: 20,
    highlightBarWidth: 3,
    highlightBarRadius: 12,
    arrowWidth: 8,
    arrowHeight: 16,
    labelWidth: 68,
    labelSize: 12,
    labelLineHeight: 18,
    labelTracking: 0.1,
    badgeSize: 10,
    badgePaddingLeft: 4,
    badgePaddingRight: 2,
    badgePaddingY: 4,
    badgeRadius: 30,
    bottomFadeHeight: 120,
};
// Appointment screen sidebar items (Primary Nav)
const primaryNavItems = [
    { id: "appointments", label: "Appointments", icon: { kind: "iconsax", Icon: Calendar2 } },
    {
        id: "ask-tatva",
        label: "Ask Tatva",
        icon: { kind: "iconsax", Icon: Messages2 },
        badge: {
            text: "New",
            gradient: "linear-gradient(257.32deg, rgb(22, 163, 74) 0%, rgb(68, 207, 119) 47.222%, rgb(22, 163, 74) 94.444%)",
        },
    },
    {
        id: "opd-billing",
        label: "OPD Billing",
        icon: { kind: "iconsax", Icon: ReceiptText },
        badge: {
            text: "Trial",
            gradient: "linear-gradient(257.32deg, rgb(241, 82, 35) 0%, rgb(255, 152, 122) 47.222%, rgb(241, 82, 35) 94.444%)",
        },
    },
    { id: "all-patients", label: "All Patients", icon: { kind: "iconsax", Icon: Profile2User } },
    { id: "follow-ups", label: "Follow-ups", icon: { kind: "iconsax", Icon: CalendarAdd } },
    { id: "pharmacy", label: "Pharmacy", icon: { kind: "iconsax", Icon: Shop } },
    { id: "ipd", label: "IPD", icon: { kind: "iconsax", Icon: Hospital } },
    { id: "daycare", label: "Daycare", icon: { kind: "iconsax", Icon: DocumentLike } },
    { id: "bulk-messages", label: "Bulk Messages", icon: { kind: "iconsax", Icon: MessageProgramming } },
];
// RxPad sidebar items (RX Nav)
const rxNavItems = [
    { id: "past-visits", label: "Past Visits", icon: { kind: "iconsax", Icon: Note1 } },
    {
        id: "vitals",
        label: "Vitals",
        icon: { kind: "medical", name: "Heart Rate" },
        badge: {
            text: "New",
            gradient: "linear-gradient(257.32deg, rgb(22, 163, 74) 0%, rgb(68, 207, 119) 47.222%, rgb(22, 163, 74) 94.444%)",
        },
    },
    {
        id: "history",
        label: "History",
        icon: { kind: "medical", name: "clipboard-activity" },
        badge: {
            text: "Trial",
            gradient: "linear-gradient(257.32deg, rgb(241, 82, 35) 0%, rgb(255, 152, 122) 47.222%, rgb(241, 82, 35) 94.444%)",
        },
    },
    { id: "ophthal", label: "Ophthal", icon: { kind: "iconsax", Icon: Glass } },
    { id: "gynec", label: "Gynec", icon: { kind: "medical", name: "Gynec" } },
    { id: "obstetric", label: "Obstetric", icon: { kind: "medical", name: "Obstetric" } },
    { id: "vaccine", label: "Vaccine", icon: { kind: "medical", name: "injection" } },
    { id: "growth", label: "Growth", icon: { kind: "iconsax", Icon: Ruler } },
    { id: "records", label: "Records", icon: { kind: "iconsax", Icon: Notepad2 } },
    { id: "lab-results", label: "Lab Results", icon: { kind: "medical", name: "Lab" } },
    { id: "personal-notes", label: "Personal Notes", icon: { kind: "iconsax", Icon: DocumentText } },
];
const ICON_CLICKABLE_DARK_BG = "var(--tp-icon-clickable-dark-bg)";
const ICON_CLICKABLE_DARK_BG_HOVER = "var(--tp-icon-clickable-dark-bg-hover)";
const ICON_CLICKABLE_LIGHT_BG = "var(--tp-icon-clickable-light-bg)";
const ICON_CLICKABLE_LIGHT_BG_HOVER = "var(--tp-icon-clickable-light-bg-hover)";
/**
 * Standalone side navigation component.
 * Figma-aligned constraints:
 * - width: 80px
 * - height: 740px
 * - item padding: 12px 6px
 * - item internal gap: 6px
 * - label width: 68px
 * - bottom fade: 120px
 */
export function SecondaryNavPanel({ items, activeId, onSelect, variant = "rx", primaryIconTone = "slate", height = SECONDARY_NAV_TOKENS.panelHeight, bottomSpacerPx = 0, renderIcon, }) {
    const isRx = variant === "rx";
    // Match the exact same radial gradient used in the SecondarySidebar NavPanel
    // This uses an inline SVG with a radialGradient + gradientTransform for the precise Figma spec
    const rxNavBgImage = "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 80 1133\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(64.518 65.21 -19.503 89.302 -155.96 413.08)\"><stop stop-color=\"rgba(22,21,88,1)\" offset=\"0\"/><stop stop-color=\"rgba(35,34,119,1)\" offset=\"0.25\"/><stop stop-color=\"rgba(49,48,151,1)\" offset=\"0.5\"/><stop stop-color=\"rgba(75,74,213,1)\" offset=\"1\"/></radialGradient></defs></svg>'), linear-gradient(90deg,rgb(255,255,255) 0%,rgb(255,255,255) 100%)";
    const panelBackground = isRx ? undefined : "var(--tp-slate-0)";
    const bottomFade = isRx
        ? "linear-gradient(180deg, rgba(22, 21, 88, 0.00) 0%, #161558 100%)"
        : "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 80.62%)";
    return (_jsxs("nav", { className: "relative flex flex-col overflow-x-clip", style: {
            width: SECONDARY_NAV_TOKENS.panelWidth,
            height: typeof height === "number" ? `${height}px` : height,
            alignItems: "center",
            alignSelf: "stretch",
            borderRadius: 0,
            ...(isRx
                ? { backgroundImage: rxNavBgImage }
                : { background: panelBackground }),
        }, children: [_jsxs("div", { className: "flex flex-1 flex-col items-center gap-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden", children: [items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeId === item.id;
                        const isPrimarySlate = !isRx && primaryIconTone === "slate";
                        const itemTextColor = isRx ? "var(--tp-slate-0)" : "var(--tp-slate-700)";
                        const iconDefaultBg = isRx
                            ? ICON_CLICKABLE_DARK_BG
                            : isPrimarySlate
                                ? "var(--tp-slate-100)"
                                : ICON_CLICKABLE_LIGHT_BG;
                        const iconHoverBg = isRx
                            ? ICON_CLICKABLE_DARK_BG_HOVER
                            : isPrimarySlate
                                ? "var(--tp-slate-200)"
                                : ICON_CLICKABLE_LIGHT_BG_HOVER;
                        const iconDefaultColor = isRx
                            ? "var(--tp-slate-0)"
                            : isPrimarySlate
                                ? "var(--tp-slate-700)"
                                : "var(--tp-blue-500)";
                        const iconActiveBg = isRx ? "var(--tp-slate-0)" : "var(--tp-blue-500)";
                        const iconActiveColor = isRx ? "var(--tp-blue-500)" : "var(--tp-slate-0)";
                        const itemHoverBg = isRx
                            ? "rgba(255,255,255,0.12)"
                            : isPrimarySlate
                                ? "rgba(69,69,81,0.08)"
                                : "rgba(75,74,213,0.08)";
                        const activeItemBackground = isRx
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(75,74,213,0.12)";
                        return (_jsxs("button", { onClick: () => onSelect(item.id), className: "group relative isolate flex shrink-0 items-center transition-colors", style: {
                                width: SECONDARY_NAV_TOKENS.panelWidth,
                                backgroundColor: isActive ? activeItemBackground : "transparent",
                            }, children: [_jsxs("div", { className: "relative z-10 flex flex-1 flex-col items-center", style: {
                                        gap: SECONDARY_NAV_TOKENS.iconLabelGap,
                                        paddingInline: SECONDARY_NAV_TOKENS.itemPaddingX,
                                        paddingBlock: SECONDARY_NAV_TOKENS.itemPaddingY,
                                    }, children: [_jsxs("span", { className: "relative flex shrink-0 items-center justify-center transition-colors group-hover:scale-[1.02]", style: {
                                                width: SECONDARY_NAV_TOKENS.iconContainerSize,
                                                height: SECONDARY_NAV_TOKENS.iconContainerSize,
                                                borderRadius: SECONDARY_NAV_TOKENS.iconContainerRadius,
                                                backgroundColor: isActive
                                                    ? iconActiveBg
                                                    : iconDefaultBg,
                                            }, children: [!isActive && (_jsx("span", { className: "pointer-events-none absolute inset-0 z-0 rounded-[10px] opacity-0 transition-opacity group-hover:opacity-100", style: { backgroundColor: iconHoverBg } })), _jsx("span", { className: "relative z-10 inline-flex", children: renderIcon ? (renderIcon({
                                                        item,
                                                        isActive,
                                                        isRx,
                                                        iconSize: SECONDARY_NAV_TOKENS.iconSize,
                                                    })) : typeof item.icon === "function" ? ((() => {
                                                        const Icon = item.icon;
                                                        return (_jsx(Icon, { size: SECONDARY_NAV_TOKENS.iconSize, color: isActive ? iconActiveColor : iconDefaultColor }));
                                                    })()) : typeof item.icon === "object" && item.icon.kind === "iconsax" ? (_jsx(item.icon.Icon, { size: SECONDARY_NAV_TOKENS.iconSize, color: isActive ? iconActiveColor : iconDefaultColor, variant: isActive ? "Bulk" : "Linear" })) : typeof item.icon === "object" && item.icon.kind === "medical" ? (_jsx(TPMedicalIcon, { name: item.icon.name, variant: isActive ? "bulk" : "line", size: SECONDARY_NAV_TOKENS.iconSize, color: isActive ? iconActiveColor : iconDefaultColor })) : null })] }), _jsx("span", { className: "overflow-hidden text-center font-medium leading-[18px]", style: {
                                                width: SECONDARY_NAV_TOKENS.labelWidth,
                                                minWidth: SECONDARY_NAV_TOKENS.labelWidth,
                                                maxWidth: SECONDARY_NAV_TOKENS.labelWidth,
                                                fontFamily: "var(--font-sans)",
                                                fontSize: SECONDARY_NAV_TOKENS.labelSize,
                                                lineHeight: `${SECONDARY_NAV_TOKENS.labelLineHeight}px`,
                                                letterSpacing: `${SECONDARY_NAV_TOKENS.labelTracking}px`,
                                                color: itemTextColor,
                                                // Single word: truncate on one line
                                                // Multiple words: wrap to max 2 lines
                                                ...(item.label.trim().split(/\s+/).length === 1
                                                    ? {
                                                        display: "block",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                    }
                                                    : {
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                        wordBreak: "break-word",
                                                    }),
                                            }, children: item.label })] }), isActive && (_jsx("span", { className: "absolute left-0 top-0 bottom-0 z-20", style: {
                                        width: SECONDARY_NAV_TOKENS.highlightBarWidth,
                                        backgroundColor: isRx ? "var(--tp-slate-0)" : "var(--tp-blue-500)",
                                        borderTopRightRadius: SECONDARY_NAV_TOKENS.highlightBarRadius,
                                        borderBottomRightRadius: SECONDARY_NAV_TOKENS.highlightBarRadius,
                                    } })), isActive && isRx && (_jsx("span", { className: "absolute z-20", style: {
                                        right: 0,
                                        top: item.badge ? 40 : "50%",
                                        transform: item.badge ? "none" : "translateY(-50%)",
                                    }, children: _jsx("svg", { width: SECONDARY_NAV_TOKENS.arrowWidth, height: SECONDARY_NAV_TOKENS.arrowHeight, viewBox: "0 0 8 16", fill: "var(--tp-slate-0)", style: { display: "block" }, children: _jsx("path", { d: "M8 0L0 8L8 16V0Z" }) }) })), item.badge && (_jsx("span", { className: "absolute z-30 flex items-center justify-center font-medium", style: {
                                        top: 20.5,
                                        right: 0,
                                        fontSize: SECONDARY_NAV_TOKENS.badgeSize,
                                        lineHeight: "normal",
                                        color: "var(--tp-slate-0)", // semantic: text.inverse
                                        backgroundImage: item.badge.gradient,
                                        borderTopLeftRadius: SECONDARY_NAV_TOKENS.badgeRadius,
                                        borderBottomLeftRadius: SECONDARY_NAV_TOKENS.badgeRadius,
                                        paddingLeft: SECONDARY_NAV_TOKENS.badgePaddingLeft,
                                        paddingRight: SECONDARY_NAV_TOKENS.badgePaddingRight,
                                        paddingBlock: SECONDARY_NAV_TOKENS.badgePaddingY,
                                        fontFamily: "var(--font-sans)",
                                    }, children: item.badge.text })), !isActive && (_jsx("span", { className: "pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity group-hover:opacity-100", style: { backgroundColor: itemHoverBg } }))] }, item.id));
                    }), bottomSpacerPx > 0 ? (_jsx("div", { "aria-hidden": "true", style: { height: `${bottomSpacerPx}px` } })) : null] }), _jsx("div", { className: "pointer-events-none absolute left-0 z-10", style: {
                    width: SECONDARY_NAV_TOKENS.panelWidth,
                    height: SECONDARY_NAV_TOKENS.bottomFadeHeight,
                    bottom: 0,
                    background: bottomFade,
                } })] }));
}
export function SecondaryNavShowcase() {
    const [activeId, setActiveId] = useState("appointments");
    const [activeIdAlt, setActiveIdAlt] = useState("vitals");
    return (_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-bold uppercase tracking-wider text-tp-slate-500 mb-1", children: "Nav Panels" }), _jsx("p", { className: "text-xs text-tp-slate-400 mb-5", children: "80px fixed-width vertical rail navigation used in appointment and RxPad screens. Icons use TP Medical (clinical) + iconsax (utility) with Bulk/Linear variants for active/inactive states. Primary Nav: white surface, TP Slate icon containers (32px, r:10px), no selection arrow. RX Nav: dark blue radial gradient surface (#161558\u2192#232277\u2192#313097\u2192#4B4AD5), white icons, 3px left highlight bar (border-radius 12px right), right arrow (8\u00D716px white triangle) for active item. Desktop (\u22651024px): fixed sidebar, full height. Tablet (768\u20131024px): nav panel visible, 80px width maintained. Mobile (\u2264768px): hidden sidebar, replaced by horizontal chip strip. Content panel: 250px min, scales to clamp(250px, 26vw, 350px) on xl screens." }), _jsxs("div", { className: "flex flex-wrap gap-8 items-start", children: [_jsxs("div", { children: [_jsx("span", { className: "text-xs font-semibold text-tp-slate-600 block mb-2", children: "Primary Nav Panel (white surface)" }), _jsx(SecondaryNavPanel, { items: primaryNavItems, activeId: activeId, onSelect: setActiveId, variant: "primary" })] }), _jsxs("div", { children: [_jsx("span", { className: "text-xs font-semibold text-tp-slate-600 block mb-2", children: "RX Nav Panel (dark blue surface)" }), _jsx(SecondaryNavPanel, { items: rxNavItems, activeId: activeIdAlt, onSelect: setActiveIdAlt, variant: "rx" })] }), _jsxs("div", { className: "flex-1 min-w-[240px]", children: [_jsx("span", { className: "text-xs font-semibold text-tp-slate-600 block mb-3", children: "Design Token Mapping" }), _jsxs("div", { className: "flex flex-col gap-3 text-xs text-tp-slate-600", children: [_jsxs("div", { className: "flex items-start gap-2", children: [_jsx("span", { className: "w-3 h-3 shrink-0 rounded mt-0.5", style: { background: "linear-gradient(135deg, var(--tp-blue-900), var(--tp-blue-500))" } }), _jsxs("div", { children: [_jsx("strong", { children: "Panel background" }), _jsxs("div", { className: "text-tp-slate-400 mt-0.5", children: ["Radial gradient: ", _jsx("code", { children: "TP Blue/900" }), " \u2192 ", _jsx("code", { children: "TP Blue/800" }), " \u2192 ", _jsx("code", { children: "TP Blue/700" }), " \u2192 ", _jsx("code", { children: "TP Blue/500" })] })] })] }), _jsxs("div", { className: "flex items-start gap-2", children: [_jsx("span", { className: "w-3 h-3 shrink-0 rounded bg-white border border-tp-slate-200 mt-0.5" }), _jsxs("div", { children: [_jsx("strong", { children: "Active item" }), _jsxs("div", { className: "text-tp-slate-400 mt-0.5", children: ["Icon container: ", _jsx("code", { children: "bg.surface" }), " (TP Slate/0) \u2022 Icon: ", _jsx("code", { children: "icon.active" }), " (TP Blue/500) \u2022 Left bar: 3px ", _jsx("code", { children: "text.inverse" }), ", radius/lg right \u2022 Right arrow: 8\u00D716 ", _jsx("code", { children: "text.inverse" }), " triangle \u2022 Container bg: ", _jsx("code", { children: "color/white/-20%" })] })] })] }), _jsxs("div", { className: "flex items-start gap-2", children: [_jsx("span", { className: "w-3 h-3 shrink-0 rounded mt-0.5", style: { backgroundColor: "rgba(255,255,255,0.2)" } }), _jsxs("div", { children: [_jsx("strong", { children: "Inactive item" }), _jsxs("div", { className: "text-tp-slate-400 mt-0.5", children: ["Icon container: ", _jsx("code", { children: "color/white/-20%" }), " (rgba(255,255,255,0.2)) \u2022 Icon: ", _jsx("code", { children: "icon.inverse" }), " (TP Slate/0)"] })] })] }), _jsxs("div", { className: "flex items-start gap-2", children: [_jsx("span", { className: "w-3 h-3 shrink-0 rounded bg-tp-blue-500 mt-0.5" }), _jsxs("div", { children: [_jsx("strong", { children: "Label typography" }), _jsxs("div", { className: "text-tp-slate-400 mt-0.5", children: ["Inter Medium 12/18 \u2022 tracking: 0.1px \u2022 color: ", _jsx("code", { children: "text.inverse" }), " (TP Slate/0) \u2022 centered, ellipsis on overflow"] })] })] }), _jsxs("div", { className: "flex items-start gap-2", children: [_jsx("span", { className: "w-3 h-3 shrink-0 rounded mt-0.5", style: { background: "linear-gradient(257deg, #16A34A, #44CF77)" } }), _jsxs("div", { children: [_jsx("strong", { children: "Badges" }), _jsxs("div", { className: "text-tp-slate-400 mt-0.5", children: ["\"New\": green gradient pill (Success family) \u2022 \"Trial\": orange gradient pill \u2022 Text: ", _jsx("code", { children: "text.inverse" }), ", Inter Medium 10px \u2022 Shape: left-rounded 30px, flush right edge"] })] })] }), _jsxs("div", { className: "flex items-start gap-2", children: [_jsx("span", { className: "w-3 h-3 shrink-0 rounded mt-0.5", style: { background: "linear-gradient(to bottom, transparent, var(--tp-blue-900))" } }), _jsxs("div", { children: [_jsx("strong", { children: "Bottom fade" }), _jsxs("div", { className: "text-tp-slate-400 mt-0.5", children: ["120px gradient overlay: transparent \u2192 ", _jsx("code", { children: "TP Blue/900" })] })] })] }), _jsxs("div", { className: "mt-2 p-3 rounded-lg bg-tp-slate-50 border border-tp-slate-100", children: [_jsx("p", { className: "text-[11px] text-tp-slate-500 font-semibold mb-1.5", children: "Spacing & Dimensions" }), _jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-tp-slate-500", children: [_jsxs("span", { children: [_jsx("strong", { children: "Panel width:" }), " 80px"] }), _jsxs("span", { children: [_jsx("strong", { children: "Panel size:" }), " 80\u00D7740px"] }), _jsxs("span", { children: [_jsx("strong", { children: "Item padding:" }), " 12\u00D76px"] }), _jsxs("span", { children: [_jsx("strong", { children: "Icon-label gap:" }), " 6px (spacing/1.5)"] }), _jsxs("span", { children: [_jsx("strong", { children: "Label width:" }), " 68px fixed"] }), _jsxs("span", { children: [_jsx("strong", { children: "Icon container:" }), " 32px, r:10px"] }), _jsxs("span", { children: [_jsx("strong", { children: "Icon size:" }), " 20\u00D720px"] }), _jsxs("span", { children: [_jsx("strong", { children: "Highlight bar:" }), " 3px \u00D7 full h"] }), _jsxs("span", { children: [_jsx("strong", { children: "Arrow:" }), " 8\u00D716px triangle"] }), _jsxs("span", { children: [_jsx("strong", { children: "Badge padding:" }), " 4/2\u00D74px"] }), _jsxs("span", { children: [_jsx("strong", { children: "Bottom fade:" }), " 120px tall"] })] })] })] })] })] })] }));
}
export function ExpandedRxNavShowcase() {
    return (_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-bold uppercase tracking-wider text-tp-slate-500 mb-1", children: "RX Nav Panel \u2014 Expanded View" }), _jsx("p", { className: "text-xs text-tp-slate-400 mb-5", children: "Nav Panel (80px dark rail) + Content Panel (250px white, scrollable) orchestrated by SecondarySidebar. Click any nav item to expand its content \u2014 starts from Past Visits, then Vitals, History, Ophthal, Gynec, Obstetric, Vaccine, Growth, Records, Lab Results, and Personal Notes. Content panel: min-w 250px, max-w 350px (xl: clamp(250px, 26vw, 350px)). Section header: 40px, gradient bg (#3736A6\u2192#262688), title Inter SemiBold 14px white. Collapse icon: SidebarLeft (iconsax). Desktop: rail + expanded panel side by side. Tablet: rail only, content panel opens as overlay. The combined sidebar width is 80+250=330px (min) to 80+350=430px (max on xl)." }), _jsx("div", { className: "overflow-hidden rounded-xl", style: { height: 600 }, children: _jsx(SecondarySidebar, {}) })] }));
}
