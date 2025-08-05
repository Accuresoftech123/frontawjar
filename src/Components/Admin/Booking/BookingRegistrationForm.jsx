import React, { useState } from "react";
import "../../../Styles/Admin/Booking/BookingRegistrationForm.css";
import { useNavigate } from "react-router-dom";

const BookingRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: "",
    vehicle_id: "",
    booking_purpose_id: "",
    special_req: "",
    total_area: "",
    advance_rupees: "",
    remaining_charges: "",
    total_charges: "",
    village_id: "",
    service_address: "",
    booking_date: "",
    start_time: "",
    return_date: "",
    return_time: "",
    total_days: "",
    total_amount: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.user_id) newErrors.user_id = "कृपया वापरकर्ता निवडा";
    if (!formData.vehicle_id) newErrors.vehicle_id = "कृपया वाहन निवडा";
    if (!formData.booking_purpose_id) newErrors.booking_purpose_id = "कृपया कारण निवडा";
    if (!formData.total_area) newErrors.total_area = "कृपया एकूण क्षेत्र भरा";
    if (!formData.total_charges) newErrors.total_charges = "कृपया एकूण शुल्क भरा";
    if (!formData.village_id) newErrors.village_id = "गाव निवडा";
    if (!formData.service_address) newErrors.service_address = "सेवा पत्ता आवश्यक आहे";
    if (!formData.booking_date) newErrors.booking_date = "बुकिंग तारीख निवडा";
    if (!formData.start_time) newErrors.start_time = "प्रारंभ वेळ निवडा";
    if (!formData.return_date) newErrors.return_date = "परत तारीख निवडा";
    if (!formData.return_time) newErrors.return_time = "परत वेळ निवडा";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Booking Submitted:", formData);
      alert("बुकिंग यशस्वीरित्या नोंदवली गेली.");
      // API call to store booking goes here
    }
  };

  return (
    <div className="booking-form-container">
       <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      <h2 className="form-title">बुकिंग नोंदणी</h2></div>
      <form onSubmit={handleSubmit} className="booking-form-grid">

        {/* User */}
        <div className="form-group">
          <label>वापरकर्ता</label>
          <select name="user_id" value={formData.user_id} onChange={handleChange}>
            <option value="">वापरकर्ता निवडा</option>
            <option value="1">शिवाजी पाटील</option>
            <option value="2">संध्या मोरे</option>
          </select>
          {errors.user_id && <span className="error">{errors.user_id}</span>}
        </div>

        {/* Vehicle */}
        <div className="form-group">
          <label>वाहन</label>
          <select name="vehicle_id" value={formData.vehicle_id} onChange={handleChange}>
            <option value="">वाहन निवडा</option>
            <option value="10">ट्रॅक्टर 1</option>
            <option value="11">ट्रॅक्टर 2</option>
          </select>
          {errors.vehicle_id && <span className="error">{errors.vehicle_id}</span>}
        </div>

        {/* Purpose */}
        <div className="form-group">
          <label>बुकिंग कारण</label>
          <select name="booking_purpose_id" value={formData.booking_purpose_id} onChange={handleChange}>
            <option value="">कारण निवडा</option>
            <option value="A">शेती काम</option>
            <option value="B">वाहतूक</option>
          </select>
          {errors.booking_purpose_id && <span className="error">{errors.booking_purpose_id}</span>}
        </div>

        {/* Special Request */}
        <div className="form-group full-width">
          <label>विशेष विनंती</label>
          <textarea name="special_req" value={formData.special_req} onChange={handleChange} />
        </div>

        {/* Area */}
        <div className="form-group">
          <label>एकूण क्षेत्र (एकर)</label>
          <input type="number" name="total_area" value={formData.total_area} onChange={handleChange} />
          {errors.total_area && <span className="error">{errors.total_area}</span>}
        </div>

        {/* Charges */}
        <div className="form-group">
          <label>पेशगी रक्कम</label>
          <input type="number" name="advance_rupees" value={formData.advance_rupees} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>बाकी शुल्क</label>
          <input type="number" name="remaining_charges" value={formData.remaining_charges} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>एकूण शुल्क</label>
          <input type="number" name="total_charges" value={formData.total_charges} onChange={handleChange} />
          {errors.total_charges && <span className="error">{errors.total_charges}</span>}
        </div>

        {/* Village */}
        <div className="form-group">
          <label>गाव</label>
          <select name="village_id" value={formData.village_id} onChange={handleChange}>
            <option value="">गाव निवडा</option>
            <option value="101">वडगाव</option>
            <option value="102">तांबेवाडी</option>
          </select>
          {errors.village_id && <span className="error">{errors.village_id}</span>}
        </div>

        {/* Address */}
        <div className="form-group full-width">
          <label>सेवा पत्ता</label>
          <textarea name="service_address" value={formData.service_address} onChange={handleChange} />
          {errors.service_address && <span className="error">{errors.service_address}</span>}
        </div>

        {/* Dates & Times */}
        <div className="form-group">
          <label>बुकिंग तारीख</label>
          <input type="date" name="booking_date" value={formData.booking_date} onChange={handleChange} />
          {errors.booking_date && <span className="error">{errors.booking_date}</span>}
        </div>

        <div className="form-group">
          <label>प्रारंभ वेळ</label>
          <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} />
          {errors.start_time && <span className="error">{errors.start_time}</span>}
        </div>

        <div className="form-group">
          <label>परत तारीख</label>
          <input type="date" name="return_date" value={formData.return_date} onChange={handleChange} />
          {errors.return_date && <span className="error">{errors.return_date}</span>}
        </div>

        <div className="form-group">
          <label>परत वेळ</label>
          <input type="time" name="return_time" value={formData.return_time} onChange={handleChange} />
          {errors.return_time && <span className="error">{errors.return_time}</span>}
        </div>

        {/* Totals */}
        <div className="form-group">
          <label>एकूण दिवस</label>
          <input type="number" name="total_days" value={formData.total_days} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>एकूण रक्कम</label>
          <input type="number" name="total_amount" value={formData.total_amount} onChange={handleChange} />
        </div>

        {/* Submit */}
        <div className="form-group full-width center">
          <button type="submit" className="submit-button">नोंदणी करा</button>
        </div>
      </form>
    </div>
  );
};

export default BookingRegistrationForm;
