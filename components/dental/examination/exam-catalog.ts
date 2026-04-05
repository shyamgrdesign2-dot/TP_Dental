/**
 * Catalog of common dental examinations, oral findings, and past procedures.
 * These are the quick-selection chips shown in the single-tooth side panel.
 */

export const DENTAL_EXAMS = [
  "Caries examination",
  "Mobility test",
  "Percussion test",
  "Vitality test (Cold)",
  "Vitality test (Electric)",
  "Probing depth",
  "Bleeding on probing",
  "Plaque score",
  "Occlusion check",
  "Radiograph reviewed",
] as const

export const ORAL_FINDINGS = [
  "Caries",
  "Fracture",
  "Crack",
  "Erosion",
  "Abrasion",
  "Attrition",
  "Staining",
  "Calculus",
  "Plaque",
  "Gingival recession",
  "Sensitivity",
  "Discoloration",
  "Restoration defect",
  "Abscess",
  "Mobility",
] as const

export const PAST_PROCEDURES = [
  "RCT completed",
  "Extraction",
  "Surgical extraction",
  "Crown placement",
  "Bridge work",
  "Implant placed",
  "Restoration (Composite)",
  "Restoration (Amalgam)",
  "Restoration (GIC)",
  "Scaling & Polishing",
  "Deep cleaning",
  "Veneer placed",
  "Orthodontic treatment",
  "Fluoride application",
] as const

export type DentalExam = (typeof DENTAL_EXAMS)[number]
export type OralFinding = (typeof ORAL_FINDINGS)[number]
export type PastProcedure = (typeof PAST_PROCEDURES)[number]
