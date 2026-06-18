(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/components/tp-ui/button-system/TPButton.jsx [app-client] (ecmascript) <export TPButton as TPButtonToken>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TPButtonToken",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$TPButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TPButton"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$tp$2d$ui$2f$button$2d$system$2f$TPButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/tp-ui/button-system/TPButton.jsx [app-client] (ecmascript)");
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

//# sourceMappingURL=components_fc96434b._.js.map