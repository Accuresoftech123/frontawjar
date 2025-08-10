import React, { useState, useEffect } from 'react';
import '../../../Styles/Admin/Booking/BookingRegistrationForm.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDistricts, getRoleList, getTalukas, getVillages } from '../../../Helper/AdminPanel/AdminActions';
import { listVehicleTypes } from '../../../Helper/VendorPanel/VendorActions';

const BookingRegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  // isOther flags per section
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

  // Redux lists (unchanged)
  const {
    loading: memberLoading,
    error: memberError,
    users,
  } = useSelector((state) => state.useradminlist);
  const { vehicleTypes, loading, error } = useSelector(
    (state) => state.vehicletype
  );

  // global districts/talukas/villages (unchanged)
  const districts = useSelector((state) => state.district?.districts || []);
  const talukas = useSelector((state) => state.taluka?.talukas || []);
  const villages = useSelector((state) => state.village?.villages || []);

  // filtered lists per section
  const [filteredTalukasMember, setFilteredTalukasMember] = useState([]);
  const [filteredVillagesMember, setFilteredVillagesMember] = useState([]);

  const [filteredTalukasService, setFilteredTalukasService] = useState([]);
  const [filteredVillagesService, setFilteredVillagesService] = useState([]);

  const [filteredTalukasVehicle, setFilteredTalukasVehicle] = useState([]);
  const [filteredVillagesVehicle, setFilteredVillagesVehicle] = useState([]);

  const [filteredTalukasDriver, setFilteredTalukasDriver] = useState([]);
  const [filteredVillagesDriver, setFilteredVillagesDriver] = useState([]);

  const [step, setStep] = useState(1);

  // formData now contains per-section location keys (member*, service*, vehicle*, driver*)
  const [formData, setFormData] = useState({
    userType: 'registered',
    memberId: '',
    firstName: '',
    lastName: '',
    mobile: '',
    // Member location
    memberDistrict: '',
    memberTaluka: '',
    memberVillage: '',
    // Booking/service location
    serviceDistrict: '',
    serviceTaluka: '',
    serviceVillage: '',
    // Vehicle location (for searching vehicles)
    vehicleDistrict: '',
    vehicleTaluka: '',
    vehicleVillage: '',
    // Driver location (for searching drivers)
    driverDistrict: '',
    driverTaluka: '',
    driverVillage: '',

    vehicleType: '',
    farmArea: '',
    bookingReason: '',
    bookingDate: '',
    bookingPeriod: '',
    serviceAddress: '',
    selectedVehicle: '',
    vendorInfo: '',
    assignedDriver: '',
  });

  // ---------- Handlers for member section ----------
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

  // ---------- Handlers for service (booking) section ----------
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

  // ---------- Handlers for vehicle selection section ----------
  const handleVehicleDistrictChange = (e) => {
    const val = e.target.value;
    setIsOtherVehicleDistrict(val === "इतर");
    // update formData and reset dependent fields
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

  // ---------- Handlers for driver selection section ----------
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

  // Generic simple field change (non-location fields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Filter talukas when memberDistrict changes
  useEffect(() => {
    if (formData.memberDistrict && formData.memberDistrict !== "इतर") {
      const filtered = talukas.filter((t) => t.district === formData.memberDistrict);
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

  // Filter villages when memberTaluka changes
  useEffect(() => {
    if (formData.memberTaluka && formData.memberTaluka !== "इतर") {
      const filtered = villages.filter((v) => v.taluka === formData.memberTaluka);
      setFilteredVillagesMember(filtered);
    } else {
      setFilteredVillagesMember([]);
    }
    setFormData((prev) => ({ ...prev, memberVillage: "" }));
  }, [formData.memberTaluka, villages]);

  // Service filters
  useEffect(() => {
    if (formData.serviceDistrict && formData.serviceDistrict !== "इतर") {
      const filtered = talukas.filter((t) => t.district === formData.serviceDistrict);
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
      const filtered = villages.filter((v) => v.taluka === formData.serviceTaluka);
      setFilteredVillagesService(filtered);
    } else {
      setFilteredVillagesService([]);
    }
    setFormData((prev) => ({ ...prev, serviceVillage: "" }));
  }, [formData.serviceTaluka, villages]);

  // Vehicle filters
  useEffect(() => {
    if (formData.vehicleDistrict && formData.vehicleDistrict !== "इतर") {
      const filtered = talukas.filter((t) => t.district === formData.vehicleDistrict);
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
      const filtered = villages.filter((v) => v.taluka === formData.vehicleTaluka);
      setFilteredVillagesVehicle(filtered);
    } else {
      setFilteredVillagesVehicle([]);
    }
    setFormData((prev) => ({ ...prev, vehicleVillage: "" }));
  }, [formData.vehicleTaluka, villages]);

  // Driver filters
  useEffect(() => {
    if (formData.driverDistrict && formData.driverDistrict !== "इतर") {
      const filtered = talukas.filter((t) => t.district === formData.driverDistrict);
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
      const filtered = villages.filter((v) => v.taluka === formData.driverTaluka);
      setFilteredVillagesDriver(filtered);
    } else {
      setFilteredVillagesDriver([]);
    }
    setFormData((prev) => ({ ...prev, driverVillage: "" }));
  }, [formData.driverTaluka, villages]);

  useEffect(() => {
    let backendRole = "vendor";
    dispatch(getRoleList(backendRole));
    dispatch(listVehicleTypes());
    dispatch(getDistricts());
    dispatch(getTalukas());
    dispatch(getVillages());
  }, [dispatch]);

  useEffect(() => {
    console.log("users List:", users);
  }, [users]);

  const [vehicleList, setVehicleList] = useState([]);
  const [selectedVehicleInfo, setSelectedVehicleInfo] = useState(null);

  // Whenever vehicle district/taluka/village is selected — keep your previous async fetch logic (commented)
  const handleVehicleLocationChange = async (e) => {
    handleChange(e); // updates formData immediately (as much as possible)
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    const { vehicleDistrict, vehicleTaluka, vehicleVillage } = updatedFormData;

    if (vehicleDistrict && vehicleTaluka && vehicleVillage) {
      try {
        // fetch vehicle list based on vehicleDistrict/vehicleTaluka/vehicleVillage
        // const res = await axios.get(`YOUR_API/vehicles?district=${vehicleDistrict}&taluka=${vehicleTaluka}&village=${vehicleVillage}`);
        // setVehicleList(res.data);
      } catch (err) {
        console.error("Failed to fetch vehicle list:", err);
      }
    }
  };

  const handleVehicleSelect = async (e) => {
    const selectedId = e.target.value;
    handleChange(e); // updates formData.selectedVehicle
    try {
      // const res = await axios.get(`YOUR_API/vehicles/${selectedId}`);
      // setSelectedVehicleInfo(res.data);
    } catch (err) {
      console.error("Failed to fetch vehicle info:", err);
    }
  };

  const [driverList, setDriverList] = useState([]);
  const [selectedDriverInfo, setSelectedDriverInfo] = useState(null);

  const handleDriverLocationChange = async (e) => {
    handleChange(e);
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    const { driverDistrict, driverTaluka, driverVillage } = updatedFormData;

    if (driverDistrict && driverTaluka && driverVillage) {
      try {
        // const res = await axios.get(`YOUR_API/drivers?district=${driverDistrict}&taluka=${driverTaluka}&village=${driverVillage}`);
        // setDriverList(res.data);
      } catch (err) {
        console.error("Failed to fetch drivers:", err);
      }
    }
  };

  const handleDriverSelect = async (e) => {
    const driverId = e.target.value;
    handleChange(e); // updates formData.assignedDriver
    try {
      // const res = await axios.get(`YOUR_API/drivers/${driverId}`);
      // setSelectedDriverInfo(res.data);
    } catch (err) {
      console.error("Failed to fetch driver info:", err);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Booking Data:', formData);
    // API call goes here
  };

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
          <div className="booking_step">
            <h3>Step 1: वापरकर्ता माहिती</h3>

            {/* User Type Selection */}
            <div className="booking_section">
              <label>वापरकर्ता प्रकार:</label>
              <div className="booking_radio-group">
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="registered"
                    checked={formData.userType === 'registered'}
                    onChange={handleChange}
                  />
                  नोंदणीकृत
                </label>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="non_registered"
                    checked={formData.userType === 'non_registered'}
                    onChange={handleChange}
                  />
                  नोंदणीकृत नसलेला
                </label>
              </div>
            </div>

            {/* Member Location Dropdowns (memberDistrict/memberTaluka/memberVillage) */}
            <div className="booking_section">
              <label>जिल्हा / तालुका / गाव:</label>
              <div className="booking_row">
                {/* Member District */}
                <div className="booking_formGroup">
                  <label className="booking_label">
                    जिल्हा <span className="booking_required">*</span>
                  </label>
                  <select
                    name="memberDistrict"
                    value={isOtherMemberDistrict ? "इतर" : formData.memberDistrict}
                    onChange={handleMemberDistrictChange}
                    className="booking_select"
                  >
                    <option value="">-- निवडा जिल्हा --</option>
                    <option value="इतर">इतर</option>
                    {districts.map((d) => (
                      <option key={d.id ?? d._id ?? d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  {isOtherMemberDistrict && (
                    <input
                      style={{ marginTop: "10px", padding: "10px 12px" }}
                      type="text"
                      placeholder="जिल्हा लिहा"
                      value={formData.memberDistrict}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          memberDistrict: e.target.value,
                        }))
                      }
                    />
                  )}
                  {errors.memberDistrict && (
                    <div className="booking_error">{errors.memberDistrict}</div>
                  )}
                </div>

                {/* Member Taluka */}
                <div className="booking_formGroup">
                  <label className="booking_label">
                    तालुका <span className="booking_required">*</span>
                  </label>
                  <select
                    name="memberTaluka"
                    value={isOtherMemberTaluka ? "इतर" : formData.memberTaluka}
                    onChange={handleMemberTalukaChange}
                    className="booking_select"
                  >
                    <option value="">-- निवडा तालुका --</option>
                    <option value="इतर">इतर</option>
                    {filteredTalukasMember.map((t) => (
                      <option
                        key={t.id ?? t._id ?? t.name}
                        value={t.name || t.taluka_name}
                      >
                        {t.name || t.taluka_name}
                      </option>
                    ))}
                  </select>
                  {isOtherMemberTaluka && (
                    <input
                      style={{ marginTop: "10px", padding: "10px 12px" }}
                      type="text"
                      placeholder="तालुका लिहा"
                      value={formData.memberTaluka}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          memberTaluka: e.target.value,
                        }))
                      }
                    />
                  )}
                  {errors.memberTaluka && (
                    <div className="booking_error">{errors.memberTaluka}</div>
                  )}
                </div>

                {/* Member Village */}
                <div className="booking_formGroup">
                  <label className="booking_label">
                    गाव <span className="booking_required">*</span>
                  </label>
                  <select
                    name="memberVillage"
                    value={isOtherMemberVillage ? "इतर" : formData.memberVillage}
                    onChange={handleMemberVillageChange}
                    className="booking_select"
                  >
                    <option value="">-- निवडा गाव --</option>
                    <option value="इतर">इतर</option>
                    {filteredVillagesMember.map((v) => (
                      <option key={v.id ?? v._id ?? v.name} value={v.name}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                  {isOtherMemberVillage && (
                    <input
                      style={{ marginTop: "10px", padding: "10px 12px" }}
                      type="text"
                      placeholder="गाव लिहा"
                      value={formData.memberVillage}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          memberVillage: e.target.value,
                        }))
                      }
                    />
                  )}
                  {errors.memberVillage && (
                    <div className="booking_error">{errors.memberVillage}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Member selection */}
            {formData.userType === 'registered' ? (
              <div className="booking_section">
                <label>सदस्य निवडा:</label>
                <select
                  name="memberId"
                  value={formData.memberId}
                  onChange={handleChange}
                  disabled={!formData.memberVillage}
                >
                  <option value="">-- सदस्य निवडा --</option>
                  <option value="1">सदस्य 1 - राजेश पाटील</option>
                  <option value="2">सदस्य 2 - सुरेश जाधव</option>
                </select>
              </div>
            ) : (
              <div className="booking_section">
                <label>सदस्य माहिती:</label>
                <div className="booking_row">
                  <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="पहिले नाव" />
                  <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="आडनाव" />
                </div>
              </div>
            )}

            {/* Vehicle Type & Farm Area */}
            <div className="booking_section">
              <label>वाहन प्रकार:</label>
              <select name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
                <option value="">-- निवडा वाहन प्रकार --</option>
                {Array.isArray(vehicleTypes) &&
                  vehicleTypes
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((vt) => (
                      <option key={vt.id} value={vt.name}>
                        {vt.name}
                      </option>
                    ))}
              </select>

              {/* Vehicle Cost Display */}
              {formData.vehicleType && (
                <div className="booking_cost-info">
                  <strong>दर:</strong>{' '}
                  {formData.vehicleType === 'tractor' && '₹500 प्रति तास'}
                  {formData.vehicleType === 'harvester' && '₹1000 प्रति तास'}
                  {formData.vehicleType === 'sprayer' && '₹300 प्रति तास'}
                </div>
              )}
            </div>

            <div className="booking_section">
              <label>शेती क्षेत्र (एकर):</label>
              <input
                name="farmArea"
                type="number"
                value={formData.farmArea}
                onChange={handleChange}
                placeholder="क्षेत्रफळ (एकर)"
              />
            </div>

            {/* Booking Date & Period */}
            <div className="booking_section">
              <label>बुकिंग दिनांक / कालावधी:</label>
              <div className="booking_row">
                <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} />
                <select name="bookingPeriod" value={formData.bookingPeriod} onChange={handleChange}>
                  <option value="">-- कालावधी --</option>
                  <option value="hour">तास</option>
                  <option value="day">दिवस</option>
                  <option value="week">आठवडा</option>
                  <option value="month">महिना</option>
                </select>
              </div>
            </div>

            {/* Booking Reason */}
            <div className="booking_section">
              <label>बुकिंग कारण:</label>
              <textarea
                name="bookingReason"
                value={formData.bookingReason}
                onChange={handleChange}
                placeholder="कारण"
                rows={3}
              />
            </div>

            {/* Service Address Location (serviceDistrict/serviceTaluka/serviceVillage) */}
            <div className="booking_section">
              <label>सेवा पत्ता:</label>
              <div className="booking_row">
                {/* Service District */}
                <div className="booking_formGroup">
                  <label className="booking_label">
                    जिल्हा <span className="booking_required">*</span>
                  </label>
                  <select
                    name="serviceDistrict"
                    value={isOtherServiceDistrict ? "इतर" : formData.serviceDistrict}
                    onChange={handleServiceDistrictChange}
                    className="booking_select"
                  >
                    <option value="">-- निवडा जिल्हा --</option>
                    <option value="इतर">इतर</option>
                    {districts.map((d) => (
                      <option key={d.id ?? d._id ?? d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  {isOtherServiceDistrict && (
                    <input
                      style={{ marginTop: "10px", padding: "10px 12px" }}
                      type="text"
                      placeholder="जिल्हा लिहा"
                      value={formData.serviceDistrict}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          serviceDistrict: e.target.value,
                        }))
                      }
                    />
                  )}
                  {errors.serviceDistrict && (
                    <div className="booking_error">{errors.serviceDistrict}</div>
                  )}
                </div>

                {/* Service Taluka */}
                <div className="booking_formGroup">
                  <label className="booking_label">
                    तालुका <span className="booking_required">*</span>
                  </label>
                  <select
                    name="serviceTaluka"
                    value={isOtherServiceTaluka ? "इतर" : formData.serviceTaluka}
                    onChange={handleServiceTalukaChange}
                    className="booking_select"
                  >
                    <option value="">-- निवडा तालुका --</option>
                    <option value="इतर">इतर</option>
                    {filteredTalukasService.map((t) => (
                      <option
                        key={t.id ?? t._id ?? t.name}
                        value={t.name || t.taluka_name}
                      >
                        {t.name || t.taluka_name}
                      </option>
                    ))}
                  </select>
                  {isOtherServiceTaluka && (
                    <input
                      style={{ marginTop: "10px", padding: "10px 12px" }}
                      type="text"
                      placeholder="तालुका लिहा"
                      value={formData.serviceTaluka}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          serviceTaluka: e.target.value,
                        }))
                      }
                    />
                  )}
                  {errors.serviceTaluka && (
                    <div className="booking_error">{errors.serviceTaluka}</div>
                  )}
                </div>

                {/* Service Village */}
                <div className="booking_formGroup">
                  <label className="booking_label">
                    गाव <span className="booking_required">*</span>
                  </label>
                  <select
                    name="serviceVillage"
                    value={isOtherServiceVillage ? "इतर" : formData.serviceVillage}
                    onChange={handleServiceVillageChange}
                    className="booking_select"
                  >
                    <option value="">-- निवडा गाव --</option>
                    <option value="इतर">इतर</option>
                    {filteredVillagesService.map((v) => (
                      <option key={v.id ?? v._id ?? v.name} value={v.name}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                  {isOtherServiceVillage && (
                    <input
                      style={{ marginTop: "10px", padding: "10px 12px" }}
                      type="text"
                      placeholder="गाव लिहा"
                      value={formData.serviceVillage}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          serviceVillage: e.target.value,
                        }))
                      }
                    />
                  )}
                  {errors.serviceVillage && (
                    <div className="booking_error">{errors.serviceVillage}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Total Cost Calculation */}
            {formData.vehicleType && formData.farmArea && formData.bookingPeriod && (
              <div className="booking_section booking_total">
                <strong>एकूण खर्च:</strong>{" "}
                {(() => {
                  let ratePerHour = 0;
                  if (formData.vehicleType === "tractor") ratePerHour = 500;
                  else if (formData.vehicleType === "harvester") ratePerHour = 1000;
                  else if (formData.vehicleType === "sprayer") ratePerHour = 300;

                  let durationMultiplier = 1;
                  if (formData.bookingPeriod === "day") durationMultiplier = 8;
                  else if (formData.bookingPeriod === "week") durationMultiplier = 8 * 7;
                  else if (formData.bookingPeriod === "month") durationMultiplier = 8 * 30;

                  const total = ratePerHour * durationMultiplier * parseFloat(formData.farmArea || 0);
                  return `₹${total}`;
                })()}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="booking_step">
            <h3>Step 2: वाहन निवड</h3>

            {/* Vehicle Location Selection */}
            <div className="booking_section">
              {/* Vehicle District */}
              <div className="booking_formGroup">
                <label className="booking_label">
                  जिल्हा <span className="booking_required">*</span>
                </label>
                <select
                  name="vehicleDistrict"
                  value={isOtherVehicleDistrict ? "इतर" : formData.vehicleDistrict}
                  onChange={(e) => { handleVehicleDistrictChange(e); handleVehicleLocationChange(e); }}
                  className="booking_select"
                >
                  <option value="">-- निवडा जिल्हा --</option>
                  <option value="इतर">इतर</option>
                  {districts.map((d) => (
                    <option key={d.id ?? d._id ?? d.name} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
                {isOtherVehicleDistrict && (
                  <input
                    style={{ marginTop: "10px", padding: "10px 12px" }}
                    type="text"
                    placeholder="जिल्हा लिहा"
                    value={formData.vehicleDistrict}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        vehicleDistrict: e.target.value,
                      }))
                    }
                  />
                )}
                {errors.vehicleDistrict && (
                  <div className="booking_error">{errors.vehicleDistrict}</div>
                )}
              </div>

              {/* Vehicle Taluka */}
              <div className="booking_formGroup">
                <label className="booking_label">
                  तालुका <span className="booking_required">*</span>
                </label>
                <select
                  name="vehicleTaluka"
                  value={isOtherVehicleTaluka ? "इतर" : formData.vehicleTaluka}
                  onChange={(e) => { handleVehicleTalukaChange(e); handleVehicleLocationChange(e); }}
                  className="booking_select"
                >
                  <option value="">-- निवडा तालुका --</option>
                  <option value="इतर">इतर</option>
                  {filteredTalukasVehicle.map((t) => (
                    <option
                      key={t.id ?? t._id ?? t.name}
                      value={t.name || t.taluka_name}
                    >
                      {t.name || t.taluka_name}
                    </option>
                  ))}
                </select>
                {isOtherVehicleTaluka && (
                  <input
                    style={{ marginTop: "10px", padding: "10px 12px" }}
                    type="text"
                    placeholder="तालुका लिहा"
                    value={formData.vehicleTaluka}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        vehicleTaluka: e.target.value,
                      }))
                    }
                  />
                )}
                {errors.vehicleTaluka && (
                  <div className="booking_error">{errors.vehicleTaluka}</div>
                )}
              </div>

              {/* Vehicle Village */}
              <div className="booking_formGroup">
                <label className="booking_label">
                  गाव <span className="booking_required">*</span>
                </label>
                <select
                  name="vehicleVillage"
                  value={isOtherVehicleVillage ? "इतर" : formData.vehicleVillage}
                  onChange={(e) => { handleVehicleVillageChange(e); handleVehicleLocationChange(e); }}
                  className="booking_select"
                >
                  <option value="">-- निवडा गाव --</option>
                  <option value="इतर">इतर</option>
                  {filteredVillagesVehicle.map((v) => (
                    <option key={v.id ?? v._id ?? v.name} value={v.name}>
                      {v.name}
                    </option>
                  ))}
                </select>
                {isOtherVehicleVillage && (
                  <input
                    style={{ marginTop: "10px", padding: "10px 12px" }}
                    type="text"
                    placeholder="गाव लिहा"
                    value={formData.vehicleVillage}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        vehicleVillage: e.target.value,
                      }))
                    }
                  />
                )}
                {errors.vehicleVillage && (
                  <div className="booking_error">{errors.vehicleVillage}</div>
                )}
              </div>
            </div>

            {/* Vehicle List Dropdown */}
            {vehicleList.length > 0 && (
              <div className="booking_section">
                <label>वाहन निवडा:</label>
                <select
                  name="selectedVehicle"
                  value={formData.selectedVehicle}
                  onChange={handleVehicleSelect}
                >
                  <option value="">-- वाहन निवडा --</option>
                  {vehicleList.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.type} - {vehicle.model}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Vehicle Info */}
            {selectedVehicleInfo && (
              <div className="booking_section">
                <h4>वाहन माहिती</h4>
                <div className="booking_row">
                  <input
                    type="text"
                    value={selectedVehicleInfo.model}
                    disabled
                    placeholder="मॉडेल"
                  />
                  <input
                    type="text"
                    value={selectedVehicleInfo.condition}
                    disabled
                    placeholder="स्थिती"
                  />
                </div>
              </div>
            )}

            {/* Vendor Info */}
            {selectedVehicleInfo?.vendor && (
              <div className="booking_section">
                <h4>व्हेंडर माहिती</h4>
                <div className="booking_row">
                  <input
                    type="text"
                    value={selectedVehicleInfo.vendor.name}
                    disabled
                    placeholder="नाव"
                  />
                  <input
                    type="text"
                    value={selectedVehicleInfo.vendor.phone}
                    disabled
                    placeholder="फोन"
                  />
                </div>
                <input
                  type="text"
                  value={selectedVehicleInfo.vendor.address}
                  disabled
                  placeholder="पत्ता"
                />
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="booking_step">
            <h3>Step 3: ड्रायव्हर असाइन</h3>

            {/* Driver Location Selection */}
            <div className="booking_section">
              {/* Driver District */}
              <div className="booking_formGroup">
                <label className="booking_label">
                  जिल्हा <span className="booking_required">*</span>
                </label>
                <select
                  name="driverDistrict"
                  value={isOtherDriverDistrict ? "इतर" : formData.driverDistrict}
                  onChange={(e) => { handleDriverDistrictChange(e); handleDriverLocationChange(e); }}
                  className="booking_select"
                >
                  <option value="">-- निवडा जिल्हा --</option>
                  <option value="इतर">इतर</option>
                  {districts.map((d) => (
                    <option key={d.id ?? d._id ?? d.name} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
                {isOtherDriverDistrict && (
                  <input
                    style={{ marginTop: "10px", padding: "10px 12px" }}
                    type="text"
                    placeholder="जिल्हा लिहा"
                    value={formData.driverDistrict}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        driverDistrict: e.target.value,
                      }))
                    }
                  />
                )}
                {errors.driverDistrict && (
                  <div className="booking_error">{errors.driverDistrict}</div>
                )}
              </div>

              {/* Driver Taluka */}
              <div className="booking_formGroup">
                <label className="booking_label">
                  तालुका <span className="booking_required">*</span>
                </label>
                <select
                  name="driverTaluka"
                  value={isOtherDriverTaluka ? "इतर" : formData.driverTaluka}
                  onChange={(e) => { handleDriverTalukaChange(e); handleDriverLocationChange(e); }}
                  className="booking_select"
                >
                  <option value="">-- निवडा तालुका --</option>
                  <option value="इतर">इतर</option>
                  {filteredTalukasDriver.map((t) => (
                    <option
                      key={t.id ?? t._id ?? t.name}
                      value={t.name || t.taluka_name}
                    >
                      {t.name || t.taluka_name}
                    </option>
                  ))}
                </select>
                {isOtherDriverTaluka && (
                  <input
                    style={{ marginTop: "10px", padding: "10px 12px" }}
                    type="text"
                    placeholder="तालुका लिहा"
                    value={formData.driverTaluka}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        driverTaluka: e.target.value,
                      }))
                    }
                  />
                )}
                {errors.driverTaluka && (
                  <div className="booking_error">{errors.driverTaluka}</div>
                )}
              </div>

              {/* Driver Village */}
              <div className="booking_formGroup">
                <label className="booking_label">
                  गाव <span className="booking_required">*</span>
                </label>
                <select
                  name="driverVillage"
                  value={isOtherDriverVillage ? "इतर" : formData.driverVillage}
                  onChange={(e) => { handleDriverVillageChange(e); handleDriverLocationChange(e); }}
                  className="booking_select"
                >
                  <option value="">-- निवडा गाव --</option>
                  <option value="इतर">इतर</option>
                  {filteredVillagesDriver.map((v) => (
                    <option key={v.id ?? v._id ?? v.name} value={v.name}>
                      {v.name}
                    </option>
                  ))}
                </select>
                {isOtherDriverVillage && (
                  <input
                    style={{ marginTop: "10px", padding: "10px 12px" }}
                    type="text"
                    placeholder="गाव लिहा"
                    value={formData.driverVillage}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        driverVillage: e.target.value,
                      }))
                    }
                  />
                )}
                {errors.driverVillage && (
                  <div className="booking_error">{errors.driverVillage}</div>
                )}
              </div>
            </div>

            {/* Driver Selection */}
            {driverList.length > 0 && (
              <div className="booking_section">
                <label>ड्रायव्हर निवडा:</label>
                <select
                  name="assignedDriver"
                  value={formData.assignedDriver}
                  onChange={handleDriverSelect}
                >
                  <option value="">-- ड्रायव्हर निवडा --</option>
                  {driverList.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Driver Info */}
            {selectedDriverInfo && (
              <div className="booking_section">
                <h4>ड्रायव्हर माहिती</h4>
                <div className="booking_row">
                  <input type="text" value={selectedDriverInfo.name} disabled placeholder="नाव" />
                  <input type="text" value={selectedDriverInfo.phone} disabled placeholder="फोन" />
                </div>
                <div className="booking_row">
                  <input type="text" value={selectedDriverInfo.licenseNumber} disabled placeholder="परवाना क्रमांक" />
                  <input type="text" value={selectedDriverInfo.experience + ' वर्ष'} disabled placeholder="अनुभव" />
                </div>
                <input type="text" value={selectedDriverInfo.address} disabled placeholder="पत्ता" />
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="booking_nav">
          {step > 1 && <button type="button" onClick={handleBack}>मागे</button>}
          {step < 3 && <button type="button" onClick={handleNext}>पुढे</button>}
          {step === 3 && <button type="submit">बुकिंग सबमिट</button>}
        </div>
      </form>
    </div>
  );
};

export default BookingRegistrationForm;
