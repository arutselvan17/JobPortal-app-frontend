import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../slice/RegisterSlice";
import ToastMsg from "../../../component/Toast";
import { resetAuthState } from "../slice/RegisterSlice";
import "../Styles/Register.css";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.register);

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("MALE");
  const [role, setRole] = useState("EMPLOYER");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  // Error messages
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dobError, setDobError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [countryError, setCountryError] = useState("");

  useEffect(() => {
    if (success) {
      setToastMessage("Registered successfully!");
      setToastType("success");
      setShowToast(true);

      dispatch(resetAuthState());

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [success]);

  useEffect(() =>{
    if(error){
      setToastMessage(error)
      setToastType("danger")
      setShowToast(true)
    }
  },[error])

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setDobError("");
    setAddressError("");
    setCityError("");
    setStateError("");
    setCountryError("");

    let hasError = false;

    if (name === "") {
      setNameError("Name is required");
      hasError = true;
    }

    if (email === "") {
      setEmailError("Email is required");
      hasError = true;
    } else if (!email.includes("@")) {
      setEmailError("Email must contain @");
      hasError = true;
    }

    if (phone === "") {
      setPhoneError("Phone is required");
      hasError = true;
    } else if (phone.length !== 10) {
      setPhoneError("Phone must be 10 digits");
      hasError = true;
    } else if (!["6", "7", "8", "9"].includes(phone[0])) {
      setPhoneError("Must start with 6, 7, 8 or 9");
      hasError = true;
    }

    if (password === "") {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("At least 6 characters");
      hasError = true;
    }

    if (dob === "") {
      setDobError("Date of birth is required");
      hasError = true;
    }
    if (address === "") {
      setAddressError("Address is required");
      hasError = true;
    }
    if (city === "") {
      setCityError("City is required");
      hasError = true;
    }
    if (state === "") {
      setStateError("State is required");
      hasError = true;
    }
    if (country === "") {
      setCountryError("Country is required");
      hasError = true;
    }

    if (hasError) return;

    const formData = {
      name,
      email,
      phoneNumber: phone,
      password,
      dob,
      gender,
      role,
      address,
      city,
      state,
      country,
    };

    dispatch(registerUser(formData));
  };

  return (
    <div>
      <div className="page">
        <ToastMsg
          show={showToast}
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />

        <Navbar />

        <form onSubmit={handleSubmit} className="form-card">
          <h2 className="form-title">Create account</h2>
          <p className="form-sub">Fill in the details below to register</p>

          {/* API error from backend
          {error && <p className="api-error">{error}</p>} */}

          <p className="section-label">Personal Info</p>

          <div className="field">
            <label>Full name</label>
            <input
              placeholder="e.g. Arun Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="err">{nameError}</p>}
          </div>

          <div className="row-2">
            <div className="field">
              <label>Email</label>
              <input
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="err">{emailError}</p>}
            </div>
            <div className="field">
              <label>Phone number</label>
              <input
                placeholder="9876543210"
                value={phone}
                maxLength={10}
                onChange={(e) => setPhone(e.target.value)}
              />
              {phoneError && <p className="err">{phoneError}</p>}
            </div>
          </div>

          <div className="row-2">
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Min 6 chars"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="err">{passwordError}</p>}
            </div>
            <div className="field">
              <label>Date of birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              {dobError && <p className="err">{dobError}</p>}
            </div>
          </div>

          <div className="row-2">
            <div className="field">
              <label>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
            <div className="field">
              <label>Register as</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="EMPLOYER">Employer</option>
                <option value="EMPLOYEE">Job Seeker</option>
              </select>
            </div>
          </div>

          <hr className="divider" />
          <p className="section-label">Address</p>

          <div className="field">
            <label>Address</label>
            <input
              placeholder="Street / area"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {addressError && <p className="err">{addressError}</p>}
          </div>

          <div className="row-3">
            <div className="field">
              <label>City</label>
              <input
                placeholder="Chennai"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {cityError && <p className="err">{cityError}</p>}
            </div>
            <div className="field">
              <label>State</label>
              <input
                placeholder="Tamil Nadu"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              {stateError && <p className="err">{stateError}</p>}
            </div>
            <div className="field">
              <label>Country</label>
              <input
                placeholder="India"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              {countryError && <p className="err">{countryError}</p>}
            </div>
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
