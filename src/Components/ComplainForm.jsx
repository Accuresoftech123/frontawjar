import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDriverComplaint } from '../Helper/DriverPanel/DriverActions';
// import { creatememberComplaint } from '../actions/memberActions'; // Adjust path
// import { createvendorComplaint } from '../actions/vendorActions'; // Adjust path
import { toast } from 'react-toastify';
import "../Styles/ComplaintForm.css";
// import API from '../../utils/api'; // Assuming API is configured

const ComplaintForm = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.login);

  const userRole = data.user.role;
  const userId = data.user.user_id;

  // console.log("role and id", data.user.role);

  const [formData, setFormData] = useState({
    bookingId: '',
    reason: '',
    description: '',
    status: 'pending'
  });
  const [errors, setErrors] = useState({});
  const [bookingOptions, setBookingOptions] = useState([]);

  // Fetch booking options based on role (mocked for driver/member, add vendor if needed)
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Replace with real API endpoint
        // const response = await API.get(`/bookings?role=${userRole}&userId=${userId}`);
        // setBookingOptions(response.data.map(booking => ({
        //   id: booking.id,
        //   label: `Booking #${booking.id}`
        // })));

        // Mock data for now
        setBookingOptions([
          { id: 1, label: 'Booking #1' },
          { id: 2, label: 'Booking #2' }
        ]);
      } catch (error) {
        toast.error('Failed to fetch bookings');
      }
    };

    if (userRole === 'member' || userRole === 'driver' || userRole === 'vendor') {
      fetchBookings();
    }
  }, [userRole, userId]);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.bookingId) newErrors.bookingId = 'Booking ID is required';
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required';
    return newErrors;
  };

  // Handle input changes and validate form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Revalidate the entire form to update errors
    setErrors(validateForm());
  };

  // Run validation on mount to initialize errors state
  useEffect(() => {
    setErrors(validateForm());
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fill all required fields');
      return;
    }

    const complaintData = {
      description: formData.description,
      status: formData.status,
      booking: formData.bookingId,
      reason: formData.reason,
      [userRole.toLowerCase()]: userId
    };

    try {
      let result;
      if (userRole === 'driver') {
        result = await dispatch(createDriverComplaint(formData.bookingId, complaintData));
        console.log(formData.bookingId, complaintData);
      } else if (userRole === 'member') {
        // result = await dispatch(creatememberComplaint(formData.bookingId, complaintData)); // Commented out as per request
        result = { success: true, message: "member complaint submitted (dispatch commented out)" }; // Mock success for now
      } else if (userRole === 'vendor') {
        // result = await dispatch(createvendorComplaint(formData.bookingId, complaintData)); // Commented out as per request
        result = { success: true, message: "vendor complaint submitted (dispatch commented out)" }; // Mock success for now
      } else {
        throw new Error('Invalid user role');
      }

      if (result.success) {
        toast.success(result.message);
        setFormData({ bookingId: '', reason: '', description: '', status: 'pending' });
        setErrors(validateForm()); // Revalidate after reset
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to submit complaint');
    }
  };

  return (
    <div className="member-complaint-container">
      <h2 className="member-complaint-heading">
        Create Complaint - {userRole}
      </h2>
      <form onSubmit={handleSubmit} className="member-complaint-form">
        {(userRole === 'member' || userRole === 'driver' || userRole === 'vendor') && (
          <div className="member-form-group">
            <label htmlFor="bookingId" className="member-form-label">
              Booking ID
            </label>
            <select
              id="bookingId"
              name="bookingId"
              value={formData.bookingId}
              onChange={handleChange}
              className="member-form-select"
              aria-required="true"
            >
              <option value="">Select Booking</option>
              {bookingOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.bookingId && (
              <p className="member-error-text">{errors.bookingId}</p>
            )}
          </div>
        )}
        <div className="member-form-group">
          <label htmlFor="reason" className="member-form-label">
            Reason
          </label>
          <input
            id="reason"
            name="reason"
            type="text"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Enter reason for complaint"
            className="member-form-input"
            aria-required="true"
          />
          {errors.reason && <p className="member-error-text">{errors.reason}</p>}
        </div>
        <div className="member-form-group">
          <label htmlFor="description" className="member-form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Enter your complaint description here..."
            className="member-form-textarea"
            aria-required="true"
          />
          {errors.description && (
            <p className="member-error-text">{errors.description}</p>
          )}
        </div>
        <button
          type="submit"
          className="member-complaint-button"
          disabled={Object.keys(errors).length > 0}
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;