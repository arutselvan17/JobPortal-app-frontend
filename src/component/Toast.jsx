import React, { useEffect } from "react";

export default function ToastMsg({ message, type = "success", show, onClose }) {

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();         
      }, 2000);

      return () => clearTimeout(timer); 
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
      <div className={`toast show text-bg-${type}`}>
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}