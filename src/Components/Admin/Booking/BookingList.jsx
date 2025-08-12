import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../../Helper/AdminPanel/AdminActions"; // adjust path
import "../../../Styles/Admin/Booking/BookingList.css"; // optional styling file

const BookingList = () => {
  const dispatch = useDispatch();

  // Extract loading, bookings and error from redux state
  const { loading, bookings, error } = useSelector((state) => state.bookingadmincreate);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <div className="booking-list-container">
      <h2>Booking List</h2>

      {loading && <p>लोड करत आहे...</p>}
      {error && <p style={{ color: "red" }}>त्रुटी: {error}</p>}

      {!loading && !error && bookings.length === 0 && <p>कोणतीही बुकिंग सापडली नाही.</p>}

      {!loading && !error && bookings.length > 0 && (
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
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.userName || booking.user?.name || "N/A"}</td>
                <td>{booking.vehicleName || booking.vehicle?.name || "N/A"}</td>
                <td>{booking.date || booking.bookingDate || "N/A"}</td>
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
