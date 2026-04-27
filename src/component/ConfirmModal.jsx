import React from "react";
import './styles/ConfirmModal.css'

export default function ConfirmModal({
  show,
  title = "Confirm",
  message = "Are you sure?",
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
}) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>
            {cancelText}
          </button>

          <button className="confirm-btn" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}