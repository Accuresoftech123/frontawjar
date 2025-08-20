import React, { useState, useEffect, useDebugValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../Styles/Driver/StartLogForm.css";
import { createDriverUsageLog } from "../../../Helper/DriverPanel/DriverActions";

const StartLogForm = ({ booking, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    driver_id: "",
    booking_id: "",
    member_id: "",
    vehicle_name: "",
    service_address: "",
    service_district: "",
    service_taluka: "",
    service_village: "",
    start_time: "",
    is_active: false,
    start_photo: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
        action:"start",
        driver_id: booking?.assigned_driver,
        booking_id: booking?.booking_id,
        member_id: booking?.user,
        vehicle_name: booking?.vehicle?.vehicle_name || "",
        service_address: booking?.service_address || "",
        service_district: booking?.service_district || "",
        service_taluka: booking?.service_taluka || "",
        service_village: booking?.service_village || "",
        start_time: formData.start_time,
        is_active: formData.is_active,
        start_photo: formData.start_photo,
    }
    console.log("Submitting StartFormLog:", payload);

    // FormData for API call
    const data = new FormData();
    Object.keys(payload).forEach((key) => {
      data.append(key, payload[key]);
    });
     dispatch(createDriverUsageLog(data));
       if (onClose) onClose();
  };

  return (
    <div className="startformlog_container">
      <h2 className="startformlog_title">Start Form Log</h2>
      <form className="startformlog_form" onSubmit={handleSubmit}>
        {/* Start DateTime */}
        <div className="form_group">
          <label>Start Date & Time</label>
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
          />
        </div>

        {/* Is Active */}
        <div className="form_group checkbox_group">
          <label>
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />
            Is Active
          </label>
        </div>

        {/* Photo Upload */}
        <div className="form_group">
          <label>Upload Start Photo</label>
          <input
            type="file"
            name="start_photo"
            accept="image/*"
            onChange={handleChange}
          />
          {formData.start_photo && (
            <p className="file_name">Selected: {formData.start_photo.name}</p>
          )}
        </div>

        <button type="submit" className="submit_btn">Submit Start Log</button>
      </form>
    </div>
  );
};

export default StartLogForm;
