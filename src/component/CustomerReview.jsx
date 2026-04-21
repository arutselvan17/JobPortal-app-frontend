import React from "react";

export default function CustomerReview() {
  return (
    <section id="customer-review" className="py-5">
      <div className="container text-center">
        <h1 className="mb-5">What Our Customers Say</h1>

        <div
          id="reviewCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">

            {/* SLIDE 1 */}
            <div className="carousel-item active">
              <div className="row g-4">

                <div className="col-md-4">
                  <div className="card shadow-sm p-3">
                    <div className="text-warning mb-2">★★★★★</div>
                    <h5>Amazing Service</h5>
                    <p>Found my job within a week!</p>
                    <h6 className="mb-0">Arutselvan</h6>
                    <small className="text-muted">Software Engineer</small>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card shadow-sm p-3">
                    <div className="text-warning mb-2">★★★★★</div>
                    <h5>Very Easy to Use</h5>
                    <p>Found a job quickly. Highly recommended!</p>
                    <h6 className="mb-0">Priya</h6>
                    <small className="text-muted">Data Analyst</small>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card shadow-sm p-3">
                    <div className="text-warning mb-2">★★★★★</div>
                    <h5>Professional Platform</h5>
                    <p>We found 5 great candidates!</p>
                    <h6 className="mb-0">Ramesh</h6>
                    <small className="text-muted">HR Manager</small>
                  </div>
                </div>

              </div>
            </div>

            {/* SLIDE 2 */}
            <div className="carousel-item">
              <div className="row g-4">

                <div className="col-md-4">
                  <div className="card shadow-sm p-3">
                    <div className="text-warning mb-2">★★★★★</div>
                    <h5>Highly Recommended</h5>
                    <p>Excellent job matching system.</p>
                    <h6 className="mb-0">John</h6>
                    <small className="text-muted">Recruiter</small>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card shadow-sm p-3">
                    <div className="text-warning mb-2">★★★★☆</div>
                    <h5>Great Support</h5>
                    <p>Customer support was very helpful.</p>
                    <h6 className="mb-0">Meena</h6>
                    <small className="text-muted">UI Designer</small>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card shadow-sm p-3">
                    <div className="text-warning mb-2">★★★★★</div>
                    <h5>Best Job Portal</h5>
                    <p>Clean layout and useful filters.</p>
                    <h6 className="mb-0">Karthik</h6>
                    <small className="text-muted">Backend Developer</small>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* CONTROLS */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#reviewCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon bg-dark rounded-circle p-3"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#reviewCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon bg-dark rounded-circle p-3"></span>
          </button>
        </div>
      </div>
    </section>
  );
}