import { Button, Input, Select, Form } from "antd";
import CommonModal from "../common/CommonModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import {
  searchGeneric,
  addMedicine,
  editMedicine,
  updateFrequentlyMedication,
} from "../redux/medicationSlice";

// Self-contained popup: fetches data from store and handles add/edit internally
const CustomMedicinePopup = ({ isOpen, onCancel, initialData = null }) => {
  const dispatch = useDispatch();
  const { medicineTypeList, genericList, loading } = useSelector((state) => ({
    medicineTypeList: state.doctors.medicineTypeList,
    genericList: state.medication.genericList,
    loading: state.medication.loading,
  }));

  const [form, setForm] = useState(
    initialData || {
      tmm_medicine_name: "",
      tmy_id: undefined,
      tmy_title: undefined,
      tmm_generic: undefined,
      tmm_company: "",
    }
  );
  const [genericQuery, setGenericQuery] = useState("");

  useEffect(() => {
    if (genericQuery) {
      const id = setTimeout(() => dispatch(searchGeneric(genericQuery)), 500);
      return () => clearTimeout(id);
    }
  }, [genericQuery]);

  const onChangeMedicineName = useCallback(
    (e) => setForm({ ...form, tmm_medicine_name: e.target.value }),
    [form]
  );
  const onChangeCompanyName = useCallback(
    (e) => setForm({ ...form, tmm_company: e.target.value }),
    [form]
  );
  const onSelectMedicineType = useCallback(
    (data) => {
      if (data) setForm({ ...form, ...JSON.parse(data) });
      else {
        const { tmy_id, tmy_title, ...rest } = form;
        setForm(rest);
      }
    },
    [form]
  );
  const onSearchGeneric = useCallback((query) => setGenericQuery(query), []);
  const onSelectGeneric = useCallback(
    (data) => {
      if (data) setForm({ ...form, ...JSON.parse(data) });
      else {
        const { tmm_generic, ...rest } = form;
        setForm(rest);
      }
    },
    [form]
  );

  const onSubmit = useCallback(async () => {
    const payload = {
      tmm_id: form?.tmm_id,
      tmm_medicine_name: form?.tmm_medicine_name,
      tmm_type: form?.tmy_id,
      tmm_generic: form?.tmm_generic || "",
      tmm_company: form?.tmm_company || "",
    };
    const action = form?.tmm_id
      ? await dispatch(editMedicine(payload))
      : await dispatch(addMedicine(payload));
    if (action.meta.requestStatus === "fulfilled") {
      if (form?.tmm_id) {
        await dispatch(updateFrequentlyMedication(action.payload[0]));
      }
      onCancel?.();
      setForm(
        initialData || {
          tmm_medicine_name: "",
          tmy_id: undefined,
          tmy_title: undefined,
          tmm_generic: undefined,
          tmm_company: "",
        }
      );
      setGenericQuery("");
    }
  }, [form]);

  return (
    <CommonModal
      isModalOpen={isOpen}
      onCancel={onCancel}
      modalWidth={500}
      title={`${form?.tmm_id ? "Edit" : "Add"} Custom Medicine`}
      modalBody={
        <>
          <div>
            <Form.Item
              label={
                <>
                  Name <sup className="mt-3 text-danger fs-18">*</sup>
                </>
              }
              className="inputLabel-45"
            >
              <Input
                placeholder="Medicine Name"
                value={form?.tmm_medicine_name}
                onChange={onChangeMedicineName}
                className="inputheight45 text-capitalize"
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label={
                <>
                  Type <sup className="mt-3 text-danger fs-18">*</sup>
                </>
              }
              className="inputLabel-45"
            >
              <Select
                showSearch
                className="inputheight45 autocomplete-custom"
                placeholder="Medicine Type"
                defaultValue={
                  form?.tmy_title !== undefined ? form?.tmy_title : null
                }
                value={form?.tmy_title !== undefined ? form?.tmy_title : null}
                onSelect={onSelectMedicineType}
                options={medicineTypeList.map((e) => ({
                  value: JSON.stringify({ ...e }),
                  label: e.tmy_title,
                }))}
                onClear={() => onSelectMedicineType("")}
                allowClear
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Generic" className="inputLabel-45">
              <Select
                showSearch
                className="inputheight45 autocomplete-custom"
                placeholder="Generic Name"
                defaultValue={
                  form?.tmm_generic !== undefined ? form?.tmm_generic : null
                }
                value={
                  form?.tmm_generic !== undefined ? form?.tmm_generic : null
                }
                onSearch={onSearchGeneric}
                onSelect={onSelectGeneric}
                options={[...genericList, { tmm_generic: genericQuery }]
                  .filter((e) => e.tmm_generic)
                  .map((e, i, arr) => ({
                    value: JSON.stringify({ ...e }),
                    label:
                      i === arr.filter((x) => x.tmm_generic).length - 1 &&
                      genericQuery.length > 0 ? (
                        <>
                          <div>
                            {e.tmm_generic}
                            <i className="icon-Add mx-1 text-primary fs-6"></i>{" "}
                            <a className="fw-medium text-decoration-underline text-primary">
                              {" "}
                              Add Custom
                            </a>
                          </div>
                        </>
                      ) : (
                        <>{e.tmm_generic}</>
                      ),
                  }))}
                onClear={() => onSelectGeneric("")}
                notFoundContent={null}
                allowClear
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Company" className="inputLabel-45">
              <Input
                placeholder="Company Name"
                value={form?.tmm_company}
                onChange={onChangeCompanyName}
                className="inputheight45 text-capitalize"
              />
            </Form.Item>
          </div>
          <div className="mt-4">
            <div className="d-flex align-items-center mt-2 justify-content-end">
              <div onClick={onCancel} className="me-4 btn p-0 text-main">
                Cancel
              </div>
              <Button
                className="lh-lg btn btn-primary3 btn-41 px-4"
                onClick={onSubmit}
                loading={loading}
                disabled={
                  form?.tmm_medicine_name && form?.tmy_id ? false : true
                }
              >
                <span>{`${
                  form?.tmm_id ? "Update" : "Add"
                } Custom Medicine`}</span>
              </Button>
            </div>
          </div>
        </>
      }
    />
  );
};

export default CustomMedicinePopup;
