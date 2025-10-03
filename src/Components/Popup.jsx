// src/components/Popup.js
import React from "react";

export default function Popup({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div
      style={{
        background: type === "error" ? "#ff4d4f" : "#52c41a",
        color: "white",
        padding: "10px 20px",
        margin: "10px 0",
        borderRadius: "5px",
      }}
    >
      {message}
      <button onClick={onClose} style={{ marginLeft: "10px", background: "transparent", border: "none", color: "white" }}>
        ✖
      </button>
    </div>
  );
}
