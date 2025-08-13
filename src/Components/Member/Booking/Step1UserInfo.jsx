import React from "react";
const generatePeriods = () => {
  const periods = [];

  // Minutes (converted to hours)
  periods.push({ value: 0.25, label: "15 mins" });
  periods.push({ value: 0.5, label: "30 mins" });

  // Hours
  for (let h = 1; h <= 12; h++) {
    periods.push({ value: h, label: `${h} hr${h > 1 ? "s" : ""}` });
  }

  // Days (1 day = 24 hrs)
  for (let d = 1; d <= 30; d++) {
    periods.push({ value: d * 24, label: `${d} day${d > 1 ? "s" : ""}` });
  }

  // Weeks (1 week = 7 days = 168 hrs)
  for (let w = 1; w <= 4; w++) {
    periods.push({ value: w * 7 * 24, label: `${w} week${w > 1 ? "s" : ""}` });
  }

  // Months (approx 30 days = 720 hrs)
  for (let m = 1; m <= 12; m++) {
    periods.push({
      value: m * 30 * 24,
      label: `${m} month${m > 1 ? "s" : ""}`,
    });
  }

  // Years (approx 365 days = 8760 hrs)
  for (let y = 1; y <= 5; y++) {
    periods.push({
      value: y * 365 * 24,
      label: `${y} year${y > 1 ? "s" : ""}`,
    });
  }

  return periods;
};
const bookingPeriods = generatePeriods();

