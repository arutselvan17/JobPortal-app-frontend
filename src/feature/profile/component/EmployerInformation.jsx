import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../service/AxiosInstance";
import { fetchMyProfile } from "../slice/ProfileSlice";
import "../styles/EmployerInformation.css";

export default function EmployerInformation({ profile }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);

  const [designation, setDesignation] = useState(profile.designation || "");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSave = async () => {
    try {
      setError(null);
      await axiosInstance.put("profile/employer/designation", {
        designation: designation,
      });
      setSuccess("Designation updated!");
      dispatch(fetchMyProfile());
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update designation");
    }
  };

  return (
    <div className="employer-section">
      <h3>Employer Information</h3>

      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <div className="form-row">
        <div className="form-field">
          <label>Designation</label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>
      </div>

      <button
        type="button"
        className="primary-btn"
        onClick={handleSave}
        disabled={loading}
      >
        Save Designation
      </button>
    </div>
  );
}
