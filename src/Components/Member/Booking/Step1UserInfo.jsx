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
  filteredTalukasService,
  filteredVillagesService,
  vehicleTypes,
  handleChange,
  setFormData,
}) => {
  return (
    <div className="step1-container">
      {/* District */}
      <div className="form-group">
        <label htmlFor="serviceDistrict">जिल्हा</label>
        <select
          id="serviceDistrict"
          name="serviceDistrict"
          value={formData.serviceDistrict}
          onChange={handleChange}
          style={{padding:"10px 12px"}}
        >
          <option value="">-- जिल्हा निवडा --</option>
          {districts.map((dist) => (
            <option key={dist.id} value={dist.name}>
              {dist.name}
            </option>
          ))}
        </select>
        {errors.serviceDistrict && (
          <p className="error">{errors.serviceDistrict}</p>
        )}
      </div>

      {/* Taluka */}
      <div className="form-group">
        <label htmlFor="serviceTaluka">तालुका</label>
        <select
          id="serviceTaluka"
          name="serviceTaluka"
          value={formData.serviceTaluka}
          onChange={handleChange}
          disabled={!formData.serviceDistrict}
          style={{padding:"10px 12px"}}
        >
          <option value="">-- तालुका निवडा --</option>
          {filteredTalukasService.map((tal) => (
            <option key={tal.id} value={tal.name}>
              {tal.name}
            </option>
          ))}
        </select>
        {errors.serviceTaluka && (
          <p className="error">{errors.serviceTaluka}</p>
        )}
      </div>

      {/* Village */}
      <div className="form-group">
        <label htmlFor="serviceVillage">गाव</label>
        <select
          id="serviceVillage"
          name="serviceVillage"
          value={formData.serviceVillage}
          onChange={handleChange}
          disabled={!formData.serviceTaluka}
          style={{padding:"10px 12px"}}
        >
          <option value="">-- गाव निवडा --</option>
          {filteredVillagesService.map((vil) => (
            <option key={vil.id} value={vil.name}>
              {vil.name}
            </option>
          ))}
        </select>
        {errors.serviceVillage && (
          <p className="error">{errors.serviceVillage}</p>
        )}
      </div>

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
      <div className="form-group">
        <label htmlFor="farmArea">शेती क्षेत्रफळ (एकर मध्ये)</label>
        <input
          type="number"
          id="farmArea"
          name="farmArea"
          placeholder="उदा. 5"
          value={formData.farmArea}
          onChange={handleChange}
        />
        {errors.farmArea && <p className="error">{errors.farmArea}</p>}
      </div>

      {/* Booking Reason */}
      <div className="form-group">
        <label htmlFor="bookingReason">बुकिंग कारण</label>
        <input
          type="text"
          id="bookingReason"
          name="bookingReason"
          placeholder="उदा. नांगरणी / पाणीपुरवठा"
          value={formData.bookingReason}
          onChange={handleChange}
        />
        {errors.bookingReason && (
          <p className="error">{errors.bookingReason}</p>
        )}
      </div>

      {/* Booking Date */}
      <div className="form-group">
        <label htmlFor="bookingDate">बुकिंग तारीख</label>
        <input
          type="date"
          id="bookingDate"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
        />
        {errors.bookingDate && <p className="error">{errors.bookingDate}</p>}
      </div>

      {/* Booking Period */}
      <div>
       <select
            name="bookingPeriod"
            value={formData.bookingPeriod}
            onChange={handleChange}
            style={{padding:"10px 12px", width:"100%", marginTop:"10px"}}
          >
            <option value="">-- कालावधी --</option>
            {bookingPeriods.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        {errors.bookingPeriod && (
          <p className="error">{errors.bookingPeriod}</p>
        )}
      </div>

      {/* Service Address */}
      <div className="form-group">
        <label htmlFor="serviceAddress">सेवेचा पत्ता</label>
        <textarea
          id="serviceAddress"
          name="serviceAddress"
          placeholder="उदा. गट क्रमांक 12, मुख्य रस्ता, पुणे"
          value={formData.serviceAddress}
          onChange={handleChange}
        />
        {errors.serviceAddress && (
          <p className="error">{errors.serviceAddress}</p>
        )}
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
