import { cn } from "../../../utils";
import styles from "./SuggestionBar.module.scss";

/**
 * Horizontal scrollable suggestion chips — rendered above the input box.
 * Shows contextual follow-up actions from the last assistant response.
 * Styled distinctly from PillBar (outline chips vs gradient pills).
 */
export function SuggestionBar({
  suggestions,
  onTap,
  disabled = false,
  className,
}) {
  if (suggestions.length === 0) return null;

  return (
    <div
      className={cn(styles.bar, className)}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {suggestions.map((s, i) => (
        <button
          key={i}
          type="button"
          onClick={() => !disabled && onTap(s.message)}
          disabled={disabled}
          className={cn(styles.chip, disabled && styles.chipDisabled)}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
