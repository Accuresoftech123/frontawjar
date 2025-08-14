import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingHistory } from "../../Helper/VendorPanel/VendorActions";
import "../../Styles/Admin/Booking/BookingList.css";
import { useNavigate } from "react-router-dom";

const VendorBookingList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, bhbookings, error } = useSelector(
    (state) => state.vendorbh
  );

  useEffect(() => {
    dispatch(fetchBookingHistory());
  }, [dispatch]);

  return (
    <div className="booking-list-container">
      <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ मागे
        </button>
      <h2>बुकिंग यादी</h2></div>

      {loading && <p>लोड करत आहे...</p>}
      {error && <p style={{ color: "red" }}>त्रुटी: {error}</p>}

      {!loading && !error && bhbookings.length === 0 && (
        <p>कोणतीही बुकिंग सापडली नाही.</p>
      )}

      {!loading && !error && bhbookings.length > 0 && (
        <table className="booking-table">
          <thead>
            <tr>
              <th>बुकिंग आयडी</th>
              <th>purpose</th>
              <th>वाहन नाव</th>
              <th>वाहन क्रमांक</th>
              <th>बुकिंग तारीख</th>
              <th>स्थिती</th>
            </tr>
          </thead>
          <tbody>
            {bhbookings.map((booking) => (
              <tr key={booking.booking_id}>
                <td>{booking.booking_id}</td>
                <td>{booking.purpose || "N/A"}</td>
                <td>{booking.vehicle?.vehicle_name || "N/A"}</td>
                <td>{booking.vehicle?.vehicle_no || "N/A"}</td>
                <td>{booking.booking_date || "N/A"}</td>
                <td>{booking.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VendorBookingList;
