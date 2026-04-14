"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bell } from "lucide-react";
const REF_LOGO = "/assets/b38df11ad80d11b9c1d530142443a18c2f53d406.png";
const REF_AVATAR = "/assets/52cb18088c5b8a5db6a7711c9900d7d08a1bac42.png";
export function TopHeader() {
    return (_jsxs("header", { className: "flex h-[62px] shrink-0 items-center border-b border-tp-slate-100 bg-tp-slate-0 px-4 py-2.5", children: [_jsx("div", { className: "flex min-w-0 flex-1 items-center", children: _jsx("img", { src: REF_LOGO, alt: "TatvaPractice", className: "h-8 w-auto object-contain" }) }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { type: "button", className: "relative flex items-center justify-center rounded-lg p-2 text-tp-slate-600 transition-colors hover:bg-tp-slate-100", children: _jsx(Bell, { size: 20 }) }), _jsx("img", { src: REF_AVATAR, alt: "Profile", className: "h-9 w-9 rounded-full border border-tp-slate-200 object-cover" })] })] }));
}
