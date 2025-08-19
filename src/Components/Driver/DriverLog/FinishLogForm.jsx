import React, { useState } from "react";
import "../../../Styles/Driver/FinishLogForm.css";

const FinishLogForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    endTime: "",
    endOdometer: "",
    remarks: "",
    endPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="finishlogform_container">
      <h2 className="finishlogform_title">Finish Work Log</h2>
      <form onSubmit={handleSubmit} className="finishlogform_form">
        <div className="finishlogform_group">
          <label>End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="finishlogform_group">
          <label>End Odometer (km)</label>
          <input
            type="number"
            name="endOdometer"
            value={formData.endOdometer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="finishlogform_group">
          <label>Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Write any remarks about the trip..."
          ></textarea>
        </div>

        <div className="finishlogform_group">
          <label>Completion Photo</label>
          <input type="file" name="endPhoto" onChange={handleChange} />
        </div>

        <div className="finishlogform_buttons">
          <button type="submit" className="finishlogform_submit">
            Finish Log
          </button>
          <button
            type="button"
            className="finishlogform_cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinishLogForm;
