import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompany } from "../slice/AdminCompnaySlice";
import "../styles/PostCompany.css";

const emptyForm = {
  companyName: "",
  companyLocation: "",
  companyDescription: "",
  website: "",
};

export default function PostCompany({ onClose }) {
  const dispatch = useDispatch();
  const { posting, postError } = useSelector((state) => state.allcompany);

  const [formData, setFormData] = useState(emptyForm);
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    setLocalError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setFormData(emptyForm);
    setLocalError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.companyName.trim() || !formData.companyLocation.trim()) {
      setLocalError("Company Name and Location are required.");
      return;
    }

    const result = await dispatch(addCompany(formData));

    if (addCompany.fulfilled.match(result)) {
      setFormData(emptyForm);
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={handleClose}>
      <div className="pc-modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <button className="back-btn" onClick={handleClose}>
            ← Back
          </button>
          <h3>Post Company</h3>
        </div>

        {localError && <p className="form-error">{localError}</p>}
        {!localError && postError && (
          <p className="form-error">
            {typeof postError === "string" ? postError : "Failed to post company."}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="companyName"
            placeholder="Company Name *"
            value={formData.companyName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="companyLocation"
            placeholder="Location *"
            value={formData.companyLocation}
            onChange={handleChange}
          />
          <input
            type="text"
            name="companyDescription"
            placeholder="Description"
            value={formData.companyDescription}
            onChange={handleChange}
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
          />

          <div className="btn-row">
            <button type="button" className="cancel-btn" onClick={handleClose} disabled={posting}>
              Cancel
            </button>
            <button type="submit" disabled={posting}>
              {posting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}