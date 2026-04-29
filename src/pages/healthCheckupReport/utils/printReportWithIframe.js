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
      <div class="print-source-content smart-editor-editable">
        ${htmlContent}
      </div>

      <table class="print-first-page-table">
        <tbody>
          <tr>
            <td>
              <div class="smart-editor-editable print-first-page-content"></div>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="print-content-table print-repeat-pages-table">
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
              <div class="smart-editor-editable print-rest-pages-content"></div>
            </td>
          </tr>
        </tbody>
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
      size: A4 portrait !important;
      margin: 0 !important;
    }

    .print-padding-wrapper {
      padding: 10mm 1cm 3cm 2cm !important;
      box-sizing: border-box !important;
      width: 100% !important;
      max-width: 100% !important;
      overflow: visible !important;
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

    .print-source-content {
      display: none !important;
    }
    
    /* --- Repeating Header CSS --- */
    .print-first-page-table,
    .print-content-table {
      border-collapse: collapse;
      border: none;
      width: 100% !important;
      max-width: 100% !important;
    }
    .print-first-page-table > tbody {
      display: table-row-group;
    }
    .print-content-table > thead {
      display: table-header-group;
    }
    .print-content-table > tbody {
      display: table-row-group;
    }
    .print-first-page-table > tbody > tr > td,
    .print-content-table > thead > tr > td,
    .print-content-table > tbody > tr > td {
      border: none;
      padding: 0;
    }

    .print-first-page-table.has-rest-pages {
      page-break-after: always !important;
      break-after: page !important;
    }
    
    .report-doc-header {
      margin-top: 0 !important;
      background: white !important;
      position: relative !important;
      z-index: 1000 !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      border-bottom: none !important;
    }

    .print-repeating-header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e2e2ea;
      padding-bottom: 8px;
      margin-bottom: 12px;
      margin-top: 2cm !important;
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      line-height: 18px;
      color: #171725;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    
    /* Ensure the body actually takes up A4 width for printing and add document margins */
    
    
    /* Critical table layout */
    .smart-editor-editable .tableWrapper:not(:first-of-type) > table,
    .smart-editor-editable > table:not(:first-of-type) {
      table-layout: auto !important; /* using auto instead of fixed to avoid overlapping headers when content is long */
      border-collapse: collapse !important;
      width: 100% !important;
      max-width: 100% !important;
      border: 1px solid #d1d5db !important;
      page-break-inside: auto !important;
      overflow: visible !important;
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
      white-space: normal !important;
      word-break: break-word !important;
      overflow-wrap: anywhere !important;
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

  const waitForStableLayout = async () => {
    const printDoc = printWindow.document;
    try {
      if (printDoc.fonts && typeof printDoc.fonts.ready?.then === "function") {
        await printDoc.fonts.ready;
      }
    } catch (_) {
      // Ignore font readiness errors and continue with best-effort layout.
    }

    // Let the browser flush final layout after font load.
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));
  };

  const preparePaginatedLayout = () => {
    const printDoc = printWindow.document;
    const source = printDoc.querySelector(".print-source-content");
    const firstPageContainer = printDoc.querySelector(".print-first-page-content");
    const restPagesContainer = printDoc.querySelector(".print-rest-pages-content");
    const firstPageTable = printDoc.querySelector(".print-first-page-table");
    const repeatPagesTable = printDoc.querySelector(".print-repeat-pages-table");

    if (!source || !firstPageContainer || !restPagesContainer || !firstPageTable || !repeatPagesTable) {
      return;
    }

    const mmProbe = printDoc.createElement("div");
    mmProbe.style.height = "1mm";
    mmProbe.style.width = "1px";
    mmProbe.style.position = "absolute";
    mmProbe.style.visibility = "hidden";
    printDoc.body.appendChild(mmProbe);
    const pxPerMm = mmProbe.getBoundingClientRect().height || 3.78;
    mmProbe.remove();

    const availableFirstPageHeight = (297 - 10 - 30) * pxPerMm;
    const sourceNodes = Array.from(source.childNodes).filter((node) => {
      if (node.nodeType === Node.TEXT_NODE) return Boolean(node.textContent && node.textContent.trim());
      return true;
    });

    let spillToRestPages = false;

    sourceNodes.forEach((node) => {
      const candidate = node.cloneNode(true);
      if (spillToRestPages) {
        restPagesContainer.appendChild(candidate);
        return;
      }

      firstPageContainer.appendChild(candidate);
      const firstPageHeight = firstPageTable.getBoundingClientRect().height;
      const firstPageChildCount = firstPageContainer.childNodes.length;

      const overflowTolerancePx = 6;
      if (firstPageHeight > availableFirstPageHeight + overflowTolerancePx && firstPageChildCount > 1) {
        firstPageContainer.removeChild(candidate);
        restPagesContainer.appendChild(candidate);
        spillToRestPages = true;
      }
    });

    const hasRestPages = restPagesContainer.childNodes.length > 0;
    if (hasRestPages) {
      firstPageTable.classList.add("has-rest-pages");
      repeatPagesTable.style.display = "table";
    } else {
      firstPageTable.classList.remove("has-rest-pages");
      repeatPagesTable.style.display = "none";
    }
  };

  let printed = false;
  const printOnce = async () => {
    if (printed) return;
    printed = true;
    await waitForStableLayout();
    preparePaginatedLayout();
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
