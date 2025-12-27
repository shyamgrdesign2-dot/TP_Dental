import React from "react";
import { Modal } from "antd";
import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "./ConfirmModuleModal.scss";

/**
 * ConfirmModuleModal Component
 *
 * Modal for confirming custom module creation with preview.
 *
 * @param {Boolean} open - Controls modal visibility
 * @param {Function} onClose - Callback to close the modal
 * @param {Function} onConfirm - Callback when module is confirmed
 * @param {Object} moduleData - Module data to preview
 * @param {String} moduleData.moduleName - Name of the module
 * @param {Number} moduleData.columnCount - Number of columns
 * @param {Array} moduleData.columnLabels - Array of column labels
 * @param {Boolean} loading - Loading state for the confirm action
 */
const ConfirmModuleModal = ({
  open,
  onClose,
  onConfirm,
  moduleData,
  loading = false,
}) => {
  const {
    moduleName = "",
    columnCount = 2,
    columnLabels = [],
  } = moduleData || {};

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(moduleData);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      width={847}
      className="confirm-module-modal"
      maskClosable={false}
    >
      <div className="confirm-module-modal__content">
        {/* Header */}
        <div className="confirm-module-modal__header">
          <h2 className="confirm-module-modal__title">Confirm Custom Module</h2>
          <CloseOutlined
            className="confirm-module-modal__close-icon"
            onClick={onClose}
          />
        </div>

        {/* Module Preview */}
        <div className="confirm-module-modal__preview">
          <div className="confirm-module-modal__preview-table">
            {/* Column Headers */}
            <div className="confirm-module-modal__preview-row confirm-module-modal__preview-row--header">
              {columnLabels.map((label, index) => (
                <div
                  key={index}
                  className="confirm-module-modal__preview-cell confirm-module-modal__preview-cell--header"
                >
                  {label.toUpperCase() || `COLUMN ${index + 1}`}
                </div>
              ))}
            </div>

            {/* Placeholder Input Row */}
            <div className="confirm-module-modal__preview-row">
              {columnLabels.map((label, index) => (
                <div
                  key={index}
                  className="confirm-module-modal__preview-cell confirm-module-modal__preview-cell--input"
                >
                  <span className="confirm-module-modal__placeholder">
                    Enter {label || `Column ${index + 1}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Warning Note */}
        <div className="confirm-module-modal__warning">
          <ExclamationCircleOutlined className="confirm-module-modal__warning-icon" />
          <div className="confirm-module-modal__warning-content">
            <p>
              Note: You can <strong>edit or delete</strong> this module only
              until it's used in a <strong>Rx</strong>. Once it's used, it will
              be locked for <strong>edit/delete</strong> permanently. Please
              review the column names and structure before creating.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="confirm-module-modal__actions">
          <button
            className="confirm-module-modal__cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="confirm-module-modal__confirm-button"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Creating..." : "Yes, Create Module"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModuleModal;
