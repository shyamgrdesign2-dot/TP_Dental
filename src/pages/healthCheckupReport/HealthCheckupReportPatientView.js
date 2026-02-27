// import React, { useEffect, useState, useMemo, useRef } from "react";
// import { useLocation, useSearchParams } from "react-router-dom";
// import { useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import {
//   Table,
//   TableRow,
//   TableCell,
//   TableHeader,
// } from "@tiptap/extension-table";
// import Underline from "@tiptap/extension-underline";

// import HealthCheckupDocument from "./components/HealthCheckupDocument";
// import ZydusLogo from "../../assets/images/website-images/ZydusLogo.png";
// import ApiHealthCheckupReport from "../../api/services/ApiHealthCheckupReport";
// import "./components/HealthCheckupReportEditor.scss"; // Import editor styles for document rendering
// import "./HealthCheckupReportPatientView.scss";

// let ImageExtension;
// let TextAlignExtension;
// let HighlightExtension;
// let ColorExtension;
// let TextStyleExtension;
// let SubscriptExtension;
// let SuperscriptExtension;
// let TipTapNode;

// try {
//   TipTapNode = require("@tiptap/core").Node;
// } catch (_) {}
// try {
//   ImageExtension = require("@tiptap/extension-image").Image;
// } catch (_) {}
// try {
//   TextAlignExtension = require("@tiptap/extension-text-align").TextAlign;
// } catch (_) {}
// try {
//   HighlightExtension = require("@tiptap/extension-highlight").Highlight;
// } catch (_) {}
// try {
//   ColorExtension = require("@tiptap/extension-color").Color;
//   TextStyleExtension = require("@tiptap/extension-text-style").TextStyle;
// } catch (_) {}
// try {
//   SubscriptExtension = require("@tiptap/extension-subscript").Subscript;
//   SuperscriptExtension = require("@tiptap/extension-superscript").Superscript;
// } catch (_) {}

// /**
//  * Validates and cleans TipTap content to ensure it's valid
//  * Deep clones to avoid mutating read-only objects
//  * @param {Array} contentArray - Array of TipTap nodes
//  * @param {boolean} isTopLevel - Whether this is top-level document content (text nodes not allowed)
//  */
// function validateAndCleanContent(contentArray, isTopLevel = true) {
//   if (!Array.isArray(contentArray)) return [];

//   return contentArray
//     .filter((node) => {
//       if (!node || typeof node !== "object" || !node.type) {
//         console.warn("Invalid node (missing type):", node);
//         return false;
//       }

//       // Text nodes must have a 'text' property
//       if (node.type === "text") {
//         if (typeof node.text !== "string") {
//           console.warn("Text node missing text property:", node);
//           return false;
//         }
//         // Text nodes are only invalid at document/table top level
//         if (isTopLevel) {
//           console.warn("Unwrapped text node at top level:", node);
//           return false;
//         }
//       }

//       return true;
//     })
//     .map((node) => {
//       // Deep clone the node to avoid mutating read-only objects
//       const clonedNode = JSON.parse(JSON.stringify(node));

//       // Fix text nodes without text property
//       if (clonedNode.type === "text" && typeof clonedNode.text !== "string") {
//         clonedNode.text = "\u200B"; // Zero-width space
//       }

//       // Recursively validate nested content
//       // Text nodes are allowed inside block elements (paragraphs, headings, etc.)
//       if (clonedNode.content && Array.isArray(clonedNode.content)) {
//         const allowTextNodes = [
//           "paragraph",
//           "heading",
//           "listItem",
//           "blockquote",
//           "tableCell",
//           "tableHeader",
//         ].includes(clonedNode.type);
//         clonedNode.content = validateAndCleanContent(
//           clonedNode.content,
//           !allowTextNodes,
//         );
//       }

//       // Ensure paragraphs/headings have at least one text node
//       if (["paragraph", "heading"].includes(clonedNode.type)) {
//         if (!clonedNode.content || clonedNode.content.length === 0) {
//           clonedNode.content = [{ type: "text", text: "\u200B" }];
//         }
//       }

//       // Validate table structure
//       if (clonedNode.type === "table" && clonedNode.content) {
//         clonedNode.content = clonedNode.content.filter((row) => {
//           if (row.type !== "tableRow") return false;
//           if (row.content && Array.isArray(row.content)) {
//             row.content = row.content.filter((cell) => {
//               return cell.type === "tableCell" || cell.type === "tableHeader";
//             });
//           }
//           return row.content && row.content.length > 0;
//         });
//       }

//       return clonedNode;
//     });
// }

// // Custom node extension for hospitalHeader
// const HospitalHeader = TipTapNode
//   ? TipTapNode.create({
//       name: "hospitalHeader",
//       group: "block",
//       atom: true,
//       addAttributes() {
//         return {
//           logoUrl: { default: null },
//           hospitalName: { default: null },
//         };
//       },
//       parseHTML() {
//         return [{ tag: 'div[data-type="hospital-header"]' }];
//       },
//       renderHTML({ HTMLAttributes }) {
//         return [
//           "div",
//           { "data-type": "hospital-header", style: "display: none;" },
//           0,
//         ];
//       },
//     })
//   : null;

