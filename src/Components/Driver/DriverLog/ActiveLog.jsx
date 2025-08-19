import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Styles/Driver/ActiveLog.css";

const ActiveLog = ({ driverId }) => {
  const [logData, setLogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch active log on mount
  useEffect(() => {
    const fetchActiveLog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/driver-usage-logs/active/${driverId}/`);
        setLogData(response.data); // active log object
      } catch (err) {
        console.error(err);
        setError("सक्रिय लॉग लोड करण्यात त्रुटी आली.");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveLog();
  }, [driverId]);

  // Handle break
  const handleBreak = async () => {
    if (!logData) return;
    try {
      await axios.patch(`/api/driver-usage-logs/${logData.id}/`, {
        is_active: false,
        remarks: `${logData.remarks || ""} | Break started`,
      });
      alert("ब्रेक सुरू झाला");
      setLogData({ ...logData, is_active: false });
    } catch (err) {
      console.error(err);
      alert("ब्रेक सुरू करण्यात त्रुटी");
    }
  };

  // Handle finish
  const handleFinish = async () => {
    if (!logData) return;
    try {
      await axios.patch(`/api/driver-usage-logs/${logData.id}/finish/`, {
        end_time: new Date().toISOString(),
        remarks: `${logData.remarks || ""} | Work finished`,
      });
      alert("काम पूर्ण झाले");
      setLogData(null); // Clear active log after finishing
    } catch (err) {
      console.error(err);
      alert("काम पूर्ण करण्यात त्रुटी");
    }
  };

  if (loading) return <p>लोड करत आहे...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!logData) return <p>सध्या कोणताही सक्रिय लॉग नाही.</p>;

  return (
    <div className="activeLog_container">
      <h2 className="activeLog_title">सध्याचा लॉग (Active Log)</h2>
      <div className="activeLog_card">
        <p><strong>बुकिंग आयडी:</strong> {logData.booking_id}</p>
        <p><strong>प्रारंभ वेळ:</strong> {new Date(logData.start_time).toLocaleString()}</p>
        <p><strong>प्रारंभ स्थळ:</strong> {logData.start_location}</p>
        <p><strong>शुरू किलोमीटर:</strong> {logData.start_km}</p>
        <p><strong>टीप:</strong> {logData.remarks || "नाही"}</p>
      </div>

      <div className="activeLog_actions">
        <button className="activeLog_btn break" onClick={handleBreak}>
          ब्रेक सुरू करा
        </button>
        <button className="activeLog_btn finish" onClick={handleFinish}>
          काम पूर्ण करा
        </button>
      </div>
    </div>
  );
};

export default ActiveLog;
