import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/ForgotPassword.css";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import axiosInstance from "../../../service/AxiosInstance";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const clearError = () => setError("");

  // countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Step 1 — Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearError();
    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      setStep(2);
      setTimer(10);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    clearError();
    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      setOtp("");
      setTimer(10);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearError();
    try {
      await axiosInstance.post("/auth/verify-otp", { email, otp });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3 — Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    clearError();
    try {
      await axiosInstance.post("/auth/reset-password", {
        email,
        newPassword,
        otp,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="fp-wrapper">
        <Navbar />

        {/* Progress indicators */}
        <div className="fp-steps">
          <div className={`fp-step ${step >= 1 ? "active" : ""}`}>1 Email</div>
          <div className="fp-step-line" />
          <div className={`fp-step ${step >= 2 ? "active" : ""}`}>2 OTP</div>
          <div className="fp-step-line" />
          <div className={`fp-step ${step >= 3 ? "active" : ""}`}>3 Reset</div>
        </div>

        {error && <div className="fp-error">{error}</div>}

        {/* Step 1 — Email */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="fp-form">
            <h2>Forgot Password</h2>
            <p className="fp-sub">Enter your email to receive an OTP</p>
            <div className="fp-field">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <button type="submit" className="fp-btn" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
            <button
              type="button"
              className="fp-link"
              onClick={() => navigate("/login")}
            >
              ← Back to Login
            </button>
          </form>
        )}

        {/* Step 2 — OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="fp-form">
            <h2>Enter OTP</h2>
            <p className="fp-sub">
              OTP sent to <strong>{email}</strong>
            </p>
            <div className="fp-field">
              <label>6-digit OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                maxLength={6}
                required
              />
            </div>
            <button type="submit" className="fp-btn" disabled={loading}>
              Verify OTP
            </button>

            {/* Resend OTP */}
            <div className="fp-resend">
              {timer > 0 ? (
                <span className="fp-resend-timer">Resend OTP in {timer}s</span>
              ) : (
                <button
                  type="button"
                  className="fp-resend-btn"
                  onClick={handleResendOtp}
                  disabled={loading}
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="button"
              className="fp-link"
              onClick={() => {
                setStep(1);
                clearError();
              }}
            >
              ← Back
            </button>
          </form>
        )}

        {/* Step 3 — New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="fp-form">
            <h2>Reset Password</h2>
            <p className="fp-sub">Enter your new password</p>
            <div className="fp-field">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                required
              />
            </div>
            <div className="fp-field">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
              />
            </div>
            <button type="submit" className="fp-btn" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
      <button
        type="button"
        className="fp-link"
        onClick={() => navigate("/login")}
      >
        ← Back to Login
      </button>
      <Footer />
    </div>
  );
}
