import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, changeUserStatus } from "../slice/AdminUserSlice";
import "./AllUsers.css";

export default function AllUsers() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.alluser);

  const [emailFilter, setEmailFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // FILTER LOGIC
  const filteredUsers = users?.filter((user) => {
    return (
      user.email?.toLowerCase().includes(emailFilter.toLowerCase()) &&
      (roleFilter ? user.role === roleFilter : true) &&
      (statusFilter ? user.status === statusFilter : true) &&
      user.state?.toLowerCase().includes(locationFilter.toLowerCase())
    );
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>

      {/* FILTERS */}
      <div className="filters">

        <input
          type="text"
          placeholder="Search email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="EMPLOYER">Employer</option>
          <option value="EMPLOYEE">Employee</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="BLOCKED">Blocked</option>
        </select>

        <input
          type="text"
          placeholder="Search location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />

      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers?.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.userId}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td>
                    <span className={`badge-${user.role}`}>
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span className={`status ${user.status}`}>
                      {user.status}
                    </span>
                  </td>

                  <td>{user.state}</td>

                  <td className="actions">
                    <button className="view">View</button>

                    {user.status === "ACTIVE" ? (
                      <button
                        className="suspend"
                        onClick={() =>
                          dispatch(
                            changeUserStatus({
                              userId: user.userId,
                              status: "BLOCKED",
                            })
                          )
                        }
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        className="activate"
                        onClick={() =>
                          dispatch(
                            changeUserStatus({
                              userId: user.userId,
                              status: "ACTIVE",
                            })
                          )
                        }
                      >
                        Activate
                      </button>
                    )}

                    <button className="delete">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}