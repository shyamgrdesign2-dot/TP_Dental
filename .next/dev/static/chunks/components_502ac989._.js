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
"[project]/components/dental/examination/ExaminationTab.jsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/components/dental/examination/ExaminationTab.jsx'\n\nExpression expected");
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

//# sourceMappingURL=components_502ac989._.js.map