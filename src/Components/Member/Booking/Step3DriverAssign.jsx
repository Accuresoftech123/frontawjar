import React from "react";

const Step3DriverAssign = ({
  formData,
  errors,
  districts,
  filteredTalukasDriver,
  filteredVillagesDriver,
  isOtherDriverDistrict,
  isOtherDriverTaluka,
  isOtherDriverVillage,
  handleDriverDistrictChange,
  handleDriverTalukaChange,
  handleDriverVillageChange,
  handleDriverChange,
  drivers,
  driversLoading,
  setFormData,
}) => {
  return (
    <div className="booking_step">
      <h3>Step 3: ड्रायव्हर असाइन</h3>

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
      {drivers?.length > 0 && (
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
              value={formData.selectedDriverInfo.name || formData.selectedDriverInfo.full_name}
              disabled
              placeholder="नाव"
            />
            <input
              type="text"
              value={formData.selectedDriverInfo.phone || formData.selectedDriverInfo.mobile}
              disabled
              placeholder="फोन"
            />
          </div>
          <div className="booking_row">
            <input
              type="text"
              value={formData.selectedDriverInfo.licenseNumber || formData.selectedDriverInfo.license_number}
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
    </div>
  );
};

export default Step3DriverAssign;
