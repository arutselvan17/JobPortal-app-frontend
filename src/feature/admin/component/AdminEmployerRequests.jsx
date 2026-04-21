import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployerRequests } from "../slice/AdminEmployerRequestSlice";
import {approveEmployerRequest} from "../slice/AdminEmployerRequestSlice"
import './AdminEmployerRequests.css'

export default function AdminEmployerRequests() {
  const dispatch = useDispatch();

  const { employers, loading, error } = useSelector(
    (state) => state.employerRequests
  
  );

  console.log(employers)
  useEffect(() => {
    dispatch(fetchEmployerRequests());
  }, [dispatch]);

  const handleApprove = (id) => {
    dispatch(approveEmployerRequest(id));
  };

  if (loading) return <p className="employer-loading">Loading...</p>;
  if (error) return <p className="employer-error">{error}</p>;

  return (
    <div className="employer-page">
      <h2 className="employer-title">Employer Verification</h2>

      <table className="employer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Designation</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employers && employers.length >0 ? (
            employers.map((emp) => (
              <tr key={emp.employerId}>
                <td>{emp.employerName}</td>
                <td>{emp.companyName}</td>
                <td>{emp.designation}</td>
                <td>{emp.location}</td>

                <td>
                  <button
                    className="employer-btn employer-btn-approve"
                    onClick={() => handleApprove(emp.employerId)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="employer-empty">
                No pending requests
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}