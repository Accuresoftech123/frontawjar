import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  getDistricts,
  getTalukas,
  getVillages,
  filterDriversByLocation,
  filterVehiclesByLocation,
  assignVehicle, assignDriver,
} from "../../../Helper/AdminPanel/AdminActions";
import "../../../Styles/Admin/Booking/BookingList.css";
import { useNavigate } from "react-router-dom";
import AssignPopup from "./AssignPopup";
const EMPTY_ARRAY = [];
const BookingList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAssign, setShowAssign] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
 const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [bookingId, setbookingId] = useState();
  
    const [isOtherVehicleDistrict, setIsOtherVehicleDistrict] = useState(false);
    const [isOtherVehicleTaluka, setIsOtherVehicleTaluka] = useState(false);
    const [isOtherVehicleVillage, setIsOtherVehicleVillage] = useState(false);
  
    const [isOtherDriverDistrict, setIsOtherDriverDistrict] = useState(false);
    const [isOtherDriverTaluka, setIsOtherDriverTaluka] = useState(false);
    const [isOtherDriverVillage, setIsOtherDriverVillage] = useState(false);
  
  // 🔹 Form data moved to parent
  const [formData, setFormData] = useState({
     vehicleDistrict: "",
    vehicleTaluka: "",
    vehicleVillage: "",
    driverDistrict: "",
    driverTaluka: "",
    driverVillage: "",
     selectedVehicle: "",
    vendorInfo: "",
    assignedDriver: "",
  });

  const { loading, bookings, error } = useSelector(
    (state) => state.bookingadmincreate
  );
  const districts = useSelector((state) => state.district?.districts || []);
  const talukas = useSelector((state) => state.taluka?.talukas || []);
  const villages = useSelector((state) => state.village?.villages || []);
  const drivers = useSelector((state) => state.filterdriver?.drivers || []);
  const vehicles = useSelector((state) => state.filtervehicle?.vehicles || []);
 const [filteredTalukasVehicle, setFilteredTalukasVehicle] = useState([]);
  const [filteredVillagesVehicle, setFilteredVillagesVehicle] = useState([]);
  const [filteredTalukasDriver, setFilteredTalukasDriver] = useState([]);
  const [filteredVillagesDriver, setFilteredVillagesDriver] = useState([]);

  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(getDistricts());
    dispatch(getTalukas());
    dispatch(getVillages());
    console.log(selectedBooking,"selected booking");
  }, [dispatch]);
