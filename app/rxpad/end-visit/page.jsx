import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from "react";
import { EndVisitPage } from "@/components/tp-rxpad/EndVisitPage";
export const metadata = {
    title: "End Visit — TatvaPractice",
    description: "End Visit screen with bill and Rx actions.",
};
export default function Page() {
    return (_jsx(Suspense, { fallback: null, children: _jsx(EndVisitPage, {}) }));
}
