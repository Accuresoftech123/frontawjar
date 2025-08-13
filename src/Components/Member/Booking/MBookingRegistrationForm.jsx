import React, { useState, useEffect } from "react";
import "../../../Styles/Admin/Booking/BookingRegistrationForm.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getDistricts,
  getRoleList,
  getTalukas,
  getVillages,
  filterDriversByLocation,
  filterMembersByLocation,
  filterVehiclesByLocation,
  createBooking,
  assignVehicle, assignDriver,
} from "../../../Helper/AdminPanel/AdminActions";
import { listVehicleTypes } from "../../../Helper/VendorPanel/VendorActions";

import Step1UserInfo from "./Step1UserInfo";
import Step2VehicleSelect from "./Step2VehicleSelect";
import Step3DriverAssign from "./Step3DriverAssign";

// ✅ Constant empty array to avoid new reference each render
const EMPTY_ARRAY = [];

const MBookingRegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
   
  // --- isOther flags ---
  const [isOtherMemberDistrict, setIsOtherMemberDistrict] = useState(false);
  const [isOtherMemberTaluka, setIsOtherMemberTaluka] = useState(false);
  const [isOtherMemberVillage, setIsOtherMemberVillage] = useState(false);

  const [isOtherServiceDistrict, setIsOtherServiceDistrict] = useState(false);
  const [isOtherServiceTaluka, setIsOtherServiceTaluka] = useState(false);
  const [isOtherServiceVillage, setIsOtherServiceVillage] = useState(false);

  const [isOtherVehicleDistrict, setIsOtherVehicleDistrict] = useState(false);
  const [isOtherVehicleTaluka, setIsOtherVehicleTaluka] = useState(false);
  const [isOtherVehicleVillage, setIsOtherVehicleVillage] = useState(false);

  const [isOtherDriverDistrict, setIsOtherDriverDistrict] = useState(false);
  const [isOtherDriverTaluka, setIsOtherDriverTaluka] = useState(false);
  const [isOtherDriverVillage, setIsOtherDriverVillage] = useState(false);

  // Redux state
  const { users } = useSelector((state) => state.useradminlist);
  const { vehicleTypes } = useSelector((state) => state.vehicletype);
  const { drivers, loading: driversLoading } = useSelector(
    (state) => state.filterdriver
  );
  const { members, loading: membersLoading } = useSelector(
    (state) => state.filtermember
  );
  const { vehicles, loading: vehiclesLoading } = useSelector(
    (state) => state.filtervehicle
  );

  // ✅ Memoized empty array fallback
  const districts = useSelector(
    (state) => state.district?.districts || EMPTY_ARRAY
  );
  const talukas = useSelector((state) => state.taluka?.talukas || EMPTY_ARRAY);
  const villages = useSelector(
    (state) => state.village?.villages || EMPTY_ARRAY
  );

  // filtered lists
  const [filteredTalukasMember, setFilteredTalukasMember] = useState([]);
  const [filteredVillagesMember, setFilteredVillagesMember] = useState([]);
  const [filteredTalukasService, setFilteredTalukasService] = useState([]);
  const [filteredVillagesService, setFilteredVillagesService] = useState([]);
  const [filteredTalukasVehicle, setFilteredTalukasVehicle] = useState([]);
  const [filteredVillagesVehicle, setFilteredVillagesVehicle] = useState([]);
  const [filteredTalukasDriver, setFilteredTalukasDriver] = useState([]);
  const [filteredVillagesDriver, setFilteredVillagesDriver] = useState([]);

  const [step, setStep] = useState(1);

  // form data
  const [formData, setFormData] = useState({
    userType: "registered",
    memberId: "",
    firstName: "",
    lastName: "",
    mobile: "",
    memberDistrict: "",
    memberTaluka: "",
    memberVillage: "",
    serviceDistrict: "",
    serviceTaluka: "",
    serviceVillage: "",
    vehicleDistrict: "",
    vehicleTaluka: "",
    vehicleVillage: "",
    driverDistrict: "",
    driverTaluka: "",
    driverVillage: "",
    vehicleType: "",
    vehicleRate: "",
    farmArea: "",
    bookingReason: "",
    bookingDate: "",
    bookingPeriod: "",
    serviceAddress: "",
    selectedVehicle: "",
    vendorInfo: "",
    assignedDriver: "",
  });

  // --- Member filters ---
  useEffect(() => {
    if (formData.memberDistrict && formData.memberDistrict !== "इतर") {
      const filtered = talukas.filter(
        (t) => t.district === formData.memberDistrict
      );
      setFilteredTalukasMember(filtered);
    } else {
      setFilteredTalukasMember([]);
    }
    setFormData((prev) => ({
      ...prev,
      memberTaluka: "",
      memberVillage: "",
    }));
    setFilteredVillagesMember([]);
  }, [formData.memberDistrict, talukas]);

  useEffect(() => {
    if (formData.memberTaluka && formData.memberTaluka !== "इतर") {
      const filtered = villages.filter(
        (v) => v.taluka === formData.memberTaluka
      );
      setFilteredVillagesMember(filtered);
    } else {
      setFilteredVillagesMember([]);
    }
    setFormData((prev) => ({ ...prev, memberVillage: "" }));
  }, [formData.memberTaluka, villages]);

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

  // Handlers for location changes (unchanged)
  const handleMemberDistrictChange = (e) => {
    const val = e.target.value;
    setIsOtherMemberDistrict(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      memberDistrict: val === "इतर" ? "" : val,
      memberTaluka: "",
      memberVillage: "",
    }));
  };
  const handleMemberTalukaChange = (e) => {
    const val = e.target.value;
    setIsOtherMemberTaluka(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      memberTaluka: val === "इतर" ? "" : val,
      memberVillage: "",
    }));
  };
  const handleMemberVillageChange = (e) => {
    const val = e.target.value;
    setIsOtherMemberVillage(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      memberVillage: val === "इतर" ? "" : val,
    }));
  };

  const handleServiceDistrictChange = (e) => {
    const val = e.target.value;
    setIsOtherServiceDistrict(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      serviceDistrict: val === "इतर" ? "" : val,
      serviceTaluka: "",
      serviceVillage: "",
    }));
  };
  const handleServiceTalukaChange = (e) => {
    const val = e.target.value;
    setIsOtherServiceTaluka(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      serviceTaluka: val === "इतर" ? "" : val,
      serviceVillage: "",
    }));
  };
  const handleServiceVillageChange = (e) => {
    const val = e.target.value;
    setIsOtherServiceVillage(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      serviceVillage: val === "इतर" ? "" : val,
    }));
  };

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

  // Generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  // Navigation
  const handleNext = () => step < 3 && setStep(step + 1);
  const handleBack = () => step > 1 && setStep(step - 1);

