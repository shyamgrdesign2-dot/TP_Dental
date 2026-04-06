/**
 * plan-mock-data.ts — Realistic demo data for treatment plans.
 *
 * apt-1 (Shyam GR): 3 plans covering draft, in-progress, completed
 * apt-6 (if needed): 1 plan
 */

import type { TreatmentPlan, SurfaceId } from "./plan-types"

// ─── apt-1: Shyam GR ───────────────────────────────────────

const PRIMARY_CARE_PLAN: TreatmentPlan = {
  id: "plan-001",
  name: "Primary Care Plan",
  patientId: "apt-1",
  createdAt: "2026-03-15",
  updatedAt: "2026-04-03",
  status: "in-progress",
  notes: "Priority treatment — patient reports sensitivity and pain.",
  services: [
    {
      id: "svc-001",
      planId: "plan-001",
      treatment: "Root Canal Treatment",
      toothFdi: "36",
      toothLabel: "Lower Left First Molar",
      surfaces: ["occlusal", "root"],
      rate: 8000,
      discount: 0,
      amount: 8000,
      status: "in-progress",
      startedAt: "2026-04-03",
      sittings: [
        {
          id: "sit-001",
          date: "3 Apr 2026",
          doctor: "Dr. Sheela B R",
          notes: "Initial debridement, access opening, BMP placed",
        },
        {
          id: "sit-002",
          date: "10 Apr 2026",
          doctor: "Dr. Sheela B R",
          notes: "Canal shaping + obturation completed",
        },
      ],
      procedures: [
        {
          id: "proc-001",
          name: "Access opening",
          date: "3 Apr 2026",
          doctor: "Dr. Sheela B R",
        },
        {
          id: "proc-002",
          name: "BMP placement",
          date: "3 Apr 2026",
          doctor: "Dr. Sheela B R",
        },
        {
          id: "proc-003",
          name: "Obturation",
          date: "10 Apr 2026",
          doctor: "Dr. Sheela B R",
        },
      ],
    },
    {
      id: "svc-002",
      planId: "plan-001",
      treatment: "Restoration (Composite Filling)",
      toothFdi: "16",
      toothLabel: "Upper Right First Molar",
      surfaces: ["buccal", "occlusal"],
      rate: 2000,
      discount: 0,
      amount: 2000,
      status: "in-progress",
      startedAt: "2026-04-03",
      sittings: [],
      procedures: [],
    },
    {
      id: "svc-003",
      planId: "plan-001",
      treatment: "Scaling & Polishing",
      toothFdi: "full-mouth",
      toothLabel: "Full Mouth",
      surfaces: [],
      rate: 1500,
      discount: 0,
      amount: 1500,
      status: "in-progress",
      startedAt: "2026-04-03",
      sittings: [],
      procedures: [],
    },
  ],
}

const WISDOM_TOOTH_PLAN: TreatmentPlan = {
  id: "plan-002",
  name: "Wisdom Tooth Removal",
  patientId: "apt-1",
  createdAt: "2026-04-05",
  updatedAt: "2026-04-05",
  status: "draft",
  notes: "All four wisdom teeth — patient wants elective removal.",
  services: [
    {
      id: "svc-004",
      planId: "plan-002",
      treatment: "Wisdom Tooth Removal",
      toothFdi: "18",
      toothLabel: "Upper Right Third Molar",
      surfaces: [],
      rate: 5000,
      discount: 0,
      amount: 5000,
      status: "planned",
      sittings: [],
      procedures: [],
    },
    {
      id: "svc-005",
      planId: "plan-002",
      treatment: "Wisdom Tooth Removal",
      toothFdi: "28",
      toothLabel: "Upper Left Third Molar",
      surfaces: [],
      rate: 5000,
      discount: 0,
      amount: 5000,
      status: "planned",
      sittings: [],
      procedures: [],
    },
    {
      id: "svc-006",
      planId: "plan-002",
      treatment: "Wisdom Tooth Removal",
      toothFdi: "38",
      toothLabel: "Lower Left Third Molar",
      surfaces: [],
      rate: 5000,
      discount: 0,
      amount: 5000,
      status: "planned",
      sittings: [],
      procedures: [],
    },
    {
      id: "svc-007",
      planId: "plan-002",
      treatment: "Wisdom Tooth Removal",
      toothFdi: "48",
      toothLabel: "Lower Right Third Molar",
      surfaces: [],
      rate: 5000,
      discount: 0,
      amount: 5000,
      status: "planned",
      sittings: [],
      procedures: [],
    },
  ],
}

const CROWN_REPLACEMENT_PLAN: TreatmentPlan = {
  id: "plan-003",
  name: "Crown Replacement",
  patientId: "apt-1",
  createdAt: "2026-02-10",
  updatedAt: "2026-03-20",
  status: "completed",
  services: [
    {
      id: "svc-008",
      planId: "plan-003",
      treatment: "Crown (PFM)",
      toothFdi: "26",
      toothLabel: "Upper Left First Molar",
      surfaces: ["occlusal", "buccal"],
      rate: 6000,
      discount: 500,
      amount: 5500,
      status: "completed",
      startedAt: "2026-02-15",
      completedAt: "2026-03-20",
      sittings: [
        {
          id: "sit-003",
          date: "15 Feb 2026",
          doctor: "Dr. Sheela B R",
          notes: "Tooth preparation, impression taken",
        },
        {
          id: "sit-004",
          date: "20 Mar 2026",
          doctor: "Dr. Sheela B R",
          notes: "PFM crown cemented, occlusion checked",
        },
      ],
      procedures: [
        {
          id: "proc-004",
          name: "Tooth preparation",
          date: "15 Feb 2026",
          doctor: "Dr. Sheela B R",
        },
        {
          id: "proc-005",
          name: "Impression & temporary crown",
          date: "15 Feb 2026",
          doctor: "Dr. Sheela B R",
        },
        {
          id: "proc-006",
          name: "PFM crown cementation",
          date: "20 Mar 2026",
          doctor: "Dr. Sheela B R",
        },
      ],
    },
  ],
}

// ─── Export ──────────────────────────────────────────────────

export function getMockPlans(patientId: string): TreatmentPlan[] {
  if (patientId === "apt-1") {
    return [PRIMARY_CARE_PLAN, WISDOM_TOOTH_PLAN, CROWN_REPLACEMENT_PLAN]
  }
  // Other patients get an empty state
  return []
}
