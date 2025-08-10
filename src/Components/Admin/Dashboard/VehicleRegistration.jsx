import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../Styles/Admin/Dashboard/VehicleRegistration.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoleList,
  getDistricts,
  getTalukas,
  getVillages,
} from "../../../Helper/AdminPanel/AdminActions";
import { listVehicleTypes, registerVehicle } from "../../../Helper/VendorPanel/VendorActions";
import { useNavigate } from "react-router-dom";

const VehicleRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOtherDistrict, setIsOtherDistrict] = useState(false);
  const [isOtherTaluka, setIsOtherTaluka] = useState(false);
  const [isOtherVillage, setIsOtherVillage] = useState(false);
  const {
    loading: vendorLoading,
    error: vendorError,
    users,
  } = useSelector((state) => state.useradminlist);
  const { vehicleTypes, loading, error } = useSelector(
    (state) => state.vehicletype
  );
  // Get districts, talukas, villages from Redux store
  const districts = useSelector((state) => state.district?.districts || []);
  const talukas = useSelector((state) => state.taluka?.talukas || []);
  const villages = useSelector((state) => state.village?.villages || []);
  const [filteredTalukas, setFilteredTalukas] = useState([]);
  const [filteredVillages, setFilteredVillages] = useState([]);
  const [formData, setFormData] = useState({
    user: "",
    vehicle_type: "",
    vehicle_name: "",
    vehicle_no: "",
    condition: "",
    insurance_no: "",
    upload_image: null,
    avg_of_veh: "",
    insurance_validity_start: "",
    insurance_validity_end: "",
    purchase_date: "",
    power: "",
    district: "",
    taluka: "",
    village: "",
    status: "available",
    price_per_day: "",
    price_per_hour: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const handleDistrictChange = (e) => {
    const val = e.target.value;
    setIsOtherDistrict(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      district: val === "इतर" ? "" : val,
      taluka: "",
      village: "",
    }));
  };

  const handleTalukaChange = (e) => {
    const val = e.target.value;
    setIsOtherTaluka(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      taluka: val === "इतर" ? "" : val,
      village: "",
    }));
  };

  const handleVillageChange = (e) => {
    const val = e.target.value;
    setIsOtherVillage(val === "इतर");
    setFormData((prev) => ({
      ...prev,
      village: val === "इतर" ? "" : val,
    }));
  };

  // Filter talukas when district changes
  useEffect(() => {
    if (formData.district && formData.district !== "इतर") {
      const filtered = talukas.filter((t) => t.district === formData.district);
      setFilteredTalukas(filtered);
    } else {
      setFilteredTalukas([]);
    }

    // Reset taluka and village when district changes
    setFormData((prev) => ({
      ...prev,
      taluka: "",
      village: "", // Note: You use capital 'Village' in FormData
    }));

    setFilteredVillages([]);
  }, [formData.district, talukas]);

  // Filter villages when taluka changes
  useEffect(() => {
    if (formData.taluka && formData.taluka !== "इतर") {
      const filtered = villages.filter((v) => v.taluka === formData.taluka);
      setFilteredVillages(filtered);
    } else {
      setFilteredVillages([]);
    }

    // Reset village when taluka changes
    setFormData((prev) => ({
      ...prev,
      village: "",
    }));
  }, [formData.taluka, villages]);

  useEffect(() => {
    let backendRole = "vendor";
    dispatch(getRoleList(backendRole));
    dispatch(listVehicleTypes());
    dispatch(getDistricts());
    dispatch(getTalukas());
    dispatch(getVillages());
  }, []);
  useEffect(() => {
    console.log("users List:", users);
  }, [users]);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.user) newErrors.user = "कृपया विक्रेता निवडा";
    if (!formData.vehicle_type)
      newErrors.vehicle_type = "वाहन प्रकार आवश्यक आहे";
    if (!formData.vehicle_name.trim())
      newErrors.vehicle_name = "वाहन नाव आवश्यक आहे";
    if (!formData.vehicle_no.trim())
      newErrors.vehicle_no = "वाहन क्रमांक आवश्यक आहे";
    if (!formData.district) newErrors.district = "जिल्हा आवश्यक आहे";
    if (!formData.taluka) newErrors.taluka = "तालुका आवश्यक आहे";
    if (!formData.village) newErrors.village = "गाव आवश्यक आहे";
    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  setErrors({});
  setSubmitError("");
