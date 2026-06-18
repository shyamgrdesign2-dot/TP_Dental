(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/tp-mui-theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tpTheme",
    ()=>tpTheme
]);
/**
 * TatvaPractice MUI Theme
 *
 * Full theme customization wrapping Material UI with TP foundational tokens.
 * Architecture: MUI Base → TP Theme Layer → TP Wrapped Components
 *
 * @see lib/design-tokens.ts for token definitions
 * @see https://mui.com/material-ui/customization/theming/
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/createTheme.js [app-client] (ecmascript) <export default as createTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/system/esm/colorManipulator/colorManipulator.js [app-client] (ecmascript)");
;
// ─── Color palette from design tokens ───
const tpBlue = {
    50: "#EEEEFF",
    100: "#D8D8FA",
    200: "#B5B4F2",
    300: "#8E8DE8",
    400: "#6C6BDE",
    500: "#4B4AD5",
    600: "#3C3BB5",
    700: "#2E2D96",
    800: "#212077",
    900: "#161558"
};
const tpSlate = {
    0: "#FFFFFF",
    50: "#FAFAFB",
    100: "#F1F1F5",
    200: "#E2E2EA",
    300: "#D0D5DD",
    400: "#A2A2A8",
    500: "#717179",
    600: "#545460",
    700: "#454551",
    800: "#2C2C35",
    900: "#171725"
};
const tpViolet = {
    500: "#A461D8",
    600: "#8A4DBB"
};
const tpSuccess = {
    500: "#10B981",
    600: "#059669"
};
const tpWarning = {
    500: "#F59E0B",
    600: "#D97706"
};
const tpError = {
    500: "#E11D48",
    600: "#C8102E"
};
// ─── Shadows from design-tokens shadowScale ───
const shadows = [
    "none",
    "0 1px 2px 0 rgba(23,23,37,0.04)",
    "0 1px 3px 0 rgba(23,23,37,0.08), 0 1px 2px -1px rgba(23,23,37,0.06)",
    "0 4px 8px -2px rgba(23,23,37,0.08), 0 2px 4px -2px rgba(23,23,37,0.06)",
    "0 12px 24px -4px rgba(23,23,37,0.08), 0 4px 8px -4px rgba(23,23,37,0.04)",
    "0 20px 40px -8px rgba(23,23,37,0.12), 0 8px 16px -6px rgba(23,23,37,0.06)",
    "0 32px 64px -12px rgba(23,23,37,0.20)",
    "0 0 0 3px #B5B4F2",
    "0 0 0 3px #FDA4AF",
    "0 0 0 3px #D0D5DD",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none"
];
const tpTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
    palette: {
        mode: "light",
        primary: {
            main: tpBlue[500],
            light: tpBlue[300],
            dark: tpBlue[700],
            contrastText: tpSlate[0]
        },
        secondary: {
            main: tpViolet[500],
            light: "#C89FE7",
            dark: tpViolet[600],
            contrastText: tpSlate[0]
        },
        success: {
            main: tpSuccess[500],
            light: "#6EE7B7",
            dark: tpSuccess[600]
        },
        warning: {
            main: tpWarning[500],
            light: "#FCD34D",
            dark: tpWarning[600]
        },
        error: {
            main: tpError[500],
            light: "#FDA4AF",
            dark: tpError[600]
        },
        background: {
            default: tpSlate[100],
            paper: tpSlate[0]
        },
        text: {
            primary: tpSlate[900],
            secondary: tpSlate[700],
            disabled: tpSlate[400]
        },
        divider: tpSlate[200],
        action: {
            active: tpSlate[500],
            hover: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(tpBlue[500], 0.08),
            selected: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(tpBlue[500], 0.12),
            disabled: tpSlate[400],
            disabledBackground: tpSlate[100]
        }
    },
    typography: {
        fontFamily: 'Inter, Mulish, -apple-system, BlinkMacSystemFont, sans-serif',
        h1: {
            fontFamily: "Mulish, var(--font-heading), sans-serif",
            fontWeight: 700,
            fontSize: "2.25rem",
            lineHeight: 1.22,
            letterSpacing: "-0.02em"
        },
        h2: {
            fontFamily: "Mulish, var(--font-heading), sans-serif",
            fontWeight: 600,
            fontSize: "1.875rem",
            lineHeight: 1.27,
            letterSpacing: "-0.01em"
        },
        h3: {
            fontFamily: "Mulish, var(--font-heading), sans-serif",
            fontWeight: 600,
            fontSize: "1.5rem",
            lineHeight: 1.33
        },
        h4: {
            fontFamily: "Mulish, var(--font-heading), sans-serif",
            fontWeight: 600,
            fontSize: "1.25rem",
            lineHeight: 1.4
        },
        h5: {
            fontFamily: "Mulish, var(--font-heading), sans-serif",
            fontWeight: 600,
            fontSize: "1rem",
            lineHeight: 1.5
        },
        h6: {
            fontFamily: "Mulish, var(--font-heading), sans-serif",
            fontWeight: 600,
            fontSize: "0.875rem",
            lineHeight: 1.43,
            letterSpacing: "0.01em"
        },
        body1: {
            fontFamily: "Inter, sans-serif",
            fontSize: "1rem",
            lineHeight: 1.5
        },
        body2: {
            fontFamily: "Inter, sans-serif",
            fontSize: "0.875rem",
            lineHeight: 1.43
        },
        button: {
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: "0.875rem",
            lineHeight: 1.43
        },
        caption: {
            fontFamily: "Inter, sans-serif",
            fontSize: "0.75rem",
            fontWeight: 500,
            lineHeight: 1.33,
            letterSpacing: "0.01em"
        }
    },
    shape: {
        borderRadius: 10
    },
    shadows,
    spacing: 8,
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: "Inter, var(--font-sans), sans-serif"
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                disableRipple: false
            },
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    padding: "8px 14px",
                    minHeight: 42
                },
                contained: {
                    "&:hover": {
                        backgroundColor: tpBlue[600]
                    },
                    "&:active": {
                        backgroundColor: tpBlue[700]
                    }
                },
                outlined: {
                    borderWidth: 1.5,
                    "&:hover": {
                        borderWidth: 1.5,
                        backgroundColor: tpBlue[50]
                    }
                },
                sizeSmall: {
                    minHeight: 36,
                    padding: "6px 12px",
                    fontSize: "0.8125rem"
                },
                sizeLarge: {
                    minHeight: 48,
                    padding: "10px 20px"
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(tpBlue[500], 0.08)
                    }
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
                size: "medium"
            },
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 8,
                        backgroundColor: tpSlate[0],
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: tpSlate[300]
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderWidth: 2,
                            borderColor: tpBlue[500],
                            boxShadow: "0 0 0 3px rgba(75,74,213,0.2)"
                        },
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                            borderColor: tpError[500]
                        }
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    height: 42,
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: tpSlate[200]
                    }
                },
                sizeSmall: {
                    height: 36
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontSize: "0.875rem"
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: shadows[2],
                    border: `1px solid ${tpSlate[200]}`,
                    "&:hover": {
                        boxShadow: shadows[3]
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: `1px solid ${tpSlate[200]}`,
                    boxShadow: shadows[2]
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    fontWeight: 500,
                    fontSize: "0.75rem"
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 20,
                    boxShadow: shadows[5],
                    border: `1px solid ${tpSlate[200]}`
                }
            }
        },
        MuiModal: {
            styleOverrides: {
                backdrop: {
                    backgroundColor: "rgba(23,23,37,0.5)"
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: tpBlue[500],
                    height: 3,
                    borderRadius: "3px 3px 0 0"
                },
                root: {
                    "& .MuiTab-root": {
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "0.875rem"
                    },
                    "& .Mui-selected": {
                        color: tpBlue[500]
                    }
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: "none"
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    color: tpSlate[400],
                    "&.Mui-checked": {
                        color: tpBlue[500]
                    },
                    "&.Mui-focusVisible": {
                        borderRadius: 4,
                        boxShadow: `0 0 0 3px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(tpBlue[500], 0.2)}`
                    }
                }
            }
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: tpSlate[400],
                    "&.Mui-checked": {
                        color: tpBlue[500]
                    }
                }
            }
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    "& .MuiSwitch-switchBase.Mui-checked": {
                        color: tpBlue[500]
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: tpBlue[500]
                    }
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: 8
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: tpBlue[50]
                    },
                    "&.Mui-selected": {
                        backgroundColor: tpBlue[50],
                        "&:hover": {
                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(tpBlue[500], 0.12)
                        }
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottomColor: tpSlate[200],
                    fontSize: "0.875rem"
                },
                head: {
                    fontWeight: 600,
                    backgroundColor: tpSlate[50],
                    color: tpSlate[900]
                }
            }
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: tpSlate[50]
                    }
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 500
                },
                standardSuccess: {
                    backgroundColor: "#ECFDF5",
                    color: "#047857"
                },
                standardWarning: {
                    backgroundColor: "#FFFBEB",
                    color: "#B45309"
                },
                standardError: {
                    backgroundColor: "#FFF1F2",
                    color: "#9F1239"
                },
                standardInfo: {
                    backgroundColor: tpBlue[50],
                    color: tpBlue[700]
                }
            }
        },
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    "& .MuiPaper-root": {
                        borderRadius: 8,
                        boxShadow: shadows[3]
                    }
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 6,
                    fontSize: "0.75rem",
                    fontWeight: 500
                }
            }
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    fontWeight: 600,
                    fontSize: "0.625rem"
                }
            }
        },
        MuiProgress: {
            styleOverrides: {
                root: {
                    borderRadius: 9999,
                    backgroundColor: tpSlate[200]
                },
                bar: {
                    borderRadius: 9999
                }
            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderRadius: 9999,
                    backgroundColor: tpSlate[200]
                },
                bar: {
                    borderRadius: 9999
                }
            }
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    backgroundColor: tpSlate[200]
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: tpBlue[200],
                    color: tpBlue[700],
                    fontWeight: 600
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: tpSlate[200]
                }
            }
        },
        MuiBreadcrumbs: {
            styleOverrides: {
                root: {
                    "& .MuiLink-root": {
                        color: tpBlue[500],
                        fontWeight: 500,
                        "&:hover": {
                            color: tpBlue[600],
                            textDecoration: "underline"
                        }
                    }
                }
            }
        },
        MuiPagination: {
            styleOverrides: {
                root: {
                    "& .MuiPaginationItem-root": {
                        fontWeight: 500,
                        "&.Mui-selected": {
                            backgroundColor: tpBlue[500],
                            color: tpSlate[0]
                        }
                    }
                }
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    border: `1px solid ${tpSlate[200]}`,
                    "&:before": {
                        display: "none"
                    },
                    "&.Mui-expanded": {
                        margin: 0
                    }
                }
            }
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontSize: "0.875rem"
                }
            }
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    borderRadius: 12
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: tpBlue[500],
                    "& .MuiSlider-thumb": {
                        "&:hover, &.Mui-focusVisible": {
                            boxShadow: `0 0 0 6px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(tpBlue[500], 0.16)}`
                        }
                    }
                }
            }
        }
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/appointment-patients.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Single source of truth for queue / RxPad / patient detail identities.
 * Keys match `patientId` in URLs (apt-* from appointments).
 */ __turbopack_context__.s([
    "APPOINTMENT_PATIENTS",
    ()=>APPOINTMENT_PATIENTS,
    "getAppointmentPatient",
    ()=>getAppointmentPatient
]);
const APPOINTMENT_PATIENTS = {
    "apt-new": {
        name: "Ria Kapoor",
        genderLabel: "Female",
        genderShort: "F",
        age: 24,
        dob: "14 Jun 2002",
        mobile: "+91-9812000123",
        patientCode: "PAT-NEW-001",
        bloodGroup: "O+"
    },
    "apt-1": {
        name: "Shyam GR",
        genderLabel: "Male",
        genderShort: "M",
        age: 35,
        dob: "08 Mar 1991",
        mobile: "+91-9812734567",
        patientCode: "PAT0061",
        bloodGroup: "B+"
    },
    "apt-2": {
        name: "Sita Menon",
        genderLabel: "Female",
        genderShort: "F",
        age: 30,
        dob: "22 Jan 1996",
        mobile: "+91-9988776655",
        patientCode: "PAT0063",
        bloodGroup: "A+"
    },
    "apt-3": {
        name: "Vikram Singh",
        genderLabel: "Male",
        genderShort: "M",
        age: 42,
        dob: "03 Nov 1983",
        mobile: "+91-9001234567",
        patientCode: "PAT0064",
        bloodGroup: "AB+"
    },
    "apt-4": {
        name: "Nisha Rao",
        genderLabel: "Female",
        genderShort: "F",
        age: 26,
        dob: "19 May 2000",
        mobile: "+91-9876543210",
        patientCode: "PAT0065",
        bloodGroup: "A-"
    },
    "apt-5": {
        name: "Rahul Verma",
        genderLabel: "Male",
        genderShort: "M",
        age: 9,
        dob: "10 Aug 2016",
        mobile: "+91-9123456789",
        patientCode: "PAT0066",
        bloodGroup: "B+"
    },
    "apt-6": {
        name: "Anjali Patel",
        genderLabel: "Female",
        genderShort: "F",
        age: 28,
        dob: "02 Apr 1998",
        mobile: "+91-9988771122",
        patientCode: "PAT0067",
        bloodGroup: "A+"
    }
};
const FALLBACK = APPOINTMENT_PATIENTS["apt-1"];
function getAppointmentPatient(patientId) {
    if (!patientId) return FALLBACK;
    return APPOINTMENT_PATIENTS[patientId] ?? FALLBACK;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/button-system/tokens.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * TatvaPractice Button System — Token Mapping
 *
 * Maps design tokens (TP.interactive.*) to button theme/size/state.
 * All styling MUST reference these tokens. No hex literals in components.
 *
 * MUI-style token aliases:
 *   color.primary   → theme "primary"
 *   color.neutral   → theme "neutral"
 *   color.error     → theme "error"
 *   variant.contained → solid
 *   variant.outlined  → outline
 *   variant.text      → ghost
 *   variant.link      → link
 *   state.loading     → loading
 *   surface.dark      → surface "dark"
 */ __turbopack_context__.s([
    "BUTTON_SIZE_TOKENS",
    ()=>BUTTON_SIZE_TOKENS,
    "getButtonTokens",
    ()=>getButtonTokens
]);
function getButtonTokens(theme, surface) {
    // Light surface tokens (from design-tokens interactive section)
    const primary = {
        bg: "#4B4AD5",
        text: "#FFFFFF",
        border: "#4B4AD5",
        hover: "#3C3BB5",
        active: "#2E2D96",
        focusRing: "#B5B4F2",
        disabledBg: "#E2E2EA",
        disabledText: "#A2A2A8",
        disabledBorder: "#E2E2EA"
    };
    const neutral = {
        bg: "#F1F1F5",
        text: "#454551",
        border: "#D0D5DD",
        hover: "#E2E2EA",
        active: "#D0D5DD",
        focusRing: "#D0D5DD",
        disabledBg: "#FAFAFB",
        disabledText: "#A2A2A8",
        disabledBorder: "#E2E2EA"
    };
    const error = {
        bg: "#E11D48",
        text: "#FFFFFF",
        border: "#E11D48",
        hover: "#C8102E",
        active: "#9F1239",
        focusRing: "#FDA4AF",
        disabledBg: "#E2E2EA",
        disabledText: "#A2A2A8",
        disabledBorder: "#E2E2EA"
    };
    // Dark surface: primary inverts to white bg
    const primaryDark = {
        bg: "#FFFFFF",
        text: "#161558",
        border: "#FFFFFF",
        hover: "#E2E2EA",
        active: "#D0D5DD",
        focusRing: "rgba(255,255,255,0.4)",
        disabledBg: "rgba(255,255,255,0.10)",
        disabledText: "rgba(255,255,255,0.30)",
        disabledBorder: "rgba(255,255,255,0.15)"
    };
    if (surface === "dark" && theme === "primary") {
        return primaryDark;
    }
    switch(theme){
        case "primary":
            return primary;
        case "neutral":
            return neutral;
        case "error":
            return error;
        default:
            return primary;
    }
}
const BUTTON_SIZE_TOKENS = {
    sm: {
        height: 36,
        paddingX: 14,
        iconSize: 18,
        iconTextGap: 6,
        fontSize: 12
    },
    md: {
        height: 42,
        paddingX: 18,
        iconSize: 20,
        iconTextGap: 6,
        fontSize: 14
    },
    lg: {
        height: 48,
        paddingX: 22,
        iconSize: 24,
        iconTextGap: 6,
        fontSize: 14
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/plan-procedures-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PLAN_PROCEDURES_PREFIX",
    ()=>PLAN_PROCEDURES_PREFIX,
    "PLAN_PROCEDURES_UPDATED_EVENT",
    ()=>PLAN_PROCEDURES_UPDATED_EVENT,
    "getPlanProcedures",
    ()=>getPlanProcedures,
    "savePlanProcedures",
    ()=>savePlanProcedures
]);
"use client";
const PLAN_PROCEDURES_PREFIX = "tp.plan.procedures.";
const PLAN_PROCEDURES_UPDATED_EVENT = "tp-plan-procedures-updated";
function key(patientId) {
    return `${PLAN_PROCEDURES_PREFIX}${patientId || "apt-1"}`;
}
function getPlanProcedures(patientId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(key(patientId));
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch  {
        return [];
    }
}
function savePlanProcedures(patientId, list) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.localStorage.setItem(key(patientId), JSON.stringify(list));
        window.dispatchEvent(new CustomEvent(PLAN_PROCEDURES_UPDATED_EVENT, {
            detail: {
                patientId
            }
        }));
    } catch  {
    // ignore quota / private mode
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/plan-consultation-queue.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PLAN_CONSULTATION_FLUSH_EVENT",
    ()=>PLAN_CONSULTATION_FLUSH_EVENT,
    "PLAN_CONSULTATION_QUEUE_PREFIX",
    ()=>PLAN_CONSULTATION_QUEUE_PREFIX,
    "pushPlanConsultationFromRxPage",
    ()=>pushPlanConsultationFromRxPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rx$2d$preview$2d$composer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/rx-preview-composer.ts [app-client] (ecmascript)");
"use client";
;
const PLAN_CONSULTATION_QUEUE_PREFIX = "tp.plan.consultation.queue.";
const PLAN_CONSULTATION_FLUSH_EVENT = "tp-plan-flush-consultations";
function queueKey(patientId) {
    return `${PLAN_CONSULTATION_QUEUE_PREFIX}${patientId || "apt-1"}`;
}
function pushPlanConsultationFromRxPage(patientId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const params = new URLSearchParams(window.location.search);
    const planId = params.get("planId");
    const serviceId = params.get("serviceId");
    if (!planId || !serviceId) return;
    const snapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rx$2d$preview$2d$composer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getComposedRxPreviewSnapshot"])(patientId);
    const summaryText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rx$2d$preview$2d$composer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatComposedRxSnapshotSummary"])(snapshot);
    const appointmentId = params.get("appointmentId") ?? undefined;
    const item = {
        patientId,
        planId,
        serviceId,
        appointmentId,
        summaryText,
        endedAt: new Date().toISOString(),
        id: `cns-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        source: appointmentId ? "appointment" : "treatment-row"
    };
    const key = queueKey(patientId);
    let prev = [];
    try {
        prev = JSON.parse(localStorage.getItem(key) || "[]");
        if (!Array.isArray(prev)) prev = [];
    } catch  {
        prev = [];
    }
    prev.push(item);
    localStorage.setItem(key, JSON.stringify(prev));
    window.dispatchEvent(new Event(PLAN_CONSULTATION_FLUSH_EVENT));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/billing-catalog.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BILLING_CATALOG_STORAGE_KEY",
    ()=>BILLING_CATALOG_STORAGE_KEY,
    "billingDiscountAmount",
    ()=>billingDiscountAmount,
    "buildInitialBillingItems",
    ()=>buildInitialBillingItems,
    "computeBillingLineTotal",
    ()=>computeBillingLineTotal,
    "findDentalBillItemByName",
    ()=>findDentalBillItemByName,
    "formatBillingInr",
    ()=>formatBillingInr,
    "getDentalServiceItems",
    ()=>getDentalServiceItems,
    "getUniqueDentalBillItems",
    ()=>getUniqueDentalBillItems,
    "sortDentalBillItemsForSearch",
    ()=>sortDentalBillItemsForSearch,
    "sortStringsForTypeahead",
    ()=>sortStringsForTypeahead
]);
const BILLING_CATALOG_STORAGE_KEY = "tp.billing.catalog.v1";
function deterministicShuffle(items, seed) {
    const arr = [
        ...items
    ];
    let s = seed;
    const rnd = ()=>{
        s = s * 1103515245 + 12345 & 0x7fffffff;
        return s / 0x7fffffff;
    };
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(rnd() * (i + 1));
        [arr[i], arr[j]] = [
            arr[j],
            arr[i]
        ];
    }
    return arr;
}
function buildInitialBillingItems() {
    const clinicalLabels = [
        "OPD consultation",
        "Specialist review",
        "Counselling session",
        "Minor procedure assist",
        "Wound dressing",
        "Stitch removal",
        "Adult vaccination",
        "IM injection",
        "Nebulisation",
        "ECG — resting"
    ];
    const consumableLabels = [
        "Sterile gloves (box)",
        "Syringe 5 ml (pack)",
        "Cotton roll bundle",
        "Crepe bandage 5 cm",
        "Antiseptic 100 ml",
        "Surgical mask (box)",
        "IV infusion set",
        "Micropore tape",
        "Gauze pads (pack)",
        "Absorbable suture"
    ];
    const dentalTemplates = [
        "Scaling & polishing",
        "RCT — anterior",
        "PFM crown",
        "Extraction — simple",
        "Composite restoration",
        "In-office bleaching",
        "Night guard",
        "Implant consult",
        "Bridge — per unit",
        "IOPA radiograph"
    ];
    const clinical = clinicalLabels.map((label, i)=>({
            id: `svc-${i + 1}`,
            name: `Clinical — ${label}`,
            type: "service",
            price: 280 + i * 72,
            priceUnit: "per_unit",
            discount: i % 4 === 0 ? 40 : 0,
            discountUnit: "inr",
            gstPct: i % 2 === 0 ? 5 : 0
        }));
    const consumables = consumableLabels.map((label, i)=>({
            id: `cns-${i + 1}`,
            name: `Stock — ${label}`,
            type: "consumable",
            price: 55 + i * 15,
            priceUnit: "per_unit",
            discount: 0,
            discountUnit: "inr",
            gstPct: 5
        }));
    const dental = [];
    for(let i = 0; i < 40; i++){
        const tmpl = dentalTemplates[i % dentalTemplates.length];
        dental.push({
            id: `dent-${i + 1}`,
            name: tmpl,
            type: "dental",
            price: 920 + i * 35,
            priceUnit: "per_unit",
            discount: i % 5 === 0 ? 8 : 0,
            discountUnit: i % 5 === 0 ? "percent" : "inr",
            gstPct: 5
        });
    }
    return deterministicShuffle([
        ...clinical,
        ...consumables,
        ...dental
    ], 20260415);
}
function getDentalServiceItems(items) {
    return items.filter((i)=>i.type === "dental");
}
function getUniqueDentalBillItems(items) {
    const seen = new Set();
    const out = [];
    for (const i of items){
        if (i.type !== "dental") continue;
        const k = i.name.trim().toLowerCase();
        if (!k || seen.has(k)) continue;
        seen.add(k);
        out.push(i);
    }
    return out;
}
function sortStringsForTypeahead(list, queryRaw) {
    const q = queryRaw.trim().toLowerCase();
    const arr = [
        ...list
    ];
    if (!q) {
        arr.sort((a, b)=>a.localeCompare(b, undefined, {
                sensitivity: "base"
            }));
        return arr;
    }
    const rank = (s)=>{
        const sl = s.toLowerCase();
        if (sl === q) return [
            0,
            0
        ];
        if (sl.startsWith(q)) return [
            1,
            0
        ];
        const idx = sl.indexOf(q);
        if (idx < 0) return [
            999,
            999
        ];
        const wb = idx === 0 || /[\s/(-]/.test(sl[idx - 1] ?? "");
        return [
            wb ? 2 : 3,
            idx
        ];
    };
    arr.sort((a, b)=>{
        const [ra, ia] = rank(a);
        const [rb, ib] = rank(b);
        if (ra !== rb) return ra - rb;
        if (ia !== ib) return ia - ib;
        return a.localeCompare(b, undefined, {
            sensitivity: "base"
        });
    });
    return arr;
}
function sortDentalBillItemsForSearch(items, queryRaw) {
    const q = queryRaw.trim().toLowerCase();
    const arr = [
        ...items
    ];
    if (!q) {
        arr.sort((a, b)=>a.name.localeCompare(b.name, undefined, {
                sensitivity: "base"
            }));
        return arr;
    }
    const rank = (name)=>{
        const sl = name.toLowerCase();
        if (sl === q) return [
            0,
            0
        ];
        if (sl.startsWith(q)) return [
            1,
            0
        ];
        const idx = sl.indexOf(q);
        if (idx < 0) return [
            999,
            999
        ];
        const wb = idx === 0 || /[\s/(-]/.test(sl[idx - 1] ?? "");
        return [
            wb ? 2 : 3,
            idx
        ];
    };
    arr.sort((a, b)=>{
        const [ra, ia] = rank(a.name);
        const [rb, ib] = rank(b.name);
        if (ra !== rb) return ra - rb;
        if (ia !== ib) return ia - ib;
        return a.name.localeCompare(b.name, undefined, {
            sensitivity: "base"
        });
    });
    return arr;
}
function findDentalBillItemByName(items, name) {
    const q = name.trim().toLowerCase();
    if (!q) return undefined;
    return getDentalServiceItems(items).find((i)=>i.name.toLowerCase() === q);
}
function formatBillingInr(n) {
    return `₹${Math.round(n).toLocaleString("en-IN")}`;
}
function billingDiscountAmount(price, discount, unit) {
    const p = Number(price) || 0;
    const d = Number(discount) || 0;
    if (unit === "percent") return Math.min(p, p * (d / 100));
    return Math.min(p, d);
}
function computeBillingLineTotal(price, discount, gstPct, discountUnit) {
    const unit = Number(price) || 0;
    const g = Number(gstPct) || 0;
    const afterDisc = Math.max(0, unit - billingDiscountAmount(unit, discount, discountUnit));
    return Math.floor(afterDisc * (1 + g / 100));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/billing-catalog-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BillingCatalogProvider",
    ()=>BillingCatalogProvider,
    "useBillingCatalog",
    ()=>useBillingCatalog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/billing-catalog.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const BillingCatalogContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function readStoredItems() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BILLING_CATALOG_STORAGE_KEY"]);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) return null;
        return parsed;
    } catch  {
        return null;
    }
}
function BillingCatalogProvider({ children }) {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "BillingCatalogProvider.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildInitialBillingItems"])()
    }["BillingCatalogProvider.useState"]);
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BillingCatalogProvider.useEffect": ()=>{
            const stored = readStoredItems();
            if (stored) setItems(stored);
            setHydrated(true);
        }
    }["BillingCatalogProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BillingCatalogProvider.useEffect": ()=>{
            if (!hydrated || ("TURBOPACK compile-time value", "object") === "undefined") return;
            try {
                window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BILLING_CATALOG_STORAGE_KEY"], JSON.stringify(items));
            } catch  {
            /* ignore quota */ }
        }
    }["BillingCatalogProvider.useEffect"], [
        items,
        hydrated
    ]);
    const addItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BillingCatalogProvider.useCallback[addItem]": (item)=>{
            setItems({
                "BillingCatalogProvider.useCallback[addItem]": (prev)=>[
                        ...prev,
                        item
                    ]
            }["BillingCatalogProvider.useCallback[addItem]"]);
        }
    }["BillingCatalogProvider.useCallback[addItem]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BillingCatalogProvider.useMemo[value]": ()=>({
                items,
                setItems,
                addItem
            })
    }["BillingCatalogProvider.useMemo[value]"], [
        items,
        addItem
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BillingCatalogContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/billing-catalog-context.tsx",
        lineNumber: 73,
        columnNumber: 10
    }, this);
}
_s(BillingCatalogProvider, "/wjXXAUpIizbCBkJwmD8aWto75g=");
_c = BillingCatalogProvider;
function useBillingCatalog() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(BillingCatalogContext);
    if (!ctx) {
        throw new Error("useBillingCatalog must be used within BillingCatalogProvider");
    }
    return ctx;
}
_s1(useBillingCatalog, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "BillingCatalogProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/use-touch-device.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTouchDevice",
    ()=>useTouchDevice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useTouchDevice() {
    _s();
    const [isTouch, setIsTouch] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useTouchDevice.useEffect": ()=>{
            const mql = window.matchMedia("(hover: none) and (pointer: coarse)");
            const onChange = {
                "useTouchDevice.useEffect.onChange": ()=>setIsTouch(mql.matches)
            }["useTouchDevice.useEffect.onChange"];
            mql.addEventListener("change", onChange);
            setIsTouch(mql.matches);
            return ({
                "useTouchDevice.useEffect": ()=>mql.removeEventListener("change", onChange)
            })["useTouchDevice.useEffect"];
        }
    }["useTouchDevice.useEffect"], []);
    return isTouch;
}
_s(useTouchDevice, "Ki4wWnlfXGClyxMOF+YkZO2M1CM=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProviders",
    ()=>AppProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$sync$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/rxpad-sync-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$chrome$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/rxpad-chrome-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$DrAgentLayoutShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-rxpad/DrAgentLayoutShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/billing-catalog-context.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function AppProviders({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$sync$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RxPadSyncProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$rxpad$2d$chrome$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RxPadChromeProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$billing$2d$catalog$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BillingCatalogProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$rxpad$2f$DrAgentLayoutShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DrAgentLayoutShell"], {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/app/providers.tsx",
                    lineNumber: 14,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/providers.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/providers.tsx",
            lineNumber: 12,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/providers.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = AppProviders;
var _c;
__turbopack_context__.k.register(_c, "AppProviders");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_8c7b6f9d._.js.map