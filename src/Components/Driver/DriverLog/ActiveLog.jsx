import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../Styles/Driver/ActiveLog.css";
import {
  listDriverUsageLogs,
  toggleDriverBreak,
  completeDriverUsageLog,
} from "../../../Helper/DriverPanel/DriverActions";
import { useNavigate } from "react-router-dom";

const ActiveLog = ({ driverId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, logs, error } = useSelector((state) => state.usagelog);

  const [logData, setLogData] = useState(null);

  // for popup inputs
  const [formData, setFormData] = useState({
    reason: "",
    end_time: "",
    end_photo: null,
    remark: "",
  });

  const [popupType, setPopupType] = useState(null); // null | "break" | "complete"

  useEffect(() => {
    dispatch(listDriverUsageLogs());
  }, [dispatch]);

  useEffect(() => {
    if (logs && logs.length > 0) {
      const activeLog = logs.find(
        (log) => log.driver_id === driverId && log.is_active
      );
      setLogData(activeLog || null);
    }
  }, [logs, driverId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit from popup
  const handleSubmitPopup = (e) => {
    e.preventDefault();
    if (!logData) return;

    if (popupType === "break") {
      const payload = {
        usage_id: logData.id,
        action: "start_break",
        reason: formData.reason,
      };
      dispatch(toggleDriverBreak(payload));
    dispatch(listDriverUsageLogs());
      alert("ब्रेक सुरू झाला");
    }

    if (popupType === "endBreak") {
      const payload = {
        usage_id: logData.id,
        action: "end_break",
      };
      dispatch(toggleDriverBreak(payload));
    dispatch(listDriverUsageLogs());
      alert("ब्रेक संपला");
    }

    if (popupType === "complete") {
      const payload = {
        usage_id: logData.id,
        action: "end",
        end_time: formData.end_time,
        is_active: false,
        end_photo: formData.end_photo,
        remarks: formData.remark,
      };
      dispatch(completeDriverUsageLog(payload.usage_id,payload));
    dispatch(listDriverUsageLogs());
      alert("काम पूर्ण झाले");
      setLogData(null);
    }

    setPopupType(null);
    setFormData({ reason: "", end_time: "", end_photo: null, remark: "" });
  };

  if (loading) return <div> <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ मागे
        </button><p>लोड करत आहे...</p></div>,</div>;
  if (error) return <div> <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ मागे
        </button><p style={{ color: "red" }}>{error}</p></div></div>;
  if (!logData) return <div> <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ मागे
        </button><p>सध्या कोणताही सक्रिय लॉग नाही.</p></div></div>;

  return (
    <div className="activeLog_container">
       <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ मागे
        </button>
      <h2 className="activeLog_title">सध्याचा लॉग (Active Log)</h2></div>

      <form className="activeLog_form">
        <div className="form_group">
          <label>सदस्य आयडी</label>
          <input type="text" value={logData.member_id} readOnly />
        </div>

        <div className="form_group">
          <label>सेवा पत्ता</label>
          <textarea value={logData.service_address} readOnly />
        </div>

        <div className="form_group">
          <label>जिल्हा</label>
          <input type="text" value={logData.service_district} readOnly />
        </div>

        <div className="form_group">
          <label>तालुका</label>
          <input type="text" value={logData.service_taluka} readOnly />
        </div>

        <div className="form_group">
          <label>गाव</label>
          <input type="text" value={logData.service_village} readOnly />
        </div>

        <div className="form_group">
          <label>प्रारंभ वेळ</label>
          <input
            type="text"
            value={new Date(logData.start_time).toLocaleString()}
            readOnly
          />
        </div>

        <div className="form_group">
          <label>प्रारंभ फोटो</label>
          <img
            src={logData.start_photo}
            alt="Start"
            className="activeLog_photo"
          />
        </div>
      </form>

      {/* Action buttons */}
      <div className="activeLog_actions">
        <button
          className="activeLog_btn break"
          onClick={() => setPopupType("break")}
        >
          ब्रेक सुरू करा
        </button>
        <button
          className="activeLog_btn break"
          onClick={() => setPopupType("endBreak")}
        >
          ब्रेक समाप्त करा
        </button>
        <button
          className="activeLog_btn finish"
          onClick={() => setPopupType("complete")}
        >
          काम पूर्ण करा
        </button>
      </div>

      {/* Popup */}
      {popupType && (
        <div className="popup_overlay">
          <div className="popup_content">
            <h3>
              {popupType === "break" && "ब्रेक सुरू करा"}
              {popupType === "endBreak" && "ब्रेक समाप्त करा"}
              {popupType === "complete" && "काम पूर्ण करा"}
            </h3>

            <form onSubmit={handleSubmitPopup}>
              {popupType === "break" && (
                <div className="form_group">
                  <label>ब्रेक कारण</label>
                  <input
                    type="text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                  />
                </div>
              )}

              {popupType === "complete" && (
                <>
                  <div className="form_group">
                    <label>काम पूर्ण टीप</label>
                    <textarea
                      name="remark"
                      value={formData.remark}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form_group">
                    <label>समाप्ती वेळ</label>
                    <input
                      type="datetime-local"
                      name="end_time"
                      value={formData.end_time}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form_group">
                    <label>समाप्ती फोटो</label>
                    <input
                      type="file"
                      name="end_photo"
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div className="popup_actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setPopupType(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveLog;
