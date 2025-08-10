import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVehicleType } from "../../../Helper/VendorPanel/VendorActions";
import { useNavigate } from "react-router-dom";
import "../../../Styles/Admin/Dashboard/VehicleTypeRegistration.css";

const VehicleTypeRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [vehicleTypeName, setVehicleTypeName] = useState("");
  const [farmAreaGutha, setFarmAreaGutha] = useState("");
  const [timeInHours, setTimeInHours] = useState("");
  const [service, setService] = useState("");
  const [rate, setRate] = useState("");
  const [remark, setRemark] = useState("");
  const [formError, setFormError] = useState("");

  const { loading, error, success } = useSelector(
    (state) => state.vehicletype
  );

  useEffect(() => {
    if (success) {
      // Clear form
      setVehicleTypeName("");
      setFarmAreaGutha("");
      setTimeInHours("");
      setService("");
      setRate("");
      setRemark("");
    }
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!vehicleTypeName.trim()) {
      setFormError("कृपया वाहन प्रकार नाव प्रविष्ट करा");
      return;
    }
   if (!farmAreaGutha.trim() && !timeInHours.trim()) {
  setFormError("कृपया गुठ्ठ्याचा क्षेत्रफळ किंवा वेळ (तास) प्रविष्ट करा");
  return;
}
    if (!service.trim()) {
      setFormError("कृपया सेवा प्रकार प्रविष्ट करा");
      return;
    }
    if (!rate.trim()) {
      setFormError("कृपया दर प्रविष्ट करा");
      return;
    }

    setFormError("");

    const formData = {
      name: vehicleTypeName,
      area_acher_wise: farmAreaGutha,
      time_hour_wise: timeInHours,
      service_dropdown: service,
      rate,
      remark: remark,
    };
console.log(formData);
    dispatch(createVehicleType(formData));
  };

  return (
    <div className="vehicleTypeReg_container">
      <div className="location_header_row" style={{ gap: "20%" }}>
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <div className="vehicleTypeReg_header">
          <h2 className="vehicleTypeReg_title">वाहन प्रकार नोंदणी</h2>
          <p className="vehicleTypeReg_subtitle">नवीन वाहन प्रकार जोडा</p>
        </div>
      </div>

      <form className="vehicleTypeReg_form" onSubmit={handleSubmit}>
        <div className="vehicleTypeReg_formGroup">
          <label htmlFor="vehicleTypeName" className="vehicleTypeReg_label">
            वाहन प्रकार नाव <span className="vehicleTypeReg_required">*</span>
          </label>
          <input
            type="text"
            id="vehicleTypeName"
            className="vehicleTypeReg_input"
            value={vehicleTypeName}
            onChange={(e) => setVehicleTypeName(e.target.value)}
            placeholder="उदा. ट्रॅक्टर, बळीराजा"
            required
          />
        </div>

        <div className="vehicleTypeReg_formGroup">
          <label htmlFor="farmAreaGutha" className="vehicleTypeReg_label">
            शेताचा क्षेत्रफळ (गुठ्ठा) <span className="vehicleTypeReg_required">*</span>
          </label>
          <input
            type="number"
            id="farmAreaGutha"
            className="vehicleTypeReg_input"
            value={farmAreaGutha}
            onChange={(e) => setFarmAreaGutha(e.target.value)}
            placeholder="उदा. 10"
            min="0"
          />
        </div>

        <div className="vehicleTypeReg_formGroup">
          <label htmlFor="timeInHours" className="vehicleTypeReg_label">
            वेळ (तास) <span className="vehicleTypeReg_required">*</span>
          </label>
          <input
            type="number"
            id="timeInHours"
            className="vehicleTypeReg_input"
            value={timeInHours}
            onChange={(e) => setTimeInHours(e.target.value)}
            placeholder="उदा. 2"
            min="0"
          />
        </div>

        <div className="vehicleTypeReg_formGroup">
          <label htmlFor="service" className="vehicleTypeReg_label">
            सेवा प्रकार <span className="vehicleTypeReg_required">*</span>
          </label>
          <input
            type="text"
            id="service"
            className="vehicleTypeReg_input"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="उदा. नांगरणे, पेरणी"
            required
          />
        </div>

        <div className="vehicleTypeReg_formGroup">
          <label htmlFor="rate" className="vehicleTypeReg_label">
            दर <span className="vehicleTypeReg_required">*</span>
          </label>
          <input
            type="number"
            id="rate"
            className="vehicleTypeReg_input"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="उदा. 500"
            min="0"
            required
          />
        </div>

        <div className="vehicleTypeReg_formGroup">
          <label htmlFor="remark" className="vehicleTypeReg_label">
            टिप्पणी / वर्णन
          </label>
          <textarea
            id="remark"
            className="vehicleTypeReg_textarea"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="इथे काही अतिरिक्त माहिती द्या"
            rows={4}
          />
        </div>

        {formError && <p className="vehicleTypeReg_error">{formError}</p>}
        {error && <p className="vehicleTypeReg_error">{error}</p>}

        <button
          type="submit"
          className="vehicleTypeReg_submitButton"
          disabled={loading}
        >
          {loading ? "नोंदणी सुरू आहे..." : "नोंदणी करा"}
        </button>
      </form>
    </div>
  );
};

export default VehicleTypeRegistration;
