import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../../Helper/AdminPanel/AdminActions";
import "../../../Styles/Admin/Booking/BookingList.css";
import { useNavigate } from "react-router-dom";

const BookingList = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
  // Extract loading, bookings and error from redux state
  const { loading, bookings, error } = useSelector(
    (state) => state.bookingadmincreate
  );

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  // Safe fallback: If bookings is not an array, use []
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  return (
    <div className="booking-list-container">
       <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      <h2>बुकिंग यादी</h2>
    </div>
      {loading && <p>लोड करत आहे...</p>}
      {error && <p style={{ color: "red" }}>त्रुटी: {error}</p>}

      {!loading && !error && safeBookings.length === 0 && (
        <p>कोणतीही बुकिंग सापडली नाही.</p>
      )}

      {!loading && !error && safeBookings.length > 0 && (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Vehicle</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {safeBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.booking_id}</td>
                <td>{booking.user || booking.user || "N/A"}</td>
                <td>{booking.vehicle?.vehicle_name || booking.vehicle?.vehicle_name || "N/A"}</td>
                <td>{booking.booking_date || booking.booking_date || "N/A"}</td>
                <td>{booking.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingList;
