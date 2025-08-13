import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createComplaint } from "../../Helper/Actions";
import { toast } from 'react-toastify';
import "../Styles/ComplaintForm.css";

const ComplaintForm = () => {
  const dispatch = useDispatch();
  const { role: userRole, id: userId } = useSelector((state) => state.login);
  const data = useSelector((state) => state.login);

  console.log("role and id", data.user.role)

  const [formData, setFormData] = useState({
    bookingId: '',
    reason: '',
    description: '',
    status: 'pending'
  });
  const [errors, setErrors] = useState({});
  const [bookingOptions, setBookingOptions] = useState([]);

  // Mock createComplaint action (uncomment and replace with actual import in production)
  const createComplaint = (roleId, complaintData) => ({
    type: 'CREATE_COMPLAINT',
    payload: { roleId, complaintData }
  });

  // Mock fetching booking options based on role
  useEffect(() => {
    if (userRole === 'Member') {
      // Simulate API call for booking IDs
      setBookingOptions([
        { id: 1, label: 'Booking #1' },
        { id: 2, label: 'Booking #2' }
      ]);
    }
  }, [userRole]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (userRole === 'Member' && !formData.bookingId) newErrors.bookingId = 'Booking ID is required';
    if (userRole !== 'Driver' && !formData.reason.trim()) newErrors.reason = 'Reason is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill all required fields');
      return;
    }

    const complaintData = {
      description: formData.description,
      status: formData.status,
      ...(userRole === 'Member' && { bookingId: formData.bookingId }),
      ...(userRole !== 'Driver' && { reason: formData.reason }),
      [userRole.toLowerCase() + '_id']: userId
    };

    try {
      dispatch(createComplaint(userId, complaintData));
      toast.success('Complaint submitted successfully');
      setFormData({ bookingId: '', reason: '', description: '', status: 'pending' });
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
        {userRole === 'Member' && (
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
        {userRole !== 'Driver' && (
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
        )}
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