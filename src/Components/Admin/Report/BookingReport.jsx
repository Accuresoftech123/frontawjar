import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, getBookingReport } from "../../../Helper/AdminPanel/AdminActions";
import "../../../Styles/Admin/Booking/BookingList.css";
import { useNavigate } from "react-router-dom";

const BookingReport = () => {
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
   // Handle report download
      const handleDownload = (format) => {
        dispatch(getBookingReport(format));
      };

  return (
    <div className="booking-list-container">
       <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      {/* <h2>Booking List</h2> */}
    </div>
     <div className="aduserlist_controls">
        <select
          onChange={(e) =>
            e.target.value ? handleDownload(e.target.value) : null
          }
        >
          <option value="">📄 रिपोर्ट डाउनलोड करा</option>
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
        </select>
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
              <th>बुकिंग आयडी</th>
              <th>सभासद</th>
              <th>वाहन</th>
              <th>तारीख</th>
              <th>स्थिती</th>
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

export default BookingReport;
