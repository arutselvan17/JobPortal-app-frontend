import React from "react";
import "../styles/AboutUs.css";
import img_1 from "../assets/AboutUs_1.png";
import img_2 from "../assets/AboutUs-2.png";
import img_3 from "../assets/AboutUs-3.jpeg";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function AboutSection() {
  return (
    <div>
      <Navbar />
      <section className="about-section">
        <div className="about-container">
          {/* Left Side Images */}
          <div className="about-images">
            <img src={img_2} alt="mobile" className="img-big" />

            <div className="small-images">
              <img src={img_1} alt="desktop" className="img-small" />

              <img src={img_3} alt="about" className="img-small" />
            </div>
          </div>

          {/* Right Side */}
          <div className="about-content">
            <h1>
              We're Only Working <br />
              With The Best
            </h1>

            <p>
              A clean and well-structured layout supports smooth content flow
              and improves readability. Balanced spacing and consistent styling
              help create a pleasant user experience across the page.
            </p>

            <div className="features">
              <div className="feature-box">
                <div className="icon-box">
                  <i className="bi bi-briefcase-fill"></i>
                </div>
                <span>Quality Job</span>
              </div>

              <div className="feature-box">
                <div className="icon-box">
                  <i className="bi bi-file-earmark-text-fill"></i>
                </div>
                <span>Several Contacts</span>
              </div>

              <div className="feature-box">
                <div className="icon-box">
                  <i className="bi bi-building-fill"></i>
                </div>
                <span>Top Companies</span>
              </div>

              <div className="feature-box">
                <div className="icon-box">
                  <i className="bi bi-award-fill"></i>
                </div>
                <span>Top Talents</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="portal-review">
        <div className="review">
          <h1>12k+</h1>
          <h3>Clients Worldwide</h3>
          <p>
            Trusted by thousands of companies to find the right talent quickly.
          </p>
        </div>

        <div className="review">
          <h1>20k+</h1>
          <h3>Active Resumes</h3>
          <p>Access a growing database of skilled professionals.</p>
        </div>

        <div className="review">
          <h1>5k+</h1>
          <h3>Successful Hirings</h3>
          <p>Helping businesses connect with the right candidates every day.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
