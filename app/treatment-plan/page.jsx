import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Mulish } from "next/font/google";
import { TreatmentPlanPage } from "@/components/dental/plan/TreatmentPlanPage";
const mulish = Mulish({
    subsets: ["latin"],
    variable: "--font-heading",
    weight: ["400", "500", "600", "700", "800"],
});
export const metadata = {
    title: "Dental Treatment Plan — TatvaPractice",
    description: "Manage dental treatment plans, estimates, progress and completion.",
};
export default function TreatmentPlanRoute() {
    return (_jsx("div", { className: mulish.variable, children: _jsxs("div", { style: { animation: "pageSlideInRight 400ms cubic-bezier(0.16, 1, 0.3, 1) both" }, children: [_jsx("style", { children: `
          @keyframes pageSlideInRight {
            from { opacity: 0; transform: translateX(100px); }
            to   { opacity: 1; transform: translateX(0); }
          }
        ` }), _jsx(TreatmentPlanPage, {})] }) }));
}
