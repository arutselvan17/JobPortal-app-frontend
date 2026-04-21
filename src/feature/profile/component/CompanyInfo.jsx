import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompanyThunk, updateCompanyThunk } from "../slice/ProfileSlice";
import "../styles/CompanyInfo.css";

const emptyForm = {
  companyName: "",
  companyLocation: "",
  companyWebsite: "",
  companyDescription: "",
};

export default function CompanyInfo({ profile }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);
  const [error, setError] = useState("");

  const company = profile.company;

  const [form, setForm] = useState({
    companyName: company?.companyName || "",
    companyLocation: company?.companyLocation || "",
    companyWebsite: company?.companyWebsite || "",
    companyDescription: company?.companyDescription || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.companyName.trim()) {
      setError("Company name is required");
      return;
    }

    if (!form.companyWebsite.trim()) {
      setError("Website is required");
      return;
    }

    if (!form.companyLocation.trim()) {
      setError("Location is required");
      return;
    }

    if (!form.companyDescription.trim()) {
      setError("Description is required");
      return;
    }
    if (company) {
      dispatch(updateCompanyThunk(form));
    } else {
      dispatch(addCompanyThunk(form));
    }
  };

  return (
    <div className="company-section">
      <form onSubmit={handleSubmit}>
        <h3>Company Information</h3>

        {error && <p className="error-msg">{error}</p>}

        {/* Row 1 */}
        <div className="form-row">
          <div className="form-field">
            <label>Company Name</label>
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Website</label>
            <input
              name="companyWebsite"
              value={form.companyWebsite}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <div className="form-field full-width">
            <label>Location</label>
            <input
              name="companyLocation"
              value={form.companyLocation}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="form-row">
          <div className="form-field full-width">
            <label>Description</label>
            <input
              name="companyDescription"
              value={form.companyDescription}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Saving..." : company ? "Update Company" : "Add Company"}
        </button>
      </form>
    </div>
  );
}
