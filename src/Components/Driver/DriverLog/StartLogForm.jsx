import React, { useState } from "react";
import "../../../Styles/Driver/StartLogForm.css";

const StartLogForm = ({ onStart }) => {
  const [formData, setFormData] = useState({
    startTime: "",
    startLocation: "",
    startKm: "",
    remarks: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onStart) {
      onStart(formData);
    }
  };

  return (
    <div className="startlog_container">
      <h2 className="startlog_title">Start Work Log</h2>
      <form className="startlog_form" onSubmit={handleSubmit}>
        <div className="startlog_field">
          <label>Start Time</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="startlog_field">
          <label>Start Location</label>
          <input
            type="text"
            name="startLocation"
            placeholder="Enter location"
            value={formData.startLocation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="startlog_field">
          <label>Starting Kilometer</label>
          <input
            type="number"
            name="startKm"
            placeholder="Enter starting km"
            value={formData.startKm}
            onChange={handleChange}
            required
          />
        </div>

        <div className="startlog_field">
          <label>Remarks</label>
          <textarea
            name="remarks"
            placeholder="Any notes..."
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="startlog_btn">
          Start Log
        </button>
      </form>
    </div>
  );
};

export default StartLogForm;
