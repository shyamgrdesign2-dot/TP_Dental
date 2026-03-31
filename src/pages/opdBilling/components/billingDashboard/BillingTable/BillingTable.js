import React, { useState, useCallback, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { PDFDocument } from "pdf-lib";
import {
  Select,
  Checkbox,
  Row,
  Input,
  DatePicker,
  Button,
  Dropdown,
  message,
  Radio,
  Spin,
} from "antd";
import moment from "moment";
import dayjs from "dayjs";
import "./BillingTable.scss";
import DownloadBill from "../DownloadBill/DownloadBill.js";
import {
  fetchBillingDashboard,
  fetchBillsByPatient,
  listAdvancedDepositByPatient,
  fetchItemizedBillData,
} from "../../../service.js";
import BillTable from "./BillTable.js";
import ItemizedBillChart from "../ItemizedBillChart/ItemizedBillChart.js";
import { listDoctor } from "../../../../../redux/bulkMessagesSlice.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getDecodedToken } from "../../../../../utils/localStorage.js";
import { setLoadingStatus } from "../../../../../redux/uploadDocSlice.js";
import { handleDownload } from "../../../utils/helper.js";
import html2pdf from "html2pdf.js";
import { getClinic, trackEvent } from "../../../../../utils/utils.js";
import { MESSAGE_KEY } from "../../../../../utils/constants.js";
import imgCloseVisit from "../../../../../assets/images/close-visit.svg";
const { RangePicker } = DatePicker;

const { Option } = Select;

// Off-screen (not display:none) + onclone so html2canvas can paint.
const PRINTABLE_OFFSCREEN_STYLE = {
  position: "fixed",
  left: 0,
  top: 0,
  width: "1200px",
  maxWidth: "1200px",
  overflow: "visible",
  pointerEvents: "none",
  zIndex: 2,
  transform: "translate3d(-12000px, 0, 0)",
  WebkitTransform: "translate3d(-12000px, 0, 0)",
};

const HTML2PDF_IMAGE = { type: "jpeg", quality: 0.92 };

function fixHtml2PdfClone(clonedDoc) {
  const docEl = clonedDoc.documentElement;
  if (docEl) {
    docEl.style.overflow = "visible";
  }
  const body = clonedDoc.body;
  if (body) {
    body.style.overflow = "visible";
    body.style.margin = "0";
    body.style.backgroundColor = "#ffffff";
  }
  const root = clonedDoc.querySelector("[data-html2pdf-capture-root]");
  if (!root) return;
  let el = root;
  while (el && el !== body) {
    if (el.style) {
      const s = el.style;
      s.position = "relative";
      s.left = "0";
      s.top = "0";
      s.right = "auto";
      s.bottom = "auto";
      s.transform = "none";
      s.webkitTransform = "none";
      s.filter = "none";
      s.opacity = "1";
      s.visibility = "visible";
      s.zIndex = "auto";
      s.clipPath = "none";
      s.overflow = "visible";
    }
    el = el.parentElement;
  }
  clonedDoc.querySelectorAll(".printable-content, .itemized-bill-chart").forEach((node) => {
    node.style.overflow = "visible";
  });
}

async function mergePdfBlobs(blobs) {
  const out = await PDFDocument.create();
  for (const blob of blobs) {
    const src = await PDFDocument.load(await blob.arrayBuffer());
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  const bytes = await out.save();
  return new Blob([bytes], { type: "application/pdf" });
}

const PATIENT_PDF_ROW_CHUNK = 300;

const initialPatientPdfUi = () => ({
  rowStart: 0,
  omitPaymentSummary: false,
  omitBillsTable: false,
  hidePrintHeader: false,
});

const getSharpPdfScale = (scrollHeight) => {
  const MAX_PX = 12000;
  if (!scrollHeight || scrollHeight < 1) return 1.75;
  const fit = MAX_PX / scrollHeight;
  return Math.min(2, Math.max(1.15, fit));
};

function buildHtml2CanvasPdfOptions(element) {
  const scale = getSharpPdfScale(element.scrollHeight);
  const w = Math.max(1, Math.ceil(element.scrollWidth));
  const h = Math.max(1, Math.ceil(element.scrollHeight));
  return {
    scale,
    useCORS: true,
    letterRendering: true,
    logging: false,
    scrollX: 0,
    scrollY: -window.scrollY,
    allowTaint: true,
    backgroundColor: "#ffffff",
    windowWidth: w,
    windowHeight: h,
    onclone: fixHtml2PdfClone,
  };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const doubleRaf = () =>
  new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  );

async function waitUntilTableRowCount(getElement, expectedRows, maxAttempts, pollMs) {
  for (let a = 0; a < maxAttempts; a++) {
    const element = getElement();
    if (element) {
      const tableElement = element.querySelector(
        ".print-bill-table, .ant-table, table"
      );
      const n =
        tableElement?.querySelectorAll("tbody tr, .ant-table-tbody tr")
          ?.length || 0;
      if (n >= expectedRows) return true;
    }
    await sleep(pollMs);
  }
  return false;
}

const cardsStaticData = [
  {
    id: 1,
    title: "Total Paid Bill Amount",
    color: "#fff",
    fontColor: "#5A6774",
    amountKey: "totalPaidAmount",
    countKey: "count",
  },
  {
    id: 2,
    title: "Paid fully",
    color: "#A5D6A7",
    fontColor: "#3D8C40",
    amountKey: "paidFullyAmount",
    countKey: "paidFullyCount",
  },
  {
    id: 3,
    title: "Due",
    color: "#FFCC80",
    fontColor: "#ED8A00",
    amountKey: "dueAmount",
    countKey: "dueCount",
  },
  {
    id: 4,
    title: "Refunded",
    color: "#EF9A9A",
    fontColor: "#B73A3A",
    amountKey: "refundedAmount",
    countKey: "refundedCount",
  },
];

const dateFormat = "YYYY-MM-DD";
const showDateFormat = "DD MMM YYYY";

export default function BillingTable({
  patientData,
  handleTotalAdvanceUpdate,
  handleRefundComplete,
  dateRange,
  setDateRange,
  dateStatus,
  setDateStatus,
  selectedDoctors,
  setSelectedDoctors,
  createBillDrawer,
  setCreateBillDrawer,
  totalAdvanceBalance,
  showHideSubModal,
  billType,
  billData,
  setBillData,
  setBillingCount,
}) {
  const decodedToken = getDecodedToken();
  const isAdmin = decodedToken?.result?.admin;
  const [selectAll, setSelectAll] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [pickerModal, setPickerModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([
    "FullyPaid",
    "Due",
    "Refunded",
  ]);
  const [selectedSummaryType, setSelectedSummaryType] =
    useState("patient-level");
  const [downloadData, setDownloadData] = useState([]);
  const [itemizedBillData, setItemizedBillData] = useState(null);
  const [patientLevelBillData, setPatientLevelBillData] = useState(null);
  const [patientPdfUi, setPatientPdfUi] = useState(initialPatientPdfUi);
  const printableRef = useRef(null);
  const [tabLoader, setTabLoader] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [sortConfig, setSortConfig] = useState({ field: null, order: null });
  const [data, setData] = useState(null);
  const [cards, setCards] = useState([]);
  const [totalBillCount, setTotalBillCount] = useState(null);
  const [form3cTriggered, setForm3cTriggered] = useState(false);
  const { userId } = useSelector((state) => state.doctors);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const tableRef = useRef(null);

  // Drawer states
  const [openDownloadModal, setOpenDownloadModal] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const umIds = urlParams.get("um_id")?.split(",") || [];
  const umNames = urlParams.get("um_name")?.split(",") || [];
  const isReceptionist = urlParams.has("receptionist");

  const doctorsListFromKea = umIds?.map((id, index) => ({
    um_id: parseInt(id),
    um_name: umNames[index],
  }));
  const { doctorList } = useSelector((state) => state.bulkMessages);
  const finalDoctorList = isReceptionist ? doctorsListFromKea : doctorList;
  const doctorIds = isReceptionist
    ? doctorsListFromKea?.map((doctor) => doctor.um_id)
    : doctorList.map((doctor) => doctor.um_id).length > 0
    ? doctorList.map((doctor) => doctor.um_id)
    : [userId];
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.doctors);

  useEffect(() => {
    if (isAdmin) {
      dispatch(listDoctor());
    }
  }, []);

  useEffect(() => {
    // Update cards state whenever the summary prop changes
    const updatedCards = cardsStaticData.map((card) => ({
      ...card,
      amount: data?.summary[card?.amountKey] || 0,
      count: data?.summary[card?.countKey] || 0,
    }));
    // Calculate totalBillCount excluding refunded bills (card 4)
    // Only include cards 2 (Paid fully) and 3 (Due)
    const totalBillCount = updatedCards
      .slice(1, 3) // Extracts cards 2 and 3 only (excludes card 4 - Refunded)
      .reduce((sum, card) => sum + (card.count || 0), 0);
    setTotalBillCount(totalBillCount);
    setCards(updatedCards);
    
    // Update billing count in parent component when data changes
    if (setBillingCount && data?.summary?.count !== undefined) {
      setBillingCount(data.summary.count);
    }
  }, [data, setBillingCount]);

  const handleSelectAll = () => {
    setSelectedDoctors(finalDoctorList.map((doctor) => doctor.um_id));
    setSelectAll(true);
  };

  const handleDoctorSelection = (doctorId, checked) => {
    if (checked) {
      setSelectedDoctors([...selectedDoctors, doctorId]);
    } else {
      setSelectedDoctors(selectedDoctors.filter((id) => id !== doctorId));
    }
    setSelectAll(false); // Uncheck "All Doctors" if any specific doctor is selected
  };

  const onSearch = useCallback(
    (query) => {
      setPageNo(0);
      setSearchQuery(query);
    },
    [searchQuery]
  );

  const handlePickerModal = useCallback(() => {
    setPickerModal(!pickerModal);
  }, [pickerModal]);

  // Download Options Modal
  const handleOpenDownloadModal = () => {
    setOpenDownloadModal(!openDownloadModal);
  };

  const handleCheckboxChange = async (checkedValues) => {
    if (checkedValues?.includes("Due")) {
      checkedValues = ["CarriedForward", ...checkedValues];
    }
    setSelectedOptions(checkedValues);

    // Only fetch all data if there are selected options
    if (checkedValues.length > 0) {
      dispatch(setLoadingStatus(true));
      try {
        const allBills = await fetchAllData(checkedValues);
        setDownloadData([...allBills]);
      } catch (error) {
        console.error("Error fetching all bills for download:", error);
        message.error("Failed to prepare download data. Please try again.");
      } finally {
        dispatch(setLoadingStatus(false));
      }
    }
  };

  useEffect(() => {
    setDownloadData(
      data?.bills?.filter((item) =>
        selectedOptions.includes(item.paymentStatus)
      )
    );
  }, [selectedOptions, data]);

  const handleSortChange = (field, order) => {
    setSortConfig({ field, order }); // Update state
  };

  const handleDownloadData = async () => {
    if (selectedSummaryType === "item-level") {
      // Call fetchItemizedBillData API for Item-Level Bill Summary
      try {
        setDownloading(true);
        const response = await fetchItemizedBillData(
          dateRange.startDate,
          dateRange.endDate,
          billType
        );

        if (response?.totalPaidAmount > 0) {
          // Handle the itemized bill data response
          setItemizedBillData(response);

          // Wait for DOM (longer when table is large)
          const itemDelay = 800;
          setTimeout(() => {
            const element = printableRef.current;
            if (!element) {
              setDownloading(false);
              return;
            }
            const tableElement = element.querySelector(
              ".print-bill-table, .ant-table, table"
            );
            const tableRows = tableElement?.querySelectorAll(
              "tbody tr, .ant-table-tbody tr"
            );
            const renderedRowCount = tableRows?.length || 0;
            const tallContent = renderedRowCount > 400 || element.scrollHeight > 9000;
            const options = {
              filename: `billing_item_level_${userId || "report"}.pdf`,
              image: HTML2PDF_IMAGE,
              html2canvas: buildHtml2CanvasPdfOptions(element),
              margin: [0.3, 0.3, 0.2, 0.3],
              jsPDF: {
                unit: "in",
                format: "letter",
                orientation: "portrait",
                compress: true,
              },
              pagebreak: {
                mode: tallContent
                  ? ["css", "legacy"]
                  : ["avoid-all", "css", "legacy"],
              },
            };

            html2pdf()
              ?.from(element)
              ?.set(options)
              ?.output("blob")
              ?.then((blob) => {
                const url = URL.createObjectURL(blob);
                handleDownload(
                  url,
                  blob,
                  patientData ? patientData.patient_unique_id : userId,
                  setStartLoader,
                  !patientData
                );
                setDownloading(false);
              })
              .catch((err) => {
                console.error("Error generating PDF:", err);
                setDownloading(false);
              });
          }, itemDelay);
        } else {
          message.open({
            key: MESSAGE_KEY,
            type: "",
            className: "message-appointment",
            content: (
              <div className="d-flex align-items-center">
                <div className="title-common text-start fontroboto">
                  {"No Data available"}
                </div>
                <img
                  src={imgCloseVisit}
                  alt="close-visit"
                  className="ms-3"
                  onClick={() => message.destroy()}
                />
              </div>
            ),
            duration: 5,
          });
          setDownloading(false);
        }
      } catch (error) {
        console.error("Error fetching itemized bill data:", error);
        setDownloading(false);
      }
    } else {
      // Handle Patient-Level Bill Summary - Fetch all data before generating PDF
      try {
        setDownloading(true);
        
        // Prepare selected options - include "CarriedForward" if "Due" is selected
        let optionsToFetch = [...selectedOptions];
        if (optionsToFetch.includes("Due")) {
          optionsToFetch = ["CarriedForward", ...optionsToFetch];
        }
        
        // Fetch all data for the selected options
        const allBills = await fetchAllData(optionsToFetch);
        
        if (!allBills || allBills.length === 0) {
          message.open({
            key: MESSAGE_KEY,
            type: "",
            className: "message-appointment",
            content: (
              <div className="d-flex align-items-center">
                <div className="title-common text-start fontroboto">
                  {"No Data available"}
                </div>
                <img
                  src={imgCloseVisit}
                  alt="close-visit"
                  className="ms-3"
                  onClick={() => message.destroy()}
                />
              </div>
            ),
            duration: 5,
          });
          setDownloading(false);
          return;
        }
        
        const dataSize = allBills.length;

        const buildPatientPdfOptions = (element, multiPage) => ({
          filename: `billing_patient_level_${userId || "report"}.pdf`,
          image: HTML2PDF_IMAGE,
          html2canvas: buildHtml2CanvasPdfOptions(element),
          margin: [0.3, 0.3, 0.2, 0.3],
          jsPDF: {
            unit: "in",
            format: "letter",
            orientation: "portrait",
            compress: true,
          },
          pagebreak: {
            mode: multiPage
              ? ["css", "legacy"]
              : ["avoid-all", "css", "legacy"],
          },
        });

        const outputPatientPdfBlob = async (element, multiPage) =>
          html2pdf()
            .from(element)
            .set(buildPatientPdfOptions(element, multiPage))
            .output("blob");

        const capturePatientPdfChunk = async (slice, rowStart) => {
          const chunkLen = slice.length;
          flushSync(() => {
            setPatientPdfUi({
              rowStart,
              omitPaymentSummary: true,
              omitBillsTable: false,
              hidePrintHeader: rowStart > 0,
            });
            setPatientLevelBillData([...slice]);
          });
          const pollMs = 40 + Math.ceil(chunkLen / 12);
          const maxAttempts = Math.min(800, 80 + Math.ceil(chunkLen / 2));
          await sleep(Math.min(1800, 250 + chunkLen * 3));
          await waitUntilTableRowCount(
            () => printableRef.current,
            chunkLen,
            maxAttempts,
            pollMs
          );
          await sleep(Math.min(6000, 180 + chunkLen * 5));
          await doubleRaf();
          const element = printableRef.current;
          if (!element) throw new Error("Print target missing");
          const multiPage =
            chunkLen > 80 || element.scrollHeight > 5000;
          return outputPatientPdfBlob(element, multiPage);
        };

        try {
          let blob;
          if (dataSize > PATIENT_PDF_ROW_CHUNK) {
            const parts = [];
            for (let i = 0; i < dataSize; i += PATIENT_PDF_ROW_CHUNK) {
              parts.push(
                await capturePatientPdfChunk(
                  allBills.slice(i, i + PATIENT_PDF_ROW_CHUNK),
                  i
                )
              );
            }
            const paymentModes = data?.summary?.paymentModeSummary;
            if (paymentModes?.length > 0) {
              flushSync(() => {
                setPatientPdfUi({
                  rowStart: 0,
                  omitPaymentSummary: false,
                  omitBillsTable: true,
                  hidePrintHeader: false,
                });
                setPatientLevelBillData([]);
              });
              await sleep(500);
              await doubleRaf();
              const summaryEl = printableRef.current;
              if (!summaryEl) throw new Error("Print target missing");
              parts.push(await outputPatientPdfBlob(summaryEl, false));
            }
            blob = await mergePdfBlobs(parts);
          } else {
            flushSync(() => {
              setPatientPdfUi(initialPatientPdfUi());
              setPatientLevelBillData([...allBills]);
            });
            const pollMs = 40 + Math.ceil(dataSize / 12);
            const maxAttempts = Math.min(
              1200,
              100 + Math.ceil(dataSize / 2)
            );
            await sleep(Math.min(2000, 350 + Math.ceil(dataSize / 2.5)));
            const ready = await waitUntilTableRowCount(
              () => printableRef.current,
              dataSize,
              maxAttempts,
              pollMs
            );
            if (!ready) {
              console.warn(
                "PDF: row count still below expected; proceeding",
                dataSize
              );
            }
            await sleep(Math.min(10000, 200 + dataSize * 5));
            await doubleRaf();
            const element = printableRef.current;
            if (!element) throw new Error("Print target missing");
            const multiPage =
              dataSize > 80 || element.scrollHeight > 5000;
            blob = await outputPatientPdfBlob(element, multiPage);
          }
          const url = URL.createObjectURL(blob);
          handleDownload(
            url,
            blob,
            patientData ? patientData.patient_unique_id : userId,
            setStartLoader,
            !patientData
          );
        } catch (pdfErr) {
          console.error("Error generating patient PDF:", pdfErr);
          message.error("Failed to generate PDF. Please try again.");
        } finally {
          setPatientLevelBillData(null);
          setPatientPdfUi(initialPatientPdfUi());
          setDownloading(false);
        }
      } catch (error) {
        console.error("Error fetching all bills for download:", error);
        message.error("Failed to prepare download data. Please try again.");
        setDownloading(false);
      }
    }
  };

  const setStartLoader = () => {
    dispatch(setLoadingStatus(true));
  };

  const handleDownloadAll = async () => {
    const clinic = getClinic();
    const urlParams = new URLSearchParams(window.location.search);
    const receptionistId = urlParams.get("receptionistId");
    const receptionistName = urlParams.get("receptionistName");
    trackEvent("TP_download_report", {
      doctorSpeciality: profile?.dp_name,
      doctorId: profile?.doctor_unique_id,
      doctorContact: profile?.um_contact,
      city: clinic?.hm_city,
      pincode: clinic?.hm_pincode,
      receptionistId: receptionistId,
      receptionistName: receptionistName,
    });
    dispatch(setLoadingStatus(true));
    try {
      const allStatuses = ["FullyPaid", "CarriedForward", "Due", "Refunded"];
      const allBills = await fetchAllData(allStatuses);

      setDownloadData([...allBills]);

      // Ensure handleDownload runs after state is updated
      setTimeout(() => {
        handleDownloadData();
      }, 50);
    } catch (error) {
      console.error("Error in downloading all data:", error);
      message.error("Failed to download data. Please try again.");
    } finally {
      dispatch(setLoadingStatus(false));
    }
  };

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };

  const rangePresets = [
    {
      label: <div className={`${dateStatus === 1 ? "active" : ""}`}>Today</div>,
      value: [dayjs(), dayjs().endOf("day")],
    },
    {
      label: (
        <div className={`${dateStatus === 2 ? "active" : ""}`}>Last 7 days</div>
      ),
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: (
        <div className={`${dateStatus === 3 ? "active" : ""}`}>
          Last 30 days
        </div>
      ),
      value: [dayjs().add(-1, "M"), dayjs()],
    },
    {
      label: (
        <div
          className={`${!dateStatus ? "active" : ""}`}
          onClick={() => onRangeChange(null)}
        >
          Custom range
        </div>
      ),
      value: null,
    },
  ];

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      if (
        dayjs().format(dateFormat) ==
          moment(dateStrings[0], showDateFormat).format(dateFormat) &&
        dayjs().format(dateFormat) ==
          moment(dateStrings[1], showDateFormat).format(dateFormat)
      ) {
        setDateStatus(1);
      } else if (
        dayjs().add(-7, "d").format(dateFormat) ==
          moment(dateStrings[0], showDateFormat).format(dateFormat) &&
        dayjs().format(dateFormat) ==
          moment(dateStrings[1], showDateFormat).format(dateFormat)
      ) {
        setDateStatus(2);
      } else if (
        dayjs().add(-1, "M").format(dateFormat) ==
          moment(dateStrings[0], showDateFormat).format(dateFormat) &&
        dayjs().format(dateFormat) ==
          moment(dateStrings[1], showDateFormat).format(dateFormat)
      ) {
        setDateStatus(3);
      } else {
        setDateStatus(null);
      }
      setDateRange({
        startDate: moment(dateStrings[0], showDateFormat).format(dateFormat),
        endDate: moment(dateStrings[1], showDateFormat).format(dateFormat),
      });
    } else {
      setDateStatus(null);
      setDateRange({
        startDate: moment().format(dateFormat),
        endDate: moment().format(dateFormat),
      });
    }
  };

  // Dropdown content
  const menu = (
    <div
      className="download-options-container billing-table-wrapper"
      style={{
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        width: "320px",
      }}
    >
      {/* Patient-Level Bill Summary */}
      <div style={{ marginBottom: "20px" }}>
        <Radio
          value="patient-level"
          checked={selectedSummaryType === "patient-level"}
          onChange={(e) => setSelectedSummaryType(e.target.value)}
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          Patient-Level Bill Summary
        </Radio>

        {selectedSummaryType === "patient-level" && (
          <div style={{ marginLeft: "24px", marginTop: "15px" }}>
            <div
              style={{
                fontSize: "14px",
                color: "#666",
                marginBottom: "10px",
                fontWeight: "400",
              }}
            >
              Selected Specific Status
            </div>
            <Checkbox.Group
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
              value={selectedOptions}
              onChange={handleCheckboxChange}
            >
              <Checkbox value="FullyPaid">
                <span className="color-paid">Fully Paid</span>
              </Checkbox>
              <Checkbox value="Due">
                <span className="color-due">Due</span>
              </Checkbox>
              <Checkbox value="Refunded">
                <span className="color-refunded">Refunded</span>
              </Checkbox>
            </Checkbox.Group>
          </div>
        )}
      </div>

      {/* Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "20px 0",
          color: "#999",
        }}
      >
        <div style={{ flex: 1, height: "1px", background: "#e8e8e8" }}></div>
        <span style={{ margin: "0 15px", fontSize: "14px" }}>or</span>
        <div style={{ flex: 1, height: "1px", background: "#e8e8e8" }}></div>
      </div>

      {/* Item-Level Bill Summary */}
      <div style={{ marginBottom: "25px" }}>
        <Radio
          value="item-level"
          checked={selectedSummaryType === "item-level"}
          onChange={(e) => setSelectedSummaryType(e.target.value)}
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          Item-Level Bill Summary
        </Radio>
      </div>

      {/* Download Button */}
      <Spin spinning={downloading}>
        <Button
          type="primary"
          className="ant-btn-download"
          style={{
            width: "100%",
            display: `${
              selectedSummaryType === "item-level" || selectedOptions.length > 0
                ? ""
                : "none"
            }`,
          }}
          onClick={handleDownloadData}
          disabled={downloading}
        >
          Download
          <i className="icon-download fs-18" style={{ paddingLeft: "8px" }} />
        </Button>
      </Spin>
    </div>
  );

  // Function to handle form3c messages
  const handleMessageForm3c = () => {
    setForm3cTriggered((prev) => !prev); // Toggle state to trigger useEffect
  };

  const loadData = async (resetData = true) => {
    // setLoading(true);
    if (!hasMore && !resetData) return;
    const params = {
      status:
        selectedCard === 1
          ? ["FullyPaid", "Due", "CarriedForward"] // Exclude Refunded from card 1
          : selectedCard === 2
          ? ["FullyPaid"]
          : selectedCard === 3
          ? ["Due", "CarriedForward"]
          : ["Refunded"],
      sortBy: sortConfig?.field || "date",
      sortOrder: sortConfig?.order || "desc",
      page: resetData ? 1 : page,
      limit: 25,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      doctorIds:
        selectedDoctors.length > 0 ? [...selectedDoctors] : [...doctorIds],
      search: searchQuery || "",
    };

    try {
      const response = await fetchBillingDashboard(params, billType);
      setPage(resetData ? 2 : page + 1);
      setHasMore(response.bills.length >= 25);
      setData((prev) =>
        resetData
          ? response
          : { ...response, bills: [...(prev?.bills || []), ...response.bills] }
      );
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      // setLoading(false);
    }
  };

  const patientAdvanceData = async () => {
    // setLoading(true);
    const params = {
      status: "Deposit",
      sortBy: sortConfig?.field || "date",
      sortOrder: sortConfig?.order || "desc",
      page: 1,
      limit: 25,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      doctorIds:
        selectedDoctors.length > 0 ? [...selectedDoctors] : [...doctorIds],
      search: searchQuery || "",
      patientId: patientData?.patient_unique_id ?? "",
      // appointmentId: patientData?.pam_id,
    };
    try {
      const response = await listAdvancedDepositByPatient(params);
      handleTotalAdvanceUpdate(response?.summary?.totalAdvanceBalance);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (patientData && finalDoctorList?.length > 0 && !createBillDrawer) {
      patientAdvanceData();
    }
  }, []);

  const patientBillingData = async (resetData = true) => {
    if (!hasMore && !resetData) return;

    const params = {
      status:
        selectedCard === 1
          ? ["FullyPaid", "Due", "CarriedForward"] // Exclude Refunded from card 1
          : selectedCard === 2
          ? ["FullyPaid"]
          : selectedCard === 3
          ? ["Due", "CarriedForward"]
          : ["Refunded"],
      sortBy: sortConfig?.field || "date",
      sortOrder: sortConfig?.order || "desc",
      page: resetData ? 1 : page,
      limit: 25,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      doctorIds:
        selectedDoctors.length > 0 ? [...selectedDoctors] : [...doctorIds],
      search: searchQuery || "",
      patientId: patientData?.patient_unique_id,
      // appointmentId: patientData?.pam_id,
    };
    try {
      const response = await fetchBillsByPatient(params, billType);
      setPage(resetData ? 2 : page + 1);
      setHasMore(response.bills.length >= 25);
      setData((prev) =>
        resetData
          ? response
          : { ...response, bills: [...(prev?.bills || []), ...response.bills] }
      );
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (!createBillDrawer) {
      resetTableScroll();
      if (finalDoctorList?.length > 0 || userId) {
        // Reset data and pagination when billType changes
        setPage(1);
        setHasMore(true);
        const fetchData = patientData ? patientBillingData : loadData;
        fetchData(true); // Always reset data when fetching
      }
    }
  }, [
    selectedCard,
    dateRange,
    searchQuery,
    selectedDoctors,
    form3cTriggered,
    sortConfig,
    doctorList,
    createBillDrawer,
    billType, // Add billType to dependencies - triggers refetch when switching between OPD/IPD,
  ]);

  const handleRefundSuccess = () => {
    handleRefundComplete && handleRefundComplete();
  };

  const resetTableScroll = () => {
    // Using document.querySelector with a more specific selector
    const tableBody = document.querySelector(".billing-table .ant-table-body");
    if (tableBody) {
      tableBody.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: adds smooth scrolling
      });
    }
  };

  // Paginate until a short page. Must use the same page size the API actually returns;
  // if we ask for 1000 but the API caps at 100, `batch === 1000` is never true and we stop after one page.
  const fetchAllData = async (selectedOptions, pageSize = 25) => {
    let allBills = [];
    let currentPage = 1;
    let hasMoreData = true;
    const size = Math.min(Math.max(Number(pageSize) || 25, 1), 500);
    let pagesFetched = 0;
    const maxPages = 2500;

    while (hasMoreData && pagesFetched < maxPages) {
      const params = {
        status: selectedOptions,
        sortBy: sortConfig?.field || "date",
        sortOrder: sortConfig?.order || "desc",
        page: currentPage,
        limit: size,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        doctorIds:
          selectedDoctors.length > 0 ? [...selectedDoctors] : [...doctorIds],
        search: searchQuery || "",
      };

      try {
        const response = patientData
          ? await fetchBillsByPatient(
              {
                ...params,
                patientId: patientData?.patient_unique_id,
              },
              billType
            )
          : await fetchBillingDashboard(params, billType);
        const batch = response?.bills?.length ?? 0;
        pagesFetched += 1;
        if (batch === 0) {
          hasMoreData = false;
        } else {
          allBills = [...allBills, ...response.bills];
          currentPage += 1;
          hasMoreData = batch === size;
        }
      } catch (error) {
        console.error("Error fetching all bills:", error);
        hasMoreData = false;
      }
    }

    return allBills;
  };

  return (
    <div>
      <div className="billing-table-wrapper">
        <Row className="justify-content-between align-items-center my-2 px-4">
          <div>
            <Input
              value={searchQuery}
              placeholder={
                patientData
                  ? "Search by bill number"
                  : "Search by patient name / phone no / bill no"
              }
              className="inputheight38"
              prefix={<i className="icon-search" />}
              suffix={
                searchQuery.length > 0 && (
                  <i className="icon-Cross" onClick={() => onSearch("")}></i>
                )
              }
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <div className="d-flex flex-row gap-2">
            {(isAdmin || isReceptionist) && finalDoctorList?.length > 1 ? (
              <div className="doctor-select-container">
                <Select
                  className="doctor-select"
                  dropdownRender={(menu) => (
                    <div className="doctor-select-dropdown">
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <button
                          className="all-doctors-button"
                          onClick={() => handleSelectAll()}
                        >
                          All Doctors
                        </button>
                      </div>

                      <div className="doctor-select-divider">
                        <span>or</span>
                      </div>

                      <div className="custom-doctors-section">
                        <div className="section-title fs-16">
                          Select Custom Doctors
                        </div>
                        <div className="doctor-select-list">
                          {finalDoctorList.map((doctor) => (
                            <div
                              key={doctor.um_id}
                              style={{ padding: "8px 0" }}
                            >
                              <Checkbox
                                checked={selectedDoctors.includes(doctor.um_id)}
                                onChange={(e) =>
                                  handleDoctorSelection(
                                    doctor.um_id,
                                    e.target.checked
                                  )
                                }
                              >
                                {doctor.um_name}
                              </Checkbox>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  value="placeholder"
                >
                  <Option value="placeholder">
                    <div className="select-value-content">
                      {selectedDoctors.length > 0 ? (
                        <div className="selected-doctors-wrapper">
                          <div className="selected-doctors-tags">
                            {selectedDoctors.map((doctorId) => {
                              const doctor = finalDoctorList.find(
                                (d) => d.um_id === doctorId
                              );
                              return (
                                <span key={doctorId} className="doctor-tag">
                                  {doctor?.um_name}
                                  <i
                                    className="icon-Cross"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDoctorSelection(doctorId, false);
                                    }}
                                  />
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <span>Select Doctors</span>
                      )}
                    </div>
                  </Option>
                </Select>
              </div>
            ) : null}
            <div className="massage-date-wrapper">
              <div
                className="fs-14 h-100 w-100 d-flex align-items-center justify-content-between"
                onClick={handlePickerModal}
              >
                <span>
                  {dateStatus === 1 ? (
                    "Today"
                  ) : dateStatus === 2 ? (
                    "Last week"
                  ) : dateStatus === 3 ? (
                    "Last month"
                  ) : (
                    <>
                      {moment(dateRange.startDate).format(showDateFormat)} -{" "}
                      {moment(dateRange.endDate).format(showDateFormat)}
                    </>
                  )}
                </span>
                <i className="mx-2 fs-18 icon-calendar"></i>
              </div>
              <RangePicker
                disabledDate={(current) => disabledDate(current)}
                open={pickerModal}
                presets={rangePresets}
                format={showDateFormat}
                onChange={onRangeChange}
                popupClassName="massage-date"
                className="massage-input"
                inputReadOnly
                renderExtraFooter={() => (
                  <div className="d-flex align-items-center justify-content-between py-1">
                    <div>
                      {moment(dateRange.startDate).format(showDateFormat)} -{" "}
                      {moment(dateRange.endDate).format(showDateFormat)}
                    </div>
                    <div>
                      <button
                        className="btn btn-text me-3 px-0"
                        onClick={() => {
                          setDateStatus(1);
                          setDateRange({
                            startDate: moment().format(dateFormat),
                            endDate: moment().format(dateFormat),
                          });
                          handlePickerModal();
                        }}
                      >
                        <span>Cancel</span>
                      </button>
                      <Button
                        className="px-4"
                        type="primary"
                        onClick={handlePickerModal}
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                )}
                onOpenChange={() => {}}
                value={[
                  dateRange.startDate != dateRange.endDate
                    ? dayjs(
                        moment(dateRange.startDate).format(showDateFormat),
                        showDateFormat
                      )
                    : "",
                  dateRange.startDate != dateRange.endDate
                    ? dayjs(
                        moment(dateRange.endDate).format(showDateFormat),
                        showDateFormat
                      )
                    : "",
                ]}
              />
            </div>
            <div className="download-modal-container">
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                placement="bottomRight" // Positions the dropdown below the button
              >
                <div className="d-flex justify-content-between align-items-center billing-download">
                  <i
                    className="icon-download"
                    style={{ cursor: "pointer", color: "#4B4AD5" }}
                  ></i>
                </div>
              </Dropdown>
            </div>
          </div>
        </Row>
        <Row className="justify-content-between align-items-center px-4">
          <div className="card-container">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`card ${selectedCard === card.id ? "selected" : ""}`}
                onClick={() => setSelectedCard(card.id)}
                style={{
                  borderColor: "transparent",
                  background: `linear-gradient(180deg, ${card.color}4D 0%, ${card.color}00 35%)`,
                  position: "relative",
                }}
              >
                <div
                  className="card-title"
                  style={{ "--dynamic-color": card.fontColor }}
                >
                  {card.title}
                  {"("}
                  {card.id === 1 && data ? totalBillCount : card.count}
                  {")"}
                </div>
                <div className="card-amount">
                  ₹{parseFloat(card.amount).toFixed(2)}
                  {card.id === 1 && data && (
                    <span style={{ fontSize: "16px", fontWeight: 500 }}>
                      {"/"}₹
                      {parseFloat(data?.summary?.totalBillAmount).toFixed(2)}
                    </span>
                  )}
                </div>
                {selectedCard === card.id && (
                  <div
                    className="arrow-down"
                    style={{
                      position: "absolute",
                      bottom: "-10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 0,
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderTop: "10px solid #fff",
                      filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))",
                      zIndex: 1,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <BillTable
            billData={billData}
            setBillData={setBillData}
            selectedCard = {selectedCard}
            createBillDrawer={createBillDrawer}
            setCreateBillDrawer={setCreateBillDrawer}
            data={
              (patientData
                ? data?.bills?.map((item) => ({
                    ...item,
                    patient: data?.patient,
                  }))
                : data?.bills
              )?.filter((bill) => 
                // Filter out refunded bills when card 1 is selected
                selectedCard === 1 ? bill?.paymentStatus !== "Refunded" : true
              ) || []
            }
            isPatientScreen={patientData ? true : false}
            handleMessageForm3c={handleMessageForm3c}
            onSortChange={handleSortChange}
            getPatientBills={patientData ? patientBillingData : loadData}
            loadData={loadData}
            hasMore={hasMore}
            tableRef={tableRef}
            patientAdvanceData={patientData ? patientAdvanceData : ""}
            totalAdvanceBalance={totalAdvanceBalance}
            showHideSubModal={showHideSubModal}
            billType={billType}
          />
        </Row>

        {/* Patient-Level Bill Summary PDF generation */}
        {selectedSummaryType === "patient-level" && patientLevelBillData && (
          <div style={PRINTABLE_OFFSCREEN_STYLE}>
            <div
              ref={printableRef}
              data-html2pdf-capture-root
              style={{ backgroundColor: "#ffffff" }}
            >
              <DownloadBill
                downloadData={patientLevelBillData}
                parent={"billing"}
                dateRange={dateRange}
                isDoctorDashboard={!patientData}
                paymentSummary={data?.summary?.paymentModeSummary}
                tableRowNumberStart={patientPdfUi.rowStart}
                omitPaymentSummary={patientPdfUi.omitPaymentSummary}
                omitBillsTable={patientPdfUi.omitBillsTable}
                hidePrintHeader={patientPdfUi.hidePrintHeader}
              />
            </div>
          </div>
        )}

        {/* Hidden div for Itemized Bill Chart PDF generation */}
        {selectedSummaryType === "item-level" && itemizedBillData && (
          <div style={PRINTABLE_OFFSCREEN_STYLE}>
            <div
              ref={printableRef}
              data-html2pdf-capture-root
              style={{ backgroundColor: "#ffffff" }}
            >
              <ItemizedBillChart
                billData={itemizedBillData}
                profile={profile}
                dateRange={dateRange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
