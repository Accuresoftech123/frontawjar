import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/SuperUser/SuperUserLogin.css";
import { SULogin } from "../../Helper/Actions";
import { toast } from "react-toastify";

const SuperUserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const superUser = useSelector((state) => state.superuserlogin.superuser);

  const validate = () => {
    const newErrors = {};
    const emailOrPhoneRegex =
      /^([6-9]\d{9}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!formData.email.trim()) {
      newErrors.email = "युजरनेम आवश्यक आहे";
    } else if (!emailOrPhoneRegex.test(formData.email)) {
      newErrors.email = "वैध ईमेल किंवा मोबाईल क्रमांक प्रविष्ट करा";
    }

    if (!formData.password.trim()) {
      newErrors.password = "पासवर्ड आवश्यक आहे";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "पासवर्ड मजबूत असावा (8+ अक्षरे, एक विशेष चिन्ह, एक अंक, एक Capital अक्षर)";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // console.log(formData);
    dispatch(SULogin(formData));
  };
  useEffect(() => {
    if (superUser) {
      toast.success("लॉगिन यशस्वी!");
      navigate("/SuperUserHome");
    }
  }, [superUser, navigate]);

  return (
    <div className="superuser-login-container">
      <div className="superuser-login-card">
        <div className="superuser-login-header">
          <h2>सुपर वापरकर्ता लॉगिन</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="superuser-login-form-group">
            <label>युजर नेम</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ईमेल"
            />
            {errors.email && (
              <p className="superuser-login-error">{errors.email}</p>
            )}
          </div>

          <div className="superuser-login-form-group">
            <label>पासवर्ड</label>
            <div className="superuser-login-password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="पासवर्ड"
                autoComplete="current-password"
              />
              <span
                className="superuser-login-toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.password && (
              <p className="superuser-login-error">{errors.password}</p>
            )}
          </div>

          <button type="submit" className="superuser-login-login-btn">
            लॉगिन करा
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuperUserLogin;