// /**
//  * Patient View for Health Check-up Report
//  * Read-only view accessible via shared link with token authentication
//  * Route: /health-checkup-report?token={token}&reportId={reportId}&patientId={patientId}
//  */
// function HealthCheckupReportPatientView() {
//   const [searchParams] = useSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [reportData, setReportData] = useState(null);
//   const [error, setError] = useState(null);
//   const documentRef = useRef(null);
//   const hasPrintedRef = useRef(false);
//   const {state} = useLocation();
//   const {data} = state;
//   // Extract URL parameters
//   const token = searchParams.get("token");
//   const reportId = searchParams.get("reportId");
//   const patientId = searchParams.get("patientId");
//   const autoPrint = searchParams.get("autoPrint");
//   const shouldAutoPrint =
//     autoPrint === "1" || autoPrint === "true" || autoPrint === "yes";

//     useEffect(() => {
//       if (data) {
//         setReportData(data);
//       }
//     }, [data]);
//   // Fetch report data
//   useEffect(() => {
//     const fetchReportData = async () => {
//       if (!token || !reportId || !patientId) {
//         setError("Invalid or missing parameters");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);

//         const response = await ApiHealthCheckupReport.getHealthCheckupDetails({
//           id: reportId,
//           patientId: patientId,
//           token: token,
//         });
//         setReportData(response);
//       } catch (err) {
//         console.error("Error fetching report:", err);
//         setError(err?.message || "Failed to load report");
//         setReportData(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     !data && fetchReportData();
//   }, [token, reportId, patientId]);

//   // Extract header info
//   const headerLogo =
//     reportData?.document?.content?.[0]?.attrs?.logoUrl || ZydusLogo;
//   const headerTitle =
//     reportData?.document?.content?.[0]?.attrs?.hospitalName ||
//     "HEALTH CHECK-UP SUMMARY";

//   // Strip hospitalHeader from content and validate
//   const cleanedContent = useMemo(() => {
//     if (!reportData?.document?.content) return { type: "doc", content: [] };

//     // Filter out hospitalHeader
//     const contentArray = reportData.document.content.filter(
//       (node) => node?.type !== "hospitalHeader"
//     );

//     // Validate and clean content
//     const validContent = validateAndCleanContent(contentArray);

//     return { type: "doc", content: validContent };
//   }, [reportData]);

//   // TipTap extensions
//   const extensions = useMemo(() => {
//     const exts = [
//       StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
//       Table.configure({ resizable: false }),
//       TableRow,
//       TableCell,
//       TableHeader,
//       Underline,
//     ];
//     if (HospitalHeader) exts.push(HospitalHeader);
//     if (TextAlignExtension)
//       exts.push(
//         TextAlignExtension.configure({ types: ["heading", "paragraph"] }),
//       );
//     if (HighlightExtension) exts.push(HighlightExtension);
//     if (TextStyleExtension) exts.push(TextStyleExtension);
//     if (ColorExtension) exts.push(ColorExtension);
//     if (ImageExtension) exts.push(ImageExtension);
//     if (SubscriptExtension) exts.push(SubscriptExtension);
//     if (SuperscriptExtension) exts.push(SuperscriptExtension);
//     return exts;
//   }, []);

//   const editor = useEditor({
//     extensions,
//     content: cleanedContent,
//     editable: false,
//     editorProps: {
//       attributes: { class: "health-checkup-editor__document-body" },
//     },
//     immediatelyRender: false,
//   });

//   // Update editor content when cleanedContent changes
//   useEffect(() => {
//     if (editor && cleanedContent) {
//       editor.commands.setContent(cleanedContent);
//     }
//   }, [editor, cleanedContent]);

//   // Auto-print when opened in print mode (used by doctor portal download)
//   useEffect(() => {
//     if (!shouldAutoPrint) return;
//     if (!editor || !reportData) return;
//     if (hasPrintedRef.current) return;
//     hasPrintedRef.current = true;

//     // Give browser a tick to paint content before printing
//     const id = setTimeout(() => {
//       window.print();
//     }, 400);

//     return () => clearTimeout(id);
//   }, [shouldAutoPrint, editor, reportData]);

//   // if (loading) {
//   //   return (
//   //     <div className="health-checkup-patient-view">
//   //       <div className="health-checkup-patient-view__loading">
//   //         <Spin size="large" />
//   //         <p>Loading health check-up report...</p>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   if (error) {
//     return (
//       <div className="health-checkup-patient-view">
//         <div className="health-checkup-patient-view__error">
//           <h2>Unable to Load Report</h2>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="health-checkup-patient-view">
//       <div className="health-checkup-patient-view__container">
//         <div className="health-checkup-editor__document-wrap">
//           <HealthCheckupDocument
//             documentRef={documentRef}
//             editor={editor}
//             logo={headerLogo}
//             title={headerTitle}
//             editable={false}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HealthCheckupReportPatientView;
