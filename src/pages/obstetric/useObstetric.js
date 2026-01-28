import React from "react";
import { fetchObstetricDetails } from "./service";

export default function useObstetric(patientId, doctorId) {
  const [obstetrics, setObstetrics] = React.useState([]);

  const getObstetrics = React.useCallback(async () => {
    try {
      if (!patientId || !doctorId) {
        return;
      }

      const res = await fetchObstetricDetails(patientId, doctorId, true);
      setObstetrics(res);
    } catch (error) {
    }
  }, [patientId, doctorId]);

  React.useEffect(() => {
    getObstetrics();
  }, [getObstetrics]);

  return obstetrics;
}
