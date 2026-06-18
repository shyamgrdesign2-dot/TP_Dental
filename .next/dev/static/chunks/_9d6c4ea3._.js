(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/rx/sample-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Sample Data for RX Workspace
 * ─────────────────────────────
 * Realistic medical data for component development and testing.
 * All data is fictional and for demonstration purposes only.
 */ __turbopack_context__.s([
    "diagnosisSuggestions",
    ()=>diagnosisSuggestions,
    "examinationSuggestions",
    ()=>examinationSuggestions,
    "labInvestigationSuggestions",
    ()=>labInvestigationSuggestions,
    "medicationSuggestions",
    ()=>medicationSuggestions,
    "sampleDocuments",
    ()=>sampleDocuments,
    "sampleFollowUps",
    ()=>sampleFollowUps,
    "sampleGrowth",
    ()=>sampleGrowth,
    "sampleGynec",
    ()=>sampleGynec,
    "sampleHistory",
    ()=>sampleHistory,
    "sampleLabReports",
    ()=>sampleLabReports,
    "sampleObstetric",
    ()=>sampleObstetric,
    "sampleOphthal",
    ()=>sampleOphthal,
    "samplePastVisits",
    ()=>samplePastVisits,
    "samplePatient",
    ()=>samplePatient,
    "sampleVaccines",
    ()=>sampleVaccines,
    "sampleVitals",
    ()=>sampleVitals,
    "symptomSuggestions",
    ()=>symptomSuggestions
]);
const samplePatient = {
    id: "PAT-001",
    name: "Rajesh Kumar",
    age: 34,
    gender: "Male",
    bloodGroup: "B+",
    phone: "+91 98765 43210",
    uhid: "TP-2024-00142"
};
const samplePastVisits = [
    {
        id: "pv-1",
        date: "2025-06-24",
        visitType: "OPD",
        doctorName: "Dr. Ananya Sharma",
        speciality: "General Medicine",
        symptoms: [
            "Fever",
            "Headache",
            "Body ache",
            "Sore throat"
        ],
        examination: [
            "Throat — Congested, mild erythema",
            "Chest — Clear, bilateral air entry equal",
            "Abdomen — Soft, non-tender"
        ],
        diagnosis: [
            "Acute Upper Respiratory Infection",
            "Viral Pharyngitis"
        ],
        medications: [
            {
                name: "Paracetamol 500mg",
                dosage: "1 Tab",
                frequency: "1-0-1",
                duration: "5 Days"
            },
            {
                name: "Cetirizine 10mg",
                dosage: "1 Tab",
                frequency: "0-0-1",
                duration: "5 Days"
            },
            {
                name: "Azithromycin 500mg",
                dosage: "1 Tab",
                frequency: "1-0-0",
                duration: "3 Days"
            }
        ],
        advices: [
            "Warm saline gargles thrice daily",
            "Plenty of fluids",
            "Rest for 2-3 days"
        ],
        followUp: "5 Days",
        notes: "Patient advised to revisit if fever persists beyond 3 days"
    },
    {
        id: "pv-2",
        date: "2025-05-10",
        visitType: "OPD",
        doctorName: "Dr. Ananya Sharma",
        speciality: "General Medicine",
        symptoms: [
            "Cough",
            "Running nose",
            "Mild fever"
        ],
        examination: [
            "Throat — Normal",
            "Chest — Occasional rhonchi, no crepitations",
            "Vitals — Stable"
        ],
        diagnosis: [
            "Common Cold",
            "Acute Bronchitis"
        ],
        medications: [
            {
                name: "Ambroxol 30mg",
                dosage: "1 Tab",
                frequency: "1-0-1",
                duration: "5 Days"
            },
            {
                name: "Levocetirizine 5mg",
                dosage: "1 Tab",
                frequency: "0-0-1",
                duration: "3 Days"
            }
        ],
        advices: [
            "Steam inhalation twice daily",
            "Avoid cold beverages"
        ],
        followUp: "1 Week"
    },
    {
        id: "pv-3",
        date: "2025-03-15",
        visitType: "Teleconsult",
        doctorName: "Dr. Priya Mehta",
        speciality: "Dermatology",
        symptoms: [
            "Skin rash",
            "Itching on arms"
        ],
        examination: [
            "Erythematous papular rash on bilateral forearms",
            "No vesicles or pustules"
        ],
        diagnosis: [
            "Contact Dermatitis"
        ],
        medications: [
            {
                name: "Hydroxyzine 25mg",
                dosage: "1 Tab",
                frequency: "0-0-1",
                duration: "7 Days"
            },
            {
                name: "Mometasone Cream",
                dosage: "Apply thin layer",
                frequency: "1-0-1",
                duration: "7 Days"
            }
        ],
        advices: [
            "Avoid contact with suspected allergen",
            "Use mild soap",
            "Wear cotton clothing"
        ],
        followUp: "2 Weeks"
    }
];
const sampleVitals = [
    {
        id: "v-1",
        date: "2025-06-24",
        bloodPressure: {
            systolic: 128,
            diastolic: 82,
            status: "normal"
        },
        temperature: {
            value: 99.2,
            unit: "F",
            status: "warning"
        },
        heartRate: {
            value: 88,
            status: "normal"
        },
        respiratoryRate: {
            value: 18,
            status: "normal"
        },
        spO2: {
            value: 97,
            status: "normal"
        },
        weight: {
            value: 72,
            unit: "kg"
        },
        height: {
            value: 175,
            unit: "cm"
        },
        bmi: {
            value: 23.5,
            status: "normal"
        }
    },
    {
        id: "v-2",
        date: "2025-05-10",
        bloodPressure: {
            systolic: 122,
            diastolic: 78,
            status: "normal"
        },
        temperature: {
            value: 98.6,
            unit: "F",
            status: "normal"
        },
        heartRate: {
            value: 76,
            status: "normal"
        },
        respiratoryRate: {
            value: 16,
            status: "normal"
        },
        spO2: {
            value: 98,
            status: "normal"
        },
        weight: {
            value: 71.5,
            unit: "kg"
        }
    },
    {
        id: "v-3",
        date: "2025-03-15",
        bloodPressure: {
            systolic: 142,
            diastolic: 92,
            status: "warning"
        },
        temperature: {
            value: 98.4,
            unit: "F",
            status: "normal"
        },
        heartRate: {
            value: 92,
            status: "warning"
        },
        spO2: {
            value: 96,
            status: "normal"
        },
        weight: {
            value: 73,
            unit: "kg"
        }
    }
];
const sampleHistory = {
    allergies: [
        {
            id: "a-1",
            allergen: "Penicillin",
            type: "Drug",
            severity: "severe",
            reaction: "Anaphylaxis — Difficulty breathing, swelling of face and throat",
            reportedDate: "2020-03-15"
        },
        {
            id: "a-2",
            allergen: "Peanuts",
            type: "Food",
            severity: "moderate",
            reaction: "Hives, nausea, abdominal cramping",
            reportedDate: "2019-08-22"
        },
        {
            id: "a-3",
            allergen: "Dust Mites",
            type: "Environmental",
            severity: "mild",
            reaction: "Sneezing, runny nose, watery eyes"
        }
    ],
    chronicConditions: [
        {
            id: "cc-1",
            condition: "Type 2 Diabetes Mellitus",
            diagnosedDate: "2021-06-15",
            status: "Active",
            medications: [
                "Metformin 500mg BD"
            ],
            notes: "HbA1c last checked: 6.8% (Mar 2025)"
        },
        {
            id: "cc-2",
            condition: "Essential Hypertension",
            diagnosedDate: "2022-01-10",
            status: "Active",
            medications: [
                "Amlodipine 5mg OD"
            ],
            notes: "Well controlled on current medication"
        }
    ],
    surgicalHistory: [
        {
            id: "sh-1",
            procedure: "Appendectomy",
            date: "2018-11-20",
            hospital: "City General Hospital",
            outcome: "Uneventful recovery"
        }
    ],
    familyHistory: [
        {
            id: "fh-1",
            relation: "Father",
            condition: "Type 2 Diabetes Mellitus",
            ageOfOnset: "45 years",
            status: "Living"
        },
        {
            id: "fh-2",
            relation: "Mother",
            condition: "Hypertension",
            ageOfOnset: "50 years",
            status: "Living"
        },
        {
            id: "fh-3",
            relation: "Paternal Grandfather",
            condition: "Coronary Artery Disease",
            ageOfOnset: "60 years",
            status: "Deceased",
            notes: "MI at age 65"
        }
    ],
    socialHistory: {
        smoking: {
            status: "Never"
        },
        alcohol: {
            status: "Occasional",
            details: "Social drinking, 1-2 drinks per month"
        },
        occupation: "Software Engineer",
        exercise: "Moderate — walks 30 min daily, gym twice a week",
        diet: "Mixed — vegetarian on weekdays, non-vegetarian on weekends"
    }
};
const sampleOphthal = [
    {
        id: "oph-1",
        date: "2025-04-10",
        vision: [
            {
                eye: "Right",
                unaided: "6/12",
                withGlasses: "6/6",
                pinhole: "6/6",
                nearVision: "N6"
            },
            {
                eye: "Left",
                unaided: "6/9",
                withGlasses: "6/6",
                pinhole: "6/6",
                nearVision: "N6"
            }
        ],
        iop: {
            right: 14,
            left: 16,
            method: "Non-contact tonometry"
        },
        anteriorSegment: {
            right: "Normal",
            left: "Normal"
        },
        posteriorSegment: {
            right: "Normal fundus, CDR 0.3",
            left: "Normal fundus, CDR 0.3"
        },
        diagnosis: [
            "Myopia — Right eye",
            "Mild Myopia — Left eye"
        ],
        treatment: [
            "Corrective lenses prescribed"
        ],
        notes: "Annual review recommended"
    }
];
const sampleGynec = [
    {
        id: "gyn-1",
        date: "2025-02-20",
        menstrualHistory: {
            lmp: "2025-02-05",
            cycleLength: 28,
            duration: 5,
            regularity: "Regular",
            flow: "Moderate",
            dysmenorrhea: true,
            notes: "Mild cramping on day 1-2, manages with OTC analgesics"
        },
        papSmear: {
            date: "2024-12-15",
            result: "Normal — No abnormal cells detected"
        },
        contraception: "Oral contraceptive pills",
        complaints: [
            "Mild dysmenorrhea"
        ],
        diagnosis: [
            "Primary Dysmenorrhea"
        ],
        treatment: [
            "Mefenamic Acid 500mg SOS for pain"
        ]
    }
];
const sampleObstetric = {
    obstetricFormula: "G3P2A0L2",
    previousPregnancies: [
        {
            id: "preg-1",
            year: "2020",
            outcome: "Live Birth",
            modeOfDelivery: "NVD",
            birthWeight: "3.2 kg",
            gender: "Male",
            complications: []
        },
        {
            id: "preg-2",
            year: "2022",
            outcome: "Live Birth",
            modeOfDelivery: "LSCS",
            birthWeight: "3.5 kg",
            gender: "Female",
            complications: [
                "Gestational Diabetes"
            ],
            notes: "Elective LSCS due to previous section"
        }
    ],
    currentPregnancy: {
        edd: "2025-09-15",
        lmp: "2024-12-08",
        gestationalAge: "28 weeks",
        gravida: 3,
        para: 2,
        abortion: 0,
        living: 2,
        antenatalVisits: [
            {
                id: "an-1",
                date: "2025-06-20",
                gestationalAge: "28 weeks",
                weight: 68,
                bp: "118/76",
                fetalHeartRate: 142,
                presentation: "Cephalic",
                uterineHeight: "28 cm",
                notes: "All normal, GCT — Normal"
            },
            {
                id: "an-2",
                date: "2025-05-23",
                gestationalAge: "24 weeks",
                weight: 66,
                bp: "120/78",
                fetalHeartRate: 148,
                presentation: "Cephalic",
                uterineHeight: "24 cm"
            }
        ]
    }
};
const sampleVaccines = [
    {
        category: "COVID-19",
        vaccines: [
            {
                id: "vac-1",
                vaccineName: "Covishield",
                dose: "Dose 1",
                dateAdministered: "2021-05-15",
                status: "Completed",
                batchNumber: "4121Z025",
                site: "Left Deltoid"
            },
            {
                id: "vac-2",
                vaccineName: "Covishield",
                dose: "Dose 2",
                dateAdministered: "2021-08-10",
                status: "Completed",
                batchNumber: "4121Z089",
                site: "Left Deltoid"
            },
            {
                id: "vac-3",
                vaccineName: "Covishield",
                dose: "Booster",
                dateAdministered: "2022-04-20",
                status: "Completed",
                batchNumber: "4122Z012",
                site: "Right Deltoid"
            }
        ]
    },
    {
        category: "Influenza",
        vaccines: [
            {
                id: "vac-4",
                vaccineName: "Influenza (Quadrivalent)",
                dose: "Annual",
                dateAdministered: "2024-10-05",
                status: "Completed",
                site: "Right Deltoid"
            },
            {
                id: "vac-5",
                vaccineName: "Influenza (Quadrivalent)",
                dose: "Annual",
                scheduledDate: "2025-10-01",
                status: "Scheduled"
            }
        ]
    },
    {
        category: "Hepatitis",
        vaccines: [
            {
                id: "vac-6",
                vaccineName: "Hepatitis B",
                dose: "Dose 1",
                dateAdministered: "2020-01-10",
                status: "Completed"
            },
            {
                id: "vac-7",
                vaccineName: "Hepatitis B",
                dose: "Dose 2",
                dateAdministered: "2020-02-10",
                status: "Completed"
            },
            {
                id: "vac-8",
                vaccineName: "Hepatitis B",
                dose: "Dose 3",
                scheduledDate: "2020-07-10",
                status: "Overdue"
            }
        ]
    }
];
const sampleGrowth = [
    {
        id: "gr-1",
        date: "2025-06-24",
        age: "34 years",
        weight: 72,
        height: 175,
        bmi: 23.5,
        notes: "BMI in normal range"
    },
    {
        id: "gr-2",
        date: "2025-03-15",
        age: "34 years",
        weight: 73,
        height: 175,
        bmi: 23.8
    },
    {
        id: "gr-3",
        date: "2024-12-10",
        age: "33 years",
        weight: 74.5,
        height: 175,
        bmi: 24.3,
        notes: "Slight weight gain noted, dietary advice given"
    }
];
const sampleLabReports = [
    {
        id: "lab-1",
        date: "2025-06-20",
        labName: "PathCare Diagnostics",
        orderedBy: "Dr. Ananya Sharma",
        category: "Hematology",
        tests: [
            {
                id: "lt-1",
                testName: "Hemoglobin",
                value: "14.2",
                unit: "g/dL",
                referenceRange: "13.0–17.0",
                status: "Normal"
            },
            {
                id: "lt-2",
                testName: "WBC Count",
                value: "11,200",
                unit: "/μL",
                referenceRange: "4,000–11,000",
                status: "Abnormal",
                flag: "High"
            },
            {
                id: "lt-3",
                testName: "Platelet Count",
                value: "2,45,000",
                unit: "/μL",
                referenceRange: "1,50,000–4,00,000",
                status: "Normal"
            },
            {
                id: "lt-4",
                testName: "ESR",
                value: "28",
                unit: "mm/hr",
                referenceRange: "0–20",
                status: "Abnormal",
                flag: "High"
            }
        ]
    },
    {
        id: "lab-2",
        date: "2025-06-20",
        labName: "PathCare Diagnostics",
        orderedBy: "Dr. Ananya Sharma",
        category: "Biochemistry",
        tests: [
            {
                id: "lt-5",
                testName: "Fasting Blood Sugar",
                value: "118",
                unit: "mg/dL",
                referenceRange: "70–100",
                status: "Abnormal",
                flag: "High"
            },
            {
                id: "lt-6",
                testName: "HbA1c",
                value: "6.8",
                unit: "%",
                referenceRange: "<5.7",
                status: "Abnormal",
                flag: "High"
            },
            {
                id: "lt-7",
                testName: "Creatinine",
                value: "0.9",
                unit: "mg/dL",
                referenceRange: "0.7–1.3",
                status: "Normal"
            },
            {
                id: "lt-8",
                testName: "SGPT (ALT)",
                value: "32",
                unit: "U/L",
                referenceRange: "7–56",
                status: "Normal"
            },
            {
                id: "lt-9",
                testName: "SGOT (AST)",
                value: "28",
                unit: "U/L",
                referenceRange: "10–40",
                status: "Normal"
            },
            {
                id: "lt-10",
                testName: "Total Cholesterol",
                value: "215",
                unit: "mg/dL",
                referenceRange: "<200",
                status: "Abnormal",
                flag: "High"
            }
        ]
    },
    {
        id: "lab-3",
        date: "2025-03-10",
        labName: "PathCare Diagnostics",
        category: "Thyroid",
        tests: [
            {
                id: "lt-11",
                testName: "TSH",
                value: "3.2",
                unit: "mIU/L",
                referenceRange: "0.4–4.0",
                status: "Normal"
            },
            {
                id: "lt-12",
                testName: "T3",
                value: "1.1",
                unit: "ng/mL",
                referenceRange: "0.8–2.0",
                status: "Normal"
            },
            {
                id: "lt-13",
                testName: "T4",
                value: "7.8",
                unit: "μg/dL",
                referenceRange: "5.1–14.1",
                status: "Normal"
            }
        ]
    }
];
const sampleDocuments = [
    {
        id: "doc-1",
        title: "Blood Test Report — June 2025",
        type: "Lab Report",
        date: "2025-06-20",
        uploadedBy: "Dr. Ananya Sharma",
        fileUrl: "#",
        fileType: "pdf",
        fileSize: "1.2 MB",
        tags: [
            "Hematology",
            "Biochemistry"
        ]
    },
    {
        id: "doc-2",
        title: "Prescription — OPD Visit",
        type: "Prescription",
        date: "2025-06-24",
        uploadedBy: "Dr. Ananya Sharma",
        fileUrl: "#",
        fileType: "pdf",
        fileSize: "245 KB"
    },
    {
        id: "doc-3",
        title: "Chest X-Ray",
        type: "Radiology",
        date: "2025-05-10",
        uploadedBy: "Dr. Ananya Sharma",
        fileUrl: "#",
        fileType: "image",
        fileSize: "3.8 MB",
        notes: "PA view — No significant abnormality"
    },
    {
        id: "doc-4",
        title: "Appendectomy Discharge Summary",
        type: "Discharge Summary",
        date: "2018-11-25",
        uploadedBy: "City General Hospital",
        fileUrl: "#",
        fileType: "pdf",
        fileSize: "580 KB"
    }
];
const sampleFollowUps = [
    {
        id: "fu-1",
        scheduledDate: "2025-06-29",
        reason: "Review after antibiotics course",
        doctorName: "Dr. Ananya Sharma",
        status: "Scheduled",
        visitType: "OPD",
        notes: "Check throat, review symptoms",
        reminderSent: true
    },
    {
        id: "fu-2",
        scheduledDate: "2025-07-20",
        reason: "Lab review — HbA1c and Lipid Profile",
        doctorName: "Dr. Ananya Sharma",
        status: "Scheduled",
        visitType: "Lab Review",
        notes: "Fasting sample required",
        reminderSent: false
    },
    {
        id: "fu-3",
        scheduledDate: "2025-05-17",
        reason: "Follow-up for cough",
        doctorName: "Dr. Ananya Sharma",
        status: "Completed",
        visitType: "OPD"
    },
    {
        id: "fu-4",
        scheduledDate: "2025-04-01",
        reason: "Dermatology follow-up for rash",
        doctorName: "Dr. Priya Mehta",
        status: "Missed",
        visitType: "Teleconsult"
    }
];
const symptomSuggestions = [
    "Chest Pain",
    "Chest Discomfort",
    "High Blood Pressure",
    "Vomiting",
    "Diarrhea",
    "Shortness of Breath",
    "Abdominal Pain",
    "Frequent Urination",
    "Joint Pain",
    "Muscle Aches",
    "Fever",
    "Headache",
    "Cough",
    "Running Nose",
    "Sore Throat",
    "Fatigue",
    "Dizziness",
    "Nausea",
    "Back Pain",
    "Skin Rash",
    "Changes in Vision",
    "Loss of Appetite"
];
const examinationSuggestions = [
    "Chest Pain",
    "Chest Discomfort",
    "High Blood Pressure",
    "Vomiting",
    "Diarrhea",
    "Shortness of Breath",
    "Abdominal Pain",
    "Frequent Urination",
    "Joint Pain",
    "Muscle Aches",
    "Throat Congested",
    "Bilateral Air Entry Equal",
    "Soft Non-Tender Abdomen",
    "Lymphadenopathy",
    "Edema"
];
const diagnosisSuggestions = [
    "Acute Upper Respiratory Infection",
    "Viral Pharyngitis",
    "Common Cold",
    "Type 2 Diabetes Mellitus",
    "Essential Hypertension",
    "Acute Bronchitis",
    "Contact Dermatitis",
    "Urinary Tract Infection",
    "Gastroenteritis",
    "Migraine",
    "Allergic Rhinitis",
    "Iron Deficiency Anemia"
];
const medicationSuggestions = [
    "Paracetamol 650mg Tablet",
    "Azithromycin 500mg Tablet",
    "Pantoprazole 40mg Tablet",
    "Cetirizine 10mg Tablet",
    "Ondansetron 4mg Tablet",
    "Dolo 650 Tablet",
    "Ibuprofen 400mg Tablet",
    "Amoxicillin 500mg Capsule",
    "Levocetirizine 5mg Tablet",
    "Montelukast 10mg Tablet",
    "ORS Sachet",
    "Vitamin D3 60000 IU Capsule",
    "Calcium + Vitamin D Tablet",
    "Metformin 500mg Tablet",
    "Amlodipine 5mg Tablet"
];
const labInvestigationSuggestions = [
    "Complete Blood Count",
    "Liver Function Test",
    "Renal Function Test",
    "Lipid Profile",
    "Thyroid Profile",
    "HbA1c",
    "Fasting Blood Sugar",
    "Urine Routine",
    "Chest X-Ray",
    "ECG",
    "USG Abdomen"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/rx/rxpad/RxPadSection.jsx [app-client] (ecmascript) <export RxPadSection as TPRxPadSection>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TPRxPadSection",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RxPadSection"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/rx/rxpad/RxPadSection.jsx [app-client] (ecmascript)");
}),
"[project]/components/rx/rxpad/RxPadFunctional.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "cellShell": "RxPadFunctional-module-scss-module__ozelpq__cellShell",
  "chevron": "RxPadFunctional-module-scss-module__ozelpq__chevron",
  "chevronOpen": "RxPadFunctional-module-scss-module__ozelpq__chevronOpen",
  "customAdd": "RxPadFunctional-module-scss-module__ozelpq__customAdd",
  "customAddHi": "RxPadFunctional-module-scss-module__ozelpq__customAddHi",
  "customTruncate": "RxPadFunctional-module-scss-module__ozelpq__customTruncate",
  "dataTable": "RxPadFunctional-module-scss-module__ozelpq__dataTable",
  "deleteRow": "RxPadFunctional-module-scss-module__ozelpq__deleteRow",
  "dragHandle": "RxPadFunctional-module-scss-module__ozelpq__dragHandle",
  "dragHandleActive": "RxPadFunctional-module-scss-module__ozelpq__dragHandleActive",
  "dragHandleIdle": "RxPadFunctional-module-scss-module__ozelpq__dragHandleIdle",
  "dropdownToggle": "RxPadFunctional-module-scss-module__ozelpq__dropdownToggle",
  "fieldInput": "RxPadFunctional-module-scss-module__ozelpq__fieldInput",
  "fieldMultiline": "RxPadFunctional-module-scss-module__ozelpq__fieldMultiline",
  "fieldTruncate": "RxPadFunctional-module-scss-module__ozelpq__fieldTruncate",
  "fieldWithDropdown": "RxPadFunctional-module-scss-module__ozelpq__fieldWithDropdown",
  "focusRing": "RxPadFunctional-module-scss-module__ozelpq__focusRing",
  "followInput": "RxPadFunctional-module-scss-module__ozelpq__followInput",
  "followQuick": "RxPadFunctional-module-scss-module__ozelpq__followQuick",
  "followQuickRow": "RxPadFunctional-module-scss-module__ozelpq__followQuickRow",
  "followStack": "RxPadFunctional-module-scss-module__ozelpq__followStack",
  "hintItem": "RxPadFunctional-module-scss-module__ozelpq__hintItem",
  "hintRow": "RxPadFunctional-module-scss-module__ozelpq__hintRow",
  "kbd": "RxPadFunctional-module-scss-module__ozelpq__kbd",
  "menuEmpty": "RxPadFunctional-module-scss-module__ozelpq__menuEmpty",
  "menuFooter": "RxPadFunctional-module-scss-module__ozelpq__menuFooter",
  "menuList": "RxPadFunctional-module-scss-module__ozelpq__menuList",
  "menuListSpaced": "RxPadFunctional-module-scss-module__ozelpq__menuListSpaced",
  "menuListWrap": "RxPadFunctional-module-scss-module__ozelpq__menuListWrap",
  "menuOption": "RxPadFunctional-module-scss-module__ozelpq__menuOption",
  "menuOptionHi": "RxPadFunctional-module-scss-module__ozelpq__menuOptionHi",
  "menuSearchIcon": "RxPadFunctional-module-scss-module__ozelpq__menuSearchIcon",
  "menuSectionHeader": "RxPadFunctional-module-scss-module__ozelpq__menuSectionHeader",
  "menuSectionLabel": "RxPadFunctional-module-scss-module__ozelpq__menuSectionLabel",
  "moduleStack": "RxPadFunctional-module-scss-module__ozelpq__moduleStack",
  "notesGrid": "RxPadFunctional-module-scss-module__ozelpq__notesGrid",
  "notesTextarea": "RxPadFunctional-module-scss-module__ozelpq__notesTextarea",
  "portalMenu": "RxPadFunctional-module-scss-module__ozelpq__portalMenu",
  "rxRoot": "RxPadFunctional-module-scss-module__ozelpq__rxRoot",
  "rxRowEnter": "RxPadFunctional-module-scss-module__ozelpq__rxRowEnter",
  "scrollThumb": "RxPadFunctional-module-scss-module__ozelpq__scrollThumb",
  "scrollTrack": "RxPadFunctional-module-scss-module__ozelpq__scrollTrack",
  "stickyTd": "RxPadFunctional-module-scss-module__ozelpq__stickyTd",
  "stickyTdEdge": "RxPadFunctional-module-scss-module__ozelpq__stickyTdEdge",
  "stickyTh": "RxPadFunctional-module-scss-module__ozelpq__stickyTh",
  "stickyThEdge": "RxPadFunctional-module-scss-module__ozelpq__stickyThEdge",
  "tableWrap": "RxPadFunctional-module-scss-module__ozelpq__tableWrap",
  "tabletChip": "RxPadFunctional-module-scss-module__ozelpq__tabletChip",
  "tabletChips": "RxPadFunctional-module-scss-module__ozelpq__tabletChips",
  "tdAction": "RxPadFunctional-module-scss-module__ozelpq__tdAction",
  "tdCell": "RxPadFunctional-module-scss-module__ozelpq__tdCell",
  "tdCellActive": "RxPadFunctional-module-scss-module__ozelpq__tdCellActive",
  "tdSide": "RxPadFunctional-module-scss-module__ozelpq__tdSide",
  "thData": "RxPadFunctional-module-scss-module__ozelpq__thData",
  "thSide": "RxPadFunctional-module-scss-module__ozelpq__thSide",
  "thSticky": "RxPadFunctional-module-scss-module__ozelpq__thSticky",
  "theadRow": "RxPadFunctional-module-scss-module__ozelpq__theadRow",
  "tr": "RxPadFunctional-module-scss-module__ozelpq__tr",
  "trDragging": "RxPadFunctional-module-scss-module__ozelpq__trDragging",
  "trDrop": "RxPadFunctional-module-scss-module__ozelpq__trDrop",
  "trHover": "RxPadFunctional-module-scss-module__ozelpq__trHover",
  "trRxEnter": "RxPadFunctional-module-scss-module__ozelpq__trRxEnter",
});
}),
"[project]/components/rx/rxpad/RxPadFunctional.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RxPadFunctional",
    ()=>RxPadFunctional
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Calendar2.js [app-client] (ecmascript) <export default as Calendar2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Notepad2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Notepad2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Notepad2.js [app-client] (ecmascript) <export default as Notepad2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/Trash.js [app-client] (ecmascript) <export default as Trash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$sample$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/rx/sample-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$sync$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/rxpad-sync-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rx$2d$preview$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/rx-preview-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/medical-icons/TPMedicalIcon.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$rxpad$2d$search$2d$input$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-rxpad-search-input.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__RxPadSection__as__TPRxPadSection$3e$__ = __turbopack_context__.i("[project]/components/rx/rxpad/RxPadSection.jsx [app-client] (ecmascript) <export RxPadSection as TPRxPadSection>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-tooltip.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/rx/rxpad/RxPadFunctional.module.scss [app-client] (css module)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function getRowId(prefix) {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return `${prefix}-${crypto.randomUUID()}`;
    }
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function normalizeText(value) {
    return value.trim().toLowerCase();
}
function rowHasValues(row) {
    return Object.entries(row).some(([key, value])=>key !== "id" && value.trim().length > 0);
}
function getColumnMinWidth(column) {
    return column.minWidth ?? column.width;
}
function getScrollParent(node) {
    if (!node) return null;
    let current = node.parentElement;
    while(current){
        const style = window.getComputedStyle(current);
        const scrollable = /(auto|scroll)/.test(style.overflowY);
        if (scrollable && current.scrollHeight > current.clientHeight) {
            return current;
        }
        current = current.parentElement;
    }
    return null;
}
function snapFieldToViewportTop(element, offset = 96) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const scrollParent = getScrollParent(element);
    if (scrollParent) {
        const parentRect = scrollParent.getBoundingClientRect();
        const fieldRect = element.getBoundingClientRect();
        const delta = fieldRect.top - parentRect.top - offset;
        scrollParent.scrollTo({
            top: Math.max(0, scrollParent.scrollTop + delta),
            behavior: "smooth"
        });
        return;
    }
    const targetTop = window.scrollY + element.getBoundingClientRect().top - offset;
    window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth"
    });
}
function firstPositiveInteger(value) {
    const match = value.match(/\d+/);
    if (!match) return 1;
    const parsed = Number.parseInt(match[0], 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}
function pluralize(base, count) {
    return `${count} ${base}${count > 1 ? "s" : ""}`;
}
function getSinceOptions(query) {
    const n = firstPositiveInteger(query);
    return [
        pluralize("hour", n),
        pluralize("day", n),
        pluralize("month", n),
        pluralize("year", n)
    ];
}
function getMedicationUnitOptions(query) {
    const n = firstPositiveInteger(query);
    return [
        pluralize("tablet", n),
        pluralize("unit", n),
        pluralize("capsule", n)
    ];
}
function getFrequencyOptions(query) {
    const n = firstPositiveInteger(query);
    const options = [
        `${n}-0-${n}`,
        `${n}-0-0-${n}`,
        `${n}-${n}-${n}`,
        `${n}-0-${Math.max(1, n - 1)}`,
        `${n}-1-${n}`,
        "1-0-1",
        "1-0-0-1",
        "0-1-0",
        "SOS"
    ];
    return Array.from(new Set(options));
}
const MEDICATION_WHEN_OPTIONS = [
    "Before Breakfast",
    "After Breakfast",
    "Before Lunch",
    "After Lunch",
    "Before Dinner",
    "After Dinner",
    "Before Food",
    "After Food",
    "With Food"
];
const ADVICE_SUGGESTIONS = [
    "Stay hydrated daily",
    "Take steam inhalation",
    "Avoid oily foods",
    "Complete medication course",
    "Monitor blood pressure",
    "Regular morning walk",
    "Salt restricted diet",
    "Follow sleep hygiene"
];
const LAB_INVESTIGATION_BASE_OPTIONS = [
    "Complete Blood Count",
    "Liver Function Test",
    "Renal Function Test",
    "Lipid Profile",
    "Thyroid Profile",
    "HbA1c",
    "Fasting Blood Sugar",
    "Urine Routine",
    "Chest X-Ray",
    "ECG"
];
const SURGERY_SUGGESTIONS = [
    "Thoracic Relief Procedure",
    "Pulmonary Enhancement Surgery",
    "Abdominal Reconstruction Surgery",
    "Urological Restoration Procedure",
    "Articular Repair Surgery",
    "Laparoscopic Appendectomy",
    "Sinus Endoscopy",
    "Tonsillectomy"
];
function getDurationOptions(query) {
    const n = firstPositiveInteger(query);
    const options = [
        "Stat",
        "To Be Continued",
        "Only If Required",
        pluralize("day", n),
        pluralize("week", n),
        pluralize("month", n),
        pluralize("year", n)
    ];
    return Array.from(new Set(options));
}
function getSeedQuery(query, fallback) {
    const next = query.trim();
    if (next.length > 0) return next;
    return fallback;
}
function filterByQuery(options, query) {
    const needle = normalizeText(query);
    if (!needle) return options;
    const filtered = options.filter((option)=>normalizeText(option).includes(needle));
    return filtered.length > 0 ? filtered : options;
}
const CUSTOM_OPTION_PREFIX = "__custom__:";
function toCustomOption(value) {
    return `${CUSTOM_OPTION_PREFIX}${value.trim()}`;
}
function isCustomOption(value) {
    return value.startsWith(CUSTOM_OPTION_PREFIX);
}
function getOptionValue(value) {
    return isCustomOption(value) ? value.slice(CUSTOM_OPTION_PREFIX.length) : value;
}
function getOptionLabel(value) {
    return isCustomOption(value) ? `Add custom: ${getOptionValue(value)}` : value;
}
function withCustomOption(options, query) {
    const trimmed = query.trim();
    if (!trimmed) return options;
    const customOption = toCustomOption(trimmed);
    const hasCustomAlready = options.some((option)=>isCustomOption(option) && normalizeText(getOptionValue(option)) === normalizeText(trimmed));
    if (hasCustomAlready) return options;
    return [
        ...options,
        customOption
    ];
}
function getCatalogOptions(catalog, query, limit = 10) {
    const needle = normalizeText(query);
    const filtered = needle ? catalog.filter((option)=>normalizeText(option).includes(needle)) : catalog;
    return withCustomOption(filtered.slice(0, limit), query);
}
function moveSelectedOptionToTop(options, selectedValue) {
    const selected = normalizeText(selectedValue);
    if (!selected) return options;
    const selectedIndex = options.findIndex((option)=>!isCustomOption(option) && normalizeText(getOptionValue(option)) === selected);
    if (selectedIndex <= 0) return options;
    const next = [
        ...options
    ];
    const [picked] = next.splice(selectedIndex, 1);
    next.unshift(picked);
    return next;
}
function useTabletMode() {
    _s();
    const [tabletMode, setTabletMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTabletMode.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const widthQuery = window.matchMedia("(max-width: 1180px)");
            const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
            const update = {
                "useTabletMode.useEffect.update": ()=>{
                    const isTabletWidth = window.innerWidth <= 1180;
                    const touchLike = touchQuery.matches || window.navigator.maxTouchPoints > 0;
                    setTabletMode(isTabletWidth && touchLike);
                }
            }["useTabletMode.useEffect.update"];
            update();
            widthQuery.addEventListener("change", update);
            touchQuery.addEventListener("change", update);
            window.addEventListener("resize", update);
            return ({
                "useTabletMode.useEffect": ()=>{
                    widthQuery.removeEventListener("change", update);
                    touchQuery.removeEventListener("change", update);
                    window.removeEventListener("resize", update);
                }
            })["useTabletMode.useEffect"];
        }
    }["useTabletMode.useEffect"], []);
    return tabletMode;
}
_s(useTabletMode, "9PNagnl8GMvOIsnwD3Vkhh6kHkw=");
function buildDefaultRow(moduleId, columns, primaryKey, seedText = "") {
    const row = {
        id: getRowId(moduleId)
    };
    for (const column of columns){
        if (column.key === primaryKey && seedText.trim()) {
            row[column.key] = seedText.trim();
            continue;
        }
        row[column.key] = "";
    }
    return row;
}
function EditableTableModule({ id, title, icon, columns, primaryKey, rows, onChangeRows, searchPlaceholder, cannedChips, searchSuggestions = [], onRowAdded, onSaveClick, onTemplateClick, onClearClick, pulseRowIds = [] }) {
    _s1();
    const isTablet = useTabletMode();
    const [searchText, setSearchText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [activeMenu, setActiveMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [draggingRowId, setDraggingRowId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dragOverRowId, setDragOverRowId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeCell, setActiveCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingCellValues, setEditingCellValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [hasActionColumnOverflow, setHasActionColumnOverflow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showActionColumnEdge, setShowActionColumnEdge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [menuIndicator, setMenuIndicator] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        hasOverflow: false,
        thumbTop: 0,
        thumbHeight: 18
    });
    const moduleRootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tableWrapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const searchInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const menuListRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const transparentDragImageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rowTopByIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const dragPreviewTargetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const colIndexByKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditableTableModule.useMemo[colIndexByKey]": ()=>Object.fromEntries(columns.map({
                "EditableTableModule.useMemo[colIndexByKey]": (column, idx)=>[
                        column.key,
                        idx
                    ]
            }["EditableTableModule.useMemo[colIndexByKey]"]))
    }["EditableTableModule.useMemo[colIndexByKey]"], [
        columns
    ]);
    const searchCatalog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditableTableModule.useMemo[searchCatalog]": ()=>searchSuggestions.length > 0 ? searchSuggestions : cannedChips
    }["EditableTableModule.useMemo[searchCatalog]"], [
        cannedChips,
        searchSuggestions
    ]);
    const searchCatalogKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditableTableModule.useMemo[searchCatalogKey]": ()=>searchCatalog.join("||")
    }["EditableTableModule.useMemo[searchCatalogKey]"], [
        searchCatalog
    ]);
    const [dynamicSearchCatalog, setDynamicSearchCatalog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(searchCatalog);
    const shouldFilterCellOnOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[shouldFilterCellOnOpen]": (column)=>column.key === primaryKey && Boolean(column.getOptions) && !column.restrictToOptions
    }["EditableTableModule.useCallback[shouldFilterCellOnOpen]"], [
        primaryKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableTableModule.useEffect": ()=>{
            setDynamicSearchCatalog(searchCatalog);
        }
    }["EditableTableModule.useEffect"], [
        searchCatalog,
        searchCatalogKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableTableModule.useEffect": ()=>{
            // Keep committed primary-field values discoverable in future dropdown searches.
            setDynamicSearchCatalog({
                "EditableTableModule.useEffect": (prev)=>{
                    const seen = new Set(prev.map({
                        "EditableTableModule.useEffect": (item)=>normalizeText(item)
                    }["EditableTableModule.useEffect"]));
                    const additions = [];
                    for (const row of rows){
                        const value = (row[primaryKey] ?? "").trim();
                        if (!value) continue;
                        const key = normalizeText(value);
                        if (seen.has(key)) continue;
                        seen.add(key);
                        additions.push(value);
                    }
                    if (additions.length === 0) return prev;
                    return [
                        ...additions,
                        ...prev
                    ];
                }
            }["EditableTableModule.useEffect"]);
        }
    }["EditableTableModule.useEffect"], [
        rows,
        primaryKey
    ]);
    const totalColumnWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditableTableModule.useMemo[totalColumnWidth]": ()=>Math.max(1, columns.reduce({
                "EditableTableModule.useMemo[totalColumnWidth]": (sum, column)=>sum + Math.max(column.width, getColumnMinWidth(column))
            }["EditableTableModule.useMemo[totalColumnWidth]"], 0))
    }["EditableTableModule.useMemo[totalColumnWidth]"], [
        columns
    ]);
    const getResponsiveColumnStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[getResponsiveColumnStyle]": (column)=>({
                width: `${column.width / totalColumnWidth * 100}%`,
                minWidth: getColumnMinWidth(column),
                maxWidth: column.maxWidth
            })
    }["EditableTableModule.useCallback[getResponsiveColumnStyle]"], [
        totalColumnWidth
    ]);
    const setCellValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[setCellValue]": (rowId, key, value)=>{
            onChangeRows(rows.map({
                "EditableTableModule.useCallback[setCellValue]": (row)=>row.id === rowId ? {
                        ...row,
                        [key]: value
                    } : row
            }["EditableTableModule.useCallback[setCellValue]"]));
        }
    }["EditableTableModule.useCallback[setCellValue]"], [
        onChangeRows,
        rows
    ]);
    const registerCustomValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[registerCustomValue]": (value)=>{
            const nextValue = value.trim();
            if (!nextValue) return;
            setDynamicSearchCatalog({
                "EditableTableModule.useCallback[registerCustomValue]": (prev)=>{
                    const exists = prev.some({
                        "EditableTableModule.useCallback[registerCustomValue].exists": (item)=>normalizeText(item) === normalizeText(nextValue)
                    }["EditableTableModule.useCallback[registerCustomValue].exists"]);
                    if (exists) return prev;
                    return [
                        nextValue,
                        ...prev
                    ];
                }
            }["EditableTableModule.useCallback[registerCustomValue]"]);
        }
    }["EditableTableModule.useCallback[registerCustomValue]"], []);
    const beginDropdownEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[beginDropdownEditing]": (key, value)=>{
            setEditingCellValues({
                "EditableTableModule.useCallback[beginDropdownEditing]": (prev)=>{
                    if (prev[key] === value) return prev;
                    return {
                        ...prev,
                        [key]: value
                    };
                }
            }["EditableTableModule.useCallback[beginDropdownEditing]"]);
        }
    }["EditableTableModule.useCallback[beginDropdownEditing]"], []);
    const endDropdownEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[endDropdownEditing]": (key)=>{
            setEditingCellValues({
                "EditableTableModule.useCallback[endDropdownEditing]": (prev)=>{
                    if (!(key in prev)) return prev;
                    const next = {
                        ...prev
                    };
                    delete next[key];
                    return next;
                }
            }["EditableTableModule.useCallback[endDropdownEditing]"]);
        }
    }["EditableTableModule.useCallback[endDropdownEditing]"], []);
    const ensureCellVisibleInTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[ensureCellVisibleInTable]": (element)=>{
            const wrapper = tableWrapRef.current;
            if (!wrapper) return;
            const wrapperRect = wrapper.getBoundingClientRect();
            const cellRect = element.getBoundingClientRect();
            const rightSafetyInset = 62;
            const leftSafetyInset = 8;
            if (cellRect.right > wrapperRect.right - rightSafetyInset) {
                const delta = cellRect.right - (wrapperRect.right - rightSafetyInset);
                wrapper.scrollBy({
                    left: delta + 8,
                    behavior: "smooth"
                });
            } else if (cellRect.left < wrapperRect.left + leftSafetyInset) {
                const delta = wrapperRect.left + leftSafetyInset - cellRect.left;
                wrapper.scrollBy({
                    left: -delta - 8,
                    behavior: "smooth"
                });
            }
        }
    }["EditableTableModule.useCallback[ensureCellVisibleInTable]"], []);
    const addRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[addRow]": (seedText = "")=>{
            const row = buildDefaultRow(id, columns, primaryKey, seedText);
            onChangeRows([
                ...rows,
                row
            ]);
            onRowAdded?.(seedText);
        }
    }["EditableTableModule.useCallback[addRow]"], [
        columns,
        id,
        onChangeRows,
        onRowAdded,
        primaryKey,
        rows
    ]);
    const hasAnyData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditableTableModule.useMemo[hasAnyData]": ()=>rows.some({
                "EditableTableModule.useMemo[hasAnyData]": (row)=>rowHasValues(row)
            }["EditableTableModule.useMemo[hasAnyData]"])
    }["EditableTableModule.useMemo[hasAnyData]"], [
        rows
    ]);
    const handleTemplateClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[handleTemplateClick]": ()=>{
            if (onTemplateClick) {
                onTemplateClick();
                return;
            }
            addRow(cannedChips[0] ?? "");
        }
    }["EditableTableModule.useCallback[handleTemplateClick]"], [
        addRow,
        cannedChips,
        onTemplateClick
    ]);
    const handleSaveClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[handleSaveClick]": ()=>{
            onSaveClick?.();
        }
    }["EditableTableModule.useCallback[handleSaveClick]"], [
        onSaveClick
    ]);
    const handleClearClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[handleClearClick]": ()=>{
            if (onClearClick) {
                onClearClick();
                return;
            }
            onChangeRows([]);
        }
    }["EditableTableModule.useCallback[handleClearClick]"], [
        onChangeRows,
        onClearClick
    ]);
    const removeRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[removeRow]": (rowId)=>{
            onChangeRows(rows.filter({
                "EditableTableModule.useCallback[removeRow]": (row)=>row.id !== rowId
            }["EditableTableModule.useCallback[removeRow]"]));
        }
    }["EditableTableModule.useCallback[removeRow]"], [
        onChangeRows,
        rows
    ]);
    const moveRow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[moveRow]": (sourceId, targetId)=>{
            if (sourceId === targetId) return;
            const sourceIndex = rows.findIndex({
                "EditableTableModule.useCallback[moveRow].sourceIndex": (row)=>row.id === sourceId
            }["EditableTableModule.useCallback[moveRow].sourceIndex"]);
            const targetIndex = rows.findIndex({
                "EditableTableModule.useCallback[moveRow].targetIndex": (row)=>row.id === targetId
            }["EditableTableModule.useCallback[moveRow].targetIndex"]);
            if (sourceIndex < 0 || targetIndex < 0) return;
            const clone = [
                ...rows
            ];
            const [picked] = clone.splice(sourceIndex, 1);
            clone.splice(targetIndex, 0, picked);
            onChangeRows(clone);
        }
    }["EditableTableModule.useCallback[moveRow]"], [
        onChangeRows,
        rows
    ]);
    const focusCell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[focusCell]": (rowIndex, colIndex)=>{
            const nextRow = rows[rowIndex];
            const nextColumn = columns[colIndex];
            if (!nextRow || !nextColumn) return;
            const key = `${nextRow.id}:${nextColumn.key}`;
            const element = inputRefs.current[key];
            if (!element) return;
            element.focus();
            const len = element.value.length;
            element.setSelectionRange(len, len);
        }
    }["EditableTableModule.useCallback[focusCell]"], [
        columns,
        rows
    ]);
    const focusOwnSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[focusOwnSearch]": ()=>{
            const node = searchInputRef.current;
            if (!node) return;
            node.focus();
            node.select();
            if (isTablet) {
                snapFieldToViewportTop(node);
            }
        }
    }["EditableTableModule.useCallback[focusOwnSearch]"], [
        isTablet
    ]);
    const focusNextModuleSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[focusNextModuleSearch]": ()=>{
            if (typeof document === "undefined") return;
            const current = searchInputRef.current;
            if (!current) return;
            const allSearches = Array.from(document.querySelectorAll('[data-rx-module-search="true"]'));
            const idx = allSearches.findIndex({
                "EditableTableModule.useCallback[focusNextModuleSearch].idx": (node)=>node === current
            }["EditableTableModule.useCallback[focusNextModuleSearch].idx"]);
            if (idx < 0 || idx >= allSearches.length - 1) {
                current.focus();
                current.select();
                return;
            }
            const next = allSearches[idx + 1];
            next.focus();
            next.select();
            if (isTablet) {
                snapFieldToViewportTop(next);
            }
        }
    }["EditableTableModule.useCallback[focusNextModuleSearch]"], [
        isTablet
    ]);
    const focusPreviousModuleSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[focusPreviousModuleSearch]": ()=>{
            if (typeof document === "undefined") return;
            const current = searchInputRef.current;
            if (!current) return;
            const allSearches = Array.from(document.querySelectorAll('[data-rx-module-search="true"]'));
            const idx = allSearches.findIndex({
                "EditableTableModule.useCallback[focusPreviousModuleSearch].idx": (node)=>node === current
            }["EditableTableModule.useCallback[focusPreviousModuleSearch].idx"]);
            if (idx <= 0) {
                current.focus();
                current.select();
                return;
            }
            const prev = allSearches[idx - 1];
            prev.focus();
            prev.select();
            if (isTablet) {
                snapFieldToViewportTop(prev);
            }
        }
    }["EditableTableModule.useCallback[focusPreviousModuleSearch]"], [
        isTablet
    ]);
    const focusFirstCellInModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[focusFirstCellInModule]": (moduleRoot)=>{
            if (!moduleRoot) return false;
            const firstCell = moduleRoot.querySelector('[data-rx-cell-input="true"]');
            if (firstCell) {
                firstCell.focus();
                const len = firstCell.value.length;
                firstCell.setSelectionRange(len, len);
                if (isTablet) {
                    snapFieldToViewportTop(firstCell);
                }
                return true;
            }
            const moduleSearch = moduleRoot.querySelector('[data-rx-module-search="true"]');
            if (moduleSearch) {
                moduleSearch.focus();
                moduleSearch.select();
                if (isTablet) {
                    snapFieldToViewportTop(moduleSearch);
                }
                return true;
            }
            return false;
        }
    }["EditableTableModule.useCallback[focusFirstCellInModule]"], [
        isTablet
    ]);
    const focusNextModuleFirstCell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[focusNextModuleFirstCell]": ()=>{
            if (typeof document === "undefined") return;
            const currentRoot = moduleRootRef.current;
            if (!currentRoot) {
                focusNextModuleSearch();
                return;
            }
            const allRoots = Array.from(document.querySelectorAll('[data-rx-module-root="true"]'));
            const idx = allRoots.findIndex({
                "EditableTableModule.useCallback[focusNextModuleFirstCell].idx": (node)=>node === currentRoot
            }["EditableTableModule.useCallback[focusNextModuleFirstCell].idx"]);
            if (idx < 0 || idx >= allRoots.length - 1) {
                focusOwnSearch();
                return;
            }
            const nextRoot = allRoots[idx + 1];
            if (!focusFirstCellInModule(nextRoot)) {
                focusNextModuleSearch();
            }
        }
    }["EditableTableModule.useCallback[focusNextModuleFirstCell]"], [
        focusFirstCellInModule,
        focusNextModuleSearch,
        focusOwnSearch
    ]);
    const focusPreviousModuleLastCell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[focusPreviousModuleLastCell]": ()=>{
            if (typeof document === "undefined") return;
            const currentRoot = moduleRootRef.current;
            if (!currentRoot) {
                focusPreviousModuleSearch();
                return;
            }
            const allRoots = Array.from(document.querySelectorAll('[data-rx-module-root="true"]'));
            const idx = allRoots.findIndex({
                "EditableTableModule.useCallback[focusPreviousModuleLastCell].idx": (node)=>node === currentRoot
            }["EditableTableModule.useCallback[focusPreviousModuleLastCell].idx"]);
            if (idx <= 0) {
                focusOwnSearch();
                return;
            }
            const prevRoot = allRoots[idx - 1];
            const cells = Array.from(prevRoot.querySelectorAll('[data-rx-cell-input="true"]'));
            const lastCell = cells[cells.length - 1];
            if (lastCell) {
                lastCell.focus();
                const len = lastCell.value.length;
                lastCell.setSelectionRange(len, len);
                if (isTablet) {
                    snapFieldToViewportTop(lastCell);
                }
                return;
            }
            focusPreviousModuleSearch();
        }
    }["EditableTableModule.useCallback[focusPreviousModuleLastCell]"], [
        focusOwnSearch,
        focusPreviousModuleSearch,
        isTablet
    ]);
    const focusNextFromCell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[focusNextFromCell]": (rowIndex, colIndex)=>{
            const lastColIndex = columns.length - 1;
            if (colIndex < lastColIndex) {
                focusCell(rowIndex, colIndex + 1);
                return;
            }
            if (rowIndex < rows.length - 1) {
                focusCell(rowIndex + 1, 0);
                return;
            }
            focusOwnSearch();
        }
    }["EditableTableModule.useCallback[focusNextFromCell]"], [
        columns.length,
        focusCell,
        focusOwnSearch,
        rows.length
    ]);
    const focusPreviousFromCell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[focusPreviousFromCell]": (rowIndex, colIndex)=>{
            const lastColIndex = columns.length - 1;
            if (colIndex > 0) {
                focusCell(rowIndex, colIndex - 1);
                return;
            }
            if (rowIndex > 0) {
                focusCell(rowIndex - 1, lastColIndex);
                return;
            }
            focusOwnSearch();
        }
    }["EditableTableModule.useCallback[focusPreviousFromCell]"], [
        columns.length,
        focusCell,
        focusOwnSearch
    ]);
    const closeMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[closeMenu]": ()=>setActiveMenu(null)
    }["EditableTableModule.useCallback[closeMenu]"], []);
    const optionsForMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditableTableModule.useMemo[optionsForMenu]": ()=>{
            if (!activeMenu) return [];
            if (activeMenu.mode === "search") {
                return getCatalogOptions(dynamicSearchCatalog, activeMenu.query, 10);
            }
            const rowId = activeMenu.rowId ?? "";
            const colKey = activeMenu.colKey ?? "";
            const row = rows.find({
                "EditableTableModule.useMemo[optionsForMenu].row": (item)=>item.id === rowId
            }["EditableTableModule.useMemo[optionsForMenu].row"]);
            const column = columns.find({
                "EditableTableModule.useMemo[optionsForMenu].column": (item)=>item.key === colKey
            }["EditableTableModule.useMemo[optionsForMenu].column"]);
            if (!row || !column?.getOptions) return [];
            if (column.key === primaryKey && !column.restrictToOptions) {
                const filtered = getCatalogOptions(dynamicSearchCatalog, activeMenu.query, 10);
                return moveSelectedOptionToTop(filtered, row[colKey] ?? "");
            }
            const filtered = filterByQuery(column.getOptions(activeMenu.query, row), activeMenu.query);
            return moveSelectedOptionToTop(filtered, row[colKey] ?? "");
        }
    }["EditableTableModule.useMemo[optionsForMenu]"], [
        activeMenu,
        columns,
        rows,
        dynamicSearchCatalog,
        primaryKey
    ]);
    const getMenuHighlightedIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[getMenuHighlightedIndex]": (row, column, query, selectedValue)=>{
            if (!column.getOptions) return 0;
            const options = column.key === primaryKey && !column.restrictToOptions ? moveSelectedOptionToTop(getCatalogOptions(dynamicSearchCatalog, query, 10), selectedValue) : moveSelectedOptionToTop(filterByQuery(column.getOptions(query, row), query), selectedValue);
            if (options.length === 0) return 0;
            const selected = normalizeText(selectedValue);
            const selectedIndex = options.findIndex({
                "EditableTableModule.useCallback[getMenuHighlightedIndex].selectedIndex": (option)=>!isCustomOption(option) && normalizeText(getOptionValue(option)) === selected
            }["EditableTableModule.useCallback[getMenuHighlightedIndex].selectedIndex"]);
            return selectedIndex >= 0 ? selectedIndex : 0;
        }
    }["EditableTableModule.useCallback[getMenuHighlightedIndex]"], [
        dynamicSearchCatalog,
        primaryKey
    ]);
    const openCellMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[openCellMenu]": (row, column, anchorRect, selectedValue, query, showAllOptions = false)=>{
            if (!column.getOptions) return;
            const nextQuery = showAllOptions ? "" : query;
            setActiveMenu({
                mode: "cell",
                rowId: row.id,
                colKey: column.key,
                query: nextQuery,
                highlightedIndex: getMenuHighlightedIndex(row, column, nextQuery, selectedValue),
                anchorRect
            });
        }
    }["EditableTableModule.useCallback[openCellMenu]"], [
        getMenuHighlightedIndex
    ]);
    const openSearchMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EditableTableModule.useCallback[openSearchMenu]": (query, showAllOptions = false)=>{
            const anchorRect = searchInputRef.current?.getBoundingClientRect();
            if (!anchorRect) return;
            const nextQuery = showAllOptions ? "" : query;
            const options = getCatalogOptions(dynamicSearchCatalog, nextQuery, 10);
            const selected = normalizeText(query);
            const selectedIndex = options.findIndex({
                "EditableTableModule.useCallback[openSearchMenu].selectedIndex": (option)=>!isCustomOption(option) && normalizeText(getOptionValue(option)) === selected
            }["EditableTableModule.useCallback[openSearchMenu].selectedIndex"]);
            setActiveMenu({
                mode: "search",
                query: nextQuery,
                highlightedIndex: selectedIndex >= 0 ? selectedIndex : 0,
                anchorRect
            });
        }
    }["EditableTableModule.useCallback[openSearchMenu]"], [
        dynamicSearchCatalog
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableTableModule.useEffect": ()=>{
            if (!activeMenu) return;
            const updateAnchor = {
                "EditableTableModule.useEffect.updateAnchor": ()=>{
                    const anchor = activeMenu.mode === "search" ? searchInputRef.current : inputRefs.current[`${activeMenu.rowId ?? ""}:${activeMenu.colKey ?? ""}`];
                    if (!anchor) return;
                    setActiveMenu({
                        "EditableTableModule.useEffect.updateAnchor": (current)=>{
                            if (!current) return current;
                            return {
                                ...current,
                                anchorRect: anchor.getBoundingClientRect()
                            };
                        }
                    }["EditableTableModule.useEffect.updateAnchor"]);
                }
            }["EditableTableModule.useEffect.updateAnchor"];
            updateAnchor();
            window.addEventListener("resize", updateAnchor);
            window.addEventListener("scroll", updateAnchor, true);
            return ({
                "EditableTableModule.useEffect": ()=>{
                    window.removeEventListener("resize", updateAnchor);
                    window.removeEventListener("scroll", updateAnchor, true);
                }
            })["EditableTableModule.useEffect"];
        }
    }["EditableTableModule.useEffect"], [
        activeMenu
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableTableModule.useEffect": ()=>{
            const node = menuListRef.current;
            if (!activeMenu || !node) {
                setMenuIndicator({
                    "EditableTableModule.useEffect": (prev)=>prev.hasOverflow || prev.thumbTop !== 0 ? {
                            hasOverflow: false,
                            thumbTop: 0,
                            thumbHeight: 18
                        } : prev
                }["EditableTableModule.useEffect"]);
                return;
            }
            const updateIndicator = {
                "EditableTableModule.useEffect.updateIndicator": ()=>{
                    const clientHeight = node.clientHeight;
                    const scrollHeight = node.scrollHeight;
                    const scrollTop = node.scrollTop;
                    const hasOverflow = scrollHeight > clientHeight + 1;
                    const trackPadding = 8;
                    const trackHeight = Math.max(0, clientHeight - trackPadding * 2);
                    const thumbHeight = hasOverflow ? Math.max(18, Math.min(trackHeight, clientHeight / scrollHeight * trackHeight)) : trackHeight;
                    const maxThumbTop = Math.max(0, trackHeight - thumbHeight);
                    const thumbTop = hasOverflow && scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) * maxThumbTop : 0;
                    setMenuIndicator({
                        "EditableTableModule.useEffect.updateIndicator": (prev)=>{
                            if (prev.hasOverflow === hasOverflow && Math.abs(prev.thumbTop - thumbTop) < 0.5 && Math.abs(prev.thumbHeight - thumbHeight) < 0.5) {
                                return prev;
                            }
                            return {
                                hasOverflow,
                                thumbTop,
                                thumbHeight
                            };
                        }
                    }["EditableTableModule.useEffect.updateIndicator"]);
                }
            }["EditableTableModule.useEffect.updateIndicator"];
            updateIndicator();
            node.addEventListener("scroll", updateIndicator, {
                passive: true
            });
            window.addEventListener("resize", updateIndicator);
            return ({
                "EditableTableModule.useEffect": ()=>{
                    node.removeEventListener("scroll", updateIndicator);
                    window.removeEventListener("resize", updateIndicator);
                }
            })["EditableTableModule.useEffect"];
        }
    }["EditableTableModule.useEffect"], [
        activeMenu,
        optionsForMenu.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableTableModule.useEffect": ()=>{
            const node = menuListRef.current;
            if (!activeMenu || !node) return;
            const index = activeMenu.highlightedIndex;
            if (index < 0) return;
            const target = node.querySelector(`[data-rx-menu-index="${index}"]`);
            if (!target) return;
            const targetTop = target.offsetTop;
            const targetBottom = targetTop + target.offsetHeight;
            const viewTop = node.scrollTop;
            const viewBottom = viewTop + node.clientHeight;
            if (targetTop < viewTop) {
                node.scrollTo({
                    top: Math.max(0, targetTop - 4),
                    behavior: "smooth"
                });
                return;
            }
            if (targetBottom > viewBottom) {
                node.scrollTo({
                    top: targetBottom - node.clientHeight + 4,
                    behavior: "smooth"
                });
            }
        }
    }["EditableTableModule.useEffect"], [
        activeMenu?.mode,
        activeMenu?.rowId,
        activeMenu?.colKey,
        activeMenu?.highlightedIndex,
        optionsForMenu.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableTableModule.useEffect": ()=>{
            if (rows.length > 0) return;
            setActiveCell(null);
            setActiveMenu(null);
        }
    }["EditableTableModule.useEffect"], [
        rows.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "EditableTableModule.useLayoutEffect": ()=>{
            const wrapper = tableWrapRef.current;
            const tbody = wrapper?.querySelector("tbody");
            if (!tbody) {
                rowTopByIdRef.current = {};
                return;
            }
            const rowElements = Array.from(tbody.querySelectorAll("tr[data-row-id]"));
            const nextTopById = {};
            for (const rowElement of rowElements){
                const rowId = rowElement.dataset.rowId;
                if (!rowId) continue;
                const nextTop = rowElement.getBoundingClientRect().top;
                nextTopById[rowId] = nextTop;
                const prevTop = rowTopByIdRef.current[rowId];
                if (prevTop == null) continue;
                const deltaY = prevTop - nextTop;
                if (Math.abs(deltaY) < 1) continue;
                rowElement.style.transition = "transform 0s";
                rowElement.style.transform = `translateY(${deltaY}px)`;
                rowElement.getBoundingClientRect();
                rowElement.style.transition = "transform 220ms cubic-bezier(0.22,1,0.36,1)";
                rowElement.style.transform = "";
            }
            rowTopByIdRef.current = nextTopById;
        }
    }["EditableTableModule.useLayoutEffect"], [
        rows
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableTableModule.useEffect": ()=>{
            if (!draggingRowId) return;
            const handleDocumentDragOver = {
                "EditableTableModule.useEffect.handleDocumentDragOver": (event)=>{
                    if (event.clientX === 0 && event.clientY === 0) return;
                    const wrapper = tableWrapRef.current;
                    if (!wrapper) return;
                    const rect = wrapper.getBoundingClientRect();
                    const withinX = event.clientX >= rect.left && event.clientX <= rect.right;
                    const withinY = event.clientY >= rect.top && event.clientY <= rect.bottom;
                    if (!withinX || !withinY) {
                        setDragOverRowId(null);
                    }
                }
            }["EditableTableModule.useEffect.handleDocumentDragOver"];
            const handleDocumentDrop = {
                "EditableTableModule.useEffect.handleDocumentDrop": ()=>{
                    setDraggingRowId(null);
                    setDragOverRowId(null);
                    dragPreviewTargetRef.current = null;
                }
            }["EditableTableModule.useEffect.handleDocumentDrop"];
            const handleDocumentDragEnd = {
                "EditableTableModule.useEffect.handleDocumentDragEnd": ()=>{
                    setDraggingRowId(null);
                    setDragOverRowId(null);
                    dragPreviewTargetRef.current = null;
                }
            }["EditableTableModule.useEffect.handleDocumentDragEnd"];
            document.addEventListener("dragover", handleDocumentDragOver);
            document.addEventListener("drop", handleDocumentDrop);
            document.addEventListener("dragend", handleDocumentDragEnd);
            return ({
                "EditableTableModule.useEffect": ()=>{
                    document.removeEventListener("dragover", handleDocumentDragOver);
                    document.removeEventListener("drop", handleDocumentDrop);
                    document.removeEventListener("dragend", handleDocumentDragEnd);
                }
            })["EditableTableModule.useEffect"];
        }
    }["EditableTableModule.useEffect"], [
        draggingRowId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableTableModule.useEffect": ()=>{
            const wrapper = tableWrapRef.current;
            if (!wrapper || rows.length === 0) {
                setHasActionColumnOverflow(false);
                setShowActionColumnEdge(false);
                return;
            }
            const updateStickyState = {
                "EditableTableModule.useEffect.updateStickyState": ()=>{
                    const hasOverflow = wrapper.scrollWidth > wrapper.clientWidth + 1;
                    const maxScroll = Math.max(0, wrapper.scrollWidth - wrapper.clientWidth);
                    setHasActionColumnOverflow(hasOverflow);
                    /* Edge only while scrolled (content under the column) but not parked at the far end */ setShowActionColumnEdge(hasOverflow && maxScroll > 1 && wrapper.scrollLeft > 0 && wrapper.scrollLeft < maxScroll - 0.5);
                }
            }["EditableTableModule.useEffect.updateStickyState"];
            updateStickyState();
            window.addEventListener("resize", updateStickyState);
            wrapper.addEventListener("scroll", updateStickyState, {
                passive: true
            });
            let observer = null;
            if (typeof ResizeObserver !== "undefined") {
                observer = new ResizeObserver(updateStickyState);
                observer.observe(wrapper);
                const table = wrapper.querySelector("table");
                if (table) {
                    observer.observe(table);
                }
            }
            return ({
                "EditableTableModule.useEffect": ()=>{
                    window.removeEventListener("resize", updateStickyState);
                    wrapper.removeEventListener("scroll", updateStickyState);
                    observer?.disconnect();
                }
            })["EditableTableModule.useEffect"];
        }
    }["EditableTableModule.useEffect"], [
        rows.length,
        columns.length
    ]);
    const stickyActionHeaderClass = hasActionColumnOverflow ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stickyTh : "";
    const stickyActionHeaderEdgeClass = showActionColumnEdge ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stickyThEdge : "";
    const stickyActionCellClass = hasActionColumnOverflow ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stickyTd : "";
    const stickyActionCellEdgeClass = showActionColumnEdge ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stickyTdEdge : "";
    const menuPosition = activeMenu ? (()=>{
        const viewportWidth = ("TURBOPACK compile-time truthy", 1) ? window.innerWidth : "TURBOPACK unreachable";
        const activeColumn = activeMenu.mode === "cell" ? columns.find((column)=>column.key === activeMenu.colKey) : undefined;
        const allowWideCellDropdown = Boolean(activeColumn && shouldFilterCellOnOpen(activeColumn));
        const desiredWidth = (()=>{
            if (activeMenu.mode === "search") {
                return Math.max(activeMenu.anchorRect.width, isTablet ? 620 : 760);
            }
            if (allowWideCellDropdown) {
                return activeMenu.anchorRect.width + (isTablet ? 32 : 40);
            }
            return activeMenu.anchorRect.width;
        })();
        const minWidth = activeMenu.mode === "search" ? 220 : 120;
        const width = Math.min(desiredWidth, Math.max(minWidth, viewportWidth - 16));
        const rawLeft = Math.max(8, activeMenu.anchorRect.left);
        const left = Math.min(rawLeft, Math.max(8, viewportWidth - width - 8));
        return {
            left,
            top: activeMenu.anchorRect.bottom + 6,
            width
        };
    })() : null;
    const regularOptionEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditableTableModule.useMemo[regularOptionEntries]": ()=>optionsForMenu.map({
                "EditableTableModule.useMemo[regularOptionEntries]": (option, index)=>({
                        option,
                        index
                    })
            }["EditableTableModule.useMemo[regularOptionEntries]"]).filter({
                "EditableTableModule.useMemo[regularOptionEntries]": (entry)=>!isCustomOption(entry.option)
            }["EditableTableModule.useMemo[regularOptionEntries]"])
    }["EditableTableModule.useMemo[regularOptionEntries]"], [
        optionsForMenu
    ]);
    const customOptionEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "EditableTableModule.useMemo[customOptionEntry]": ()=>{
            const index = optionsForMenu.findIndex({
                "EditableTableModule.useMemo[customOptionEntry].index": (option)=>isCustomOption(option)
            }["EditableTableModule.useMemo[customOptionEntry].index"]);
            if (index < 0) return null;
            return {
                option: optionsForMenu[index],
                index
            };
        }
    }["EditableTableModule.useMemo[customOptionEntry]"], [
        optionsForMenu
    ]);
    const showMenuFooter = activeMenu?.mode === "search" || Boolean(customOptionEntry);
    const sideColumnStyle = {
        width: 50,
        minWidth: 50,
        maxWidth: 50
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__RxPadSection__as__TPRxPadSection$3e$__["TPRxPadSection"], {
        title: title,
        icon: icon,
        onTemplateClick: handleTemplateClick,
        onSaveClick: handleSaveClick,
        onClearClick: handleClearClick,
        clearDisabled: !hasAnyData,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                ref: moduleRootRef,
                "data-rx-module-root": "true",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].moduleStack,
                children: [
                    rows.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        ref: tableWrapRef,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tableWrap,
                        onDragOver: (event)=>{
                            if (!draggingRowId) return;
                            event.preventDefault();
                        },
                        onDragLeave: (event)=>{
                            if (!draggingRowId) return;
                            const rect = event.currentTarget.getBoundingClientRect();
                            const withinX = event.clientX >= rect.left && event.clientX <= rect.right;
                            const withinY = event.clientY >= rect.top && event.clientY <= rect.bottom;
                            if (withinX && withinY) return;
                            setDragOverRowId(null);
                        },
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("table", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dataTable,
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("colgroup", {
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("col", {
                                            style: sideColumnStyle
                                        }),
                                        columns.map((column)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("col", {
                                                style: getResponsiveColumnStyle(column)
                                            }, `col-${column.key}`)),
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("col", {
                                            style: sideColumnStyle
                                        })
                                    ]
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("thead", {
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("tr", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].theadRow,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("th", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thSide,
                                                style: sideColumnStyle
                                            }),
                                            columns.map((column)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("th", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thData,
                                                    style: getResponsiveColumnStyle(column),
                                                    children: column.label
                                                }, column.key)),
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("th", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thSticky, stickyActionHeaderClass, stickyActionHeaderEdgeClass),
                                                style: sideColumnStyle
                                            })
                                        ]
                                    })
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("tbody", {
                                    children: rows.map((row, rowIndex)=>(()=>{
                                            const isDraggingRow = draggingRowId === row.id;
                                            const isDropTargetRow = dragOverRowId === row.id && !isDraggingRow;
                                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("tr", {
                                                "data-row-id": row.id,
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tr, pulseRowIds.includes(row.id) && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].trRxEnter, isDraggingRow && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].trDragging, !isDraggingRow && isDropTargetRow && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].trDrop, !isDraggingRow && !isDropTargetRow && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].trHover),
                                                onDragOver: (event)=>{
                                                    if (!draggingRowId) return;
                                                    event.preventDefault();
                                                    setDragOverRowId(row.id);
                                                    if (draggingRowId !== row.id && dragPreviewTargetRef.current !== row.id) {
                                                        dragPreviewTargetRef.current = row.id;
                                                        moveRow(draggingRowId, row.id);
                                                    }
                                                },
                                                onDrop: (event)=>{
                                                    event.preventDefault();
                                                    if (!draggingRowId) return;
                                                    setDragOverRowId(null);
                                                    setDraggingRowId(null);
                                                    dragPreviewTargetRef.current = null;
                                                },
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tdSide,
                                                        style: sideColumnStyle,
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                                            type: "button",
                                                            "data-drag-handle": "true",
                                                            draggable: true,
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dragHandle, isDraggingRow ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dragHandleActive : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dragHandleIdle),
                                                            "aria-label": "Drag to reorder row",
                                                            onDragStart: (event)=>{
                                                                setDraggingRowId(row.id);
                                                                setDragOverRowId(row.id);
                                                                dragPreviewTargetRef.current = row.id;
                                                                event.dataTransfer.effectAllowed = "move";
                                                                try {
                                                                    event.dataTransfer.setData("application/x-rx-row-id", row.id);
                                                                } catch  {
                                                                // keep drag alive in strict browser modes without polluting clipboard text
                                                                }
                                                                if (!transparentDragImageRef.current) {
                                                                    const transparent = new Image();
                                                                    transparent.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                                                                    transparentDragImageRef.current = transparent;
                                                                }
                                                                event.dataTransfer.setDragImage(transparentDragImageRef.current, 0, 0);
                                                            },
                                                            onDragEnd: ()=>{
                                                                setDraggingRowId(null);
                                                                setDragOverRowId(null);
                                                                dragPreviewTargetRef.current = null;
                                                            },
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
                                                                size: 18,
                                                                strokeWidth: 1.5
                                                            })
                                                        })
                                                    }),
                                                    columns.map((column)=>{
                                                        const key = `${row.id}:${column.key}`;
                                                        const hasDropdown = Boolean(column.getOptions);
                                                        const showDropdownToggle = column.showDropdownToggle ?? true;
                                                        const isMultiline = false;
                                                        const isMenuOpen = Boolean(activeMenu && activeMenu.rowId === row.id && activeMenu.colKey === column.key);
                                                        const value = row[column.key] ?? "";
                                                        const displayValue = hasDropdown ? editingCellValues[key] ?? value : value;
                                                        const fieldClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldInput, hasDropdown && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldWithDropdown, ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldTruncate);
                                                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tdCell, activeCell?.rowId === row.id && activeCell?.colKey === column.key && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tdCellActive),
                                                            style: getResponsiveColumnStyle(column),
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cellShell,
                                                                children: [
                                                                    activeCell?.rowId === row.id && activeCell?.colKey === column.key ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].focusRing
                                                                    }) : null,
                                                                    ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("input", {
                                                                        "data-rx-cell-input": "true",
                                                                        ref: (node)=>{
                                                                            inputRefs.current[key] = node;
                                                                        },
                                                                        value: displayValue,
                                                                        title: displayValue || undefined,
                                                                        placeholder: column.placeholder,
                                                                        className: fieldClass,
                                                                        onFocus: (event)=>{
                                                                            setActiveCell({
                                                                                rowId: row.id,
                                                                                colKey: column.key
                                                                            });
                                                                            if (hasDropdown) {
                                                                                beginDropdownEditing(key, value);
                                                                                ensureCellVisibleInTable(event.currentTarget);
                                                                                const len = event.currentTarget.value.length;
                                                                                event.currentTarget.setSelectionRange(len, len);
                                                                            }
                                                                            if (isTablet) {
                                                                                snapFieldToViewportTop(event.currentTarget);
                                                                            }
                                                                            if (hasDropdown) {
                                                                                openCellMenu(row, column, event.currentTarget.getBoundingClientRect(), value, value, !shouldFilterCellOnOpen(column));
                                                                            }
                                                                        },
                                                                        onClick: (event)=>{
                                                                            if (hasDropdown) {
                                                                                beginDropdownEditing(key, value);
                                                                                ensureCellVisibleInTable(event.currentTarget);
                                                                            }
                                                                            if (hasDropdown) {
                                                                                openCellMenu(row, column, event.currentTarget.getBoundingClientRect(), value, value, !shouldFilterCellOnOpen(column));
                                                                            }
                                                                        },
                                                                        onChange: (event)=>{
                                                                            const next = event.currentTarget.value;
                                                                            if (hasDropdown) {
                                                                                beginDropdownEditing(key, next);
                                                                            } else {
                                                                                setCellValue(row.id, column.key, next);
                                                                            }
                                                                            openCellMenu(row, column, event.currentTarget.getBoundingClientRect(), next, next);
                                                                        },
                                                                        onBlur: ()=>{
                                                                            window.setTimeout(()=>{
                                                                                if (hasDropdown) {
                                                                                    endDropdownEditing(key);
                                                                                }
                                                                                setActiveMenu((current)=>{
                                                                                    if (!current) return current;
                                                                                    if (current.rowId !== row.id || current.colKey !== column.key) return current;
                                                                                    return null;
                                                                                });
                                                                                setActiveCell((current)=>{
                                                                                    if (!current) return current;
                                                                                    if (current.rowId !== row.id || current.colKey !== column.key) return current;
                                                                                    return null;
                                                                                });
                                                                            }, 80);
                                                                        },
                                                                        onKeyDown: (event)=>{
                                                                            const colIndex = colIndexByKey[column.key];
                                                                            const menuOpened = activeMenu && activeMenu.rowId === row.id && activeMenu.colKey === column.key && optionsForMenu.length > 0;
                                                                            if (menuOpened && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
                                                                                event.preventDefault();
                                                                                const delta = event.key === "ArrowDown" ? 1 : -1;
                                                                                setActiveMenu((current)=>{
                                                                                    if (!current) return current;
                                                                                    const next = (current.highlightedIndex + delta + optionsForMenu.length) % optionsForMenu.length;
                                                                                    return {
                                                                                        ...current,
                                                                                        highlightedIndex: next
                                                                                    };
                                                                                });
                                                                                return;
                                                                            }
                                                                            if (menuOpened && event.key === "Enter") {
                                                                                event.preventDefault();
                                                                                const picked = optionsForMenu[activeMenu.highlightedIndex] ?? optionsForMenu[0];
                                                                                if (picked) {
                                                                                    const pickedValue = getOptionValue(picked);
                                                                                    setCellValue(row.id, column.key, pickedValue);
                                                                                    if (isCustomOption(picked)) {
                                                                                        registerCustomValue(pickedValue);
                                                                                    }
                                                                                    endDropdownEditing(key);
                                                                                }
                                                                                closeMenu();
                                                                                focusNextFromCell(rowIndex, colIndex);
                                                                                return;
                                                                            }
                                                                            if (event.key === "Escape") {
                                                                                closeMenu();
                                                                                return;
                                                                            }
                                                                            if (event.key === "ArrowUp") {
                                                                                event.preventDefault();
                                                                                if (rowIndex <= 0) {
                                                                                    focusPreviousModuleLastCell();
                                                                                } else {
                                                                                    focusCell(rowIndex - 1, colIndex);
                                                                                }
                                                                                return;
                                                                            }
                                                                            if (event.key === "ArrowDown") {
                                                                                event.preventDefault();
                                                                                if (rowIndex >= rows.length - 1) {
                                                                                    focusOwnSearch();
                                                                                } else {
                                                                                    focusCell(rowIndex + 1, colIndex);
                                                                                }
                                                                                return;
                                                                            }
                                                                            if (event.key === "ArrowLeft") {
                                                                                event.preventDefault();
                                                                                focusPreviousFromCell(rowIndex, colIndex);
                                                                                return;
                                                                            }
                                                                            if (event.key === "ArrowRight") {
                                                                                event.preventDefault();
                                                                                focusNextFromCell(rowIndex, colIndex);
                                                                                return;
                                                                            }
                                                                            if (event.key === "Enter") {
                                                                                event.preventDefault();
                                                                                focusNextFromCell(rowIndex, colIndex);
                                                                            }
                                                                        }
                                                                    }),
                                                                    hasDropdown && showDropdownToggle ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPTooltip"], {
                                                                        title: "Use \u2191 \u2193 to navigate options, press Enter to select",
                                                                        placement: "top",
                                                                        arrow: true,
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                                                            type: "button",
                                                                            "aria-label": "Toggle options",
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dropdownToggle,
                                                                            onMouseDown: (event)=>event.preventDefault(),
                                                                            onClick: ()=>{
                                                                                const inputNode = inputRefs.current[key];
                                                                                if (!inputNode) return;
                                                                                if (isMenuOpen) {
                                                                                    closeMenu();
                                                                                    return;
                                                                                }
                                                                                inputNode.focus();
                                                                                openCellMenu(row, column, inputNode.getBoundingClientRect(), value, value, !shouldFilterCellOnOpen(column));
                                                                            },
                                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                size: 14,
                                                                                strokeWidth: 1.5,
                                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chevron, isMenuOpen && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chevronOpen)
                                                                            })
                                                                        })
                                                                    }) : null
                                                                ]
                                                            })
                                                        }, column.key);
                                                    }),
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("td", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tdAction, stickyActionCellClass, stickyActionCellEdgeClass),
                                                        style: sideColumnStyle,
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                                            type: "button",
                                                            onClick: ()=>removeRow(row.id),
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deleteRow,
                                                            "aria-label": "Delete row",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__["Trash"], {
                                                                color: "currentColor",
                                                                size: 18,
                                                                strokeWidth: 1.5,
                                                                variant: "Linear"
                                                            })
                                                        })
                                                    })
                                                ]
                                            }, row.id);
                                        })())
                                })
                            ]
                        })
                    }) : null,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$rxpad$2d$search$2d$input$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPRxPadSearchInput"], {
                        ref: searchInputRef,
                        "data-rx-module-search": "true",
                        value: searchText,
                        onFocus: ()=>{
                            openSearchMenu(searchText);
                        },
                        onClick: ()=>{
                            openSearchMenu(searchText);
                        },
                        onChange: (event)=>{
                            const next = event.currentTarget.value;
                            setSearchText(next);
                            openSearchMenu(next);
                        },
                        onBlur: ()=>{
                            window.setTimeout(()=>{
                                setActiveMenu((current)=>current?.mode === "search" ? null : current);
                            }, 90);
                        },
                        onKeyDown: (event)=>{
                            const searchMenuOpen = activeMenu?.mode === "search" && optionsForMenu.length > 0;
                            if (searchMenuOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
                                event.preventDefault();
                                const delta = event.key === "ArrowDown" ? 1 : -1;
                                setActiveMenu((current)=>{
                                    if (!current || current.mode !== "search") return current;
                                    const next = (current.highlightedIndex + delta + optionsForMenu.length) % optionsForMenu.length;
                                    return {
                                        ...current,
                                        highlightedIndex: next
                                    };
                                });
                                return;
                            }
                            if (searchMenuOpen && event.key === "Enter") {
                                event.preventDefault();
                                const picked = optionsForMenu[activeMenu.highlightedIndex] ?? optionsForMenu[0];
                                const value = picked ? getOptionValue(picked).trim() : searchText.trim();
                                if (!value) {
                                    focusNextModuleFirstCell();
                                    return;
                                }
                                if (picked && isCustomOption(picked)) {
                                    registerCustomValue(value);
                                }
                                const nextRowIndex = rows.length;
                                addRow(value);
                                setSearchText("");
                                closeMenu();
                                window.requestAnimationFrame(()=>{
                                    focusCell(nextRowIndex, 0);
                                });
                                return;
                            }
                            if (searchMenuOpen && event.key === "Escape") {
                                event.preventDefault();
                                closeMenu();
                                return;
                            }
                            if (event.key === "Enter") {
                                event.preventDefault();
                                const value = searchText.trim();
                                if (!value) {
                                    focusNextModuleFirstCell();
                                    return;
                                }
                                openSearchMenu(value);
                                return;
                            }
                            if (event.key === "ArrowDown") {
                                event.preventDefault();
                                focusNextModuleFirstCell();
                                return;
                            }
                            if (event.key === "ArrowUp") {
                                event.preventDefault();
                                if (rows.length > 0) {
                                    focusCell(rows.length - 1, Math.max(0, columns.length - 1));
                                } else {
                                    focusPreviousModuleLastCell();
                                }
                                return;
                            }
                            if (event.key === "ArrowRight") {
                                event.preventDefault();
                                focusNextModuleSearch();
                                return;
                            }
                            if (event.key === "ArrowLeft") {
                                event.preventDefault();
                                focusPreviousModuleSearch();
                            }
                        },
                        placeholder: searchPlaceholder
                    }),
                    isTablet ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabletChips,
                        children: cannedChips.map((chip)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabletChip,
                                onClick: ()=>addRow(chip),
                                children: chip
                            }, `${id}-${chip}`))
                    }) : null
                ]
            }),
            activeMenu && menuPosition && optionsForMenu.length > 0 && typeof document !== "undefined" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].portalMenu,
                style: {
                    left: menuPosition.left,
                    top: menuPosition.top,
                    width: menuPosition.width
                },
                children: [
                    activeMenu.mode === "search" && activeMenu.query.trim().length === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuSectionHeader,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuSectionLabel,
                            children: "Frequently used"
                        })
                    }) : null,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuListWrap,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                ref: menuListRef,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuList, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuListSpaced),
                                style: {
                                    msOverflowStyle: "none"
                                },
                                children: [
                                    regularOptionEntries.length === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuEmpty,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                size: 14,
                                                strokeWidth: 1.5,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuSearchIcon
                                            }),
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                children: "No results found"
                                            })
                                        ]
                                    }) : null,
                                    regularOptionEntries.map(({ option, index })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                            type: "button",
                                            "data-rx-menu-index": index,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuOption, index === activeMenu.highlightedIndex && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuOptionHi),
                                            onMouseDown: (event)=>event.preventDefault(),
                                            onClick: ()=>{
                                                const value = getOptionValue(option).trim();
                                                if (!value) {
                                                    closeMenu();
                                                    return;
                                                }
                                                if (activeMenu.mode === "search") {
                                                    const nextRowIndex = rows.length;
                                                    addRow(value);
                                                    setSearchText("");
                                                    closeMenu();
                                                    window.requestAnimationFrame(()=>{
                                                        focusCell(nextRowIndex, 0);
                                                    });
                                                    return;
                                                }
                                                if (activeMenu.rowId && activeMenu.colKey) {
                                                    setCellValue(activeMenu.rowId, activeMenu.colKey, value);
                                                    endDropdownEditing(`${activeMenu.rowId}:${activeMenu.colKey}`);
                                                }
                                                closeMenu();
                                            },
                                            children: getOptionLabel(option)
                                        }, `${activeMenu.mode}-${activeMenu.colKey ?? "search"}-${option}`))
                                ]
                            }),
                            menuIndicator.hasOverflow ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scrollTrack
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scrollThumb,
                                        style: {
                                            top: `${menuIndicator.thumbTop + 8}px`,
                                            height: `${menuIndicator.thumbHeight}px`
                                        }
                                    })
                                ]
                            }) : null
                        ]
                    }),
                    showMenuFooter ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuFooter,
                        children: [
                            customOptionEntry ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                                type: "button",
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].customAdd, customOptionEntry.index === activeMenu.highlightedIndex && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].customAddHi),
                                onMouseDown: (event)=>event.preventDefault(),
                                onClick: ()=>{
                                    const value = getOptionValue(customOptionEntry.option).trim();
                                    if (!value) {
                                        closeMenu();
                                        return;
                                    }
                                    registerCustomValue(value);
                                    if (activeMenu.mode === "search") {
                                        const nextRowIndex = rows.length;
                                        addRow(value);
                                        setSearchText("");
                                        closeMenu();
                                        window.requestAnimationFrame(()=>{
                                            focusCell(nextRowIndex, 0);
                                        });
                                        return;
                                    }
                                    if (activeMenu.rowId && activeMenu.colKey) {
                                        setCellValue(activeMenu.rowId, activeMenu.colKey, value);
                                        endDropdownEditing(`${activeMenu.rowId}:${activeMenu.colKey}`);
                                    }
                                    closeMenu();
                                },
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 14,
                                        strokeWidth: 1.5
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].customTruncate,
                                        children: `Add custom: "${getOptionValue(customOptionEntry.option)}"`
                                    })
                                ]
                            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {}),
                            activeMenu.mode === "search" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hintRow,
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hintItem,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("kbd", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].kbd,
                                                children: "\u2191"
                                            }),
                                            "Up"
                                        ]
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hintItem,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("kbd", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].kbd,
                                                children: "\u2193"
                                            }),
                                            "Down"
                                        ]
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hintItem,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("kbd", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].kbd,
                                                children: "\u21B5"
                                            }),
                                            "Enter"
                                        ]
                                    }),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hintItem,
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("kbd", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].kbd,
                                                children: "Esc"
                                            }),
                                            "Close"
                                        ]
                                    })
                                ]
                            }) : null
                        ]
                    }) : null
                ]
            }), document.body) : null
        ]
    });
}
_s1(EditableTableModule, "d09ggye/RKBp7QPtSTaUoRm/jBM=", false, function() {
    return [
        useTabletMode
    ];
});
_c = EditableTableModule;
function RxPadFunctional() {
    _s2();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const patientId = searchParams?.get("patientId") ?? "apt-1";
    const { lastCopyRequest } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$sync$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRxPadSync"])();
    const lastHandledCopyId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const [symptomRows, setSymptomRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [examinationRows, setExaminationRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [examinationPulseIds, setExaminationPulseIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [diagnosisRows, setDiagnosisRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [medicationRows, setMedicationRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [adviceRows, setAdviceRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [labRows, setLabRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [surgeryRows, setSurgeryRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [additionalNotes, setAdditionalNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [followUp, setFollowUp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const toPreviewLine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RxPadFunctional.useCallback[toPreviewLine]": (title, metaParts)=>({
                title: title.trim(),
                metaParts: metaParts.map({
                    "RxPadFunctional.useCallback[toPreviewLine]": (part)=>(part ?? "").trim()
                }["RxPadFunctional.useCallback[toPreviewLine]"]).filter(Boolean)
            })
    }["RxPadFunctional.useCallback[toPreviewLine]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RxPadFunctional.useEffect": ()=>{
            if (!lastCopyRequest || lastHandledCopyId.current === lastCopyRequest.id) return;
            lastHandledCopyId.current = lastCopyRequest.id;
            const payload = lastCopyRequest.payload;
            if (payload.symptoms?.length) {
                setSymptomRows({
                    "RxPadFunctional.useEffect": (prev)=>[
                            ...prev,
                            ...payload.symptoms?.map({
                                "RxPadFunctional.useEffect": (item)=>({
                                        id: getRowId("symptoms"),
                                        name: item,
                                        since: "1 day",
                                        status: "Moderate",
                                        note: `From ${payload.sourceDateLabel}`
                                    })
                            }["RxPadFunctional.useEffect"]) ?? []
                        ]
                }["RxPadFunctional.useEffect"]);
            }
            if (payload.examinations?.length) {
                const added = payload.examinations.map({
                    "RxPadFunctional.useEffect.added": (item)=>({
                            id: getRowId("exam"),
                            name: item,
                            note: `From ${payload.sourceDateLabel}`
                        })
                }["RxPadFunctional.useEffect.added"]);
                setExaminationRows({
                    "RxPadFunctional.useEffect": (prev)=>[
                            ...prev,
                            ...added
                        ]
                }["RxPadFunctional.useEffect"]);
                setExaminationPulseIds(added.map({
                    "RxPadFunctional.useEffect": (r)=>r.id
                }["RxPadFunctional.useEffect"]));
                window.setTimeout({
                    "RxPadFunctional.useEffect": ()=>setExaminationPulseIds([])
                }["RxPadFunctional.useEffect"], 650);
            }
            if (payload.diagnoses?.length) {
                setDiagnosisRows({
                    "RxPadFunctional.useEffect": (prev)=>[
                            ...prev,
                            ...payload.diagnoses?.map({
                                "RxPadFunctional.useEffect": (item)=>({
                                        id: getRowId("diagnosis"),
                                        name: item,
                                        since: "1 day",
                                        status: "Suspected",
                                        note: `From ${payload.sourceDateLabel}`
                                    })
                            }["RxPadFunctional.useEffect"]) ?? []
                        ]
                }["RxPadFunctional.useEffect"]);
            }
            if (payload.medications?.length) {
                setMedicationRows({
                    "RxPadFunctional.useEffect": (prev)=>[
                            ...prev,
                            ...payload.medications?.map({
                                "RxPadFunctional.useEffect": (item)=>({
                                        id: getRowId("med"),
                                        medicine: item.medicine,
                                        unitPerDose: item.unitPerDose,
                                        frequency: item.frequency,
                                        when: item.when,
                                        duration: item.duration,
                                        note: item.note || `From ${payload.sourceDateLabel}`
                                    })
                            }["RxPadFunctional.useEffect"]) ?? []
                        ]
                }["RxPadFunctional.useEffect"]);
            }
            if (payload.labInvestigations?.length) {
                setLabRows({
                    "RxPadFunctional.useEffect": (prev)=>[
                            ...prev,
                            ...payload.labInvestigations?.map({
                                "RxPadFunctional.useEffect": (item)=>({
                                        id: getRowId("lab"),
                                        investigation: item,
                                        note: `From ${payload.sourceDateLabel}`
                                    })
                            }["RxPadFunctional.useEffect"]) ?? []
                        ]
                }["RxPadFunctional.useEffect"]);
            }
            if (payload.advice) {
                setAdviceRows({
                    "RxPadFunctional.useEffect": (prev)=>[
                            ...prev,
                            {
                                id: getRowId("advice"),
                                advice: payload.advice || "",
                                note: `From ${payload.sourceDateLabel}`
                            }
                        ]
                }["RxPadFunctional.useEffect"]);
            }
            if (payload.followUp) {
                setFollowUp(payload.followUp);
            }
            if (payload.additionalNotes) {
                setAdditionalNotes(payload.additionalNotes);
            }
        }
    }["RxPadFunctional.useEffect"], [
        lastCopyRequest
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RxPadFunctional.useEffect": ()=>{
            const snapshot = {
                patientId,
                updatedAt: new Date().toISOString(),
                symptoms: symptomRows.filter({
                    "RxPadFunctional.useEffect": (row)=>(row.name ?? "").trim().length > 0
                }["RxPadFunctional.useEffect"]).map({
                    "RxPadFunctional.useEffect": (row)=>toPreviewLine(row.name ?? "", [
                            row.since,
                            row.status,
                            row.note
                        ])
                }["RxPadFunctional.useEffect"]),
                examinations: examinationRows.filter({
                    "RxPadFunctional.useEffect": (row)=>(row.name ?? "").trim().length > 0
                }["RxPadFunctional.useEffect"]).map({
                    "RxPadFunctional.useEffect": (row)=>toPreviewLine(row.name ?? "", [
                            row.note
                        ])
                }["RxPadFunctional.useEffect"]),
                diagnoses: diagnosisRows.filter({
                    "RxPadFunctional.useEffect": (row)=>(row.name ?? "").trim().length > 0
                }["RxPadFunctional.useEffect"]).map({
                    "RxPadFunctional.useEffect": (row)=>toPreviewLine(row.name ?? "", [
                            row.since,
                            row.status,
                            row.note
                        ])
                }["RxPadFunctional.useEffect"]),
                labInvestigations: labRows.filter({
                    "RxPadFunctional.useEffect": (row)=>(row.investigation ?? "").trim().length > 0
                }["RxPadFunctional.useEffect"]).map({
                    "RxPadFunctional.useEffect": (row)=>toPreviewLine(row.investigation ?? "", [
                            row.note
                        ])
                }["RxPadFunctional.useEffect"]),
                medications: medicationRows.filter({
                    "RxPadFunctional.useEffect": (row)=>(row.medicine ?? "").trim().length > 0
                }["RxPadFunctional.useEffect"]).map({
                    "RxPadFunctional.useEffect": (row)=>toPreviewLine(row.medicine ?? "", [
                            row.unitPerDose,
                            row.frequency,
                            row.when,
                            row.duration,
                            row.note
                        ])
                }["RxPadFunctional.useEffect"]),
                advice: adviceRows.filter({
                    "RxPadFunctional.useEffect": (row)=>(row.advice ?? "").trim().length > 0
                }["RxPadFunctional.useEffect"]).map({
                    "RxPadFunctional.useEffect": (row)=>toPreviewLine(row.advice ?? "", [
                            row.note
                        ])
                }["RxPadFunctional.useEffect"]),
                followUp: followUp.trim() || undefined,
                additionalNotes: additionalNotes.trim() || undefined
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rx$2d$preview$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveRxPreviewSnapshot"])(patientId, snapshot);
        }
    }["RxPadFunctional.useEffect"], [
        patientId,
        symptomRows,
        examinationRows,
        diagnosisRows,
        labRows,
        medicationRows,
        adviceRows,
        followUp,
        additionalNotes,
        toPreviewLine
    ]);
    const symptomsColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RxPadFunctional.useMemo[symptomsColumns]": ()=>[
                {
                    key: "name",
                    label: "SYMPTOMS NAME",
                    width: 275,
                    minWidth: 220,
                    maxWidth: 320,
                    placeholder: "e.g. Fever",
                    showDropdownToggle: false,
                    getOptions: {
                        "RxPadFunctional.useMemo[symptomsColumns]": (query)=>getCatalogOptions(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$sample$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["symptomSuggestions"], query)
                    }["RxPadFunctional.useMemo[symptomsColumns]"]
                },
                {
                    key: "since",
                    label: "SINCE",
                    width: 130,
                    minWidth: 120,
                    maxWidth: 140,
                    placeholder: "e.g. 2 days",
                    getOptions: {
                        "RxPadFunctional.useMemo[symptomsColumns]": (query, row)=>getSinceOptions(getSeedQuery(query, row.since ?? ""))
                    }["RxPadFunctional.useMemo[symptomsColumns]"],
                    restrictToOptions: true
                },
                {
                    key: "status",
                    label: "STATUS",
                    width: 150,
                    minWidth: 135,
                    maxWidth: 170,
                    placeholder: "e.g. Moderate",
                    getOptions: {
                        "RxPadFunctional.useMemo[symptomsColumns]": (query)=>filterByQuery([
                                "Severe",
                                "Moderate",
                                "Mild"
                            ], query)
                    }["RxPadFunctional.useMemo[symptomsColumns]"],
                    restrictToOptions: true
                },
                {
                    key: "note",
                    label: "NOTE",
                    width: 180,
                    minWidth: 140,
                    maxWidth: 220,
                    multiline: true,
                    maxLines: 2,
                    placeholder: "Notes"
                }
            ]
    }["RxPadFunctional.useMemo[symptomsColumns]"], []);
    const examinationsColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RxPadFunctional.useMemo[examinationsColumns]": ()=>[
                {
                    key: "name",
                    label: "EXAMINATION NAME",
                    width: 300,
                    minWidth: 240,
                    maxWidth: 360,
                    placeholder: "e.g. Left knee tenderness",
                    showDropdownToggle: false,
                    getOptions: {
                        "RxPadFunctional.useMemo[examinationsColumns]": (query)=>getCatalogOptions(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$sample$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["examinationSuggestions"], query)
                    }["RxPadFunctional.useMemo[examinationsColumns]"]
                },
                {
                    key: "note",
                    label: "NOTE",
                    width: 180,
                    minWidth: 140,
                    maxWidth: 220,
                    multiline: true,
                    maxLines: 2,
                    placeholder: "Notes"
                }
            ]
    }["RxPadFunctional.useMemo[examinationsColumns]"], []);
    const diagnosisColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RxPadFunctional.useMemo[diagnosisColumns]": ()=>[
                {
                    key: "name",
                    label: "DIAGNOSIS NAME",
                    width: 300,
                    minWidth: 240,
                    maxWidth: 360,
                    placeholder: "e.g. Viral pharyngitis",
                    showDropdownToggle: false,
                    getOptions: {
                        "RxPadFunctional.useMemo[diagnosisColumns]": (query)=>getCatalogOptions(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$sample$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diagnosisSuggestions"], query)
                    }["RxPadFunctional.useMemo[diagnosisColumns]"]
                },
                {
                    key: "since",
                    label: "SINCE",
                    width: 130,
                    minWidth: 120,
                    maxWidth: 140,
                    placeholder: "e.g. 2 days",
                    getOptions: {
                        "RxPadFunctional.useMemo[diagnosisColumns]": (query, row)=>getSinceOptions(getSeedQuery(query, row.since ?? ""))
                    }["RxPadFunctional.useMemo[diagnosisColumns]"],
                    restrictToOptions: true
                },
                {
                    key: "status",
                    label: "STATUS",
                    width: 150,
                    minWidth: 135,
                    maxWidth: 170,
                    placeholder: "e.g. Suspected",
                    getOptions: {
                        "RxPadFunctional.useMemo[diagnosisColumns]": (query)=>filterByQuery([
                                "Suspected",
                                "Ruled Out",
                                "Confirmed"
                            ], query)
                    }["RxPadFunctional.useMemo[diagnosisColumns]"],
                    restrictToOptions: true
                },
                {
                    key: "note",
                    label: "NOTE",
                    width: 180,
                    minWidth: 140,
                    maxWidth: 220,
                    multiline: true,
                    maxLines: 2,
                    placeholder: "Notes"
                }
            ]
    }["RxPadFunctional.useMemo[diagnosisColumns]"], []);
    const medicationColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RxPadFunctional.useMemo[medicationColumns]": ()=>[
                {
                    key: "medicine",
                    label: "MEDICINE NAME",
                    width: 240,
                    minWidth: 200,
                    maxWidth: 300,
                    multiline: true,
                    maxLines: 2,
                    placeholder: "e.g. Paracetamol 650mg",
                    showDropdownToggle: false,
                    getOptions: {
                        "RxPadFunctional.useMemo[medicationColumns]": (query)=>getCatalogOptions(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$sample$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["medicationSuggestions"], query)
                    }["RxPadFunctional.useMemo[medicationColumns]"]
                },
                {
                    key: "unitPerDose",
                    label: "UNIT PER DOSE",
                    width: 140,
                    minWidth: 120,
                    maxWidth: 160,
                    placeholder: "e.g. 1 tablet",
                    getOptions: {
                        "RxPadFunctional.useMemo[medicationColumns]": (query)=>getMedicationUnitOptions(query)
                    }["RxPadFunctional.useMemo[medicationColumns]"],
                    restrictToOptions: true
                },
                {
                    key: "frequency",
                    label: "FREQUENCY",
                    width: 150,
                    minWidth: 130,
                    maxWidth: 170,
                    placeholder: "e.g. 1-0-1",
                    getOptions: {
                        "RxPadFunctional.useMemo[medicationColumns]": (query)=>getFrequencyOptions(query)
                    }["RxPadFunctional.useMemo[medicationColumns]"],
                    restrictToOptions: true
                },
                {
                    key: "when",
                    label: "WHEN",
                    width: 150,
                    minWidth: 120,
                    maxWidth: 180,
                    placeholder: "e.g. After Food",
                    getOptions: {
                        "RxPadFunctional.useMemo[medicationColumns]": (query)=>filterByQuery(MEDICATION_WHEN_OPTIONS, query)
                    }["RxPadFunctional.useMemo[medicationColumns]"],
                    restrictToOptions: true
                },
                {
                    key: "duration",
                    label: "DURATION",
                    width: 150,
                    minWidth: 130,
                    maxWidth: 190,
                    placeholder: "e.g. 5 days",
                    getOptions: {
                        "RxPadFunctional.useMemo[medicationColumns]": (query, row)=>getDurationOptions(getSeedQuery(query, row.duration ?? ""))
                    }["RxPadFunctional.useMemo[medicationColumns]"]
                },
                {
                    key: "note",
                    label: "NOTE",
                    width: 190,
                    minWidth: 150,
                    maxWidth: 240,
                    multiline: true,
                    maxLines: 2,
                    placeholder: "Notes"
                }
            ]
    }["RxPadFunctional.useMemo[medicationColumns]"], []);
    const adviceColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RxPadFunctional.useMemo[adviceColumns]": ()=>[
                {
                    key: "advice",
                    label: "ADVICE NAME",
                    width: 420,
                    minWidth: 320,
                    maxWidth: 560,
                    multiline: true,
                    maxLines: 3,
                    placeholder: "e.g. Drink warm water",
                    showDropdownToggle: false,
                    getOptions: {
                        "RxPadFunctional.useMemo[adviceColumns]": (query)=>getCatalogOptions(ADVICE_SUGGESTIONS, query)
                    }["RxPadFunctional.useMemo[adviceColumns]"]
                },
                {
                    key: "note",
                    label: "NOTE",
                    width: 220,
                    minWidth: 160,
                    maxWidth: 260,
                    multiline: true,
                    maxLines: 2,
                    placeholder: "Notes"
                }
            ]
    }["RxPadFunctional.useMemo[adviceColumns]"], []);
    const labColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RxPadFunctional.useMemo[labColumns]": ()=>[
                {
                    key: "investigation",
                    label: "INVESTIGATION NAME",
                    width: 420,
                    minWidth: 320,
                    maxWidth: 560,
                    multiline: true,
                    maxLines: 2,
                    placeholder: "e.g. Complete blood count",
                    showDropdownToggle: false,
                    getOptions: {
                        "RxPadFunctional.useMemo[labColumns]": (query)=>getCatalogOptions(LAB_INVESTIGATION_BASE_OPTIONS, query)
                    }["RxPadFunctional.useMemo[labColumns]"]
                },
                {
                    key: "note",
                    label: "NOTE",
                    width: 220,
                    minWidth: 160,
                    maxWidth: 260,
                    multiline: true,
                    maxLines: 2,
                    placeholder: "Notes"
                }
            ]
    }["RxPadFunctional.useMemo[labColumns]"], []);
    const surgeryColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RxPadFunctional.useMemo[surgeryColumns]": ()=>[
                {
                    key: "surgery",
                    label: "SURGERY NAME",
                    width: 420,
                    minWidth: 320,
                    maxWidth: 560,
                    multiline: true,
                    maxLines: 2,
                    placeholder: "e.g. Laparoscopic appendectomy",
                    showDropdownToggle: false,
                    getOptions: {
                        "RxPadFunctional.useMemo[surgeryColumns]": (query)=>getCatalogOptions(SURGERY_SUGGESTIONS, query)
                    }["RxPadFunctional.useMemo[surgeryColumns]"]
                },
                {
                    key: "note",
                    label: "NOTE",
                    width: 220,
                    minWidth: 160,
                    maxWidth: 260,
                    multiline: true,
                    maxLines: 2,
                    placeholder: "Notes"
                }
            ]
    }["RxPadFunctional.useMemo[surgeryColumns]"], []);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rxRoot,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(EditableTableModule, {
                id: "symptoms",
                title: "Chief Complaints",
                icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                    name: "Virus",
                    variant: "bulk",
                    size: 24,
                    color: "var(--tp-violet-500)"
                }),
                columns: symptomsColumns,
                primaryKey: "name",
                rows: symptomRows,
                onChangeRows: setSymptomRows,
                searchPlaceholder: "Search & Add Chief Complaint",
                searchSuggestions: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$sample$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["symptomSuggestions"],
                cannedChips: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$sample$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["symptomSuggestions"].slice(0, 12)
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(EditableTableModule, {
                id: "examinations",
                title: "Examinations",
                icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                    name: "medical service",
                    variant: "bulk",
                    size: 24,
                    color: "var(--tp-violet-500)"
                }),
                columns: examinationsColumns,
                primaryKey: "name",
                rows: examinationRows,
                onChangeRows: setExaminationRows,
                searchPlaceholder: "Search & Add Examinations",
                searchSuggestions: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$sample$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["examinationSuggestions"],
                cannedChips: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$sample$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["examinationSuggestions"].slice(0, 12),
                pulseRowIds: examinationPulseIds
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(EditableTableModule, {
                id: "diagnosis",
                title: "Diagnosis",
                icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                    name: "Diagnosis",
                    variant: "bulk",
                    size: 24,
                    color: "var(--tp-violet-500)"
                }),
                columns: diagnosisColumns,
                primaryKey: "name",
                rows: diagnosisRows,
                onChangeRows: setDiagnosisRows,
                searchPlaceholder: "Search & Add Diagnosis",
                searchSuggestions: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$sample$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diagnosisSuggestions"],
                cannedChips: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$sample$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["diagnosisSuggestions"].slice(0, 12)
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(EditableTableModule, {
                id: "lab",
                title: "Investigations",
                icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                    name: "Test Tube",
                    variant: "bulk",
                    size: 24,
                    color: "var(--tp-violet-500)"
                }),
                columns: labColumns,
                primaryKey: "investigation",
                rows: labRows,
                onChangeRows: setLabRows,
                searchPlaceholder: "Search & Add Investigation",
                cannedChips: LAB_INVESTIGATION_BASE_OPTIONS
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(EditableTableModule, {
                id: "medication",
                title: "Medication (Rx)",
                icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                    name: "Tablets",
                    variant: "bulk",
                    size: 24,
                    color: "var(--tp-violet-500)"
                }),
                columns: medicationColumns,
                primaryKey: "medicine",
                rows: medicationRows,
                onChangeRows: setMedicationRows,
                searchPlaceholder: "Search & Add Medication (Rx)",
                searchSuggestions: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$sample$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["medicationSuggestions"],
                cannedChips: [
                    "Paracetamol 650mg",
                    "Amoxicillin 500mg",
                    "Pantoprazole 40mg",
                    "Cetirizine 10mg",
                    "Ondansetron 4mg",
                    "ORS Sachet",
                    "Multivitamin",
                    "Ibuprofen 400mg"
                ]
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(EditableTableModule, {
                id: "advice",
                title: "Advice",
                icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$medical$2d$icons$2f$TPMedicalIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPMedicalIcon"], {
                    name: "health care",
                    variant: "bulk",
                    size: 24,
                    color: "var(--tp-violet-500)"
                }),
                columns: adviceColumns,
                primaryKey: "advice",
                rows: adviceRows,
                onChangeRows: setAdviceRows,
                searchPlaceholder: "Search & Add Advice",
                cannedChips: ADVICE_SUGGESTIONS
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notesGrid,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__RxPadSection__as__TPRxPadSection$3e$__["TPRxPadSection"], {
                        title: "Follow-up",
                        icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Calendar2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar2$3e$__["Calendar2"], {
                            size: 24,
                            variant: "Bulk",
                            color: "var(--tp-violet-500)"
                        }),
                        showHeaderActions: false,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].followStack,
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("input", {
                                    value: followUp,
                                    onChange: (event)=>setFollowUp(event.currentTarget.value),
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].followInput,
                                    placeholder: "e.g. 3 days"
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].followQuickRow,
                                    children: [
                                        "2 days",
                                        "1 week",
                                        "1 month",
                                        "3 months"
                                    ].map((quick)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                            type: "button",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].followQuick,
                                            onClick: ()=>setFollowUp(quick),
                                            children: quick
                                        }, quick))
                                })
                            ]
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__RxPadSection__as__TPRxPadSection$3e$__["TPRxPadSection"], {
                        title: "Additional Notes",
                        icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$Notepad2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Notepad2$3e$__["Notepad2"], {
                            size: 24,
                            variant: "Bulk",
                            color: "var(--tp-violet-500)"
                        }),
                        showHeaderActions: false,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("textarea", {
                            value: additionalNotes,
                            onChange: (event)=>setAdditionalNotes(event.currentTarget.value),
                            rows: 5,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].notesTextarea,
                            placeholder: "Enter additional notes"
                        })
                    })
                ]
            })
        ]
    });
}
_s2(RxPadFunctional, "EeWHsbgCPxc58m7zwLLkBonRja4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$sync$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRxPadSync"]
    ];
});
_c1 = RxPadFunctional;
var _c, _c1;
__turbopack_context__.k.register(_c, "EditableTableModule");
__turbopack_context__.k.register(_c1, "RxPadFunctional");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/rx/rxpad/RxPad.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RxPad",
    ()=>RxPad
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/rx/rxpad/RxPadFunctional.jsx [app-client] (ecmascript)");
"use client";
;
;
function RxPad() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPadFunctional$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RxPadFunctional"], {});
}
_c = RxPad;
var _c;
__turbopack_context__.k.register(_c, "RxPad");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/button.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    });
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/alert-dialog.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialog",
    ()=>AlertDialog,
    "AlertDialogAction",
    ()=>AlertDialogAction,
    "AlertDialogCancel",
    ()=>AlertDialogCancel,
    "AlertDialogContent",
    ()=>AlertDialogContent,
    "AlertDialogDescription",
    ()=>AlertDialogDescription,
    "AlertDialogFooter",
    ()=>AlertDialogFooter,
    "AlertDialogHeader",
    ()=>AlertDialogHeader,
    "AlertDialogOverlay",
    ()=>AlertDialogOverlay,
    "AlertDialogPortal",
    ()=>AlertDialogPortal,
    "AlertDialogTitle",
    ()=>AlertDialogTitle,
    "AlertDialogTrigger",
    ()=>AlertDialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.jsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function AlertDialog({ ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "alert-dialog",
        ...props
    });
}
_c = AlertDialog;
function AlertDialogTrigger({ ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "alert-dialog-trigger",
        ...props
    });
}
_c1 = AlertDialogTrigger;
function AlertDialogPortal({ ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "alert-dialog-portal",
        ...props
    });
}
_c2 = AlertDialogPortal;
function AlertDialogOverlay({ className, ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "alert-dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className),
        ...props
    });
}
_c3 = AlertDialogOverlay;
function AlertDialogContent({ className, ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(AlertDialogPortal, {
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(AlertDialogOverlay, {}),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "alert-dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg', className),
                ...props
            })
        ]
    });
}
_c4 = AlertDialogContent;
function AlertDialogHeader({ className, ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        "data-slot": "alert-dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2 text-center sm:text-left', className),
        ...props
    });
}
_c5 = AlertDialogHeader;
function AlertDialogFooter({ className, ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        "data-slot": "alert-dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className),
        ...props
    });
}
_c6 = AlertDialogFooter;
function AlertDialogTitle({ className, ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "alert-dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-lg font-semibold', className),
        ...props
    });
}
_c7 = AlertDialogTitle;
function AlertDialogDescription({ className, ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "alert-dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    });
}
_c8 = AlertDialogDescription;
function AlertDialogAction({ className, ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonVariants"])(), className),
        ...props
    });
}
_c9 = AlertDialogAction;
function AlertDialogCancel({ className, ...props }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cancel"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonVariants"])({
            variant: 'outline'
        }), className),
        ...props
    });
}
_c10 = AlertDialogCancel;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "AlertDialog");
__turbopack_context__.k.register(_c1, "AlertDialogTrigger");
__turbopack_context__.k.register(_c2, "AlertDialogPortal");
__turbopack_context__.k.register(_c3, "AlertDialogOverlay");
__turbopack_context__.k.register(_c4, "AlertDialogContent");
__turbopack_context__.k.register(_c5, "AlertDialogHeader");
__turbopack_context__.k.register(_c6, "AlertDialogFooter");
__turbopack_context__.k.register(_c7, "AlertDialogTitle");
__turbopack_context__.k.register(_c8, "AlertDialogDescription");
__turbopack_context__.k.register(_c9, "AlertDialogAction");
__turbopack_context__.k.register(_c10, "AlertDialogCancel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/ui-icons.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExpandIcon",
    ()=>ExpandIcon,
    "MinimizeIcon",
    ()=>MinimizeIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
"use client";
;
function ExpandIcon({ size = 16, color, className, style }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 256 256",
        fill: "none",
        className: className,
        style: {
            color,
            ...style
        },
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("polyline", {
                points: "160 48 208 48 208 96",
                fill: "none",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("line", {
                x1: "152",
                y1: "104",
                x2: "208",
                y2: "48",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("polyline", {
                points: "96 208 48 208 48 160",
                fill: "none",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("line", {
                x1: "104",
                y1: "152",
                x2: "48",
                y2: "208",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("polyline", {
                points: "208 160 208 208 160 208",
                fill: "none",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("line", {
                x1: "152",
                y1: "152",
                x2: "208",
                y2: "208",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("polyline", {
                points: "48 96 48 48 96 48",
                fill: "none",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("line", {
                x1: "104",
                y1: "104",
                x2: "48",
                y2: "48",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            })
        ]
    });
}
_c = ExpandIcon;
function MinimizeIcon({ size = 16, color }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 256 256",
        fill: "none",
        style: {
            color
        },
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("polyline", {
                points: "192 104 152 104 152 64",
                fill: "none",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("line", {
                x1: "208",
                y1: "48",
                x2: "152",
                y2: "104",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("polyline", {
                points: "64 152 104 152 104 192",
                fill: "none",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("line", {
                x1: "48",
                y1: "208",
                x2: "104",
                y2: "152",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("polyline", {
                points: "152 192 152 152 192 152",
                fill: "none",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("line", {
                x1: "208",
                y1: "208",
                x2: "152",
                y2: "152",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("polyline", {
                points: "104 64 104 104 64 104",
                fill: "none",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("line", {
                x1: "48",
                y1: "48",
                x2: "104",
                y2: "104",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "16"
            })
        ]
    });
}
_c1 = MinimizeIcon;
var _c, _c1;
__turbopack_context__.k.register(_c, "ExpandIcon");
__turbopack_context__.k.register(_c1, "MinimizeIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/DentitionView.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DentitionView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/web/Html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Center.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/Tooth.jsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const ArchTooth = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = _s(function ArchTooth({ tooth, archPose, toothScale = 1, diagnoses, findings, treatmentHistoryTags, showTreatmentTags = true, isImplant, isHovered, isPinned, agentPulse = false, highlightActive = false, inHighlight = false, onHover, onClick, onPin }) {
    _s();
    const { gl, camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const gltf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])(tooth.modelPath);
    const implantGltf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])('/models/implant.glb');
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); // Center ref (for bounding box)
    const outerGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); // mirrorX group (parentGroup for diagnosis visuals)
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isMissing = diagnoses?.has('Missing') || diagnoses?.has('Extraction') || false;
    const isCrown = diagnoses?.has('Crown') || false;
    const isRCT = diagnoses?.has('RCT') || false;
    const isBridge = diagnoses?.has('Bridge') || false;
    const isDenture = diagnoses?.has('Denture') || false;
    // Fresh clone on every mount — mount generation forces a new clone so that
    // switching tabs (Adult→Pedia→Adult) always starts with clean materials.
    const [mountGen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ArchTooth.ArchTooth.useState": ()=>Math.random()
    }["ArchTooth.ArchTooth.useState"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const clonedScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ArchTooth.ArchTooth.useMemo[clonedScene]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneSceneWithUniqueMaterials"])(gltf.scene)
    }["ArchTooth.ArchTooth.useMemo[clonedScene]"], [
        gltf,
        mountGen
    ]);
    // Implant placement state + tooth mesh ref for procedural implant
    const [implantPlacement, setImplantPlacement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Mesh bounds + dirs for PreparedStump and RootCanals
    const [meshBoundsData, setMeshBoundsData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [zoneDirs, setZoneDirs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const toothMeshRefLocal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const implantBB = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const shaderRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const shaderInjectedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const zoneFindingsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]);
    // Update findings ref whenever findings change — picked up next frame
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArchTooth.ArchTooth.useEffect": ()=>{
            const order = [
                'occlusal',
                'buccal',
                'lingual',
                'mesial',
                'distal',
                'cervical',
                'root'
            ];
            zoneFindingsRef.current = order.map({
                "ArchTooth.ArchTooth.useEffect": (z)=>findings.some({
                        "ArchTooth.ArchTooth.useEffect": (f)=>f.zoneId === z
                    }["ArchTooth.ArchTooth.useEffect"]) ? 1 : 0
            }["ArchTooth.ArchTooth.useEffect"]);
        }
    }["ArchTooth.ArchTooth.useEffect"], [
        findings
    ]);
    // Push finding-tint uniform every frame
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "ArchTooth.ArchTooth.useFrame": ()=>{
            const zf = zoneFindingsRef.current;
            for (const ref of shaderRefs.current){
                const s = ref.shader;
                if (!s?.uniforms?.uZoneHasFinding) continue;
                const arr = s.uniforms.uZoneHasFinding.value;
                arr[0] = zf[0];
                arr[1] = zf[1];
                arr[2] = zf[2];
                arr[3] = zf[3];
                arr[4] = zf[4];
                arr[5] = zf[5];
                arr[6] = zf[6];
            }
        }
    }["ArchTooth.ArchTooth.useFrame"]);
    // Capture first mesh from cloned scene
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ArchTooth.ArchTooth.useMemo": ()=>{
            toothMeshRefLocal.current = null;
            clonedScene.traverse({
                "ArchTooth.ArchTooth.useMemo": (obj)=>{
                    const m = obj;
                    if (m.isMesh && !toothMeshRefLocal.current) {
                        toothMeshRefLocal.current = m;
                    }
                }
            }["ArchTooth.ArchTooth.useMemo"]);
        }
    }["ArchTooth.ArchTooth.useMemo"], [
        clonedScene
    ]);
    // After mount: compute bounding box and inject the SAME shader as single-tooth view
    // No guard ref — always re-inject when diagnosis flags change.
    // Uses requestAnimationFrame to wait for <Center> layout.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "ArchTooth.ArchTooth.useLayoutEffect": ()=>{
            shaderInjectedRef.current = false;
            shaderRefs.current = [];
            let cancelled = false;
            let rafOuter = 0;
            let rafInner = 0;
            const applyToCurrentScene = {
                "ArchTooth.ArchTooth.useLayoutEffect.applyToCurrentScene": ()=>{
                    if (cancelled) return false;
                    if (shaderInjectedRef.current) return true;
                    if (!groupRef.current) return false;
                    // Walk UP the ancestor chain first so groupRef.matrixWorld reflects
                    // the dentition parent-group offset (position: [-contentCenter, ...])
                    // and the arch-pose outer group. On first mount inside a useLayoutEffect
                    // the parent matrices are still identity (no frame has rendered yet),
                    // so updateMatrixWorld(true) alone yields a LOCAL-space bbox which makes
                    // uCejY/uCervicalY wildly wrong and the crown-root gradient saturates
                    // into the root tint across every tooth.
                    groupRef.current.updateWorldMatrix(true, true);
                    const bb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]().setFromObject(groupRef.current);
                    const sizeProbe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                    bb.getSize(sizeProbe);
                    if (sizeProbe.lengthSq() < 1e-8) return false;
                    const center = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                    const size = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                    bb.getCenter(center);
                    bb.getSize(size);
                    let cervicalY, cejY, crownBottomY;
                    if (tooth.arch === 'maxillary') {
                        cervicalY = bb.min.y + size.y * 0.42;
                        cejY = bb.min.y + size.y * 0.50;
                        crownBottomY = bb.min.y;
                    } else {
                        cervicalY = bb.max.y - size.y * 0.42;
                        cejY = bb.max.y - size.y * 0.50;
                        crownBottomY = bb.max.y;
                    }
                    const quadNum = parseInt(tooth.fdi[0]);
                    const zoneYawRad = quadNum === 1 || quadNum === 4 ? -Math.PI * (tooth.position - 1) / 14 : Math.PI * (tooth.position - 1) / 14;
                    // Collect materials and inject the same shader as single-tooth view.
                    const materials = [];
                    clonedScene.traverse({
                        "ArchTooth.ArchTooth.useLayoutEffect.applyToCurrentScene": (obj)=>{
                            const m = obj;
                            if (m.isMesh && m.material) {
                                if (Array.isArray(m.material)) materials.push(...m.material);
                                else materials.push(m.material);
                            }
                        }
                    }["ArchTooth.ArchTooth.useLayoutEffect.applyToCurrentScene"]);
                    if (materials.length === 0) return false;
                    shaderRefs.current = [];
                    for (const mat of materials){
                        shaderRefs.current.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["injectShader"])(mat, cervicalY, cejY, crownBottomY, center.x, center.z, tooth.arch, tooth.quadrant, zoneYawRad, tooth.fdi, isImplant, isMissing, isCrown, isRCT, isBridge, isDenture));
                        mat.needsUpdate = true;
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prewarmDentalShaderProgram"])({
                        gl,
                        camera,
                        source: clonedScene,
                        variantKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDentalShaderVariantKey"])({
                            isImplant,
                            isMissing,
                            isCrown,
                            isRCT,
                            isBridge,
                            isDenture
                        })
                    });
                    shaderInjectedRef.current = true;
                    // Compute implant placement + store bb
                    implantBB.current = bb;
                    if (isImplant) {
                        const cervicalDiam = Math.max(size.x, size.z) * 0.75;
                        setImplantPlacement({
                            cervicalY,
                            centerX: center.x,
                            centerZ: center.z,
                            cervicalDiam
                        });
                    } else {
                        setImplantPlacement(null);
                    }
                    // Compute mesh bounds in outerGroupRef local space for Crown/RCT visuals
                    // This ensures PreparedStump + RootCanals render correctly regardless of arch position
                    if (outerGroupRef.current) {
                        outerGroupRef.current.updateMatrixWorld(true);
                        const outerInv = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().copy(outerGroupRef.current.matrixWorld).invert();
                        const localCenter = center.clone().applyMatrix4(outerInv);
                        const localBBmin = bb.min.clone().applyMatrix4(outerInv);
                        const localBBmax = bb.max.clone().applyMatrix4(outerInv);
                        const localBB = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](Math.min(localBBmin.x, localBBmax.x), Math.min(localBBmin.y, localBBmax.y), Math.min(localBBmin.z, localBBmax.z)), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](Math.max(localBBmin.x, localBBmax.x), Math.max(localBBmin.y, localBBmax.y), Math.max(localBBmin.z, localBBmax.z)));
                        const localSize = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                        localBB.getSize(localSize);
                        const localCervPt = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](center.x, cervicalY, center.z).applyMatrix4(outerInv);
                        setMeshBoundsData({
                            center: localCenter,
                            size: localSize,
                            cervicalY: localCervPt.y,
                            bb: localBB
                        });
                        // Compute direction vectors in outerGroupRef local space
                        const dirs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDirsForTooth"])(tooth.fdi, tooth.quadrant, zoneYawRad);
                        // Transform direction vectors to local space (rotation only, no translation)
                        const normalMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix3"]().getNormalMatrix(outerInv);
                        const transformDir = {
                            "ArchTooth.ArchTooth.useLayoutEffect.applyToCurrentScene.transformDir": (d)=>d.clone().applyMatrix3(normalMatrix).normalize()
                        }["ArchTooth.ArchTooth.useLayoutEffect.applyToCurrentScene.transformDir"];
                        setZoneDirs({
                            buccal: transformDir(dirs.buccal),
                            lingual: transformDir(dirs.lingual),
                            mesial: transformDir(dirs.mesial),
                            distal: transformDir(dirs.distal)
                        });
                    }
                    return true;
                }
            }["ArchTooth.ArchTooth.useLayoutEffect.applyToCurrentScene"];
            const runWithRetries = {
                "ArchTooth.ArchTooth.useLayoutEffect.runWithRetries": ()=>{
                    if (applyToCurrentScene()) return;
                    let raf = 0;
                    let tries = 0;
                    const maxTries = 120;
                    const tick = {
                        "ArchTooth.ArchTooth.useLayoutEffect.runWithRetries.tick": ()=>{
                            if (cancelled) return;
                            if (applyToCurrentScene()) return;
                            tries += 1;
                            if (tries < maxTries) raf = requestAnimationFrame(tick);
                        }
                    }["ArchTooth.ArchTooth.useLayoutEffect.runWithRetries.tick"];
                    raf = requestAnimationFrame(tick);
                    return ({
                        "ArchTooth.ArchTooth.useLayoutEffect.runWithRetries": ()=>cancelAnimationFrame(raf)
                    })["ArchTooth.ArchTooth.useLayoutEffect.runWithRetries"];
                }
            }["ArchTooth.ArchTooth.useLayoutEffect.runWithRetries"];
            const cancelRetry = runWithRetries();
            const lateRetry = window.setTimeout({
                "ArchTooth.ArchTooth.useLayoutEffect.lateRetry": ()=>{
                    if (!shaderInjectedRef.current && !cancelled) {
                        // One extra pass after layout stabilizes (tab/type transitions).
                        applyToCurrentScene();
                    }
                }
            }["ArchTooth.ArchTooth.useLayoutEffect.lateRetry"], 1200);
            // Match Tooth.tsx timing model: defer to post-layout via double RAF.
            rafOuter = requestAnimationFrame({
                "ArchTooth.ArchTooth.useLayoutEffect": ()=>{
                    rafInner = requestAnimationFrame({
                        "ArchTooth.ArchTooth.useLayoutEffect": ()=>{
                            if (!shaderInjectedRef.current && !cancelled) {
                                applyToCurrentScene();
                            }
                        }
                    }["ArchTooth.ArchTooth.useLayoutEffect"]);
                }
            }["ArchTooth.ArchTooth.useLayoutEffect"]);
            return ({
                "ArchTooth.ArchTooth.useLayoutEffect": ()=>{
                    cancelled = true;
                    cancelRetry?.();
                    cancelAnimationFrame(rafOuter);
                    cancelAnimationFrame(rafInner);
                    window.clearTimeout(lateRetry);
                }
            })["ArchTooth.ArchTooth.useLayoutEffect"];
        }
    }["ArchTooth.ArchTooth.useLayoutEffect"], [
        clonedScene,
        tooth,
        isImplant,
        isMissing,
        isCrown,
        isRCT,
        isBridge,
        isDenture,
        gl,
        camera
    ]);
    // Hover glow + oral-region highlight/dim on state change (avoid per-frame
    // traversals across all teeth). Region highlight: teeth in the active oral
    // region glow teal; teeth outside it fade so the region stands out.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArchTooth.ArchTooth.useEffect": ()=>{
            if (!meshRef.current) return;
            const dim = highlightActive && !inHighlight;
            meshRef.current.traverse({
                "ArchTooth.ArchTooth.useEffect": (obj)=>{
                    const m = obj;
                    if (m.isMesh && m.material && !Array.isArray(m.material)) {
                        const mat = m.material;
                        if (mat.metalness > 0.5) return;
                        if (isHovered) {
                            mat.emissiveIntensity = 0.32;
                            mat.emissive.set('#4a9eff');
                        } else if (highlightActive && inHighlight) {
                            mat.emissiveIntensity = 0.38;
                            mat.emissive.set('#14b8a6');
                        } else {
                            mat.emissiveIntensity = 0;
                            mat.emissive.set('#000000');
                        }
                        mat.transparent = true;
                        mat.opacity = dim ? 0.22 : 1;
                    }
                }
            }["ArchTooth.ArchTooth.useEffect"]);
        }
    }["ArchTooth.ArchTooth.useEffect"], [
        isHovered,
        highlightActive,
        inHighlight
    ]);
    /** Two clear wobble cycles (~1s) when AI applies scan — strong enough to notice, then stops. */ const pulseStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hadPulseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "ArchTooth.ArchTooth.useFrame": (state)=>{
            if (!meshRef.current) return;
            const base = toothScale;
            if (!agentPulse) {
                pulseStartRef.current = null;
                hadPulseRef.current = false;
                meshRef.current.scale.setScalar(base);
                return;
            }
            if (!hadPulseRef.current) {
                pulseStartRef.current = state.clock.elapsedTime;
                hadPulseRef.current = true;
            }
            const t0 = pulseStartRef.current;
            if (t0 == null) {
                meshRef.current.scale.setScalar(base);
                return;
            }
            const elapsed = state.clock.elapsedTime - t0;
            const dur = 1.15;
            if (elapsed >= dur) {
                meshRef.current.scale.setScalar(base);
                return;
            }
            const t = elapsed / dur;
            /** Gentle envelope — subtle second beat, no harsh “rubber” bounce */ const envelope = Math.pow(1 - t, 1.35);
            /** Two full sine cycles across [0, 1] → sin(4πt); amplitude kept low for polish */ const wobble = envelope * 0.034 * Math.sin(t * Math.PI * 4);
            meshRef.current.scale.setScalar(base * (1 + wobble));
        }
    }["ArchTooth.ArchTooth.useFrame"]);
    if (!archPose) return null;
    const handlePointerEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ArchTooth.ArchTooth.useCallback[handlePointerEnter]": (e)=>{
            e.stopPropagation();
            onHover(tooth.fdi);
            document.body.style.cursor = 'pointer';
        }
    }["ArchTooth.ArchTooth.useCallback[handlePointerEnter]"], [
        tooth.fdi,
        onHover
    ]);
    const handlePointerLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ArchTooth.ArchTooth.useCallback[handlePointerLeave]": (e)=>{
            e.stopPropagation();
            onHover(null);
            document.body.style.cursor = 'default';
        }
    }["ArchTooth.ArchTooth.useCallback[handlePointerLeave]"], [
        onHover
    ]);
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ArchTooth.ArchTooth.useCallback[handleClick]": (e)=>{
            e.stopPropagation();
            // On touch: first tap pins the tooltip, second tap navigates.
            // On mouse: click navigates immediately (hover already shows tooltip).
            const isTouch = e.pointerType === 'touch' || e.nativeEvent?.pointerType === 'touch';
            if (isTouch) {
                if (isPinned) {
                    onPin(null);
                    onClick(tooth);
                } else {
                    onPin(tooth.fdi);
                }
            } else {
                onClick(tooth);
            }
        }
    }["ArchTooth.ArchTooth.useCallback[handleClick]"], [
        tooth,
        onClick,
        onPin,
        isPinned
    ]);
    // Diagnosis labels for pill (only tooth-level primary diagnoses)
    const occlusalOffsetY = tooth.arch === 'maxillary' ? -0.75 : 0.75;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("group", {
        ref: meshRef,
        position: archPose.position,
        rotation: archPose.rotation,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("group", {
                ref: outerGroupRef,
                scale: tooth.mirrorX ? [
                    -1,
                    1,
                    1
                ] : [
                    1,
                    1,
                    1
                ],
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Center"], {
                        ref: groupRef,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("primitive", {
                            object: clonedScene,
                            onPointerEnter: handlePointerEnter,
                            onPointerLeave: handlePointerLeave,
                            onClick: handleClick
                        })
                    }),
                    isCrown && meshBoundsData && toothMeshRefLocal.current && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PreparedStump"], {
                        toothMesh: toothMeshRefLocal.current,
                        meshBounds: meshBoundsData,
                        arch: tooth.arch,
                        parentGroup: outerGroupRef.current
                    }),
                    isRCT && meshBoundsData && zoneDirs && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RootCanals"], {
                        meshBounds: meshBoundsData,
                        arch: tooth.arch,
                        toothPosition: tooth.position,
                        dirs: zoneDirs,
                        toothFdi: tooth.fdi
                    }),
                    isImplant && implantPlacement && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImplantScrew"], {
                        placement: implantPlacement,
                        arch: tooth.arch,
                        implantScene: implantGltf.scene,
                        toothMesh: toothMeshRefLocal.current,
                        bb: implantBB.current,
                        parentGroup: outerGroupRef.current
                    })
                ]
            }),
            treatmentHistoryTags.length > 0 && showTreatmentTags && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html"], {
                position: [
                    0,
                    occlusalOffsetY,
                    0
                ],
                center: true,
                style: {
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap'
                },
                zIndexRange: isHovered || isPinned ? [
                    80,
                    40
                ] : [
                    30,
                    0
                ],
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                    },
                    children: treatmentHistoryTags.map((d)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            style: {
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '2px 7px',
                                borderRadius: '4px',
                                fontFamily: 'Inter, sans-serif',
                                background: 'rgba(107, 114, 128, 0.78)',
                                color: '#fff',
                                lineHeight: '1.3',
                                backdropFilter: 'blur(3px)',
                                letterSpacing: '0.01em'
                            },
                            children: d
                        }, d))
                })
            })
        ]
    });
}, "nZrIR9hXr5lTXWMF/A/bGHmXDds=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
})), "nZrIR9hXr5lTXWMF/A/bGHmXDds=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = ArchTooth;
// Scope detection for tag consolidation: when a diagnosis covers exactly a
// recognizable zone (whole Mandibular, a quadrant, etc.), the dentition shows
// it ONCE — a single "RCT · Mandibular" tag on a front-centre representative
// tooth — instead of repeating it on every tooth in the zone.
const SCOPE_QUAD_DEFS = [
    [
        'Mandibular',
        [
            'lower-left',
            'lower-right'
        ]
    ],
    [
        'Maxillary',
        [
            'upper-right',
            'upper-left'
        ]
    ],
    [
        'Right arch',
        [
            'upper-right',
            'lower-right'
        ]
    ],
    [
        'Left arch',
        [
            'upper-left',
            'lower-left'
        ]
    ],
    [
        'Upper Right',
        [
            'upper-right'
        ]
    ],
    [
        'Upper Left',
        [
            'upper-left'
        ]
    ],
    [
        'Lower Left',
        [
            'lower-left'
        ]
    ],
    [
        'Lower Right',
        [
            'lower-right'
        ]
    ]
];
function detectScopeForDiag(fdis, teethList) {
    const byQ = {
        'upper-right': [],
        'upper-left': [],
        'lower-left': [],
        'lower-right': []
    };
    teethList.forEach((t)=>{
        if (byQ[t.quadrant]) byQ[t.quadrant].push(t.fdi);
    });
    const set = new Set(fdis);
    const eq = (arr)=>arr.length > 1 && arr.length === set.size && arr.every((f)=>set.has(f));
    const all = [
        ...byQ['upper-right'],
        ...byQ['upper-left'],
        ...byQ['lower-left'],
        ...byQ['lower-right']
    ];
    if (eq(all)) return 'Full mouth';
    for (const [label, quads] of SCOPE_QUAD_DEFS){
        if (eq(quads.flatMap((q)=>byQ[q]))) return label;
    }
    return null;
}
function DentitionView({ patientType, visibleFdis, disableSelection = false, layoutMode = 'split', showGuides = false, showScopeHotspots = false, onSelectScope, toothDiagnoses, findingsByTooth, implantTeeth, onSelectTooth, onHoverTooth, externalHoveredFdi, allEntries, toothNotes, agentPulseFdis, showTreatmentTags = true, highlightFdis, oralEntries = [], oralForceShowAll = false, treatmentHistoryDetailsByTooth = {} }) {
    _s1();
    const USE_SPLIT_QUADRANT_EXPERIMENT = layoutMode === 'split';
    const [hoveredTooth, setHoveredToothInternal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Wrap setter to also notify parent.
    const setHoveredTooth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentitionView.useCallback[setHoveredTooth]": (v)=>{
            setHoveredToothInternal(v);
            onHoverTooth?.(v);
        }
    }["DentitionView.useCallback[setHoveredTooth]"], [
        onHoverTooth
    ]);
    // Merge externally-driven hover (e.g. from summary card hover).
    const effectiveHovered = externalHoveredFdi ?? hoveredTooth;
    const [pinnedTooth, setPinnedTooth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Hovering an oral-exam tag highlights that region's teeth (quadrant / arch /
    // full mouth) the same way the table-row hover does.
    const [hoverOralFdis, setHoverOralFdis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Clear pinned tooltip on background tap / ESC
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentitionView.useEffect": ()=>{
            const onDoc = {
                "DentitionView.useEffect.onDoc": (e)=>{
                    // If click lands on the canvas but NOT on a tooth (no stopPropagation), clear pin.
                    // We rely on the tooth's onClick having already fired and set pinnedTooth.
                    // This timeout defers so the tooth's handler runs first.
                    setTimeout({
                        "DentitionView.useEffect.onDoc": ()=>{
                            const target = e.target;
                            if (!target.closest('canvas')) setPinnedTooth(null);
                        }
                    }["DentitionView.useEffect.onDoc"], 0);
                }
            }["DentitionView.useEffect.onDoc"];
            const onKey = {
                "DentitionView.useEffect.onKey": (e)=>{
                    if (e.key === 'Escape') setPinnedTooth(null);
                }
            }["DentitionView.useEffect.onKey"];
            window.addEventListener('keydown', onKey);
            window.addEventListener('click', onDoc);
            return ({
                "DentitionView.useEffect": ()=>{
                    window.removeEventListener('keydown', onKey);
                    window.removeEventListener('click', onDoc);
                }
            })["DentitionView.useEffect"];
        }
    }["DentitionView.useEffect"], []);
    const activeFdi = effectiveHovered || pinnedTooth;
    const isPediatricOnly = patientType === 'pediatric';
    const isMixed = patientType === 'mixed';
    const activeTeeth = isMixed ? [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_TEETH"]
    ] : isPediatricOnly ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_TEETH"] : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"];
    const activePositions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionView.useMemo[activePositions]": ()=>{
            if (isMixed) {
                const mixed = {};
                // Adult arches stay top/bottom. Pediatric arches sit in-between.
                const adultUpperYOffset = 2.25;
                const adultLowerYOffset = -1.9;
                const pedUpperYOffset = 0.2;
                const pedLowerYOffset = -0.15;
                for (const tooth of __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"]){
                    const base = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARCH_POSITIONS"][tooth.fdi];
                    if (!base) continue;
                    const yShift = tooth.arch === 'maxillary' ? adultUpperYOffset : adultLowerYOffset;
                    const xShift = USE_SPLIT_QUADRANT_EXPERIMENT ? tooth.quadrant === 'upper-left' || tooth.quadrant === 'lower-left' ? 0.35 : -0.35 : 0;
                    mixed[tooth.fdi] = {
                        position: [
                            base.position[0] + xShift,
                            base.position[1] + yShift,
                            base.position[2]
                        ],
                        rotation: base.rotation
                    };
                }
                for (const tooth of __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_TEETH"]){
                    const base = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_ARCH_POSITIONS"][tooth.fdi];
                    if (!base) continue;
                    const yShift = tooth.arch === 'maxillary' ? pedUpperYOffset : pedLowerYOffset;
                    const xShift = USE_SPLIT_QUADRANT_EXPERIMENT ? tooth.quadrant === 'upper-left' || tooth.quadrant === 'lower-left' ? 0.35 : -0.35 : 0;
                    mixed[tooth.fdi] = {
                        position: [
                            base.position[0] + xShift,
                            base.position[1] + yShift,
                            base.position[2]
                        ],
                        rotation: base.rotation
                    };
                }
                return mixed;
            }
            const baseline = isPediatricOnly ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_ARCH_POSITIONS"] : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARCH_POSITIONS"];
            if (!USE_SPLIT_QUADRANT_EXPERIMENT) return baseline;
            const split = {};
            for (const tooth of activeTeeth){
                const base = baseline[tooth.fdi];
                if (!base) continue;
                const isUpper = tooth.arch === 'maxillary';
                const isLeft = tooth.quadrant === 'upper-left' || tooth.quadrant === 'lower-left';
                split[tooth.fdi] = {
                    position: [
                        base.position[0] + (isLeft ? 0.5 : -0.5),
                        base.position[1] + (isUpper ? 0.42 : -0.42),
                        base.position[2]
                    ],
                    rotation: base.rotation
                };
            }
            return split;
        }
    }["DentitionView.useMemo[activePositions]"], [
        USE_SPLIT_QUADRANT_EXPERIMENT,
        activeTeeth,
        isMixed,
        isPediatricOnly
    ]);
    const sceneScale = isPediatricOnly ? [
        0.85,
        0.85,
        0.85
    ] : [
        1,
        1,
        1
    ];
    const visibleTeeth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionView.useMemo[visibleTeeth]": ()=>activeTeeth.filter({
                "DentitionView.useMemo[visibleTeeth]": (tooth)=>!visibleFdis || visibleFdis.includes(tooth.fdi)
            }["DentitionView.useMemo[visibleTeeth]"])
    }["DentitionView.useMemo[visibleTeeth]"], [
        activeTeeth,
        visibleFdis
    ]);
    // Consolidate scope-wide diagnoses into a single representative tag.
    const groupTags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionView.useMemo[groupTags]": ()=>{
            const diagToFdis = {};
            Object.entries(toothDiagnoses || {}).forEach({
                "DentitionView.useMemo[groupTags]": ([fdi, set])=>{
                    const arr = set instanceof Set ? [
                        ...set
                    ] : set || [];
                    arr.forEach({
                        "DentitionView.useMemo[groupTags]": (d)=>{
                            (diagToFdis[d] = diagToFdis[d] || []).push(fdi);
                        }
                    }["DentitionView.useMemo[groupTags]"]);
                }
            }["DentitionView.useMemo[groupTags]"]);
            if (implantTeeth) (implantTeeth instanceof Set ? [
                ...implantTeeth
            ] : implantTeeth).forEach({
                "DentitionView.useMemo[groupTags]": (f)=>{
                    (diagToFdis['Implant'] = diagToFdis['Implant'] || []).push(f);
                }
            }["DentitionView.useMemo[groupTags]"]);
            const suppressed = new Set();
            const repLabels = {};
            Object.entries(diagToFdis).forEach({
                "DentitionView.useMemo[groupTags]": ([diag, fdis])=>{
                    const uniq = [
                        ...new Set(fdis)
                    ];
                    if (uniq.length < 2) return;
                    const scope = detectScopeForDiag(uniq, activeTeeth);
                    if (!scope) return;
                    const rep = [
                        '41',
                        '31',
                        '11',
                        '21'
                    ].find({
                        "DentitionView.useMemo[groupTags]": (f)=>uniq.includes(f)
                    }["DentitionView.useMemo[groupTags]"]) ?? uniq.slice().sort()[Math.floor(uniq.length / 2)];
                    uniq.forEach({
                        "DentitionView.useMemo[groupTags]": (f)=>suppressed.add(`${f}:${diag}`)
                    }["DentitionView.useMemo[groupTags]"]);
                    (repLabels[rep] = repLabels[rep] || []).push(`${diag} · ${scope}`);
                }
            }["DentitionView.useMemo[groupTags]"]);
            return {
                suppressed,
                repLabels
            };
        }
    }["DentitionView.useMemo[groupTags]"], [
        toothDiagnoses,
        implantTeeth,
        activeTeeth
    ]);
    const contentCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionView.useMemo[contentCenter]": ()=>{
            if (visibleTeeth.length === 0) return [
                0,
                0,
                0
            ];
            const sum = visibleTeeth.reduce({
                "DentitionView.useMemo[contentCenter].sum": (acc, tooth)=>{
                    const pose = activePositions[tooth.fdi];
                    if (!pose) return acc;
                    return [
                        acc[0] + pose.position[0],
                        acc[1] + pose.position[1],
                        acc[2] + pose.position[2]
                    ];
                }
            }["DentitionView.useMemo[contentCenter].sum"], [
                0,
                0,
                0
            ]);
            return [
                sum[0] / visibleTeeth.length,
                sum[1] / visibleTeeth.length,
                sum[2] / visibleTeeth.length
            ];
        }
    }["DentitionView.useMemo[contentCenter]"], [
        activePositions,
        visibleTeeth
    ]);
    // Oral-exam region tags anchored in 3D (so they rotate/zoom with the model).
    // Each region group's tag sits at the centroid of that region's teeth.
    const oralTagGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionView.useMemo[oralTagGroups]": ()=>{
            if (!oralEntries || oralEntries.length === 0) return [];
            const groups = {};
            oralEntries.forEach({
                "DentitionView.useMemo[oralTagGroups]": (e)=>{
                    const regionPos = (e.surfaces || []).find({
                        "DentitionView.useMemo[oralTagGroups].regionPos": (p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOralRegionPosition"])(p) && ![
                                'WHOLE',
                                'GENERALIZED',
                                'FULL'
                            ].includes(p)
                    }["DentitionView.useMemo[oralTagGroups].regionPos"]);
                    const key = regionPos || 'FULL';
                    (groups[key] = groups[key] || []).push(e);
                }
            }["DentitionView.useMemo[oralTagGroups]"]);
            const quadOf = {
                UR: 'upper-right',
                UL: 'upper-left',
                LR: 'lower-right',
                LL: 'lower-left'
            };
            const archOf = {
                RIGHT_ARCH: [
                    'upper-right',
                    'lower-right'
                ],
                LEFT_ARCH: [
                    'upper-left',
                    'lower-left'
                ],
                UPPER_ARCH: [
                    'upper-right',
                    'upper-left'
                ],
                LOWER_ARCH: [
                    'lower-right',
                    'lower-left'
                ]
            };
            const fdisFor = {
                "DentitionView.useMemo[oralTagGroups].fdisFor": (key)=>{
                    if (quadOf[key]) return visibleTeeth.filter({
                        "DentitionView.useMemo[oralTagGroups].fdisFor": (t)=>t.quadrant === quadOf[key]
                    }["DentitionView.useMemo[oralTagGroups].fdisFor"]).map({
                        "DentitionView.useMemo[oralTagGroups].fdisFor": (t)=>t.fdi
                    }["DentitionView.useMemo[oralTagGroups].fdisFor"]);
                    if (archOf[key]) return visibleTeeth.filter({
                        "DentitionView.useMemo[oralTagGroups].fdisFor": (t)=>archOf[key].includes(t.quadrant)
                    }["DentitionView.useMemo[oralTagGroups].fdisFor"]).map({
                        "DentitionView.useMemo[oralTagGroups].fdisFor": (t)=>t.fdi
                    }["DentitionView.useMemo[oralTagGroups].fdisFor"]);
                    return visibleTeeth.map({
                        "DentitionView.useMemo[oralTagGroups].fdisFor": (t)=>t.fdi
                    }["DentitionView.useMemo[oralTagGroups].fdisFor"]); // FULL / whole-mouth
                }
            }["DentitionView.useMemo[oralTagGroups].fdisFor"];
            return Object.entries(groups).map({
                "DentitionView.useMemo[oralTagGroups]": ([key, list])=>{
                    const fdis = fdisFor(key).filter({
                        "DentitionView.useMemo[oralTagGroups].fdis": (f)=>activePositions[f]
                    }["DentitionView.useMemo[oralTagGroups].fdis"]);
                    if (fdis.length === 0) return null;
                    const sum = fdis.reduce({
                        "DentitionView.useMemo[oralTagGroups].sum": (a, f)=>{
                            const p = activePositions[f].position;
                            return [
                                a[0] + p[0],
                                a[1] + p[1],
                                a[2] + p[2]
                            ];
                        }
                    }["DentitionView.useMemo[oralTagGroups].sum"], [
                        0,
                        0,
                        0
                    ]);
                    return {
                        key,
                        list,
                        fdis,
                        label: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ORAL_POSITION_LABEL"][key] || key,
                        position: [
                            sum[0] / fdis.length,
                            sum[1] / fdis.length,
                            sum[2] / fdis.length + 0.6
                        ]
                    };
                }
            }["DentitionView.useMemo[oralTagGroups]"]).filter(Boolean);
        }
    }["DentitionView.useMemo[oralTagGroups]"], [
        oralEntries,
        visibleTeeth,
        activePositions
    ]);
    // Keep the dentition stack slightly lower so it aligns with the split drag-handle midpoint.
    // Shift the arch group upward so lower teeth don't overlap the scope bar
    // that sits at the bottom of the canvas (absolute bottom: 16px).
    const frameVerticalOffset = -0.85;
    const activeTooth = activeFdi ? activeTeeth.find((t)=>t.fdi === activeFdi) : null;
    const guideSegments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionView.useMemo[guideSegments]": ()=>{
            if (!showGuides) return null;
            if (isMixed) {
                // Vertical center + separators between the 4 mixed rows.
                return new Float32Array([
                    0,
                    3.2,
                    -2.6,
                    0,
                    -3.2,
                    -2.6,
                    -5.2,
                    1.15,
                    -2.6,
                    5.2,
                    1.15,
                    -2.6,
                    -5.2,
                    -0.4,
                    -2.6,
                    5.2,
                    -0.4,
                    -2.6,
                    -5.2,
                    -2.05,
                    -2.6,
                    5.2,
                    -2.05,
                    -2.6
                ]);
            }
            return new Float32Array([
                0,
                2.3,
                -2.6,
                0,
                -2.3,
                -2.6,
                -5.2,
                0,
                -2.6,
                5.2,
                0,
                -2.6
            ]);
        }
    }["DentitionView.useMemo[guideSegments]"], [
        showGuides,
        isMixed
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("group", {
        scale: sceneScale,
        position: [
            -contentCenter[0],
            -contentCenter[1] + frameVerticalOffset,
            -contentCenter[2]
        ],
        children: [
            guideSegments && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("lineSegments", {
                renderOrder: 1,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("bufferGeometry", {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("bufferAttribute", {
                            attach: "attributes-position",
                            args: [
                                guideSegments,
                                3
                            ]
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("lineBasicMaterial", {
                        color: "#94a3b8",
                        transparent: true,
                        opacity: 0.35
                    })
                ]
            }),
            visibleTeeth.map((tooth)=>{
                const isPrimaryTooth = [
                    '5',
                    '6',
                    '7',
                    '8'
                ].includes(tooth.fdi[0]);
                const findings = findingsByTooth[tooth.fdi] || [];
                // Grouped (scope-wide) diagnoses are suppressed here — they're shown
                // once as a banner at the top of the dentition, not on each tooth.
                const treatmentHistoryTags = Array.from(new Set([
                    ...toothDiagnoses[tooth.fdi] ? Array.from(toothDiagnoses[tooth.fdi]) : [],
                    ...implantTeeth.has(tooth.fdi) ? [
                        'Implant'
                    ] : [],
                    ...Object.keys(treatmentHistoryDetailsByTooth[tooth.fdi] || {})
                ])).filter((d)=>!groupTags.suppressed.has(`${tooth.fdi}:${d}`));
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ArchTooth, {
                    tooth: tooth,
                    archPose: activePositions[tooth.fdi],
                    toothScale: isMixed && isPrimaryTooth ? 0.85 : 1,
                    diagnoses: toothDiagnoses[tooth.fdi],
                    findings: findings,
                    treatmentHistoryTags: treatmentHistoryTags,
                    showTreatmentTags: showTreatmentTags,
                    isImplant: implantTeeth.has(tooth.fdi),
                    isHovered: effectiveHovered === tooth.fdi,
                    isPinned: pinnedTooth === tooth.fdi,
                    agentPulse: Boolean(agentPulseFdis?.has?.(tooth.fdi)),
                    highlightActive: Boolean((hoverOralFdis || highlightFdis) && (hoverOralFdis || highlightFdis).size > 0),
                    inHighlight: Boolean((hoverOralFdis || highlightFdis) && (hoverOralFdis || highlightFdis).has(tooth.fdi)),
                    onHover: setHoveredTooth,
                    onClick: disableSelection ? ()=>{} : onSelectTooth,
                    onPin: setPinnedTooth
                }, `${patientType}-${layoutMode}-${tooth.fdi}-${[
                    ...toothDiagnoses[tooth.fdi] || []
                ].join(',')}-${implantTeeth.has(tooth.fdi)}`);
            }),
            showScopeHotspots && onSelectScope && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ScopeHotspot, {
                        label: "UR",
                        position: [
                            -3.2,
                            1.2,
                            -2.8
                        ],
                        onClick: ()=>onSelectScope('UR')
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ScopeHotspot, {
                        label: "UL",
                        position: [
                            3.2,
                            1.2,
                            -2.8
                        ],
                        onClick: ()=>onSelectScope('UL')
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ScopeHotspot, {
                        label: "LR",
                        position: [
                            -3.2,
                            -1.2,
                            -2.8
                        ],
                        onClick: ()=>onSelectScope('LR')
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ScopeHotspot, {
                        label: "LL",
                        position: [
                            3.2,
                            -1.2,
                            -2.8
                        ],
                        onClick: ()=>onSelectScope('LL')
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ScopeHotspot, {
                        label: "Full",
                        position: [
                            0,
                            0,
                            -3.2
                        ],
                        onClick: ()=>onSelectScope('FULL'),
                        emphasized: true
                    })
                ]
            }),
            activeTooth && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(DentitionTooltip, {
                tooth: activeTooth,
                archPose: activePositions[activeTooth.fdi],
                findings: findingsByTooth[activeTooth.fdi] || [],
                diagnoses: toothDiagnoses[activeTooth.fdi],
                isImplant: implantTeeth.has(activeTooth.fdi),
                allEntries: allEntries,
                toothNotes: toothNotes,
                treatmentHistoryDetails: treatmentHistoryDetailsByTooth[activeTooth.fdi]
            }),
            oralTagGroups.map((g)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(OralRegionTag3D, {
                    position: g.position,
                    list: g.list,
                    label: g.label,
                    forceShowAll: oralForceShowAll,
                    onHover: (on)=>setHoverOralFdis(on ? new Set(g.fdis) : null)
                }, g.key))
        ]
    });
}
_s1(DentitionView, "XbaaV8EL1+5vs7mBo/fgvbYdGPs=");
_c2 = DentitionView;
// OralRegionTag3D — oral-exam tag anchored in 3D (drei Html) so it tracks the
// camera like the per-tooth treatment tags. Soft transparent violet pill; hover
// (or forceShowAll from the records-card hover) reveals the entry tooltip.
function OralRegionTag3D({ position, list, label, forceShowAll = false, onHover }) {
    _s2();
    const [hover, setHover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const showTip = hover || forceShowAll;
    const tagLabel = list.length > 1 ? `${list[0].name} +${list.length - 1}` : list[0].name;
    const siteOf = (e)=>(e.surfaces || []).map((p)=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ORAL_POSITION_LABEL"][p] || p).join(', ') || 'Whole mouth';
    const metaOf = (e)=>[
            siteOf(e),
            (e.since || '').trim() ? `since ${e.since.trim()}` : '',
            (e.note || '').trim()
        ].filter(Boolean).join(' | ');
    const setHov = (v)=>{
        setHover(v);
        onHover?.(v);
    };
    // Group the region's entries into the same boxed sections as the tooth tooltip.
    const groups = {
        past: [],
        findings: [],
        procedures: []
    };
    list.forEach((e)=>{
        if (e.kind === 'past') groups.past.push(e);
        else if (e.kind === 'procedure') groups.procedures.push(e);
        else groups.findings.push(e);
    });
    const secHeadStyle = {
        fontSize: '9px',
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
        color: '#cbd5e1',
        marginBottom: '4px',
        fontWeight: 600
    };
    const secBox = (title, items)=>items.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            style: {
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 6,
                padding: '7px 9px'
            },
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: secHeadStyle,
                    children: title
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3
                    },
                    children: items.map((e)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                fontSize: 11,
                                lineHeight: 1.35
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                    style: {
                                        fontWeight: 700
                                    },
                                    children: e.name
                                }),
                                (()=>{
                                    const m = metaOf(e);
                                    return m ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                        style: {
                                            color: '#cbd5e1',
                                            fontWeight: 400
                                        },
                                        children: [
                                            " (",
                                            m,
                                            ")"
                                        ]
                                    }) : null;
                                })()
                            ]
                        }, e.id))
                })
            ]
        }) : null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html"], {
        position: position,
        center: true,
        zIndexRange: showTip ? [
            500,
            300
        ] : [
            40,
            10
        ],
        style: {
            pointerEvents: 'auto',
            whiteSpace: 'nowrap'
        },
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            onMouseEnter: ()=>setHov(true),
            onMouseLeave: ()=>setHov(false),
            style: {
                position: 'relative',
                display: 'inline-block'
            },
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: {
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px 8px',
                        borderRadius: 6,
                        background: 'rgba(164,97,216,0.16)',
                        color: '#703A9E',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '-0.2px',
                        boxShadow: '0 2px 8px rgba(86,42,129,0.12)',
                        whiteSpace: 'nowrap',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        cursor: 'default'
                    },
                    children: tagLabel
                }),
                showTip && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    style: {
                        position: 'absolute',
                        top: 'calc(100% + 14px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        minWidth: 200,
                        maxWidth: 280,
                        background: 'rgba(0,0,0,0.82)',
                        color: '#fff',
                        borderRadius: 8,
                        borderLeft: '3px solid #8B5CF6',
                        padding: '10px 13px',
                        boxShadow: '0 4px 18px rgba(0,0,0,0.45)',
                        fontFamily: "'Inter', sans-serif",
                        whiteSpace: 'normal',
                        pointerEvents: 'none',
                        textAlign: 'left'
                    },
                    children: [
                        // dotted leader line up to the tag (mirrors the single-tooth tooltip)
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            style: {
                                position: 'absolute',
                                bottom: '100%',
                                left: '50%',
                                width: 0,
                                height: 14,
                                borderLeft: '1px dashed rgba(148,163,184,0.5)',
                                transform: 'translateX(-50%)'
                            }
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 7,
                                paddingBottom: 8,
                                marginBottom: 10,
                                borderBottom: '1px solid rgba(255,255,255,0.1)'
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                    style: {
                                        color: '#fff',
                                        background: '#8B5CF6',
                                        borderRadius: 4,
                                        padding: '1px 6px',
                                        fontSize: 11,
                                        fontWeight: 700,
                                        flexShrink: 0
                                    },
                                    children: "Oral"
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                    style: {
                                        fontWeight: 700,
                                        fontSize: 12.5,
                                        color: '#f1f5f9'
                                    },
                                    children: label || 'Oral Examination'
                                })
                            ]
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8
                            },
                            children: [
                                secBox('Past Procedures', groups.past),
                                secBox('Findings', groups.findings),
                                secBox('Procedures', groups.procedures)
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
_s2(OralRegionTag3D, "bRXmKus9fOZFlca/6zXTYU+twGY=");
_c3 = OralRegionTag3D;
function ScopeHotspot({ label, position, onClick, emphasized = false }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html"], {
        position: position,
        transform: true,
        occlude: true,
        zIndexRange: [
            220,
            80
        ],
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
            type: "button",
            onClick: onClick,
            style: {
                cursor: 'pointer',
                minWidth: emphasized ? 64 : 44,
                height: emphasized ? 30 : 28,
                borderRadius: emphasized ? 16 : 14,
                border: '1px solid rgba(255,255,255,0.42)',
                background: emphasized ? 'rgba(30, 41, 59, 0.78)' : 'rgba(15, 23, 42, 0.66)',
                color: '#f8fafc',
                fontSize: emphasized ? 12 : 11,
                fontWeight: 700,
                padding: '0 12px',
                boxShadow: '0 4px 14px rgba(2, 6, 23, 0.22)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease'
            },
            onMouseEnter: (e)=>{
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.background = emphasized ? 'rgba(15, 23, 42, 0.88)' : 'rgba(30, 41, 59, 0.78)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(2, 6, 23, 0.3)';
            },
            onMouseLeave: (e)=>{
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = emphasized ? 'rgba(30, 41, 59, 0.78)' : 'rgba(15, 23, 42, 0.66)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(2, 6, 23, 0.22)';
            },
            children: label
        })
    });
}
_c4 = ScopeHotspot;
// ══════════════════════════════════════════════════════════════
// DentitionTooltip — camera-relative tooltip that stays fixed on
// screen regardless of tooth rotation. Only the leader line updates.
// ══════════════════════════════════════════════════════════════
function DentitionTooltip({ tooth, archPose, findings, diagnoses, isImplant, allEntries, toothNotes, treatmentHistoryDetails = {} }) {
    _s3();
    const tooltipRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const connectorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { camera, gl, size } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const violetAccent = {
        stroke: '#8B5CF6',
        badgeBg: '#8B5CF6',
        badgeText: '#ffffff'
    };
    // With the narrow side panel and wider 3D canvas, horizontal space on either
    // side of the arch is limited. Place tooltip ABOVE maxillary teeth and BELOW
    // mandibular teeth so it always lands in the whitespace outside the arch —
    // never behind a tooth.
    const isMax = tooth.arch === 'maxillary';
    // Anchor near the outer edge of the tooth rather than its center, then keep
    // a consistent visual gap in screen-space via dynamic transform.
    const tooltipAnchorWorld = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionTooltip.useMemo[tooltipAnchorWorld]": ()=>{
            if (!archPose) return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](archPose.position[0], archPose.position[1] + (isMax ? 0.72 : -0.72), archPose.position[2]);
        }
    }["DentitionTooltip.useMemo[tooltipAnchorWorld]"], [
        archPose,
        isMax
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "DentitionTooltip.useFrame": ()=>{
            const el = tooltipRef.current;
            if (!el) return;
            const connector = connectorRef.current;
            const canvasRect = gl.domElement.getBoundingClientRect();
            const projected = tooltipAnchorWorld.clone().project(camera);
            // Hide if clipped behind camera/frustum.
            if (projected.z < -1 || projected.z > 1) {
                el.style.opacity = "0";
                if (connector) connector.style.opacity = "0";
                return;
            }
            el.style.opacity = "1";
            if (connector) connector.style.opacity = "1";
            const anchorX = canvasRect.left + (projected.x * 0.5 + 0.5) * size.width;
            const anchorY = canvasRect.top + (-projected.y * 0.5 + 0.5) * size.height;
            const toothProjected = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](archPose.position[0], archPose.position[1], archPose.position[2]).project(camera);
            const toothCenterX = canvasRect.left + (toothProjected.x * 0.5 + 0.5) * size.width;
            const toothCenterY = canvasRect.top + (-toothProjected.y * 0.5 + 0.5) * size.height;
            const gapPx = 30;
            const edgePad = 10;
            const rect = el.getBoundingClientRect();
            // Normalize placement behavior so empty cards choose sides like filled cards.
            const layoutW = Math.max(rect.width, isTiny ? 220 : 240);
            const layoutH = Math.max(rect.height, isTiny ? 150 : 170);
            const minX = canvasRect.left + edgePad;
            const maxX = canvasRect.right - edgePad - layoutW;
            const minY = canvasRect.top + edgePad;
            const maxY = canvasRect.bottom - edgePad - layoutH;
            const clamp = {
                "DentitionTooltip.useFrame.clamp": (v, lo, hi)=>Math.min(Math.max(v, lo), hi)
            }["DentitionTooltip.useFrame.clamp"];
            const baseTopX = -layoutW / 2;
            const baseBottomX = -layoutW / 2;
            const baseRightY = -layoutH / 2;
            const baseLeftY = -layoutH / 2;
            // For side placements, nudge away from tooth center so cards don't sit over crown.
            const sideVerticalBias = isMax ? -Math.max(24, layoutH * 0.2) : Math.max(24, layoutH * 0.2);
            const topNaturalLeft = anchorX + baseTopX;
            const bottomNaturalLeft = anchorX + baseBottomX;
            const rightNaturalTop = anchorY + baseRightY;
            const leftNaturalTop = anchorY + baseLeftY;
            const topAdjX = clamp(topNaturalLeft, minX, maxX) - topNaturalLeft;
            const bottomAdjX = clamp(bottomNaturalLeft, minX, maxX) - bottomNaturalLeft;
            const rightAdjY = clamp(rightNaturalTop, minY, maxY) - rightNaturalTop;
            const leftAdjY = clamp(leftNaturalTop, minY, maxY) - leftNaturalTop;
            const sides = [
                {
                    side: 'top',
                    fits: anchorY - gapPx - layoutH >= minY,
                    free: anchorY - gapPx - layoutH - minY,
                    x: baseTopX + topAdjX,
                    y: -gapPx - layoutH,
                    origin: 'center bottom'
                },
                {
                    side: 'bottom',
                    fits: anchorY + gapPx + layoutH <= canvasRect.bottom - edgePad,
                    free: canvasRect.bottom - edgePad - (anchorY + gapPx + layoutH),
                    x: baseBottomX + bottomAdjX,
                    y: gapPx,
                    origin: 'center top'
                },
                {
                    side: 'right',
                    fits: anchorX + gapPx + layoutW <= canvasRect.right - edgePad,
                    free: canvasRect.right - edgePad - (anchorX + gapPx + layoutW),
                    x: gapPx,
                    y: baseRightY + rightAdjY + sideVerticalBias,
                    origin: 'left center'
                },
                {
                    side: 'left',
                    fits: anchorX - gapPx - layoutW >= minX,
                    free: anchorX - gapPx - layoutW - minX,
                    x: -gapPx - layoutW,
                    y: baseLeftY + leftAdjY + sideVerticalBias,
                    origin: 'right center'
                }
            ];
            const preferredOrder = isMax ? [
                'top',
                'right',
                'left',
                'bottom'
            ] : [
                'bottom',
                'right',
                'left',
                'top'
            ];
            const toothSafeRadius = isMax ? 72 : 50;
            const distToRect = {
                "DentitionTooltip.useFrame.distToRect": (px, py, rx, ry, rw, rh)=>{
                    const dx = Math.max(rx - px, 0, px - (rx + rw));
                    const dy = Math.max(ry - py, 0, py - (ry + rh));
                    return Math.hypot(dx, dy);
                }
            }["DentitionTooltip.useFrame.distToRect"];
            const withSafety = sides.map({
                "DentitionTooltip.useFrame.withSafety": (s)=>{
                    const rectLeft = anchorX + s.x;
                    const rectTop = anchorY + s.y;
                    const safety = distToRect(toothCenterX, toothCenterY, rectLeft, rectTop, layoutW, layoutH);
                    const toothSafe = safety >= toothSafeRadius;
                    return {
                        ...s,
                        safety,
                        toothSafe
                    };
                }
            }["DentitionTooltip.useFrame.withSafety"]);
            // Upper teeth should never pick "bottom" while a tooth-safe alternative exists.
            // This avoids cards sitting on top of the hovered upper crowns.
            const preferredPool = isMax ? withSafety.filter({
                "DentitionTooltip.useFrame": (s)=>s.side !== 'bottom'
            }["DentitionTooltip.useFrame"]) : withSafety;
            const fitOptions = preferredPool.filter({
                "DentitionTooltip.useFrame.fitOptions": (s)=>s.fits && s.toothSafe
            }["DentitionTooltip.useFrame.fitOptions"]).sort({
                "DentitionTooltip.useFrame.fitOptions": (a, b)=>{
                    if (b.safety !== a.safety) return b.safety - a.safety;
                    if (b.free !== a.free) return b.free - a.free;
                    return preferredOrder.indexOf(a.side) - preferredOrder.indexOf(b.side);
                }
            }["DentitionTooltip.useFrame.fitOptions"]);
            // Fallback ladder:
            // 1) any fitting option in preferred pool
            // 2) tooth-safe option from all sides
            // 3) any option from all sides
            const fallbackFits = preferredPool.filter({
                "DentitionTooltip.useFrame.fallbackFits": (s)=>s.fits
            }["DentitionTooltip.useFrame.fallbackFits"]).sort({
                "DentitionTooltip.useFrame.fallbackFits": (a, b)=>b.free - a.free
            }["DentitionTooltip.useFrame.fallbackFits"]);
            const toothSafeAll = withSafety.filter({
                "DentitionTooltip.useFrame.toothSafeAll": (s)=>s.toothSafe
            }["DentitionTooltip.useFrame.toothSafeAll"]).sort({
                "DentitionTooltip.useFrame.toothSafeAll": (a, b)=>{
                    if (b.safety !== a.safety) return b.safety - a.safety;
                    return b.free - a.free;
                }
            }["DentitionTooltip.useFrame.toothSafeAll"]);
            const anyAll = withSafety.slice().sort({
                "DentitionTooltip.useFrame.anyAll": (a, b)=>b.free - a.free
            }["DentitionTooltip.useFrame.anyAll"]);
            const chosen = fitOptions[0] ?? fallbackFits[0] ?? toothSafeAll[0] ?? anyAll[0];
            el.style.transform = `translate(${chosen.x}px, ${chosen.y}px)`;
            el.style.transformOrigin = chosen.origin;
            // Screen-space dashed connector that follows selected side and extends
            // slightly behind the tooltip edge for a visually continuous link.
            if (connector) {
                const edgePoint = ({
                    "DentitionTooltip.useFrame.edgePoint": ()=>{
                        if (chosen.side === 'top') return {
                            x: chosen.x + rect.width / 2,
                            y: chosen.y + rect.height
                        };
                        if (chosen.side === 'bottom') return {
                            x: chosen.x + rect.width / 2,
                            y: chosen.y
                        };
                        if (chosen.side === 'right') return {
                            x: chosen.x,
                            y: chosen.y + rect.height / 2
                        };
                        return {
                            x: chosen.x + rect.width,
                            y: chosen.y + rect.height / 2
                        };
                    }
                })["DentitionTooltip.useFrame.edgePoint"]();
                const lenToEdge = Math.hypot(edgePoint.x, edgePoint.y);
                const ux = lenToEdge > 0.0001 ? edgePoint.x / lenToEdge : 0;
                const uy = lenToEdge > 0.0001 ? edgePoint.y / lenToEdge : -1;
                const extendBehind = 14;
                const targetX = edgePoint.x + ux * extendBehind;
                const targetY = edgePoint.y + uy * extendBehind;
                const len = Math.hypot(targetX, targetY);
                const angle = Math.atan2(targetY, targetX);
                connector.style.width = `${Math.max(18, len)}px`;
                connector.style.transform = `translateY(-50%) rotate(${angle}rad)`;
            }
        }
    }["DentitionTooltip.useFrame"]);
    // Responsive sizing for smaller canvases.
    const isCompact = size.width < 980;
    const isTiny = size.width < 760;
    const cardMinW = isTiny ? 200 : isCompact ? 220 : 240;
    const cardMaxW = isTiny ? 260 : isCompact ? 290 : 320;
    const cardPadding = isTiny ? '8px 10px' : '10px 13px';
    const titleSize = isTiny ? 12 : 13;
    const bodySize = isTiny ? 9 : 10;
    const sectionPad = isTiny ? '6px 8px' : '7px 9px';
    // Derive data for full overview sections.
    const diagLabels = [];
    if (diagnoses) {
        for (const d of diagnoses)diagLabels.push(d);
    }
    if (isImplant && !diagLabels.includes('Implant')) diagLabels.push('Implant');
    const toothEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionTooltip.useMemo[toothEntries]": ()=>(allEntries ?? []).filter({
                "DentitionTooltip.useMemo[toothEntries]": (e)=>e.toothFdi === tooth.fdi
            }["DentitionTooltip.useMemo[toothEntries]"])
    }["DentitionTooltip.useMemo[toothEntries]"], [
        allEntries,
        tooth.fdi
    ]);
    const findingEntries = toothEntries.filter((e)=>e.kind === 'finding');
    const procedureEntries = toothEntries.filter((e)=>e.kind === 'procedure');
    const plannedEntries = toothEntries.filter((e)=>e.kind === 'planned');
    const symptomEntries = toothEntries.filter((e)=>e.kind === 'symptom');
    const noteText = toothNotes?.[tooth.fdi] ?? '';
    // Findings summary = legacy findings + entity-centric finding entries.
    const groupedFindings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionTooltip.useMemo[groupedFindings]": ()=>{
            const m = new Map();
            const push = {
                "DentitionTooltip.useMemo[groupedFindings].push": (zoneId, label)=>{
                    const list = m.get(zoneId) || [];
                    if (!list.includes(label)) list.push(label);
                    m.set(zoneId, list);
                }
            }["DentitionTooltip.useMemo[groupedFindings].push"];
            for (const f of findings)push(f.zoneId, f.type);
            for (const entry of findingEntries){
                const surfaces = entry.surfaces.length > 0 ? entry.surfaces : [
                    'whole'
                ];
                for (const surface of surfaces)push(surface, entry.name);
            }
            return Array.from(m.entries());
        }
    }["DentitionTooltip.useMemo[groupedFindings]"], [
        findings,
        findingEntries
    ]);
    // Past Procedures = union of toothDiagnoses + the (authoritative, additive)
    // treatment-history detail store, so every recorded item shows — not just
    // the latest. Deduped case-insensitively.
    const treatmentHistory = (()=>{
        const seen = new Set();
        const out = [];
        const add = (n)=>{
            if (!n) return;
            const k = n.toLowerCase();
            if (seen.has(k)) return;
            seen.add(k);
            out.push(n);
        };
        diagLabels.forEach(add);
        Object.keys(treatmentHistoryDetails || {}).forEach(add);
        return out;
    })();
    // surface / since / note recorded for a whole-tooth diagnosis.
    const thMeta = (name)=>{
        const d = treatmentHistoryDetails?.[name];
        if (!d) return '';
        const surfs = d.surfaces || [];
        const surfLabel = surfs.includes('whole') ? 'Whole tooth' : surfs.map((z)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getZoneLabel"])(z, tooth.arch, tooth.position)).join(', ');
        const bits = [];
        if (surfLabel) bits.push(surfLabel);
        if ((d.since || '').trim()) bits.push(`since ${d.since.trim()}`);
        if ((d.note || '').trim()) bits.push(d.note.trim());
        return bits.join(' | ');
    };
    const procedureSummary = [
        ...procedureEntries,
        ...plannedEntries,
        ...symptomEntries
    ];
    // Shared "(surfaces · since · status · note)" formatter so Findings and
    // Procedures read exactly like Past Procedures — item name + bracket meta.
    const surfacesLabel = (surfs)=>{
        const arr = surfs || [];
        if (arr.includes('whole')) return 'Whole tooth';
        return arr.map((z)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getZoneLabel"])(z, tooth.arch, tooth.position)).join(', ');
    };
    const findingRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentitionTooltip.useMemo[findingRows]": ()=>{
            const m = new Map();
            const ensure = {
                "DentitionTooltip.useMemo[findingRows].ensure": (name)=>{
                    if (!m.has(name)) m.set(name, {
                        surfaces: new Set(),
                        since: '',
                        note: ''
                    });
                    return m.get(name);
                }
            }["DentitionTooltip.useMemo[findingRows].ensure"];
            for (const f of findings){
                if (!f?.type) continue;
                const r = ensure(f.type);
                if (f.zoneId) r.surfaces.add(f.zoneId);
            }
            for (const e of findingEntries){
                const r = ensure(e.name);
                (e.surfaces || []).forEach({
                    "DentitionTooltip.useMemo[findingRows]": (s)=>r.surfaces.add(s)
                }["DentitionTooltip.useMemo[findingRows]"]);
                if (!r.since && e.since) r.since = e.since;
                if (!r.note && e.notes) r.note = e.notes;
            }
            return [
                ...m.entries()
            ].map({
                "DentitionTooltip.useMemo[findingRows]": ([name, r])=>{
                    const bits = [];
                    const surf = surfacesLabel([
                        ...r.surfaces
                    ]);
                    if (surf) bits.push(surf);
                    if ((r.since || '').trim()) bits.push(`since ${r.since.trim()}`);
                    if ((r.note || '').trim()) bits.push(r.note.trim());
                    return {
                        name,
                        meta: bits.join(' | ')
                    };
                }
            }["DentitionTooltip.useMemo[findingRows]"]);
        }
    }["DentitionTooltip.useMemo[findingRows]"], [
        findings,
        findingEntries,
        tooth.arch,
        tooth.position
    ]);
    const procedureRows = procedureSummary.map((e)=>{
        const bits = [];
        const surf = surfacesLabel(e.surfaces || []);
        if (surf) bits.push(surf);
        if (e.status) bits.push(e.status);
        if ((e.since || '').trim()) bits.push(`since ${e.since.trim()}`);
        if (e.plannedDate) bits.push(e.plannedDate);
        if ((e.notes || '').trim()) bits.push(e.notes.trim());
        return {
            id: e.id,
            name: e.name,
            meta: bits.join(' | ')
        };
    });
    // Has any content across all 4 sections?
    const hasContent = treatmentHistory.length > 0 || groupedFindings.length > 0 || procedureSummary.length > 0 || noteText.length > 0;
    const sectionHeadingStyle = {
        fontSize: isTiny ? '8px' : '9px',
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
        color: '#cbd5e1',
        marginBottom: '4px',
        fontWeight: 600
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html"], {
            position: [
                tooltipAnchorWorld.x,
                tooltipAnchorWorld.y,
                tooltipAnchorWorld.z
            ],
            style: {
                pointerEvents: 'none'
            },
            zIndexRange: [
                500,
                300
            ],
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    ref: connectorRef,
                    style: {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: 0,
                        borderTop: '1px dashed rgba(148, 163, 184, 0.45)',
                        transformOrigin: '0 50%',
                        zIndex: 0
                    }
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    ref: tooltipRef,
                    style: {
                        transform: 'translate(-50%, -50%)',
                        transformOrigin: 'center center',
                        background: 'rgba(0, 0, 0, 0.78)',
                        color: '#fff',
                        backdropFilter: 'blur(14px)',
                        WebkitBackdropFilter: 'blur(14px)',
                        padding: cardPadding,
                        borderRadius: '8px',
                        fontSize: isTiny ? '11px' : '12px',
                        borderLeft: `3px solid ${violetAccent.stroke}`,
                        fontFamily: "'Inter', sans-serif",
                        minWidth: `${cardMinW}px`,
                        maxWidth: `${cardMaxW}px`,
                        whiteSpace: 'normal',
                        boxShadow: '0 4px 18px rgba(0,0,0,0.45)',
                        textAlign: 'left',
                        left: 0,
                        top: 0,
                        position: 'relative',
                        zIndex: 1,
                        transition: 'transform 120ms ease-out, opacity 120ms ease-out'
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                fontWeight: 700,
                                fontSize: `${titleSize}px`,
                                paddingBottom: hasContent ? '8px' : 0,
                                marginBottom: hasContent ? '10px' : 0,
                                borderBottom: hasContent ? '1px solid rgba(255,255,255,0.1)' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '7px',
                                lineHeight: 1.3,
                                whiteSpace: 'nowrap'
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                    style: {
                                        color: violetAccent.badgeText,
                                        background: violetAccent.badgeBg,
                                        borderRadius: '4px',
                                        padding: isTiny ? '1px 5px' : '1px 6px',
                                        fontSize: isTiny ? '11px' : '12px',
                                        fontWeight: 700,
                                        flexShrink: 0
                                    },
                                    children: [
                                        "T",
                                        tooth.fdi
                                    ]
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                    style: {
                                        fontWeight: 600,
                                        color: '#f1f5f9',
                                        flexShrink: 0
                                    },
                                    children: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][tooth.quadrant],
                                        " ",
                                        tooth.name
                                    ]
                                })
                            ]
                        }),
                        treatmentHistory.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                marginBottom: groupedFindings.length > 0 || procedureSummary.length > 0 || noteText ? '8px' : 0,
                                background: 'rgba(255,255,255,0.06)',
                                borderRadius: '6px',
                                padding: sectionPad
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: sectionHeadingStyle,
                                    children: "Past Procedures"
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '3px'
                                    },
                                    children: treatmentHistory.map((d)=>{
                                        const meta = thMeta(d);
                                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                            style: {
                                                fontSize: `${bodySize}px`,
                                                color: '#f1f5f9',
                                                lineHeight: 1.35
                                            },
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                    style: {
                                                        fontWeight: 700
                                                    },
                                                    children: d
                                                }),
                                                meta ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                                    style: {
                                                        color: '#cbd5e1',
                                                        fontWeight: 400
                                                    },
                                                    children: [
                                                        " (",
                                                        meta,
                                                        ")"
                                                    ]
                                                }) : null
                                            ]
                                        }, d);
                                    })
                                })
                            ]
                        }),
                        findingRows.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                marginBottom: procedureRows.length > 0 || noteText ? '8px' : 0,
                                background: 'rgba(255,255,255,0.06)',
                                borderRadius: '6px',
                                padding: sectionPad
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: sectionHeadingStyle,
                                    children: "Findings"
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '3px'
                                    },
                                    children: findingRows.map((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                            style: {
                                                fontSize: `${bodySize}px`,
                                                color: '#f1f5f9',
                                                lineHeight: 1.35
                                            },
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                    style: {
                                                        fontWeight: 700
                                                    },
                                                    children: r.name
                                                }),
                                                r.meta ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                                    style: {
                                                        color: '#cbd5e1',
                                                        fontWeight: 400
                                                    },
                                                    children: [
                                                        " (",
                                                        r.meta,
                                                        ")"
                                                    ]
                                                }) : null
                                            ]
                                        }, r.name))
                                })
                            ]
                        }),
                        procedureRows.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                marginBottom: noteText ? '8px' : 0,
                                background: 'rgba(255,255,255,0.06)',
                                borderRadius: '6px',
                                padding: sectionPad
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: sectionHeadingStyle,
                                    children: "Procedures"
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '3px'
                                    },
                                    children: procedureRows.map((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                            style: {
                                                fontSize: `${bodySize}px`,
                                                color: '#f1f5f9',
                                                lineHeight: 1.35
                                            },
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                                    style: {
                                                        fontWeight: 700
                                                    },
                                                    children: r.name
                                                }),
                                                r.meta ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                                    style: {
                                                        color: '#cbd5e1',
                                                        fontWeight: 400
                                                    },
                                                    children: [
                                                        " (",
                                                        r.meta,
                                                        ")"
                                                    ]
                                                }) : null
                                            ]
                                        }, r.id))
                                })
                            ]
                        }),
                        noteText && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                background: 'rgba(255,255,255,0.06)',
                                borderRadius: '6px',
                                padding: sectionPad
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: sectionHeadingStyle,
                                    children: "Notes"
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                                    style: {
                                        fontSize: `${bodySize}px`,
                                        color: '#e2e8f0',
                                        fontStyle: 'italic',
                                        lineHeight: 1.4
                                    },
                                    children: [
                                        "\u201C",
                                        noteText.length > (isTiny ? 64 : 80) ? noteText.slice(0, isTiny ? 64 : 80) + '…' : noteText,
                                        "\u201D"
                                    ]
                                })
                            ]
                        }),
                        !hasContent && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            style: {
                                fontSize: '11px',
                                color: '#94a3b8',
                                fontStyle: 'italic',
                                textAlign: 'center',
                                padding: '8px 0'
                            },
                            children: "Click on the tooth to start adding details"
                        })
                    ]
                })
            ]
        })
    });
}
_s3(DentitionTooltip, "fJHO+L4YWvNPt6IQY8XwFX4eSs4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c5 = DentitionTooltip;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "ArchTooth$memo");
__turbopack_context__.k.register(_c1, "ArchTooth");
__turbopack_context__.k.register(_c2, "DentitionView");
__turbopack_context__.k.register(_c3, "OralRegionTag3D");
__turbopack_context__.k.register(_c4, "ScopeHotspot");
__turbopack_context__.k.register(_c5, "DentitionTooltip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/ToothSelector.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExamScopeChipBar",
    ()=>ExamScopeChipBar,
    "ToothSelector",
    ()=>ToothSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-client] (ecmascript)");
"use client";
;
;
const ARCH_SCOPE_IDS = new Set([
    'RIGHT_ARCH',
    'LEFT_ARCH',
    'UPPER_ARCH',
    'LOWER_ARCH'
]);
/** Matches DentalCanvas dentitionScopeIsActive — highlights the scope chip that drives the preview. */ function scopeChipIsActive(btnId, selectionScope) {
    if (!selectionScope) return false;
    if (btnId === 'FULL') return selectionScope.type === 'full-mouth';
    if (ARCH_SCOPE_IDS.has(btnId)) return selectionScope.type === 'arch' && selectionScope.id === btnId;
    return selectionScope.type === 'quadrant' && selectionScope.id === btnId;
}
function toothHasChartMark(fdi, { toothDiagnoses, implantTeeth, findingsByTooth, allEntries, toothNotes }) {
    if (toothDiagnoses?.[fdi]?.size > 0) return true;
    if (implantTeeth?.has?.(fdi)) return true;
    if ((findingsByTooth?.[fdi] ?? []).length > 0) return true;
    if (allEntries?.some((e)=>e.toothFdi === fdi)) return true;
    if (toothNotes?.[fdi]?.trim?.()) return true;
    return false;
}
function scopeMarkDotColor(fdis, toothDiagnoses) {
    for (const fdi of fdis){
        if (toothDiagnoses?.[fdi]?.has?.('Missing')) return '#ef4444';
    }
    return '#8b5cf6';
}
function scopeHasChartMark(scopeId, getScopeFdis, ctx) {
    if (!getScopeFdis) return false;
    const fdis = getScopeFdis(scopeId);
    return fdis.some((fdi)=>toothHasChartMark(fdi, ctx));
}
const SCOPE_BUTTONS = [
    {
        id: 'UR',
        label: 'UR'
    },
    {
        id: 'UL',
        label: 'UL'
    },
    {
        id: 'LR',
        label: 'LR'
    },
    {
        id: 'LL',
        label: 'LL'
    },
    {
        id: 'RIGHT_ARCH',
        label: 'R'
    },
    {
        id: 'LEFT_ARCH',
        label: 'L'
    },
    {
        id: 'UPPER_ARCH',
        label: 'Max'
    },
    {
        id: 'LOWER_ARCH',
        label: 'Man'
    },
    {
        id: 'FULL',
        label: 'Full'
    }
];
function ExamScopeChipBar({ selectionScope = null, onSelectScope, getScopeFdis, toothDiagnoses, implantTeeth, findingsByTooth, allEntries, toothNotes }) {
    const markCtx = {
        toothDiagnoses,
        implantTeeth,
        findingsByTooth,
        allEntries,
        toothNotes
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: "tooth-chart-scope-bar",
        role: "toolbar",
        "aria-label": "Choose dentition scope",
        children: SCOPE_BUTTONS.map((btn)=>{
            const active = scopeChipIsActive(btn.id, selectionScope);
            const fdis = getScopeFdis ? getScopeFdis(btn.id) : [];
            const hasDataInScope = Boolean(getScopeFdis && scopeHasChartMark(btn.id, getScopeFdis, markCtx));
            const showLavender = hasDataInScope && !active;
            const dotColor = scopeMarkDotColor(fdis, toothDiagnoses);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                type: "button",
                onClick: (e)=>{
                    e.stopPropagation();
                    onSelectScope(btn.id);
                },
                title: btn.label,
                "aria-pressed": active,
                className: `scope-chip${active ? ' active' : ''}${showLavender ? ' has-mark' : ''}`,
                children: [
                    btn.label,
                    hasDataInScope && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        className: "tooth-pick-dot",
                        style: {
                            background: active ? '#fff' : dotColor
                        }
                    })
                ]
            }, btn.id);
        })
    });
}
_c = ExamScopeChipBar;
function ToothSelector({ selectedTooth, patientType = 'adult', onSelectTooth, toothDiagnoses, viewMode, onBackToDentition, surfaceSelector, onSelectScope, selectionScope = null, getScopeFdis, findingsByTooth, implantTeeth, allEntries, toothNotes, onEnterOralExam }) {
    const activeTeeth = patientType === 'adult' ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"] : patientType === 'pediatric' ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_TEETH"] : [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_TEETH"]
    ];
    const upperRight = activeTeeth.filter((t)=>t.quadrant === 'upper-right').sort((a, b)=>b.position - a.position);
    const upperLeft = activeTeeth.filter((t)=>t.quadrant === 'upper-left').sort((a, b)=>a.position - b.position);
    const lowerRight = activeTeeth.filter((t)=>t.quadrant === 'lower-right').sort((a, b)=>b.position - a.position);
    const lowerLeft = activeTeeth.filter((t)=>t.quadrant === 'lower-left').sort((a, b)=>a.position - b.position);
    // For mixed dentition, separate adult & pediatric within each quadrant
    const isMixed = patientType === 'mixed';
    const quadrantCard = (teeth, scopeId)=>{
        // Split into adult (Q1-4) and pediatric (Q5-8) for mixed mode
        let adultTeeth, pedTeeth;
        if (isMixed) {
            adultTeeth = teeth.filter((t)=>[
                    '1',
                    '2',
                    '3',
                    '4'
                ].includes(t.fdi[0]));
            pedTeeth = teeth.filter((t)=>[
                    '5',
                    '6',
                    '7',
                    '8'
                ].includes(t.fdi[0]));
        }
        const teethBlock = isMixed ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                adultTeeth.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    key: "adult",
                    className: "tooth-chart-row-single",
                    children: adultTeeth.map((t)=>renderToothBtn(t))
                }),
                pedTeeth.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    key: "ped",
                    className: "tooth-chart-row-single",
                    children: pedTeeth.map((t)=>renderToothBtn(t))
                })
            ]
        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
            className: "tooth-chart-row-single",
            children: teeth.map((t)=>renderToothBtn(t))
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
            key: scopeId,
            className: "tooth-chart-quadrant-wrap",
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: "tooth-chart-quadrant-teeth",
                children: teethBlock
            })
        });
    };
    const renderToothBtn = (t)=>{
        const scopeIsToothLevel = selectionScope?.type === 'tooth';
        const isSelected = scopeIsToothLevel && selectedTooth?.fdi === t.fdi;
        const diagSet = toothDiagnoses?.[t.fdi];
        const hasDiag = diagSet?.size > 0;
        const diagColor = hasDiag ? diagSet.has('Missing') ? '#ef4444' : '#8b5cf6' : null;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("button", {
            type: "button",
            className: `tooth-pick ${isSelected ? 'active' : ''} ${hasDiag ? 'has-diagnosis' : ''}`,
            onClick: (e)=>{
                e.stopPropagation();
                onSelectTooth(t);
            },
            title: `${t.name} (${t.fdi})`,
            children: [
                t.fdi,
                diagColor && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    className: "tooth-pick-dot",
                    style: {
                        background: isSelected ? '#fff' : diagColor
                    }
                })
            ]
        }, t.fdi);
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: "tooth-selector",
        children: [
            surfaceSelector && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: "tooth-selector-surface",
                children: surfaceSelector
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                className: "tooth-chart",
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: "tooth-chart-stack",
                        children: [
                            quadrantCard(upperRight, 'UR'),
                            quadrantCard(upperLeft, 'UL'),
                            quadrantCard(lowerRight, 'LR'),
                            quadrantCard(lowerLeft, 'LL')
                        ]
                    })
                ]
            })
        ]
    });
}
_c1 = ToothSelector;
var _c, _c1;
__turbopack_context__.k.register(_c, "ExamScopeChipBar");
__turbopack_context__.k.register(_c1, "ToothSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/DiagnosisMatrix.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TERMINAL_DIAGNOSES",
    ()=>TERMINAL_DIAGNOSES,
    "applyDiagnosisSelection",
    ()=>applyDiagnosisSelection,
    "getDisabledDiagnoses",
    ()=>getDisabledDiagnoses,
    "isCompatible",
    ()=>isCompatible,
    "isTerminalDiagnosis",
    ()=>isTerminalDiagnosis
]);
/**
 * Single source of truth for tooth-level diagnosis compatibility.
 *
 * Clinical mental model:
 *   - Missing / Denture / Bridge stand alone — nothing else coexists.
 *   - Implant replaces a tooth → compatible only with Crown (implant-supported crown).
 *   - RCT is endodontic treatment → compatible only with Crown (post-endo crown).
 *   - Crown sits on an implant OR on a root-treated tooth.
 *
 * Chips are NEVER disabled in the UI. Clicking a diagnosis auto-removes any
 * currently-set diagnosis that is not in its allow-list. This mirrors how a
 * dentist mentally re-classifies the same tooth.
 */ const COMPATIBLE = {
    Missing: [],
    Denture: [],
    Bridge: [],
    Implant: [
        "Crown"
    ],
    RCT: [
        "Crown"
    ],
    Crown: [
        "Implant",
        "RCT"
    ]
};
// "Past Procedures" is a HISTORY log: a tooth can legitimately carry several
// procedures (e.g. RCT + Crown + Bridge) over time, so they accumulate. The
// only exclusivity is a terminal diagnosis (Missing / Extraction) — the tooth is
// gone, so it stands alone and clicking it wipes everything else; conversely,
// adding any real procedure clears a terminal diagnosis.
const TERMINAL = new Set([
    "Missing",
    "Extraction"
]);
function applyDiagnosisSelection(current, clicked) {
    const next = new Set(current);
    // Toggle-off: clicking an already-active diagnosis removes it.
    if (next.has(clicked)) {
        next.delete(clicked);
        return next;
    }
    if (TERMINAL.has(clicked)) {
        // Terminal stands alone — replaces every other record.
        return new Set([
            clicked
        ]);
    }
    // A real procedure: drop any terminal diagnosis, keep all other procedures.
    for (const d of Array.from(next)){
        if (TERMINAL.has(d)) next.delete(d);
    }
    next.add(clicked);
    return next;
}
function isCompatible(a, b) {
    if (a === b) return false;
    return (COMPATIBLE[a] ?? []).includes(b) || (COMPATIBLE[b] ?? []).includes(a);
}
// Teeth that are gone (Missing / Extraction) can't receive treatments that act
// on the natural crown/root. Those chips are DISABLED rather than silently
// auto-reclassifying — you must clear Missing/Extraction first.
const ABSENT = new Set([
    "Missing",
    "Extraction"
]);
const NATURAL_TOOTH_TREATMENTS = [
    "RCT",
    "Crown"
];
const TERMINAL_DIAGNOSES = ABSENT;
function isTerminalDiagnosis(d) {
    return ABSENT.has(d);
}
function getDisabledDiagnoses(current) {
    const disabled = new Set();
    const hasAbsent = Array.from(current).some((d)=>ABSENT.has(d));
    if (hasAbsent) NATURAL_TOOTH_TREATMENTS.forEach((t)=>disabled.add(t));
    return disabled;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/DentalCanvas.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "patientTypeBtn": "DentalCanvas-module-scss-module__EArrsa__patientTypeBtn",
  "patientTypeBtnActive": "DentalCanvas-module-scss-module__EArrsa__patientTypeBtnActive",
  "patientTypeHost": "DentalCanvas-module-scss-module__EArrsa__patientTypeHost",
  "patientTypeTrack": "DentalCanvas-module-scss-module__EArrsa__patientTypeTrack",
  "scopeBtn": "DentalCanvas-module-scss-module__EArrsa__scopeBtn",
  "scopeBtnActive": "DentalCanvas-module-scss-module__EArrsa__scopeBtnActive",
  "scopeBtnCompact": "DentalCanvas-module-scss-module__EArrsa__scopeBtnCompact" + " " + "DentalCanvas-module-scss-module__EArrsa__scopeBtn",
  "scopeDivider": "DentalCanvas-module-scss-module__EArrsa__scopeDivider",
  "scopeHost": "DentalCanvas-module-scss-module__EArrsa__scopeHost",
  "scopeTrack": "DentalCanvas-module-scss-module__EArrsa__scopeTrack",
});
}),
"[project]/public/lottie/arrow-left.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"v":"5.5.3","fr":25,"ip":0,"op":40,"w":24,"h":24,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Layer 29 Outlines","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[11.313,12.938,0],"ix":2},"a":{"a":0,"k":[7.395,11.67,0],"ix":1},"s":{"a":0,"k":[91,91,100],"ix":6}},"ao":0,"ef":[{"ty":5,"nm":"Elastic Controller","np":5,"mn":"Pseudo/MDS Elastic Controller","ix":1,"en":1,"ef":[{"ty":0,"nm":"Amplitude","mn":"Pseudo/MDS Elastic Controller-0001","ix":1,"v":{"a":0,"k":20,"ix":1}},{"ty":0,"nm":"Frequency","mn":"Pseudo/MDS Elastic Controller-0002","ix":2,"v":{"a":0,"k":40,"ix":2}},{"ty":0,"nm":"Decay","mn":"Pseudo/MDS Elastic Controller-0003","ix":3,"v":{"a":0,"k":60,"ix":3}}]}],"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0.77,-0.77],[0,0]],"o":[[0,0],[-0.77,-0.77],[0,0],[0,0]],"v":[[7.92,3.645],[1.4,-2.875],[-1.4,-2.875],[-7.92,3.645]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":1.5,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":2,"s":[100]},{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":9,"s":[71]},{"t":17,"s":[100]}],"ix":1,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"e":{"a":1,"k":[{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":2,"s":[0]},{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":9,"s":[31]},{"t":17,"s":[0]}],"ix":2,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":8,"s":[7.545,12.02],"to":[-0.833,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":16,"s":[2.545,12.02],"to":[0,0],"ti":[-0.833,0]},{"t":26,"s":[7.545,12.02]}],"ix":2,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"a":{"a":0,"k":[0,0],"ix":1,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"s":{"a":0,"k":[100,100],"ix":3,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"r":{"a":0,"k":-90,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":40,"st":0,"bm":0}],"markers":[]});}),
"[project]/public/lottie/arrow-up.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"v":"5.5.3","fr":25,"ip":0,"op":40,"w":24,"h":24,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Layer 33 Outlines","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[11.313,12.938,0],"ix":2},"a":{"a":0,"k":[11.67,7.395,0],"ix":1},"s":{"a":0,"k":[91,91,100],"ix":6}},"ao":0,"ef":[{"ty":5,"nm":"Elastic Controller","np":5,"mn":"Pseudo/MDS Elastic Controller","ix":1,"en":1,"ef":[{"ty":0,"nm":"Amplitude","mn":"Pseudo/MDS Elastic Controller-0001","ix":1,"v":{"a":0,"k":20,"ix":1}},{"ty":0,"nm":"Frequency","mn":"Pseudo/MDS Elastic Controller-0002","ix":2,"v":{"a":0,"k":40,"ix":2}},{"ty":0,"nm":"Decay","mn":"Pseudo/MDS Elastic Controller-0003","ix":3,"v":{"a":0,"k":60,"ix":3}}]}],"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0.77,-0.77],[0,0]],"o":[[0,0],[-0.77,-0.77],[0,0],[0,0]],"v":[[7.92,3.645],[1.4,-2.875],[-1.4,-2.875],[-7.92,3.645]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":1.5,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":6,"s":[100]},{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":13,"s":[71]},{"t":21,"s":[100]}],"ix":1,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"e":{"a":1,"k":[{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":6,"s":[0]},{"i":{"x":[0.45],"y":[1]},"o":{"x":[0.55],"y":[0]},"t":13,"s":[31]},{"t":21,"s":[0]}],"ix":2,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":9,"s":[11.67,7.395],"to":[0,-0.667],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":18,"s":[11.67,3.395],"to":[0,0],"ti":[0,-0.667]},{"t":26,"s":[11.67,7.395]}],"ix":2,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"a":{"a":0,"k":[0,0],"ix":1,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"s":{"a":0,"k":[100,100],"ix":3,"x":"var $bm_rt;\nvar amp, freq, decay, n, n, t, t, v;\ntry {\n    amp = $bm_div(effect('Elastic Controller')(1), 200);\n    freq = $bm_div(effect('Elastic Controller')(2), 30);\n    decay = $bm_div(effect('Elastic Controller')(3), 10);\n    $bm_rt = n = 0;\n    if (numKeys > 0) {\n        $bm_rt = n = nearestKey(time).index;\n        if (key(n).time > time) {\n            n--;\n        }\n    }\n    if (n == 0) {\n        $bm_rt = t = 0;\n    } else {\n        $bm_rt = t = $bm_sub(time, key(n).time);\n    }\n    if (n > 0) {\n        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));\n        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));\n    } else {\n        $bm_rt = value;\n    }\n} catch (e$$4) {\n    $bm_rt = value = value;\n}"},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":40,"st":0,"bm":0}],"markers":[]});}),
"[project]/components/dental/LottieIcon.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LottieIcon",
    ()=>LottieIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lottie$2d$react$2f$build$2f$index$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lottie-react/build/index.umd.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$lottie$2f$arrow$2d$left$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/lottie/arrow-left.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$lottie$2f$arrow$2d$up$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/lottie/arrow-up.json (json)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const ANIMATIONS = {
    "arrow-left": __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$lottie$2f$arrow$2d$left$2e$json__$28$json$29$__["default"],
    "arrow-up": __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$lottie$2f$arrow$2d$up$2e$json__$28$json$29$__["default"]
};
/**
 * Recursively walk a Lottie JSON and recolor all strokes (stroke type "st"
 * and fill type "fl") to the given RGB 0..1 array.
 */ function recolor(data, rgb) {
    if (!data) return data;
    if (Array.isArray(data)) return data.map((d)=>recolor(d, rgb));
    if (typeof data !== "object") return data;
    const out = Array.isArray(data) ? [] : {
        ...data
    };
    if (data.ty === "st" || data.ty === "fl") {
        if (data.c?.k) {
            out.c = {
                ...data.c,
                k: rgb
            };
        }
    }
    for (const key of Object.keys(data)){
        if (key === "c") continue;
        out[key] = recolor(data[key], rgb);
    }
    return out;
}
function hexToRgb01(hex) {
    const m = hex.replace("#", "").match(/.{2}/g);
    if (!m || m.length < 3) return [
        1,
        1,
        1,
        1
    ];
    return [
        parseInt(m[0], 16) / 255,
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        1
    ];
}
function LottieIcon({ name, size = 24, loop = true, autoplay = true, className, color }) {
    _s();
    const src = ANIMATIONS[name];
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LottieIcon.useMemo[data]": ()=>color ? recolor(src, hexToRgb01(color)) : src
    }["LottieIcon.useMemo[data]"], [
        src,
        color
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        style: {
            width: size,
            height: size,
            pointerEvents: "none"
        },
        className: className,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lottie$2d$react$2f$build$2f$index$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            animationData: data,
            loop: loop,
            autoplay: autoplay,
            style: {
                width: size,
                height: size
            }
        })
    });
}
_s(LottieIcon, "jwuu1hJIzb+z9O8CErpZ1XdXNoc=");
_c = LottieIcon;
var _c;
__turbopack_context__.k.register(_c, "LottieIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/plan/treatments.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Treatment catalog + default rates (per tooth) based on the PRD.
 * Rates in ₹.
 */ __turbopack_context__.s([
    "TREATMENT_CATALOG",
    ()=>TREATMENT_CATALOG,
    "TREATMENT_NAMES",
    ()=>TREATMENT_NAMES,
    "getRate",
    ()=>getRate
]);
const TREATMENT_CATALOG = [
    // Endodontics
    {
        name: "Root Canal Treatment",
        defaultRate: 8000,
        category: "Endodontics"
    },
    {
        name: "Pulp Capping",
        defaultRate: 1500,
        category: "Endodontics"
    },
    {
        name: "Apicoectomy",
        defaultRate: 5000,
        category: "Endodontics"
    },
    // General
    {
        name: "Scaling & Polishing",
        defaultRate: 1500,
        category: "General"
    },
    {
        name: "Teeth Whitening",
        defaultRate: 8000,
        category: "General"
    },
    {
        name: "Fluoride Application",
        defaultRate: 1200,
        category: "General"
    },
    {
        name: "Cavity Filling (GIC)",
        defaultRate: 1500,
        category: "General"
    },
    {
        name: "Restoration (Composite Filling)",
        defaultRate: 2000,
        category: "General"
    },
    {
        name: "Restoration (Amalgam)",
        defaultRate: 1800,
        category: "General"
    },
    // Prosthodontics
    {
        name: "Crown (PFM)",
        defaultRate: 6000,
        category: "Prosthodontics"
    },
    {
        name: "Crown (Zirconia)",
        defaultRate: 12000,
        category: "Prosthodontics"
    },
    {
        name: "Crown (All-Ceramic)",
        defaultRate: 10000,
        category: "Prosthodontics"
    },
    {
        name: "Bridge (per unit)",
        defaultRate: 6000,
        category: "Prosthodontics"
    },
    {
        name: "Complete Denture",
        defaultRate: 15000,
        category: "Prosthodontics"
    },
    {
        name: "Partial Denture",
        defaultRate: 8000,
        category: "Prosthodontics"
    },
    {
        name: "Veneers",
        defaultRate: 9000,
        category: "Prosthodontics"
    },
    // Oral Surgery
    {
        name: "Extraction",
        defaultRate: 1500,
        category: "Oral Surgery"
    },
    {
        name: "Surgical Extraction",
        defaultRate: 3500,
        category: "Oral Surgery"
    },
    {
        name: "Wisdom Tooth Removal",
        defaultRate: 5000,
        category: "Oral Surgery"
    },
    {
        name: "Implant (Single)",
        defaultRate: 25000,
        category: "Oral Surgery"
    },
    {
        name: "Implant Crown",
        defaultRate: 9000,
        category: "Oral Surgery"
    },
    {
        name: "Bone Grafting",
        defaultRate: 12000,
        category: "Oral Surgery"
    },
    // Periodontics
    {
        name: "Deep Cleaning (per quadrant)",
        defaultRate: 2500,
        category: "Periodontics"
    },
    {
        name: "Flap Surgery",
        defaultRate: 8000,
        category: "Periodontics"
    },
    {
        name: "Gingival Grafting",
        defaultRate: 10000,
        category: "Periodontics"
    },
    // Orthodontics
    {
        name: "Metal Braces",
        defaultRate: 25000,
        category: "Orthodontics"
    },
    {
        name: "Ceramic Braces",
        defaultRate: 45000,
        category: "Orthodontics"
    },
    {
        name: "Clear Aligners",
        defaultRate: 80000,
        category: "Orthodontics"
    },
    {
        name: "Retainer",
        defaultRate: 3000,
        category: "Orthodontics"
    }
];
const TREATMENT_NAMES = TREATMENT_CATALOG.map(_c = (t)=>t.name);
_c1 = TREATMENT_NAMES;
function getRate(treatmentName) {
    const found = TREATMENT_CATALOG.find((t)=>t.name === treatmentName);
    return found?.defaultRate ?? 0;
}
var _c, _c1;
__turbopack_context__.k.register(_c, "TREATMENT_NAMES$TREATMENT_CATALOG.map");
__turbopack_context__.k.register(_c1, "TREATMENT_NAMES");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/plan/exam-suggestions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EXAM_CHART_STORAGE_PREFIX",
    ()=>EXAM_CHART_STORAGE_PREFIX,
    "buildExamSuggestions",
    ()=>buildExamSuggestions,
    "fdiToLabel",
    ()=>fdiToLabel
]);
/**
 * Builds treatment-plan quick picks from (1) seeded INITIAL_TOOTH_STATE,
 * (2) live examination chart rows persisted from DentalCanvas.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$treatments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/treatments.ts [app-client] (ecmascript)");
;
;
const EXAM_CHART_STORAGE_PREFIX = "dental.exam.chart.";
const QUADRANT_MAP = {
    "1": "Upper Right",
    "2": "Upper Left",
    "3": "Lower Left",
    "4": "Lower Right"
};
const TOOTH_NAMES = {
    1: "Central Incisor",
    2: "Lateral Incisor",
    3: "Canine",
    4: "First Premolar",
    5: "Second Premolar",
    6: "First Molar",
    7: "Second Molar",
    8: "Third Molar"
};
function fdiToLabel(fdi) {
    if (fdi === "full-mouth") return "Full Mouth";
    const q = fdi[0];
    const pos = parseInt(fdi[1], 10);
    const quadrant = QUADRANT_MAP[q] ?? "";
    const name = TOOTH_NAMES[pos] ?? "";
    return `${quadrant} ${name}`.trim();
}
function mapDiagnosisToTreatment(diagnosis) {
    const map = {
        RCT: "Root Canal Treatment",
        Crown: "Crown (PFM)",
        Bridge: "Bridge (per unit)",
        Implant: "Implant (Single)",
        Missing: "Implant (Single)",
        Extraction: "Extraction",
        "Composite Filling": "Restoration (Composite Filling)",
        Scaling: "Scaling & Polishing",
        Polishing: "Scaling & Polishing",
        Veneer: "Veneers",
        "Pulp Cap": "Pulp Capping",
        "Root Planing": "Deep Cleaning (per quadrant)",
        Denture: "Partial Denture"
    };
    return map[diagnosis] ?? null;
}
function mapFindingToTreatment(findingType) {
    const map = {
        "Cavity/Caries": "Restoration (Composite Filling)",
        Crack: "Crown (PFM)",
        Fracture: "Crown (PFM)",
        Sensitivity: "Root Canal Treatment",
        Erosion: "Restoration (Composite Filling)",
        NCCL: "Restoration (Composite Filling)",
        Calculus: "Scaling & Polishing",
        Plaque: "Scaling & Polishing",
        Staining: "Teeth Whitening",
        Recession: "Gingival Grafting",
        Resorption: "Root Canal Treatment"
    };
    return map[findingType] ?? null;
}
/** Map short examination procedure names to billing catalog lines. */ function mapChartProcedureName(name) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$treatments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TREATMENT_NAMES"].includes(name)) return name;
    const shortcuts = {
        RCT: "Root Canal Treatment",
        Restoration: "Restoration (Composite Filling)",
        "Composite Filling": "Restoration (Composite Filling)",
        Extraction: "Extraction",
        Scaling: "Scaling & Polishing",
        Polishing: "Scaling & Polishing",
        "Crown Prep": "Crown (PFM)",
        "Bridge Prep": "Bridge (per unit)",
        "Implant Placement": "Implant (Single)",
        "Pulp Cap": "Pulp Capping",
        "Root Planing": "Deep Cleaning (per quadrant)",
        Veneer: "Veneers"
    };
    if (shortcuts[name]) return shortcuts[name];
    const lower = name.toLowerCase();
    const fuzzy = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$treatments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TREATMENT_NAMES"].find((n)=>n.toLowerCase() === lower || n.toLowerCase().includes(lower) || lower.includes(n.toLowerCase()));
    return fuzzy ?? null;
}
function loadChartSnapshot(patientId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(`${EXAM_CHART_STORAGE_PREFIX}${patientId}`);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch  {
        return null;
    }
}
function diagnosesForPatient(patientId, toothState) {
    const snap = loadChartSnapshot(patientId);
    if (snap?.toothDiagnoses && Object.keys(snap.toothDiagnoses).length > 0) return snap.toothDiagnoses;
    return toothState?.toothDiagnoses ?? {};
}
function findingsForPatient(patientId, toothState) {
    const snap = loadChartSnapshot(patientId);
    if (snap?.findingsByTooth && Object.keys(snap.findingsByTooth).length > 0) return snap.findingsByTooth;
    return toothState?.findingsByTooth ?? {};
}
function suggestionKey(s) {
    return `${s.treatment}::${s.toothFdi}`;
}
function buildExamSuggestions(patientId) {
    const byKey = new Map();
    const push = (s)=>{
        const k = suggestionKey(s);
        if (!byKey.has(k)) byKey.set(k, s);
    };
    const toothState = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_TOOTH_STATE"][patientId];
    const diagMap = diagnosesForPatient(patientId, toothState);
    for (const [fdi, diagnoses] of Object.entries(diagMap)){
        for (const diag of diagnoses){
            const treatmentName = mapDiagnosisToTreatment(diag);
            if (treatmentName) {
                push({
                    treatment: treatmentName,
                    toothFdi: fdi,
                    toothLabel: fdiToLabel(fdi),
                    surfaces: [],
                    source: "examination",
                    hint: `Diagnosis on T${fdi}: ${diag}`
                });
            }
        }
    }
    const findMap = findingsForPatient(patientId, toothState);
    for (const [fdi, findings] of Object.entries(findMap)){
        for (const finding of findings){
            const treatmentName = mapFindingToTreatment(finding.type);
            if (treatmentName) {
                push({
                    treatment: treatmentName,
                    toothFdi: fdi,
                    toothLabel: fdiToLabel(fdi),
                    surfaces: [
                        finding.zoneId
                    ],
                    source: "examination",
                    hint: `Finding on T${fdi}: ${finding.type}`
                });
            }
        }
    }
    const live = loadChartSnapshot(patientId);
    const entries = live?.entries ?? [];
    for (const e of entries){
        if (e.kind !== "procedure" && e.kind !== "planned") continue;
        const rawName = (e.name ?? "").trim();
        if (!rawName) continue;
        const mapped = mapChartProcedureName(e.name);
        const treatmentName = mapped ?? rawName;
        push({
            treatment: treatmentName,
            toothFdi: e.toothFdi,
            toothLabel: fdiToLabel(e.toothFdi),
            surfaces: [
                ...e.surfaces ?? []
            ],
            source: "chart",
            hint: mapped ? `Examination: “${e.name}” → ${treatmentName}` : `Examination: ${rawName} (T${e.toothFdi})`
        });
    }
    return Array.from(byKey.values());
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/DentalChartPrint.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DentalChartPrintButton",
    ()=>DentalChartPrintButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Printable dental chart (odontogram). Each tooth: captured front-view PNG
// (/teeth/<fdi>.png, trimmed to fill the frame) + FDI number + the real
// QuickSurfaceSelector SVG (rendered grayscale — charts print black & white).
// Upper arch: tooth→number→selector; lower arch mirrored. Two modes: "plain"
// (blank) and "historical" (recorded surfaces filled, data-teeth highlighted,
// issues listed). Optional patient header. Selecting an option goes straight to
// the system print dialog (its own preview).
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appointment$2d$patients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appointment-patients.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-tooltip.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$QuickSurfaceSelector$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/QuickSurfaceSelector.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$FlatDentitionChart$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/FlatDentitionChart.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rx$2d$preview$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/rx-preview-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/RxPreviewDocument.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rx$2d$preview$2d$composer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/rx-preview-composer.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const EXAM_CHART_PREFIX = "dental.exam.chart.";
const UPPER_ROW = [
    "18",
    "17",
    "16",
    "15",
    "14",
    "13",
    "12",
    "11",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28"
];
const LOWER_ROW = [
    "48",
    "47",
    "46",
    "45",
    "44",
    "43",
    "42",
    "41",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38"
];
function loadChart(patientId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(`${EXAM_CHART_PREFIX}${patientId || "apt-1"}`);
        return raw ? JSON.parse(raw) : null;
    } catch  {
        return null;
    }
}
function computeZones(chart) {
    const zonesByTooth = {};
    const missing = new Set();
    const add = (fdi, z)=>{
        (zonesByTooth[fdi] = zonesByTooth[fdi] || new Set()).add(z);
    };
    Object.entries(chart?.findingsByTooth || {}).forEach(([fdi, list])=>{
        (list || []).forEach((f)=>{
            if (f && f.type && f.type !== "Normal" && f.zoneId) add(fdi, f.zoneId);
        });
    });
    (chart?.entries || []).forEach((e)=>{
        (e.surfaces || []).forEach((z)=>add(e.toothFdi, z));
    });
    Object.entries(chart?.toothDiagnoses || {}).forEach(([fdi, diags])=>{
        (diags || []).forEach((d)=>{
            if (d === "Missing" || d === "Extraction") missing.add(fdi);
            else add(fdi, "whole");
        });
    });
    return {
        zonesByTooth,
        missing
    };
}
function computeIssues(chart) {
    const byTooth = {};
    const push = (fdi, s)=>{
        (byTooth[fdi] = byTooth[fdi] || []).push(s);
    };
    Object.entries(chart?.toothDiagnoses || {}).forEach(([fdi, d])=>{
        (d || []).forEach((x)=>push(fdi, x));
    });
    Object.entries(chart?.findingsByTooth || {}).forEach(([fdi, list])=>{
        (list || []).forEach((f)=>{
            if (f && f.type && f.type !== "Normal") push(fdi, f.type);
        });
    });
    (chart?.entries || []).forEach((e)=>{
        if (e?.name) push(e.toothFdi, e.name);
    });
    const teeth = Object.entries(byTooth).map(([fdi, arr])=>({
            fdi,
            items: [
                ...new Set(arr)
            ]
        })).sort((a, b)=>a.fdi.localeCompare(b.fdi));
    const oral = (chart?.oralEntries || []).map((e)=>e.name).filter(Boolean);
    return {
        teeth,
        oral,
        oralNotes: (chart?.oralNotes || "").trim()
    };
}
const HILITE = "rgba(124,58,237,0.10)";
const TOOTH_STROKE = "drop-shadow(1.2px 0 0 #7c3aed) drop-shadow(-1.2px 0 0 #7c3aed) drop-shadow(0 1.2px 0 #7c3aed) drop-shadow(0 -1.2px 0 #7c3aed)";
// Exact width/height of each trimmed tooth PNG → flex weight, so every tooth
// renders at the SAME height (molars get wider cells → not small) and the row
// fits the A4 sheet width.
const TOOTH_ASPECT = {
    "11": 0.371,
    "12": 0.371,
    "13": 0.341,
    "14": 0.354,
    "15": 0.373,
    "16": 0.505,
    "17": 0.513,
    "18": 0.515,
    "21": 0.371,
    "22": 0.371,
    "23": 0.341,
    "24": 0.354,
    "25": 0.373,
    "26": 0.505,
    "27": 0.513,
    "28": 0.515,
    "31": 0.3,
    "32": 0.287,
    "33": 0.307,
    "34": 0.334,
    "35": 0.342,
    "36": 0.668,
    "37": 0.55,
    "38": 0.658,
    "41": 0.3,
    "42": 0.287,
    "43": 0.307,
    "44": 0.334,
    "45": 0.342,
    "46": 0.668,
    "47": 0.55,
    "48": 0.658
};
function toothCellAspect(fdi) {
    return TOOTH_ASPECT[fdi] || 0.45;
}
const MAX_HALF_ASPECT_SUM = 3.45; // widest half-arch aspect sum (lower arch)
function ToothCell({ fdi, arch, zones, isMissing, mode, h }) {
    const hasData = mode === "historical" && (isMissing || zones && zones.size > 0);
    const pos = Number(fdi[1]) || 6;
    const img = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            borderRadius: 8,
            background: hasData ? HILITE : "transparent",
            boxSizing: "border-box",
            padding: 2
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: `/teeth/${fdi}.png?v=2`,
            alt: fdi,
            style: {
                height: h,
                width: "auto",
                display: "block",
                opacity: isMissing ? 0.4 : 1,
                filter: hasData ? TOOTH_STROKE : undefined
            }
        }, void 0, false, {
            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
            lineNumber: 78,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
    const num = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            font: `${hasData ? 800 : 600} 11px Inter, sans-serif`,
            color: hasData ? "#1e293b" : "#94a3b8",
            textAlign: "center",
            lineHeight: 1
        },
        children: fdi
    }, void 0, false, {
        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
    // QuickSurfaceSelector is ~76px wide; scale it down and render grayscale (B&W print).
    const selector = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: 38,
            height: 84,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            filter: "grayscale(1)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                transform: "scale(0.48)",
                transformOrigin: "top center"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$QuickSurfaceSelector$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuickSurfaceSelector"], {
                selectedZones: mode === "historical" ? zones || new Set() : new Set(),
                onToggleZone: ()=>{},
                arch: arch,
                toothPosition: pos,
                zonesWithFindings: new Set()
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 88,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
            lineNumber: 87,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
    const stack = arch === "maxillary" ? [
        img,
        num,
        selector
    ] : [
        selector,
        num,
        img
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
        },
        children: stack.map((el, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "center"
                },
                children: el
            }, i, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 101,
                columnNumber: 29
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_c = ToothCell;
function ArchRow({ fdis, arch, zonesByTooth, missing, mode, h }) {
    const cell = (fdi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToothCell, {
            fdi: fdi,
            arch: arch,
            zones: zonesByTooth[fdi],
            isMissing: missing.has(fdi),
            mode: mode,
            h: h
        }, fdi, false, {
            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
            lineNumber: 108,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "stretch"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: "1 1 0",
                    display: "flex",
                    justifyContent: "space-between"
                },
                children: fdis.slice(0, 8).map(cell)
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 1,
                    background: "#e2e8f0",
                    margin: "0 6px"
                }
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: "1 1 0",
                    display: "flex",
                    justifyContent: "space-between"
                },
                children: fdis.slice(8).map(cell)
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c1 = ArchRow;
function PatientHeader({ patientId }) {
    const ap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appointment$2d$patients$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppointmentPatient"])(patientId);
    const line = (k, v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            style: {
                margin: "0 0 4px",
                font: "400 12px Inter, sans-serif",
                color: "#334155"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontWeight: 700
                    },
                    children: k
                }, void 0, false, {
                    fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                    lineNumber: 123,
                    columnNumber: 7
                }, this),
                " ",
                v
            ]
        }, void 0, true, {
            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
            lineNumber: 122,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    background: "#f1f5f9",
                    borderRadius: 10,
                    padding: "14px 16px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: 12,
                        alignItems: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: 46,
                                height: 46,
                                borderRadius: 10,
                                background: "#ede9fe",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#6d28d9",
                                font: "800 18px Inter, sans-serif"
                            },
                            children: "TP"
                        }, void 0, false, {
                            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        font: "700 16px Inter, sans-serif",
                                        color: "#4338ca"
                                    },
                                    children: "TP Dental Care"
                                }, void 0, false, {
                                    fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        font: "600 11px Inter, sans-serif",
                                        color: "#334155"
                                    },
                                    children: "Dr. Umesh Aggarwal, BDS, MDS"
                                }, void 0, false, {
                                    fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        font: "400 10px Inter, sans-serif",
                                        color: "#64748b"
                                    },
                                    children: "Reg. ID: DCI-2342342 | +91 78945 61230"
                                }, void 0, false, {
                                    fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "12px 0",
                    paddingBottom: 10,
                    borderBottom: "1px solid #e2e8f0"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            line("Patient Name:", ap.name),
                            line("Age/Gender:", `${ap.age} Years, ${ap.genderLabel}`)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: "right"
                        },
                        children: [
                            line("Patient ID:", ap.patientCode),
                            line("Mobile:", (ap.mobile || "").replace(/^\+91-/, ""))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 138,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
        lineNumber: 127,
        columnNumber: 5
    }, this);
}
_c2 = PatientHeader;
// Dental Examination history rendered identically to the Rx preview: each tooth
// is a bullet, with Past Procedures / Findings / Procedures / Overall Tooth Notes
// as sub-headings and every entry on its own sub-bullet (name bold + bracket meta).
function DentalHistorySections({ patientId }) {
    const snap = ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rx$2d$preview$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadDentalPreviewSnapshot"])(patientId) : "TURBOPACK unreachable";
    const sections = snap?.sections || [];
    if (!sections.length) return null;
    const head = {
        margin: 0,
        fontSize: 11.5,
        color: "#334155",
        display: "flex",
        gap: 5,
        alignItems: "baseline",
        lineHeight: 1.4,
        fontWeight: 600
    };
    const item = {
        margin: 0,
        fontSize: 11.5,
        color: "#475569",
        display: "flex",
        gap: 5,
        alignItems: "baseline",
        lineHeight: 1.4
    };
    const sub = (label, items)=>items && items.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: head,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: "#94a3b8"
                            },
                            children: "•"
                        }, void 0, false, {
                            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                            lineNumber: 163,
                            columnNumber: 23
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                            lineNumber: 163,
                            columnNumber: 66
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                    lineNumber: 163,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        paddingLeft: 14,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        marginTop: 1
                    },
                    children: items.map((it, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: item,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "#94a3b8"
                                    },
                                    children: "•"
                                }, void 0, false, {
                                    fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                    lineNumber: 166,
                                    columnNumber: 35
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontWeight: 600,
                                                color: "#334155"
                                            },
                                            children: it.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                            lineNumber: 166,
                                            columnNumber: 84
                                        }, this),
                                        it.metaParts && it.metaParts.length ? ` (${it.metaParts.join(" | ")})` : ""
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                    lineNumber: 166,
                                    columnNumber: 78
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                            lineNumber: 166,
                            columnNumber: 11
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                    lineNumber: 164,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
            lineNumber: 162,
            columnNumber: 5
        }, this) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginTop: 16,
            paddingTop: 12,
            borderTop: "1px solid #e2e8f0"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    font: "700 13px Inter, sans-serif",
                    color: "#334155",
                    margin: "0 0 8px"
                },
                children: "Dental Examination"
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 7
                },
                children: sections.map((b, bi)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: 0,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: "#1e293b",
                                    display: "flex",
                                    gap: 6,
                                    alignItems: "baseline"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "#1e293b"
                                        },
                                        children: "•"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                        lineNumber: 177,
                                        columnNumber: 136
                                    }, this),
                                    b.toothLabel
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    paddingLeft: 14,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    marginTop: 2
                                },
                                children: [
                                    sub("Past Procedures", b.treatmentHistory),
                                    sub("Findings", b.findings),
                                    sub("Procedures", b.procedures),
                                    b.overallToothNote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: head,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: "#94a3b8"
                                                        },
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                                        lineNumber: 184,
                                                        columnNumber: 35
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Overall Tooth Notes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                                        lineNumber: 184,
                                                        columnNumber: 78
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                                lineNumber: 184,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    paddingLeft: 14,
                                                    marginTop: 1
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: item,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: "#94a3b8"
                                                            },
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                                            lineNumber: 185,
                                                            columnNumber: 82
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: b.overallToothNote
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                                            lineNumber: 185,
                                                            columnNumber: 125
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                                    lineNumber: 185,
                                                    columnNumber: 66
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                                lineNumber: 185,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                        lineNumber: 183,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                lineNumber: 178,
                                columnNumber: 13
                            }, this)
                        ]
                    }, bi, true, {
                        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 174,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
        lineNumber: 172,
        columnNumber: 5
    }, this);
}
_c3 = DentalHistorySections;
function DentalChartSheet({ patientId, mode, includePatient }) {
    _s();
    const { zonesByTooth, missing } = mode === "historical" ? computeZones(loadChart(patientId) || {}) : {
        zonesByTooth: {},
        missing: new Set()
    };
    // Uniform tooth height sized from the row width so every tooth is identical
    // and the widest row still fits across the A4 sheet.
    const rowsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [toothH, setToothH] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(120);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalChartSheet.useEffect": ()=>{
            const measure = {
                "DentalChartSheet.useEffect.measure": ()=>{
                    const w = rowsRef.current?.clientWidth || 992;
                    const half = (w - 14) / 2;
                    setToothH(Math.max(60, Math.min(150, half / MAX_HALF_ASPECT_SUM * 0.9)));
                }
            }["DentalChartSheet.useEffect.measure"];
            measure();
            let ro;
            if (typeof ResizeObserver !== "undefined" && rowsRef.current) {
                ro = new ResizeObserver(measure);
                ro.observe(rowsRef.current);
            }
            return ({
                "DentalChartSheet.useEffect": ()=>ro?.disconnect()
            })["DentalChartSheet.useEffect"];
        }
    }["DentalChartSheet.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "dcp-sheet",
        style: {
            background: "#fff",
            color: "#0f172a",
            padding: 24,
            width: 1040,
            maxWidth: "100%",
            margin: "0 auto",
            fontFamily: "Inter, sans-serif"
        },
        children: [
            includePatient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PatientHeader, {
                patientId: patientId
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 217,
                columnNumber: 26
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: {
                    font: "700 14px Inter, sans-serif",
                    color: "#334155",
                    margin: "14px 0 12px"
                },
                children: [
                    "Dental Chart",
                    mode === "plain" ? " (Blank)" : ""
                ]
            }, void 0, true, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 218,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: rowsRef,
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArchRow, {
                        fdis: UPPER_ROW,
                        arch: "maxillary",
                        zonesByTooth: zonesByTooth,
                        missing: missing,
                        mode: mode,
                        h: toothH
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: 1,
                            background: "#e2e8f0"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArchRow, {
                        fdis: LOWER_ROW,
                        arch: "mandibular",
                        zonesByTooth: zonesByTooth,
                        missing: missing,
                        mode: mode,
                        h: toothH
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            mode === "historical" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DentalHistorySections, {
                patientId: patientId
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 226,
                columnNumber: 33
            }, this),
            mode === "historical" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$FlatDentitionChart$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OralExamReport"], {
                patientId: patientId
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 227,
                columnNumber: 33
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
        lineNumber: 216,
        columnNumber: 5
    }, this);
}
_s(DentalChartSheet, "cctxGRKHChp6fpHFcSxRpOQoIO0=");
_c4 = DentalChartSheet;
// Print stylesheet: hide everything else, expand the print root to one A4 page
// width, push each <article> (one A4 sheet from RxPreviewDocument) to its own
// physical page so the printout reads exactly like the Preview Rx drawer.
const PRINT_STYLE = `
@media print {
  body > *:not(.dcp-print-root) { display: none !important; }
  .dcp-print-root { position: static !important; opacity: 1 !important; z-index: auto !important; width: 100% !important; pointer-events: auto !important; left: auto !important; top: auto !important; }
  .dcp-print-root > div { max-width: 100% !important; gap: 0 !important; }
  .dcp-print-root article { box-shadow: none !important; border-radius: 0 !important; aspect-ratio: auto !important; height: auto !important; min-height: 0 !important; break-after: page !important; page-break-after: always !important; overflow: visible !important; }
  .dcp-print-root article:last-child { break-after: auto !important; page-break-after: avoid !important; }
  @page { size: A4 portrait; margin: 10mm; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}`;
// Empty Rx snapshot shape — used by the "plain" mode so the printed page has
// only the dental chart (no historical/clinical sections) but still matches the
// Preview Rx letterhead + patient + footer pattern exactly.
function emptySnapshot(patientId) {
    return {
        patientId,
        updatedAt: new Date().toISOString(),
        symptoms: [],
        examinations: [],
        diagnoses: [],
        labInvestigations: [],
        medications: [],
        advice: [],
        vitals: [],
        labResults: [],
        dentalExamination: []
    };
}
// Renders the Rx-preview document off-screen at A4 width and fires the system
// print dialog. The printed output mirrors the Preview Rx drawer; "historical"
// includes all dental + oral history sections above the chart, "plain" prints
// just the chart on the letterhead.
function PrintRunner({ patientId, mode, includePatient, onDone }) {
    _s1();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PrintRunner.useEffect": ()=>{
            const after = {
                "PrintRunner.useEffect.after": ()=>onDone()
            }["PrintRunner.useEffect.after"];
            window.addEventListener("afterprint", after);
            // Allow the PNG odontogram + measurement effects to settle before printing.
            const t = setTimeout({
                "PrintRunner.useEffect.t": ()=>{
                    try {
                        window.print();
                    } catch  {}
                }
            }["PrintRunner.useEffect.t"], 750);
            const fallback = setTimeout(onDone, 60000);
            return ({
                "PrintRunner.useEffect": ()=>{
                    clearTimeout(t);
                    clearTimeout(fallback);
                    window.removeEventListener("afterprint", after);
                }
            })["PrintRunner.useEffect"];
        }
    }["PrintRunner.useEffect"], [
        onDone
    ]);
    const snapshot = mode === "historical" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rx$2d$preview$2d$composer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComposedRxPreviewSnapshot"])(patientId) ?? emptySnapshot(patientId) : emptySnapshot(patientId);
    // Patient header is part of RxPreviewDocument; when includePatient is false
    // we still keep the letterhead/footer but render with a stripped patientId
    // marker would be ideal — for v0 we always include the patient block since
    // the Preview Rx pattern includes it by design.
    void includePatient;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "dcp-print-root",
        style: {
            position: "fixed",
            left: 0,
            top: 0,
            width: 760,
            opacity: 0,
            pointerEvents: "none",
            zIndex: -1,
            background: "#fff"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: PRINT_STYLE
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 283,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPreviewDocument$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RxPreviewDocument"], {
                snapshot: snapshot,
                settings: {
                    view: "list",
                    showDentalChart: true
                }
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 284,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
        lineNumber: 282,
        columnNumber: 5
    }, this), document.body);
}
_s1(PrintRunner, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c5 = PrintRunner;
function DentalChartPrintButton({ patientId }) {
    _s2();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [includePatient, setIncludePatient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [printReq, setPrintReq] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalChartPrintButton.useEffect": ()=>{
            if (!open) return;
            const onDoc = {
                "DentalChartPrintButton.useEffect.onDoc": (e)=>{
                    if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
                }
            }["DentalChartPrintButton.useEffect.onDoc"];
            document.addEventListener("mousedown", onDoc);
            return ({
                "DentalChartPrintButton.useEffect": ()=>document.removeEventListener("mousedown", onDoc)
            })["DentalChartPrintButton.useEffect"];
        }
    }["DentalChartPrintButton.useEffect"], [
        open
    ]);
    const choose = (mode)=>{
        setOpen(false);
        setPrintReq({
            mode,
            includePatient
        });
    };
    const item = (label, sub, mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            onClick: ()=>choose(mode),
            style: {
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "9px 12px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                borderRadius: 8
            },
            onMouseEnter: (e)=>{
                e.currentTarget.style.background = "rgba(100,116,139,0.10)";
            },
            onMouseLeave: (e)=>{
                e.currentTarget.style.background = "transparent";
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        font: "700 12.5px Inter, sans-serif",
                        color: "#1e293b"
                    },
                    children: label
                }, void 0, false, {
                    fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                    lineNumber: 307,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        font: "400 11px Inter, sans-serif",
                        color: "#94a3b8",
                        marginTop: 1
                    },
                    children: sub
                }, void 0, false, {
                    fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                    lineNumber: 308,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
            lineNumber: 304,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: rootRef,
        style: {
            position: "relative"
        },
        children: [
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    bottom: "calc(100% + 8px)",
                    left: 0,
                    width: 264,
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    boxShadow: "0 12px 34px rgba(2,6,23,0.18)",
                    padding: 6,
                    zIndex: 40
                },
                children: [
                    item("Plain dental chart", "Blank odontogram template", "plain"),
                    item("Historical dental chart", "With recorded findings & history", "historical"),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 12px",
                            borderTop: "1px solid #f1f5f9",
                            cursor: "pointer",
                            font: "600 11.5px Inter, sans-serif",
                            color: "#475569"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: includePatient,
                                onChange: (e)=>setIncludePatient(e.target.checked)
                            }, void 0, false, {
                                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                                lineNumber: 319,
                                columnNumber: 13
                            }, this),
                            "Include patient information"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                        lineNumber: 318,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 315,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPTooltip"], {
                title: "Print dental chart",
                arrow: true,
                placement: "top",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    "aria-label": "Print dental chart",
                    onClick: ()=>setOpen((o)=>!o),
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        border: "none",
                        background: "transparent",
                        color: "#334155",
                        cursor: "pointer"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M6 9V3.5C6 3.22 6.22 3 6.5 3h11c.28 0 .5.22.5.5V9M6 18H4.5C3.67 18 3 17.33 3 16.5v-5C3 10.67 3.67 10 4.5 10h15c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5H18M7 15h10v5.5c0 .28-.22.5-.5.5h-9a.5.5 0 0 1-.5-.5V15Z",
                            stroke: "currentColor",
                            strokeWidth: "1.5",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                        }, void 0, false, {
                            fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                            lineNumber: 328,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                        lineNumber: 327,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                    lineNumber: 325,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 324,
                columnNumber: 7
            }, this),
            printReq && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrintRunner, {
                patientId: patientId,
                mode: printReq.mode,
                includePatient: printReq.includePatient,
                onDone: ()=>setPrintReq(null)
            }, void 0, false, {
                fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
                lineNumber: 333,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dental/examination/DentalChartPrint.jsx",
        lineNumber: 313,
        columnNumber: 5
    }, this);
}
_s2(DentalChartPrintButton, "/3rRemEtM06+jD6rVtbA/VJlauw=");
_c6 = DentalChartPrintButton;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "ToothCell");
__turbopack_context__.k.register(_c1, "ArchRow");
__turbopack_context__.k.register(_c2, "PatientHeader");
__turbopack_context__.k.register(_c3, "DentalHistorySections");
__turbopack_context__.k.register(_c4, "DentalChartSheet");
__turbopack_context__.k.register(_c5, "PrintRunner");
__turbopack_context__.k.register(_c6, "DentalChartPrintButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/DentalCanvas.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DentalCanvas",
    ()=>DentalCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/OrbitControls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/Tooth.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentitionView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/DentitionView.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$ToothSelector$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/ToothSelector.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$QuickSurfaceSelector$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/QuickSurfaceSelector.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dental$2d$ai$2f$dental$2d$ai$2d$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/dental-ai/dental-ai-events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DiagnosisMatrix$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/DiagnosisMatrix.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/dental/examination/DentalCanvas.module.scss [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$LottieIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/LottieIcon.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$exam$2d$suggestions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/exam-suggestions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalChartPrint$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/DentalChartPrint.jsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
let findingIdCounter = 0;
const VALID_TOOTH_DIAG = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOOTH_DIAGNOSES"]);
const VALID_SURFACE_FINDING = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIAGNOSES"]);
// Stable empty collections so default values don't create new identity per render
// (which would cause downstream useEffect deps to re-fire and re-inject shaders)
const EMPTY_DIAG_SET = new Set();
const EMPTY_FINDINGS = [];
/** Single-row dentition scope toolbar (quadrants, arches, full). */ const DENTITION_SCOPE_BUTTONS = [
    {
        id: 'UR',
        label: 'UR',
        title: 'Upper right quadrant'
    },
    {
        id: 'UL',
        label: 'UL',
        title: 'Upper left quadrant'
    },
    {
        id: 'LR',
        label: 'LR',
        title: 'Lower right quadrant'
    },
    {
        id: 'LL',
        label: 'LL',
        title: 'Lower left quadrant'
    },
    {
        id: 'RIGHT_ARCH',
        label: 'R arch',
        title: "Patient's right arch (UR + LR)"
    },
    {
        id: 'LEFT_ARCH',
        label: 'L arch',
        title: "Patient's left arch (UL + LL)"
    },
    {
        id: 'UPPER_ARCH',
        label: 'Maxillary',
        title: 'Maxillary arch (UR + UL)'
    },
    {
        id: 'LOWER_ARCH',
        label: 'Mandibular',
        title: 'Mandibular arch (LR + LL)'
    },
    {
        id: 'FULL',
        label: 'Full',
        title: 'Full mouth — all teeth'
    }
];
const ARCH_SCOPE_IDS = new Set([
    'RIGHT_ARCH',
    'LEFT_ARCH',
    'UPPER_ARCH',
    'LOWER_ARCH'
]);
/** Agent / voice rows share the same clinical name often — give each applied row its own table key. */ function allocateTreatmentHistoryDetailKey(acc, preferredName) {
    const base = preferredName && String(preferredName).trim() || 'Treatment';
    if (!acc[base]) return base;
    let i = 2;
    while(acc[`${base} (${i})`])i += 1;
    return `${base} (${i})`;
}
/** Map radiology / voice surface text to chart zones for treatment-history rows. */ function zonesFromAgentHistorySurface(surfaceRaw, treatmentName) {
    const fallback = ()=>{
        const d = [
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultTreatmentSurfaces"])(treatmentName)
        ];
        return d.length ? d : [
            'whole'
        ];
    };
    const raw = (surfaceRaw || '').trim();
    if (!raw || /whole/i.test(raw)) return fallback();
    const s = raw.toLowerCase();
    const pairs = [
        [
            'occlusal',
            'occlusal'
        ],
        [
            'buccal',
            'buccal'
        ],
        [
            'labial',
            'buccal'
        ],
        [
            'lingual',
            'lingual'
        ],
        [
            'palatal',
            'lingual'
        ],
        [
            'mesial',
            'mesial'
        ],
        [
            'distal',
            'distal'
        ],
        [
            'cervical',
            'cervical'
        ],
        [
            'incisal',
            'occlusal'
        ],
        [
            'root',
            'root'
        ]
    ];
    for (const [needle, z] of pairs){
        if (s.includes(needle)) {
            if (z === 'whole' || __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_ZONES"].includes(z)) return [
                z
            ];
            break;
        }
    }
    return fallback();
}
/** Short tags in header — align with scope toolbar labels. */ const SCOPE_HEADER_BADGE = {
    FULL: 'FULL',
    UR: 'UR',
    UL: 'UL',
    LR: 'LR',
    LL: 'LL',
    RIGHT_ARCH: 'R arch',
    LEFT_ARCH: 'L arch',
    UPPER_ARCH: 'Maxillary',
    LOWER_ARCH: 'Mandibular'
};
const SCOPE_SELECTION_LABELS = {
    UR: 'Upper Right Quadrant',
    UL: 'Upper Left Quadrant',
    LR: 'Lower Right Quadrant',
    LL: 'Lower Left Quadrant',
    RIGHT_ARCH: 'Right arch',
    LEFT_ARCH: 'Left arch',
    UPPER_ARCH: 'Maxillary arch',
    LOWER_ARCH: 'Mandibular arch'
};
function dentitionScopeIsActive(scopeId, selectionScope) {
    if (scopeId === 'FULL') return selectionScope.type === 'full-mouth';
    if (ARCH_SCOPE_IDS.has(scopeId)) return selectionScope.type === 'arch' && selectionScope.id === scopeId;
    return selectionScope.type === 'quadrant' && selectionScope.id === scopeId;
}
// ══════════════════════════════════════════════════════════════
// Camera Controller — animates between dentition and single-tooth views
// ══════════════════════════════════════════════════════════════
const DENTITION_CAMERA = {
    position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 2.5, 16.5),
    target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, -0.9, -0.3),
    fov: 35
};
/** Same default radius as ZoneCameraRotator so “no surface picked” matches buccal framing. */ const SINGLE_TOOTH_ORBIT_RADIUS = 6.28;
/** Single-tooth orbit target; Y slightly above old -0.04 so the tooth sits higher in frame. */ const SINGLE_TOOTH_TARGET = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.04, 0);
const SINGLE_TOOTH_FOV = 27;
/** UR/UL/LR/LL + R/L: much closer Z than Max/Man/Full (see groupedScopeZ). */ const QUADRANT_SIDE_SCOPE_EXTRA_ZOOM = 3.15;
function getSingleToothBuccalCamera(fdi, width, height) {
    const aspect = width / Math.max(1, height);
    const widthFactor = (width - 980) / 980;
    const widthAdjust = Math.max(-1.1, Math.min(1.1, -widthFactor * 1.5));
    const aspectPull = aspect < 0.7 ? 2.0 : aspect < 0.9 ? 1.15 : aspect < 1.1 ? 0.6 : aspect < 1.4 ? 0.22 : 0;
    const radius = SINGLE_TOOTH_ORBIT_RADIUS + aspectPull + widthAdjust * 0.35;
    const frontAz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrontAzimuth"])(String(fdi)) ?? 0;
    const offset = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().setFromSpherical(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spherical"](radius, Math.PI / 2, frontAz));
    return {
        position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().copy(SINGLE_TOOTH_TARGET).add(offset),
        target: SINGLE_TOOTH_TARGET.clone(),
        fov: SINGLE_TOOTH_FOV
    };
}
function ZoneCameraRotator({ zone, toothFdi, quadrant, arch, controlsRef, radius = 6.28 }) {
    _s();
    const { camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ZoneCameraRotator.useEffect": ()=>{
            if (!zone) return;
            const frontAz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrontAzimuth"])(toothFdi) ?? 0;
            let az = frontAz;
            let pol = Math.PI / 2;
            const dirs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDirsForTooth"])(toothFdi, quadrant, 0);
            if (zone === 'buccal') {
                az = frontAz;
                pol = Math.PI / 2;
            }
            if (zone === 'lingual') {
                az = frontAz + Math.PI;
                pol = Math.PI / 2;
            }
            if (zone === 'mesial') {
                az = Math.atan2(dirs.mesial.x, dirs.mesial.z);
                pol = Math.PI / 2;
            }
            if (zone === 'distal') {
                az = Math.atan2(dirs.distal.x, dirs.distal.z);
                pol = Math.PI / 2;
            }
            if (zone === 'occlusal') {
                az = frontAz;
                pol = arch === 'mandibular' ? 0.25 : Math.PI - 0.25;
            }
            if (zone === 'cervical') {
                az = frontAz;
                pol = arch === 'mandibular' ? Math.PI / 2.4 : Math.PI - Math.PI / 2.4;
            }
            if (zone === 'root') {
                az = frontAz;
                pol = arch === 'mandibular' ? Math.PI - 0.35 : 0.35;
            }
            if (controlsRef.current) {
                controlsRef.current.enabled = false;
                controlsRef.current.enableDamping = false;
            }
            target.current = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spherical"](radius, pol, az);
        }
    }["ZoneCameraRotator.useEffect"], [
        zone,
        toothFdi,
        quadrant,
        arch,
        radius,
        controlsRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "ZoneCameraRotator.useFrame": ()=>{
            if (!target.current || !controlsRef.current) return;
            const controls = controlsRef.current;
            const center = controls.target;
            // Current spherical around target
            const offset = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().subVectors(camera.position, center);
            const cur = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spherical"]().setFromVector3(offset);
            const goal = target.current;
            // Lerp spherical angles
            const lerp = 0.12;
            cur.theta += shortestAngleDelta(cur.theta, goal.theta) * lerp;
            cur.phi += (goal.phi - cur.phi) * lerp;
            // Keep radius roughly constant
            cur.radius += (goal.radius - cur.radius) * lerp;
            const next = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().setFromSpherical(cur);
            camera.position.copy(next.add(center));
            controls.update();
            // Stop when close enough
            if (Math.abs(shortestAngleDelta(cur.theta, goal.theta)) < 0.005 && Math.abs(cur.phi - goal.phi) < 0.005 && Math.abs(cur.radius - goal.radius) < 0.01) {
                target.current = null;
                if (controls) {
                    controls.enabled = true;
                    controls.enableDamping = true;
                }
            }
        }
    }["ZoneCameraRotator.useFrame"]);
    return null;
}
_s(ZoneCameraRotator, "KodedhdPJlGVbUAFv+Z50gvXiTg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = ZoneCameraRotator;
function shortestAngleDelta(from, to) {
    let d = to - from;
    while(d > Math.PI)d -= Math.PI * 2;
    while(d < -Math.PI)d += Math.PI * 2;
    return d;
}
function CameraController({ viewMode, patientType, selectionScopeType = 'tooth', selectionScopeId = null, dentitionCameraOverride, dentitionVerticalNudge, onDentitionVerticalNudgeChange, controlsRef }) {
    _s1();
    const { camera, size } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const animRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        active: false,
        t: 0,
        startPos: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        endPos: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        startTarget: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        endTarget: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](),
        startFov: 32,
        endFov: 32
    });
    const cameraLayoutKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CameraController.useMemo[cameraLayoutKey]": ()=>{
            if (viewMode === 'dentition') return 'dentition';
            if (selectionScopeType === 'tooth') return `single-tooth:${selectionScopeId ?? ''}`;
            return `grouped:${selectionScopeType}:${selectionScopeId ?? ''}`;
        }
    }["CameraController.useMemo[cameraLayoutKey]"], [
        viewMode,
        selectionScopeType,
        selectionScopeId
    ]);
    const prevLayoutKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(cameraLayoutKey);
    const prevPatientType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(patientType);
    const initialized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Canvas-aspect-responsive dentition z: the narrower the canvas, the further
    // back the camera pulls so the whole arch still fits without cropping.
    // Wider range so narrow panels never clip the teeth.
    const dentitionZ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CameraController.useMemo[dentitionZ]": ()=>{
            const aspect = size.width / Math.max(1, size.height);
            const widthFactor = (size.width - 980) / 980;
            // Wider canvas => zoom in a bit (lower Z), narrower => zoom out (higher Z)
            const widthAdjust = Math.max(-1.8, Math.min(1.8, -widthFactor * 2.2));
            const base = ({
                "CameraController.useMemo[dentitionZ].base": ()=>{
                    // Narrower canvases need the camera further back so the full mouth
                    // (both arches at the natural biting pose) stays visible without clipping.
                    if (aspect < 0.6) return 36;
                    if (aspect < 0.8) return 30;
                    if (aspect < 1.0) return 25;
                    if (aspect < 1.2) return 21;
                    if (aspect < 1.5) return 18;
                    return 17;
                }
            })["CameraController.useMemo[dentitionZ].base"]();
            if (patientType === 'pediatric') return base - 4.2 + widthAdjust;
            if (patientType === 'mixed') return base + 0.3 + widthAdjust;
            return base - 1.4 + widthAdjust;
        }
    }["CameraController.useMemo[dentitionZ]"], [
        size.width,
        size.height,
        patientType
    ]);
    /** Extra Z + framing so UR/Full/… grouped views clear the bottom tooth-chart overlay and fit the arch. */ const groupedScopeZ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CameraController.useMemo[groupedScopeZ]": ()=>{
            const aspect = size.width / Math.max(1, size.height);
            const widthFactor = (size.width - 980) / 980;
            const widthAdjust = Math.max(-1.6, Math.min(1.6, -widthFactor * 2.0));
            const zoomPad = 2.45;
            const groupedZoomBase = 1.15;
            // Push the camera further back on narrow / portrait canvases (e.g. split
            // oral-exam view on small screens) so the entire dentition stays visible.
            const base = aspect < 0.6 ? 28 : aspect < 0.8 ? 24 : aspect < 1.1 ? 20.5 : 18;
            let z;
            if (selectionScopeType === 'full-mouth') z = base + (patientType === 'mixed' ? 7.2 : 5.2) + widthAdjust + zoomPad;
            else if (selectionScopeType === 'arch') z = base + (patientType === 'mixed' ? 4.2 : 3.0) + widthAdjust + zoomPad;
            else z = base + (patientType === 'mixed' ? 1.4 : 0.8) + widthAdjust + zoomPad;
            const isQuadrantOrSideArch = selectionScopeType === 'quadrant' || selectionScopeType === 'arch' && (selectionScopeId === 'RIGHT_ARCH' || selectionScopeId === 'LEFT_ARCH');
            const zoomTotal = groupedZoomBase + (isQuadrantOrSideArch ? QUADRANT_SIDE_SCOPE_EXTRA_ZOOM : 0);
            return z - zoomTotal;
        }
    }["CameraController.useMemo[groupedScopeZ]"], [
        size.width,
        size.height,
        patientType,
        selectionScopeType,
        selectionScopeId
    ]);
    // Ctrl/Cmd + drag vertically nudges dentition framing (desktop).
    // iPad keeps native 2-finger panning through OrbitControls.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraController.useEffect": ()=>{
            if (!controlsRef.current?.domElement) return;
            const dom = controlsRef.current.domElement;
            let dragging = false;
            let lastY = 0;
            const clampNudge = {
                "CameraController.useEffect.clampNudge": (v)=>Math.max(-2.0, Math.min(2.0, v))
            }["CameraController.useEffect.clampNudge"];
            const onPointerDown = {
                "CameraController.useEffect.onPointerDown": (e)=>{
                    if (viewMode !== 'dentition') return;
                    if (e.pointerType === 'touch') return;
                    if (!(e.ctrlKey || e.metaKey)) return;
                    dragging = true;
                    lastY = e.clientY;
                    if (controlsRef.current) controlsRef.current.enabled = false;
                    e.preventDefault();
                }
            }["CameraController.useEffect.onPointerDown"];
            const onPointerMove = {
                "CameraController.useEffect.onPointerMove": (e)=>{
                    if (!dragging) return;
                    const dy = e.clientY - lastY;
                    lastY = e.clientY;
                    if (controlsRef.current) {
                        controlsRef.current.object.position.y += dy * 0.01;
                        controlsRef.current.target.y += dy * 0.01;
                        controlsRef.current.update();
                    }
                    onDentitionVerticalNudgeChange({
                        "CameraController.useEffect.onPointerMove": (prev)=>clampNudge(prev + dy * 0.01)
                    }["CameraController.useEffect.onPointerMove"]);
                    e.preventDefault();
                }
            }["CameraController.useEffect.onPointerMove"];
            const stopDragging = {
                "CameraController.useEffect.stopDragging": ()=>{
                    if (!dragging) return;
                    dragging = false;
                    if (controlsRef.current?.dispatchEvent) {
                        controlsRef.current.dispatchEvent({
                            type: 'end'
                        });
                    }
                    if (controlsRef.current && !animRef.current.active) controlsRef.current.enabled = true;
                }
            }["CameraController.useEffect.stopDragging"];
            dom.addEventListener('pointerdown', onPointerDown, {
                passive: false
            });
            window.addEventListener('pointermove', onPointerMove, {
                passive: false
            });
            window.addEventListener('pointerup', stopDragging);
            window.addEventListener('pointercancel', stopDragging);
            return ({
                "CameraController.useEffect": ()=>{
                    dom.removeEventListener('pointerdown', onPointerDown);
                    window.removeEventListener('pointermove', onPointerMove);
                    window.removeEventListener('pointerup', stopDragging);
                    window.removeEventListener('pointercancel', stopDragging);
                }
            })["CameraController.useEffect"];
        }
    }["CameraController.useEffect"], [
        controlsRef,
        viewMode,
        onDentitionVerticalNudgeChange
    ]);
    const getCameraPreset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CameraController.useCallback[getCameraPreset]": ()=>{
            if (viewMode === 'dentition') {
                if (dentitionCameraOverride) {
                    return {
                        cam: {
                            ...DENTITION_CAMERA,
                            position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](dentitionCameraOverride.position[0], dentitionCameraOverride.position[1], dentitionCameraOverride.position[2]),
                            target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](dentitionCameraOverride.target[0], dentitionCameraOverride.target[1], dentitionCameraOverride.target[2])
                        }
                    };
                }
                // Keep all dentition variants aligned to the canvas center-line vertically.
                const centeredY = 2.36;
                const centeredTargetY = -0.34;
                const dentitionFrameByType = patientType === 'pediatric' ? {
                    y: centeredY,
                    targetY: centeredTargetY,
                    z: dentitionZ - 2.05
                } : patientType === 'mixed' ? {
                    y: centeredY,
                    targetY: centeredTargetY,
                    z: dentitionZ + 0.9
                } : {
                    y: centeredY,
                    targetY: centeredTargetY,
                    z: dentitionZ - 0.85
                };
                return {
                    cam: {
                        ...DENTITION_CAMERA,
                        position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](DENTITION_CAMERA.position.x, dentitionFrameByType.y + dentitionVerticalNudge, dentitionFrameByType.z),
                        target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](DENTITION_CAMERA.target.x, dentitionFrameByType.targetY + dentitionVerticalNudge, DENTITION_CAMERA.target.z)
                    }
                };
            }
            if (selectionScopeType !== 'tooth') {
                const isNarrowGrouped = selectionScopeType === 'quadrant' || selectionScopeType === 'arch' && (selectionScopeId === 'RIGHT_ARCH' || selectionScopeId === 'LEFT_ARCH');
                if (isNarrowGrouped) {
                    return {
                        cam: {
                            position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.64, groupedScopeZ),
                            target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, -0.04, -0.35),
                            fov: 30.5
                        }
                    };
                }
                return {
                    cam: {
                        position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.53, groupedScopeZ),
                        target: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, -0.13, -0.35),
                        fov: 34.5
                    }
                };
            }
            const rawFdi = selectionScopeId != null ? String(selectionScopeId) : '';
            const fdi = /^\d{2}$/.test(rawFdi) ? rawFdi : '11';
            return {
                cam: getSingleToothBuccalCamera(fdi, size.width, size.height)
            };
        }
    }["CameraController.useCallback[getCameraPreset]"], [
        viewMode,
        patientType,
        selectionScopeType,
        selectionScopeId,
        dentitionZ,
        groupedScopeZ,
        dentitionVerticalNudge,
        dentitionCameraOverride,
        size.width,
        size.height
    ]);
    // Set initial camera position based on initial viewMode
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraController.useEffect": ()=>{
            if (initialized.current) return;
            initialized.current = true;
            const { cam } = getCameraPreset();
            camera.position.copy(cam.position);
            camera.position.z = cam.position.z;
            camera.fov = cam.fov;
            camera.updateProjectionMatrix();
            if (controlsRef.current) {
                controlsRef.current.target.copy(cam.target);
                controlsRef.current.update();
            }
        }
    }["CameraController.useEffect"], [
        getCameraPreset
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    // React to canvas resize (e.g. draggable split) — both modes.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraController.useEffect": ()=>{
            if (animRef.current.active) return;
            const { cam } = getCameraPreset();
            if (viewMode !== 'dentition' && selectionScopeType === 'tooth') {
                camera.position.copy(cam.position);
                camera.fov = cam.fov;
                camera.updateProjectionMatrix();
                if (controlsRef.current) {
                    controlsRef.current.target.copy(cam.target);
                    controlsRef.current.update();
                }
            } else {
                camera.position.z = cam.position.z;
                camera.updateProjectionMatrix();
                if (controlsRef.current) controlsRef.current.update();
            }
        }
    }["CameraController.useEffect"], [
        dentitionZ,
        groupedScopeZ,
        viewMode,
        selectionScopeType,
        getCameraPreset,
        camera,
        controlsRef
    ]);
    // Switching patient tabs should restore that tab's own view (or default),
    // rather than carrying over the previous tab's current camera transform.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraController.useEffect": ()=>{
            if (viewMode !== 'dentition') {
                prevPatientType.current = patientType;
                return;
            }
            if (prevPatientType.current === patientType) return;
            prevPatientType.current = patientType;
            const { cam } = getCameraPreset();
            camera.position.copy(cam.position);
            camera.fov = cam.fov;
            camera.updateProjectionMatrix();
            if (controlsRef.current) {
                controlsRef.current.target.copy(cam.target);
                controlsRef.current.update();
            }
        }
    }["CameraController.useEffect"], [
        patientType,
        viewMode,
        getCameraPreset,
        camera,
        controlsRef
    ]);
    // Animate on dentition ↔ single-tooth, and when grouped scope id changes (UR→UL, Max→R, …).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraController.useEffect": ()=>{
            if (prevLayoutKey.current === cameraLayoutKey) return;
            prevLayoutKey.current = cameraLayoutKey;
            const { cam: target } = getCameraPreset();
            const a = animRef.current;
            a.startPos.copy(camera.position);
            a.endPos.copy(target.position);
            a.startTarget.copy(controlsRef.current?.target || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
            a.endTarget.copy(target.target);
            a.startFov = camera.fov;
            a.endFov = target.fov;
            a.t = 0;
            a.active = true;
            if (controlsRef.current) controlsRef.current.enabled = false;
        }
    }["CameraController.useEffect"], [
        cameraLayoutKey,
        getCameraPreset,
        camera,
        controlsRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "CameraController.useFrame": (_, delta)=>{
            const a = animRef.current;
            if (!a.active) return;
            a.t += delta / 1.0; // 1.0 second transition — more pronounced zoom
            const t = Math.min(a.t, 1);
            // easeOutQuint — a stronger slowdown near the end gives the "settle into place" feel
            const ease = 1 - Math.pow(1 - t, 5);
            camera.position.lerpVectors(a.startPos, a.endPos, ease);
            camera.fov = a.startFov + (a.endFov - a.startFov) * ease;
            camera.updateProjectionMatrix();
            if (controlsRef.current) {
                controlsRef.current.target.lerpVectors(a.startTarget, a.endTarget, ease);
                controlsRef.current.update();
            }
            if (t >= 1) {
                a.active = false;
                if (controlsRef.current) controlsRef.current.enabled = true;
            }
        }
    }["CameraController.useFrame"]);
    return null;
}
_s1(CameraController, "nGo+zLyLGUFElrEvEJronMRrC9A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = CameraController;
// ══════════════════════════════════════════════════════════════
// App
// ══════════════════════════════════════════════════════════════
const EMPTY_DIAGNOSES = new Set();
const EMPTY_TREATMENTS = {};
const getTeethForPatientType = (type)=>type === 'adult' ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"] : type === 'pediatric' ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_TEETH"] : [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEETH"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PEDIATRIC_TEETH"]
    ];
const getDefaultFdiForPatientType = (type)=>type === 'adult' ? '26' : type === 'pediatric' ? '64' : '26';
// When a diagnosis is applied across a whole scope (a quadrant, an arch, the
// full mouth…) we show ONE consolidated tag instead of repeating it on every
// tooth. Each scope's tag is anchored to a representative spot over the canvas
// (percent of the viewer box) so it visually "belongs" to that region.
// Note: viewer is oriented facing the patient, so the patient's RIGHT teeth
// (UR / LR / Right arch) sit on the viewer's LEFT.
const SCOPE_TAG_POS = {
    'Maxillary': {
        left: 50,
        top: 37
    },
    'Mandibular': {
        left: 50,
        top: 79
    },
    'Upper Right': {
        left: 29,
        top: 38
    },
    'Upper Left': {
        left: 72,
        top: 37
    },
    'Lower Right': {
        left: 25,
        top: 77
    },
    'Lower Left': {
        left: 75,
        top: 79
    },
    'Right arch': {
        left: 12,
        top: 55
    },
    'Left arch': {
        left: 88,
        top: 55
    },
    'Full mouth': {
        left: 50,
        top: 58
    }
};
// Same anchors, keyed by oral-region id — used to float a region's oral-exam
// tag over the dentition so the doctor sees recorded oral findings at a glance.
const ORAL_TAG_POS = {
    UR: {
        left: 29,
        top: 38
    },
    UL: {
        left: 72,
        top: 37
    },
    LR: {
        left: 25,
        top: 77
    },
    LL: {
        left: 75,
        top: 79
    },
    RIGHT_ARCH: {
        left: 12,
        top: 55
    },
    LEFT_ARCH: {
        left: 88,
        top: 55
    },
    UPPER_ARCH: {
        left: 50,
        top: 37
    },
    LOWER_ARCH: {
        left: 50,
        top: 79
    },
    // Whole-mouth / full tag sits at the central meeting point of all four
    // quadrants (the occlusal midline) rather than on top of the front teeth.
    FULL: {
        left: 50,
        top: 50
    }
};
// One floating oral-exam tag, anchored over the dentition. Distinct translucent
// violet (vs the grey per-tooth treatment tags and the teal nothing-else), same
// small corner radius. Hover shows a tooltip listing the entries at that anchor.
function OralExamTag({ pos, list, forceShowAll = false }) {
    _s2();
    const [hover, setHover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const showTip = hover || forceShowAll;
    const label = list.length > 1 ? `${list[0].name} +${list.length - 1}` : list[0].name;
    const siteOf = (e)=>(e.surfaces || []).map((p)=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ORAL_POSITION_LABEL"][p] || p).join(', ') || 'Whole mouth';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        style: {
            position: 'absolute',
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: showTip ? 9998 : 14,
            pointerEvents: 'auto'
        },
        onMouseEnter: ()=>setHover(true),
        onMouseLeave: ()=>setHover(false),
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '2px 8px',
                    borderRadius: 6,
                    background: 'rgba(164,97,216,0.16)',
                    color: '#703A9E',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '-0.2px',
                    boxShadow: '0 2px 8px rgba(86,42,129,0.12)',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    cursor: 'default'
                },
                children: label
            }),
            showTip && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                style: {
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 9999,
                    minWidth: 160,
                    maxWidth: 240,
                    background: 'rgba(15,23,42,0.95)',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '8px 10px',
                    boxShadow: '0 8px 24px rgba(2,6,23,0.4)',
                    fontFamily: 'Inter, sans-serif',
                    whiteSpace: 'normal',
                    pointerEvents: 'none'
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6
                    },
                    children: list.map((e)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                            style: {
                                fontSize: 11,
                                lineHeight: 1.35
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: {
                                        fontWeight: 700
                                    },
                                    children: e.name
                                }),
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                    style: {
                                        color: '#cbd5e1',
                                        fontSize: 10
                                    },
                                    children: siteOf(e) + (e.since ? ` · since ${e.since}` : '') + (e.note ? ` · ${e.note}` : '')
                                })
                            ]
                        }, e.id))
                })
            })
        ]
    });
}
_s2(OralExamTag, "bRXmKus9fOZFlca/6zXTYU+twGY=");
_c2 = OralExamTag;
function OralExamTags({ entries, forceShowAll = false }) {
    const groups = {};
    entries.forEach((e)=>{
        const regionPos = (e.surfaces || []).find((p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOralRegionPosition"])(p) && ![
                'WHOLE',
                'GENERALIZED',
                'FULL'
            ].includes(p));
        const key = regionPos || 'FULL';
        (groups[key] = groups[key] || []).push(e);
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: Object.entries(groups).map(([key, list])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(OralExamTag, {
                pos: ORAL_TAG_POS[key] || ORAL_TAG_POS.FULL,
                list: list,
                forceShowAll: forceShowAll
            }, key))
    });
}
_c3 = OralExamTags;
function DentalCanvas({ patientId, patientAge = 30, compact = false, onStateChange, showAllOralTooltips = false }) {
    _s3();
    // When the doctor hovers the "Oral Examination" record card in the aside,
    // every oral tag on the dentition pops its tooltip at once (decoupled via a
    // window event so we don't thread props through the panel tree).
    const [hoverShowAllOral, setHoverShowAllOral] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            const on = {
                "DentalCanvas.useEffect.on": (e)=>setHoverShowAllOral(Boolean(e?.detail?.show))
            }["DentalCanvas.useEffect.on"];
            window.addEventListener('oral-tags-show-all', on);
            return ({
                "DentalCanvas.useEffect": ()=>window.removeEventListener('oral-tags-show-all', on)
            })["DentalCanvas.useEffect"];
        }
    }["DentalCanvas.useEffect"], []);
    // Pull initial state for this patient from mock data
    const initialState = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_TOOTH_STATE"][patientId];
    const initialToothDiagnoses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[initialToothDiagnoses]": ()=>{
            if (!initialState?.toothDiagnoses) return {};
            const out = {};
            for (const [fdi, diags] of Object.entries(initialState.toothDiagnoses)){
                out[fdi] = new Set(diags);
            }
            return out;
        }
    }["DentalCanvas.useMemo[initialToothDiagnoses]"], [
        initialState
    ]);
    const initialImplants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[initialImplants]": ()=>new Set(initialState?.implantTeeth ?? [])
    }["DentalCanvas.useMemo[initialImplants]"], [
        initialState
    ]);
    const initialFindings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[initialFindings]": ()=>{
            if (!initialState?.findingsByTooth) return {};
            const out = {};
            for (const [fdi, list] of Object.entries(initialState.findingsByTooth)){
                out[fdi] = list.map({
                    "DentalCanvas.useMemo[initialFindings]": (f, i)=>({
                            id: `seed-${fdi}-${i}`,
                            zoneId: f.zoneId,
                            type: f.type,
                            notes: ''
                        })
                }["DentalCanvas.useMemo[initialFindings]"]);
            }
            return out;
        }
    }["DentalCanvas.useMemo[initialFindings]"], [
        initialState
    ]);
    const [patientType, setPatientType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(patientAge < 12 ? 'pediatric' : 'adult');
    const activeTeeth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[activeTeeth]": ()=>getTeethForPatientType(patientType)
    }["DentalCanvas.useMemo[activeTeeth]"], [
        patientType
    ]);
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dentition');
    const [selectedTooth, setSelectedTooth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(activeTeeth.find({
        "DentalCanvas.useState": (t)=>t.fdi === getDefaultFdiForPatientType(patientType)
    }["DentalCanvas.useState"]) ?? activeTeeth[0]);
    const [selectionScope, setSelectionScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: 'tooth',
        id: 'tooth',
        label: '',
        fdis: []
    });
    const hasHydratedFromStorage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [selectedZone, setSelectedZone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [, setHoveredZone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [findingsByTooth, setFindingsByTooth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialFindings);
    // Last 3D click point per zone (world space) — used as spot decal center for findings.
    // Keyed by "fdi-zoneId" so points are scoped to the correct tooth.
    const [zoneHitPoints, setZoneHitPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [zoneNotes, setZoneNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [implantTeeth, setImplantTeeth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialImplants);
    const [toothDiagnoses, setToothDiagnoses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialToothDiagnoses);
    const [toothNotes, setToothNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [allEntries, setAllEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [treatmentHistoryDetailsByTooth, setTreatmentHistoryDetailsByTooth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [highlightZones, setHighlightZones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [multiSelectZones, setMultiSelectZones] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DentalCanvas.useState": ()=>new Set()
    }["DentalCanvas.useState"]);
    const [multiSelectActive, setMultiSelectActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hoveredToothFdi, setHoveredToothFdi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dentitionVerticalNudgeByType, setDentitionVerticalNudgeByType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [dentitionCameraByType, setDentitionCameraByType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [hideExamineHint, setHideExamineHint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Oral Examination — flat list of region/surface-tagged findings & procedures
    // (NOT tied to a single tooth). Each entry: { id, kind, name, surfaces[], since, note }
    // where `surfaces` holds position ids (regions and/or anatomical surfaces).
    const [oralEntries, setOralEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DentalCanvas.useState": ()=>Array.isArray(initialState?.oralEntries) ? initialState.oralEntries : []
    }["DentalCanvas.useState"]);
    const [oralNotes, setOralNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DentalCanvas.useState": ()=>initialState?.oralNotes ?? ''
    }["DentalCanvas.useState"]);
    const [oralHighlightFdis, setOralHighlightFdis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DentalCanvas.useState": ()=>new Set()
    }["DentalCanvas.useState"]);
    const oralIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const updateOralNotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[updateOralNotes]": (v)=>setOralNotes(v ?? '')
    }["DentalCanvas.useCallback[updateOralNotes]"], []);
    const addOralEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[addOralEntry]": (kind, name)=>{
            if (!name) return;
            setOralEntries({
                "DentalCanvas.useCallback[addOralEntry]": (prev)=>{
                    if (prev.some({
                        "DentalCanvas.useCallback[addOralEntry]": (e)=>e.kind === kind && e.name === name
                    }["DentalCanvas.useCallback[addOralEntry]"])) return prev;
                    // Unique across mounts (hydrated entries may already use oral-1, oral-2…).
                    const id = `oral-${Date.now().toString(36)}-${++oralIdRef.current}`;
                    return [
                        ...prev,
                        {
                            id,
                            kind,
                            name,
                            surfaces: [],
                            since: '',
                            note: ''
                        }
                    ];
                }
            }["DentalCanvas.useCallback[addOralEntry]"]);
        }
    }["DentalCanvas.useCallback[addOralEntry]"], []);
    const removeOralEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[removeOralEntry]": (id)=>{
            setOralEntries({
                "DentalCanvas.useCallback[removeOralEntry]": (prev)=>prev.filter({
                        "DentalCanvas.useCallback[removeOralEntry]": (e)=>e.id !== id
                    }["DentalCanvas.useCallback[removeOralEntry]"])
            }["DentalCanvas.useCallback[removeOralEntry]"]);
        }
    }["DentalCanvas.useCallback[removeOralEntry]"], []);
    const updateOralEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[updateOralEntry]": (id, patch)=>{
            setOralEntries({
                "DentalCanvas.useCallback[updateOralEntry]": (prev)=>prev.map({
                        "DentalCanvas.useCallback[updateOralEntry]": (e)=>e.id === id ? {
                                ...e,
                                ...patch
                            } : e
                    }["DentalCanvas.useCallback[updateOralEntry]"])
            }["DentalCanvas.useCallback[updateOralEntry]"]);
        }
    }["DentalCanvas.useCallback[updateOralEntry]"], []);
    /** FDI set — teeth pulse briefly after Dr Agent / AI scan copy-to-chart */ const [agentApplyPulseFdis, setAgentApplyPulseFdis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DentalCanvas.useState": ()=>new Set()
    }["DentalCanvas.useState"]);
    const agentPulseClearTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const controlsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dentitionVerticalNudge = dentitionVerticalNudgeByType[patientType] ?? 0;
    const dentitionCameraOverride = dentitionCameraByType[patientType];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if (!selectionScope.fdis.length) {
                setSelectionScope({
                    type: 'tooth',
                    id: selectedTooth.fdi,
                    label: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][selectedTooth.quadrant]} ${selectedTooth.name}`,
                    fdis: [
                        selectedTooth.fdi
                    ]
                });
            }
        }
    }["DentalCanvas.useEffect"], [
        selectionScope.fdis.length,
        selectedTooth
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") === 'undefined' || hasHydratedFromStorage.current) return;
            hasHydratedFromStorage.current = true;
            const raw = window.localStorage.getItem(`dental.canvas.state.${patientId}`);
            if (!raw) return;
            try {
                const saved = JSON.parse(raw);
                const nextType = saved.patientType === 'adult' || saved.patientType === 'pediatric' || saved.patientType === 'mixed' ? saved.patientType : undefined;
                if (nextType) setPatientType(nextType);
                const source = getTeethForPatientType(nextType ?? patientType);
                const candidateFdi = saved.selectedToothFdi;
                const fallbackFdi = getDefaultFdiForPatientType(nextType ?? patientType);
                const tooth = source.find({
                    "DentalCanvas.useEffect": (t)=>t.fdi === candidateFdi
                }["DentalCanvas.useEffect"]) ?? source.find({
                    "DentalCanvas.useEffect": (t)=>t.fdi === fallbackFdi
                }["DentalCanvas.useEffect"]) ?? source[0];
                if (tooth) {
                    setSelectedTooth(tooth);
                    setSelectionScope({
                        type: 'tooth',
                        id: tooth.fdi,
                        label: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][tooth.quadrant]} ${tooth.name}`,
                        fdis: [
                            tooth.fdi
                        ]
                    });
                }
                if (saved.selectionScope && saved.selectionScope.fdis?.length) {
                    setSelectionScope(saved.selectionScope);
                }
                // NOTE: intentionally do NOT restore `viewMode` from localStorage.
                // Every fresh mount of the Dental Examination should boot into the
                // full dentition view; single-tooth mode is a transient drill-down
                // driven by user click within the session.
                if (saved.dentitionVerticalNudgeByType) {
                    setDentitionVerticalNudgeByType(saved.dentitionVerticalNudgeByType);
                }
                if (saved.dentitionCameraByType) {
                    setDentitionCameraByType(saved.dentitionCameraByType);
                }
                if (Array.isArray(saved.oralEntries)) {
                    setOralEntries(saved.oralEntries);
                }
                if (typeof saved.oralNotes === 'string') {
                    setOralNotes(saved.oralNotes);
                }
            } catch  {
            // ignore corrupted localStorage payload
            }
        }
    }["DentalCanvas.useEffect"], [
        patientId,
        patientType
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const hidden = window.localStorage.getItem(`dental.canvas.hintDismissed.${patientId}`);
            if (hidden === '1') setHideExamineHint(true);
        }
    }["DentalCanvas.useEffect"], [
        patientId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const payload = {
                patientType,
                viewMode,
                selectedToothFdi: selectedTooth.fdi,
                selectionScope,
                dentitionVerticalNudgeByType,
                dentitionCameraByType,
                oralEntries,
                oralNotes
            };
            window.localStorage.setItem(`dental.canvas.state.${patientId}`, JSON.stringify(payload));
        }
    }["DentalCanvas.useEffect"], [
        patientId,
        patientType,
        viewMode,
        selectedTooth.fdi,
        selectionScope,
        dentitionVerticalNudgeByType,
        dentitionCameraByType,
        oralEntries,
        oralNotes
    ]);
    // Persist examination clinical data so Treatment Plan "quick picks" stay in sync with the chart.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const entries = allEntries.filter({
                "DentalCanvas.useEffect.entries": (e)=>e.kind === 'procedure' || e.kind === 'planned'
            }["DentalCanvas.useEffect.entries"]).map({
                "DentalCanvas.useEffect.entries": (e)=>({
                        toothFdi: e.toothFdi,
                        kind: e.kind,
                        name: e.name,
                        surfaces: [
                            ...e.surfaces ?? []
                        ]
                    })
            }["DentalCanvas.useEffect.entries"]);
            const findingsSerialized = Object.fromEntries(Object.entries(findingsByTooth).map({
                "DentalCanvas.useEffect.findingsSerialized": ([fdi, list])=>[
                        fdi,
                        list.map({
                            "DentalCanvas.useEffect.findingsSerialized": (f)=>({
                                    zoneId: f.zoneId,
                                    type: f.type
                                })
                        }["DentalCanvas.useEffect.findingsSerialized"])
                    ]
            }["DentalCanvas.useEffect.findingsSerialized"]));
            const diagSerialized = Object.fromEntries(Object.entries(toothDiagnoses).map({
                "DentalCanvas.useEffect.diagSerialized": ([fdi, set])=>[
                        fdi,
                        [
                            ...set
                        ]
                    ]
            }["DentalCanvas.useEffect.diagSerialized"]));
            // Guard: never clobber a saved chart that has data with empty live state.
            // On a fresh mount (before any edit) the in-memory state can be empty;
            // writing it would wipe a previously-recorded chart and make the exam
            // look like it "reset" when the doctor returns to it.
            const liveIsEmpty = entries.length === 0 && Object.values(diagSerialized).every({
                "DentalCanvas.useEffect": (a)=>a.length === 0
            }["DentalCanvas.useEffect"]) && Object.values(findingsSerialized).every({
                "DentalCanvas.useEffect": (a)=>a.length === 0
            }["DentalCanvas.useEffect"]) && oralEntries.length === 0 && !oralNotes.trim();
            if (liveIsEmpty) {
                try {
                    const raw = window.localStorage.getItem(`${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$exam$2d$suggestions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXAM_CHART_STORAGE_PREFIX"]}${patientId}`);
                    if (raw) {
                        const saved = JSON.parse(raw);
                        const savedHasData = (saved.entries?.length ?? 0) > 0 || Object.values(saved.toothDiagnoses ?? {}).some({
                            "DentalCanvas.useEffect": (a)=>(a || []).length > 0
                        }["DentalCanvas.useEffect"]) || Object.values(saved.findingsByTooth ?? {}).some({
                            "DentalCanvas.useEffect": (a)=>(a || []).length > 0
                        }["DentalCanvas.useEffect"]);
                        if (savedHasData) return;
                    }
                } catch  {}
            }
            try {
                window.localStorage.setItem(`${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$exam$2d$suggestions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXAM_CHART_STORAGE_PREFIX"]}${patientId}`, JSON.stringify({
                    updatedAt: Date.now(),
                    entries,
                    toothDiagnoses: diagSerialized,
                    findingsByTooth: findingsSerialized,
                    oralEntries,
                    oralNotes
                }));
                window.dispatchEvent(new CustomEvent('dental-exam-chart-updated', {
                    detail: {
                        patientId
                    }
                }));
            } catch  {
            // ignore quota / private mode
            }
        }
    }["DentalCanvas.useEffect"], [
        patientId,
        allEntries,
        toothDiagnoses,
        findingsByTooth,
        oralEntries,
        oralNotes
    ]);
    const handleDentitionVerticalNudgeChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleDentitionVerticalNudgeChange]": (value)=>{
            setDentitionVerticalNudgeByType({
                "DentalCanvas.useCallback[handleDentitionVerticalNudgeChange]": (prev)=>{
                    const current = prev[patientType] ?? 0;
                    const nextRaw = typeof value === 'function' ? value(current) : value;
                    const next = Math.max(-2.0, Math.min(2.0, nextRaw));
                    if (Math.abs(next - current) < 0.0001) return prev;
                    return {
                        ...prev,
                        [patientType]: next
                    };
                }
            }["DentalCanvas.useCallback[handleDentitionVerticalNudgeChange]"]);
        }
    }["DentalCanvas.useCallback[handleDentitionVerticalNudgeChange]"], [
        patientType
    ]);
    const handleDentitionControlsEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleDentitionControlsEnd]": ()=>{
            if (viewMode !== 'dentition' || !controlsRef.current) return;
            const ctrl = controlsRef.current;
            const p = ctrl.object?.position;
            const t = ctrl.target;
            if (!p || !t) return;
            const pose = {
                position: [
                    p.x,
                    p.y,
                    p.z
                ],
                target: [
                    t.x,
                    t.y,
                    t.z
                ]
            };
            setDentitionCameraByType({
                "DentalCanvas.useCallback[handleDentitionControlsEnd]": (prev)=>({
                        ...prev,
                        [patientType]: pose
                    })
            }["DentalCanvas.useCallback[handleDentitionControlsEnd]"]);
        }
    }["DentalCanvas.useCallback[handleDentitionControlsEnd]"], [
        patientType,
        viewMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if (hideExamineHint) return;
            const hasExamData = allEntries.length > 0 || Object.values(findingsByTooth).some({
                "DentalCanvas.useEffect": (items)=>items.length > 0
            }["DentalCanvas.useEffect"]);
            if (!hasExamData) return;
            setHideExamineHint(true);
            if ("TURBOPACK compile-time truthy", 1) {
                window.localStorage.setItem(`dental.canvas.hintDismissed.${patientId}`, '1');
            }
        }
    }["DentalCanvas.useEffect"], [
        allEntries.length,
        findingsByTooth,
        hideExamineHint,
        patientId
    ]);
    const currentToothDiagnoses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[currentToothDiagnoses]": ()=>toothDiagnoses[selectedTooth.fdi] || EMPTY_DIAGNOSES
    }["DentalCanvas.useMemo[currentToothDiagnoses]"], [
        toothDiagnoses,
        selectedTooth.fdi
    ]);
    const isImplant = currentToothDiagnoses.has('Implant') || implantTeeth.has(selectedTooth.fdi);
    const currentToothNotes = toothNotes[selectedTooth.fdi] || '';
    const currentTreatmentHistoryDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[currentTreatmentHistoryDetails]": ()=>{
            return treatmentHistoryDetailsByTooth[selectedTooth.fdi] || EMPTY_TREATMENTS;
        }
    }["DentalCanvas.useMemo[currentTreatmentHistoryDetails]"], [
        treatmentHistoryDetailsByTooth,
        selectedTooth.fdi
    ]);
    // The teeth a newly added diagnosis/finding/procedure should apply to: an
    // explicit arch / quadrant / full-mouth scope fans out to EVERY tooth in
    // that scope (sharing one groupId); otherwise just the focused tooth. This
    // is what makes "select Maxillary, then add Missing" mark all maxillary
    // teeth instead of a single tooth.
    const targetFdis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[targetFdis]": ()=>{
            if (selectionScope.type !== 'tooth' && selectionScope.fdis.length > 0) return selectionScope.fdis;
            return [
                selectedTooth.fdi
            ];
        }
    }["DentalCanvas.useMemo[targetFdis]"], [
        selectionScope,
        selectedTooth.fdi
    ]);
    const newGroupId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[newGroupId]": (fdis)=>fdis.length > 1 ? `grp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` : undefined
    }["DentalCanvas.useCallback[newGroupId]"], []);
    // Always-fresh mirror of toothDiagnoses so a multi-apply can lock a single
    // add/remove direction from the focused tooth.
    const toothDiagnosesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(toothDiagnoses);
    toothDiagnosesRef.current = toothDiagnoses;
    // Scope-wide diagnoses (a diagnosis covering exactly a whole zone) shown as a
    // single banner at the top of the dentition — e.g. "RCT · Full mouth" —
    // instead of repeating the tag on every tooth.
    // Detect diagnoses that blanket an entire scope and collapse them into one
    // tag per { diagnosis, scope }. Matches DentitionView's per-tooth suppression
    // so a scope-wide diagnosis shows ONCE (positioned by scope) rather than on
    // every tooth.
    const dentitionGroupLabels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[dentitionGroupLabels]": ()=>{
            const diagToFdis = {};
            Object.entries(toothDiagnoses || {}).forEach({
                "DentalCanvas.useMemo[dentitionGroupLabels]": ([fdi, set])=>{
                    (set instanceof Set ? [
                        ...set
                    ] : set || []).forEach({
                        "DentalCanvas.useMemo[dentitionGroupLabels]": (d)=>{
                            (diagToFdis[d] = diagToFdis[d] || []).push(fdi);
                        }
                    }["DentalCanvas.useMemo[dentitionGroupLabels]"]);
                }
            }["DentalCanvas.useMemo[dentitionGroupLabels]"]);
            (implantTeeth instanceof Set ? [
                ...implantTeeth
            ] : implantTeeth || []).forEach({
                "DentalCanvas.useMemo[dentitionGroupLabels]": (f)=>{
                    (diagToFdis['Implant'] = diagToFdis['Implant'] || []).push(f);
                }
            }["DentalCanvas.useMemo[dentitionGroupLabels]"]);
            const byQ = {
                'upper-right': [],
                'upper-left': [],
                'lower-left': [],
                'lower-right': []
            };
            activeTeeth.forEach({
                "DentalCanvas.useMemo[dentitionGroupLabels]": (t)=>{
                    if (byQ[t.quadrant]) byQ[t.quadrant].push(t.fdi);
                }
            }["DentalCanvas.useMemo[dentitionGroupLabels]"]);
            const defs = [
                [
                    'Full mouth',
                    [
                        ...byQ['upper-right'],
                        ...byQ['upper-left'],
                        ...byQ['lower-left'],
                        ...byQ['lower-right']
                    ]
                ],
                [
                    'Maxillary',
                    [
                        ...byQ['upper-right'],
                        ...byQ['upper-left']
                    ]
                ],
                [
                    'Mandibular',
                    [
                        ...byQ['lower-left'],
                        ...byQ['lower-right']
                    ]
                ],
                [
                    'Right arch',
                    [
                        ...byQ['upper-right'],
                        ...byQ['lower-right']
                    ]
                ],
                [
                    'Left arch',
                    [
                        ...byQ['upper-left'],
                        ...byQ['lower-left']
                    ]
                ],
                [
                    'Upper Right',
                    byQ['upper-right']
                ],
                [
                    'Upper Left',
                    byQ['upper-left']
                ],
                [
                    'Lower Left',
                    byQ['lower-left']
                ],
                [
                    'Lower Right',
                    byQ['lower-right']
                ]
            ];
            const out = [];
            Object.entries(diagToFdis).forEach({
                "DentalCanvas.useMemo[dentitionGroupLabels]": ([diag, fdis])=>{
                    const uniq = [
                        ...new Set(fdis)
                    ];
                    if (uniq.length < 2) return;
                    const set = new Set(uniq);
                    const hit = defs.find({
                        "DentalCanvas.useMemo[dentitionGroupLabels].hit": ([, arr])=>arr.length > 1 && arr.length === set.size && arr.every({
                                "DentalCanvas.useMemo[dentitionGroupLabels].hit": (f)=>set.has(f)
                            }["DentalCanvas.useMemo[dentitionGroupLabels].hit"])
                    }["DentalCanvas.useMemo[dentitionGroupLabels].hit"]);
                    if (hit) out.push({
                        diag,
                        scope: hit[0]
                    });
                }
            }["DentalCanvas.useMemo[dentitionGroupLabels]"]);
            return out;
        }
    }["DentalCanvas.useMemo[dentitionGroupLabels]"], [
        toothDiagnoses,
        implantTeeth,
        activeTeeth
    ]);
    // Implant toggle routes through the compatibility matrix (see toggleToothDiagnosis below).
    // The matrix sync-fires `setImplantTeeth` to keep the top-level set in step so the
    // ImplantScrew shader sees the same truth as the UI chips.
    const toggleImplant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[toggleImplant]": ()=>{
            // Forward-ref: toggleToothDiagnosis is declared below but captured at call time.
            // Using a deferred wrapper avoids use-before-declaration lint errors.
            toggleToothDiagnosisRef.current?.('Implant');
            setSelectedZone({
                "DentalCanvas.useCallback[toggleImplant]": (prev)=>prev === 'cervical' || prev === 'root' ? null : prev
            }["DentalCanvas.useCallback[toggleImplant]"]);
        }
    }["DentalCanvas.useCallback[toggleImplant]"], []);
    const toggleToothDiagnosisRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const toggleToothDiagnosis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[toggleToothDiagnosis]": (diagnosis)=>{
            const fdis = targetFdis;
            const multi = fdis.length > 1;
            // Lock the add/remove direction once from the focused tooth so a group
            // stays consistent (teeth that already have it won't toggle the other way).
            const refCurrent = new Set(toothDiagnosesRef.current[selectedTooth.fdi] || []);
            const refNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DiagnosisMatrix$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyDiagnosisSelection"])(refCurrent, diagnosis);
            const adding = refNext.has(diagnosis) && !refCurrent.has(diagnosis);
            const implantAdd = [];
            const implantRemove = [];
            setToothDiagnoses({
                "DentalCanvas.useCallback[toggleToothDiagnosis]": (prev)=>{
                    const next = {
                        ...prev
                    };
                    for (const fdi of fdis){
                        const current = new Set(prev[fdi] || []);
                        const has = current.has(diagnosis);
                        let res = current;
                        if (!multi) res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DiagnosisMatrix$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyDiagnosisSelection"])(current, diagnosis);
                        else if (adding && !has) res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DiagnosisMatrix$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyDiagnosisSelection"])(current, diagnosis);
                        else if (!adding && has) res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DiagnosisMatrix$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyDiagnosisSelection"])(current, diagnosis);
                        if (current.has('Implant') && !res.has('Implant')) implantRemove.push(fdi);
                        if (!current.has('Implant') && res.has('Implant')) implantAdd.push(fdi);
                        next[fdi] = res;
                    }
                    return next;
                }
            }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
            if (implantAdd.length || implantRemove.length) {
                setImplantTeeth({
                    "DentalCanvas.useCallback[toggleToothDiagnosis]": (ip)=>{
                        const n = new Set(ip);
                        implantAdd.forEach({
                            "DentalCanvas.useCallback[toggleToothDiagnosis]": (f)=>n.add(f)
                        }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
                        implantRemove.forEach({
                            "DentalCanvas.useCallback[toggleToothDiagnosis]": (f)=>n.delete(f)
                        }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
                        return n;
                    }
                }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
            }
            // Tooth-level diagnosis changed → clear all surface findings for these teeth
            setFindingsByTooth({
                "DentalCanvas.useCallback[toggleToothDiagnosis]": (prev)=>{
                    const next = {
                        ...prev
                    };
                    fdis.forEach({
                        "DentalCanvas.useCallback[toggleToothDiagnosis]": (f)=>{
                            delete next[f];
                        }
                    }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
                    return next;
                }
            }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
            if (diagnosis === 'Missing' || diagnosis === 'Extraction') {
                setImplantTeeth({
                    "DentalCanvas.useCallback[toggleToothDiagnosis]": (prev)=>{
                        const next = new Set(prev);
                        fdis.forEach({
                            "DentalCanvas.useCallback[toggleToothDiagnosis]": (f)=>next.delete(f)
                        }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
                        return next;
                    }
                }["DentalCanvas.useCallback[toggleToothDiagnosis]"]);
                setSelectedZone(null);
            }
        }
    }["DentalCanvas.useCallback[toggleToothDiagnosis]"], [
        targetFdis,
        selectedTooth.fdi
    ]);
    // Keep the deferred ref in sync so toggleImplant can route through the matrix.
    toggleToothDiagnosisRef.current = toggleToothDiagnosis;
    const updateToothNotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[updateToothNotes]": (notes)=>{
            const fdis = targetFdis;
            setToothNotes({
                "DentalCanvas.useCallback[updateToothNotes]": (prev)=>{
                    const next = {
                        ...prev
                    };
                    fdis.forEach({
                        "DentalCanvas.useCallback[updateToothNotes]": (f)=>{
                            next[f] = notes;
                        }
                    }["DentalCanvas.useCallback[updateToothNotes]"]);
                    return next;
                }
            }["DentalCanvas.useCallback[updateToothNotes]"]);
        }
    }["DentalCanvas.useCallback[updateToothNotes]"], [
        targetFdis
    ]);
    const handleSelectTooth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleSelectTooth]": (tooth)=>{
            setSelectedTooth(tooth);
            setSelectionScope({
                type: 'tooth',
                id: tooth.fdi,
                label: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][tooth.quadrant]} ${tooth.name}`,
                fdis: [
                    tooth.fdi
                ]
            });
            setSelectedZone(null);
            setViewMode('single-tooth');
        }
    }["DentalCanvas.useCallback[handleSelectTooth]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const handler = {
                "DentalCanvas.useEffect.handler": (e)=>{
                    const detail = e.detail;
                    if (!detail || detail.patientId !== patientId) return;
                    const { teeth, focusFdi, openFullDentition, patientTypeHint, highlightFdis } = detail;
                    if (!Array.isArray(teeth) || teeth.length === 0) return;
                    const effectivePatientType = patientTypeHint === 'adult' || patientTypeHint === 'pediatric' || patientTypeHint === 'mixed' ? patientTypeHint : patientType;
                    if (patientTypeHint === 'adult' || patientTypeHint === 'pediatric' || patientTypeHint === 'mixed') {
                        setPatientType(patientTypeHint);
                    }
                    setToothDiagnoses({
                        "DentalCanvas.useEffect.handler": (prev)=>{
                            const next = {
                                ...prev
                            };
                            for (const t of teeth){
                                const fdi = String(t.fdi);
                                const cur = new Set(next[fdi] || []);
                                if (t.implant) cur.add('Implant');
                                for (const d of t.diagnoses || []){
                                    if (VALID_TOOTH_DIAG.has(d)) cur.add(d);
                                }
                                next[fdi] = cur;
                            }
                            return next;
                        }
                    }["DentalCanvas.useEffect.handler"]);
                    setImplantTeeth({
                        "DentalCanvas.useEffect.handler": (prev)=>{
                            const n = new Set(prev);
                            for (const t of teeth){
                                if (t.implant) n.add(String(t.fdi));
                            }
                            return n;
                        }
                    }["DentalCanvas.useEffect.handler"]);
                    setFindingsByTooth({
                        "DentalCanvas.useEffect.handler": (prev)=>{
                            const next = {
                                ...prev
                            };
                            for (const t of teeth){
                                const fdi = String(t.fdi);
                                const list = [
                                    ...next[fdi] || []
                                ];
                                for (const f of t.findings || []){
                                    const z = f.zoneId;
                                    const zoneId = z === 'whole' || __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_ZONES"].includes(z) ? z : 'occlusal';
                                    const type = VALID_SURFACE_FINDING.has(f.type) ? f.type : 'Staining';
                                    const notes = (f.notes || '').trim();
                                    list.push({
                                        id: `finding-${++findingIdCounter}`,
                                        zoneId,
                                        type,
                                        notes: notes || 'From AI scan'
                                    });
                                }
                                next[fdi] = list;
                            }
                            return next;
                        }
                    }["DentalCanvas.useEffect.handler"]);
                    setTreatmentHistoryDetailsByTooth({
                        "DentalCanvas.useEffect.handler": (prev)=>{
                            let next = prev;
                            let changed = false;
                            for (const t of teeth){
                                const fdi = String(t.fdi);
                                const rows = t.treatmentHistoryRows && t.treatmentHistoryRows.length > 0 ? t.treatmentHistoryRows : (t.treatmentHistory || []).map({
                                    "DentalCanvas.useEffect.handler": (line)=>({
                                            name: line
                                        })
                                }["DentalCanvas.useEffect.handler"]);
                                if (!rows.length) continue;
                                if (!changed) {
                                    next = {
                                        ...prev
                                    };
                                    changed = true;
                                }
                                const cur = next[fdi] || {};
                                const acc = {
                                    ...cur
                                };
                                for (const row of rows){
                                    const baseName = row.name && String(row.name).trim() || 'Treatment';
                                    const key = allocateTreatmentHistoryDetailKey(acc, baseName);
                                    const zones = zonesFromAgentHistorySurface(row.surface, baseName);
                                    const prevD = acc[key];
                                    const noteMerge = [
                                        prevD?.note,
                                        row.notes
                                    ].filter(Boolean).join(', ').trim();
                                    acc[key] = {
                                        ...prevD,
                                        surfaces: zones.length ? zones : [
                                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultTreatmentSurfaces"])(baseName)
                                        ],
                                        since: row.since && String(row.since).trim() || prevD?.since || '',
                                        note: noteMerge || prevD?.note || ''
                                    };
                                }
                                next[fdi] = acc;
                            }
                            return changed ? next : prev;
                        }
                    }["DentalCanvas.useEffect.handler"]);
                    setAllEntries({
                        "DentalCanvas.useEffect.handler": (prev)=>{
                            const add = [];
                            for (const t of teeth){
                                const fdi = String(t.fdi);
                                for (const p of t.procedures || []){
                                    const name = p.name && String(p.name).trim() || '';
                                    if (!name) continue;
                                    const noteBits = [
                                        p.surface && p.surface !== '—' ? p.surface : null,
                                        p.date,
                                        p.status,
                                        p.notes
                                    ].filter(Boolean);
                                    add.push({
                                        id: `agent-proc-${fdi}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                                        toothFdi: fdi,
                                        kind: 'procedure',
                                        name,
                                        surfaces: [
                                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultTreatmentSurfaces"])(name)
                                        ],
                                        notes: noteBits.length ? noteBits.join(' · ') : undefined
                                    });
                                }
                            }
                            return add.length ? [
                                ...prev,
                                ...add
                            ] : prev;
                        }
                    }["DentalCanvas.useEffect.handler"]);
                    setToothNotes({
                        "DentalCanvas.useEffect.handler": (prev)=>{
                            let next = prev;
                            let changed = false;
                            for (const t of teeth){
                                const note = t.scannerNotes?.trim();
                                if (!note) continue;
                                const fdi = String(t.fdi);
                                const existing = (next[fdi] || '').trim();
                                const merged = existing ? `${existing}\n${note}` : note;
                                if (!changed) {
                                    next = {
                                        ...prev
                                    };
                                    changed = true;
                                }
                                next[fdi] = merged;
                            }
                            return changed ? next : prev;
                        }
                    }["DentalCanvas.useEffect.handler"]);
                    const goFullDentition = openFullDentition !== false;
                    if (goFullDentition) {
                        const source = getTeethForPatientType(effectivePatientType);
                        const allFdis = source.map({
                            "DentalCanvas.useEffect.handler.allFdis": (t)=>t.fdi
                        }["DentalCanvas.useEffect.handler.allFdis"]);
                        if (allFdis.length > 0) {
                            const representative = source.find({
                                "DentalCanvas.useEffect.handler": (t)=>t.fdi === allFdis[0]
                            }["DentalCanvas.useEffect.handler"]) ?? source[0];
                            setSelectedTooth(representative);
                            setSelectionScope({
                                type: 'full-mouth',
                                id: 'FULL',
                                label: 'Full mouth',
                                fdis: allFdis
                            });
                            setSelectedZone(null);
                            setViewMode('dentition');
                        }
                        const pulseList = highlightFdis && highlightFdis.length > 0 ? highlightFdis : teeth.map({
                            "DentalCanvas.useEffect.handler": (t)=>String(t.fdi)
                        }["DentalCanvas.useEffect.handler"]);
                        const pulseSet = new Set(pulseList.map({
                            "DentalCanvas.useEffect.handler": (fdi)=>String(fdi)
                        }["DentalCanvas.useEffect.handler"]));
                        setAgentApplyPulseFdis(pulseSet);
                        if (agentPulseClearTimerRef.current) window.clearTimeout(agentPulseClearTimerRef.current);
                        agentPulseClearTimerRef.current = window.setTimeout({
                            "DentalCanvas.useEffect.handler": ()=>{
                                setAgentApplyPulseFdis(new Set());
                                agentPulseClearTimerRef.current = null;
                            }
                        }["DentalCanvas.useEffect.handler"], 1300);
                    } else if (focusFdi) {
                        const source = getTeethForPatientType(effectivePatientType);
                        const tooth = source.find({
                            "DentalCanvas.useEffect.handler.tooth": (x)=>x.fdi === String(focusFdi)
                        }["DentalCanvas.useEffect.handler.tooth"]);
                        if (tooth) handleSelectTooth(tooth);
                        const pulseList = highlightFdis && highlightFdis.length > 0 ? highlightFdis : [
                            String(focusFdi)
                        ];
                        const pulseSet = new Set(pulseList.map({
                            "DentalCanvas.useEffect.handler": (fdi)=>String(fdi)
                        }["DentalCanvas.useEffect.handler"]));
                        setAgentApplyPulseFdis(pulseSet);
                        if (agentPulseClearTimerRef.current) window.clearTimeout(agentPulseClearTimerRef.current);
                        agentPulseClearTimerRef.current = window.setTimeout({
                            "DentalCanvas.useEffect.handler": ()=>{
                                setAgentApplyPulseFdis(new Set());
                                agentPulseClearTimerRef.current = null;
                            }
                        }["DentalCanvas.useEffect.handler"], 1300);
                    }
                }
            }["DentalCanvas.useEffect.handler"];
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dental$2d$ai$2f$dental$2d$ai$2d$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DENTAL_AI_SCAN_APPLY_EVENT"], handler);
            return ({
                "DentalCanvas.useEffect": ()=>{
                    window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$dental$2d$ai$2f$dental$2d$ai$2d$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DENTAL_AI_SCAN_APPLY_EVENT"], handler);
                    if (agentPulseClearTimerRef.current) window.clearTimeout(agentPulseClearTimerRef.current);
                }
            })["DentalCanvas.useEffect"];
        }
    }["DentalCanvas.useEffect"], [
        patientId,
        patientType,
        handleSelectTooth
    ]);
    const handleBackToDentition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleBackToDentition]": ()=>{
            setViewMode('dentition');
            setSelectionScope({
                type: 'tooth',
                id: selectedTooth.fdi,
                label: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][selectedTooth.quadrant]} ${selectedTooth.name}`,
                fdis: [
                    selectedTooth.fdi
                ]
            });
            setSelectedZone(null);
            setHoveredZone(null);
        }
    }["DentalCanvas.useCallback[handleBackToDentition]"], [
        selectedTooth
    ]);
    const getScopeFdis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[getScopeFdis]": (scope)=>{
            const source = getTeethForPatientType(patientType);
            if (scope === 'FULL') return source.map({
                "DentalCanvas.useCallback[getScopeFdis]": (t)=>t.fdi
            }["DentalCanvas.useCallback[getScopeFdis]"]);
            const quadrantMap = {
                UR: 'upper-right',
                UL: 'upper-left',
                LR: 'lower-right',
                LL: 'lower-left'
            };
            if (quadrantMap[scope]) return source.filter({
                "DentalCanvas.useCallback[getScopeFdis]": (t)=>t.quadrant === quadrantMap[scope]
            }["DentalCanvas.useCallback[getScopeFdis]"]).map({
                "DentalCanvas.useCallback[getScopeFdis]": (t)=>t.fdi
            }["DentalCanvas.useCallback[getScopeFdis]"]);
            const archQuadrants = {
                RIGHT_ARCH: [
                    'upper-right',
                    'lower-right'
                ],
                LEFT_ARCH: [
                    'upper-left',
                    'lower-left'
                ],
                UPPER_ARCH: [
                    'upper-right',
                    'upper-left'
                ],
                LOWER_ARCH: [
                    'lower-right',
                    'lower-left'
                ]
            };
            const qs = archQuadrants[scope];
            if (qs) return source.filter({
                "DentalCanvas.useCallback[getScopeFdis]": (t)=>qs.includes(t.quadrant)
            }["DentalCanvas.useCallback[getScopeFdis]"]).map({
                "DentalCanvas.useCallback[getScopeFdis]": (t)=>t.fdi
            }["DentalCanvas.useCallback[getScopeFdis]"]);
            return [];
        }
    }["DentalCanvas.useCallback[getScopeFdis]"], [
        patientType
    ]);
    const handleSelectScope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleSelectScope]": (scope)=>{
            const fdis = getScopeFdis(scope);
            if (fdis.length === 0) return;
            const representative = activeTeeth.find({
                "DentalCanvas.useCallback[handleSelectScope]": (t)=>t.fdi === fdis[0]
            }["DentalCanvas.useCallback[handleSelectScope]"]) ?? activeTeeth[0];
            setSelectedTooth(representative);
            const scopeType = scope === 'FULL' ? 'full-mouth' : ARCH_SCOPE_IDS.has(scope) ? 'arch' : 'quadrant';
            setSelectionScope({
                type: scopeType,
                id: scope,
                label: scope === 'FULL' ? 'Full mouth' : SCOPE_SELECTION_LABELS[scope],
                fdis
            });
            setSelectedZone(null);
            setViewMode('single-tooth');
        }
    }["DentalCanvas.useCallback[handleSelectScope]"], [
        activeTeeth,
        getScopeFdis
    ]);
    // Oral Examination — select a REGION (not a tooth). Reuses the grouped
    // selectionScope so the 3D view highlights that region, but stays in 'oral'
    // viewMode so the side panel shows the Oral Examination (findings/procedures)
    // instead of the per-tooth panel.
    // Oral Examination uses the FULL dentition (no zoom). Entering it just sets
    // a full-mouth scope so the 3D shows all teeth, and flips to 'oral' viewMode
    // so the aside swaps to the oral findings/procedures tables.
    const enterOralExam = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[enterOralExam]": ()=>{
            setSelectionScope({
                type: 'full-mouth',
                id: 'FULL',
                label: 'Full mouth',
                fdis: getScopeFdis('FULL')
            });
            setSelectedZone(null);
            setOralHighlightFdis(new Set());
            setViewMode('oral');
        }
    }["DentalCanvas.useCallback[enterOralExam]"], [
        getScopeFdis
    ]);
    // Highlight teeth for the active oral row's region position(s). Anatomical
    // surfaces don't map to teeth, so they're ignored here (recorded as labels).
    const setOralHighlight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[setOralHighlight]": (positionIds)=>{
            const ids = Array.isArray(positionIds) ? positionIds : [];
            const regionIds = ids.filter({
                "DentalCanvas.useCallback[setOralHighlight].regionIds": (p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOralRegionPosition"])(p)
            }["DentalCanvas.useCallback[setOralHighlight].regionIds"]);
            if (regionIds.length === 0) {
                setOralHighlightFdis(new Set());
                return;
            }
            const fdis = new Set();
            regionIds.forEach({
                "DentalCanvas.useCallback[setOralHighlight]": (r)=>{
                    (r === 'WHOLE' || r === 'GENERALIZED' ? getScopeFdis('FULL') : getScopeFdis(r)).forEach({
                        "DentalCanvas.useCallback[setOralHighlight]": (f)=>fdis.add(f)
                    }["DentalCanvas.useCallback[setOralHighlight]"]);
                }
            }["DentalCanvas.useCallback[setOralHighlight]"]);
            setOralHighlightFdis(fdis);
        }
    }["DentalCanvas.useCallback[setOralHighlight]"], [
        getScopeFdis
    ]);
    // Tooth chart scope bar: same scope state as the dentition toolbar so the
    // 3D preview (grouped DentitionView) updates. Preserve the current tooth when
    // it already lies in the chosen scope; otherwise jump to the first tooth.
    const handleToothScopeJump = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleToothScopeJump]": (scope)=>{
            const fdis = getScopeFdis(scope);
            if (fdis.length === 0) return;
            setSelectedTooth({
                "DentalCanvas.useCallback[handleToothScopeJump]": (prev)=>{
                    if (prev && fdis.includes(prev.fdi)) return prev;
                    return activeTeeth.find({
                        "DentalCanvas.useCallback[handleToothScopeJump]": (t)=>t.fdi === fdis[0]
                    }["DentalCanvas.useCallback[handleToothScopeJump]"]) ?? prev;
                }
            }["DentalCanvas.useCallback[handleToothScopeJump]"]);
            setSelectionScope({
                type: scope === 'FULL' ? 'full-mouth' : ARCH_SCOPE_IDS.has(scope) ? 'arch' : 'quadrant',
                id: scope,
                label: scope === 'FULL' ? 'Full mouth' : SCOPE_SELECTION_LABELS[scope],
                fdis
            });
            setSelectedZone(null);
            setViewMode('single-tooth');
        }
    }["DentalCanvas.useCallback[handleToothScopeJump]"], [
        activeTeeth,
        getScopeFdis
    ]);
    const handlePatientTypeChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handlePatientTypeChange]": (nextType)=>{
            setPatientType(nextType);
            const nextTeeth = getTeethForPatientType(nextType);
            setSelectedTooth({
                "DentalCanvas.useCallback[handlePatientTypeChange]": (prev)=>{
                    const nextSelected = nextTeeth.find({
                        "DentalCanvas.useCallback[handlePatientTypeChange]": (t)=>t.fdi === prev.fdi
                    }["DentalCanvas.useCallback[handlePatientTypeChange]"]) ?? nextTeeth.find({
                        "DentalCanvas.useCallback[handlePatientTypeChange]": (t)=>t.fdi === getDefaultFdiForPatientType(nextType)
                    }["DentalCanvas.useCallback[handlePatientTypeChange]"]) ?? nextTeeth[0];
                    setSelectionScope({
                        type: 'tooth',
                        id: nextSelected.fdi,
                        label: `${__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][nextSelected.quadrant]} ${nextSelected.name}`,
                        fdis: [
                            nextSelected.fdi
                        ]
                    });
                    return nextSelected;
                }
            }["DentalCanvas.useCallback[handlePatientTypeChange]"]);
        }
    }["DentalCanvas.useCallback[handlePatientTypeChange]"], []);
    const handleSelectZone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleSelectZone]": (zone, hitPoint, opts)=>{
            if (currentToothDiagnoses.has('Missing') || currentToothDiagnoses.has('Extraction')) return;
            if (hitPoint) {
                const key = `${selectedTooth.fdi}-${zone}`;
                setZoneHitPoints({
                    "DentalCanvas.useCallback[handleSelectZone]": (prev)=>({
                            ...prev,
                            [key]: hitPoint
                        })
                }["DentalCanvas.useCallback[handleSelectZone]"]);
            }
            if (opts?.multi) {
                // Always rotate camera to the clicked surface — even during multi-select
                setSelectedZone(zone);
                setMultiSelectZones({
                    "DentalCanvas.useCallback[handleSelectZone]": (prev)=>{
                        const next = new Set(prev);
                        if (zone !== 'whole' && next.has('whole')) next.delete('whole');
                        if (next.has(zone)) next.delete(zone);
                        else next.add(zone);
                        return next;
                    }
                }["DentalCanvas.useCallback[handleSelectZone]"]);
                return;
            }
            setSelectedZone({
                "DentalCanvas.useCallback[handleSelectZone]": (prev)=>prev === zone ? null : zone
            }["DentalCanvas.useCallback[handleSelectZone]"]);
        }
    }["DentalCanvas.useCallback[handleSelectZone]"], [
        currentToothDiagnoses,
        selectedTooth.fdi
    ]);
    const handleToggleZoneMultiSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleToggleZoneMultiSelect]": (zone)=>{
            // Always rotate the 3D camera to the picked surface — the 3D canvas
            // reacts to actions happening in the side panel (bi-directional link).
            setSelectedZone({
                "DentalCanvas.useCallback[handleToggleZoneMultiSelect]": (prev)=>multiSelectActive ? zone : prev === zone ? null : zone
            }["DentalCanvas.useCallback[handleToggleZoneMultiSelect]"]);
            // Multi-select mode is gated by multiSelectActive (enabled only when a
            // surface cell in the Findings/Procedures table is active).
            if (!multiSelectActive) return;
            setMultiSelectZones({
                "DentalCanvas.useCallback[handleToggleZoneMultiSelect]": (prev)=>{
                    if (zone === 'whole') {
                        return prev.has('whole') ? new Set() : new Set([
                            'whole'
                        ]);
                    }
                    const next = new Set(prev);
                    if (next.has('whole')) next.delete('whole');
                    if (next.has(zone)) next.delete(zone);
                    else next.add(zone);
                    return next;
                }
            }["DentalCanvas.useCallback[handleToggleZoneMultiSelect]"]);
        }
    }["DentalCanvas.useCallback[handleToggleZoneMultiSelect]"], [
        multiSelectActive
    ]);
    const handleToggleZoneFromQuickSelector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]": (zone)=>{
            // Keep selector visible always, but only allow true multi-select
            // while a surfaces cell is actively editing.
            if (!multiSelectActive) {
                setMultiSelectZones({
                    "DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]": (prev)=>prev.size === 0 ? prev : new Set()
                }["DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]"]);
                setSelectedZone({
                    "DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]": (prev)=>prev === zone ? null : zone
                }["DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]"]);
                return;
            }
            setSelectedZone(zone);
            setMultiSelectZones({
                "DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]": (prev)=>{
                    if (zone === 'whole') {
                        return prev.has('whole') ? new Set() : new Set([
                            'whole'
                        ]);
                    }
                    const next = new Set(prev);
                    if (next.has('whole')) next.delete('whole');
                    if (next.has(zone)) next.delete(zone);
                    else next.add(zone);
                    return next;
                }
            }["DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]"]);
        }
    }["DentalCanvas.useCallback[handleToggleZoneFromQuickSelector]"], [
        multiSelectActive
    ]);
    const handleClearMultiSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleClearMultiSelect]": ()=>{
            setMultiSelectZones({
                "DentalCanvas.useCallback[handleClearMultiSelect]": (prev)=>prev.size === 0 ? prev : new Set()
            }["DentalCanvas.useCallback[handleClearMultiSelect]"]);
        }
    }["DentalCanvas.useCallback[handleClearMultiSelect]"], []);
    const handleClearSelectedZone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleClearSelectedZone]": ()=>{
            setSelectedZone(null);
        }
    }["DentalCanvas.useCallback[handleClearSelectedZone]"], []);
    const handleSetMultiSelectZones = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleSetMultiSelectZones]": (zones)=>{
            setMultiSelectZones({
                "DentalCanvas.useCallback[handleSetMultiSelectZones]": (prev)=>{
                    if (prev.size === zones.length && zones.every({
                        "DentalCanvas.useCallback[handleSetMultiSelectZones]": (zone)=>prev.has(zone)
                    }["DentalCanvas.useCallback[handleSetMultiSelectZones]"])) return prev;
                    return new Set(zones);
                }
            }["DentalCanvas.useCallback[handleSetMultiSelectZones]"]);
        }
    }["DentalCanvas.useCallback[handleSetMultiSelectZones]"], []);
    const handleSetMultiSelectActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleSetMultiSelectActive]": (active)=>{
            setMultiSelectActive(active);
        }
    }["DentalCanvas.useCallback[handleSetMultiSelectActive]"], []);
    const handleSetHoveredTooth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleSetHoveredTooth]": (fdi)=>{
            setHoveredToothFdi(fdi);
        }
    }["DentalCanvas.useCallback[handleSetHoveredTooth]"], []);
    const handleAddFinding = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleAddFinding]": (zoneId, type)=>{
            const fdis = targetFdis;
            const groupId = newGroupId(fdis);
            setFindingsByTooth({
                "DentalCanvas.useCallback[handleAddFinding]": (prev)=>{
                    const next = {
                        ...prev
                    };
                    for (const fdi of fdis){
                        let list = [
                            ...prev[fdi] || []
                        ];
                        if (type === 'Normal') {
                            list = list.filter({
                                "DentalCanvas.useCallback[handleAddFinding]": (f)=>f.zoneId !== zoneId
                            }["DentalCanvas.useCallback[handleAddFinding]"]);
                        } else {
                            list = list.filter({
                                "DentalCanvas.useCallback[handleAddFinding]": (f)=>!(f.zoneId === zoneId && f.type === 'Normal')
                            }["DentalCanvas.useCallback[handleAddFinding]"]);
                        }
                        const hitPoint = zoneHitPoints[`${fdi}-${zoneId}`];
                        list.push({
                            id: `finding-${++findingIdCounter}`,
                            zoneId,
                            type,
                            notes: '',
                            hitPoint,
                            groupId
                        });
                        next[fdi] = list;
                    }
                    return next;
                }
            }["DentalCanvas.useCallback[handleAddFinding]"]);
        }
    }["DentalCanvas.useCallback[handleAddFinding]"], [
        zoneHitPoints,
        targetFdis,
        newGroupId
    ]);
    const handleRemoveFinding = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleRemoveFinding]": (id)=>{
            const fdi = selectedTooth.fdi;
            setFindingsByTooth({
                "DentalCanvas.useCallback[handleRemoveFinding]": (prev)=>{
                    const removed = (prev[fdi] || []).find({
                        "DentalCanvas.useCallback[handleRemoveFinding].removed": (f)=>f.id === id
                    }["DentalCanvas.useCallback[handleRemoveFinding].removed"]);
                    if (removed?.groupId) {
                        // Grouped finding → remove it from every tooth in the group.
                        const next = {};
                        for (const [k, list] of Object.entries(prev)){
                            next[k] = list.filter({
                                "DentalCanvas.useCallback[handleRemoveFinding]": (f)=>f.groupId !== removed.groupId
                            }["DentalCanvas.useCallback[handleRemoveFinding]"]);
                        }
                        return next;
                    }
                    return {
                        ...prev,
                        [fdi]: (prev[fdi] || []).filter({
                            "DentalCanvas.useCallback[handleRemoveFinding]": (f)=>f.id !== id
                        }["DentalCanvas.useCallback[handleRemoveFinding]"])
                    };
                }
            }["DentalCanvas.useCallback[handleRemoveFinding]"]);
        }
    }["DentalCanvas.useCallback[handleRemoveFinding]"], [
        selectedTooth.fdi
    ]);
    // Current tooth's findings (derived, stable identity when empty)
    const findings = findingsByTooth[selectedTooth.fdi] || EMPTY_FINDINGS;
    const handleUpdateNotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleUpdateNotes]": (zoneId, notes)=>{
            setZoneNotes({
                "DentalCanvas.useCallback[handleUpdateNotes]": (prev)=>({
                        ...prev,
                        [zoneId]: notes
                    })
            }["DentalCanvas.useCallback[handleUpdateNotes]"]);
        }
    }["DentalCanvas.useCallback[handleUpdateNotes]"], []);
    // ── Entity-centric entries (findings + procedures) ──────────────
    let entryIdCounter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0).current;
    const handleAddEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleAddEntry]": (partial)=>{
            const fdis = targetFdis;
            const groupId = newGroupId(fdis);
            setAllEntries({
                "DentalCanvas.useCallback[handleAddEntry]": (prev)=>[
                        ...prev,
                        ...fdis.map({
                            "DentalCanvas.useCallback[handleAddEntry]": (fdi)=>({
                                    ...partial,
                                    id: `entry-${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${fdi}`,
                                    toothFdi: fdi,
                                    groupId
                                })
                        }["DentalCanvas.useCallback[handleAddEntry]"])
                    ]
            }["DentalCanvas.useCallback[handleAddEntry]"]);
        }
    }["DentalCanvas.useCallback[handleAddEntry]"], [
        targetFdis,
        newGroupId
    ]);
    const handleUpdateEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleUpdateEntry]": (id, patch)=>{
            // Edits to a grouped entry propagate to its siblings (except per-tooth
            // identity), so a shared procedure stays in sync across the group.
            setAllEntries({
                "DentalCanvas.useCallback[handleUpdateEntry]": (prev)=>{
                    const target = prev.find({
                        "DentalCanvas.useCallback[handleUpdateEntry].target": (e)=>e.id === id
                    }["DentalCanvas.useCallback[handleUpdateEntry].target"]);
                    if (target?.groupId) {
                        return prev.map({
                            "DentalCanvas.useCallback[handleUpdateEntry]": (e)=>e.groupId === target.groupId ? {
                                    ...e,
                                    ...patch
                                } : e
                        }["DentalCanvas.useCallback[handleUpdateEntry]"]);
                    }
                    return prev.map({
                        "DentalCanvas.useCallback[handleUpdateEntry]": (e)=>e.id === id ? {
                                ...e,
                                ...patch
                            } : e
                    }["DentalCanvas.useCallback[handleUpdateEntry]"]);
                }
            }["DentalCanvas.useCallback[handleUpdateEntry]"]);
        }
    }["DentalCanvas.useCallback[handleUpdateEntry]"], []);
    const handleRemoveEntry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleRemoveEntry]": (id)=>{
            setAllEntries({
                "DentalCanvas.useCallback[handleRemoveEntry]": (prev)=>{
                    const target = prev.find({
                        "DentalCanvas.useCallback[handleRemoveEntry].target": (e)=>e.id === id
                    }["DentalCanvas.useCallback[handleRemoveEntry].target"]);
                    if (target?.groupId) return prev.filter({
                        "DentalCanvas.useCallback[handleRemoveEntry]": (e)=>e.groupId !== target.groupId
                    }["DentalCanvas.useCallback[handleRemoveEntry]"]);
                    return prev.filter({
                        "DentalCanvas.useCallback[handleRemoveEntry]": (e)=>e.id !== id
                    }["DentalCanvas.useCallback[handleRemoveEntry]"]);
                }
            }["DentalCanvas.useCallback[handleRemoveEntry]"]);
        }
    }["DentalCanvas.useCallback[handleRemoveEntry]"], []);
    const handleUpdateTreatmentHistoryDetail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleUpdateTreatmentHistoryDetail]": (name, patch)=>{
            const fdis = targetFdis;
            const groupId = newGroupId(fdis);
            setTreatmentHistoryDetailsByTooth({
                "DentalCanvas.useCallback[handleUpdateTreatmentHistoryDetail]": (prev)=>{
                    const next = {
                        ...prev
                    };
                    for (const fdi of fdis){
                        const currentToothDetails = prev[fdi] || {};
                        const existing = currentToothDetails[name];
                        const previous = existing || {
                            surfaces: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultTreatmentSurfaces"])(name),
                            groupId
                        };
                        next[fdi] = {
                            ...currentToothDetails,
                            [name]: {
                                ...previous,
                                ...patch,
                                groupId: existing?.groupId ?? previous.groupId
                            }
                        };
                    }
                    return next;
                }
            }["DentalCanvas.useCallback[handleUpdateTreatmentHistoryDetail]"]);
        }
    }["DentalCanvas.useCallback[handleUpdateTreatmentHistoryDetail]"], [
        targetFdis,
        newGroupId
    ]);
    const handleRemoveTreatmentHistoryDetail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleRemoveTreatmentHistoryDetail]": (name)=>{
            const fdi = selectedTooth.fdi;
            setTreatmentHistoryDetailsByTooth({
                "DentalCanvas.useCallback[handleRemoveTreatmentHistoryDetail]": (prev)=>{
                    const toothMap = prev[fdi];
                    if (!toothMap || !toothMap[name]) return prev;
                    const groupId = toothMap[name].groupId;
                    const next = {
                        ...prev
                    };
                    for (const [k, map] of Object.entries(prev)){
                        // Drop this named detail from the focused tooth, and from any tooth
                        // sharing the same group when it spanned multiple teeth.
                        if (k !== fdi && !(groupId && map[name]?.groupId === groupId)) continue;
                        const { [name]: _removed, ...rest } = map;
                        next[k] = rest;
                    }
                    return next;
                }
            }["DentalCanvas.useCallback[handleRemoveTreatmentHistoryDetail]"]);
        }
    }["DentalCanvas.useCallback[handleRemoveTreatmentHistoryDetail]"], [
        selectedTooth.fdi
    ]);
    const handleClearTreatmentHistoryDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleClearTreatmentHistoryDetails]": ()=>{
            const fdi = selectedTooth.fdi;
            setTreatmentHistoryDetailsByTooth({
                "DentalCanvas.useCallback[handleClearTreatmentHistoryDetails]": (prev)=>{
                    if (!prev[fdi]) return prev;
                    const next = {
                        ...prev
                    };
                    delete next[fdi];
                    return next;
                }
            }["DentalCanvas.useCallback[handleClearTreatmentHistoryDetails]"]);
        }
    }["DentalCanvas.useCallback[handleClearTreatmentHistoryDetails]"], [
        selectedTooth.fdi
    ]);
    const handleSetHighlightZones = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DentalCanvas.useCallback[handleSetHighlightZones]": (zones)=>{
            setHighlightZones(zones);
        }
    }["DentalCanvas.useCallback[handleSetHighlightZones]"], []);
    const currentToothEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DentalCanvas.useMemo[currentToothEntries]": ()=>allEntries.filter({
                "DentalCanvas.useMemo[currentToothEntries]": (e)=>e.toothFdi === selectedTooth.fdi
            }["DentalCanvas.useMemo[currentToothEntries]"])
    }["DentalCanvas.useMemo[currentToothEntries]"], [
        allEntries,
        selectedTooth.fdi
    ]);
    // Emit state changes to parent (ExaminationTab) for the right-side panel
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DentalCanvas.useEffect": ()=>{
            if (!onStateChange) return;
            onStateChange({
                viewMode,
                patientType,
                selectedTooth,
                selectedZone,
                findings,
                toothDiagnoses,
                implantTeeth,
                findingsByTooth,
                toothNotes,
                treatmentHistoryDetailsByTooth,
                agentApplyPulseFdis,
                currentToothDiagnoses,
                currentToothNotes,
                zoneNotes,
                isImplant,
                currentToothEntries,
                currentTreatmentHistoryDetails,
                allEntries,
                highlightZones,
                multiSelectZones,
                multiSelectActive,
                hoveredToothFdi,
                selectionScopeType: selectionScope.type,
                selectionScopeId: selectionScope.id,
                selectionScopeLabel: selectionScope.label,
                selectionScopeFdis: selectionScope.fdis,
                onToggleToothDiagnosis: toggleToothDiagnosis,
                onToggleImplant: toggleImplant,
                onAddFinding: handleAddFinding,
                onRemoveFinding: handleRemoveFinding,
                onUpdateNotes: handleUpdateNotes,
                onUpdateToothNotes: updateToothNotes,
                onBackToDentition: handleBackToDentition,
                onSelectTooth: handleSelectTooth,
                onSelectScope: handleSelectScope,
                onSelectZone: handleSelectZone,
                onClearSelectedZone: handleClearSelectedZone,
                onAddEntry: handleAddEntry,
                onUpdateEntry: handleUpdateEntry,
                onRemoveEntry: handleRemoveEntry,
                onUpdateTreatmentHistoryDetail: handleUpdateTreatmentHistoryDetail,
                onRemoveTreatmentHistoryDetail: handleRemoveTreatmentHistoryDetail,
                onClearTreatmentHistoryDetails: handleClearTreatmentHistoryDetails,
                onSetHighlightZones: handleSetHighlightZones,
                onToggleZoneMultiSelect: handleToggleZoneMultiSelect,
                onSetMultiSelectZones: handleSetMultiSelectZones,
                onClearMultiSelect: handleClearMultiSelect,
                onSetMultiSelectActive: handleSetMultiSelectActive,
                onSetHoveredTooth: handleSetHoveredTooth,
                oralEntries,
                oralNotes,
                oralHighlightFdis,
                onAddOralEntry: addOralEntry,
                onRemoveOralEntry: removeOralEntry,
                onUpdateOralEntry: updateOralEntry,
                onUpdateOralNotes: updateOralNotes,
                onEnterOralExam: enterOralExam,
                onSetOralHighlight: setOralHighlight
            });
        }
    }["DentalCanvas.useEffect"], [
        viewMode,
        patientType,
        selectedTooth,
        selectedZone,
        findings,
        toothDiagnoses,
        implantTeeth,
        findingsByTooth,
        toothNotes,
        treatmentHistoryDetailsByTooth,
        agentApplyPulseFdis,
        currentToothDiagnoses,
        currentToothNotes,
        currentTreatmentHistoryDetails,
        zoneNotes,
        isImplant,
        onStateChange,
        currentToothEntries,
        allEntries,
        highlightZones,
        multiSelectZones,
        multiSelectActive,
        hoveredToothFdi,
        selectionScope,
        toggleToothDiagnosis,
        toggleImplant,
        handleAddFinding,
        handleRemoveFinding,
        handleUpdateNotes,
        updateToothNotes,
        handleBackToDentition,
        handleSelectTooth,
        handleSelectScope,
        handleSelectZone,
        handleClearSelectedZone,
        handleAddEntry,
        handleUpdateEntry,
        handleRemoveEntry,
        handleUpdateTreatmentHistoryDetail,
        handleRemoveTreatmentHistoryDetail,
        handleClearTreatmentHistoryDetails,
        handleSetHighlightZones,
        handleToggleZoneMultiSelect,
        handleSetMultiSelectZones,
        handleClearMultiSelect,
        handleSetMultiSelectActive,
        handleSetHoveredTooth,
        oralEntries,
        oralNotes,
        oralHighlightFdis,
        addOralEntry,
        removeOralEntry,
        updateOralEntry,
        updateOralNotes,
        enterOralExam,
        setOralHighlight
    ]);
    const isDentitionView = viewMode === 'dentition';
    const isOralView = viewMode === 'oral';
    const dentitionTitle = patientType === 'adult' ? 'Full Adult Dentition View' : patientType === 'pediatric' ? 'Full Pediatric Dentition View' : 'Full Mixed Dentition View';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: `dental-canvas-root ${isDentitionView ? 'dentition-mode' : ''} ${!isDentitionView ? 'has-tooth-selector' : ''} ${compact ? 'compact' : ''}`,
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            className: "viewer",
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: "viewer-header",
                    children: isDentitionView ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        className: "tooth-name tooth-name--dentition",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            className: "tooth-name-text",
                            children: dentitionTitle
                        }, patientType)
                    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: "tooth-name",
                        style: {
                            paddingLeft: 6,
                            gap: 3,
                            cursor: 'pointer'
                        },
                        onClick: handleBackToDentition,
                        title: "Back to full dentition view",
                        role: "button",
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
                                width: "14",
                                height: "14",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                style: {
                                    flexShrink: 0
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                                    d: "M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08",
                                    stroke: "#1e293b",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeMiterlimit: "10",
                                    strokeWidth: "2.2"
                                })
                            }),
                            selectionScope.type === 'tooth' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QUADRANT_LABELS"][selectedTooth.quadrant],
                                    " ",
                                    selectedTooth.name,
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                                        className: "tooth-fdi",
                                        children: [
                                            "T",
                                            selectedTooth.fdi
                                        ]
                                    })
                                ]
                            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    isOralView ? 'Oral Examination' : selectionScope.type === 'full-mouth' ? 'Full Mouth View' : `${selectionScope.label} View`,
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                        className: "tooth-fdi",
                                        children: selectionScope.type === 'full-mouth' ? 'FULL' : SCOPE_HEADER_BADGE[selectionScope.id] ?? selectionScope.id
                                    })
                                ]
                            })
                        ]
                    })
                }),
                isDentitionView && dentitionGroupLabels.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: Object.entries(dentitionGroupLabels.reduce((acc, g)=>{
                        (acc[g.scope] = acc[g.scope] || []).push(g.diag);
                        return acc;
                    }, {})).map(([scope, diags])=>{
                        const pos = SCOPE_TAG_POS[scope];
                        if (!pos) return null;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                            style: {
                                position: 'absolute',
                                left: `${pos.left}%`,
                                top: `${pos.top}%`,
                                transform: 'translate(-50%, -50%)',
                                zIndex: 13,
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: 4,
                                maxWidth: 170,
                                pointerEvents: 'none'
                            },
                            children: diags.map((d)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                    style: {
                                        fontSize: 11.5,
                                        fontWeight: 700,
                                        padding: '4px 11px',
                                        borderRadius: 999,
                                        background: 'rgba(15,23,42,0.9)',
                                        color: '#fff',
                                        fontFamily: 'Inter, sans-serif',
                                        letterSpacing: '-0.2px',
                                        boxShadow: '0 4px 14px rgba(2,6,23,0.28)',
                                        whiteSpace: 'nowrap'
                                    },
                                    children: d
                                }, d))
                        }, scope);
                    })
                }),
                isDentitionView && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeHost,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeTrack,
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                type: "button",
                                onClick: ()=>handlePatientTypeChange('adult'),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeBtn, patientType === 'adult' && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeBtnActive),
                                children: "Adult"
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                type: "button",
                                onClick: ()=>handlePatientTypeChange('pediatric'),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeBtn, patientType === 'pediatric' && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeBtnActive),
                                children: "Pediatric"
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                                type: "button",
                                onClick: ()=>handlePatientTypeChange('mixed'),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeBtn, patientType === 'mixed' && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].patientTypeBtnActive),
                                children: "Mixed"
                            })
                        ]
                    })
                }),
                isDentitionView && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    style: {
                        position: 'absolute',
                        left: 16,
                        bottom: 16,
                        zIndex: 21
                    },
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalChartPrint$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DentalChartPrintButton"], {
                        patientId: patientId
                    })
                }),
                isDentitionView && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentalCanvas$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scopeHost,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("button", {
                        type: "button",
                        onClick: enterOralExam,
                        title: "Record region-level oral findings & procedures",
                        style: {
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            height: 42,
                            padding: "0 18px",
                            borderRadius: 10,
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: "Inter, sans-serif",
                            background: "#fff",
                            color: "var(--tp-blue-500)",
                            border: "1.5px solid var(--tp-blue-500)",
                            cursor: "pointer",
                            transition: "background-color 150ms ease"
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.backgroundColor = "rgba(75,74,213,0.06)";
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.backgroundColor = "#fff";
                        },
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                style: {
                                    fontSize: 16,
                                    lineHeight: 1,
                                    fontWeight: 700,
                                    color: "var(--tp-blue-500)"
                                },
                                children: "＋"
                            }),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                                children: "Oral Examination"
                            })
                        ]
                    })
                }),
                isDentitionView && !hideExamineHint && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    style: {
                        position: 'absolute',
                        bottom: '86px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 9,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                        pointerEvents: 'none',
                        fontFamily: 'Inter, sans-serif'
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$LottieIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LottieIcon"], {
                            name: "arrow-up",
                            size: 24,
                            color: "#d5dde8"
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            style: {
                                fontSize: '14px',
                                color: '#b7c3d4',
                                fontWeight: 500,
                                opacity: 0.72,
                                letterSpacing: '0.2px',
                                whiteSpace: 'nowrap'
                            },
                            children: "Click any tooth to examine"
                        })
                    ]
                }),
                !isDentitionView && !isOralView && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$ToothSelector$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToothSelector"], {
                    selectedTooth: selectedTooth,
                    patientType: patientType,
                    onSelectTooth: handleSelectTooth,
                    toothDiagnoses: toothDiagnoses,
                    viewMode: viewMode,
                    onBackToDentition: handleBackToDentition,
                    onSelectScope: handleToothScopeJump,
                    selectionScope: selectionScope,
                    getScopeFdis: getScopeFdis,
                    findingsByTooth: findingsByTooth,
                    implantTeeth: implantTeeth,
                    allEntries: allEntries,
                    toothNotes: toothNotes,
                    onEnterOralExam: enterOralExam,
                    surfaceSelector: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$QuickSurfaceSelector$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuickSurfaceSelector"], {
                        selectedZones: multiSelectActive ? multiSelectZones : selectedZone ? new Set([
                            selectedZone
                        ]) : new Set(),
                        onToggleZone: handleToggleZoneFromQuickSelector,
                        arch: selectedTooth.arch,
                        toothPosition: selectedTooth.position,
                        zonesWithFindings: new Set(findings.map((f)=>f.zoneId)),
                        disabled: currentToothDiagnoses.has('Missing') || currentToothDiagnoses.has('Extraction')
                    })
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                    camera: {
                        position: [
                            0,
                            2.5,
                            13
                        ],
                        fov: 35
                    },
                    dpr: [
                        1,
                        1.5
                    ],
                    gl: {
                        antialias: true,
                        toneMapping: 3,
                        toneMappingExposure: 1.3,
                        powerPreference: 'high-performance'
                    },
                    performance: {
                        min: 0.5
                    },
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("ambientLight", {
                            intensity: 0.8
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("directionalLight", {
                            position: [
                                3,
                                5,
                                4
                            ],
                            intensity: 1.0
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("directionalLight", {
                            position: [
                                -2,
                                3,
                                -2
                            ],
                            intensity: 0.4
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("directionalLight", {
                            position: [
                                0,
                                -2,
                                1
                            ],
                            intensity: 0.3
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CameraController, {
                            viewMode: viewMode,
                            patientType: patientType,
                            selectionScopeType: selectionScope.type,
                            selectionScopeId: selectionScope.id,
                            dentitionCameraOverride: dentitionCameraOverride,
                            dentitionVerticalNudge: dentitionVerticalNudge,
                            onDentitionVerticalNudgeChange: handleDentitionVerticalNudgeChange,
                            controlsRef: controlsRef
                        }),
                        !isDentitionView && selectionScope.type === 'tooth' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ZoneCameraRotator, {
                            zone: selectedZone,
                            toothFdi: selectedTooth.fdi,
                            quadrant: selectedTooth.quadrant,
                            arch: selectedTooth.arch,
                            controlsRef: controlsRef
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                            fallback: null,
                            children: isDentitionView ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentitionView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                patientType: patientType,
                                layoutMode: "split",
                                toothDiagnoses: toothDiagnoses,
                                findingsByTooth: findingsByTooth,
                                implantTeeth: implantTeeth,
                                onSelectTooth: handleSelectTooth,
                                onHoverTooth: setHoveredToothFdi,
                                externalHoveredFdi: hoveredToothFdi,
                                allEntries: allEntries,
                                toothNotes: toothNotes,
                                agentPulseFdis: agentApplyPulseFdis,
                                oralEntries: oralEntries,
                                oralForceShowAll: showAllOralTooltips || hoverShowAllOral,
                                treatmentHistoryDetailsByTooth: treatmentHistoryDetailsByTooth
                            }, `dentition-${patientType}`) : selectionScope.type !== 'tooth' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentitionView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                patientType: patientType,
                                visibleFdis: selectionScope.fdis,
                                disableSelection: true,
                                highlightFdis: oralHighlightFdis,
                                layoutMode: 'split',
                                toothDiagnoses: toothDiagnoses,
                                findingsByTooth: findingsByTooth,
                                implantTeeth: implantTeeth,
                                onSelectTooth: handleSelectTooth,
                                onHoverTooth: setHoveredToothFdi,
                                externalHoveredFdi: hoveredToothFdi,
                                allEntries: allEntries,
                                toothNotes: toothNotes,
                                agentPulseFdis: agentApplyPulseFdis,
                                oralEntries: oralEntries,
                                oralForceShowAll: showAllOralTooltips || hoverShowAllOral,
                                treatmentHistoryDetailsByTooth: treatmentHistoryDetailsByTooth
                            }, `scope-${patientType}-${selectionScope.type}-${selectionScope.id}`) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("group", {
                                position: [
                                    0,
                                    -0.17,
                                    0
                                ],
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$Tooth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooth"], {
                                    selectedZone: selectedZone,
                                    onSelectZone: handleSelectZone,
                                    onClearSelectedZone: handleClearSelectedZone,
                                    onHoverZone: setHoveredZone,
                                    modelPath: selectedTooth.modelPath,
                                    arch: selectedTooth.arch,
                                    mirrorX: selectedTooth.mirrorX,
                                    quadrant: selectedTooth.quadrant,
                                    toothPosition: selectedTooth.position,
                                    toothFdi: selectedTooth.fdi,
                                    isImplant: isImplant,
                                    findings: findings,
                                    zoneNotes: zoneNotes,
                                    toothDiagnoses: currentToothDiagnoses,
                                    multiSelectZones: multiSelectZones,
                                    multiSelectActive: multiSelectActive,
                                    hideTags: true,
                                    treatmentHistoryDetails: currentTreatmentHistoryDetails,
                                    toothEntries: currentToothEntries.map((e)=>({
                                            kind: e.kind,
                                            name: e.name,
                                            surfaces: e.surfaces
                                        }))
                                }, `${selectedTooth.fdi}-${isImplant ? 'imp' : 'nat'}-${[
                                    ...currentToothDiagnoses
                                ].sort().join(',')}`)
                            })
                        }),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"], {
                            ref: controlsRef,
                            onEnd: handleDentitionControlsEnd,
                            enableDamping: true,
                            dampingFactor: 0.12,
                            rotateSpeed: 0.8,
                            minDistance: isDentitionView ? 6 : selectionScope.type === 'tooth' ? 2.05 : selectionScope.type === 'quadrant' || selectionScope.type === 'arch' && (selectionScope.id === 'RIGHT_ARCH' || selectionScope.id === 'LEFT_ARCH') ? 3.5 : 5,
                            maxDistance: isDentitionView ? patientType === 'mixed' ? 28 : 22 : selectionScope.type === 'tooth' ? 10.5 : selectionScope.type === 'quadrant' || selectionScope.type === 'arch' && (selectionScope.id === 'RIGHT_ARCH' || selectionScope.id === 'LEFT_ARCH') ? 22 : 30,
                            enablePan: isDentitionView,
                            touches: {
                                ONE: 0,
                                TWO: 2
                            }
                        })
                    ]
                })
            ]
        })
    });
}
_s3(DentalCanvas, "Rl1V+rgv2R3vmlZohYfnLijo/n4=");
_c4 = DentalCanvas;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "ZoneCameraRotator");
__turbopack_context__.k.register(_c1, "CameraController");
__turbopack_context__.k.register(_c2, "OralExamTag");
__turbopack_context__.k.register(_c3, "OralExamTags");
__turbopack_context__.k.register(_c4, "DentalCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/MiniScopeCanvas.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MiniScopeCanvas",
    ()=>MiniScopeCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentitionView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/DentitionView.jsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function MiniScopeCanvas({ patientType, scopeType, fdis, toothDiagnoses, findingsByTooth, implantTeeth, size = 40 }) {
    const camZ = scopeType === "full-mouth" ? 23 : scopeType === "arch" ? 21.2 : 20;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        style: {
            width: size,
            height: size,
            pointerEvents: "none",
            position: "relative"
        },
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            camera: {
                position: [
                    0,
                    0.35,
                    camZ
                ],
                fov: 35
            },
            dpr: [
                1,
                1.5
            ],
            gl: {
                antialias: true,
                toneMapping: 3,
                toneMappingExposure: 1.35,
                alpha: true
            },
            style: {
                pointerEvents: "none",
                width: "100%",
                height: "100%",
                display: "block"
            },
            children: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("ambientLight", {
                    intensity: 0.9
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("directionalLight", {
                    position: [
                        2,
                        3,
                        3
                    ],
                    intensity: 0.8
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("directionalLight", {
                    position: [
                        -2,
                        1,
                        -2
                    ],
                    intensity: 0.3
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: null,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("group", {
                        scale: 0.95,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$DentitionView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            patientType: patientType,
                            visibleFdis: fdis,
                            disableSelection: true,
                            layoutMode: scopeType === "full-mouth" ? "natural" : "split",
                            toothDiagnoses: toothDiagnoses,
                            findingsByTooth: findingsByTooth,
                            implantTeeth: implantTeeth,
                            onSelectTooth: ()=>{},
                            showTreatmentTags: false
                        })
                    })
                })
            ]
        })
    });
}
_c = MiniScopeCanvas;
var _c;
__turbopack_context__.k.register(_c, "MiniScopeCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/ExaminationTab.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "aside": "ExaminationTab-module-scss-module__csOxsa__aside",
  "asideInner": "ExaminationTab-module-scss-module__csOxsa__asideInner",
  "asideSplit": "ExaminationTab-module-scss-module__csOxsa__asideSplit",
  "asideStarted": "ExaminationTab-module-scss-module__csOxsa__asideStarted",
  "canvasInner": "ExaminationTab-module-scss-module__csOxsa__canvasInner",
  "canvasShell": "ExaminationTab-module-scss-module__csOxsa__canvasShell",
  "dotOverlay": "ExaminationTab-module-scss-module__csOxsa__dotOverlay",
  "gridOverlay": "ExaminationTab-module-scss-module__csOxsa__gridOverlay",
  "radialOverlay": "ExaminationTab-module-scss-module__csOxsa__radialOverlay",
  "resizeHandle": "ExaminationTab-module-scss-module__csOxsa__resizeHandle",
  "resizeHit": "ExaminationTab-module-scss-module__csOxsa__resizeHit",
  "resizeIcon": "ExaminationTab-module-scss-module__csOxsa__resizeIcon",
  "root": "ExaminationTab-module-scss-module__csOxsa__root",
  "rootGap": "ExaminationTab-module-scss-module__csOxsa__rootGap",
  "scrollSplit": "ExaminationTab-module-scss-module__csOxsa__scrollSplit",
  "scrollStarted": "ExaminationTab-module-scss-module__csOxsa__scrollStarted",
  "singleCard": "ExaminationTab-module-scss-module__csOxsa__singleCard",
  "singleCol": "ExaminationTab-module-scss-module__csOxsa__singleCol",
});
}),
"[project]/components/dental/examination/ExaminationTab.ui.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "accordion": "ExaminationTab-ui-module-scss-module__dpwsoW__accordion",
  "accordionClosed": "ExaminationTab-ui-module-scss-module__dpwsoW__accordionClosed",
  "accordionGrid": "ExaminationTab-ui-module-scss-module__dpwsoW__accordionGrid",
  "accordionGridInner": "ExaminationTab-ui-module-scss-module__dpwsoW__accordionGridInner",
  "accordionHeaderSlot": "ExaminationTab-ui-module-scss-module__dpwsoW__accordionHeaderSlot",
  "accordionOpen": "ExaminationTab-ui-module-scss-module__dpwsoW__accordionOpen",
  "cellFocusRing": "ExaminationTab-ui-module-scss-module__dpwsoW__cellFocusRing",
  "chipBtn": "ExaminationTab-ui-module-scss-module__dpwsoW__chipBtn",
  "chipRow": "ExaminationTab-ui-module-scss-module__dpwsoW__chipRow",
  "clearDialogAction": "ExaminationTab-ui-module-scss-module__dpwsoW__clearDialogAction",
  "clearDialogCancel": "ExaminationTab-ui-module-scss-module__dpwsoW__clearDialogCancel",
  "clearDialogContent": "ExaminationTab-ui-module-scss-module__dpwsoW__clearDialogContent",
  "clearDialogDesc": "ExaminationTab-ui-module-scss-module__dpwsoW__clearDialogDesc",
  "clearDialogFooter": "ExaminationTab-ui-module-scss-module__dpwsoW__clearDialogFooter",
  "clearDialogIcon": "ExaminationTab-ui-module-scss-module__dpwsoW__clearDialogIcon",
  "clearDialogStrong": "ExaminationTab-ui-module-scss-module__dpwsoW__clearDialogStrong",
  "clearDialogTitle": "ExaminationTab-ui-module-scss-module__dpwsoW__clearDialogTitle",
  "clearDialogTitleRow": "ExaminationTab-ui-module-scss-module__dpwsoW__clearDialogTitleRow",
  "customAddBtn": "ExaminationTab-ui-module-scss-module__dpwsoW__customAddBtn",
  "customAddBtnHi": "ExaminationTab-ui-module-scss-module__dpwsoW__customAddBtnHi",
  "customAddMargin": "ExaminationTab-ui-module-scss-module__dpwsoW__customAddMargin",
  "dateCellInner": "ExaminationTab-ui-module-scss-module__dpwsoW__dateCellInner",
  "dateInput": "ExaminationTab-ui-module-scss-module__dpwsoW__dateInput",
  "dateInputEmpty": "ExaminationTab-ui-module-scss-module__dpwsoW__dateInputEmpty",
  "dateInputFilled": "ExaminationTab-ui-module-scss-module__dpwsoW__dateInputFilled",
  "datePlaceholderRow": "ExaminationTab-ui-module-scss-module__dpwsoW__datePlaceholderRow",
  "datePlaceholderText": "ExaminationTab-ui-module-scss-module__dpwsoW__datePlaceholderText",
  "diagQuickChips": "ExaminationTab-ui-module-scss-module__dpwsoW__diagQuickChips",
  "diagToggleBtn": "ExaminationTab-ui-module-scss-module__dpwsoW__diagToggleBtn",
  "diagToggleLabel": "ExaminationTab-ui-module-scss-module__dpwsoW__diagToggleLabel",
  "diagToggleOpen": "ExaminationTab-ui-module-scss-module__dpwsoW__diagToggleOpen",
  "dotsAbbr": "ExaminationTab-ui-module-scss-module__dpwsoW__dotsAbbr",
  "dotsMore": "ExaminationTab-ui-module-scss-module__dpwsoW__dotsMore",
  "dotsRow": "ExaminationTab-ui-module-scss-module__dpwsoW__dotsRow",
  "dotsWholePill": "ExaminationTab-ui-module-scss-module__dpwsoW__dotsWholePill",
  "editIdleBtn": "ExaminationTab-ui-module-scss-module__dpwsoW__editIdleBtn",
  "editIdleLabel": "ExaminationTab-ui-module-scss-module__dpwsoW__editIdleLabel",
  "entryRoot": "ExaminationTab-ui-module-scss-module__dpwsoW__entryRoot",
  "findingTag": "ExaminationTab-ui-module-scss-module__dpwsoW__findingTag",
  "gripIcon": "ExaminationTab-ui-module-scss-module__dpwsoW__gripIcon",
  "menuCurrentHint": "ExaminationTab-ui-module-scss-module__dpwsoW__menuCurrentHint",
  "menuRowBtn": "ExaminationTab-ui-module-scss-module__dpwsoW__menuRowBtn",
  "menuRowBtnHi": "ExaminationTab-ui-module-scss-module__dpwsoW__menuRowBtnHi",
  "menuRowGrow": "ExaminationTab-ui-module-scss-module__dpwsoW__menuRowGrow",
  "menuRowStrong": "ExaminationTab-ui-module-scss-module__dpwsoW__menuRowStrong",
  "missingText": "ExaminationTab-ui-module-scss-module__dpwsoW__missingText",
  "missingWrap": "ExaminationTab-ui-module-scss-module__dpwsoW__missingWrap",
  "nameComboInput": "ExaminationTab-ui-module-scss-module__dpwsoW__nameComboInput",
  "noteInput": "ExaminationTab-ui-module-scss-module__dpwsoW__noteInput",
  "notesArea": "ExaminationTab-ui-module-scss-module__dpwsoW__notesArea",
  "notesPad": "ExaminationTab-ui-module-scss-module__dpwsoW__notesPad",
  "onboardCard": "ExaminationTab-ui-module-scss-module__dpwsoW__onboardCard",
  "onboardCol": "ExaminationTab-ui-module-scss-module__dpwsoW__onboardCol",
  "onboardHead": "ExaminationTab-ui-module-scss-module__dpwsoW__onboardHead",
  "onboardIcon": "ExaminationTab-ui-module-scss-module__dpwsoW__onboardIcon",
  "onboardSub": "ExaminationTab-ui-module-scss-module__dpwsoW__onboardSub",
  "onboardTitle": "ExaminationTab-ui-module-scss-module__dpwsoW__onboardTitle",
  "optionMuted": "ExaminationTab-ui-module-scss-module__dpwsoW__optionMuted",
  "panelBadge": "ExaminationTab-ui-module-scss-module__dpwsoW__panelBadge",
  "panelBody": "ExaminationTab-ui-module-scss-module__dpwsoW__panelBody",
  "panelCloseBtn": "ExaminationTab-ui-module-scss-module__dpwsoW__panelCloseBtn",
  "panelDivider": "ExaminationTab-ui-module-scss-module__dpwsoW__panelDivider",
  "panelHeader": "ExaminationTab-ui-module-scss-module__dpwsoW__panelHeader",
  "panelHeaderActions": "ExaminationTab-ui-module-scss-module__dpwsoW__panelHeaderActions",
  "panelHeaderLeft": "ExaminationTab-ui-module-scss-module__dpwsoW__panelHeaderLeft",
  "panelHeaderRow": "ExaminationTab-ui-module-scss-module__dpwsoW__panelHeaderRow",
  "panelIconBtn": "ExaminationTab-ui-module-scss-module__dpwsoW__panelIconBtn",
  "panelIconBtnDanger": "ExaminationTab-ui-module-scss-module__dpwsoW__panelIconBtnDanger",
  "panelRoot": "ExaminationTab-ui-module-scss-module__dpwsoW__panelRoot",
  "panelThumb": "ExaminationTab-ui-module-scss-module__dpwsoW__panelThumb",
  "panelTitle": "ExaminationTab-ui-module-scss-module__dpwsoW__panelTitle",
  "panelTitleBlock": "ExaminationTab-ui-module-scss-module__dpwsoW__panelTitleBlock",
  "panelTitleRow": "ExaminationTab-ui-module-scss-module__dpwsoW__panelTitleRow",
  "pill": "ExaminationTab-ui-module-scss-module__dpwsoW__pill",
  "pillAmber": "ExaminationTab-ui-module-scss-module__dpwsoW__pillAmber",
  "pillBlue": "ExaminationTab-ui-module-scss-module__dpwsoW__pillBlue",
  "pillIcon": "ExaminationTab-ui-module-scss-module__dpwsoW__pillIcon",
  "pillLabel": "ExaminationTab-ui-module-scss-module__dpwsoW__pillLabel",
  "pillLabelPlain": "ExaminationTab-ui-module-scss-module__dpwsoW__pillLabelPlain",
  "pillSegment": "ExaminationTab-ui-module-scss-module__dpwsoW__pillSegment",
  "pillSegmentSep": "ExaminationTab-ui-module-scss-module__dpwsoW__pillSegmentSep",
  "pillSegmented": "ExaminationTab-ui-module-scss-module__dpwsoW__pillSegmented",
  "pillSegments": "ExaminationTab-ui-module-scss-module__dpwsoW__pillSegments",
  "pillSlate": "ExaminationTab-ui-module-scss-module__dpwsoW__pillSlate",
  "pillViolet": "ExaminationTab-ui-module-scss-module__dpwsoW__pillViolet",
  "popover": "ExaminationTab-ui-module-scss-module__dpwsoW__popover",
  "popoverAdd": "ExaminationTab-ui-module-scss-module__dpwsoW__popoverAdd",
  "popoverAddInner": "ExaminationTab-ui-module-scss-module__dpwsoW__popoverAddInner",
  "popoverBelow": "ExaminationTab-ui-module-scss-module__dpwsoW__popoverBelow",
  "popoverItem": "ExaminationTab-ui-module-scss-module__dpwsoW__popoverItem",
  "popoverSectionHeader": "ExaminationTab-ui-module-scss-module__dpwsoW__popoverSectionHeader",
  "popoverSectionTitle": "ExaminationTab-ui-module-scss-module__dpwsoW__popoverSectionTitle",
  "portalList": "ExaminationTab-ui-module-scss-module__dpwsoW__portalList",
  "portalListPlain": "ExaminationTab-ui-module-scss-module__dpwsoW__portalListPlain",
  "portalListWide": "ExaminationTab-ui-module-scss-module__dpwsoW__portalListWide",
  "primaryNoteInput": "ExaminationTab-ui-module-scss-module__dpwsoW__primaryNoteInput",
  "recordsBadge": "ExaminationTab-ui-module-scss-module__dpwsoW__recordsBadge",
  "recordsHeader": "ExaminationTab-ui-module-scss-module__dpwsoW__recordsHeader",
  "recordsList": "ExaminationTab-ui-module-scss-module__dpwsoW__recordsList",
  "recordsTitle": "ExaminationTab-ui-module-scss-module__dpwsoW__recordsTitle",
  "rel": "ExaminationTab-ui-module-scss-module__dpwsoW__rel",
  "removeRowBtn": "ExaminationTab-ui-module-scss-module__dpwsoW__removeRowBtn",
  "scoreCard": "ExaminationTab-ui-module-scss-module__dpwsoW__scoreCard",
  "scoreCenter": "ExaminationTab-ui-module-scss-module__dpwsoW__scoreCenter",
  "scoreHuge": "ExaminationTab-ui-module-scss-module__dpwsoW__scoreHuge",
  "scoreRatingBtn": "ExaminationTab-ui-module-scss-module__dpwsoW__scoreRatingBtn",
  "scoreRibbon": "ExaminationTab-ui-module-scss-module__dpwsoW__scoreRibbon",
  "scoreSub": "ExaminationTab-ui-module-scss-module__dpwsoW__scoreSub",
  "scoreSvgWrap": "ExaminationTab-ui-module-scss-module__dpwsoW__scoreSvgWrap",
  "scrolledEdge": "ExaminationTab-ui-module-scss-module__dpwsoW__scrolledEdge",
  "searchBlock": "ExaminationTab-ui-module-scss-module__dpwsoW__searchBlock",
  "searchBlockFirst": "ExaminationTab-ui-module-scss-module__dpwsoW__searchBlockFirst",
  "searchBlockTop": "ExaminationTab-ui-module-scss-module__dpwsoW__searchBlockTop",
  "searchIconAbs": "ExaminationTab-ui-module-scss-module__dpwsoW__searchIconAbs",
  "searchInput": "ExaminationTab-ui-module-scss-module__dpwsoW__searchInput",
  "searchInput14": "ExaminationTab-ui-module-scss-module__dpwsoW__searchInput14",
  "searchRel": "ExaminationTab-ui-module-scss-module__dpwsoW__searchRel",
  "secActions": "ExaminationTab-ui-module-scss-module__dpwsoW__secActions",
  "secChevronBtn": "ExaminationTab-ui-module-scss-module__dpwsoW__secChevronBtn",
  "secCount": "ExaminationTab-ui-module-scss-module__dpwsoW__secCount",
  "secGrow": "ExaminationTab-ui-module-scss-module__dpwsoW__secGrow",
  "secHead": "ExaminationTab-ui-module-scss-module__dpwsoW__secHead",
  "secHeadClick": "ExaminationTab-ui-module-scss-module__dpwsoW__secHeadClick",
  "secIcon": "ExaminationTab-ui-module-scss-module__dpwsoW__secIcon",
  "secTitle": "ExaminationTab-ui-module-scss-module__dpwsoW__secTitle",
  "secToolBtn": "ExaminationTab-ui-module-scss-module__dpwsoW__secToolBtn",
  "selectNative": "ExaminationTab-ui-module-scss-module__dpwsoW__selectNative",
  "sinceAnchor": "ExaminationTab-ui-module-scss-module__dpwsoW__sinceAnchor",
  "sinceChevronAbs": "ExaminationTab-ui-module-scss-module__dpwsoW__sinceChevronAbs",
  "sinceInput": "ExaminationTab-ui-module-scss-module__dpwsoW__sinceInput",
  "sinceMenu": "ExaminationTab-ui-module-scss-module__dpwsoW__sinceMenu",
  "stepCard": "ExaminationTab-ui-module-scss-module__dpwsoW__stepCard",
  "stepCardDesc": "ExaminationTab-ui-module-scss-module__dpwsoW__stepCardDesc",
  "stepCardInner": "ExaminationTab-ui-module-scss-module__dpwsoW__stepCardInner",
  "stepCardTitle": "ExaminationTab-ui-module-scss-module__dpwsoW__stepCardTitle",
  "stepCircle": "ExaminationTab-ui-module-scss-module__dpwsoW__stepCircle",
  "stepCol": "ExaminationTab-ui-module-scss-module__dpwsoW__stepCol",
  "stepConnector": "ExaminationTab-ui-module-scss-module__dpwsoW__stepConnector",
  "stepList": "ExaminationTab-ui-module-scss-module__dpwsoW__stepList",
  "stepRow": "ExaminationTab-ui-module-scss-module__dpwsoW__stepRow",
  "surfaceCheck": "ExaminationTab-ui-module-scss-module__dpwsoW__surfaceCheck",
  "surfaceCheckOn": "ExaminationTab-ui-module-scss-module__dpwsoW__surfaceCheckOn",
  "surfaceDot8": "ExaminationTab-ui-module-scss-module__dpwsoW__surfaceDot8",
  "surfaceHint": "ExaminationTab-ui-module-scss-module__dpwsoW__surfaceHint",
  "surfaceHintBold": "ExaminationTab-ui-module-scss-module__dpwsoW__surfaceHintBold",
  "surfaceHintText": "ExaminationTab-ui-module-scss-module__dpwsoW__surfaceHintText",
  "surfaceInlineRow": "ExaminationTab-ui-module-scss-module__dpwsoW__surfaceInlineRow",
  "surfaceListRule": "ExaminationTab-ui-module-scss-module__dpwsoW__surfaceListRule",
  "surfaceMenuLabel": "ExaminationTab-ui-module-scss-module__dpwsoW__surfaceMenuLabel",
  "surfaceMenuStrong": "ExaminationTab-ui-module-scss-module__dpwsoW__surfaceMenuStrong",
  "surfacePlaceholder": "ExaminationTab-ui-module-scss-module__dpwsoW__surfacePlaceholder",
  "surfacePopover": "ExaminationTab-ui-module-scss-module__dpwsoW__surfacePopover",
  "surfacePopoverPad": "ExaminationTab-ui-module-scss-module__dpwsoW__surfacePopoverPad",
  "surfaceTriggerBtn": "ExaminationTab-ui-module-scss-module__dpwsoW__surfaceTriggerBtn",
  "surfaceTriggerText": "ExaminationTab-ui-module-scss-module__dpwsoW__surfaceTriggerText",
  "surfaceZoneBtn": "ExaminationTab-ui-module-scss-module__dpwsoW__surfaceZoneBtn",
  "surfaceZoneList": "ExaminationTab-ui-module-scss-module__dpwsoW__surfaceZoneList",
  "symMuted": "ExaminationTab-ui-module-scss-module__dpwsoW__symMuted",
  "symTrigger": "ExaminationTab-ui-module-scss-module__dpwsoW__symTrigger",
  "symTriggerOpen": "ExaminationTab-ui-module-scss-module__dpwsoW__symTriggerOpen",
  "symptomField": "ExaminationTab-ui-module-scss-module__dpwsoW__symptomField",
  "symptomName": "ExaminationTab-ui-module-scss-module__dpwsoW__symptomName",
  "symptomSelect": "ExaminationTab-ui-module-scss-module__dpwsoW__symptomSelect",
  "symptomSelectEmpty": "ExaminationTab-ui-module-scss-module__dpwsoW__symptomSelectEmpty",
  "symptomSelectFilled": "ExaminationTab-ui-module-scss-module__dpwsoW__symptomSelectFilled",
  "table": "ExaminationTab-ui-module-scss-module__dpwsoW__table",
  "tableWrap": "ExaminationTab-ui-module-scss-module__dpwsoW__tableWrap",
  "tbodyRow": "ExaminationTab-ui-module-scss-module__dpwsoW__tbodyRow",
  "tbodyRowInteractive": "ExaminationTab-ui-module-scss-module__dpwsoW__tbodyRowInteractive",
  "td": "ExaminationTab-ui-module-scss-module__dpwsoW__td",
  "tdActive": "ExaminationTab-ui-module-scss-module__dpwsoW__tdActive",
  "tdGrip": "ExaminationTab-ui-module-scss-module__dpwsoW__tdGrip",
  "tdHover": "ExaminationTab-ui-module-scss-module__dpwsoW__tdHover",
  "tdPlain": "ExaminationTab-ui-module-scss-module__dpwsoW__tdPlain",
  "tdRel": "ExaminationTab-ui-module-scss-module__dpwsoW__tdRel",
  "tdStickyAct": "ExaminationTab-ui-module-scss-module__dpwsoW__tdStickyAct",
  "th": "ExaminationTab-ui-module-scss-module__dpwsoW__th",
  "thCenter": "ExaminationTab-ui-module-scss-module__dpwsoW__thCenter",
  "thSticky": "ExaminationTab-ui-module-scss-module__dpwsoW__thSticky",
  "thUpper": "ExaminationTab-ui-module-scss-module__dpwsoW__thUpper",
  "theadRow": "ExaminationTab-ui-module-scss-module__dpwsoW__theadRow",
  "tooltipFooter": "ExaminationTab-ui-module-scss-module__dpwsoW__tooltipFooter",
  "tooltipFooterMuted": "ExaminationTab-ui-module-scss-module__dpwsoW__tooltipFooterMuted",
  "tooltipFooterVal": "ExaminationTab-ui-module-scss-module__dpwsoW__tooltipFooterVal",
  "tooltipLead": "ExaminationTab-ui-module-scss-module__dpwsoW__tooltipLead",
  "tooltipPanel": "ExaminationTab-ui-module-scss-module__dpwsoW__tooltipPanel",
  "tooltipRoot": "ExaminationTab-ui-module-scss-module__dpwsoW__tooltipRoot",
  "tooltipRow": "ExaminationTab-ui-module-scss-module__dpwsoW__tooltipRow",
  "tooltipRowLabel": "ExaminationTab-ui-module-scss-module__dpwsoW__tooltipRowLabel",
  "tooltipRowVal": "ExaminationTab-ui-module-scss-module__dpwsoW__tooltipRowVal",
  "tooltipStack": "ExaminationTab-ui-module-scss-module__dpwsoW__tooltipStack",
  "tooltipTitle": "ExaminationTab-ui-module-scss-module__dpwsoW__tooltipTitle",
  "toothChevron": "ExaminationTab-ui-module-scss-module__dpwsoW__toothChevron",
  "toothChips": "ExaminationTab-ui-module-scss-module__dpwsoW__toothChips",
  "toothFdi": "ExaminationTab-ui-module-scss-module__dpwsoW__toothFdi",
  "toothFdiBelow": "ExaminationTab-ui-module-scss-module__dpwsoW__toothFdiBelow",
  "toothHeaderText": "ExaminationTab-ui-module-scss-module__dpwsoW__toothHeaderText",
  "toothName": "ExaminationTab-ui-module-scss-module__dpwsoW__toothName",
  "toothRecordAgentPulse": "ExaminationTab-ui-module-scss-module__dpwsoW__toothRecordAgentPulse",
  "toothRecordEnter": "ExaminationTab-ui-module-scss-module__dpwsoW__toothRecordEnter",
  "toothRow": "ExaminationTab-ui-module-scss-module__dpwsoW__toothRow",
  "toothRowActive": "ExaminationTab-ui-module-scss-module__dpwsoW__toothRowActive",
  "toothRowAgentPulse": "ExaminationTab-ui-module-scss-module__dpwsoW__toothRowAgentPulse",
  "toothRowDivider": "ExaminationTab-ui-module-scss-module__dpwsoW__toothRowDivider",
  "toothRowEnter": "ExaminationTab-ui-module-scss-module__dpwsoW__toothRowEnter",
  "toothRowHeader": "ExaminationTab-ui-module-scss-module__dpwsoW__toothRowHeader",
  "toothThumb": "ExaminationTab-ui-module-scss-module__dpwsoW__toothThumb",
  "toothTitleRow": "ExaminationTab-ui-module-scss-module__dpwsoW__toothTitleRow",
  "tutorialImg": "ExaminationTab-ui-module-scss-module__dpwsoW__tutorialImg",
  "tutorialOverlay": "ExaminationTab-ui-module-scss-module__dpwsoW__tutorialOverlay",
  "tutorialWrap": "ExaminationTab-ui-module-scss-module__dpwsoW__tutorialWrap",
  "zoneChip": "ExaminationTab-ui-module-scss-module__dpwsoW__zoneChip",
  "zoneChipOff": "ExaminationTab-ui-module-scss-module__dpwsoW__zoneChipOff",
  "zoneChipOn": "ExaminationTab-ui-module-scss-module__dpwsoW__zoneChipOn",
  "zoneChipsRow": "ExaminationTab-ui-module-scss-module__dpwsoW__zoneChipsRow",
});
}),
"[project]/components/dental/dental-ui.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "drawerAction": "dental-ui-module-scss-module__Y0ODAq__drawerAction",
  "drawerCloseBtn": "dental-ui-module-scss-module__Y0ODAq__drawerCloseBtn",
  "drawerDivider": "dental-ui-module-scss-module__Y0ODAq__drawerDivider",
  "drawerHeader": "dental-ui-module-scss-module__Y0ODAq__drawerHeader",
  "drawerTitle": "dental-ui-module-scss-module__Y0ODAq__drawerTitle",
  "emptyAction": "dental-ui-module-scss-module__Y0ODAq__emptyAction",
  "emptyDesc": "dental-ui-module-scss-module__Y0ODAq__emptyDesc",
  "emptyIcon": "dental-ui-module-scss-module__Y0ODAq__emptyIcon",
  "emptyState": "dental-ui-module-scss-module__Y0ODAq__emptyState",
  "emptyTitle": "dental-ui-module-scss-module__Y0ODAq__emptyTitle",
  "planClusterHeaderActive": "dental-ui-module-scss-module__Y0ODAq__planClusterHeaderActive",
  "planClusterHeaderCompleted": "dental-ui-module-scss-module__Y0ODAq__planClusterHeaderCompleted",
  "planClusterHeaderEstimates": "dental-ui-module-scss-module__Y0ODAq__planClusterHeaderEstimates",
  "planClusterInnerSurface": "dental-ui-module-scss-module__Y0ODAq__planClusterInnerSurface",
  "planClusterShell": "dental-ui-module-scss-module__Y0ODAq__planClusterShell",
  "sectionFrame": "dental-ui-module-scss-module__Y0ODAq__sectionFrame",
  "sectionFrameEmbed": "dental-ui-module-scss-module__Y0ODAq__sectionFrameEmbed",
  "shellBackBtn": "dental-ui-module-scss-module__Y0ODAq__shellBackBtn",
  "shellBackRule": "dental-ui-module-scss-module__Y0ODAq__shellBackRule",
  "shellBody": "dental-ui-module-scss-module__Y0ODAq__shellBody",
  "shellHeader": "dental-ui-module-scss-module__Y0ODAq__shellHeader",
  "shellMain": "dental-ui-module-scss-module__Y0ODAq__shellMain",
  "shellNav": "dental-ui-module-scss-module__Y0ODAq__shellNav",
  "shellRoot": "dental-ui-module-scss-module__Y0ODAq__shellRoot",
  "shellSubtitle": "dental-ui-module-scss-module__Y0ODAq__shellSubtitle",
  "shellTitle": "dental-ui-module-scss-module__Y0ODAq__shellTitle",
  "shellTitleCol": "dental-ui-module-scss-module__Y0ODAq__shellTitleCol",
  "tabNavBtn": "dental-ui-module-scss-module__Y0ODAq__tabNavBtn",
  "tabNavCaret": "dental-ui-module-scss-module__Y0ODAq__tabNavCaret",
  "tabNavIconOff": "dental-ui-module-scss-module__Y0ODAq__tabNavIconOff",
  "tabNavIconOn": "dental-ui-module-scss-module__Y0ODAq__tabNavIconOn",
  "tabNavIconWrap": "dental-ui-module-scss-module__Y0ODAq__tabNavIconWrap",
  "tabNavLabel": "dental-ui-module-scss-module__Y0ODAq__tabNavLabel",
  "tabNavLabelOff": "dental-ui-module-scss-module__Y0ODAq__tabNavLabelOff",
  "tabNavLabelOn": "dental-ui-module-scss-module__Y0ODAq__tabNavLabelOn",
  "tabPill": "dental-ui-module-scss-module__Y0ODAq__tabPill",
  "tabPillActive": "dental-ui-module-scss-module__Y0ODAq__tabPillActive",
  "tabPillCount": "dental-ui-module-scss-module__Y0ODAq__tabPillCount",
  "tabPillCountActive": "dental-ui-module-scss-module__Y0ODAq__tabPillCountActive",
  "tpPageBackChevron": "dental-ui-module-scss-module__Y0ODAq__tpPageBackChevron",
  "tpPageBackIconWrap": "dental-ui-module-scss-module__Y0ODAq__tpPageBackIconWrap",
  "tpPageHeader": "dental-ui-module-scss-module__Y0ODAq__tpPageHeader",
  "tpPageHeaderRow": "dental-ui-module-scss-module__Y0ODAq__tpPageHeaderRow",
  "tpPageMain": "dental-ui-module-scss-module__Y0ODAq__tpPageMain",
  "tpPageTitle": "dental-ui-module-scss-module__Y0ODAq__tpPageTitle",
  "tpPageTitleArea": "dental-ui-module-scss-module__Y0ODAq__tpPageTitleArea",
  "tpTabBody": "dental-ui-module-scss-module__Y0ODAq__tpTabBody",
  "tpTabHeader": "dental-ui-module-scss-module__Y0ODAq__tpTabHeader",
  "tpTabHeaderEmbed": "dental-ui-module-scss-module__Y0ODAq__tpTabHeaderEmbed",
  "tpTabPills": "dental-ui-module-scss-module__Y0ODAq__tpTabPills",
  "tpTabRoot": "dental-ui-module-scss-module__Y0ODAq__tpTabRoot",
  "tpTabRootEmbed": "dental-ui-module-scss-module__Y0ODAq__tpTabRootEmbed",
});
}),
"[project]/components/dental/plan/plan-types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * plan-types.ts — Type definitions for the Treatment Plan module.
 *
 * Hierarchy: TreatmentPlan → PlanService → SittingRecord / SubProcedure
 * Lifecycle:  Draft → Active (1 at a time) → In Progress → Completed
 */ // ─── Core Entities ──────────────────────────────────────────
__turbopack_context__.s([
    "SURFACE_ABBR",
    ()=>SURFACE_ABBR,
    "SURFACE_COLORS",
    ()=>SURFACE_COLORS,
    "SURFACE_OPTIONS",
    ()=>SURFACE_OPTIONS,
    "genId",
    ()=>genId,
    "getDefaultPlanSurfaces",
    ()=>getDefaultPlanSurfaces,
    "getPlanSurfaceLabel",
    ()=>getPlanSurfaceLabel
]);
const SURFACE_OPTIONS = [
    {
        id: "whole",
        label: "Whole Tooth",
        abbr: "WT"
    },
    {
        id: "occlusal",
        label: "Occlusal",
        abbr: "O"
    },
    {
        id: "buccal",
        label: "Buccal",
        abbr: "B"
    },
    {
        id: "lingual",
        label: "Lingual",
        abbr: "L"
    },
    {
        id: "mesial",
        label: "Mesial",
        abbr: "M"
    },
    {
        id: "distal",
        label: "Distal",
        abbr: "D"
    },
    {
        id: "cervical",
        label: "Cervical",
        abbr: "C"
    },
    {
        id: "root",
        label: "Root",
        abbr: "R"
    }
];
const SURFACE_COLORS = {
    whole: "#34d399",
    occlusal: "#14b8a6",
    buccal: "#f97316",
    lingual: "#8b5cf6",
    mesial: "#eab308",
    distal: "#2563eb",
    cervical: "#ec4899",
    root: "#65a30d"
};
const SURFACE_ABBR = Object.fromEntries(_c1 = SURFACE_OPTIONS.map(_c = (option)=>[
        option.id,
        option.abbr
    ]));
_c2 = SURFACE_ABBR;
function getPlanSurfaceLabel(surfaceId) {
    const opt = SURFACE_OPTIONS.find((o)=>o.id === surfaceId);
    if (opt) return opt.label;
    if (typeof surfaceId === "string" && surfaceId.length > 0) return surfaceId.charAt(0).toUpperCase() + surfaceId.slice(1);
    return String(surfaceId);
}
const WHOLE_TOOTH_TREATMENTS = new Set([
    "Root Canal Treatment",
    "Pulp Capping",
    "Crown (PFM)",
    "Crown (Zirconia)",
    "Crown (All-Ceramic)",
    "Bridge (per unit)",
    "Complete Denture",
    "Partial Denture",
    "Veneers",
    "Extraction",
    "Surgical Extraction",
    "Wisdom Tooth Removal",
    "Implant (Single)",
    "Implant Crown",
    "Bone Grafting",
    "Apicoectomy",
    "Fluoride Application"
]);
function getDefaultPlanSurfaces(treatmentName) {
    return WHOLE_TOOTH_TREATMENTS.has(treatmentName) ? [
        "whole"
    ] : [];
}
// ─── Helper: generate unique ID ─────────────────────────────
let _counter = 0;
function genId(prefix = "id") {
    _counter += 1;
    return `${prefix}-${Date.now()}-${_counter}`;
}
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SURFACE_ABBR$Object.fromEntries$SURFACE_OPTIONS.map");
__turbopack_context__.k.register(_c1, "SURFACE_ABBR$Object.fromEntries");
__turbopack_context__.k.register(_c2, "SURFACE_ABBR");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/plan/plan-mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * plan-mock-data.ts — Realistic demo data for treatment plans.
 *
 * apt-1 (Shyam GR): 3 plans covering draft, in-progress, completed
 * apt-6 (if needed): 1 plan
 */ __turbopack_context__.s([
    "getMockPlans",
    ()=>getMockPlans
]);
// ─── apt-1: Shyam GR ───────────────────────────────────────
const PRIMARY_CARE_PLAN = {
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
            surfaces: [
                "occlusal",
                "root"
            ],
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
                    notes: "Initial debridement, access opening, BMP placed"
                },
                {
                    id: "sit-002",
                    date: "10 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Canal shaping + obturation completed"
                },
                {
                    id: "sit-cancel-demo",
                    date: "1 Apr 2026, 2:00 PM",
                    doctor: "Dr. Riya Kapoor",
                    visitType: "Review",
                    status: "cancelled",
                    notes: "Patient rescheduled — no treatment performed.",
                    createdAt: "2026-04-01T14:00:00.000Z"
                }
            ],
            procedures: [
                {
                    id: "proc-001",
                    name: "Access opening",
                    date: "3 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-002",
                    name: "BMP placement",
                    date: "3 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-003",
                    name: "Obturation",
                    date: "10 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    status: "in-progress"
                }
            ]
        },
        {
            id: "svc-002",
            planId: "plan-001",
            treatment: "Restoration (Composite Filling)",
            toothFdi: "16",
            toothLabel: "Upper Right First Molar",
            surfaces: [
                "buccal",
                "occlusal"
            ],
            rate: 2000,
            discount: 0,
            amount: 2000,
            status: "planned",
            sittings: [
                {
                    id: "sit-upcoming-demo",
                    date: "24 Apr 2026, 10:30 AM",
                    doctor: "Dr. Sheela B R",
                    visitType: "Follow-up",
                    status: "scheduled",
                    createdAt: "2026-04-24T05:00:00.000Z"
                }
            ],
            procedures: []
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
            status: "planned",
            sittings: [],
            procedures: []
        }
    ]
};
const WISDOM_TOOTH_PLAN = {
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
            procedures: []
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
            procedures: []
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
            procedures: []
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
            procedures: []
        }
    ]
};
const CROWN_REPLACEMENT_PLAN = {
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
            surfaces: [
                "occlusal",
                "buccal"
            ],
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
                    notes: "Tooth preparation, impression taken"
                },
                {
                    id: "sit-004",
                    date: "20 Mar 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "PFM crown cemented, occlusion checked"
                }
            ],
            procedures: [
                {
                    id: "proc-004",
                    name: "Tooth preparation",
                    date: "15 Feb 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-005",
                    name: "Impression & temporary crown",
                    date: "15 Feb 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-006",
                    name: "PFM crown cementation",
                    date: "20 Mar 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                }
            ]
        }
    ]
};
// ─── apt-6: Anjali Patel — active / scheduled plans (demo) ─────────────────
const ANJALI_ESTIMATE_PLAN_1 = {
    id: "plan-anjali-001",
    name: "Smile Rehabilitation Plan",
    patientId: "apt-6",
    createdAt: "2026-04-08",
    updatedAt: "2026-04-10",
    status: "draft",
    notes: "Prioritize aesthetic + sensitivity concerns for upper anteriors.",
    services: [
        {
            id: "svc-new-001",
            planId: "plan-anjali-001",
            treatment: "Veneers",
            toothFdi: "11",
            toothLabel: "Upper Right Central Incisor",
            surfaces: [
                "buccal",
                "mesial"
            ],
            rate: 7500,
            discount: 500,
            amount: 7000,
            status: "planned",
            sittings: [],
            procedures: []
        },
        {
            id: "svc-new-002",
            planId: "plan-anjali-001",
            treatment: "Veneers",
            toothFdi: "21",
            toothLabel: "Upper Left Central Incisor",
            surfaces: [
                "buccal",
                "distal"
            ],
            rate: 7500,
            discount: 500,
            amount: 7000,
            status: "planned",
            sittings: [],
            procedures: []
        },
        {
            id: "svc-new-003",
            planId: "plan-anjali-001",
            treatment: "Scaling & Polishing",
            toothFdi: "full-mouth",
            toothLabel: "Full Mouth",
            surfaces: [],
            rate: 1800,
            discount: 0,
            amount: 1800,
            status: "planned",
            sittings: [],
            procedures: []
        }
    ]
};
const ANJALI_ESTIMATE_PLAN_2 = {
    id: "plan-anjali-002",
    name: "Quadrant Stabilization",
    patientId: "apt-6",
    createdAt: "2026-04-06",
    updatedAt: "2026-04-11",
    status: "active",
    notes: "Address caries/restorations in lower left quadrant first.",
    services: [
        {
            id: "svc-new-004",
            planId: "plan-anjali-002",
            treatment: "Restoration (Composite Filling)",
            toothFdi: "36",
            toothLabel: "Lower Left First Molar",
            surfaces: [
                "occlusal",
                "distal"
            ],
            rate: 2400,
            discount: 200,
            amount: 2200,
            status: "planned",
            sittings: [],
            procedures: []
        },
        {
            id: "svc-new-005",
            planId: "plan-anjali-002",
            treatment: "Root Canal Treatment",
            toothFdi: "37",
            toothLabel: "Lower Left Second Molar",
            surfaces: [
                "occlusal",
                "root"
            ],
            rate: 8200,
            discount: 700,
            amount: 7500,
            status: "planned",
            sittings: [],
            procedures: []
        }
    ]
};
const ANJALI_IN_PROGRESS_PLAN = {
    id: "plan-anjali-003",
    name: "Pain Relief and Core Build-up",
    patientId: "apt-6",
    createdAt: "2026-03-30",
    updatedAt: "2026-04-14",
    status: "in-progress",
    notes: "Pain reduced after first two sittings; proceed with core build-up.",
    services: [
        {
            id: "svc-new-006",
            planId: "plan-anjali-003",
            treatment: "Root Canal Treatment",
            toothFdi: "46",
            toothLabel: "Lower Right First Molar",
            surfaces: [
                "occlusal",
                "root"
            ],
            rate: 8500,
            discount: 500,
            amount: 8000,
            status: "in-progress",
            startedAt: "2026-04-01",
            sittings: [],
            appointments: [
                {
                    id: "appt-new-001",
                    date: "14 Apr 2026",
                    time: "11:15 AM",
                    doctor: "Dr. Sheela B R",
                    notes: "Review and obturation planning"
                },
                {
                    id: "appt-new-003",
                    date: "18 Apr 2026",
                    time: "10:30 AM",
                    doctor: "Dr. Sheela B R",
                    notes: "Master cone trial and final obturation"
                }
            ],
            consultations: [
                {
                    id: "cons-appt-new-001",
                    endedAt: "2026-04-15T08:16:00",
                    source: "appointment",
                    appointmentId: "appt-new-001",
                    summaryText: [
                        "Symptoms: Lingering cold and soreness on biting localized to the lower right first molar (46).",
                        "Examination: Access reopened under rubber dam; temporary restoration removed; percussion ++; palpation WNL; canals patent.",
                        "Tooth: Lower Right First Molar (T46) · MB, ML, and D canals negotiated to working length; glide path with #15 K-file; copious 2.5% NaOCl irrigation; calcium hydroxide intracanal medicament; Cavit temporary seal.",
                        "Diagnosis: Previously treated root canal with asymptomatic apical periodontitis (46).",
                        "Lab investigation: Periapical radiograph — periapical radiolucency at 46; no vertical fracture line.",
                        "Medication: Ibuprofen 400mg SOS for post-visit soreness.",
                        "Advice: Soft diet on the right side; return for master cone trial, obturation, and core build-up planning."
                    ].join("\n")
                }
            ],
            procedures: [
                {
                    id: "proc-new-001",
                    name: "Access opening",
                    date: "1 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Pulp chamber opened",
                    status: "completed"
                },
                {
                    id: "proc-new-002",
                    name: "Working length determination",
                    date: "5 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-new-003",
                    name: "Temporary restoration",
                    date: "12 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    status: "in-progress"
                }
            ]
        },
        {
            id: "svc-new-007",
            planId: "plan-anjali-003",
            treatment: "Restoration (Composite Filling)",
            toothFdi: "45",
            toothLabel: "Lower Right Second Premolar",
            surfaces: [
                "buccal",
                "occlusal"
            ],
            rate: 2600,
            discount: 100,
            amount: 2500,
            status: "in-progress",
            startedAt: "2026-04-09",
            sittings: [
                {
                    id: "sit-new-004",
                    date: "9 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Caries excavation and base placement"
                }
            ],
            appointments: [
                {
                    id: "appt-new-002",
                    date: "16 Apr 2026",
                    time: "03:45 PM",
                    doctor: "Dr. Sheela B R",
                    notes: "Composite finishing"
                }
            ],
            procedures: [
                {
                    id: "proc-new-004",
                    name: "Shade selection",
                    date: "9 Apr 2026",
                    doctor: "Dr. Sheela B R",
                    status: "in-progress"
                }
            ]
        }
    ]
};
const ANJALI_COMPLETED_PLAN = {
    id: "plan-anjali-004",
    name: "Posterior Crown Completion",
    patientId: "apt-6",
    createdAt: "2026-02-18",
    updatedAt: "2026-03-28",
    status: "completed",
    notes: "Patient comfortable with final bite. Review after 3 months.",
    services: [
        {
            id: "svc-new-008",
            planId: "plan-anjali-004",
            treatment: "Crown (Zirconia)",
            toothFdi: "26",
            toothLabel: "Upper Left First Molar",
            surfaces: [
                "occlusal",
                "buccal",
                "lingual"
            ],
            rate: 9200,
            discount: 1200,
            amount: 8000,
            status: "completed",
            startedAt: "2026-02-20",
            completedAt: "2026-03-18",
            notes: "Final zirconia crown seated with proper proximal contact.",
            sittings: [
                {
                    id: "sit-new-005",
                    date: "20 Feb 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Preparation + digital scan"
                },
                {
                    id: "sit-new-006",
                    date: "5 Mar 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Try-in and occlusal adjustments"
                },
                {
                    id: "sit-new-007",
                    date: "18 Mar 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Final cementation and polishing"
                }
            ],
            procedures: [
                {
                    id: "proc-new-005",
                    name: "Tooth preparation",
                    date: "20 Feb 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-new-006",
                    name: "Digital impression",
                    date: "20 Feb 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-new-007",
                    name: "Zirconia try-in",
                    date: "5 Mar 2026",
                    doctor: "Dr. Sheela B R",
                    status: "completed"
                },
                {
                    id: "proc-new-008",
                    name: "Final crown cementation",
                    date: "18 Mar 2026",
                    doctor: "Dr. Sheela B R",
                    notes: "Occlusion verified",
                    status: "completed"
                }
            ]
        }
    ]
};
function getMockPlans(patientId) {
    if (patientId === "apt-1") {
        return [
            PRIMARY_CARE_PLAN,
            WISDOM_TOOTH_PLAN,
            CROWN_REPLACEMENT_PLAN
        ];
    }
    if (patientId === "apt-6") {
        return [
            ANJALI_ESTIMATE_PLAN_1,
            ANJALI_ESTIMATE_PLAN_2,
            ANJALI_IN_PROGRESS_PLAN,
            ANJALI_COMPLETED_PLAN
        ];
    }
    // First-visit patients (e.g. Ria Kapoor) and others — no plans until created
    return [];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/plan/plan-context.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlanProvider",
    ()=>PlanProvider,
    "usePlanContext",
    ()=>usePlanContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$snackbar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-snackbar.jsx [app-client] (ecmascript)");
/**
 * plan-context.tsx — React context + useReducer for treatment plan state.
 *
 * Provides: state, dispatch, and derived selectors (estimatePlans,
 * inProgressPlans, completedPlans, activePlan).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$consultation$2d$queue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/plan-consultation-queue.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$procedures$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/plan-procedures-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/plan-types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/plan-mock-data.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
// ─── Reducer ────────────────────────────────────────────────
function planReducer(state, action) {
    switch(action.type){
        // ── Plan CRUD ────────────────────────────────────────
        case "ADD_PLAN":
            return {
                ...state,
                plans: [
                    ...state.plans,
                    action.plan
                ]
            };
        case "UPDATE_PLAN":
            return {
                ...state,
                plans: state.plans.map((p)=>p.id === action.planId ? {
                        ...p,
                        ...action.patch,
                        updatedAt: new Date().toISOString().slice(0, 10)
                    } : p)
            };
        case "DELETE_PLAN":
            return {
                ...state,
                plans: state.plans.filter((p)=>p.id !== action.planId)
            };
        case "DUPLICATE_PLAN":
            {
                const source = state.plans.find((p)=>p.id === action.planId);
                if (!source) return state;
                const newPlanId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["genId"])("plan");
                const dup = {
                    ...source,
                    id: newPlanId,
                    name: `${source.name} (Copy)`,
                    status: "draft",
                    createdAt: new Date().toISOString().slice(0, 10),
                    updatedAt: new Date().toISOString().slice(0, 10),
                    services: source.services.map((s)=>({
                            ...s,
                            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["genId"])("svc"),
                            planId: newPlanId,
                            status: "planned",
                            surfaces: [
                                ...s.surfaces
                            ],
                            sittings: [],
                            procedures: [],
                            appointments: [],
                            consultations: [],
                            startedAt: undefined,
                            completedAt: undefined
                        }))
                };
                return {
                    ...state,
                    plans: [
                        ...state.plans,
                        dup
                    ]
                };
            }
        // ── Plan lifecycle ───────────────────────────────────
        case "ACTIVATE_PLAN":
            return {
                ...state,
                plans: state.plans.map((p)=>{
                    if (p.id === action.planId) return {
                        ...p,
                        status: "active"
                    };
                    // Demote any current active → draft
                    if (p.status === "active") return {
                        ...p,
                        status: "draft"
                    };
                    return p;
                })
            };
        case "START_TREATMENT":
            return {
                ...state,
                plans: state.plans.map((p)=>{
                    if (p.id !== action.planId) return p;
                    if (p.status !== "draft" && p.status !== "active") return p;
                    const now = new Date().toISOString().slice(0, 10);
                    return {
                        ...p,
                        status: "in-progress",
                        updatedAt: now,
                        services: p.services.map((s)=>({
                                ...s,
                                status: "planned",
                                startedAt: undefined
                            }))
                    };
                })
            };
        case "REVERT_PLAN_TO_ESTIMATES":
            return {
                ...state,
                plans: state.plans.map((p)=>{
                    if (p.id !== action.planId) return p;
                    if (p.status !== "in-progress") return p;
                    return {
                        ...p,
                        status: "draft",
                        updatedAt: new Date().toISOString().slice(0, 10),
                        services: p.services.map((s)=>({
                                ...s,
                                status: "planned",
                                startedAt: undefined,
                                completedAt: undefined,
                                sittings: [],
                                procedures: [],
                                appointments: [],
                                consultations: []
                            }))
                    };
                })
            };
        case "MARK_PLAN_COMPLETED":
            {
                const now = new Date().toISOString().slice(0, 10);
                return {
                    ...state,
                    plans: state.plans.map((p)=>{
                        if (p.id !== action.planId) return p;
                        return {
                            ...p,
                            status: "completed",
                            updatedAt: now,
                            services: p.services.map((s)=>({
                                    ...s,
                                    status: "completed",
                                    completedAt: s.completedAt ?? now
                                }))
                        };
                    })
                };
            }
        case "REVERT_PLAN_TO_PROGRESS":
            return {
                ...state,
                plans: state.plans.map((p)=>{
                    if (p.id !== action.planId) return p;
                    if (p.status !== "completed") return p;
                    return {
                        ...p,
                        status: "in-progress",
                        updatedAt: new Date().toISOString().slice(0, 10),
                        services: p.services.map((s)=>({
                                ...s,
                                status: "in-progress",
                                completedAt: undefined
                            }))
                    };
                })
            };
        // ── Service CRUD ─────────────────────────────────────
        case "ADD_SERVICE":
            return {
                ...state,
                plans: state.plans.map((p)=>p.id === action.planId ? {
                        ...p,
                        services: [
                            ...p.services,
                            action.service
                        ],
                        updatedAt: new Date().toISOString().slice(0, 10)
                    } : p)
            };
        case "UPDATE_SERVICE":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                ...action.patch
                            } : s)
                    }))
            };
        case "APPEND_SERVICE_CONSULTATION":
            {
                const now = new Date().toISOString().slice(0, 10);
                const { serviceId, consultation } = action;
                return {
                    ...state,
                    plans: state.plans.map((p)=>({
                            ...p,
                            services: p.services.map((s)=>{
                                if (s.id !== serviceId) return s;
                                const nextConsultations = [
                                    ...s.consultations ?? [],
                                    consultation
                                ];
                                const next = {
                                    ...s,
                                    consultations: nextConsultations
                                };
                                if (s.status === "planned") {
                                    return {
                                        ...next,
                                        status: "in-progress",
                                        startedAt: s.startedAt ?? now
                                    };
                                }
                                return next;
                            })
                        }))
                };
            }
        case "REMOVE_SERVICE_CONSULTATION":
            {
                const { serviceId, consultationId } = action;
                return {
                    ...state,
                    plans: state.plans.map((p)=>({
                            ...p,
                            services: p.services.map((s)=>s.id !== serviceId ? s : {
                                    ...s,
                                    consultations: (s.consultations ?? []).filter((c)=>c.id !== consultationId)
                                })
                        }))
                };
            }
        case "REMOVE_SERVICE":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.filter((s)=>s.id !== action.serviceId)
                    }))
            };
        case "MARK_SERVICE_COMPLETED":
            {
                const now = new Date().toISOString().slice(0, 10);
                const newPlans = state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                status: "completed",
                                completedAt: now
                            } : s)
                    }));
                return {
                    ...state,
                    plans: newPlans
                };
            }
        case "REVERT_SERVICE_TO_PROGRESS":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                status: "in-progress",
                                completedAt: undefined
                            } : s)
                    }))
            };
        // ── Sittings & procedures ────────────────────────────
        case "ADD_SITTING":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                status: s.status === "planned" ? "in-progress" : s.status,
                                sittings: [
                                    ...s.sittings,
                                    action.sitting
                                ],
                                // Procedures recorded in the quick visit also join the
                                // service's procedure history so they surface in the
                                // timeline and bill (story stays connected).
                                procedures: action.procedures && action.procedures.length ? [
                                    ...s.procedures,
                                    ...action.procedures
                                ] : s.procedures
                            } : s)
                    }))
            };
        case "UPDATE_SITTING":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                sittings: s.sittings.map((sit)=>sit.id === action.sittingId ? {
                                        ...sit,
                                        ...action.patch
                                    } : sit)
                            } : s)
                    }))
            };
        case "REMOVE_SITTING":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                sittings: s.sittings.filter((sit)=>sit.id !== action.sittingId)
                            } : s)
                    }))
            };
        case "ADD_SUB_PROCEDURE":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                status: s.status === "planned" ? "in-progress" : s.status,
                                procedures: [
                                    ...s.procedures,
                                    action.procedure
                                ]
                            } : s)
                    }))
            };
        case "UPDATE_SUB_PROCEDURE":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                procedures: s.procedures.map((proc)=>proc.id === action.procedureId ? {
                                        ...proc,
                                        ...action.patch
                                    } : proc)
                            } : s)
                    }))
            };
        case "REMOVE_SUB_PROCEDURE":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                procedures: s.procedures.filter((proc)=>proc.id !== action.procedureId)
                            } : s)
                    }))
            };
        case "ADD_APPOINTMENT":
            // Note: adding an appointment does NOT change the service status.
            // Status only transitions to "in-progress" when a sitting or
            // procedure is recorded. Scheduling a visit is intent, not activity.
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                appointments: [
                                    ...s.appointments ?? [],
                                    action.appointment
                                ]
                            } : s)
                    }))
            };
        case "UPDATE_APPOINTMENT":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                appointments: (s.appointments ?? []).map((appt)=>appt.id === action.appointmentId ? {
                                        ...appt,
                                        ...action.patch
                                    } : appt)
                            } : s)
                    }))
            };
        case "REMOVE_APPOINTMENT":
            return {
                ...state,
                plans: state.plans.map((p)=>({
                        ...p,
                        services: p.services.map((s)=>s.id === action.serviceId ? {
                                ...s,
                                appointments: (s.appointments ?? []).filter((appt)=>appt.id !== action.appointmentId)
                            } : s)
                    }))
            };
        // ── Drawer ───────────────────────────────────────────
        case "SET_DRAWER":
            return {
                ...state,
                drawer: action.drawer
            };
        default:
            return state;
    }
}
const PlanContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function usePlanContext() {
    _s();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PlanContext);
    if (!ctx) throw new Error("usePlanContext must be used within PlanProvider");
    return ctx;
}
_s(usePlanContext, "/dMy7t63NXD4eYACoT93CePwGrg=");
function PlanProvider({ patientId, children, onNavigateTab, initialDrawer, embedInPatientShell = false }) {
    _s1();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(planReducer, {
        plans: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMockPlans"])(patientId),
        drawer: initialDrawer ?? {
            type: "closed"
        }
    });
    const [snackbar, setSnackbar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        message: ""
    });
    const showSnackbar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlanProvider.useCallback[showSnackbar]": (message)=>{
            if (!message) return;
            setSnackbar({
                open: true,
                message
            });
        }
    }["PlanProvider.useCallback[showSnackbar]"], []);
    const closeSnackbar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlanProvider.useCallback[closeSnackbar]": ()=>setSnackbar({
                "PlanProvider.useCallback[closeSnackbar]": (s)=>({
                        ...s,
                        open: false
                    })
            }["PlanProvider.useCallback[closeSnackbar]"])
    }["PlanProvider.useCallback[closeSnackbar]"], []);
    const estimatePlans = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanProvider.useMemo[estimatePlans]": ()=>state.plans.filter({
                "PlanProvider.useMemo[estimatePlans]": (p)=>p.status === "draft" || p.status === "active"
            }["PlanProvider.useMemo[estimatePlans]"])
    }["PlanProvider.useMemo[estimatePlans]"], [
        state.plans
    ]);
    const inProgressPlans = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanProvider.useMemo[inProgressPlans]": ()=>state.plans.filter({
                "PlanProvider.useMemo[inProgressPlans]": (p)=>p.status === "in-progress"
            }["PlanProvider.useMemo[inProgressPlans]"])
    }["PlanProvider.useMemo[inProgressPlans]"], [
        state.plans
    ]);
    const completedPlans = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanProvider.useMemo[completedPlans]": ()=>state.plans.filter({
                "PlanProvider.useMemo[completedPlans]": (p)=>p.status === "completed"
            }["PlanProvider.useMemo[completedPlans]"])
    }["PlanProvider.useMemo[completedPlans]"], [
        state.plans
    ]);
    const activePlan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanProvider.useMemo[activePlan]": ()=>state.plans.find({
                "PlanProvider.useMemo[activePlan]": (p)=>p.status === "active"
            }["PlanProvider.useMemo[activePlan]"])
    }["PlanProvider.useMemo[activePlan]"], [
        state.plans
    ]);
    const findPlanForService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanProvider.useMemo[findPlanForService]": ()=>({
                "PlanProvider.useMemo[findPlanForService]": (serviceId)=>state.plans.find({
                        "PlanProvider.useMemo[findPlanForService]": (p)=>p.services.some({
                                "PlanProvider.useMemo[findPlanForService]": (s)=>s.id === serviceId
                            }["PlanProvider.useMemo[findPlanForService]"])
                    }["PlanProvider.useMemo[findPlanForService]"])
            })["PlanProvider.useMemo[findPlanForService]"]
    }["PlanProvider.useMemo[findPlanForService]"], [
        state.plans
    ]);
    const findService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanProvider.useMemo[findService]": ()=>({
                "PlanProvider.useMemo[findService]": (serviceId)=>{
                    for (const p of state.plans){
                        const svc = p.services.find({
                            "PlanProvider.useMemo[findService].svc": (s)=>s.id === serviceId
                        }["PlanProvider.useMemo[findService].svc"]);
                        if (svc) return svc;
                    }
                    return undefined;
                }
            })["PlanProvider.useMemo[findService]"]
    }["PlanProvider.useMemo[findService]"], [
        state.plans
    ]);
    const openDrawer = (drawer)=>dispatch({
            type: "SET_DRAWER",
            drawer
        });
    const closeDrawer = ()=>dispatch({
            type: "SET_DRAWER",
            drawer: {
                type: "closed"
            }
        });
    // Publish recorded procedures so Past Visits / Patient Detail Rx can surface
    // them (the treatment plan is the source of truth for "what was done").
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlanProvider.useEffect": ()=>{
            const toothLabelFor = {
                "PlanProvider.useEffect.toothLabelFor": (svc)=>{
                    const fdis = svc.toothFdis && svc.toothFdis.length > 0 ? svc.toothFdis : svc.toothFdi ? [
                        svc.toothFdi
                    ] : [];
                    if (fdis.length === 0) return svc.toothLabel || "";
                    if (fdis[0] === "full-mouth") return "Full Mouth";
                    if (fdis.length === 1) return `${svc.toothLabel || ""} (T${fdis[0]})`.trim();
                    return `${svc.toothLabel || `${fdis.length} teeth`} (${fdis.map({
                        "PlanProvider.useEffect.toothLabelFor": (f)=>`T${f}`
                    }["PlanProvider.useEffect.toothLabelFor"]).join(", ")})`;
                }
            }["PlanProvider.useEffect.toothLabelFor"];
            const out = [];
            for (const p of state.plans){
                for (const svc of p.services){
                    const fdis = svc.toothFdis && svc.toothFdis.length > 0 ? svc.toothFdis : svc.toothFdi ? [
                        svc.toothFdi
                    ] : [];
                    for (const proc of svc.procedures ?? []){
                        out.push({
                            id: proc.id,
                            name: proc.name,
                            doctor: proc.doctor,
                            date: proc.date,
                            status: proc.status,
                            notes: proc.notes,
                            toothLabel: toothLabelFor(svc),
                            toothFdis: fdis,
                            treatment: svc.treatment,
                            planName: p.name
                        });
                    }
                }
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$procedures$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savePlanProcedures"])(patientId, out);
        }
    }["PlanProvider.useEffect"], [
        state.plans,
        patientId
    ]);
    const hasInProgressPlan = inProgressPlans.length > 0;
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlanProvider.useMemo[value]": ()=>({
                patientId,
                embedInPatientShell,
                state,
                dispatch,
                estimatePlans,
                inProgressPlans,
                completedPlans,
                activePlan,
                findPlanForService,
                findService,
                hasInProgressPlan,
                openDrawer,
                closeDrawer,
                navigateTab: onNavigateTab,
                showSnackbar,
                snackbar,
                closeSnackbar
            })
    }["PlanProvider.useMemo[value]"], [
        patientId,
        embedInPatientShell,
        state,
        estimatePlans,
        inProgressPlans,
        completedPlans,
        activePlan,
        findPlanForService,
        findService,
        hasInProgressPlan,
        onNavigateTab,
        showSnackbar,
        snackbar,
        closeSnackbar
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlanProvider.useEffect": ()=>{
            const key = `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$consultation$2d$queue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAN_CONSULTATION_QUEUE_PREFIX"]}${patientId || "apt-1"}`;
            const flush = {
                "PlanProvider.useEffect.flush": ()=>{
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    const raw = localStorage.getItem(key);
                    if (!raw) return;
                    let queue = [];
                    try {
                        queue = JSON.parse(raw);
                        if (!Array.isArray(queue) || queue.length === 0) return;
                    } catch  {
                        return;
                    }
                    localStorage.removeItem(key);
                    for (const item of queue){
                        if (!item || item.patientId !== patientId || !item.serviceId || !item.summaryText) continue;
                        dispatch({
                            type: "APPEND_SERVICE_CONSULTATION",
                            serviceId: item.serviceId,
                            consultation: {
                                id: item.id ?? `cns-${Date.now()}`,
                                endedAt: item.endedAt ?? new Date().toISOString(),
                                source: item.source === "appointment" ? "appointment" : "treatment-row",
                                appointmentId: item.appointmentId,
                                summaryText: item.summaryText
                            }
                        });
                    }
                }
            }["PlanProvider.useEffect.flush"];
            flush();
            window.addEventListener("storage", flush);
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$consultation$2d$queue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAN_CONSULTATION_FLUSH_EVENT"], flush);
            return ({
                "PlanProvider.useEffect": ()=>{
                    window.removeEventListener("storage", flush);
                    window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$plan$2d$consultation$2d$queue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLAN_CONSULTATION_FLUSH_EVENT"], flush);
                }
            })["PlanProvider.useEffect"];
        }
    }["PlanProvider.useEffect"], [
        patientId
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(PlanContext.Provider, {
        value: value,
        children: [
            children,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$snackbar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPSnackbar"], {
                open: snackbar.open,
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center"
                },
                autoHideDuration: 3000,
                severity: "success",
                message: snackbar.message,
                onClose: (_e, reason)=>{
                    if (reason === "clickaway") return;
                    closeSnackbar();
                }
            })
        ]
    });
}
_s1(PlanProvider, "R9z3xxfoNHaXeN0Pl1fRNy1uUlc=");
_c = PlanProvider;
var _c;
__turbopack_context__.k.register(_c, "PlanProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/plan/plan-shared.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClipboardTickIcon",
    ()=>ClipboardTickIcon,
    "CloseSquareIcon",
    ()=>CloseSquareIcon,
    "DrawerHeader",
    ()=>DrawerHeader,
    "EmptyState",
    ()=>EmptyState,
    "PLAN_DRAWER_PANEL_CLASS",
    ()=>PLAN_DRAWER_PANEL_CLASS,
    "PLAN_DRAWER_WIDE_PANEL_CLASS",
    ()=>PLAN_DRAWER_WIDE_PANEL_CLASS,
    "PLAN_DRAWER_XWIDE_PANEL_CLASS",
    ()=>PLAN_DRAWER_XWIDE_PANEL_CLASS,
    "PlanEmptyIcon",
    ()=>PlanEmptyIcon,
    "PlanSurfaceAbbrTags",
    ()=>PlanSurfaceAbbrTags,
    "SectionFrame",
    ()=>SectionFrame,
    "TabPill",
    ()=>TabPill,
    "buildConsultationRxUrl",
    ()=>buildConsultationRxUrl,
    "buildPlanRxReturnPath",
    ()=>buildPlanRxReturnPath,
    "computePlanDiscount",
    ()=>computePlanDiscount,
    "computePlanTotal",
    ()=>computePlanTotal,
    "formatINR",
    ()=>formatINR,
    "getPlanCompletionStatus",
    ()=>getPlanCompletionStatus,
    "getServiceWorkflowStatus",
    ()=>getServiceWorkflowStatus,
    "serviceToothDisplay",
    ()=>serviceToothDisplay,
    "serviceToothFdis",
    ()=>serviceToothFdis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
/**
 * plan-shared.tsx — Shared sub-components for the Treatment Plan module.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/tooltip.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/dental/dental-ui.module.scss [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$context$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/plan-context.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/plan-types.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const PLAN_DRAWER_PANEL_CLASS = "!gap-0 !rounded-none !min-h-0 !w-[min(100vw,600px)] !max-w-[600px] sm:!w-[600px] sm:!max-w-[600px]";
const PLAN_DRAWER_WIDE_PANEL_CLASS = "!gap-0 !rounded-none !min-h-0 !w-[min(100vw,880px)] !max-w-[880px] sm:!w-[880px] sm:!max-w-[880px]";
const PLAN_DRAWER_XWIDE_PANEL_CLASS = "!gap-0 !rounded-none !min-h-0 !w-[80vw] !max-w-[80vw] sm:!w-[80vw] sm:!max-w-[80vw]";
const PLAN_SURFACE_CHIP_CLASS = "inline-flex h-[18px] cursor-default items-center rounded-[4px] px-[5px] font-['Inter',sans-serif] text-[12px] font-bold text-white tabular-nums outline-none transition-[filter] duration-150 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tp-blue-500/45 focus-visible:ring-offset-1";
function PlanSurfaceAbbrTags({ surfaces, gapClass = "gap-[3px]", wrap = false }) {
    if (!surfaces?.length) return null;
    const rowClass = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(wrap ? "flex flex-wrap items-center" : "flex items-center", gapClass);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: rowClass,
        children: surfaces.map((z, i)=>{
            const label = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPlanSurfaceLabel"])(z);
            const abbr = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SURFACE_ABBR"][z] ?? (typeof z === "string" ? z.charAt(0).toUpperCase() : "?");
            const bg = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SURFACE_COLORS"][z] ?? "#94a3b8";
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                delayDuration: 200,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                        asChild: true,
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                            tabIndex: 0,
                            className: PLAN_SURFACE_CHIP_CLASS,
                            style: {
                                background: bg
                            },
                            children: abbr
                        })
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                        side: "top",
                        sideOffset: 6,
                        children: label
                    })
                ]
            }, `${String(z)}-${i}`);
        })
    });
}
_c = PlanSurfaceAbbrTags;
function formatINR(amount) {
    return `₹${amount.toLocaleString("en-IN")}`;
}
function TabPill({ label, count, active, onClick }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("button", {
        type: "button",
        onClick: onClick,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabPill, active && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabPillActive),
        children: [
            label,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabPillCount, active && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabPillCountActive),
                children: count
            })
        ]
    });
}
_c1 = TabPill;
function SectionFrame({ children, className }) {
    _s();
    const { embedInPatientShell } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$context$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanContext"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionFrame, embedInPatientShell && __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionFrameEmbed, className),
        children: children
    });
}
_s(SectionFrame, "hFiSX4LeO+9ZID1xAMKnamUgIeo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$context$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlanContext"]
    ];
});
_c2 = SectionFrame;
function EmptyState({ icon, title, description, action }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyState,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyIcon,
                children: icon
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyTitle,
                        children: title
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyDesc,
                        children: description
                    })
                ]
            }),
            action && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyAction,
                children: action
            })
        ]
    });
}
_c3 = EmptyState;
function PlanEmptyIcon({ size = 112, className }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 80 80",
        fill: "none",
        "aria-hidden": true,
        className: className,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M71.9803 14.6484H9.57474C8.73282 14.649 7.92552 14.9836 7.33019 15.579C6.73486 16.1743 6.40018 16.9816 6.39966 17.8235V75.0812C6.40018 75.9231 6.73486 76.7304 7.33019 77.3258C7.92552 77.9211 8.73282 78.2558 9.57474 78.2563H71.9803C72.8223 78.2559 73.6297 77.9212 74.2251 77.3259C74.8205 76.7305 75.1552 75.9232 75.1557 75.0812V17.8235C75.1552 16.9815 74.8205 16.1742 74.2251 15.5789C73.6297 14.9835 72.8223 14.6489 71.9803 14.6484Z",
                fill: "#C8CED6"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M67.8722 58.3622H13.6836C11.9302 58.3622 10.5085 56.9406 10.5085 55.1871V4.59696C10.5085 2.84351 11.9302 1.42188 13.6836 1.42188H67.8722C69.6256 1.42188 71.0472 2.84351 71.0472 4.59696V55.1871C71.0472 56.9406 69.6256 58.3622 67.8722 58.3622Z",
                fill: "#FFFFFF"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M61.2048 12.1094H20.3513V14.4376H61.2048V12.1094ZM61.2048 20.9992H20.3513V23.3274H61.2048V20.9992ZM61.2048 29.891H20.3513V32.2192H61.2048V29.891ZM61.2048 38.7808H20.3513V41.1094H61.2048V38.7808Z",
                fill: "#E4E7EB"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M25.2197 31.2656L35.4856 41.5319H25.2197V31.2656Z",
                fill: "#B9C0CA"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M75.1559 42.3779V18.7573L71.0474 14.6484V42.3776H75.1559V42.3779Z",
                fill: "#B9C0CA"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M79.9682 44.5123L75.5416 75.8474C75.3203 77.4139 73.9796 78.5782 72.3977 78.5782H9.15767C7.57571 78.5782 6.23505 77.4139 6.01374 75.8474L0.0317719 33.5061C-0.238064 31.5946 1.24521 29.8867 3.17571 29.8867H22.7055C24.2875 29.8867 25.6282 31.051 25.8495 32.6172L26.6334 38.1621C26.8547 39.7287 28.1954 40.8929 29.7773 40.8929H76.8249C78.7547 40.8929 80.2383 42.6008 79.9685 44.5123H79.9682Z",
                fill: "#DEE3EA"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M64.2844 64.6016H17.2716C17.0139 64.6015 16.7651 64.5074 16.5718 64.337C16.3785 64.1667 16.2539 63.9316 16.2214 63.676L15.6332 59.0189C15.6145 58.87 15.6278 58.7187 15.672 58.5752C15.7162 58.4317 15.7904 58.2993 15.8897 58.1867C15.9891 58.0741 16.1112 57.9839 16.248 57.922C16.3848 57.8602 16.5333 57.8282 16.6834 57.8281H64.8726C65.0227 57.8282 65.1711 57.8602 65.308 57.922C65.4448 57.9839 65.5669 58.0741 65.6662 58.1867C65.7655 58.2993 65.8398 58.4316 65.884 58.5752C65.9282 58.7187 65.9414 58.87 65.9227 59.0189L65.3345 63.676C65.3021 63.9316 65.1775 64.1667 64.9842 64.337C64.7909 64.5074 64.5421 64.6015 64.2844 64.6016Z",
                fill: "#CCD2DB"
            })
        ]
    });
}
_c4 = PlanEmptyIcon;
function ClipboardTickIcon({ size = 24, className }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        className: className,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                opacity: "0.4",
                d: "M16.24 3.65039H7.76004C5.29004 3.65039 3.29004 5.66039 3.29004 8.12039V17.5304C3.29004 19.9904 5.30004 22.0004 7.76004 22.0004H16.23C18.7 22.0004 20.7 19.9904 20.7 17.5304V8.12039C20.71 5.65039 18.7 3.65039 16.24 3.65039Z"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M14.3498 2H9.64977C8.60977 2 7.75977 2.84 7.75977 3.88V4.82C7.75977 5.86 8.59977 6.7 9.63977 6.7H14.3498C15.3898 6.7 16.2298 5.86 16.2298 4.82V3.88C16.2398 2.84 15.3898 2 14.3498 2Z"
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M10.81 16.9506C10.62 16.9506 10.43 16.8806 10.28 16.7306L8.78 15.2306C8.49 14.9406 8.49 14.4606 8.78 14.1706C9.07 13.8806 9.55 13.8806 9.84 14.1706L10.81 15.1406L14.28 11.6706C14.57 11.3806 15.05 11.3806 15.34 11.6706C15.63 11.9606 15.63 12.4406 15.34 12.7306L11.34 16.7306C11.2 16.8806 11 16.9506 10.81 16.9506Z"
            })
        ]
    });
}
_c5 = ClipboardTickIcon;
function CloseSquareIcon({ size = 24, color = "var(--tp-slate-700)" }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: color,
        xmlns: "http://www.w3.org/2000/svg",
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z"
        })
    });
}
_c6 = CloseSquareIcon;
function DrawerHeader({ title, onClose, action, titleClassName }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerHeader,
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                type: "button",
                onClick: onClose,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerCloseBtn,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(CloseSquareIcon, {
                    size: 24,
                    color: "var(--tp-slate-700)"
                })
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerDivider
            }),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("h2", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerTitle, titleClassName),
                children: title
            }),
            action && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$dental$2d$ui$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerAction,
                children: action
            })
        ]
    });
}
_c7 = DrawerHeader;
function computePlanTotal(services) {
    return services.reduce((sum, s)=>sum + s.amount, 0);
}
function serviceToothFdis(service) {
    if (service.toothFdis && service.toothFdis.length > 0) return service.toothFdis;
    return service.toothFdi ? [
        service.toothFdi
    ] : [];
}
function serviceToothDisplay(service) {
    const fdis = serviceToothFdis(service);
    if (fdis.length === 0) return "—";
    if (fdis.length === 1) return fdis[0] === "full-mouth" ? "Full" : `T${fdis[0]}`;
    return fdis.map((f)=>f === "full-mouth" ? "Full" : `T${f}`).join(", ");
}
function computePlanDiscount(services) {
    return services.reduce((sum, s)=>sum + s.discount, 0);
}
function getServiceWorkflowStatus(service) {
    if (service.status === "completed") return "completed";
    if (service.status === "no-show") return "no-show";
    if (service.status === "not-interested") return "not-interested";
    if (service.status === "cancelled") return "cancelled";
    if (service.status === "in-progress") return "in-progress";
    // Booked appointments do NOT count as activity — scheduling a visit is
    // intent, not execution. Consultations (Rx / end visit), sittings, or
    // procedures count as activity for the workflow chip.
    const consultCount = service.consultations?.length ?? 0;
    const hasActivity = consultCount > 0 || service.sittings.length > 0 || service.procedures.length > 0;
    return hasActivity ? "in-progress" : "not-started";
}
function getPlanCompletionStatus(services) {
    if (services.length === 0) return "not-completed";
    const completedCount = services.filter((s)=>s.status === "completed").length;
    if (completedCount === 0) return "not-completed";
    if (completedCount === services.length) return "completed";
    return "partially-completed";
}
function buildPlanRxReturnPath(embedInPatientShell, patientId) {
    if (embedInPatientShell) {
        const q = new URLSearchParams({
            patientId,
            nav: "dental-plan",
            planTab: "progress"
        });
        return `/patient-detail?${q.toString()}`;
    }
    const q = new URLSearchParams({
        patientId,
        tab: "progress"
    });
    return `/treatment-plan?${q.toString()}`;
}
function buildConsultationRxUrl(patientId, planId, serviceId, appointmentId, embedInPatientShell, treatmentName) {
    const p = new URLSearchParams();
    p.set("patientId", patientId);
    p.set("planId", planId);
    p.set("serviceId", serviceId);
    if (appointmentId) p.set("appointmentId", appointmentId);
    p.set("returnTo", buildPlanRxReturnPath(embedInPatientShell, patientId));
    if (treatmentName) p.set("ctxTreatment", treatmentName);
    return `/rxpad?${p.toString()}`;
}
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "PlanSurfaceAbbrTags");
__turbopack_context__.k.register(_c1, "TabPill");
__turbopack_context__.k.register(_c2, "SectionFrame");
__turbopack_context__.k.register(_c3, "EmptyState");
__turbopack_context__.k.register(_c4, "PlanEmptyIcon");
__turbopack_context__.k.register(_c5, "ClipboardTickIcon");
__turbopack_context__.k.register(_c6, "CloseSquareIcon");
__turbopack_context__.k.register(_c7, "DrawerHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/billing-settings/billing-settings.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionRow": "billing-settings-module-scss-module__oym1ia__actionRow",
  "applyBtn": "billing-settings-module-scss-module__oym1ia__applyBtn",
  "backLink": "billing-settings-module-scss-module__oym1ia__backLink",
  "billingDrawerTitle": "billing-settings-module-scss-module__oym1ia__billingDrawerTitle",
  "billingDrawerTitleRow": "billing-settings-module-scss-module__oym1ia__billingDrawerTitleRow",
  "bodyFlex": "billing-settings-module-scss-module__oym1ia__bodyFlex",
  "cellClamp": "billing-settings-module-scss-module__oym1ia__cellClamp",
  "checkIcon": "billing-settings-module-scss-module__oym1ia__checkIcon",
  "checkboxOuter": "billing-settings-module-scss-module__oym1ia__checkboxOuter",
  "checkboxOuterOn": "billing-settings-module-scss-module__oym1ia__checkboxOuterOn",
  "combo": "billing-settings-module-scss-module__oym1ia__combo",
  "dataRow": "billing-settings-module-scss-module__oym1ia__dataRow",
  "discountBox": "billing-settings-module-scss-module__oym1ia__discountBox",
  "discountInline": "billing-settings-module-scss-module__oym1ia__discountInline",
  "discountInlineInput": "billing-settings-module-scss-module__oym1ia__discountInlineInput",
  "discountInput": "billing-settings-module-scss-module__oym1ia__discountInput",
  "discountUnitBtn": "billing-settings-module-scss-module__oym1ia__discountUnitBtn",
  "discountUnitBtnActive": "billing-settings-module-scss-module__oym1ia__discountUnitBtnActive",
  "discountUnitChevrons": "billing-settings-module-scss-module__oym1ia__discountUnitChevrons",
  "discountUnitSwitch": "billing-settings-module-scss-module__oym1ia__discountUnitSwitch",
  "discountUnitToggle": "billing-settings-module-scss-module__oym1ia__discountUnitToggle",
  "drawerBody": "billing-settings-module-scss-module__oym1ia__drawerBody",
  "drawerCatalogCallout": "billing-settings-module-scss-module__oym1ia__drawerCatalogCallout",
  "drawerCatalogCalloutIcon": "billing-settings-module-scss-module__oym1ia__drawerCatalogCalloutIcon",
  "drawerCatalogCalloutInline": "billing-settings-module-scss-module__oym1ia__drawerCatalogCalloutInline",
  "drawerCatalogCalloutNote": "billing-settings-module-scss-module__oym1ia__drawerCatalogCalloutNote",
  "drawerCatalogCalloutText": "billing-settings-module-scss-module__oym1ia__drawerCatalogCalloutText",
  "drawerCatalogCalloutTitle": "billing-settings-module-scss-module__oym1ia__drawerCatalogCalloutTitle",
  "drawerInput": "billing-settings-module-scss-module__oym1ia__drawerInput",
  "drawerInputAffixed": "billing-settings-module-scss-module__oym1ia__drawerInputAffixed",
  "drawerInputAffixedGst": "billing-settings-module-scss-module__oym1ia__drawerInputAffixedGst",
  "drawerInputError": "billing-settings-module-scss-module__oym1ia__drawerInputError",
  "drawerPricingTriple": "billing-settings-module-scss-module__oym1ia__drawerPricingTriple",
  "drawerSaveCompact": "billing-settings-module-scss-module__oym1ia__drawerSaveCompact",
  "drawerSelect": "billing-settings-module-scss-module__oym1ia__drawerSelect",
  "drawerSheet": "billing-settings-module-scss-module__oym1ia__drawerSheet",
  "drawerTabPills": "billing-settings-module-scss-module__oym1ia__drawerTabPills",
  "drawerTotalFooter": "billing-settings-module-scss-module__oym1ia__drawerTotalFooter",
  "drawerTotalHint": "billing-settings-module-scss-module__oym1ia__drawerTotalHint",
  "drawerTotalLabel": "billing-settings-module-scss-module__oym1ia__drawerTotalLabel",
  "drawerTotalValue": "billing-settings-module-scss-module__oym1ia__drawerTotalValue",
  "drawerTypeTab": "billing-settings-module-scss-module__oym1ia__drawerTypeTab",
  "drawerTypeTabActive": "billing-settings-module-scss-module__oym1ia__drawerTypeTabActive",
  "drawerTypeTabs": "billing-settings-module-scss-module__oym1ia__drawerTypeTabs",
  "emptyCell": "billing-settings-module-scss-module__oym1ia__emptyCell",
  "emptyClear": "billing-settings-module-scss-module__oym1ia__emptyClear",
  "emptyState": "billing-settings-module-scss-module__oym1ia__emptyState",
  "emptyText": "billing-settings-module-scss-module__oym1ia__emptyText",
  "field": "billing-settings-module-scss-module__oym1ia__field",
  "fieldError": "billing-settings-module-scss-module__oym1ia__fieldError",
  "fieldRow": "billing-settings-module-scss-module__oym1ia__fieldRow",
  "fieldSubtitle": "billing-settings-module-scss-module__oym1ia__fieldSubtitle",
  "fieldTypeTabs": "billing-settings-module-scss-module__oym1ia__fieldTypeTabs",
  "filterBtn": "billing-settings-module-scss-module__oym1ia__filterBtn",
  "filterBtnActive": "billing-settings-module-scss-module__oym1ia__filterBtnActive",
  "filterBtnIcon": "billing-settings-module-scss-module__oym1ia__filterBtnIcon",
  "filterChip": "billing-settings-module-scss-module__oym1ia__filterChip",
  "filterChipPrefix": "billing-settings-module-scss-module__oym1ia__filterChipPrefix",
  "filterChipRemove": "billing-settings-module-scss-module__oym1ia__filterChipRemove",
  "filterChipValue": "billing-settings-module-scss-module__oym1ia__filterChipValue",
  "filterCountBadge": "billing-settings-module-scss-module__oym1ia__filterCountBadge",
  "filterDivider": "billing-settings-module-scss-module__oym1ia__filterDivider",
  "filterFooter": "billing-settings-module-scss-module__oym1ia__filterFooter",
  "filterOptionBtn": "billing-settings-module-scss-module__oym1ia__filterOptionBtn",
  "filterOptionLabel": "billing-settings-module-scss-module__oym1ia__filterOptionLabel",
  "filterOptionLabelOff": "billing-settings-module-scss-module__oym1ia__filterOptionLabelOff",
  "filterOptionLabelOn": "billing-settings-module-scss-module__oym1ia__filterOptionLabelOn",
  "filterOptionList": "billing-settings-module-scss-module__oym1ia__filterOptionList",
  "filterPanel": "billing-settings-module-scss-module__oym1ia__filterPanel",
  "filterSection": "billing-settings-module-scss-module__oym1ia__filterSection",
  "filterSectionTitle": "billing-settings-module-scss-module__oym1ia__filterSectionTitle",
  "filterTagsBar": "billing-settings-module-scss-module__oym1ia__filterTagsBar",
  "filterTagsDivider": "billing-settings-module-scss-module__oym1ia__filterTagsDivider",
  "filterTagsLabel": "billing-settings-module-scss-module__oym1ia__filterTagsLabel",
  "filterTagsOuter": "billing-settings-module-scss-module__oym1ia__filterTagsOuter",
  "form": "billing-settings-module-scss-module__oym1ia__form",
  "importBtn": "billing-settings-module-scss-module__oym1ia__importBtn",
  "infoIconBtn": "billing-settings-module-scss-module__oym1ia__infoIconBtn",
  "inputAffix": "billing-settings-module-scss-module__oym1ia__inputAffix",
  "inputAffixError": "billing-settings-module-scss-module__oym1ia__inputAffixError",
  "inputAffixPrefix": "billing-settings-module-scss-module__oym1ia__inputAffixPrefix",
  "inputAffixSuffix": "billing-settings-module-scss-module__oym1ia__inputAffixSuffix",
  "itemName": "billing-settings-module-scss-module__oym1ia__itemName",
  "label": "billing-settings-module-scss-module__oym1ia__label",
  "labelRow": "billing-settings-module-scss-module__oym1ia__labelRow",
  "linkWarning": "billing-settings-module-scss-module__oym1ia__linkWarning",
  "linkWarningEnd": "billing-settings-module-scss-module__oym1ia__linkWarningEnd",
  "main": "billing-settings-module-scss-module__oym1ia__main",
  "page": "billing-settings-module-scss-module__oym1ia__page",
  "pricingCol": "billing-settings-module-scss-module__oym1ia__pricingCol",
  "pricingMiniLabel": "billing-settings-module-scss-module__oym1ia__pricingMiniLabel",
  "requiredMark": "billing-settings-module-scss-module__oym1ia__requiredMark",
  "rowActionBtn": "billing-settings-module-scss-module__oym1ia__rowActionBtn",
  "searchBar": "billing-settings-module-scss-module__oym1ia__searchBar",
  "searchIcon": "billing-settings-module-scss-module__oym1ia__searchIcon",
  "searchInput": "billing-settings-module-scss-module__oym1ia__searchInput",
  "searchLabel": "billing-settings-module-scss-module__oym1ia__searchLabel",
  "searchRow": "billing-settings-module-scss-module__oym1ia__searchRow",
  "suggestBtn": "billing-settings-module-scss-module__oym1ia__suggestBtn",
  "suggestList": "billing-settings-module-scss-module__oym1ia__suggestList",
  "table": "billing-settings-module-scss-module__oym1ia__table",
  "tableInner": "billing-settings-module-scss-module__oym1ia__tableInner",
  "tableScroll": "billing-settings-module-scss-module__oym1ia__tableScroll",
  "tdAction": "billing-settings-module-scss-module__oym1ia__tdAction",
  "tdActionEdgeShadow": "billing-settings-module-scss-module__oym1ia__tdActionEdgeShadow",
  "tdItem": "billing-settings-module-scss-module__oym1ia__tdItem",
  "tdMiddle": "billing-settings-module-scss-module__oym1ia__tdMiddle",
  "tdNum": "billing-settings-module-scss-module__oym1ia__tdNum",
  "tdSerial": "billing-settings-module-scss-module__oym1ia__tdSerial",
  "tdType": "billing-settings-module-scss-module__oym1ia__tdType",
  "thAction": "billing-settings-module-scss-module__oym1ia__thAction",
  "thActionEdgeShadow": "billing-settings-module-scss-module__oym1ia__thActionEdgeShadow",
  "thDisc": "billing-settings-module-scss-module__oym1ia__thDisc",
  "thGst": "billing-settings-module-scss-module__oym1ia__thGst",
  "thItem": "billing-settings-module-scss-module__oym1ia__thItem",
  "thPrice": "billing-settings-module-scss-module__oym1ia__thPrice",
  "thSerial": "billing-settings-module-scss-module__oym1ia__thSerial",
  "thTotal": "billing-settings-module-scss-module__oym1ia__thTotal",
  "thType": "billing-settings-module-scss-module__oym1ia__thType",
  "theadRow": "billing-settings-module-scss-module__oym1ia__theadRow",
  "toolbarRight": "billing-settings-module-scss-module__oym1ia__toolbarRight",
  "topActions": "billing-settings-module-scss-module__oym1ia__topActions",
  "topBar": "billing-settings-module-scss-module__oym1ia__topBar",
  "topBarMain": "billing-settings-module-scss-module__oym1ia__topBarMain",
  "topTitle": "billing-settings-module-scss-module__oym1ia__topTitle",
});
}),
"[project]/components/dental/AddDentalBillItemDrawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddDentalBillItemDrawer",
    ()=>AddDentalBillItemDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowDown2.js [app-client] (ecmascript) <export default as ArrowDown2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowUp2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp2$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/ArrowUp2.js [app-client] (ecmascript) <export default as ArrowUp2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$InfoCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/iconsax-reactjs/dist/esm/InfoCircle.js [app-client] (ecmascript) <export default as InfoCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$drawer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-drawer.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$shared$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/plan/plan-shared.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/button-system/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$TPButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/button-system/TPButton.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/tooltip.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/billing-catalog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/billing-catalog-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/billing-settings/billing-settings.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
function sanitizeDecimal(raw) {
    const cleaned = raw.replace(/[^\d.]/g, "");
    const firstDot = cleaned.indexOf(".");
    if (firstDot === -1) return cleaned;
    return cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, "");
}
/**
 * Tooltip copy shown next to the drawer title — mirrors the shared-catalog
 * explainer from the main billing settings drawer, but worded for the
 * dental exam / treatment plan surface where this drawer is launched.
 */ function DentalServiceHelpContent() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-[8px] text-[12px] leading-[1.45] text-tp-slate-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-semibold text-tp-slate-900",
                children: "Shared billing catalog"
            }, void 0, false, {
                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-tp-slate-600",
                children: "After you save, this name and price can be picked again in the dental exam, treatment plan, and billing."
            }, void 0, false, {
                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-[4px] pl-[2px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex gap-[6px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": true,
                                className: "mt-[5px] h-[4px] w-[4px] shrink-0 rounded-full bg-tp-slate-400"
                            }, void 0, false, {
                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-tp-slate-600",
                                children: [
                                    "Keep the name ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "font-semibold text-tp-slate-700",
                                        children: "short and easy to read"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                        lineNumber: 38,
                                        columnNumber: 27
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex gap-[6px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": true,
                                className: "mt-[5px] h-[4px] w-[4px] shrink-0 rounded-full bg-tp-slate-400"
                            }, void 0, false, {
                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-tp-slate-600",
                                children: [
                                    "Use ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "font-semibold text-tp-slate-700",
                                        children: "accurate pricing"
                                    }, void 0, false, {
                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                        lineNumber: 44,
                                        columnNumber: 17
                                    }, this),
                                    " so estimates stay consistent."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = DentalServiceHelpContent;
function AddDentalBillItemDrawer({ open, onOpenChange, initialName = "", onSaved }) {
    _s();
    const formId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const { addItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBillingCatalog"])();
    const [formName, setFormName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formPrice, setFormPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formCgst, setFormCgst] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formSgst, setFormSgst] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formDiscount, setFormDiscount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [formDiscountUnit, setFormDiscountUnit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("inr");
    const [formErrors, setFormErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        price: ""
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AddDentalBillItemDrawer.useEffect": ()=>{
            if (open) {
                setFormName(initialName.trim());
                setFormPrice("");
                setFormCgst("");
                setFormSgst("");
                setFormDiscount("");
                setFormDiscountUnit("inr");
                setFormErrors({
                    name: "",
                    price: ""
                });
            }
        }
    }["AddDentalBillItemDrawer.useEffect"], [
        open,
        initialName
    ]);
    const drawerPreviewTotal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AddDentalBillItemDrawer.useMemo[drawerPreviewTotal]": ()=>{
            const priceNum = Number(sanitizeDecimal(String(formPrice)));
            if (!Number.isFinite(priceNum) || priceNum <= 0) return null;
            const cgstPct = formCgst.trim() === "" ? 0 : Number(sanitizeDecimal(String(formCgst))) || 0;
            const sgstPct = formSgst.trim() === "" ? 0 : Number(sanitizeDecimal(String(formSgst))) || 0;
            const gstPct = cgstPct + sgstPct;
            const discountRaw = sanitizeDecimal(String(formDiscount));
            const discount = discountRaw === "" ? 0 : Number(discountRaw);
            if (!Number.isFinite(discount) || discount < 0) return null;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeBillingLineTotal"])(priceNum, discount, gstPct, formDiscountUnit);
        }
    }["AddDentalBillItemDrawer.useMemo[drawerPreviewTotal]"], [
        formPrice,
        formCgst,
        formSgst,
        formDiscount,
        formDiscountUnit
    ]);
    function handleSave() {
        const name = formName.trim();
        const priceNum = Number(sanitizeDecimal(String(formPrice)));
        const nextErrors = {
            name: "",
            price: ""
        };
        if (!name) nextErrors.name = "Enter a name to continue.";
        if (!Number.isFinite(priceNum) || priceNum <= 0) nextErrors.price = "Enter a valid price greater than zero.";
        if (nextErrors.name || nextErrors.price) {
            setFormErrors(nextErrors);
            return;
        }
        const cgstPct = formCgst.trim() === "" ? 0 : Number(sanitizeDecimal(String(formCgst))) || 0;
        const sgstPct = formSgst.trim() === "" ? 0 : Number(sanitizeDecimal(String(formSgst))) || 0;
        const gstPct = cgstPct + sgstPct;
        const discountRaw = sanitizeDecimal(String(formDiscount));
        const discount = discountRaw === "" ? 0 : Number(discountRaw);
        if (!Number.isFinite(discount) || discount < 0) return;
        const item = {
            id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `dent-${Date.now()}`,
            name,
            type: "dental",
            price: priceNum,
            priceUnit: "per_unit",
            discount,
            discountUnit: formDiscountUnit,
            cgstPct,
            sgstPct,
            gstPct
        };
        addItem(item);
        onSaved?.(item);
        onOpenChange(false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
        delayDuration: 200,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$drawer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPDrawer"], {
            open: open,
            onOpenChange: onOpenChange,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$drawer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPDrawerContent"], {
                side: "right",
                size: "lg",
                overlayClassName: "!z-[100]",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("!gap-0 !p-0 !rounded-none !z-[100]", __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerSheet),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$plan$2f$plan$2d$shared$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DrawerHeader"], {
                        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].billingDrawerTitleRow,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Add dental service"
                                }, void 0, false, {
                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                    lineNumber: 147,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoIconBtn,
                                                "aria-label": "About dental services in the catalog",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$InfoCircle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoCircle$3e$__["InfoCircle"], {
                                                    size: 16,
                                                    variant: "Linear",
                                                    color: "var(--tp-slate-500)"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 23
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                lineNumber: 150,
                                                columnNumber: 21
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 149,
                                            columnNumber: 19
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                            side: "bottom",
                                            align: "start",
                                            className: "max-w-[320px] rounded-[12px] p-[12px]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DentalServiceHelpContent, {}, void 0, false, {
                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                lineNumber: 155,
                                                columnNumber: 21
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 154,
                                            columnNumber: 19
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                    lineNumber: 148,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                            lineNumber: 146,
                            columnNumber: 15
                        }, void 0),
                        titleClassName: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].billingDrawerTitle,
                        onClose: ()=>onOpenChange(false),
                        action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$TPButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPButton"], {
                            type: "button",
                            variant: "solid",
                            theme: "primary",
                            size: "sm",
                            surface: "light",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerSaveCompact,
                            onClick: handleSave,
                            children: "Save"
                        }, void 0, false, {
                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                            lineNumber: 163,
                            columnNumber: 15
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerBody,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            id: formId,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
                            onSubmit: (e)=>{
                                e.preventDefault();
                                handleSave();
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].field,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                            htmlFor: `${formId}-name`,
                                            children: [
                                                "Dental service name",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].requiredMark,
                                                    "aria-hidden": true,
                                                    children: [
                                                        " ",
                                                        "*"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 186,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: `${formId}-name`,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerInput, formErrors.name && __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerInputError),
                                            value: formName,
                                            onChange: (e)=>{
                                                setFormName(e.target.value);
                                                if (formErrors.name) setFormErrors((er)=>({
                                                        ...er,
                                                        name: ""
                                                    }));
                                            },
                                            placeholder: "e.g., Ceramic crown",
                                            autoFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 193,
                                            columnNumber: 17
                                        }, this),
                                        formErrors.name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldError,
                                            children: formErrors.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 204,
                                            columnNumber: 36
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                    lineNumber: 185,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].field,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                            htmlFor: `${formId}-price`,
                                            children: [
                                                "Price (₹)",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].requiredMark,
                                                    "aria-hidden": true,
                                                    children: [
                                                        " ",
                                                        "*"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 208,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputAffix, formErrors.price && __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputAffixError),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputAffixPrefix,
                                                    "aria-hidden": true,
                                                    children: "₹"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: `${formId}-price`,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerInputAffixed,
                                                    inputMode: "decimal",
                                                    value: formPrice,
                                                    onChange: (e)=>{
                                                        setFormPrice(sanitizeDecimal(e.target.value));
                                                        if (formErrors.price) setFormErrors((er)=>({
                                                                ...er,
                                                                price: ""
                                                            }));
                                                    },
                                                    placeholder: "0"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 215,
                                            columnNumber: 17
                                        }, this),
                                        formErrors.price ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldError,
                                            children: formErrors.price
                                        }, void 0, false, {
                                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                            lineNumber: 231,
                                            columnNumber: 37
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                    lineNumber: 207,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].field,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerPricingTriple,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pricingCol,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pricingMiniLabel,
                                                        htmlFor: `${formId}-cgst`,
                                                        children: "CGST (%)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputAffix,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                id: `${formId}-cgst`,
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerInputAffixedGst,
                                                                inputMode: "decimal",
                                                                value: formCgst,
                                                                onChange: (e)=>setFormCgst(sanitizeDecimal(e.target.value)),
                                                                placeholder: "0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                lineNumber: 241,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputAffixSuffix,
                                                                "aria-hidden": true,
                                                                children: "%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                lineNumber: 249,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                lineNumber: 236,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pricingCol,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pricingMiniLabel,
                                                        htmlFor: `${formId}-sgst`,
                                                        children: "SGST (%)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputAffix,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                id: `${formId}-sgst`,
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerInputAffixedGst,
                                                                inputMode: "decimal",
                                                                value: formSgst,
                                                                onChange: (e)=>setFormSgst(sanitizeDecimal(e.target.value)),
                                                                placeholder: "0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                lineNumber: 259,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputAffixSuffix,
                                                                "aria-hidden": true,
                                                                children: "%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                lineNumber: 267,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                        lineNumber: 258,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                lineNumber: 254,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pricingCol,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pricingMiniLabel,
                                                        htmlFor: `${formId}-disc`,
                                                        children: "Discount"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].discountInline,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                id: `${formId}-disc`,
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].discountInlineInput,
                                                                inputMode: "decimal",
                                                                value: formDiscount,
                                                                onChange: (e)=>setFormDiscount(sanitizeDecimal(e.target.value)),
                                                                placeholder: "0",
                                                                "aria-label": formDiscountUnit === "percent" ? "Discount percent" : "Discount amount"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                lineNumber: 277,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onMouseDown: (e)=>e.preventDefault(),
                                                                onClick: ()=>setFormDiscountUnit(formDiscountUnit === "inr" ? "percent" : "inr"),
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].discountUnitSwitch,
                                                                title: formDiscountUnit === "inr" ? "Switch to %" : "Switch to ₹",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: formDiscountUnit === "inr" ? "₹" : "%"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                        lineNumber: 293,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].discountUnitChevrons,
                                                                        "aria-hidden": true,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowUp2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp2$3e$__["ArrowUp2"], {
                                                                                size: 8,
                                                                                color: "currentColor",
                                                                                variant: "Bold"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                                lineNumber: 295,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$iconsax$2d$reactjs$2f$dist$2f$esm$2f$ArrowDown2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown2$3e$__["ArrowDown2"], {
                                                                                size: 8,
                                                                                color: "currentColor",
                                                                                variant: "Bold"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                                lineNumber: 296,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                        lineNumber: 294,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                                lineNumber: 286,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                        lineNumber: 276,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                                lineNumber: 272,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                        lineNumber: 235,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                    lineNumber: 234,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                            lineNumber: 177,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerTotalFooter,
                        "aria-live": "polite",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerTotalLabel,
                                children: "Total amount (incl. GST)"
                            }, void 0, false, {
                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                lineNumber: 306,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$billing$2d$settings$2f$billing$2d$settings$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].drawerTotalValue,
                                children: drawerPreviewTotal === null ? "—" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBillingInr"])(drawerPreviewTotal)
                            }, void 0, false, {
                                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                                lineNumber: 307,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                        lineNumber: 305,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
                lineNumber: 138,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
            lineNumber: 137,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/dental/AddDentalBillItemDrawer.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_s(AddDentalBillItemDrawer, "gDhrCfSwK5Ty096G+LwZh3U0hj0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBillingCatalog"]
    ];
});
_c1 = AddDentalBillItemDrawer;
var _c, _c1;
__turbopack_context__.k.register(_c, "DentalServiceHelpContent");
__turbopack_context__.k.register(_c1, "AddDentalBillItemDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dental/examination/ExaminationTab.jsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/components/dental/examination/ExaminationTab.jsx'\n\nExpected ',', got ';'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/components/tp-rxpad/RxPadPage.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "carousel": "RxPadPage-module-scss-module__95k-na__carousel",
  "panelClip": "RxPadPage-module-scss-module__95k-na__panelClip",
  "panelScroll": "RxPadPage-module-scss-module__95k-na__panelScroll",
  "tabBar": "RxPadPage-module-scss-module__95k-na__tabBar",
  "tabBtn": "RxPadPage-module-scss-module__95k-na__tabBtn",
  "tabBtnActive": "RxPadPage-module-scss-module__95k-na__tabBtnActive",
  "tabBtnInactive": "RxPadPage-module-scss-module__95k-na__tabBtnInactive",
  "tabInner": "RxPadPage-module-scss-module__95k-na__tabInner",
  "tabUnderline": "RxPadPage-module-scss-module__95k-na__tabUnderline",
  "topNav": "RxPadPage-module-scss-module__95k-na__topNav",
  "track": "RxPadPage-module-scss-module__95k-na__track",
});
}),
"[project]/components/tp-rxpad/RxPadPage.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RxPadPage",
    ()=>RxPadPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPad$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/rx/rxpad/RxPad.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$ExaminationTab$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/dental/examination/ExaminationTab.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/tp-ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$rxpad$2d$secondary$2d$sidebar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-rxpad-secondary-sidebar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$rxpad$2d$shell$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-rxpad-shell.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$rxpad$2d$top$2d$nav$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/tp-rxpad-top-nav.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$chrome$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/rxpad-chrome-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/RxPadPage.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function ClipboardTextLinear({ size = 20, color = "currentColor" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 12.2h7M8 16.2h4.38",
                stroke: color,
                strokeWidth: "1.5",
                strokeMiterlimit: "10",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 6h4c2 0 2-1 2-2 0-2-1-2-2-2h-4C9 2 8 2 8 4s1 2 2 2Z",
                stroke: color,
                strokeWidth: "1.5",
                strokeMiterlimit: "10",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 4.02c3.33.18 5 1.43 5 5.98v6c0 4-1 6-6 6H9c-5 0-6-2-6-6v-6c0-4.56 1.67-5.8 5-5.98",
                stroke: color,
                strokeWidth: "1.5",
                strokeMiterlimit: "10",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = ClipboardTextLinear;
function ClipboardTextBold({ size = 20, color = "currentColor" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: color,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                opacity: "0.4",
                d: "M16.24 3.65H7.76c-2.47 0-4.47 2.01-4.47 4.47v9.41c0 2.46 2.01 4.47 4.47 4.47h8.47c2.47 0 4.47-2.01 4.47-4.47V8.12c.01-2.47-1.99-4.47-4.46-4.47Z"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14.35 2H9.65c-1.04 0-1.89.84-1.89 1.88v.94c0 1.04.84 1.88 1.88 1.88h4.71c1.04 0 1.88-.84 1.88-1.88v-.94C16.24 2.84 15.39 2 14.35 2Z"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M15 12.95H8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h7c.41 0 .75.34.75.75s-.34.75-.75.75ZM12.38 16.95H8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4.38c.41 0 .75.34.75.75s-.34.75-.75.75Z"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c1 = ClipboardTextBold;
function ToothIconLinear({ size = 20, color = "currentColor" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14.08 8.09c-1.52 1.28-2.9.95-4.18 0",
                stroke: color,
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M21.09 5.02c-1.44-2.4-4.31-3.54-7.01-2.79l-1.66.47c-.28.08-.59.08-.87 0l-1.66-.47c-2.7-.76-5.57.37-7.01 2.79-.58.97-.89 2.08-.89 3.21v.12c0 3.86.78 7.67 2.29 11.22l.39.92c.39.92 1.29 1.51 2.29 1.51 1.02 0 1.93-.62 2.31-1.57l1.19-2.99c.25-.63.85-1.04 1.52-1.04.67 0 1.28.41 1.52 1.04l1.19 2.99c.38.95 1.29 1.57 2.31 1.57 1 0 1.9-.6 2.29-1.51l.39-.92c1.51-3.55 2.29-7.37 2.29-11.22v-.12c0-1.13-.31-2.24-.89-3.21z",
                stroke: color,
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c2 = ToothIconLinear;
function ToothIconBold({ size = 20, color = "currentColor" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: color,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12.06 9.68c-.85 0-1.72-.33-2.61-.99a.75.75 0 0 1 1.05-1.05c1.22.91 2.19.92 3.24.03a.75.75 0 0 1 1.09.09.75.75 0 0 1-.09 1.06c-.81.68-1.64 1.02-2.5 1.02l-.18-.16z"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                opacity: "0.4",
                d: "M21.09 5.02c-1.44-2.4-4.31-3.54-7.01-2.79l-1.66.47c-.28.08-.59.08-.87 0l-1.66-.47c-2.7-.76-5.57.37-7.01 2.79-.58.97-.89 2.08-.89 3.21v.12c0 3.86.78 7.67 2.29 11.22l.39.92c.39.92 1.29 1.51 2.29 1.51 1.02 0 1.93-.62 2.31-1.57l1.19-2.99c.25-.63.85-1.04 1.52-1.04.67 0 1.28.41 1.52 1.04l1.19 2.99c.38.95 1.29 1.57 2.31 1.57 1 0 1.9-.6 2.29-1.51l.39-.92c1.51-3.55 2.29-7.37 2.29-11.22v-.12c0-1.13-.31-2.24-.89-3.21z"
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_c3 = ToothIconBold;
const TAB_IDS = [
    "base",
    "dental"
];
const GESTURE_LOCK_THRESHOLD = 8;
const SNAP_VELOCITY_THRESHOLD = 0.15;
const SNAP_DISTANCE_FRACTION = 0.08;
function RxPadInner() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const patientId = searchParams?.get("patientId") ?? "apt-1";
    const returnTo = searchParams?.get("returnTo");
    const handleRxBack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RxPadInner.useCallback[handleRxBack]": ()=>{
            if (returnTo && returnTo.startsWith("/") && !returnTo.startsWith("//")) {
                router.push(returnTo);
                return;
            }
            router.push("/appointments");
        }
    }["RxPadInner.useCallback[handleRxBack]"], [
        returnTo,
        router
    ]);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("base");
    const { setRxPadExamTab } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$chrome$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRxPadChrome"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RxPadInner.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const saved = window.localStorage.getItem("rxpad.active-tab");
            if (saved === "base" || saved === "dental") {
                setActiveTab(saved);
            }
        }
    }["RxPadInner.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RxPadInner.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            window.localStorage.setItem("rxpad.active-tab", activeTab);
        }
    }["RxPadInner.useEffect"], [
        activeTab
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RxPadInner.useEffect": ()=>{
            setRxPadExamTab(activeTab === "dental" ? "dental" : "base");
        }
    }["RxPadInner.useEffect"], [
        activeTab,
        setRxPadExamTab
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RxPadInner.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const openDentalExam = {
                "RxPadInner.useEffect.openDentalExam": ()=>{
                    setActiveTab("dental");
                    setRxPadExamTab("dental");
                }
            }["RxPadInner.useEffect.openDentalExam"];
            window.addEventListener("tp:open-dental-exam", openDentalExam);
            return ({
                "RxPadInner.useEffect": ()=>window.removeEventListener("tp:open-dental-exam", openDentalExam)
            })["RxPadInner.useEffect"];
        }
    }["RxPadInner.useEffect"], [
        setRxPadExamTab
    ]);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const trackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const gestureRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [dragOffset, setDragOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const activeIndex = TAB_IDS.indexOf(activeTab);
    const onPointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RxPadInner.useCallback[onPointerDown]": (e)=>{
            if (e.button !== 0) return;
            const tag = e.target.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON" || tag === "CANVAS") return;
            gestureRef.current = {
                pointerId: e.pointerId,
                startX: e.clientX,
                startY: e.clientY,
                startTime: Date.now(),
                locked: null,
                currentDx: 0
            };
        }
    }["RxPadInner.useCallback[onPointerDown]"], []);
    const onPointerMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RxPadInner.useCallback[onPointerMove]": (e)=>{
            const g = gestureRef.current;
            if (!g || g.pointerId !== e.pointerId) return;
            const dx = e.clientX - g.startX;
            const dy = e.clientY - g.startY;
            if (!g.locked) {
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < GESTURE_LOCK_THRESHOLD) return;
                if (Math.abs(dx) > Math.abs(dy) * 1.2) {
                    g.locked = "horizontal";
                    setIsDragging(true);
                    try {
                        e.target.setPointerCapture(e.pointerId);
                    } catch  {
                    /* noop */ }
                } else {
                    g.locked = "vertical";
                    return;
                }
            }
            if (g.locked !== "horizontal") return;
            e.preventDefault();
            g.currentDx = dx;
            const atLeftEdge = activeIndex === 0 && dx > 0;
            const atRightEdge = activeIndex === TAB_IDS.length - 1 && dx < 0;
            const dampened = atLeftEdge || atRightEdge ? dx * 0.2 : dx;
            setDragOffset(dampened);
        }
    }["RxPadInner.useCallback[onPointerMove]"], [
        activeIndex
    ]);
    const onPointerUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RxPadInner.useCallback[onPointerUp]": (e)=>{
            const g = gestureRef.current;
            if (!g || g.pointerId !== e.pointerId) return;
            gestureRef.current = null;
            if (g.locked !== "horizontal") {
                setIsDragging(false);
                setDragOffset(0);
                return;
            }
            try {
                e.target.releasePointerCapture(e.pointerId);
            } catch  {
            /* noop */ }
            const containerWidth = containerRef.current?.offsetWidth ?? 800;
            const dx = g.currentDx;
            const elapsed = Math.max(1, Date.now() - g.startTime);
            const velocity = Math.abs(dx) / elapsed;
            const passedDistance = Math.abs(dx) > containerWidth * SNAP_DISTANCE_FRACTION;
            const fastFlick = velocity > SNAP_VELOCITY_THRESHOLD && Math.abs(dx) > 30;
            if (passedDistance || fastFlick) {
                if (dx < 0 && activeIndex < TAB_IDS.length - 1) {
                    setActiveTab(TAB_IDS[activeIndex + 1]);
                } else if (dx > 0 && activeIndex > 0) {
                    setActiveTab(TAB_IDS[activeIndex - 1]);
                }
            }
            setIsDragging(false);
            setDragOffset(0);
        }
    }["RxPadInner.useCallback[onPointerUp]"], [
        activeIndex
    ]);
    const onPointerCancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RxPadInner.useCallback[onPointerCancel]": (e)=>{
            if (gestureRef.current?.pointerId === e.pointerId) {
                gestureRef.current = null;
                setIsDragging(false);
                setDragOffset(0);
            }
        }
    }["RxPadInner.useCallback[onPointerCancel]"], []);
    const onContextMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RxPadInner.useCallback[onContextMenu]": (e)=>{
            if (isDragging) e.preventDefault();
        }
    }["RxPadInner.useCallback[onContextMenu]"], [
        isDragging
    ]);
    const panelPct = 100 / TAB_IDS.length;
    const trackTranslateX = isDragging ? `calc(${-activeIndex * panelPct}% + ${dragOffset}px)` : `${-activeIndex * panelPct}%`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$rxpad$2d$shell$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPRxPadShell"], {
        topNav: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$rxpad$2d$top$2d$nav$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPRxPadTopNav"], {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].topNav,
            patientId: patientId,
            onBack: handleRxBack
        }, void 0, false, {
            fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
            lineNumber: 249,
            columnNumber: 11
        }, void 0),
        sidebar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$tp$2d$rxpad$2d$secondary$2d$sidebar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPRxPadSecondarySidebar"], {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
            lineNumber: 255,
            columnNumber: 18
        }, void 0),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabBar,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabInner,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setActiveTab("base"),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabBtn, activeTab === "base" ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabBtnActive : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabBtnInactive),
                            "aria-pressed": activeTab === "base",
                            children: [
                                activeTab === "base" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClipboardTextBold, {
                                    size: 20,
                                    color: "var(--tp-blue-600)"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                                    lineNumber: 269,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClipboardTextLinear, {
                                    size: 20,
                                    color: "var(--tp-slate-400)"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                                    lineNumber: 271,
                                    columnNumber: 17
                                }, this),
                                "Clinical Examination",
                                activeTab === "base" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabUnderline
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                                    lineNumber: 274,
                                    columnNumber: 39
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                            lineNumber: 259,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setActiveTab("dental"),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabBtn, activeTab === "dental" ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabBtnActive : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabBtnInactive),
                            "aria-pressed": activeTab === "dental",
                            children: [
                                activeTab === "dental" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToothIconBold, {
                                    size: 20,
                                    color: "var(--tp-blue-600)"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                                    lineNumber: 286,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToothIconLinear, {
                                    size: 20,
                                    color: "var(--tp-slate-400)"
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                                    lineNumber: 288,
                                    columnNumber: 17
                                }, this),
                                "Dental Examination",
                                activeTab === "dental" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabUnderline
                                }, void 0, false, {
                                    fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                                    lineNumber: 291,
                                    columnNumber: 41
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                            lineNumber: 276,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                    lineNumber: 258,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                lineNumber: 257,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].carousel,
                onPointerDown: onPointerDown,
                onPointerMove: onPointerMove,
                onPointerUp: onPointerUp,
                onPointerCancel: onPointerCancel,
                onContextMenu: onContextMenu,
                style: {
                    touchAction: "pan-y"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: trackRef,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].track,
                    style: {
                        width: `${TAB_IDS.length * 100}%`,
                        transform: `translateX(${trackTranslateX})`,
                        transition: isDragging ? "none" : "transform 580ms cubic-bezier(0.25, 0.8, 0.25, 1)",
                        willChange: isDragging ? "transform" : "auto"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].panelScroll,
                            style: {
                                width: `${100 / TAB_IDS.length}%`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$rx$2f$rxpad$2f$RxPad$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RxPad"], {}, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                                lineNumber: 316,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                            lineNumber: 315,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$RxPadPage$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].panelClip,
                            style: {
                                width: `${100 / TAB_IDS.length}%`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$dental$2f$examination$2f$ExaminationTab$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExaminationTab"], {
                                patientId: patientId
                            }, void 0, false, {
                                fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                                lineNumber: 319,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                            lineNumber: 318,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                    lineNumber: 305,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
                lineNumber: 295,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
        lineNumber: 247,
        columnNumber: 5
    }, this);
}
_s(RxPadInner, "anmLFCk779q347YpzEh6jhmIfo8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$chrome$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRxPadChrome"]
    ];
});
_c4 = RxPadInner;
function RxPadPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RxPadInner, {}, void 0, false, {
            fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
            lineNumber: 330,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/tp-rxpad/RxPadPage.jsx",
        lineNumber: 329,
        columnNumber: 5
    }, this);
}
_c5 = RxPadPage;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "ClipboardTextLinear");
__turbopack_context__.k.register(_c1, "ClipboardTextBold");
__turbopack_context__.k.register(_c2, "ToothIconLinear");
__turbopack_context__.k.register(_c3, "ToothIconBold");
__turbopack_context__.k.register(_c4, "RxPadInner");
__turbopack_context__.k.register(_c5, "RxPadPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_9d6c4ea3._.js.map