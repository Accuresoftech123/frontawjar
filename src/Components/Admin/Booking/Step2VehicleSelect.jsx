import React from "react";

const Step2VehicleSelect = ({
  formData,
  errors,
  districts,
  vehicles,
  filteredTalukasVehicle,
  filteredVillagesVehicle,
  isOtherVehicleDistrict,
  isOtherVehicleTaluka,
  isOtherVehicleVillage,
  handleVehicleDistrictChange,
  handleVehicleTalukaChange,
  handleVehicleVillageChange,
  handlevehicleChange,
  setFormData,
}) => {
  return (
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

      {/* Vendor Info */}
      {/* {formData.selectedVehicleInfo?.vendor && (
        <div className="booking_section">
          <h4>व्हेंडर माहिती</h4>
          <div className="booking_row">
            <input
              type="text"
              value={formData.selectedVehicleInfo.vendor.name}
              disabled
              placeholder="नाव"
            />
            <input
              type="text"
              value={formData.selectedVehicleInfo.vendor.phone}
              disabled
              placeholder="फोन"
            />
          </div>
          <input
            type="text"
            value={formData.selectedVehicleInfo.vendor.address}
            disabled
            placeholder="पत्ता"
          />
        </div>
      )} */}
    </div>
  );
};

export default Step2VehicleSelect;
