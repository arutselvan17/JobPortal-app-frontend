import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../service/AxiosInstance";
import { fetchMyProfile } from "../slice/ProfileSlice";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/EmployeeInfo.css";

export default function EmployeeInfromation({ profile }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);

  const [experience, setExperience] = useState(profile.experience || 0);
  const [resume, setResume] = useState(profile.resume || "");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSaveExperience = async () => {
    try {
      setError(null);
      await axiosInstance.put("profile/employee/experience", { experience });
      setSuccess("Experience updated!");
      dispatch(fetchMyProfile());
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update experience");
    }
  };

  const handleSaveResume = async () => {
    try {
      setError(null);
      await axiosInstance.put("profile/employee/resume", { resume });
      setSuccess("Resume updated!");
      dispatch(fetchMyProfile());
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update resume");
    }
  };

  return (
    <div className="emp-section">
      <h3>Employee Information</h3>

      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <div className="emp-grid">

        {/* Experience Card */}
        <div className="emp-card">
          <label>Experience (years)</label>

          <div className="emp-input-row">
            <input
              type="number"
              min={0}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />

            <i
              className="bi bi-check-lg icon save"
              onClick={handleSaveExperience}
            ></i>
          </div>
        </div>

        {/* Resume Card */}
        <div className="emp-card">
          <label>Resume Link</label>

          <div className="emp-input-row">
            <input
              type="text"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste resume URL (Google Drive)"
            />

            <i
              className="bi bi-check-lg icon save"
              onClick={handleSaveResume}
            ></i>
          </div>
        </div>

      </div>
    </div>
  );
}