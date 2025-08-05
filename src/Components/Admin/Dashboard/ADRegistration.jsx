import React, { useState, useEffect } from "react";
import "../../../Styles/Registration.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "../../../Assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getDistricts,
//   getTalukas,
//   getVillages,
// } from "../Helper/Admin/AdminActions";
// import { registerMemberUser } from "../Helper/Member/MemberActions";
// import { registerVendorUser } from "../Helper/Vendor/VendorActions";
// import { registerDriverUser } from "../Helper/Driver/DriverActions";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";

const validateInputs = (formData) => {
  const errors = {};
  const nameRegex = /^[\p{L}\s.'-]+$/u;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  const mobileRegex = /^[6-9]\d{9}$/;
  const adharRegex = /^\d{12}$/;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const zipcodeRegex = /^\d{6}$/;
  const licenseNumberRegex = /^[A-Z]{2}\d{2}\s\d{11}$/;

  //   if (!formData.role) errors.role = "वापरकर्ता प्रकार निवडा";
   // जिल्हा
  if (!FormData.district || FormData.district.trim() === "") {
    errors.district = "कृपया जिल्हा निवडा किंवा लिहा";
  }

  // तालुका
  if (!FormData.taluka || FormData.taluka.trim() === "") {
    errors.taluka = "कृपया तालुका निवडा किंवा लिहा";
  }

  // गाव
  if (!FormData.Village || FormData.Village.trim() === "") {
    errors.Village = "कृपया गाव निवडा किंवा लिहा";
  }
  // First Name
  if (!formData.first_name.trim()) {
    errors.first_name = "प्रथम नाव आवश्यक आहे";
  } else if (!nameRegex.test(formData.first_name.trim())) {
    errors.first_name = "फक्त अक्षरे प्रविष्ट करा";
  }

  // Last Name
  if (!formData.last_name.trim()) {
    errors.last_name = "आडनाव आवश्यक आहे";
  } else if (!nameRegex.test(formData.last_name.trim())) {
    errors.last_name = "फक्त अक्षरे प्रविष्ट करा";
  }

  // DOB
  if (!formData.dob) {
    errors.dob = "जन्मतारीख आवश्यक आहे";
  } else {
    const selectedDate = new Date(formData.dob);
    const today = new Date();
    if (selectedDate >= today) {
      errors.dob = "वैध भूतकाळातील जन्मतारीख प्रविष्ट करा";
    }
  }

  // Mobile
  if (!formData.mobile.trim()) {
    errors.mobile = "मोबाईल क्र. आवश्यक आहे";
  } else if (!mobileRegex.test(formData.mobile.trim())) {
    errors.mobile = "वैध 10 अंकी मोबाईल क्र. प्रविष्ट करा";
  }

  // Aadhaar
  if (!formData.adhar_no.trim()) {
    errors.adhar_no = "आधार क्र. आवश्यक आहे";
  } else if (!adharRegex.test(formData.adhar_no.trim())) {
    errors.adhar_no = "12 अंकी वैध आधार क्र. प्रविष्ट करा";
  }

  // PAN
  if (!formData.pan_no.trim()) {
    errors.pan_no = "पॅन क्र. आवश्यक आहे";
  } else if (!panRegex.test(formData.pan_no.trim())) {
    errors.pan_no = "वैध पॅन क्र. प्रविष्ट करा (ABCDE1234F)";
  }
  //email
  if (!formData.email.trim()) {
    errors.email = "ई-मेल आवश्यक आहे";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "वैध ई-मेल प्रविष्ट करा";
  }
  //password
  if (!formData.password.trim()) {
    errors.password = "पासवर्ड आवश्यक आहे";
  } else if (!strongPasswordRegex.test(formData.password.trim())) {
    errors.password =
      "पासवर्डमध्ये कमीत कमी 8 अक्षरे, एक मोठा, एक लहान, एक अंक व एक विशेष चिन्ह असणे आवश्यक आहे";
  }
  //confirm password
  if (!formData.confirm_password.trim()) {
    errors.confirm_password = "पासवर्डची पुष्टी आवश्यक आहे";
  } else if (formData.password !== formData.confirm_password) {
    errors.confirm_password = "पासवर्ड आणि पुष्टी पासवर्ड जुळत नाहीत";
  }

  // Zipcode
  if (!formData.zipcode.trim()) {
    errors.zipcode = "पिन कोड आवश्यक आहे";
  } else if (!zipcodeRegex.test(formData.zipcode.trim())) {
    errors.zipcode = "6 अंकी वैध पिन कोड प्रविष्ट करा";
  }

  if (!formData.address.trim()) errors.address = "पूर्ण पत्ता आवश्यक आहे";

  if (!formData.landmark.trim())
    errors.landmark = "ओळख पटविण्याजोगी खूण आवश्यक आहे";

  if (formData.role === "Operator") {
    if (!formData.license_number.trim()) {
      errors.license_number = "परवाना क्रमांक आवश्यक आहे";
    } else if (!licenseNumberRegex.test(formData.license_number.trim())) {
      errors.license_number =
        "वैध परवाना क्रमांक प्रविष्ट करा (उदा. MH12 20123456789)";
    }

    if (!formData.license_attachment)
      errors.license_attachment = "परवाना जोडणे आवश्यक आहे";
  }

  return errors;
};

const ADRegistration = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [FormData, setFormData] = useState({
    reg_by: "by Admin",
    role: role,
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    adhar_no: "",
    pan_no: "",
    dob: "",
    password: "",
    confirm_password: "",
    zipcode: "",
    district: "",
    taluka: "",
    Village: "",
    address: "",
    landmark: "",
    license_number: "",
    license_attachment: null,
  });
  const dispatch = useDispatch();
  //   const { districts = [] } = useSelector((state) => state.district);
  //   const { talukas = [] } = useSelector((state) => state.taluka);
  //   const {
  //     villages = [],
  //     loading,
  //     error,
  //   } = useSelector((state) => state.village);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  useEffect(() => {
    // dispatch(getDistricts());
    // dispatch(getTalukas());
    // dispatch(getVillages());
  }, [dispatch]);
  // Filter talukas based on selected district
  //   const filteredTalukas = talukas.filter(
  //     (t) => t.district === Number(FormData.district)
  //   );
  //   // Filter talukas based on selected district
  //   const filteredVillages = villages.filter(
  //     (v) => v.taluka === Number(FormData.taluka)
  //   );
  const handleSubmit = (e) => {
    e.preventDefault();
    // Run validation
    const validationErrors = validateInputs(FormData);
    setErrors(validationErrors);

    // Stop if errors exist
    if (Object.keys(validationErrors).length > 0) return;

    //build payload based on user type
    const payload = {
      reg_by: FormData.reg_by,
      role: FormData.role,
      first_name: FormData.first_name,
      last_name: FormData.last_name,
      email: FormData.email,
      mobile: FormData.mobile,
      adhar_no: FormData.adhar_no,
      pan_no: FormData.pan_no,
      dob: FormData.dob,
      password: FormData.password,
      confirm_password: FormData.confirm_password,
      zipcode: FormData.zipcode,
      district: FormData.district,
      taluka: FormData.taluka,
      Village: FormData.Village,
      address: FormData.address,
      landmark: FormData.landmark,
    };
    if (FormData.role === "Operator") {
      payload.license_number = FormData.license_number;
      payload.license_attachment = FormData.license_attachment;
    }

    if (FormData.role === "Member") {
      //   dispatch(registerMemberUser(payload));
    } else if (FormData.role === "Vendor") {
      //   dispatch(registerVendorUser(payload));
    } else if (FormData.role === "Operator") {
      //   dispatch(registerDriverUser(payload));
    } else {
      window.alert("user not been registered");
    }
  };

  const isOperator = FormData.role === "Operator";
  return (
    <div className="registration_container">
      {/* Form */}
      <main className="registration_main">
        <div className="registration_content">
          <div className="location_header_row">
        <button className="location_back_button" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
          <div className="registration_title">
            <h3>नोंदणी करा</h3>
            <p>कृपया आपले तपशील प्रविष्ट करा</p>
          </div></div>

          <form className="registration_grid" onSubmit={handleSubmit}>
            {/*Selection Part */}
            <fieldset className="registration_group-section">
              <legend>स्थान निवडा</legend>

              <div className="registration_location-row">
                {/* जिल्हा */}
                <div className="registration_form-group">
                  <label>जिल्हा</label>
                  <select
                    name="district"
                    value={FormData.district}
                    onChange={handleChange}
                  >
                    <option value="">जिल्हा निवडा</option>
                    <option value="इतर">इतर</option>
                    {/* {districts.map((d) => (
          <option key={d.id} value={d.name}>{d.name}</option>
        ))} */}
                  </select>
                  {FormData.district === "इतर" && (
                    <input
                      style={{ marginTop: "10px" }}
                      type="text"
                      placeholder="जिल्हा लिहा"
                      value=""
                      onChange={(e) =>
                        setFormData({ ...FormData, district: e.target.value })
                      }
                    />
                  )}
                  {errors.district && (
                    <p className="error">{errors.district}</p>
                  )}
                </div>

                {/* तालुका */}
                <div className="registration_form-group">
                  <label>तालुका</label>
                  <select
                    name="taluka"
                    value={FormData.taluka}
                    onChange={handleChange}
                  >
                    <option value="">तालुका निवडा</option>
                    <option value="इतर">इतर</option>
                    {/* {filteredTalukas.map((t) => (
          <option key={t.id} value={t.name}>{t.name}</option>
        ))} */}
                  </select>
                  {FormData.taluka === "इतर" && (
                    <input
                      style={{ marginTop: "10px" }}
                      type="text"
                      placeholder="तालुका लिहा"
                      value=""
                      onChange={(e) =>
                        setFormData({ ...FormData, taluka: e.target.value })
                      }
                    />
                  )}
                  {errors.taluka && <p className="error">{errors.taluka}</p>}
                </div>

                {/* गाव */}
                <div className="registration_form-group">
                  <label>गाव</label>
                  <select
                    name="Village"
                    value={FormData.Village}
                    onChange={handleChange}
                  >
                    <option value="">गाव निवडा</option>
                    <option value="इतर">इतर</option>
                    {/* {filteredVillages.map((v) => (
          <option key={v.id} value={v.name}>{v.name}</option>
        ))} */}
                  </select>
                  {FormData.Village === "इतर" && (
                    <input
                      style={{ marginTop: "10px" }}
                      type="text"
                      placeholder="गाव लिहा"
                      value=""
                      onChange={(e) =>
                        setFormData({ ...FormData, Village: e.target.value })
                      }
                    />
                  )}
                  {errors.Village && <p className="error">{errors.Village}</p>}
                </div>
              </div>
            </fieldset>

            {/* Personal Info */}
            <fieldset className="registration_group-section">
              <legend>वैयक्तिक माहिती</legend>

              <div className="registration_grid-2col">
                <div className="registration_form-group">
                  <label>प्रथम नाव</label>
                  <input
                    type="text"
                    name="first_name"
                    value={FormData.first_name}
                    onChange={handleChange}
                  />
                  {errors.first_name && (
                    <p className="error">{errors.first_name}</p>
                  )}
                </div>

                <div className="registration_form-group">
                  <label>आडनाव</label>
                  <input
                    type="text"
                    name="last_name"
                    value={FormData.last_name}
                    onChange={handleChange}
                  />
                  {errors.last_name && (
                    <p className="error">{errors.last_name}</p>
                  )}
                </div>

                <div className="registration_form-group">
                  <label>जन्मतारीख</label>
                  <input
                    type="date"
                    name="dob"
                    value={FormData.dob}
                    onChange={handleChange}
                  />
                  {errors.dob && <p className="error">{errors.dob}</p>}
                </div>

                <div className="registration_form-group">
                  <label>मोबाईल क्र.</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={FormData.mobile}
                    onChange={handleChange}
                  />
                  {errors.mobile && <p className="error">{errors.mobile}</p>}
                </div>

                <div className="registration_form-group">
                  <label>आधार क्र.</label>
                  <input
                    type="text"
                    name="adhar_no"
                    value={FormData.adhar_no}
                    onChange={handleChange}
                  />
                  {errors.adhar_no && (
                    <p className="error">{errors.adhar_no}</p>
                  )}
                </div>

                <div className="registration_form-group">
                  <label>पॅन क्र.</label>
                  <input
                    type="text"
                    name="pan_no"
                    value={FormData.pan_no}
                    onChange={handleChange}
                  />
                  {errors.pan_no && <p className="error">{errors.pan_no}</p>}
                </div>
              </div>
            </fieldset>

            <div className="registration_grid-2section">
              {/* Security Info Section */}
              <fieldset className="registration_group-section">
                <legend>सुरक्षा माहिती</legend>

                <div className="registration_grid-1col">
                  <div className="registration_form-group">
                    <label>ई-मेल</label>
                    <input
                      type="email"
                      name="email"
                      value={FormData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>

                  <div className="registration_form-group">
                    <label>पासवर्ड तयार करा</label>
                    <div className="registration__inputWrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={FormData.password}
                        onChange={handleChange}
                      />
                      <span
                        className="registration__togglePassword"
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? (
                          <VisibilityOffOutlined />
                        ) : (
                          <VisibilityOutlined />
                        )}
                      </span>
                    </div>
                    {errors.password && (
                      <p className="error">{errors.password}</p>
                    )}
                  </div>

                  <div className="registration_form-group">
                    <label>पासवर्डची पुष्टी करा</label>
                    <div className="registration__inputWrapper">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        value={FormData.confirm_password}
                        onChange={handleChange}
                      />
                      <span
                        className="registration__togglePassword"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        style={{ cursor: "pointer" }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffOutlined />
                        ) : (
                          <VisibilityOutlined />
                        )}
                      </span>
                    </div>
                    {errors.confirm_password && (
                      <p className="error">{errors.confirm_password}</p>
                    )}
                  </div>
                </div>
              </fieldset>

              {/* Address Info Section */}
              <fieldset className="registration_group-section">
                <legend>पत्ता</legend>

                <div className="Registration_grid-1col">
                  <div className="Registration_form-group">
                    <label>पूर्ण पत्ता</label>
                    <textarea
                      name="address"
                      value={FormData.address}
                      onChange={handleChange}
                      rows="3"
                    ></textarea>
                    {errors.address && (
                      <p className="error">{errors.address}</p>
                    )}
                  </div>

                  <div className="Registration_form-group">
                    <label>पिन कोड</label>
                    <input
                      type="text"
                      name="zipcode"
                      value={FormData.zipcode}
                      onChange={handleChange}
                    />
                    {errors.zipcode && (
                      <p className="error">{errors.zipcode}</p>
                    )}
                  </div>

                  <div className="Registration_form-group">
                    <label>लँडमार्क</label>
                    <input
                      type="text"
                      name="landmark"
                      value={FormData.landmark}
                      onChange={handleChange}
                    />
                    {errors.landmark && (
                      <p className="error">{errors.landmark}</p>
                    )}
                  </div>
                </div>
              </fieldset>
            </div>

            {/* Operator Only */}
            {isOperator && (
              <fieldset className="registration_group-section">
                <legend>चालकाची माहिती</legend>

                <div className="registration_grid-2col">
                  <div className="registration_form-group">
                    <label>वाहन चालविण्याचा परवाना क्रमांक</label>
                    <input
                      type="text"
                      name="license_number"
                      value={FormData.license_number}
                      onChange={handleChange}
                    />
                    {errors.license_number && (
                      <p className="error">{errors.license_number}</p>
                    )}
                  </div>

                  <div className="registration_form-group">
                    <label>वाहन चालविण्याचा परवाना जोडणी</label>
                    <input
                      type="file"
                      name="license_attachment"
                      onChange={handleChange}
                      accept=".jpg,.png,.pdf"
                    />
                    {errors.license_attachment && (
                      <p className="error">{errors.license_attachment}</p>
                    )}
                  </div>
                </div>
              </fieldset>
            )}

            {/* Submit */}
            <div className="registration_form-group full-width">
              <button type="submit" className="registration_btn-primary">
                नोंदणी करा
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ADRegistration;
