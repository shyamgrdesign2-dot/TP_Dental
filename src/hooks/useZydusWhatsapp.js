import { useMemo, useEffect } from "react";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { GB_ZYDUS_WHATSAPP, ZYDUS_WHATSAPP_ENABLED_DOCTORS } from "../utils/constants";

/**
 * Determines if Zydus WhatsApp should be shown for the current doctor.
 * Returns true if EITHER:
 * 1. GrowthBook feature `zydus-doctor-whatsapp-enablement` (GB_ZYDUS_WHATSAPP) is on, OR
 * 2. Doctor's phone (last 10 digits) is in the hardcoded ZYDUS_WHATSAPP_ENABLED_DOCTORS list
 * 
 * This additive approach ensures no regression - existing doctors keep working via fallback list.
 */
export function useZydusWhatsapp(doctorPhone) {
  const isEnabledByGrowthBook = useFeatureIsOn(GB_ZYDUS_WHATSAPP);

  useEffect(() => {
    const normalized =
      doctorPhone != null && doctorPhone !== ""
        ? String(doctorPhone).replace(/\D/g, "").slice(-10)
        : "";
    console.log("[useZydusWhatsapp] um_contact / doctorPhone:", doctorPhone, "| last10:", normalized);
  }, [doctorPhone]);

  const isEnabledByPhoneList = useMemo(() => {
    if (!doctorPhone) return false;
    const normalizedPhone = String(doctorPhone).replace(/\D/g, "").slice(-10);
    return normalizedPhone.length === 10 && ZYDUS_WHATSAPP_ENABLED_DOCTORS.includes(normalizedPhone);
  }, [doctorPhone]);

  return isEnabledByGrowthBook || isEnabledByPhoneList;
}