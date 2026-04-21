import React, { useState } from "react";
import { updateProfile } from "../slice/ProfileSlice";
import "../styles/PersonalInfo.css";
import { useDispatch } from "react-redux";

export default function PersonalInfo({ profile, setToast }) {
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: profile.name || "",
    phoneNumber: profile.phoneNumber || "",
    dob: profile.dob || "",
    gender: profile.gender || "",
    address: profile.address || "",
    city: profile.city || "",
    state: profile.state || "",
    country: profile.country || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return showError("Name is required");
    }

    if (!form.phoneNumber.trim()) {
      return showError("Phone number is required");
    }

    if (!form.gender) {
      return showError("Gender is required");
    }

    dispatch(updateProfile(form));
    
    if (setToast) {
      setToast({
        show: true,
        message: "Profile updated successfully",
        type: "success",
      });
    }
  };

  const showError = (msg) => {
    setError(msg);

    if (setToast) {
      setToast({
        show: true,
        message: msg,
        type: "danger",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Personal Information</h3>

        {error && <p className="error-msg">{error}</p>}

        <div className="form-grid">
          <div className="form-field">
            <label>Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Phone</label>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div className="form-field">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>State</label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Country</label>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="primary-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}