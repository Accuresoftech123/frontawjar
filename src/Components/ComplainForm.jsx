import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createDriverComplaint } from '../Helper/DriverPanel/DriverActions';
import { createMemberComplaint } from '../Helper/MemberPanel/MemberActions';
import { createVendorComplaint } from '../Helper/VendorPanel/VendorActions';
import { toast } from 'react-toastify';
import "../Styles/ComplaintForm.css";
import { listBookings } from "../Helper/MemberPanel/MemberActions";

const ComplaintForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.login);
  const { loading, bookings, error } = useSelector(
    (state) => state.memberbooking
  );

  useEffect(() => {
    dispatch(listBookings());
  }, [dispatch]);

  const userRole = data.user.role;
  const userId = data.user.user_id;

  const [formData, setFormData] = useState({
    bookingId: '',
    reason: '',
    description: '',
    status: 'pending'
  });
  const [errors, setErrors] = useState({});
  const [bookingOptions, setBookingOptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.bookingId) newErrors.bookingId = 'Booking ID is required';
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors(validateForm());
  };

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
      } else if (userRole === 'member') {
        result = await dispatch(createMemberComplaint(formData.bookingId, complaintData));
      } else if (userRole === 'vendor') {
        result = await dispatch(createVendorComplaint(formData.bookingId, complaintData));
      } else {
        throw new Error('Invalid user role');
      }

      if (result.success) {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          setFormData({ bookingId: '', reason: '', description: '', status: 'pending' });
          navigate('/Member/Dashboard');
        }, 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to submit complaint');
    }
  };

  return (
    <div className="complaint-container">
      <h2 className="complaint-heading">
        Create Complaint - {userRole}
      </h2>
      <form onSubmit={handleSubmit} className="complaint-form">
        {(userRole === 'member' || userRole === 'driver' || userRole === 'vendor') && (
          <div className="complaint-form-group">
            <label htmlFor="bookingId" className="complaint-form-label">
              Booking ID
            </label>
            <select
              id="bookingId"
              name="bookingId"
              value={formData.bookingId}
              onChange={handleChange}
              className="complaint-form-select"
              aria-required="true"
            >
              <option value="">Select Booking</option>
              {bookings.map((option) => (
                <option key={option.booking_id} value={option.booking_id}>
                  {option.booking_id}
                </option>
              ))}
            </select>
            {errors.bookingId && (
              <p className="complaint-error-text">{errors.bookingId}</p>
            )}
          </div>
        )}
        <div className="complaint-form-group">
          <label htmlFor="reason" className="complaint-form-label">
            Reason
          </label>
          <input
            id="reason"
            name="reason"
            type="text"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Enter reason for complaint"
            className="complaint-form-input"
            aria-required="true"
          />
          {errors.reason && <p className="complaint-error-text">{errors.reason}</p>}
        </div>
        <div className="complaint-form-group">
          <label htmlFor="description" className="complaint-form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Enter your complaint description here..."
            className="complaint-form-textarea"
            aria-required="true"
          />
          {errors.description && (
            <p className="complaint-error-text">{errors.description}</p>
          )}
        </div>
        <button
          type="submit"
          className="complaint-button"
          disabled={Object.keys(errors).length > 0}
        >
          Submit Complaint
        </button>
      </form>
      {showPopup && (
        <div className="complaint-popup">
          <div className="complaint-popup-content">
            <h3>Success!</h3>
            <p>Your complaint has been created successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintForm;