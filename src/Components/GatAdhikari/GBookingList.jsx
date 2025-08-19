import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGAMemberBookings } from "../../Helper/GatAdhikariPanel/GatAdhikariActions";
import { useNavigate } from "react-router-dom";

const GBookingList = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();

  // Safely select redux state
  const { loading, bookings = [], error } = useSelector(
    (state) => state.gaMemberBookings || {}
  );

  useEffect(() => {
    dispatch(fetchGAMemberBookings());
  }, [dispatch]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
         <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      <h2> Bookings</h2>
    </div>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>आयडी</th>
              <th>बुकिंग तारीख</th>
              <th>उद्देश</th>
              <th>गाव</th>
              <th>तालुका</th>
              <th>जिल्हा</th>
              <th>स्थिती</th>
              <th>एकूण क्षेत्रफळ</th>
              <th>कालावधी (Hrs)</th>
              <th>एकूण शुल्क</th>
              <th>वाहन</th>
              <th>सभासद</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.booking_id}>
                <td>{b.booking_id}</td>
                <td>{b.booking_date}</td>
                <td>{b.purpose}</td>
                <td>{b.service_village}</td>
                <td>{b.service_taluka}</td>
                <td>{b.service_district}</td>
                <td>{b.status}</td>
                <td>{b.total_area}</td>
                <td>{b.booking_period_in_hours}</td>
                <td>{b.total_charges}</td>
                <td>{b.vehicle ? b.vehicle.name : "Not Assigned"}</td>
                <td>{b.user || "Unknown User"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GBookingList;