// --- Vehicle filters ---
  useEffect(() => {
    if (formData.vehicleDistrict && formData.vehicleDistrict !== "इतर") {
      const filtered = talukas.filter(
        (t) => t.district === formData.vehicleDistrict
      );
      setFilteredTalukasVehicle(filtered);
    } else {
      setFilteredTalukasVehicle([]);
    }
    setFormData((prev) => ({
      ...prev,
      vehicleTaluka: "",
      vehicleVillage: "",
    }));
    setFilteredVillagesVehicle([]);
  }, [formData.vehicleDistrict, talukas]);

  useEffect(() => {
    if (formData.vehicleTaluka && formData.vehicleTaluka !== "इतर") {
      const filtered = villages.filter(
        (v) => v.taluka === formData.vehicleTaluka
      );
      setFilteredVillagesVehicle(filtered);
    } else {
      setFilteredVillagesVehicle([]);
    }
    setFormData((prev) => ({ ...prev, vehicleVillage: "" }));
  }, [formData.vehicleTaluka, villages]);

  // --- Driver filters ---
  useEffect(() => {
    if (formData.driverDistrict && formData.driverDistrict !== "इतर") {
      const filtered = talukas.filter(
        (t) => t.district === formData.driverDistrict
      );
      setFilteredTalukasDriver(filtered);
    } else {
      setFilteredTalukasDriver([]);
    }
    setFormData((prev) => ({
      ...prev,
      driverTaluka: "",
      driverVillage: "",
    }));
    setFilteredVillagesDriver([]);
  }, [formData.driverDistrict, talukas]);

  useEffect(() => {
    if (formData.driverTaluka && formData.driverTaluka !== "इतर") {
      const filtered = villages.filter(
        (v) => v.taluka === formData.driverTaluka
      );
      setFilteredVillagesDriver(filtered);
    } else {
      setFilteredVillagesDriver([]);
    }
    setFormData((prev) => ({ ...prev, driverVillage: "" }));
  }, [formData.driverTaluka, villages]);
 const handleVehicleDistrictChange = (e) => {
    const val = e.target.value;
    setIsOtherVehicleDistrict(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      vehicleDistrict: val === "इतर" ? "" : val,
      vehicleTaluka: "",
      vehicleVillage: "",
    }));
  };
  const handleVehicleTalukaChange = (e) => {
    const val = e.target.value;
    setIsOtherVehicleTaluka(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      vehicleTaluka: val === "इतर" ? "" : val,
      vehicleVillage: "",
    }));
  };
  const handleVehicleVillageChange = (e) => {
    const val = e.target.value;
    setIsOtherVehicleVillage(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      vehicleVillage: val === "इतर" ? "" : val,
    }));
  };

  const handleDriverDistrictChange = (e) => {
    const val = e.target.value;
    setIsOtherDriverDistrict(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      driverDistrict: val === "इतर" ? "" : val,
      driverTaluka: "",
      driverVillage: "",
    }));
  };
  const handleDriverTalukaChange = (e) => {
    const val = e.target.value;
    setIsOtherDriverTaluka(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      driverTaluka: val === "इतर" ? "" : val,
      driverVillage: "",
    }));
  };
  const handleDriverVillageChange = (e) => {
    const val = e.target.value;
    setIsOtherDriverVillage(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      driverVillage: val === "इतर" ? "" : val,
    }));
  };

  const handlevehicleChange = (e) => {
    const { name, value } = e.target;

    if (name === "selectedVehicle") {
      const selectedVehicleObj =
        vehicles.find((v) => v.id.toString() === value.toString()) || null;
      setFormData((prev) => ({
        ...prev,
        selectedVehicle: value,
        selectedVehicleInfo: selectedVehicleObj,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleDriverChange = (e) => {
  const selectedId = e.target.value;
  const selectedDriverObj = drivers.find(
    (d) => d.id.toString() === selectedId.toString()
  ) || null;
  setFormData((prev) => ({
    ...prev,
    assignedDriver: selectedId,
    selectedDriverInfo: selectedDriverObj,
  }));
};

useEffect(() => {
    dispatch(
      filterDriversByLocation(
        formData.driverDistrict,
        formData.driverTaluka,
        formData.driverVillage
      )
    );
    console.log(drivers,"db");
  }, [
    formData.driverDistrict,
    formData.driverTaluka,
    formData.driverVillage,
    dispatch,
  ]);
  useEffect(() => {
    dispatch(
      filterVehiclesByLocation(
        formData.vehicleDistrict,
        formData.vehicleTaluka,
        formData.vehicleVillage
      )
    );
  }, [
    formData.vehicleDistrict,
    formData.vehicleTaluka,
    formData.vehicleVillage,
    dispatch,
  ]);

  const safeBookings = Array.isArray(bookings) ? bookings : [];

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.selectedVehicle) {
    await dispatch(
      assignVehicle({ bookingId, vehicleId: formData.selectedVehicle })
    );
  }

  if (formData.assignedDriver) {
    await dispatch(
      assignDriver({ bookingId, driverId: formData.assignedDriver })
    );
  }

  window.alert("Vehicle and driver successfully assigned!");
  dispatch(fetchBookings());
  setFormData(formData);
  setShowAssign(false);

};

 const handleCancel = () => {
    setFormData({});
    setShowAssign(false);
  }
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
              <th>बुकिंग आयडी</th>
              <th>सभासद</th>
              <th>वाहन</th>
              <th>तारीख</th>
              <th>स्थिती</th>
              <th>नेमणूक</th>
            </tr>
          </thead>
          <tbody>
            {safeBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.booking_id}</td>
                <td>{booking.user || "N/A"}</td>
                <td>{booking.vehicle?.vehicle_name || "N/A"}</td>
                <td>{booking.booking_date || "N/A"}</td>
                <td>{booking.status || "Pending"}</td>
                <td>
                  <button
                    className="assign-btn"
                    onClick={() => {
                      setSelectedBooking(booking);
                      setbookingId(booking.booking_id);
                      setShowAssign(true);
                    }}
                  >
                    नेमणूक
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

     {showAssign && (
  <div className="assignpopup_wrapper">
    <div className="assignpopup_content">
      {/* Popup fields */}
      <AssignPopup
        formData={formData}
        onSubmit={handleSubmit}
        onClose={handleCancel}
        errors={errors}
        selectedBooking={selectedBooking}
        districts={districts}
        filteredTalukasVehicle={filteredTalukasVehicle}
        filteredVillagesVehicle={filteredVillagesVehicle}
        isOtherVehicleDistrict={isOtherVehicleDistrict}
        isOtherVehicleTaluka={isOtherVehicleTaluka}
        isOtherVehicleVillage={isOtherVehicleVillage}
        vehicles={vehicles}
        drivers={drivers}
        handleVehicleDistrictChange={handleVehicleDistrictChange}
        handleVehicleTalukaChange={handleVehicleTalukaChange}
        handleVehicleVillageChange={handleVehicleVillageChange}
        handlevehicleChange={handlevehicleChange}
        setFormData={setFormData}
        filteredTalukasDriver={filteredTalukasDriver}
        filteredVillagesDriver={filteredVillagesDriver}
        isOtherDriverDistrict={isOtherDriverDistrict}
        isOtherDriverTaluka={isOtherDriverTaluka}
        isOtherDriverVillage={isOtherDriverVillage}
        handleDriverDistrictChange={handleDriverDistrictChange}
        handleDriverTalukaChange={handleDriverTalukaChange}
        handleDriverVillageChange={handleDriverVillageChange}
        handleDriverChange={handleDriverChange}
      />

      {/* Footer buttons */}
      <div className="assignpopup_footer">
        <button className="assignpopup_cancel_btn" onClick={handleCancel}>
          Cancel
        </button>
        <button className="assignpopup_submit_btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default BookingList;
