import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/AdminDashboard.css";
import { fetchAdminStats } from "../slice/AdminStatusSlice";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { stats, loading } = useSelector((state) => state.adminstatus);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  const pieData = [
    { name: "Employers", value: stats.totalEmployers },
    { name: "Employees", value: stats.totalEmployees },
    { name: "Jobs", value: stats.totalJobs },
    { name: "Requests", value: stats.totalRequests },
    { name: "Hires", value: stats.totalHires },
  ];

  // BAR DATA
  const barData = [
    { name: "Employers", value: stats.totalEmployers },
    { name: "Employees", value: stats.totalEmployees },
  ];

  const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

  if (loading) return <p>Loading...</p>;

  if (!stats) return <p>No data</p>;

  return (
    <div className="dashboard">
      <h2>Platform Overview</h2>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-title">Employers</div>
          <div className="stat-value">{stats.totalEmployers}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Jobs</div>
          <div className="stat-value">{stats.totalJobs}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Employees</div>
          <div className="stat-value">{stats.totalEmployees}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Pending Request</div>
          <div className="stat-value">{stats.totalRequests}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Total Blocked Account</div>
          <div className="stat-value">{stats.totalBlockedAccounts}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Categories</div>
          <div className="stat-value">{stats.totalCategories}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Total Hirings</div>
          <div className="stat-value">{stats.totalHires}</div>
        </div>
      </div>

       {/*  CHART SECTION */}
      <div className="chart-container">

        {/*  PIE CHART */}
        <div className="chart-box">
          <h3>Distribution (Pie Chart)</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/*  BAR CHART */}
        <div className="chart-box">
          <h3>Overview (Histogram)</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
