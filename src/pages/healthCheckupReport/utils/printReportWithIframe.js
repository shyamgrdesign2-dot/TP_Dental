/**
 * Print report to PDF using the browser's native print engine via a hidden iframe.
 * No screenshot, canvas, or jsPDF — true CSS layout, page breaks, vector text.
 *
 * @param {string} htmlContent - Full HTML of the report (e.g. document-paper element's outerHTML)
 * @param {string} [documentTitle] - Title for the print document
 */

const PRINT_CSS_HREF = "/report-print.css";
const IFRAME_REMOVAL_DELAY_MS = 1500;

export function printReportWithIframe(rawHtmlContent, documentTitle = "Health Check-up Report", patient_data) {
  if (!rawHtmlContent || typeof rawHtmlContent !== "string") {
    console.warn("printReportWithIframe: no htmlContent provided");
    return;
  }

  // --- HTML Cleaning & Wrapper Extraction ---
  // The rawHtmlContent often contains the entire React wrapper tree (e.g. .health-checkup-editor__document-wrap)
  // which brings along inline styles like height: 100%, flex: 1, and overflow: auto.
  // We MUST strip these out before printing, or Chrome will endlessly paginate 60+ blank pages.
  let htmlContent = rawHtmlContent;
  try {
    const parser = new DOMParser();
    const parsedDoc = parser.parseFromString(rawHtmlContent, 'text/html');
    const editableEl = parsedDoc.querySelector('.smart-editor-editable') || parsedDoc.querySelector('.ProseMirror');
    if (editableEl) {
      htmlContent = editableEl.innerHTML; // Extract ONLY the tables/paragraphs/headers
    }
  } catch (e) {
    console.error("printReportWithIframe: failed to parse HTML wrappers", e);
  }

  const iframe = document.createElement("iframe");
  iframe.setAttribute("title", documentTitle);
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.visibility = "hidden";

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  const baseUrl = typeof window !== "undefined" && window.location ? window.location.origin : "";
  const cssHref = baseUrl + (process.env.PUBLIC_URL || "") + PRINT_CSS_HREF;

  // --- Repeating Header Extraction & Construction ---
  const patientName = patient_data?.pm_fullname || patient_data?.patient_name || "N/A";
  const patientMrn = patient_data?.pm_reference_id || patient_data?.patient_id || "N/A";

  const repeatingHeaderHtml = `
    <div class="print-repeating-header">
      <div class="print-repeating-header-left">
        <div><strong>Patient Name:</strong> ${escapeHtml(patientName)}</div>
        <div><strong>MRN:</strong> ${escapeHtml(patientMrn)}</div>
      </div>
    </div>
  `;

  const finalHtmlStructure = `
    <div class="print-padding-wrapper">
      <table class="print-content-table">
        <thead>
          <tr>
            <td>
              ${repeatingHeaderHtml}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="smart-editor-editable">
                ${htmlContent}
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div class="page-bottom-margin"></div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;

  // Basic sanitization
  function sanitizeReportHtml(rawHtml) {
    const parsed = new DOMParser().parseFromString(rawHtml || "", "text/html");
    parsed.querySelectorAll("script, iframe, object, embed").forEach((node) => node.remove());
    parsed.querySelectorAll("*").forEach((node) => {
      Array.from(node.attributes).forEach((attr) => {
        const name = attr.name.toLowerCase();
        const value = String(attr.value || "").trim().toLowerCase();
        if (name.startsWith("on")) node.removeAttribute(attr.name);
        if ((name === "href" || name === "src") && value.startsWith("javascript:")) {
          node.removeAttribute(attr.name);
        }
      });
    });
    return parsed.body.innerHTML;
  }

  const sanitizedHtmlStructure = sanitizeReportHtml(finalHtmlStructure);

  doc.open();
  const criticalTableCss = `
    /* --- Critical Print Resets to fix 61 Blank Pages --- */
    /* We must force absolute auto-heights and prevent any inheriting overflow */
    html, body {
      width: 100% !important;
      height: auto !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      background: white !important;
    }
    
    @page {
      margin: 0 !important;
    }

    .print-padding-wrapper {
      padding: 14px 1cm 3cm 2cm !important;
      box-sizing: border-box !important;
      width: 100% !important;
    }
    
    .print-content-table, .smart-editor-editable, .health-checkup-editor__document-paper, .health-checkup-editor__document-wrap {
      width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      box-shadow: none !important;
      background: transparent !important;
      box-sizing: border-box !important;
      page-break-after: auto !important;
      page-break-inside: auto !important;
    }
    
    /* --- Repeating Header CSS --- */
    .print-content-table {
      border-collapse: collapse;
      border: none;
    }
    .print-content-table > thead {
      display: table-header-group;
    }
    .print-content-table > tbody {
      display: table-row-group;
    }
    .print-content-table > thead > tr > td,
    .print-content-table > tbody > tr > td {
      border: none;
      padding: 0;
    }
    
    .report-doc-header {
      margin-top: -2.4cm !important; /* Pull up to overlap the thead gap on Page 1 only */
      background: white !important;
      position: relative !important;
      z-index: 1000 !important;
      padding-top: 0.5cm !important;
      padding-bottom: 0.6cm !important;
      border-bottom: none !important; /* Remove the main header's border on the first page since the repeating one's border will be visible instead */
    }

    .print-repeating-header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e2e2ea;
      padding-bottom: 8px;
      margin-bottom: 12px;
      margin-top: 2cm;
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      line-height: 18px;
      color: #171725;
    }
    
    /* Ensure the body actually takes up A4 width for printing and add document margins */
    
    
    /* Critical table layout */
    .smart-editor-editable .tableWrapper:not(:first-of-type) > table,
    .smart-editor-editable > table:not(:first-of-type) {
      table-layout: auto !important; /* using auto instead of fixed to avoid overlapping headers when content is long */
      border-collapse: collapse !important;
      width: 100% !important;
      border: 1px solid #d1d5db !important;
      page-break-inside: auto !important;
    }
    .smart-editor-editable tr {
      page-break-inside: avoid !important;
      page-break-after: auto !important;
    }
    .smart-editor-editable .tableWrapper:not(:first-of-type) > table th,
    .smart-editor-editable .tableWrapper:not(:first-of-type) > table td,
    .smart-editor-editable > table:not(:first-of-type) th,
    .smart-editor-editable > table:not(:first-of-type) td {
      border: 1px solid #d1d5db !important;
    }
  `;
  doc.write(
    `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>${escapeHtml(documentTitle)}</title>` +
    `<style>${criticalTableCss}</style>` +
    `<link rel="stylesheet" href="${escapeHtml(cssHref)}" />` +
    `</head><body>${sanitizedHtmlStructure}</body></html>`
  );
  doc.close();

  const printWindow = iframe.contentWindow;
  if (!printWindow) {
    document.body.removeChild(iframe);
    return;
  }

  const printAfterLoad = () => {
    printWindow.focus();
    printWindow.print();
  };

  let printed = false;
  const printOnce = () => {
    if (printed) return;
    printed = true;
    printAfterLoad();
  };

  const link = doc.querySelector('link[href]');
  if (link) {
    link.addEventListener("load", () => setTimeout(printOnce, 100));
    link.addEventListener("error", () => setTimeout(printOnce, 150));
    // Fallback if load/error never fire
    setTimeout(printOnce, 3000);
  } else {
    setTimeout(printAfterLoad, 200);
  }

  setTimeout(() => {
    try {
      if (iframe.parentNode) document.body.removeChild(iframe);
    } catch (_) { }
  }, IFRAME_REMOVAL_DELAY_MS);
}

function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  const text = document.createTextNode(str);
  div.appendChild(text);
  return div.innerHTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
