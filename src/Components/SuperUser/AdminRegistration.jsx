import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { checkEmail, registerAdmin } from "../../Helper/Actions";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/SuperUser/AdminRegistration.css";

const AdminRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const otpRefs = useRef([]);
 const adminreg = useSelector((state) => state.admin.adminuser);
  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "नाव आवश्यक आहे";
    if (!formData.email.trim()) errs.email = "ईमेल आवश्यक आहे";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "बरोबर ईमेल फॉरमॅट द्या";
    if (!formData.mobile.trim()) errs.mobile = "मोबाईल नंबर आवश्यक आहे";
    else if (!/^\d{10}$/.test(formData.mobile)) errs.mobile = "बरोबर 10 अंकी मोबाईल नंबर द्या";
    if (!formData.password) errs.password = "पासवर्ड आवश्यक आहे";
    else if (formData.password.length < 6) errs.password = "किमान 6 अक्षरांचा पासवर्ड द्या";
    if (!formData.confirmPassword) errs.confirmPassword = "पासवर्ड पुन्हा टाका";
    else if (formData.confirmPassword !== formData.password) errs.confirmPassword = "पासवर्ड जुळत नाही";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

const handleSendOtp = async () => {
  const res = await dispatch(checkEmail({ email: formData.email, role: "admin" }));
  toast[res.success ? "success" : "error"](res.message);

  if (res.success) {
    setOtpSent(true);
    otpRefs.current[0]?.focus();
  }
};


  const handleOtpChange = (e, idx) => {
    const value = e.target.value.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    if (value && idx < 5) otpRefs.current[idx + 1]?.focus();
    if (!value && idx > 0 && e.nativeEvent.inputType === "deleteContentBackward") {
      otpRefs.current[idx - 1]?.focus();
    }
  };

const handleRegister = async () => {
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length) {
    setErrors(validationErrors);
    return;
  }

  const otpValue = otp.join("");
  if (otpValue.length !== 6) {
    toast.error("कृपया 6-अंकी OTP टाका");
    return;
  }

  const payload = {
    email: formData.email,
    role: "admin",
    otp: otpValue,
    password: formData.password,
    confirm_password: formData.confirmPassword,
  };

  const res = await dispatch(registerAdmin(payload));
  toast[res.success ? "success" : "error"](res.message);

};

 useEffect(() => {
    if (adminreg) {
      toast.success("Registration यशस्वी!");
      navigate("/SuperUserHome/Dashboard");
    }
  }, [adminreg, navigate]);
  return (
    <div className="admin-registration-container">
      <ToastContainer position="top-center" />
      <div className="admin-reg_header_row">
        <button onClick={() => navigate(-1)}>⬅ Back</button>
        <h2>ऍडमिन नोंदणी फॉर्म</h2>
      </div>
      <div className="admin-registration-form">
        {["email","name","mobile","password","confirmPassword"].map((field) => (
          <div key={field} className="form-group">
            <label>
              {{
                email: "ई-मेल:",
                name: "नाव:",
                mobile: "मोबाईल:",
                password: "पासवर्ड:",
                confirmPassword: "पासवर्ड पुन्हा टाका:"
              }[field]}
            </label>
            <input
              type={["password","confirmPassword"].includes(field) ? "password" : field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
            {errors[field] && <small className="error">{errors[field]}</small>}
            {field === "email" && (
              <button type="button" onClick={handleSendOtp} disabled={!formData.email}>
                Send OTP
              </button>
            )}
          </div>
        ))}
        {/* {otpSent && ( */}
          <div className="otp-section">
            <label>Enter OTP:</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  maxLength="1"
                  value={digit}
                  onChange={e => handleOtpChange(e, idx)}
                  ref={el => (otpRefs.current[idx] = el)}
                  style={{ width: 40, height: 40, textAlign: "center" }}
                />
              ))}
            </div>
          </div>
        {/* )} */}
        <button type="button" onClick={handleRegister} >
          Register
        </button>
      </div>
    </div>
  );
};

export default AdminRegistration;
