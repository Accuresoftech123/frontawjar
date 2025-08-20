import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listBookings } from "../../../Helper/MemberPanel/MemberActions";
import "../../../Styles/Driver/DBookingList.css";
import { useNavigate } from "react-router-dom";
import StartLogForm from "./StartLogForm";

const DBookingList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [showLogForm, setShowLogForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { loading, bookings, error } = useSelector(
    (state) => state.memberbooking
  );

  useEffect(() => {
    dispatch(listBookings());
  }, [dispatch]);

  const handleStartWork = (booking) => {
    setSelectedBooking(booking);
    console.log("dblist",booking);
    setShowLogForm(true);
  };

  const handleCloseModal = () => {
    setShowLogForm(false);
    setSelectedBooking(null);
  };

  return (
    <div className="booking-list-container">
      <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ मागे
        </button>
        <h2>बुकिंग यादी</h2>
      </div>

      {loading && <p>लोड करत आहे...</p>}
      {error && <p style={{ color: "red" }}>त्रुटी: {error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p>कोणतीही बुकिंग सापडली नाही.</p>
      )}

      {!loading && !error && bookings.length > 0 && (
        <table className="booking-table">
          <thead>
            <tr>
              <th>बुकिंग आयडी</th>
              <th>purpose</th>
              <th>वाहन नाव</th>
              <th>वाहन क्रमांक</th>
              <th>बुकिंग तारीख</th>
              <th>स्थिती</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.booking_id}>
                <td>{booking.booking_id}</td>
                <td>{booking.purpose || "N/A"}</td>
                <td>{booking.vehicle?.vehicle_name || "N/A"}</td>
                <td>{booking.vehicle?.vehicle_no || "N/A"}</td>
                <td>{booking.booking_date || "N/A"}</td>
                <td>{booking.status || "Pending"}</td>
                <td>
                  <button
                    className="dbookinglist_startbtn"
                    onClick={() => handleStartWork(booking)}
                  >
                    Start Work
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal Popup */}
      {showLogForm && (
        <div className="modal_overlay">
          <div className="modal_content">
            <StartLogForm
            booking={selectedBooking}
            onClose={handleCloseModal}
              onStart={(data) => {
                console.log("Started Log for Booking:", selectedBooking.booking_id, data);
                handleCloseModal();
              }}
            />
            <button className="modal_close" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DBookingList;
