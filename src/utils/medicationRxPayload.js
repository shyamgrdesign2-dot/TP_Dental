/**
 * Snap / Smart / Voice / Ambient save & PATCH: keep manual edits on groundedMedicineName (not name).
 * Fills grounded + refinedName when missing, using legacy groundingMedicineName or name as fallback.
 */
export function ensureMedicationGroundedForRxSave(item) {
  if (!item || typeof item !== "object") return item;
  const next = { ...item };
  const grounded = String(
    next.groundedMedicineName ?? next.groundingMedicineName ?? ""
  ).trim();
  const sourceName = String(next.name ?? "").trim();
  if (grounded) {
    next.groundedMedicineName = grounded;
    if (!String(next.refinedName ?? "").trim()) next.refinedName = grounded;
  } else if (sourceName) {
    next.groundedMedicineName = sourceName;
    if (!String(next.refinedName ?? "").trim()) next.refinedName = sourceName;
  }
  return next;
}

export function ensureLabInvestigationMetadataForRxSave(item) {
  if (!item || typeof item !== "object") return item;
  const next = { ...item };
  const metadata = {
    ...(next.metadata && typeof next.metadata === "object" ? next.metadata : {}),
  };

  if (next.isFuzzyCorrected !== undefined && metadata.isFuzzyCorrected === undefined) {
    metadata.isFuzzyCorrected = next.isFuzzyCorrected;
  }
  if (next.fuzzyCorrectedName && !metadata.fuzzyCorrectedName) {
    metadata.fuzzyCorrectedName = next.fuzzyCorrectedName;
  }
  if (next.originalName && !metadata.originalName) {
    metadata.originalName = next.originalName;
  }

  if (Object.keys(metadata).length > 0) {
    next.metadata = metadata;
  }

  return next;
}
