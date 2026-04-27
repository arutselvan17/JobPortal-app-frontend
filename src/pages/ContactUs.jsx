import React, { useState } from "react";
import "../styles/ContactUs.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function ContactUs() {
  const [feedback, setFeedback] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback submitted successfully!");

    setFeedback({
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div>
      <Navbar/>
      <div className="contact-page">
        <h1 className="contact-title">Contact Us</h1>

        <div className="contact-container">
          {/* Left Side */}
          <div className="contact-info">
            <div className="info-box">
              <h3>
                <i className="bi bi-telephone-fill icon"></i>
                Call for inquiry
              </h3>
              <p>+91 9537185805</p>
            </div>

            <div className="info-box">
              <h3>
                <i className="bi bi-envelope-fill icon"></i>
                Send us email
              </h3>
              <p>admin@jobportal.com</p>
            </div>

            <div className="info-box">
              <h3>
                <i className="bi bi-clock-fill icon"></i>
                Opening hours
              </h3>
              <p>Mon - Fri: 10AM - 10PM</p>
            </div>

            <div className="info-box">
              <h3>
                <i className="bi bi-geo-alt-fill icon"></i>
                Office
              </h3>
              <p>4th Cross Road, Koramangala, Bangalore</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="feedback-box">
            <h2>Feedback Form</h2>
            <p>Your feedback helps us improve our platform.</p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email Address (Optional)"
                value={feedback.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={feedback.subject}
                onChange={handleChange}
                required
              />

              <textarea
                rows="6"
                name="message"
                placeholder="Write your feedback here..."
                value={feedback.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit">Submit Feedback</button>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
