import React, { useState } from "react";
import "../styles/SendAnnounceMent.css";
import { sendAnnoucement } from "../service/AdminService";

export default function Announcement() {
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("ALL");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const announcementData = {
      message: message.trim()
    };

    if (!announcementData.message) {
      setStatus("Message is required");
      return;
    }

    try {
      setLoading(true);
      setStatus("");

      const res = await sendAnnoucement(
        audience,
        announcementData
      );

      console.log(res.data);

      setStatus("Announcement Sent Successfully");
      setMessage("");
      setAudience("ALL");

    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log(error);

      setStatus(
        error.response?.data?.message ||
        "Failed To Send Announcement"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="announcement-container">
      <h2>Send Announcement</h2>

      <form onSubmit={handleSubmit} className="announcement-form">
        <textarea
          placeholder="Enter announcement message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="6"
          required
        />

        <select
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        >
          <option value="ALL">All Users</option>
          <option value="EMPLOYER">Employers</option>
          <option value="EMPLOYEE">Employees</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {status && <p className="success-msg">{status}</p>}
    </div>
  );
}