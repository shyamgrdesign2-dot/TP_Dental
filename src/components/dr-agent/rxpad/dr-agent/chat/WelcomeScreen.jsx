import React from "react";
import styles from "./WelcomeScreen.module.scss";
import { cn } from "../../../utils";
import {
  Calendar2,
  DocumentText,
  Receipt1,
  Heart,
  StatusUp,
  MessageQuestion,
  ClipboardText,
  Activity,
  Hospital,
  Health,
  SearchStatus,
  Clock,
} from "iconsax-reactjs";

/**
 * WelcomeScreen — ChatGPT-style intro screen for Dr. Agent.
 *
 * Shown when the chat is empty (no messages sent yet).
 * Content adapts to the current page context.
 */

const ICON_SIZE = 18;

const CONTEXT_ACTIONS = {
  homepage: [
    {
      icon: <Heart size={ICON_SIZE} variant="Bulk" />,
      title: "Follow-up Dues",
      subtitle: "View overdue and pending follow-ups that need your attention today",
      message: "Follow-up dues today",
    },
    {
      icon: <StatusUp size={ICON_SIZE} variant="Bulk" />,
      title: "Weekly KPIs",
      subtitle: "Compare this week's clinic performance against your previous week",
      message: "Weekly KPI dashboard",
    },
    {
      icon: <Receipt1 size={ICON_SIZE} variant="Bulk" />,
      title: "Today's Collection",
      subtitle: "Get a quick summary of billing, advances, and outstanding dues",
      message: "Today's collection",
    },
    {
      icon: <Activity size={ICON_SIZE} variant="Bulk" />,
      title: "Chronic Conditions",
      subtitle:
        "See distribution of DM, HTN, and other chronic conditions in your clinic",
      message: "Condition distribution",
    },
  ],
  rxpad: [],
  patient_detail: [
    {
      icon: <DocumentText size={ICON_SIZE} variant="Bulk" />,
      title: "Patient Summary",
      subtitle: "Get a complete clinical overview including vitals, labs, and history",
      message: "Patient summary",
    },
    {
      icon: <Activity size={ICON_SIZE} variant="Bulk" />,
      title: "Vital Trends",
      subtitle: "Track blood pressure, weight, and SpO2 trends over recent visits",
      message: "Vital trends",
    },
    {
      icon: <ClipboardText size={ICON_SIZE} variant="Bulk" />,
      title: "Lab Results",
      subtitle: "Review recent lab values and flagged abnormal parameters",
      message: "Labs flagged",
    },
    {
      icon: <Calendar2 size={ICON_SIZE} variant="Bulk" />,
      title: "Last Visit",
      subtitle: "View the previous visit summary, prescriptions, and follow-up notes",
      message: "Last visit details",
    },
  ],
  billing: [
    {
      icon: <Receipt1 size={ICON_SIZE} variant="Bulk" />,
      title: "Today's Billing",
      subtitle: "View today's revenue collection and outstanding payment summary",
      message: "Show today's billing summary",
    },
    {
      icon: <StatusUp size={ICON_SIZE} variant="Bulk" />,
      title: "Revenue Trends",
      subtitle: "Compare weekly and monthly revenue to spot growth patterns",
      message: "Show revenue trends this week",
    },
    {
      icon: <Hospital size={ICON_SIZE} variant="Bulk" />,
      title: "Pending Dues",
      subtitle: "See patients with outstanding balances that need follow-up",
      message: "Show patients with pending dues",
    },
    {
      icon: <MessageQuestion size={ICON_SIZE} variant="Bulk" />,
      title: "Generate Invoice",
      subtitle: "Create and send a new invoice for a specific patient visit",
      message: "Help me generate an invoice",
    },
  ],
  default: [
    {
      icon: <Health size={ICON_SIZE} variant="Bulk" />,
      title: "Patient Summary",
      subtitle: "Get a complete clinical overview of the selected patient's history",
      message: "Show me this patient's summary",
    },
    {
      icon: <SearchStatus size={ICON_SIZE} variant="Bulk" />,
      title: "Lab Results",
      subtitle: "Review recent investigation reports and flagged abnormal values",
      message: "Show recent lab results",
    },
    {
      icon: <Calendar2 size={ICON_SIZE} variant="Bulk" />,
      title: "Today's Schedule",
      subtitle: "View today's appointment list and upcoming patient queue",
      message: "Show today's schedule",
    },
    {
      icon: <MessageQuestion size={ICON_SIZE} variant="Bulk" />,
      title: "Ask Anything",
      subtitle: "Ask clinical questions, guidelines, or anything about your practice",
      message: "What clinical guidelines apply here?",
    },
  ],
};

// ─── Patient action definitions ──────────────────────────────────────────────

const PATIENT_ACTION_INTAKE = {
  icon: <ClipboardText size={ICON_SIZE} variant="Bulk" />,
  title: "Reported by patient",
  subtitle: "Symptoms & history shared before the visit",
  message: "Show reported intake",
};
const PATIENT_ACTION_SUMMARY = {
  icon: <DocumentText size={ICON_SIZE} variant="Bulk" />,
  title: "Patient summary",
  subtitle: "Clinical overview with vitals, labs, and history",
  message: "Patient summary",
};
const PATIENT_ACTION_HISTORY = {
  icon: <Clock size={ICON_SIZE} variant="Bulk" />,
  title: "Medical history",
  subtitle: "Past visits, prescriptions, and treatment history",
  message: "Medical history",
};
const PATIENT_ACTION_VITALS = {
  icon: <Activity size={ICON_SIZE} variant="Bulk" />,
  title: "Today's vitals",
  subtitle: "View today's recorded vital parameters at a glance",
  message: "Today's vitals",
};
const PATIENT_ACTION_PAST_VISITS = {
  icon: <Calendar2 size={ICON_SIZE} variant="Bulk" />,
  title: "Past visit details",
  subtitle: "Previous visit prescriptions, follow-ups, and notes",
  message: "Last visit details",
};