const data = {
   vendor_id: formData.user,
    vehicle_type: formData.vehicle_type,
    vehicle_name: formData.vehicle_name,
    vehicle_no: formData.vehicle_no,
    condition: formData.condition,
    insurance_no: formData.insurance_no,
    upload_image: formData.upload_image,
    avg_of_veh: formData.avg_of_veh,
    insurance_validity_start: formData.insurance_validity_start,
    insurance_validity_end: formData.insurance_validity_end,
    purchase_date: formData.purchase_date,
    power: formData.power,
    district: formData.district,
    taluka: formData.taluka,
    village: formData.village,
    status: "available",
    price_per_day: formData.price_per_day,
    price_per_hour: formData.price_per_hour,
}
  const result = await dispatch(registerVehicle(data));

  if (result.success) {
    alert("वाहन यशस्वीरित्या नोंदणीकृत केले!");
    setFormData({
      user: "",
      vehicle_type: "",
      vehicle_name: "",
      vehicle_no: "",
      condition: "",
      insurance_no: "",
      upload_image: null,
      avg_of_veh: "",
      insurance_validity_start: "",
      insurance_validity_end: "",
      purchase_date: "",
      power: "",
      district: "",
      taluka: "",
      village: "",
      status: "Pending",
      price_per_day: "",
      price_per_hour: "",
    });
  } else {
    setSubmitError("नोंदणी करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.");
  }
};


  return (
    <div className="vehicleReg_container">
      <div className="location_header_row" style={{ gap: "20%" }}>
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      <h2 className="vehicleReg_title">वाहन नोंदणी फॉर्म</h2>
      </div>
      <form className="vehicleReg_form" onSubmit={handleSubmit}>
        {/* District */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">
            जिल्हा <span className="vehicleReg_required">*</span>
          </label>
          <select
            name="district"
            value={isOtherDistrict ? "इतर" : formData.district}
            onChange={handleDistrictChange}
            className="vehicleReg_select"
          >
            <option value="">-- निवडा जिल्हा --</option>
            <option value="इतर">इतर</option>
            {districts.map((d) => (
              <option key={d.id ?? d._id ?? d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
          {isOtherDistrict && (
            <input
              style={{ marginTop: "10px", padding: "10px 12px" }}
              type="text"
              placeholder="जिल्हा लिहा"
              value={formData.district}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  district: e.target.value,
                }))
              }
            />
          )}
          {errors.district && (
            <div className="vehicleReg_error">{errors.district}</div>
          )}
        </div>

        {/* Taluka */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">
            तालुका <span className="vehicleReg_required">*</span>
          </label>
          <select
            name="taluka"
            value={isOtherTaluka ? "इतर" : formData.taluka}
            onChange={handleTalukaChange}
            className="vehicleReg_select"
            // disabled={!formData.district}
          >
            <option value="">-- निवडा तालुका --</option>
            <option value="इतर">इतर</option>
            {filteredTalukas.map((t) => (
              <option
                key={t.id ?? t._id ?? t.name}
                value={t.name || t.taluka_name}
              >
                {t.name || t.taluka_name}
              </option>
            ))}
          </select>
          {isOtherTaluka && (
            <input
              style={{ marginTop: "10px", padding: "10px 12px" }}
              type="text"
              placeholder="तालुका लिहा"
              value={formData.taluka}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  taluka: e.target.value,
                }))
              }
            />
          )}
          {errors.taluka && (
            <div className="vehicleReg_error">{errors.taluka}</div>
          )}
        </div>

        {/* Village */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">
            गाव <span className="vehicleReg_required">*</span>
          </label>
          <select
            name="village"
            value={isOtherVillage ? "इतर" : formData.village}
            onChange={handleVillageChange}
            className="vehicleReg_select"
            // disabled={!formData.taluka}
          >
            <option value="">-- निवडा गाव --</option>
            <option value="इतर">इतर</option>
            {filteredVillages.map((v) => (
              <option key={v.id ?? v._id ?? v.name} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
          {isOtherVillage && (
            <input
              style={{ marginTop: "10px", padding: "10px 12px" }}
              type="text"
              placeholder="गाव लिहा"
              value={FormData.village}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  village: e.target.value,
                }))
              }
            />
          )}
          {errors.village && (
            <div className="vehicleReg_error">{errors.village}</div>
          )}
        </div>
        {/* Vendor */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">
            विक्रेता (user) <span className="vehicleReg_required">*</span>
          </label>
          <select
            name="user"
            value={formData.user}
            onChange={handleChange}
            className="vehicleReg_select"
          >
            <option value="">-- विक्रेता निवडा --</option>
            {Array.isArray(users) &&
              users
                .slice()
                .sort((a, b) =>
                  `${a.first_name || ""} ${a.last_name || ""}`.localeCompare(
                    `${b.first_name || ""} ${b.last_name || ""}`
                  )
                )
                .map((v) => (
                  <option key={v.id} value={v.id}>
                    {`${v.first_name || ""} ${v.last_name || ""}`}
                  </option>
                ))}
          </select>

          {errors.user && (
            <div className="vehicleReg_error">{errors.user}</div>
          )}
        </div>
        {/* Vehicle Type */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">
            वाहन प्रकार <span className="vehicleReg_required">*</span>
          </label>
          <select
            name="vehicle_type"
            value={formData.vehicle_type}
            onChange={handleChange}
            className="vehicleReg_select"
          >
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
          {errors.vehicle_type && (
            <div className="vehicleReg_error">{errors.vehicle_type}</div>
          )}
        </div>
        {/* Vehicle Name */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">
            वाहन नाव / मॉडेल <span className="vehicleReg_required">*</span>
          </label>
          <input
            type="text"
            name="vehicle_name"
            value={formData.vehicle_name}
            onChange={handleChange}
            className="vehicleReg_input"
            placeholder="उदा. ट्रॅक्टर"
          />
          {errors.vehicle_name && (
            <div className="vehicleReg_error">{errors.vehicle_name}</div>
          )}
        </div>
        {/* Vehicle No */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">
            वाहन क्रमांक <span className="vehicleReg_required">*</span>
          </label>
          <input
            type="text"
            name="vehicle_no"
            value={formData.vehicle_no}
            onChange={handleChange}
            className="vehicleReg_input"
            placeholder="उदा. MH12AB1234"
          />
          {errors.vehicle_no && (
            <div className="vehicleReg_error">{errors.vehicle_no}</div>
          )}
        </div>
        {/* Condition */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">वाहन स्थिती</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="vehicleReg_select"
          >
            <option value="">-- निवडा --</option>
            <option value="Good">चांगली</option>
            <option value="Average">सरासरी</option>
            <option value="Poor">वाईट</option>
          </select>
        </div>
        {/* Upload Image */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">वाहन फोटो अपलोड करा</label>
          <input
            type="file"
            name="upload_image"
            onChange={handleChange}
            className="vehicleReg_input"
            accept="image/*"
          />
        </div>
        {/* Avg of Vehicle */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">वाहन सरासरी</label>
          <input
            type="number"
            name="avg_of_veh"
            value={formData.avg_of_veh}
            onChange={handleChange}
            className="vehicleReg_input"
            placeholder="उदा. 15"
            step="any"
          />
        </div>
        {/* Purchase Date */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">खरेदी तारीख</label>
          <input
            type="date"
            name="purchase_date"
            value={formData.purchase_date}
            onChange={handleChange}
            className="vehicleReg_input"
          />
        </div>
        {/* Power */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">पॉवर</label>
          <input
            type="number"
            name="power"
            value={formData.power}
            onChange={handleChange}
            className="vehicleReg_input"
            placeholder="उदा. 50"
          />
        </div>
        {/* Insurance No */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">विमा क्रमांक</label>
          <input
            type="text"
            name="insurance_no"
            value={formData.insurance_no}
            onChange={handleChange}
            className="vehicleReg_input"
            placeholder="उदा. INS123456"
          />
        </div>
        {/* Insurance Validity Start */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">विमा प्रारंभ तारीख</label>
          <input
            type="date"
            name="insurance_validity_start"
            value={formData.insurance_validity_start}
            onChange={handleChange}
            className="vehicleReg_input"
          />
        </div>
        {/* Insurance Validity End */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">विमा समाप्ती तारीख</label>
          <input
            type="date"
            name="insurance_validity_end"
            value={formData.insurance_validity_end}
            onChange={handleChange}
            className="vehicleReg_input"
          />
        </div>

        {/* Price per day */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">दर (दिवसाने)</label>
          <input
            type="number"
            name="price_per_day"
            value={formData.price_per_day}
            onChange={handleChange}
            className="vehicleReg_input"
            placeholder="उदा. 500"
          />
        </div>

        {/* Price per hour */}
        <div className="vehicleReg_formGroup">
          <label className="vehicleReg_label">दर (तासाने)</label>
          <input
            type="number"
            name="price_per_hour"
            value={formData.price_per_hour}
            onChange={handleChange}
            className="vehicleReg_input"
            placeholder="उदा. 50"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="vehicleReg_submitBtn">
          नोंदणी करा
        </button>

        {submitError && (
          <p className="vehicleReg_error" style={{ textAlign: "center" }}>
            {submitError}
          </p>
        )}
      </form>
    </div>
  );
};

export default VehicleRegistration;
