import * as React from "react";
import { useCallback, useState } from "react";
import { FeedbackBottomSheet } from "../rxpad/dr-agent/shell/FeedbackBottomSheet";
import {
  Download,
  MoreVertical,
  Printer
} from "../atoms/icons/lucide";
import { VoiceRxIcon } from "./voice-consult-icons";
import { CopyIcon } from "../rxpad/dr-agent/cards/CopyIcon";
import { toast } from "./toast";
import styles from "./VoiceRxResultTabs.module.scss";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../molecules/Tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../molecules/DropdownMenu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, HoverTooltip } from "../atoms/Tooltip";
import { ClinicalNotesEditor, emrSectionsToHtml } from "./ClinicalNotesEditor";
import { DictationTranscript } from "./VoiceTranscriptProcessingCard";
import { DocumentText, Like1, Dislike, Microphone2, Health, InfoCircle, Copy as CopyGlyph } from "iconsax-reactjs";

function downloadTextFile({ filename, text }) {
  if (typeof document === "undefined" || typeof URL === "undefined" || !text) return;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function VoiceRxResultTabs({
  modeLabel = "Conversation Mode",
  transcript,
  emrSections,
  emrCard,
  clinicalNotesHtml,
  audioQuality = "good",
  initialTab = "emr",
  feedback: feedbackProp,
  onClinicalNotesChange,
  onFeedback,
  onCopyToRx,
  onBack,
  onMinimize,
  onAddDetailsByVoice,
  onPrint
}) {
  const [tab, setTab] = useState(initialTab);
  const [feedback, setFeedback] = useState(
    feedbackProp ?? { transcript: null, emr: null, clinical: null }
  );
  const [notesHtml, setNotesHtml] = useState(
    clinicalNotesHtml ?? emrSectionsToHtml(emrSections)
  );

  const handleNotesChange = useCallback(
    (html) => {
      setNotesHtml(html);
      onClinicalNotesChange?.(html);
    },
    [onClinicalNotesChange]
  );

  const handleFeedback = useCallback(
    (kind, value) => {
      setFeedback((prev) => ({ ...prev, [kind]: prev[kind] === value ? null : value }));
      onFeedback?.(kind, value);
    },
    [onFeedback]
  );

  const copyCurrent = useCallback(async () => {
    let text = "";
    if (tab === "transcript") text = transcript;
    else if (tab === "emr") text = emrSectionsToPlainText(emrSections);
    else text = htmlToPlainText(notesHtml);
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Couldn't copy — try again");
    }
  }, [tab, transcript, emrSections, notesHtml]);

  return (
    <div className={["vrx-result-tabs vrx-result-tabs--enter", styles.root].join(" ")}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <span className={["vrx-rt-mode-pill", styles.modePill].join(" ")}>
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to chat"
            className={["vrx-rt-back", styles.backBtn].join(" ")}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className={[styles.modePillLabel, styles.modePillLabelText].join(" ")}>{modeLabel}</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="More options"
                className={[styles.kebabBtn].join(" ")}
                onClick={(e) => e.stopPropagation()}>
                <MoreVertical size={14} strokeWidth={2.2} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className={styles.dropdownContent}>
              <div className={styles.dropdownSessionHeader}>Current Session: VRX-8149</div>
              <DropdownMenuSeparator className={styles.dropdownSeparator} />
              <div className={styles.dropdownSectionLabel}>Session History</div>
              <DropdownMenuItem className={styles.dropdownItem}>
                <span>12 Oct, Consultation</span>
                <span className={styles.dropdownItemMeta}>View</span>
              </DropdownMenuItem>
              <DropdownMenuItem className={styles.dropdownItem}>
                <span>10 Oct, Follow-up</span>
                <span className={styles.dropdownItemMeta}>View</span>
              </DropdownMenuItem>
              <DropdownMenuItem className={styles.dropdownItem}>
                <span>05 Oct, Initial Visit</span>
                <span className={styles.dropdownItemMeta}>View</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className={styles.dropdownSeparator} />
              <DropdownMenuItem className={styles.dropdownItem}>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
        <div className={styles.topBarRight}>
          {onMinimize && (
            <button
              type="button"
              onClick={onMinimize}
              aria-label="Minimize agent"
              className={["vrx-rt-glossy", styles.minimizeBtn].join(" ")}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="3.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="M9 3v18" stroke="currentColor" strokeWidth="1.7" />
                <path d="M13 9l3 3-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v)} className={styles.tabsRoot}>
        <div className={styles.tabsStripWrap}>
          <TabsList className={["vrx-rt-tabs", styles.tabsList].join(" ")}>
            <TabsTrigger
              value="transcript"
              className={[styles.tabTrigger, tab === "transcript" ? styles.tabTriggerActive : styles.tabTriggerInactive].join(" ")}>
              <Microphone2 size={15} variant={tab === "transcript" ? "Bulk" : "Linear"} color="currentColor" /> Transcript
            </TabsTrigger>
            <TabsTrigger
              value="emr"
              className={[styles.tabTrigger, tab === "emr" ? styles.tabTriggerActive : styles.tabTriggerInactive].join(" ")}>
              <Health size={15} variant={tab === "emr" ? "Bulk" : "Linear"} color="currentColor" /> TP EMR
            </TabsTrigger>
            <TabsTrigger
              value="clinical"
              className={[styles.tabTrigger, tab === "clinical" ? styles.tabTriggerActive : styles.tabTriggerInactive].join(" ")}>
              <DocumentText size={15} variant={tab === "clinical" ? "Bulk" : "Linear"} color="currentColor" /> Clinical Notes
            </TabsTrigger>
          </TabsList>
        </div>

        <div className={styles.tabsBody}>
          <TabsContent value="transcript" className={styles.tabContent}>
            <TranscriptPane transcript={transcript} audioQuality={audioQuality} />
            <FeedbackRow
              value={feedback.transcript}
              onChange={(v) => handleFeedback("transcript", v)}
              audioQuality={audioQuality}
              transcriptText={transcript} />
          </TabsContent>
          <TabsContent value="emr" className={styles.tabContent}>
            <div className={["vrx-rt-emr-shell", styles.emrShell].join(" ")}>
              <div className={styles.emrShellInner}>
                {emrCard ?? <EmrPaneFallback sections={emrSections} />}
              </div>
            </div>
            <FeedbackRow value={feedback.emr} onChange={(v) => handleFeedback("emr", v)} />
          </TabsContent>
          <TabsContent value="clinical" className={[styles.tabContent, styles.tabContentClinical].join(" ")}>
            <ClinicalPane html={notesHtml} onChange={handleNotesChange} />
          </TabsContent>
        </div>

        <StickyFooter
          tab={tab}
          onCopyToRx={onCopyToRx}
          onCopyClipboard={copyCurrent}
          onPrint={() => onPrint?.(tab)}
          onAddVoice={onAddDetailsByVoice} />
      </Tabs>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function TranscriptPane({ transcript }) {
  if (!transcript) {
    return (
      <div className={styles.transcriptEmpty}>
        <div className={styles.transcriptEmptyInner}>
          <p className={styles.transcriptEmptyText}>No transcript captured.</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.transcriptPane}>
      <div className={["vrx-transcript-frame", styles.transcriptFrame].join(" ")}>
        <DictationTranscript raw={transcript} animate={false} />
      </div>
    </div>
  );
}

function EmrPaneFallback({ sections }) {
  if (!sections.length) {
    return (
      <div className={styles.emrEmpty}>No EMR data yet.</div>
    );
  }
  return (
    <div className={styles.emrSections}>
      {sections.map((s) => (
        <div key={s.id} className={styles.emrSection}>
          <div className={styles.emrSectionHeader}>
            <h4 className={styles.emrSectionTitle}>{s.title}</h4>
          </div>
          {s.items.length ? (
            <div className={styles.emrItems}>
              {s.items.map((it, i) => (
                <div key={i} className={styles.emrItem}>
                  <span className={styles.emrItemDot} aria-hidden />
                  <p>{it}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emrItemEmpty}>No content</p>
          )}
        </div>
      ))}
    </div>
  );
}

function ClinicalPane({ html, onChange }) {
  return <ClinicalNotesEditor value={html} onChange={onChange} />;
}

export function FeedbackRow({ value, onChange, audioQuality, timestamp, transcriptText }) {
  const [downSheetOpen, setDownSheetOpen] = React.useState(false);
  const isTranscriptRow = Boolean(audioQuality);
  const handleDown = () => {
    onChange("down");
    setDownSheetOpen(true);
  };
  return (
    <div className={styles.feedbackRow}>
      {!isTranscriptRow && (
        <>
          <button
            type="button"
            onClick={() => onChange("up")}
            className={[styles.feedbackBtn, value === "up" ? styles.feedbackBtnUp : styles.feedbackBtnNeutral].join(" ")}>
            <Like1 size={14} variant={value === "up" ? "Bold" : "Linear"} />
          </button>
          <button
            type="button"
            onClick={handleDown}
            className={[styles.feedbackBtn, value === "down" ? styles.feedbackBtnDown : styles.feedbackBtnNeutral].join(" ")}>
            <Dislike size={14} variant={value === "down" ? "Bold" : "Linear"} />
          </button>
        </>
      )}

      {audioQuality && (
        <>
          <div className={styles.audioQualityWrap}>
            Audio quality: {audioQuality.charAt(0).toUpperCase() + audioQuality.slice(1)}
            <HoverTooltip content="Audio was clear and easily processed by the AI models." side="top">
              <button type="button" className={styles.infoBtn}>
                <InfoCircle size={14} variant="Linear" />
              </button>
            </HoverTooltip>
          </div>
          <span aria-hidden className="vrx-fb-divider mx-[6px]" />
          <HoverTooltip content="Download transcript" side="bottom" align="start">
            <button
              type="button"
              onClick={() => {
                downloadTextFile({
                  filename: `transcript-${new Date().toISOString().slice(0, 10)}.txt`,
                  text: transcriptText || ""
                });
                toast.success("Transcript downloaded");
              }}
              aria-label="Download transcript"
              className={styles.downloadBtn}>
              <Download size={14} strokeWidth={2.2} />
            </button>
          </HoverTooltip>
        </>
      )}

      {timestamp ? (
        <>
          <span aria-hidden className="vrx-fb-divider mx-[6px]" />
          <span className={styles.timestampLabel}>{timestamp}</span>
        </>
      ) : null}
      {!isTranscriptRow && (
        <FeedbackBottomSheet
          isOpen={downSheetOpen}
          onClose={() => setDownSheetOpen(false)}
          onSubmit={() => {
            setDownSheetOpen(false);
            toast.success("Thanks — feedback submitted");
          }} />
      )}
    </div>
  );
}

function StickyFooter({ tab, onCopyToRx, onCopyClipboard, onPrint, onAddVoice }) {
  let primaryLabel = "Copy all to RxPad";
  let primaryIcon = <CopyGlyph size={16} variant="Linear" color="currentColor" />;
  let primaryAction = onCopyToRx ?? onCopyClipboard;

  if (tab === "transcript") {
    primaryLabel = "Copy to Clipboard";
    primaryAction = onCopyClipboard;
  }

  const primaryHelp =
    tab === "transcript" ? "Copy the full conversation transcript to your clipboard" :
      "Fill all of these structured sections into the active RxPad";

  return (
    <div className={styles.stickyFooter}>
      <div className={styles.stickyFooterRow}>
        <HoverTooltip content={primaryHelp} side="top" fill>
          <button
            type="button"
            onClick={primaryAction}
            disabled={!primaryAction}
            className={["vrx-rt-primary", styles.primaryCta].join(" ")}>
            {primaryIcon}
            {primaryLabel}
          </button>
        </HoverTooltip>

        <HoverTooltip content="Quickly edit the clinical notes using voice AI" side="top" align="end">
          <button
            type="button"
            onClick={onAddVoice}
            disabled={!onAddVoice}
            aria-label="Edit clinical notes with voice"
            className={["vrx-rt-voice-cta-outline", styles.voiceCta].join(" ")}>
            <VoiceRxIcon size={20} color="#673AAC" />
          </button>
        </HoverTooltip>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function sectionToPlainText(s) {
  const lines = s.items.map((i) => `• ${i}`).join("\n");
  return `${s.title}:\n${lines || "—"}`;
}

export function emrSectionsToPlainText(sections) {
  return sections.map(sectionToPlainText).join("\n\n");
}

function htmlToPlainText(html) {
  if (typeof document === "undefined") return html.replace(/<[^>]+>/g, "");
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  tmp.querySelectorAll("h1, h2, h3, p, li").forEach((el) => {
    el.appendChild(document.createTextNode("\n"));
  });
  tmp.querySelectorAll("li").forEach((el) => {
    el.insertBefore(document.createTextNode("• "), el.firstChild);
  });
  return (tmp.textContent || "").replace(/\n{3,}/g, "\n\n").trim();
}