function getSpecialtyAction(summary) {
  if (summary.obstetricData) {
    return {
      icon: <Health size={ICON_SIZE} variant="Bulk" />,
      title: "Obstetric history",
      subtitle: "ANC schedule, pregnancy parameters, and alerts",
      message: "Obstetric summary",
    };
  }
  if (summary.gynecData) {
    return {
      icon: <Health size={ICON_SIZE} variant="Bulk" />,
      title: "Gynec history",
      subtitle: "Menstrual cycle, screening, and gynec parameters",
      message: "Gynec summary",
    };
  }
  if (summary.pediatricsData) {
    return {
      icon: <Health size={ICON_SIZE} variant="Bulk" />,
      title: "Vaccination & growth",
      subtitle: "Growth chart, milestones, and vaccination schedule",
      message: "Growth & vaccines",
    };
  }
  if (summary.ophthalData) {
    return {
      icon: <Health size={ICON_SIZE} variant="Bulk" />,
      title: "Vision history",
      subtitle: "Visual acuity, IOP, and ophthalmic examination",
      message: "Vision summary",
    };
  }
  return null;
}

function buildPatientActions(summary) {
  if (!summary) {
    return [
      PATIENT_ACTION_SUMMARY,
      PATIENT_ACTION_HISTORY,
      PATIENT_ACTION_VITALS,
      PATIENT_ACTION_PAST_VISITS,
    ];
  }
  const hasIntake = !!summary.symptomCollectorData;
  const specialtyAction = getSpecialtyAction(summary);

  if (hasIntake && specialtyAction) {
    return [
      PATIENT_ACTION_INTAKE,
      PATIENT_ACTION_SUMMARY,
      PATIENT_ACTION_HISTORY,
      specialtyAction,
    ];
  }
  if (hasIntake && !specialtyAction) {
    return [
      PATIENT_ACTION_INTAKE,
      PATIENT_ACTION_SUMMARY,
      PATIENT_ACTION_HISTORY,
      PATIENT_ACTION_VITALS,
    ];
  }
  if (!hasIntake && specialtyAction) {
    return [
      PATIENT_ACTION_SUMMARY,
      PATIENT_ACTION_HISTORY,
      specialtyAction,
      PATIENT_ACTION_VITALS,
    ];
  }
  return [
    PATIENT_ACTION_SUMMARY,
    PATIENT_ACTION_HISTORY,
    PATIENT_ACTION_VITALS,
    PATIENT_ACTION_PAST_VISITS,
  ];
}

export function WelcomeScreen({
  context = "default",
  doctorName,
  patientName,
  hasIntake = false,
  summary,
  onActionClick,
}) {
  const actions =
    context === "rxpad" || context === "patient_detail"
      ? buildPatientActions(summary)
      : CONTEXT_ACTIONS[context] ?? CONTEXT_ACTIONS.default;
  const greeting = getGreeting();
  const displayName = doctorName ? `Dr. ${doctorName.split(" ")[0]}` : "Doctor";
  const isPatientContext = context === "rxpad" || context === "patient_detail";

  return (
    <div className={styles.root}>
      {/* Background — white base + animated gradient GIF at 4% opacity */}
      <div className={styles.bgWhite} />
      <div className={styles.bgGif} />

      {/* Spark icon */}
      <div className={styles.sparkOuter}>
        <span
          className={cn(styles.sparkWrapper, "pointer-events-none select-none")}
          aria-hidden="true"
        >
          <div className={cn(styles.sparkBase, "absolute inset-0 bg-white")} />
          <div className={cn(styles.sparkGif, "absolute inset-0")} />
          <img
            src="/new-assets/icons/dr-agent/agent-spark.svg"
            width={27}
            height={27}
            alt=""
            className="welcome-spark-rotate"
            draggable={false}
            style={{ position: "relative", zIndex: 10 }}
          />
        </span>
      </div>

      {/* Greeting */}
      <h2 className={styles.greeting}>
        {greeting}, {displayName}!
      </h2>

      {/* Subtitle */}
      <p
        className={styles.subtitle}
        title={
          isPatientContext && patientName
            ? `How can I help with patient ${patientName.split(" ")[0]}?`
            : undefined
        }
      >
        {isPatientContext && patientName ? (
          <>
            How can I help with patient{" "}
            <span className={styles.subtitlePatientName}>
              {patientName.split(" ")[0]}
            </span>
            ?
          </>
        ) : (
          "What can I assist you with today?"
        )}
      </p>

      {/* Quick action cards — 2×2 grid */}
      <div className={styles.actionsGrid}>
        {actions.map((action, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onActionClick(action.message)}
            className={cn("welcome-canned-card", styles.actionCard)}
          >
            {/* Gradient background overlay */}
            <div className={styles.actionCardGif} />
            {/* Icon */}
            <span
              className={cn(styles.actionCardIcon, "welcome-icon-grad")}
            >
              {action.icon}
            </span>
            {/* Title */}
            <span className={styles.actionCardTitle}>{action.title}</span>
            {/* Subtitle */}
            <span
              className={cn(
                styles.actionCardSubtitle,
                "welcome-card-subtitle"
              )}
            >
              {action.subtitle}
            </span>
          </button>
        ))}
      </div>

      {/* Gradient color for welcome card icons + spark rotation + hover/active card effects */}
      {/* da-* styles live in globals.css */}
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <linearGradient
            id="welcomeIconGrad"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#BE6DCF" />
            <stop offset="100%" stopColor="#5351BD" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