const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitError("");

  try {
    // Prepare payload for booking creation
    const payload = {
      user_id: formData.memberId,
      vehicle_id: formData.selectedVehicle,
      purpose: formData.bookingReason,
      total_area: formData.farmArea,
      booking_period_in_hours: formData.bookingPeriod,
      service_village: formData.serviceVillage,
      service_district: formData.serviceDistrict,
      service_taluka: formData.serviceTaluka,
      service_address: formData.serviceAddress,
      booking_date: formData.bookingDate,
      assigned_driver: formData.assignedDriver,
    };

    // 1. Create Booking
    const bookingResponse = await dispatch(createBooking(payload));

    // Extract booking id (adjust depending on your response shape)
    const bookingId = bookingResponse?.data?.booking_id;
    
    if (!bookingId) {
      throw new Error("Booking ID missing in response");
    }

    // 2. Assign Vehicle if selected
    if (formData.selectedVehicle) {
      await dispatch(
        assignVehicle({ bookingId, vehicleId: formData.selectedVehicle })
      );
    }

    // 3. Assign Driver if assigned
    if (formData.assignedDriver) {
      await dispatch(
        assignDriver({ bookingId, driverId: formData.assignedDriver })
      );
    }

    window.alert("Booking successfully created and assigned!");
    // Optional navigation after success
    // navigate("/bookings");
  } catch (error) {
    setSubmitError("Booking creation failed. Please try again.");
    console.error(error);
  }
};


  // Data fetching
  useEffect(() => {
    let backendRole = "vendor";
    dispatch(getRoleList(backendRole));
    dispatch(listVehicleTypes());
    dispatch(getDistricts());
    dispatch(getTalukas());
    dispatch(getVillages());
    console.log("vehicles prop:", vehicles);
    // dispatch(filterDriversByLocation(formData.driverDistrict, formData.driverTaluka, formData.driverVillage));
    //dispatch(filterMembersByLocation(formData.memberDistrict, formData.memberTaluka, formData.memberVillage));
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      filterMembersByLocation(
        formData.memberDistrict,
        formData.memberTaluka,
        formData.memberVillage
      )
    );
  }, [formData.memberDistrict, formData.memberTaluka, formData.memberVillage]);
  useEffect(() => {
    dispatch(
      filterDriversByLocation(
        formData.driverDistrict,
        formData.driverTaluka,
        formData.driverVillage
      )
    );
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

  return (
    <div className="booking_container">
      <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <h2 className="booking_title">बुकिंग नोंदणी</h2>
      </div>

      <form onSubmit={handleSubmit} className="booking_form">
        {step === 1 && (
          <Step1UserInfo
            formData={formData}
            errors={errors}
            districts={districts}
            filteredTalukasMember={filteredTalukasMember}
            filteredVillagesMember={filteredVillagesMember}
            filteredTalukasService={filteredTalukasService}
            filteredVillagesService={filteredVillagesService}
            members={members}
            vehicleTypes={vehicleTypes}
            isOtherMemberDistrict={isOtherMemberDistrict}
            isOtherMemberTaluka={isOtherMemberTaluka}
            isOtherMemberVillage={isOtherMemberVillage}
            isOtherServiceDistrict={isOtherServiceDistrict}
            isOtherServiceTaluka={isOtherServiceTaluka}
            isOtherServiceVillage={isOtherServiceVillage}
            handleChange={handleChange}
            handleMemberDistrictChange={handleMemberDistrictChange}
            handleMemberTalukaChange={handleMemberTalukaChange}
            handleMemberVillageChange={handleMemberVillageChange}
            handleServiceDistrictChange={handleServiceDistrictChange}
            handleServiceTalukaChange={handleServiceTalukaChange}
            handleServiceVillageChange={handleServiceVillageChange}
            setFormData={setFormData}
          />
        )}

        {step === 2 && (
          <Step2VehicleSelect
            formData={formData}
            errors={errors}
            districts={districts}
            filteredTalukasVehicle={filteredTalukasVehicle}
            filteredVillagesVehicle={filteredVillagesVehicle}
            isOtherVehicleDistrict={isOtherVehicleDistrict}
            isOtherVehicleTaluka={isOtherVehicleTaluka}
            isOtherVehicleVillage={isOtherVehicleVillage}
            vehicles={vehicles}
            handleVehicleDistrictChange={handleVehicleDistrictChange}
            handleVehicleTalukaChange={handleVehicleTalukaChange}
            handleVehicleVillageChange={handleVehicleVillageChange}
            handlevehicleChange={handlevehicleChange}
            setFormData={setFormData}
          />
        )}

        {step === 3 && (
          <Step3DriverAssign
            formData={formData}
            errors={errors}
            districts={districts}
            filteredTalukasDriver={filteredTalukasDriver}
            filteredVillagesDriver={filteredVillagesDriver}
            isOtherDriverDistrict={isOtherDriverDistrict}
            isOtherDriverTaluka={isOtherDriverTaluka}
            isOtherDriverVillage={isOtherDriverVillage}
            handleDriverDistrictChange={handleDriverDistrictChange}
            handleDriverTalukaChange={handleDriverTalukaChange}
            handleDriverVillageChange={handleDriverVillageChange}
            handleDriverChange={handleDriverChange}
            setFormData={setFormData}
            drivers={drivers}
            driversLoading={driversLoading}
          />
        )}

        <div className="booking_nav">
          {step > 1 && (
            <button type="button" onClick={handleBack}>
              मागे
            </button>
          )}
          {step < 3 && (
            <button type="button" onClick={handleNext}>
              पुढे
            </button>
          )}
          {step === 3 && <button type="submit">बुकिंग सबमिट</button>}
        </div>
      </form>
    </div>
  );
};

export default MBookingRegistrationForm;
