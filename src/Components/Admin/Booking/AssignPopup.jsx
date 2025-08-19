import React from "react";
import "../../../Styles/Admin/Booking/AssignPopup.css";

const AssignPopup = ({
  onClose,
  onSubmit,
  formData,
  errors,
  districts,
  vehicles,
  drivers,
  filteredTalukasVehicle,
  filteredVillagesVehicle,
  isOtherVehicleDistrict,
  isOtherVehicleTaluka,
  isOtherVehicleVillage,
  handleVehicleDistrictChange,
  handleVehicleTalukaChange,
  handleVehicleVillageChange,
  handlevehicleChange,
  filteredTalukasDriver,
  filteredVillagesDriver,
  isOtherDriverDistrict,
  isOtherDriverTaluka,
  isOtherDriverVillage,
  handleDriverDistrictChange,
  handleDriverTalukaChange,
  handleDriverVillageChange,
  handleDriverChange,
  driversLoading,
  setFormData,
}) => {
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     onChange(name, value); // 🔹 notify parent only
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     onSubmit(); // 🔹 parent handles assignment
  //     onClose();
  //   };

  return (
    <div className="assignpopup_overlay">
      <div className="assignpopup_container">
        <h3>Step 1: वाहन निवड</h3>

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
              onChange={handleVehicleDistrictChange}
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
              onChange={handleVehicleTalukaChange}
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
              onChange={handleVehicleVillageChange}
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

        {/* Vehicle List Dropdown (if any) */}
        {vehicles && vehicles.length > 0 && (
          <div className="booking_section">
            <label>वाहन निवडा:</label>
            <select
              name="selectedVehicle"
              value={formData.selectedVehicle}
              onChange={handlevehicleChange}
            >
              <option value="">-- वाहन निवडा --</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.vehicle_type} - {vehicle.vehicle_name}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Vehicle Info */}
        {formData.selectedVehicleInfo && (
          <div className="booking_section">
            <h4>वाहन माहिती</h4>
            <div className="booking_row">
              <label>vehicle type</label>
              <input
                type="text"
                value={formData.selectedVehicleInfo.vehicle_type}
                disabled
                placeholder="मॉडेल"
              />
              <label>vehicle name</label>
              <input
                type="text"
                value={formData.selectedVehicleInfo.vehicle_name}
                disabled
                placeholder="स्थिती"
              />
              <label>vehicle number</label>
              <input
                type="text"
                value={formData.selectedVehicleInfo.vehicle_no}
                disabled
                placeholder="स्थिती"
              />
              <label>vehicle condition</label>
              <input
                type="text"
                value={formData.selectedVehicleInfo.condition}
                disabled
                placeholder="स्थिती"
              />
              <label>vehicle average</label>
              <input
                type="text"
                value={formData.selectedVehicleInfo.avg_of_veh}
                disabled
                placeholder="स्थिती"
              />
            </div>
          </div>
        )}
        <h3>Step 2: ड्रायव्हर असाइन</h3>

        {/* Driver Location Selection */}
        <div className="booking_section">
          {/* District */}
          <div className="booking_formGroup">
            <label className="booking_label">
              जिल्हा <span className="booking_required">*</span>
            </label>
            <select
              name="driverDistrict"
              value={isOtherDriverDistrict ? "इतर" : formData.driverDistrict}
              onChange={handleDriverDistrictChange}
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

          {/* Taluka */}
          <div className="booking_formGroup">
            <label className="booking_label">
              तालुका <span className="booking_required">*</span>
            </label>
            <select
              name="driverTaluka"
              value={isOtherDriverTaluka ? "इतर" : formData.driverTaluka}
              onChange={handleDriverTalukaChange}
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

          {/* Village */}
          <div className="booking_formGroup">
            <label className="booking_label">
              गाव <span className="booking_required">*</span>
            </label>
            <select
              name="driverVillage"
              value={isOtherDriverVillage ? "इतर" : formData.driverVillage}
              onChange={handleDriverVillageChange}
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
        {drivers && drivers.length > 0 && (
          <div className="booking_section">
            <label>ड्रायव्हर निवडा:</label>
            <select
              name="assignedDriver"
              value={formData.assignedDriver || ""}
              onChange={handleDriverChange}
            >
              <option value="">-- ड्रायव्हर निवडा --</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name || driver.full_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Driver Info */}
        {formData.selectedDriverInfo && (
          <div className="booking_section">
            <h4>ड्रायव्हर माहिती</h4>
            <div className="booking_row">
              <input
                type="text"
                value={
                  formData.selectedDriverInfo.name ||
                  formData.selectedDriverInfo.full_name
                }
                disabled
                placeholder="नाव"
              />
              <input
                type="text"
                value={
                  formData.selectedDriverInfo.phone ||
                  formData.selectedDriverInfo.mobile
                }
                disabled
                placeholder="फोन"
              />
            </div>
            <div className="booking_row">
              <input
                type="text"
                value={
                  formData.selectedDriverInfo.licenseNumber ||
                  formData.selectedDriverInfo.license_number
                }
                disabled
                placeholder="परवाना क्रमांक"
              />
              <input
                type="text"
                value={`${formData.selectedDriverInfo.experience || 0} वर्ष`}
                disabled
                placeholder="अनुभव"
              />
            </div>
            <input
              type="text"
              value={formData.selectedDriverInfo.email || ""}
              disabled
              placeholder="पत्ता"
            />
          </div>
        )}
         {/* Footer Buttons */}
        <div className="assignpopup_footer">
          <button
            className="assignpopup_cancel_btn"
            onClick={onClose} // parent will handle closing
          >
            Cancel
          </button>
          <button
            className="assignpopup_submit_btn"
            onClick={onSubmit} // parent will handle submit
          >
            Submit
          </button>
        </div>
      </div>
           
    </div>
  );
};

export default AssignPopup;
