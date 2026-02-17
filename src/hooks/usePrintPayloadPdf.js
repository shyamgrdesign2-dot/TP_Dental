import { useEffect, useState } from "react";
import axios from "axios";
import { renderPrintPayloadToBlob } from "../utils/printPayload";

export const usePrintPayloadPdf = ({
  printUrl,
  selectedLang,
  isGynaecHistoryAccessable,
  payloadOverride,
} = {}) => {
  const [payload, setPayload] = useState(null);
  const [printBlob, setPrintBlob] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (payloadOverride) {
      setPayload(payloadOverride);
      return;
    }

    if (!printUrl) {
      setPayload(null);
      setPrintBlob(null);
      return;
    }

    let isCancelled = false;
    const fetchPayload = async () => {
      setIsGenerating(true);
      setError(null);
      try {
        const response = await axios.get(printUrl);
        const data = response?.data?.data || null;
        if (!isCancelled) {
          setPayload(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
          setPayload(null);
        }
      } finally {
        if (!isCancelled) {
          setIsGenerating(false);
        }
      }
    };

    fetchPayload();
    return () => {
      isCancelled = true;
    };
  }, [printUrl, payloadOverride]);

  useEffect(() => {
    if (!payload) {
      setPrintBlob(null);
      return;
    }

    let isCancelled = false;
    const buildPdf = async () => {
      setIsGenerating(true);
      setError(null);
      try {
        const blob = await renderPrintPayloadToBlob(payload, {
          selectedLang,
          isGynaecHistoryAccessable,
        });
        if (!blob) {
          throw new Error("Failed to generate PDF blob.");
        }
        const header = await blob.slice(0, 5).text();
        if (header !== "%PDF-") {
          const preview = await blob.slice(0, 200).text();
          console.error("PDF blob header mismatch", {
            size: blob.size,
            header,
            preview,
          });
          throw new Error(
            `Generated blob is not a PDF (header: ${header || "empty"}).`
          );
        }
        if (!isCancelled) {
          setPrintBlob(blob);
        }
      } catch (err) {
        console.error("Failed to generate PDF blob", err);
        if (!isCancelled) {
          setError(err);
          setPrintBlob(null);
        }
      } finally {
        if (!isCancelled) {
          setIsGenerating(false);
        }
      }
    };

    buildPdf();
    return () => {
      isCancelled = true;
    };
  }, [payload, selectedLang, isGynaecHistoryAccessable]);

  return { payload, printBlob, isGenerating, error };
};
