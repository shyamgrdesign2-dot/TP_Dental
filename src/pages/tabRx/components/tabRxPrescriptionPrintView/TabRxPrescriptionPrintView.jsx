import React, { useState, useCallback, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TabRxDigitiseCard.scss";
// import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Col, Row, Select, Button, message, Spin, Drawer } from "antd";
import { isMobile, browserName, isTablet } from "react-device-detect";
import axios from "axios";
import { saveAs } from "file-saver";
import { useReactToPrint } from "react-to-print";

// import { PDFReader } from 'reactjs-pdf-reader';

import {
  errorMessage,
  getClinic,
  getTokenData,
  isIPad,
  sendMessageToParent,
  trackEvent,
} from "../../../../utils/utils";

import wtsp from "../../../../assets/images/wtsp.svg";
import loadingImg from "../../../../assets/images/loading.png";

import { useSelector, useDispatch } from "react-redux";
import { useAccess } from "../../../vaccination/useAccess";

import { viewCaseManager } from "../../../../redux/caseManagerSlice";

import { pdfjs, Document, Page } from "react-pdf";
import { getGynecDetails } from "../../../../api/services/ApiGynec";
import {
  FAILED_VERIFICATION,
  FREE,
  LANGUAGE_LIST,
  PERSISTANT_STORAGE_KEY_AUTH_TOKEN,
  PERSISTANT_STORAGE_KEY_ZYDUS_TOKEN,
  S_RX_DIGITIZATION,
  WHATS_APP_API,
  WTSAP_ERR_MESSAGE,
  ZYDUS_WHATS_APP_API,
  ZYDUS_WHATSAPP_ENABLED_DOCTORS,
  FETCH_SMART_RX,
} from "../../../../utils/constants";
import { env } from "../../../../EnvironmentConfig";
import CreateBill from "../../../opdBilling/components/createBill/CreateBill";
import RecentBills from "../../../opdBilling/components/recentBills/RecentBills";
import {
  checkToShowOpdBilling,
  fetchBillsByPatient,
  listAdvancedDepositByPatient,
} from "../../../opdBilling/service";
import moment from "moment";
import { useOpdBilling } from "../../../opdBilling/useOpdBilling";
import { setShouldShowOpdBilling } from "../../../../redux/billingSlice";
import { printBlobInNewTab } from "../../../opdBilling/utils/helper";
import { getDecodedToken } from "../../../../utils/localStorage";
import {
  assignCarePlan,
  updateCarePlanName,
} from "../../../smartSync/services/carePlanService";
import api from "../../../../api/services/axiosService";
import {
  fetchPatientDefaultLanguage,
  updatePatientDefaultLanguage,
} from "../../../../api/services/DefaultLanguageService";
import { EVENTS } from "../../../../utils/events";
import { uploadDocsToAzure } from "../../../medicalRecords/service";
import { usePrintPayloadPdf } from "../../../../hooks/usePrintPayloadPdf";
import HeaderPrintView from "./HeaderPrintView";
import ReceiptText from "../../../../assets/images/navbar-icons/receipt-text.svg";
import EditIconPrimary from "../../../../assets/images/edit-icon-blue.svg";
import EditIcon from "../../../../assets/images/edit-white.png";
import ReceiptTextPrimary from "../../../../assets/images/receipt-text-white.svg";
import DownloadIcon from "../../../../assets/images/download.svg";
import printIcon from "../../../../assets/images/printer.svg";
import successIcon from "../../../../assets/images/success-icon.svg";
import { services } from "../../../../redux/doctorsSlice";
import { checkCredits } from "../../../../redux/monetizationSlice";
import { getTabRxFiles } from "../../services/tabRxService";
import TabRxEditRxModal from "../tabRxEditRxModal/TabRxEditRxModal";
import arrowRight from "../../../../assets/images/website-images/right-arrow-slider.svg";
import CvtKnowMore from "../../../smartSync/components/CvtKnowMore";

const worker = require("pdfjs-dist/build/pdf.worker.min.js");
pdfjs.GlobalWorkerOptions.workerSrc = worker;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.js",
//     import.meta.url
// ).toString();

const HoverIconButton = ({ defaultIcon, hoverIcon, text, onClick, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Button
      type="text"
      className="btn btn-input btnicon20 align-items-center d-flex mb-3 btn-41 w-100"
      icon={
        <img
          src={isHovered ? hoverIcon : defaultIcon}
          alt={text}
          width={22}
          height={22}
        />
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="fw-semibold">{text}</span>
      <i className="icon-right iconrotate180 ms-auto"></i>
    </Button>
  );
};

const containerStyle = {
  width: "100%",
  height: "25px",
  borderRadius: "16px",
  background:
    "linear-gradient(180deg, #DBEFDC 0%, #EDF7ED 50%, #DBEFDC 100%)",
  overflow: "hidden",
};

const progressStyle = {
  height: "100%",
  width: "0%",
  borderRadius: "16px",
  background:
    "linear-gradient(180deg, #94CF96 0%, #70BF73 50.35%, #94CF96 100%)",
  transition: "width 0.1s ease-in-out",
};

function TabRxPrescriptionPrintView() {
  const divRef = useRef(null);
  const printRef = useRef();

  const { loading } = useSelector((state) => state.caseManager);
  const { userId, profile, defaultPrintSettings } = useSelector(
    (state) => state.doctors,
  );
  const { servicesList } = useSelector((state) => state.doctors);
  const RX_DIGITIZATION_planDetails = servicesList?.find(e => e.service_name === S_RX_DIGITIZATION)
  const { isOpdBillChecked } = useSelector((state) => state.billing);
  const { isOpdBillingAccessable } = useOpdBilling();
  const [showDigitalRx, setShowDigitalRx] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { state } = useLocation();
  const {
    patient_data,
    pam_id,
    zydusSelectedLabParams,
    smartRxFilesData,
  } = state || {};

  const [selectedLang, setSelectedLang] = useState(
    defaultPrintSettings?.default_language &&
      defaultPrintSettings?.default_language !== "English"
      ? defaultPrintSettings?.default_language
      : 1,
  );
  const encodedData = btoa(selectedLang.toString());
  const [cvtDrawer, setCvtDrawer] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [smartRxFile, setSmartRxFile] = useState([]);
  const [viewCaseManagerData, setViewCaseManagerData] = useState(null);
  const [isRxDigitiseComplete, setRxDigitiseComplete] = useState(false);
  const [showProgressbar, setShowProgressbar] = useState(false);
  const progressRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [printUrl, setPrintUrl] = useState(
    state !== undefined
      ? `${state?.print_url}&pam_id=${pam_id}&lg=${encodedData}`
      : null,
  );
  const [currentSessionRx, setCurrentSessionRx] = useState(() => {
    if (state?.currentSessionRx instanceof Blob) return state.currentSessionRx;
    if (
      typeof state?.currentSessionRx === "string" &&
      state.currentSessionRx.length > 0
    ) {
      return state.currentSessionRx; // object URL string from configure print setting
    }
    return null;
  });

  // Detect a hard refresh so we don't reuse a stale object URL and skip the PDF fetch.
  const navigationEntry =
    window?.performance?.getEntriesByType?.("navigation")?.[0];
  const isPageReload = useRef(
    navigationEntry?.type === "reload" ||
    window?.performance?.navigation?.type === 1,
  ).current;

  // If the page was reloaded, treat it as not coming from Configure Print Setting
  const fromConfigurePrintSetting =
    Boolean(state?.fromConfigurePrintSetting) && !isPageReload;

  const [divWidth, setDivWidth] = useState(0);
  const [numPages, setNumPages] = useState();
  const [printBlob, setPrintBlob] = useState(null);

  const [gynecHistoryData, setGynecHistoryData] = useState(null);
  const [labParamsData, setLabParamsData] = useState([]);
  const [createBillDrawer, setCreateBillDrawer] = useState(false);
  const [recentBillDrawer, setRecentBillDrawer] = useState(false);
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);
  const [patientBills, setPatientBills] = useState([]);
  const [advanceReceipts, setAdvanceReceipts] = useState([]);
  const [patientWalletBalance, setPatientWalletBalance] = useState(0);
  const [billsUpdateKey, setBillsUpdateKey] = useState(0);
  const [isEditRxModalOpen, setIsEditRxModalOpen] = useState(false);
  const { isGynaecHistoryAccessable } = useAccess();
  const { planDetails } = useSelector((state) => state.subscription);

  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false);
  const [whatsAppButtonText, setWhatsAppButtonText] =
    useState("Send to WhatsApp");
  const [billData, setBillData] = useState(null);

  const baseUrl = env.lab_params_api_url;

  useEffect(() => {
    setDivWidth(divRef.current?.offsetWidth);
  }, [divRef]);


  // Initialize smart Rx files when coming from flows that pass smartRxFilesData in navigation state
  useEffect(() => {
    if (Array.isArray(smartRxFilesData) && smartRxFilesData.length > 0) {
      setSmartRxFile(smartRxFilesData);
      return;
    }

    const fetchTabRxFiles = async () => {
      try {
        const response = await getTabRxFiles(state.tcm_id, patient_data?.patient_unique_id);
        setRxDigitiseComplete(!!response?.data?.digitization?.isDigitize)
        setSmartRxFile(response?.data?.prescription_files || []);
      } catch (error) {
        console.error("Error fetching tab Rx files in TabRxPrescriptionPrintView:", error);
        setSmartRxFile([]);
      }
    };

    fetchTabRxFiles();
  }, [smartRxFilesData, state]);

  const getCaseManagerData = async () => {
    try {
      const sendData = {
        patient_unique_id: patient_data?.patient_unique_id || 0,
        tcm_id: state?.tcm_id,
      };
      const action = await dispatch(viewCaseManager(sendData));
      setViewCaseManagerData(action.payload);
      return action.payload; // return the data after it's fetched
    } catch (error) {
      console.error("Error fetching case manager data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (state?.tcm_id && patient_data?.patient_unique_id) {
        const viewCaseManagerData = await getCaseManagerData();
        setShowDigitalRx(
          viewCaseManagerData?.isRxDigitize && state?.page === "digitise"
        );
        setViewCaseManagerData(viewCaseManagerData);
      }
    };
    fetchData();
  }, [state?.tcm_id, patient_data?.patient_unique_id]);

  useEffect(() => {
    if (isGynaecHistoryAccessable) {
      fetchGynecHistory();
    }
  }, [isGynaecHistoryAccessable]);

  const fetchSmartRxFiles = async () => {
    const payload = {
      tcm_id: state?.tcm_id,
    };
    const baseUrl = { customBaseUrl: env.casemanager_api_url };
    try {
      const response = await api.post(FETCH_SMART_RX, payload, baseUrl);
      if (response?.data?.length) {
        setSmartRxFile(response?.data);
      } else {
        setSmartRxFile(null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchGynecHistory = async () => {
    try {
      const data = await getGynecDetails(
        patient_data?.patient_unique_id,
        userId,
      );
      setGynecHistoryData(data);
    } catch (error) {
      console.error("Error fetching gynec history:", error);
    }
  };

  const updateRxDigitizeInUrl = (url, showDigitalRx) => {
    const urlObj = new URL(url);

    if (showDigitalRx) {
      urlObj.searchParams.set("rxDigitize", "true");
    } else {
      urlObj.searchParams.delete("rxDigitize");
    }

    return urlObj.toString();
  };

  const getLabParams = async () => {
    try {
      const token = localStorage.getItem(PERSISTANT_STORAGE_KEY_AUTH_TOKEN);
      const cleanedToken = token.replace(/['"]+/g, "");
      const response = await axios.get(
        `${baseUrl}/api/v1/lab-parameters/results/${patient_data?.patient_unique_id}?today=true`,
        {
          headers: {
            Authorization: `Bearer ${cleanedToken}`,
          },
        },
      );
      setLabParamsData(response.data?.data?.results || []);
    } catch (error) {
      console.error("Error fetching lab params:", error);
    }
  };

  const getPatientDefaultLanguage = async () => {
    const res = await fetchPatientDefaultLanguage(
      patient_data?.patient_unique_id,
    );
    if (res?.settings?.defaultLanguage) {
      setSelectedLang(res?.settings?.defaultLanguage);
    }
  };

  useEffect(() => {
    getLabParams();
    getPatientDefaultLanguage();
  }, []);

  useEffect(() => {
    if (!createBillDrawer) {
      getPatientBills();
    } else {
      setCurrentSessionRx(null);
    }
  }, [createBillDrawer]);

  useEffect(() => {
    if (!state?.print_url) {
      return;
    }
    const encodedData = btoa(selectedLang.toString());
    const langUrl = `${state.print_url}&pam_id=${pam_id}&lg=${encodedData}`;
    const nextUrl = updateRxDigitizeInUrl(langUrl, showDigitalRx);
    if (nextUrl !== printUrl) {
      setPrintUrl(nextUrl);
      setPreviewUrl(nextUrl);
    }
  }, [selectedLang, state?.print_url, pam_id, printUrl, showDigitalRx]);

  const shouldSkipAutoFetch = Boolean(currentSessionRx) && !isPageReload;

  const {
    printBlob: generatedPrintBlob,
    isGenerating: isPdfGenerating,
    error: printPayloadError,
  } = usePrintPayloadPdf({
    printUrl,
    selectedLang,
    isGynaecHistoryAccessable,
    payloadOverride: null,
    skipFetch: shouldSkipAutoFetch,
  });

  useEffect(() => {
    if (!isPageReload) return;
    if (currentSessionRx) {
      if (typeof currentSessionRx === "string") {
        URL.revokeObjectURL(currentSessionRx);
      }
      setCurrentSessionRx(null);
    }
  }, [isPageReload, currentSessionRx]);

  useEffect(() => {
    if (fromConfigurePrintSetting) return;
    if (generatedPrintBlob) {
      setPrintBlob(generatedPrintBlob);
      setCurrentSessionRx(generatedPrintBlob);
    }
  }, [generatedPrintBlob, fromConfigurePrintSetting]);

  useEffect(() => {
    if (fromConfigurePrintSetting) return;
    if (printPayloadError) {
      message.error("Failed to load prescription data.");
    }
  }, [printPayloadError, fromConfigurePrintSetting]);

  useEffect(() => {
    if (!isOpdBillChecked) {
      getShowOpdBilling();
    }
  }, []);

  const getShowOpdBilling = async () => {
    const res = await checkToShowOpdBilling();
    dispatch(setShouldShowOpdBilling(res));
  };

  const getPatientBills = async (_, sortParams = {}) => {
    const queryParams = {
      doctorIds: [userId],
      sortBy: sortParams.field || "date",
      sortOrder: sortParams.order || "asc",
      page: 1,
      limit: 25,
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      patientId: patient_data?.patient_unique_id,
      appointmentId: pam_id || patient_data?.pam_id,
    };
    const response = await fetchBillsByPatient(queryParams);
    if (response?.bills?.length > 0) {
      const billData = response?.bills?.map((bill) => ({
        ...bill,
        patient: response?.patient,
      }));
      setPatientBills(billData);
    }
    const patientAdvanceDeposit =
      await listAdvancedDepositByPatient(queryParams);
    setPatientWalletBalance(
      patientAdvanceDeposit?.summary?.totalAdvanceBalance,
    );
    if (patientAdvanceDeposit?.receipts?.length > 0) {
      setAdvanceReceipts(patientAdvanceDeposit?.receipts);
    }
    // Increment key to force PDF reload
    setBillsUpdateKey((prev) => prev + 1);
  };

  const handleCreateBillDrawer = useCallback(() => {
    const clinic = getClinic();
    trackEvent("TP_Billing_CreateBill", {
      patientName: patient_data?.pm_fullname,
      patientId: patient_data?.patient_unique_id,
      doctorSpeciality: profile?.dp_name,
      doctorId: profile?.doctor_unique_id,
      doctorContact: profile?.um_contact,
      source: "rx_preview",
      city: clinic?.hm_city,
      pincode: clinic?.hm_pincode,
      subscriptionStatus: planDetails?.currentPlanStatus,
    });
    setCreateBillDrawer(!createBillDrawer);
    if (createBillDrawer) {
      setBillData(null);
    }
    if (recentBillDrawer) {
      setRecentBillDrawer(false);
    }
  }, [createBillDrawer]);

  const handleRecentBillDrawer = useCallback(() => {
    setRecentBillDrawer(!recentBillDrawer);
  }, [recentBillDrawer]);

  const showHideBackModal = () => {
    setIsBackModalOpen(!isBackModalOpen);
  };

  // const printContent = useReactToPrint({
  //     content: () => printRef.current,
  // });

  const asBlob = async (fileLike) => {
    if (fileLike instanceof Blob) return fileLike;
    if (typeof fileLike === "string") {
      try {
        const res = await fetch(fileLike);
        return await res.blob();
      } catch (e) {
        console.error("Failed to convert URL to Blob", e);
        return null;
      }
    }
    return null;
  };

  const printContent = async () => {
    const isMobileDevice = isMobile || isTablet || isIPad();
    const sourceFile = showDigitalRx ? previewUrl : (printBlob || currentSessionRx);
    if (!sourceFile) {
      message.error("PDF is not ready yet.");
      return;
    }
    const pdfBlob = await asBlob(sourceFile);
    if (!(pdfBlob instanceof Blob)) {
      message.error("PDF is not ready yet.");
      return;
    }

    if (isMobileDevice) {
      printBlobInNewTab(pdfBlob);
    } else {
      var blobURL = URL.createObjectURL(pdfBlob);
      // Remove all existing iframes
      document.querySelectorAll("iframe").forEach(function (iframe) {
        iframe.parentNode.removeChild(iframe);
      });
      var iframe = document.createElement("iframe"); //load content in an iframe to print later
      document.body.appendChild(iframe);
      iframe.style.display = "none";
      iframe.src = blobURL;
      iframe.onload = function () {
        setTimeout(function () {
          iframe.focus();
          iframe.contentWindow.print();
          // Revoke the Blob URL to avoid memory leaks
          URL.revokeObjectURL(blobURL);
        }, 1);
      };
    }
  };

  const printInAppContent = async () => {
    // navigate(`/prescription_print_view/?url=${currentSessionRx || printUrl}&key=print`, { replace: true, state: state })
    // navigate(0, { replace: true });
    const sourceFile = showDigitalRx ? previewUrl : (printBlob || currentSessionRx);
    if (!sourceFile) {
      message.error("PDF is not ready yet.");
      return;
    }
    const pdfBlob = await asBlob(sourceFile);
    if (!(pdfBlob instanceof Blob)) {
      message.error("PDF is not ready yet.");
      return;
    }
    const file = new File(
      [pdfBlob],
      `${new Date().toISOString().split("T")[0]}.pdf`,
      {
        type: "application/pdf",
      },
    );
    const formData = new FormData();
    formData.append(file?.name, file);
    const res = await uploadDocsToAzure(formData);
    const printUrl = res?.[0]?.url;
    sendMessageToParent(EVENTS.PRINT, { url: printUrl });
  };

  // const printContent = async () => {
  //     {(/Android/i.test(navigator.userAgent)) ? (
  //         window.open(printUrl, '_blank')
  //     ) : (
  //         <embed className="printBox" src={`${printUrl}#toolbar=0&navpanes=0&scrollbar=0`} height="100%" width="100%"></embed>
  //     )}
  //     const printWindow = await window.open('https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf');
  //     printWindow.print();
  // };

  const onSelect = useCallback(
    (data) => {
      setSelectedLang(data);
      updatePatientDefaultLanguage({
        patientId: patient_data?.patient_unique_id,
        default_language: data,
      });
      // Keep the configured PDF intact when returning from Configure Print Settings
      if (!fromConfigurePrintSetting) {
        setCurrentSessionRx(null);
      }
    },
    [selectedLang, printUrl, fromConfigurePrintSetting],
  );

  const handleDownload = async () => {
    try {
      const sourceFile = showDigitalRx ? previewUrl : (printBlob || currentSessionRx);
      const pdfBlob = await asBlob(sourceFile);
      if (pdfBlob instanceof Blob) {
        saveAs(pdfBlob, `${Date.now()}.pdf`);
      } else {
        message.error("PDF is not ready yet.");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  };

  const handleInAppDownload = async () => {
    // navigate(`/prescription_print_view/?url=${currentSessionRx || printUrl}&key=download`, { replace: true, state: state })
    // navigate(0, { replace: true });
    const sourceFile = showDigitalRx ? previewUrl : (printBlob || currentSessionRx);
    if (!sourceFile) {
      message.error("PDF is not ready yet.");
      return;
    }
    const pdfBlob = await asBlob(sourceFile);
    if (!(pdfBlob instanceof Blob)) {
      message.error("PDF is not ready yet.");
      return;
    }
    const file = new File(
      [pdfBlob],
      `${new Date().toISOString().split("T")[0]}.pdf`,
      {
        type: "application/pdf",
      },
    );
    const formData = new FormData();
    formData.append(file?.name, file);
    const res = await uploadDocsToAzure(formData);
    const printUrl = res?.[0]?.url;
    sendMessageToParent(EVENTS.DOWNLOAD, { url: printUrl });
  };

  const onEditPrescriptionClick = async () => {
    // Best-effort: sync care plan assignment/update based on available info
    await syncCarePlanAssignmentIfNeeded();
    if (showDigitalRx) {
      navigate("/tabrx-digitization", {
        state: {
          patient_data: patient_data,
          tcm_id: state?.tcm_id,
          pam_id: pam_id,
          fromEditRx: true,
          smartRxFilesData: smartRxFile,
          print_url: state.print_url,
          type: "edit",
          digitisedData: state?.digitisedData
        },
      });
    } else {
      const isDigitised = isRxDigitiseComplete || state?.page === "digitise" || state?.digitisedData;
      if (isDigitised) {
        setIsEditRxModalOpen(true);
      } else {
        handleEditWrittenRxConfirm();
      }
    }
  };

  const handleEditWrittenRxConfirm = () => {
    setIsEditRxModalOpen(false);
    navigate("/tab-rx", {
      state: {
        patient_data: patient_data,
        tcm_id: state?.tcm_id,
        pam_id: pam_id,
        fromEditRx: true,
        smartRxFilesData: smartRxFile,
        caseManagerData: viewCaseManagerData
      },
    });
  };

  const syncCarePlanAssignmentIfNeeded = async () => {
    try {
      // Gather identities
      const decoded = getDecodedToken();
      const tokenData = decoded?.result;
      const hm_id = tokenData?.clinic_id;
      const um_id = tokenData?.user_id;
      const tcm_id = state?.tcm_id;

      // If caller passed a selected care plan in navigation state, prefer it
      const selectedPlan = state?.selectedCarePlan || state?.carePlan || null;
      const plan_id = selectedPlan?.plan_id; // expected UUID for assignment API
      const plan_name =
        selectedPlan?.plan_name || state?.care_plan_name || null;

      // Update when editing an existing consultation and we have a name to update
      if (tcm_id && plan_name) {
        await updateCarePlanName(parseInt(tcm_id), plan_name);
        return;
      }

      // Otherwise, if we have enough info to create an assignment, do it
      if (
        !tcm_id &&
        plan_id &&
        patient_data?.patient_unique_id &&
        um_id &&
        hm_id
      ) {
        await assignCarePlan({
          plan_id,
          um_id,
          patient_unique_id: patient_data.patient_unique_id,
          hm_id,
        });
      }
      // If we don't have sufficient info, skip silently
    } catch (err) {
      console.error("CarePlan sync (assign/update) failed:", err);
    }
  };

  const handleZydusSendToWhatsapp = async () => {
    const decodedToken = getDecodedToken();
    const tokenData = decodedToken?.result;
    if (
      String(tokenData?.hospital_business_id) !== String(env.zydus_business_id)
    ) {
      return;
    }
    if (!patient_data?.patient_unique_id) {
      errorMessage("Patient unique ID is required");
      return;
    }
    const pm_pid = patient_data?.pm_pid;
    if (!pm_pid) {
      errorMessage("Patient ID (pm_pid/mrno/pm_id) is required");
      return;
    }
    if (!state?.tcm_id) {
      errorMessage("TCM ID is required");
      return;
    }
    const body = {
      patient_unique_id: parseInt(patient_data.patient_unique_id),
      pm_pid: String(pm_pid),
      tcm_id: parseInt(state.tcm_id),
    };
    setIsWhatsAppLoading(true);
    setWhatsAppButtonText("Sending...");
    try {
      const zydusToken = localStorage.getItem(
        PERSISTANT_STORAGE_KEY_ZYDUS_TOKEN,
      );
      const parsedZydusToken = zydusToken ? JSON.parse(zydusToken) : null;
      const response = await api.post(ZYDUS_WHATS_APP_API, body, {
        customBaseUrl: env.casemanager_api_url,
        headers: {
          Authorization: `Bearer ${parsedZydusToken}`,
        },
      });
      if (response.status === true && response.data) {
        setWhatsAppButtonText("Successfully Sent");
        setTimeout(() => {
          setWhatsAppButtonText("Send to WhatsApp again");
        }, 3000);
      } else if (response.status === true && response.data === "invalid data") {
        console.error("API returned invalid data error:", response);
        errorMessage("Invalid data format. Please check patient information.");
        setWhatsAppButtonText("Send to WhatsApp");
      } else {
        setWhatsAppButtonText("Send to WhatsApp");
      }
    } catch (error) {
      console.error("WhatsApp API error:", error);
      // Handle 401 error by fetching new Zydus token
      if (error.response?.status === 401) {
        try {
          // Import the ictAuthToken function
          const { ictAuthToken } = await import("../../../../redux/appointmentsSlice");
          const action = await dispatch(ictAuthToken());
          if (action.meta.requestStatus === "fulfilled") {
            await localStorage.setItem(
              PERSISTANT_STORAGE_KEY_ZYDUS_TOKEN,
              JSON.stringify(action.payload.tokenNo),
            );
            // Retry the WhatsApp call
            const retryResponse = await api.post(ZYDUS_WHATS_APP_API, body, {
              customBaseUrl: env.casemanager_api_url,
              headers: {
                Authorization: `Bearer ${action.payload.tokenNo}`,
              },
            });
            if (retryResponse.status === true && retryResponse.data) {
              setWhatsAppButtonText("Successfully Sent");
              setTimeout(() => {
                setWhatsAppButtonText("Send to WhatsApp again");
              }, 3000);
            } else {
              errorMessage("Failed to send WhatsApp message");
              setWhatsAppButtonText("Send to WhatsApp");
            }
          } else {
            errorMessage("Failed to authenticate with Zydus");
            setWhatsAppButtonText("Send to WhatsApp");
          }
        } catch (tokenError) {
          console.error("Token refresh error:", tokenError);
          errorMessage("Authentication failed");
          setWhatsAppButtonText("Send to WhatsApp");
        }
      } else {
        errorMessage(WTSAP_ERR_MESSAGE);
        setWhatsAppButtonText("Send to WhatsApp");
      }
    } finally {
      setIsWhatsAppLoading(false);
    }
  };

  // function onDocumentLoadSuccess({ numPages }) {
  //     setNumPages(numPages);
  // }
  async function onDocumentLoadSuccess(successEvent) {
    setNumPages(successEvent?.numPages);
  }

  const configurePrintUrl = async () => {
    var sendData = {
      patient_unique_id:
        patient_data !== undefined ? patient_data.patient_unique_id : 0,
      tcm_id: state.tcm_id,
      configurePrintSetting: true,
    };
    const action = await dispatch(viewCaseManager(sendData));
    if (action.meta.requestStatus === "fulfilled") {
      navigate("/configure_print_setting", {
        state: {
          ...state,
          selectedLang: selectedLang,
          caseManagerData: {
            ...action.payload,
            patient_data: {
              ...action.payload.patient_data,
              pm_id: patient_data?.pm_id,
            },
            gynecHistoryData,
            labParamsData,
            zydusSelectedLabParams: zydusSelectedLabParams,
          },
          pam_id: pam_id,
          smartRxFile,
          from: "/tab-rx-prescription",
        },
      });
    } else {
      errorMessage(action.error);
    }
  };

  const pdfFile = currentSessionRx || printBlob;
  const hasPdfBlob = Boolean(
    (pdfFile instanceof Blob && pdfFile.size > 0) ||
    (typeof pdfFile === "string" && pdfFile.length > 0),
  );

  const handleDrawerCvtKnowMore = useCallback(() => {
    setCvtDrawer(!cvtDrawer);
  }, [cvtDrawer]);

  const showHideSubModal = useCallback(() => {
    setIsSubModalOpen(!isSubModalOpen);
  }, [isSubModalOpen]);

  const handleDigitiseRx = async () => {
    if (RX_DIGITIZATION_planDetails?.plan_tier === FREE && RX_DIGITIZATION_planDetails?.credit_balance <= 0) {
      showHideSubModal()
    } else if (RX_DIGITIZATION_planDetails?.plan_tier === FAILED_VERIFICATION) {
      showHideSubModal()
    } else {
      let sendData = {
        b2c_id: profile?.b2c,
        service_name: S_RX_DIGITIZATION
      }

      const action = await dispatch(checkCredits(sendData));
      if (action.meta.requestStatus === "fulfilled") {
        if (action?.payload?.hasOwnProperty("service_name")) {
          if (action?.payload?.plan_tier === FREE && action?.payload?.credit_balance <= 0) {
            if (action?.payload?.credit_balance != RX_DIGITIZATION_planDetails?.credit_balance) {
              await dispatch(services(sendData?.b2c_id))
            }
            showHideSubModal()
          } else if (action?.payload?.plan_tier === FAILED_VERIFICATION) {
            showHideSubModal()
          } else {
            try {
              if (!smartRxFile?.length) return;
              const path = "/tabrx-digitization";
              const navState = {
                patient_data: patient_data,
                smartRxFilesData: smartRxFile,
                tcm_id: state.tcm_id,
                pam_id: state?.pam_id,
                print_url: state.print_url,
                type: "new",
              };
              const tokenData = getTokenData();
              const clinic = getClinic(profile?.hospital_data);
              window.Moengage.track_event("TP_DigitizeTabRx", {
                patient_id: patient_data?.patient_unique_id || "",
                patient_name: patient_data?.pm_fullname || "",
                doctor_id: profile?.doctor_unique_id,
                doctor_name: profile?.um_name,
                doctor_specialty: profile?.dp_name,
                clinic_id: tokenData?.clinic_id,
                clinic_name: clinic?.hm_name,
                rx_id: state.tcm_id || " ",
                source: "print Preview page",
                device_details: navigator.userAgent
              });

              navigate(path, { state: navState });
            } catch (error) {
              console.error('Error in handleDigitiseRx:', error);
            }
          }
        } else {
          typeof action?.payload?.data?.error === 'object' ?
            errorMessage(action?.payload?.data?.error?.description)
            :
            errorMessage(action?.payload?.data?.message)
        }
      } else {
        errorMessage(action.payload.message)
      }
    }
  };

  return (
    <>
      <HeaderPrintView
        patient_data={patient_data}
        tcm_id={state?.tcm_id}
        printUrl={printUrl}
        pam_id={pam_id}
        selectedLang={selectedLang}
        onOpenPrintSettings={configurePrintUrl}
        onSelectLanguage={onSelect}
      />
      <div className={`${isMobile ? "p-0" : ""} w-100 bg-body`}>
        <Row gutter={{ xl: 40, lg: 0 }}>
          <Col md={7} sm={7} xl={6}>
            <div
              className={`${!isMobile ? "tabrx-actions-panel" : "border-top-0 border-start-0 border-bottom-0"} p-20 bg-white d-flex justify-content-between flex-column h-100`}
            >
              <div>
                {viewCaseManagerData?.isRxDigitize &&
                  state?.page === "digitise" && (
                    <div className="d-flex align-itms-center justify-content-between mb-3">
                      <button
                        className={`digital-btn ${!showDigitalRx
                          ? "digitise-toggle-btn"
                          : "active-digitise-toggle-btn"
                          }`}
                        onClick={() => setShowDigitalRx(true)}
                        style={{ padding: "7px 16px", flex: 1 }}
                      >
                        Digital Rx
                      </button>
                      <button
                        className={`written-btn ${showDigitalRx
                          ? "digitise-toggle-btn"
                          : "active-digitise-toggle-btn"
                          }`}
                        onClick={() => setShowDigitalRx(false)}
                        style={{ padding: "7px 16px", flex: 1 }}
                      >
                        Written Rx
                      </button>
                    </div>
                  )}
                <Button
                  type="text"
                  disabled={isPdfGenerating}
                  onClick={() => {
                    window.Moengage.track_event("print_select", {
                      language: LANGUAGE_LIST.find(
                        (e) => e.value == selectedLang,
                      )?.label,
                    });
                    browserName == "Chrome WebView" || browserName == "WebKit"
                      ? printInAppContent()
                      : printContent();
                  }}
                  className="btn btn-input btnicon20 align-items-center d-flex mb-3 btn-41 w-100"
                  icon={<img src={printIcon} alt="Print Prescription" />}
                >
                  <span className="fw-semibold">{showDigitalRx ? "Print Digital Rx" : "Print Written Rx"}</span>
                  <i className="icon-right iconrotate180 ms-auto"></i>
                </Button>
                <Button
                  type="text"
                  className="btn btn-input btnicon20 align-items-center d-flex mb-3 btn-41 w-100"
                  icon={<img src={DownloadIcon} alt="Download Prescription" />}
                  disabled={isPdfGenerating}
                  onClick={() =>
                    browserName == "Chrome WebView" || browserName == "WebKit"
                      ? handleInAppDownload()
                      : handleDownload()
                  }
                >
                  <span className="fw-semibold">{showDigitalRx ? "Download Digital Rx" : "Download Written Rx"}</span>
                  <i className="icon-right iconrotate180 ms-auto"></i>
                </Button>
                <HoverIconButton
                  defaultIcon={EditIconPrimary}
                  hoverIcon={EditIcon}
                  text={showDigitalRx ? "Edit Digital Rx" : "Edit Written Rx"}
                  onClick={onEditPrescriptionClick}
                />
                {isOpdBillingAccessable && (
                  <HoverIconButton
                    defaultIcon={ReceiptTextPrimary}
                    hoverIcon={ReceiptText}
                    text={patientBills?.length > 0 ? "Create/ View Bill" : "Create Bill"}
                    onClick={
                      patientBills?.length === 0
                        ? handleCreateBillDrawer
                        : handleRecentBillDrawer
                    }
                  />
                )}
                {(() => {
                  const decodedToken = getDecodedToken();
                  const tokenData = decodedToken?.result;

                  // Check if current doctor has WhatsApp enabled
                  const currentDoctorPhone = profile?.um_contact
                    ?.toString()
                    .replace(/\D/g, "")
                    .slice(-10);
                  const isWhatsAppEnabled =
                    ZYDUS_WHATSAPP_ENABLED_DOCTORS.includes(currentDoctorPhone);

                  return tokenData?.hospital_business_id ==
                    env.zydus_business_id && isWhatsAppEnabled ? (
                    <>
                      <div className="bg-body d-flex p-3 rounded-10px border">
                        <img
                          src={wtsp}
                          alt="Whatsapp Icon"
                          className="align-self-baseline me-3"
                        />
                        <div className="fontroboto title-common">
                          <div className="fw-normal fontroboto mb-2">
                            Send this Written Rx to
                          </div>
                          {patient_data !== undefined
                            ? `WhatsApp +91 ${patient_data.pm_contact_no}`
                            : "-"}
                        </div>
                      </div>
                      <button
                        className="btn btn-send-to-wtsap btnicon20 align-items-center d-flex mb-3 btn-41 w-100"
                        onClick={handleZydusSendToWhatsapp}
                      >
                        {isWhatsAppLoading ? (
                          <img
                            src={loadingImg}
                            alt="Loading..."
                            width="25px"
                            height="25px"
                          />
                        ) : (
                          whatsAppButtonText
                        )}
                      </button>
                    </>
                  ) : null;
                })()}
              </div>

              {showProgressbar && !isRxDigitiseComplete && (
                <div className="tabrx-digitise-card-wrapper">
                  <div className="tabrx-digitise-card">
                    <div className="tabrx-digitise-card-inner" style={{ alignItems: "center", textAlign: "center", gap: "10px" }}>
                      <div style={containerStyle}>
                        <div ref={progressRef} style={progressStyle}></div>
                      </div>
                      <p className="tabrx-digitise-card-title" style={{ marginTop: "8px", width: "100%" }}>
                        {`${patient_data?.pm_fullname || 'Patient'}'s Rx is getting Digitised!`}
                      </p>
                      <p className="tabrx-digitise-card-desc">
                        Our AI engine is converting handwritten Rx into digital Rx. This may take up to 30 sec
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {!isRxDigitiseComplete && !showProgressbar && smartRxFile?.length > 0 && state?.page !== "digitise" && (
                <div className="tabrx-digitise-card-wrapper">
                  <div className="tabrx-digitise-card">
                    <div className="tabrx-digitise-card-inner" style={{ alignItems: "flex-start" }}>
                      <div className="tabrx-digitise-card-content">
                        <img src={successIcon} alt="success" className="tabrx-digitise-card-icon" />
                        <div className="tabrx-digitise-card-text">
                          <p className="tabrx-digitise-card-title">
                            {`${patient_data?.pm_fullname || 'Patient'}'s Digital Rx is ready!`}
                          </p>
                          <p className="tabrx-digitise-card-desc">
                            Digitise Rx to enhance patient care, streamline workflow, and unlock new revenue.
                            <button className="tabrx-digitise-card-know-more" onClick={handleDrawerCvtKnowMore}>
                              Know More
                            </button>
                          </p>
                        </div>
                      </div>
                      <button onClick={handleDigitiseRx} className="tabrx-digitise-card-btn">
                        Digitise Rx Now <img src={arrowRight} alt="arrow-right" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Col>
          <Col
            md={17}
            sm={17}
            xl={18}
            style={
              isMobile
                ? undefined
                : {
                  position: "sticky",
                  top: 92,
                  alignSelf: "flex-start",
                  display: "flex",
                  justifyContent: "center",
                }
            }
          >
            <div
              className={isMobile ? "p-20" : ""}
              style={
                isMobile
                  ? undefined
                  : {
                    width: "100%",
                    maxWidth: 820, // keep PDF width same as before
                  }
              }
            >
              <div className="d-flex align-itms-center justify-content-between">
                {/* <div className="d-flex align-items-center">
                  <label className="fontroboto">Select Language</label>
                  <Select
                    placeholder="English"
                    className="ms-3 appointmentselect"
                    value={LANGUAGE_LIST.find(
                      (item) => item.value == selectedLang,
                    )}
                    onSelect={onSelect}
                    options={LANGUAGE_LIST}
                  />
                </div> */}
              </div>
              <div
                className={`rounded-20px bg-white overflow-hidden ${!isMobile ? "mt-20" : ""}`}
              >
                <div
                  ref={divRef}
                  className="printheight"
                  style={{ height: "calc(100vh - 100px)" }}
                >
                  <div ref={printRef} className="position-relative h-100">
                    {hasPdfBlob ? (
                      <Document
                        key={`${currentSessionRx ? "session" : "generated"}-${billsUpdateKey}`}
                        loading={
                          <Spin
                            style={{
                              position: "absolute",
                              zIndex: 0,
                              left: "50%",
                              top: "50%",
                            }}
                          />
                        }
                        error={
                          <div
                            style={{
                              position: "absolute",
                              zIndex: 0,
                              left: "42%",
                              top: "50%",
                            }}
                          >
                            {"Failed to load PDF file."}
                          </div>
                        }
                        file={previewUrl}
                        onLoadError={(err) => {
                          console.error("PDF load error:", err);
                          setCurrentSessionRx(null);
                        }}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        {Array.apply(null, Array(numPages))
                          .map((x, i) => i + 1)
                          .map((page) => {
                            return (
                              <Page
                                key={Math.random()}
                                className={
                                  printBlob ? "react-pdf__Page_afterload" : null
                                }
                                loading={null}
                                width={divWidth}
                                pageNumber={page}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                              />
                            );
                          })}
                      </Document>
                    ) : (
                      <Spin
                        style={{
                          position: "absolute",
                          zIndex: 0,
                          left: "50%",
                          top: "50%",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {createBillDrawer && (
          <Drawer
            closeIcon={false}
            placement="right"
            bodyStyle={{ backgroundColor: "white" }}
            open={createBillDrawer}
            onClose={showHideBackModal}
            width="100%"
            push={false}
          >
            <CreateBill
              handleCreateBillDrawer={handleCreateBillDrawer}
              isBackModalOpen={isBackModalOpen}
              showHideBackModal={showHideBackModal}
              isRxPage={true}
              patientData={patient_data}
              editBillData={billData}
            />
          </Drawer>
        )}
        {recentBillDrawer && (
          <Drawer
            closeIcon={false}
            placement="right"
            open={recentBillDrawer}
            onClose={handleRecentBillDrawer}
            width="77%"
            push={false}
          >
            <RecentBills
              handleRecentBillDrawer={handleRecentBillDrawer}
              handleCreateBillDrawer={handleCreateBillDrawer}
              patientBills={patientBills}
              getPatientBills={getPatientBills}
              totalAdvanceBalance={patientWalletBalance}
              patientData={patient_data}
              billData={billData}
              setBillData={setBillData}
              createBillDrawer={createBillDrawer}
              setCreateBillDrawer={setCreateBillDrawer}
            />
          </Drawer>
        )}
        {isEditRxModalOpen && (
          <TabRxEditRxModal
            isOpen={isEditRxModalOpen}
            onCancel={() => setIsEditRxModalOpen(false)}
            onConfirm={handleEditWrittenRxConfirm}
          />
        )}
        <Drawer
          closeIcon={false}
          onClose={handleDrawerCvtKnowMore}
          open={cvtDrawer}
          className=".modalWidth-800"
          width={800}
        >
          <CvtKnowMore
            handleDrawerCvtKnowMore={handleDrawerCvtKnowMore}
            handleCollapsed={handleDrawerCvtKnowMore}
          />
        </Drawer>
      </div>
    </>
  );
}

export default TabRxPrescriptionPrintView;