const Step1UserInfo = ({
  formData,
  errors,
  districts,
  filteredTalukasMember,
  filteredVillagesMember,
  filteredTalukasService,
  filteredVillagesService,
  members,
  vehicleTypes,
  isOtherMemberDistrict,
  isOtherMemberTaluka,
  isOtherMemberVillage,
  isOtherServiceDistrict,
  isOtherServiceTaluka,
  isOtherServiceVillage,
  handleChange,
  handleMemberDistrictChange,
  handleMemberTalukaChange,
  handleMemberVillageChange,
  handleServiceDistrictChange,
  handleServiceTalukaChange,
  handleServiceVillageChange,
  setFormData,
}) => {
  return (
    <div className="booking_step">
      <h3>Step 1: वापरकर्ता माहिती</h3>

      {/* User Type */}
      <div className="booking_section">
        <label>वापरकर्ता प्रकार:</label>
        <div className="booking_radio-group">
          <label>
            <input
              type="radio"
              name="userType"
              value="registered"
              checked={formData.userType === "registered"}
              onChange={handleChange}
            />
            नोंदणीकृत
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="non_registered"
              checked={formData.userType === "non_registered"}
              onChange={handleChange}
            />
            नोंदणीकृत नसलेला
          </label>
        </div>
      </div>

      {/* Member Location */}
      <div className="booking_section">
        <label>जिल्हा / तालुका / गाव:</label>
        <div className="booking_row">
          {/* District */}
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
              {districts.map((d, index) => (
                <option key={`${d.id ?? d._id ?? d.name}-${index}`} value={d.name}>
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

          {/* Taluka */}
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
              {filteredTalukasMember.map((t, index) => (
                <option
                  key={`${t.id ?? t._id ?? t.name}-${index}`}
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

          {/* Village */}
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
              {filteredVillagesMember.map((v, index) => (
                <option key={`${v.id ?? v._id ?? v.name}-${index}`} value={v.name}>
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

      {/* Member Selection */}
      {formData.userType === "registered" ? (
        <>
          <div className="booking_section">
            <label>सदस्य निवडा:</label>
            <select
              name="memberId"
              value={formData.memberId}
              onChange={(e) => {
                handleChange(e);
                const selectedMember = members.find(
                  (m) => String(m.id) === String(e.target.value)
                );
                if (selectedMember) {
                  setFormData((prev) => ({
                    ...prev,
                    firstName: selectedMember.first_name,
                    lastName: selectedMember.last_name,
                    mobile: selectedMember.mobile,
                  }));
                }
              }}
              disabled={!formData.memberVillage}
            >
              <option value="">-- सदस्य निवडा --</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {`${m.first_name} ${m.last_name}`}
                </option>
              ))}
            </select>
          </div>

          {/* Show separate inputs for selected member */}
          {formData.memberId && (
            <div className="booking_row" style={{ marginTop: "10px" }}>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="पहिले नाव"
                style={{ padding: "10px 12px", borderRadius: "4px" }}
                disabled={formData.userType === "registered"}
              />
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="आडनाव"
                style={{ padding: "10px 12px", borderRadius: "4px" }}
                disabled={formData.userType === "registered"}
              />
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="मोबाइल क्रमांक"
                style={{ padding: "10px 12px", borderRadius: "4px" }}
                disabled={formData.userType === "registered"}
              />
            </div>
          )}
        </>
      ) : (
        <div className="booking_section">
          <label>सदस्य माहिती:</label>
          <div className="booking_row">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="पहिले नाव"
              style={{ padding: "10px 12px", borderRadius: "4px" }}
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="आडनाव"
              style={{ padding: "10px 12px", borderRadius: "4px" }}
            />
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="मोबाइल क्रमांक"
              style={{ padding: "10px 12px", borderRadius: "4px" }}
            />
          </div>
        </div>
      )}

      {/* Vehicle Type */}
      <div className="booking_section">
        <label>वाहन प्रकार:</label>
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={(e) => {
            handleChange(e);
            const selected = vehicleTypes.find(
              (v) => v.name === e.target.value
            );
            setFormData((prev) => ({
              ...prev,
              vehicleRate: selected?.rate || 0,
            }));
          }}
        >
          <option value="">-- निवडा वाहन प्रकार --</option>
          {[...vehicleTypes]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((vt) => (
              <option key={vt.id} value={vt.name}>
                {vt.name}
              </option>
            ))}
        </select>

        {formData.vehicleType && (
          <div className="booking_row" style={{ marginTop: "10px" }}>
            <label>दर:</label>
            <input
              type="number"
              name="vehicleRate"
              value={formData.vehicleRate || ""}
              onChange={handleChange}
              placeholder="₹ दर प्रति तास"
            />
          </div>
        )}
      </div>

      {/* Farm Area */}
      <div className="booking_section">
        <label>शेती क्षेत्र (गुंठा):</label>
        <input
          name="farmArea"
          type="number"
          value={formData.farmArea}
          onChange={handleChange}
          placeholder="क्षेत्रफळ (गुंठा)"
        />
      </div>

      {/* Booking Date & Period */}
      <div className="booking_section">
        <label>बुकिंग दिनांक / कालावधी:</label>
        <div className="booking_row">
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
          />
          <select
            name="bookingPeriod"
            value={formData.bookingPeriod}
            onChange={handleChange}
          >
            <option value="">-- कालावधी --</option>
            {bookingPeriods.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
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

      {/* Service Address */}
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
              {districts.map((d, index) => (
                <option key={`${d.id ?? d._id ?? d.name}-${index}`} value={d.name}>
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
              {filteredTalukasService.map((t, index) => (
                <option
                  key={`${t.id ?? t._id ?? t.name}-${index}`}
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
              {filteredVillagesService.map((v, index) => (
                <option key={`${v.id ?? v._id ?? v.name}-${index}`} value={v.name}>
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
        <div className="booking_section">
          <label>पत्ता:</label>
          <textarea
            name="serviceAddress"
            value={formData.serviceAddress}
            onChange={handleChange}
            placeholder="संपूर्ण पत्ता लिहा"
            rows={3}
          />
        </div>
      </div>

      {/* Total Cost */}
      {formData.vehicleType && formData.farmArea && formData.bookingPeriod && (
        <div className="booking_section booking_total">
          <strong>एकूण खर्च:</strong>{" "}
          {(() => {
            const ratePerHour = parseFloat(formData.vehicleRate) || 0;
            const durationHours = parseFloat(formData.bookingPeriod) || 0;
            const farmArea = parseFloat(formData.farmArea) || 0;

            const total = ratePerHour * durationHours * farmArea;

            return `₹${total.toFixed(2)}`;
          })()}
        </div>
      )}
    </div>
  );
};

export default Step1UserInfo;
