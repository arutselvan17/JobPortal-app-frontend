import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployerStatus } from "../slice/EmployerStatusSlice";
import '../styles/EmployerStatus.css'

export default function EmployerStatusBar() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.employerStatus);

  useEffect(() => {
    dispatch(fetchEmployerStatus());
  }, [dispatch]);

  return (
    <div className="status-bar">
      <StatusItem label="Active Jobs" value={data?.totalActiveJob} />
      <StatusItem label="Total Applications" value={data?.totalApplication} />
      <StatusItem label="Hired" value={data?.totalhirings} />
      <StatusItem label="Pending Review" value={data?.pendingReview} />
    </div>
  );
}

function StatusItem({ label, value }) {
  return (
    <div className="status-item">
      <h3>{value ?? 0}</h3>
      <p>{label}</p>
    </div>
  );
}