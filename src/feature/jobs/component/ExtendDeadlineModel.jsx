import React, { useState } from "react";
import "../styles/Myjobs.css";

export default function ExtendDeadlineModal({
  jobId,
  postedDate,
  deadLine,
  onClose,
  onExtend,
}) {
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const selected = new Date(date);
    const today = new Date();
    const posted = new Date(postedDate);
    const currentDeadline = new Date(deadLine);

    today.setHours(0, 0, 0, 0);

    if (!date) {
      setError("Please select a date");
      return;
    }

    if (selected <= today) {
      setError("Date must be in the future");
      return;
    }

    if (selected <= posted) {
      setError("Date must be after posted date");
      return;
    }

    if (selected <= currentDeadline) {
      setError("Date must be after current deadline");
      return;
    }
    setError("");
    onExtend(jobId, date);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Extend Deadline</h3>

        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setError(""); // clear error when typing
          }}
          min={new Date().toISOString().split("T")[0]}
        />

        {/* ✅ ERROR MESSAGE */}
        {error && <p className="error-text">{error}</p>}

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="extend-btn-modal" onClick={handleSubmit}>
            Extend
          </button>
        </div>
      </div>
    </div>
  );
}