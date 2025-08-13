import React, { useState, useEffect } from "react";
import "../../../Styles/Admin/Booking/BookingRegistrationForm.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getDistricts,
  getTalukas,
  getVillages,
  createBooking
} from "../../../Helper/AdminPanel/AdminActions";

import { listVehicleTypes } from "../../../Helper/VendorPanel/VendorActions";
import Step1UserInfo from "./Step1UserInfo";

// ✅ Constant empty array to avoid new reference each render
const EMPTY_ARRAY = [];

const MBookingRegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.login);
  const memberId = data.user.user_id;

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  // Redux state
  const { vehicleTypes } = useSelector((state) => state.vehicletype);

  // ✅ Memoized empty array fallback
  const districts = useSelector(
    (state) => state.district?.districts || EMPTY_ARRAY
  );
  const talukas = useSelector((state) => state.taluka?.talukas || EMPTY_ARRAY);
  const villages = useSelector(
    (state) => state.village?.villages || EMPTY_ARRAY
  );

  // Data fetching
  useEffect(() => {
    dispatch(listVehicleTypes());
    dispatch(getDistricts());
    dispatch(getTalukas());
    dispatch(getVillages());
    console.log(districts);
  }, [dispatch]);

  // filtered lists
  const [filteredTalukasService, setFilteredTalukasService] = useState([]);
  const [filteredVillagesService, setFilteredVillagesService] = useState([]);

  // form data
  const [formData, setFormData] = useState({
    serviceDistrict: "",
    serviceTaluka: "",
    serviceVillage: "",
    vehicleType: "",
    farmArea: "",
    bookingReason: "",
    bookingDate: "",
    bookingPeriod: "",
    serviceAddress: "",
  });

  // --- Service filters ---
  useEffect(() => {
    if (formData.serviceDistrict && formData.serviceDistrict !== "इतर") {
      const filtered = talukas.filter(
        (t) => t.district === formData.serviceDistrict
      );
      setFilteredTalukasService(filtered);
    } else {
      setFilteredTalukasService([]);
    }
    setFormData((prev) => ({
      ...prev,
      serviceTaluka: "",
      serviceVillage: "",
    }));
    setFilteredVillagesService([]);
  }, [formData.serviceDistrict, talukas]);

  useEffect(() => {
    if (formData.serviceTaluka && formData.serviceTaluka !== "इतर") {
      const filtered = villages.filter(
        (v) => v.taluka === formData.serviceTaluka
      );
      setFilteredVillagesService(filtered);
    } else {
      setFilteredVillagesService([]);
    }
    setFormData((prev) => ({ ...prev, serviceVillage: "" }));
  }, [formData.serviceTaluka, villages]);

  // Generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      const payload = {
        user_id: memberId,
        purpose: formData.bookingReason,
        total_area: formData.farmArea,
        booking_period_in_hours: formData.bookingPeriod,
        service_village: formData.serviceVillage,
        service_district: formData.serviceDistrict,
        service_taluka: formData.serviceTaluka,
        service_address: formData.serviceAddress,
        booking_date: formData.bookingDate,
        vehicle_type: formData.vehicleType,
      };

      await dispatch(createBooking(payload));

      window.alert("बुकिंग यशस्वीरित्या नोंदवले गेले!");
      navigate(-1);
    } catch (error) {
      setSubmitError("बुकिंग करताना समस्या आली, कृपया पुन्हा प्रयत्न करा.");
      console.error(error);
    }
  };


  return (
    <div className="booking_container">
      <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ मागे
        </button>
        <h2 className="booking_title">बुकिंग नोंदणी</h2>
      </div>

      <form onSubmit={handleSubmit} className="booking_form">
        <Step1UserInfo
          formData={formData}
          errors={errors}
          districts={districts}
          filteredTalukasService={filteredTalukasService}
          filteredVillagesService={filteredVillagesService}
          vehicleTypes={vehicleTypes}
          handleChange={handleChange}
          setFormData={setFormData}
        />

        <div className="booking_nav">
          <button type="submit">बुकिंग सबमिट</button>
        </div>
      </form>

      {submitError && <p className="error_message">{submitError}</p>}
    </div>
  );
};

export default MBookingRegistrationForm;
