import type { RxAgentChatMessage } from "../types"

/** Opening line above the quick clinical snapshot quote in chat. */
export function situationAtGlanceAssistantLeadIn(patientLabel?: string | null): string {
  const label = patientLabel?.trim()
  if (label) {
    return `Here's ${label}'s clinical snapshot.`
  }
  return "Here's a clinical snapshot."
}

/** Situation-at-a-glance uses text_quote with empty source (clinical guideline quotes set source). */
export function isSituationAtGlanceAssistantMessage(message: RxAgentChatMessage): boolean {
  if (message.role !== "assistant") return false
  if (message.rxOutput?.kind !== "text_quote") return false
  const src = message.rxOutput.data.source?.trim() ?? ""
  return src === ""
}

/** Avoid duplicate quick snapshot when intro + auto-send or repeated AI-icon opens race. */
export function threadAlreadyHasQuickClinicalGlance(
  msgs: RxAgentChatMessage[],
  promptLower: string,
): boolean {
  return msgs.some((m) => {
    if (m.role === "user" && m.text.trim().toLowerCase() === promptLower) return true
    return isSituationAtGlanceAssistantMessage(m)
  })
}
