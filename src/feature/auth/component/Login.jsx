import React, { useState, useEffect } from "react";
import "./Login.css";
import bg from "../asset/Joblogo.jpeg";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import ToastMsg from "../../../component/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage,setToastMessage] = useState("")
  const [toastType,setToastType] = useState("success")
  const [toastModel,setToastModel] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error, userRole } = useSelector(
    (state) => state.auth,
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email: email.trim(),
        password: password.trim(),
    }),   
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      setEmail("");
      setPassword("");

      // console.log(isAuthenticated);
      setToastModel(true)
      setToastMessage("Login SuccessFull")


      setTimeout(() =>{
        if (userRole === "ADMIN") {
        navigate("/admin/dashboard");
      }
      else if(userRole === "EMPLOYEE"){
         navigate("/employee/jobs");
      }
      else 
        navigate("/employer/my-jobs")
      },2000)
    }
  }, [isAuthenticated, userRole, navigate]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <div className="login-page" style={{ flex: 1 }}>
        <div className="login-card">
          {/* LEFT SIDE */}
          <div className="login-left">
            <div className="login-logo">
              <img src={bg} alt="Logo" className="login-logo-img" />
              <span className="login-logo-name">TalentBridge</span>
            </div>

            <div className="login-form-area">
              <h2 className="login-heading">Welcome back</h2>

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="login-input-wrapper">
                  <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input-field"
                    required
                  />
                </div>

                {/* Password */}
                <div className="login-input-wrapper">
                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input-field"
                    required
                  />
                </div>

                {/* ERROR MESSAGE */}
                {error && (
                  <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
                )}

                {/* Buttons */}
                <div className="login-action-row">
                  <button type="button" className="login-forgot-btn">
                    forgot password?
                  </button>

                  <button
                    type="submit"
                    className="login-sign-in-btn"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="login-right">
            <img src={bg} alt="logo" />
          </div>
        </div>
      </div>

      <Footer />

      <ToastMsg
      message={toastMessage}
      type={toastType}
      show={toastModel}
      onClose={() => setToastModel(false)}/>
    </div>
  );
}