import React, { useEffect, useState } from "react";
import "../../../Styles/Admin/Booking/AssignDriverForm.css";
import { useNavigate } from "react-router-dom";

const AssignDriverForm = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Dummy pending bookings
    const dummyData = [
      {
        id: 101,
        userName: "शिवाजी पाटील",
        village: "वडगाव",
        vehicle: "ट्रॅक्टर",
        purpose: "खत वाहतूक",
        bookingDate: "2025-08-03",
      },
      {
        id: 102,
        userName: "अनिता मोरे",
        village: "तांबेवाडी",
        vehicle: "कूलर ट्रक",
        purpose: "माल वाहतूक",
        bookingDate: "2025-08-02",
      },
    ];
    setBookings(dummyData);
  }, []);

  const handleAssignDriver = (bookingId) => {
    navigate(`/Admin/Booking/Assign/${bookingId}`);
  };

  return (
    <div className="assign_driver_list_container">
       <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      <h2 className="assign_driver_title">ड्रायव्हर नियुक्तीसाठी बुकिंग यादी</h2></div>
      {bookings.length === 0 ? (
        <p className="assign_driver_empty">पेंडिंग बुकिंग उपलब्ध नाहीत</p>
      ) : (
        <table className="assign_driver_table">
          <thead>
            <tr>
              <th>बुकिंग ID</th>
              <th>सभासद</th>
              <th>गाव</th>
              <th>वाहन</th>
              <th>उद्दिष्ट</th>
              <th>तारीख</th>
              <th>क्रिया</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.userName}</td>
                <td>{booking.village}</td>
                <td>{booking.vehicle}</td>
                <td>{booking.purpose}</td>
                <td>{booking.bookingDate}</td>
                <td>
                  <button
                    className="assign_driver_button"
                    onClick={() => handleAssignDriver(booking.id)}
                  >
                    ड्रायव्हर नियुक्त करा
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignDriverForm;
