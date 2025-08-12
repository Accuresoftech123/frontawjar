import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createComplaint } from "../../Helper/Actions"
import { toast } from 'react-toastify';
import "../Styles/ComplaintForm.css"
 
const ComplaintForm = () => {
  const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.complaint);
 
  // Dummy values for now
  const driverId = 1; // Fetched from login API
  const bookingId = 123; // Fetched from login API
 
  const [description, setDescription] = useState('');
  const status = 'pending';
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // const complaintData = {
    //   description,
    //   status,
    //   driver_id: driverId, // Include if needed by API
    // };
    // console.log(bookingId,complaintData)
    // dispatch(createComplaint(bookingId, complaintData));
  };
 
  return (
    <div className="complaint-container">
      <h2 className="complaint-heading">Create Complaint</h2>
      <form onSubmit={handleSubmit} className="complaint-form">
        <div className="form-group">
          <label>Driver ID:</label>
          <input type="text" value={driverId} readOnly />
        </div>
        <div className="form-group">
          <label>Booking ID:</label>
          <input type="text" value={bookingId} readOnly />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <input type="text" value={status} readOnly />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Enter your complaint description here..."
          />
        </div>
        {/* {error && <p className="error-text">{error}</p>} */}
        <button type="submit">
          {/* {loading ? 'Submitting...' : 'Submit Complaint'} */}
        </button>
      </form>
    </div>
  );
};
 
export default ComplaintForm;
 