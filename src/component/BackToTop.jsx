import React, { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShow(window.scrollY > 200);
    });
  }, []);

  return (
    show && (
      <button
        className="btn btn-primary position-fixed bottom-0 end-0 m-3"
        onClick={() => window.scrollTo(0, 0)}
      >
        ↑
      </button>
    )
  );
}