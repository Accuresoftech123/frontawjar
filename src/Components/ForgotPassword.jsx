import React, { useState } from "react";
import "../Styles/ForgotPassword.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import logo from "../Assets/logo.png";
import { useDispatch } from "react-redux";
// import { sendForgotPasswordLink } from "../Helper/Actions";

const validateForgotPassword = (formData) => {
  const errors = {
    email: "",
    role: "",
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.email.trim()) {
    errors.email = "ईमेल आवश्यक आहे.";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "कृपया वैध ईमेल प्रविष्ट करा.";
  }

  return errors;
};

const ForgotPassword = () => {
  const { role } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    role: role,
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForgotPassword(formData);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some((msg) => msg !== "");
    if (!hasErrors) {
      //   dispatch(sendForgotPasswordLink({ email: formData.email }));
      console.log("Reset link sent to:", formData);
    }
  };

  return (
    <div className="forgotPassword__container">
      {/* Header */}
      <header className="forgotPassword__header">
        <div className="forgotPassword__logoContainer">
          <img src={logo} alt="logo" />
        </div>
        <nav className="forgotPassword__navLinks">
          <Link to="/" className="forgotPassword__navLink">
            होम
          </Link>
          {/* <Link to={`/Login/${role}`} className="forgotPassword__navLink">
            लॉग इन करा
          </Link> */}
        </nav>
      </header>

      {/* Main Form */}
      <main className="forgotPassword__main">
        <div className="forgotPassword__card">
          <h3>पासवर्ड विसरलात?</h3>

          <form
            className="forgotPassword__form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Email */}
            <div className="forgotPassword__formGroup">
              <label htmlFor="email">ई-मेल</label>
              <div className="forgotPassword__inputWrapper">
                <LocalPostOfficeIcon className="forgotPassword__inputIcon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="forgotPassword__input"
                  placeholder="ई-मेल प्रविष्ट करा"
                  required
                />
              </div>
              {errors.email && (
                <p className="forgotPassword__error">{errors.email}</p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="forgotPassword__btnPrimary">
              रिसेट लिंक पाठवा
            </button>
            <p className="forgotPassword-register">
              परत जा ?{" "}
              <Link to={`/Login/${role}`} className="forgotPassword-active">
                लॉग इन करा
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
