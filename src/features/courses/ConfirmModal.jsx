// src/components/ConfirmModal.jsx
import React from "react";

export default function ConfirmModal({ show, onConfirm, onCancel, message }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} style={{ background: "red", color: "white" }}>
            Okay
          </button>
          <button onClick={onCancel} style={{ background: "gray", color: "white" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
