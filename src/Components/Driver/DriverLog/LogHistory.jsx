import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Styles/Driver/LogHistory.css"; // optional styling
import { listDriverUsageLogs } from "../../../Helper/DriverPanel/DriverActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, logs, error } = useSelector(
    (state) => state.usagelog
  );

  useEffect(() => {
    dispatch(listDriverUsageLogs());
  }, [dispatch]);

  if (loading) return <p>Loading log history...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="loghistory_container">
       <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ मागे
        </button>
      <h2>Log History</h2>
      </div>
      {logs.length === 0 ? (
        <p>No log records found.</p>
      ) : (
        <table className="loghistory_table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Service Dirtrict</th>
              <th>Service Taluka</th>
              <th>Service Village</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Total Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.booking_id}</td>
                <td>{log.service_district}</td>
                <td>{log.service_taluka}</td>
                <td>{log.service_village}</td>
                <td>{new Date(log.start_time).toLocaleString()}</td>
                <td>{log.end_time ? new Date(log.end_time).toLocaleString() : "-"}</td>
                <td>{log.total_hours || "-"}</td>
                <td>{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LogHistory;
