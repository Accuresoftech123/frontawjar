import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Styles/Driver/LogHistory.css"; // optional styling
import { listDriverUsageLogs } from "../../../Helper/DriverPanel/DriverActions";
import { useDispatch } from "react-redux";

const LogHistory = () => {
  const dispatch = useDispatch();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(listDriverUsageLogs());
  }, [dispatch]);

  if (loading) return <p>Loading log history...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="loghistory_container">
      <h2>Log History</h2>
      {logs.length === 0 ? (
        <p>No log records found.</p>
      ) : (
        <table className="loghistory_table">
          <thead>
            <tr>
              <th>Booking ID</th>
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
