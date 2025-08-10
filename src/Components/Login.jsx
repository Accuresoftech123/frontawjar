import React, { useState } from "react";
import "../Styles/Login.css";
import { Link, useNavigate, useParams,useLocation } from "react-router-dom";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import logo from "../Assets/logo.png";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import { ALLLogin } from "../Helper/Actions";
import { useDispatch } from "react-redux";

const validateCredentials = (credentials) => {
  const errors = {
    email: "",
    password: "",
  };

  const { email, password } = credentials;
  const trimmedemail = email.trim();
  const trimmedPassword = password.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!trimmedemail) {
    errors.email = "युजर नेम आवश्यक आहे";
  } else if (
    !emailRegex.test(trimmedemail) &&
    !phoneRegex.test(trimmedemail)
  ) {
    errors.email = "कृपया बरोबर ईमेल किंवा मोबाईल क्रमांक प्रविष्ट करा";
  }

  if (!trimmedPassword) {
    errors.password = "पासवर्ड आवश्यक आहे";
  } else if (!strongPasswordRegex.test(trimmedPassword)) {
    errors.password =
      "पासवर्डमध्ये कमीत कमी 8 अक्षरे, एक मोठा, एक लहान, एक अंक व एक विशेष चिन्ह असणे आवश्यक आहे";
  }

  return errors;
};

const Login = () => {
  const { role } = useParams(); // Get role from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminLoginPage = location.pathname === "/Login/Admin";
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({
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

 const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validateCredentials(credentials);
  setErrors(validationErrors);

  const hasErrors = Object.values(validationErrors).some((msg) => msg !== "");
  if (hasErrors) return;

  const loginPayload = {
    email: credentials.email,
    password: credentials.password,
    role: role.toLowerCase(),
  };
console.log(loginPayload);

  const result = await dispatch(ALLLogin(loginPayload)); // ✅ use result

  if (result.success) {
    alert("Login Successfully!"); // ✅ show success
    navigate(`/${role}/Dashboard`);
  } else {
    alert(result.error); // ✅ show actual backend error
  }
};


  const roleTitle = {
    Admin: "ऍडमिन",
    Member: "सभासद",
    Vendor: "विक्रेता",
    Operator: "ऑपरेटर",
    GatAdhikari: "गट अधिकारी",
  };

  return (
    <div className="Login__container">
      {/* Header */}
      <header className="Login__header">
        <div className="Login__logoContainer">
          <img src={logo} alt="logo" />
        </div>
        <nav className="Login__navLinks">
          <Link to="/" className="homepage-nav-link">
            होम
          </Link>
          {isAdminLoginPage && (
          <Link
            to="/Login/Admin"
            className={`homepage-nav-link ${role === "Admin" ? "active" : ""}`}
          >
            ऍडमिन
          </Link>
        )}
          <Link
            to="/User"
            className="homepage-nav-link"
          >
            वापरकर्ता
          </Link>
        </nav>
      </header>

      {/* Main Login Form */}
      <main className="Login__main">
        <div className="Login__card">
          <h3>{roleTitle[role] || "लॉगिन"} लॉगिन</h3>

          <form className="Login__form" onSubmit={handleSubmit} noValidate>
            {/* email */}
            <div className="Login__formGroup">
              <label htmlFor="email">युजर नेम</label>
              <div className="Login__inputWrapper">
                <LocalPostOfficeIcon className="Login__inputIcon" />
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="Login__input"
                  placeholder="ई-मेल प्रविष्ट करा"
                  required
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="Login__error">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="Login__formGroup">
              <label htmlFor="password">पासवर्ड</label>
              <div className="Login__inputWrapper">
                <LockIcon className="Login__inputIcon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="Login__input"
                  placeholder="पासवर्ड प्रविष्ट करा"
                  required
                  autoComplete="password"
                />
                <span
                  className="Login__togglePassword"
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
                <p className="Login__error">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="Login__forgotWrapper">
              <Link
                to={`/Forgot-Password/${role}`}
                className="Login__forgotLink"
              >
                पासवर्ड विसरलात?
              </Link>
            </div>

            {/* Submit */}
            <button type="submit" className="Login__btnPrimary">
              लॉग इन करा
            </button>
            {["Member", "Vendor", "Operator"].includes(role) && (
              <p className="Login-register">
                खाते नाही का?{" "}
                <Link to={`/Registration/${role}`} className="Login-active">
                  नोंदणी करा
                </Link>
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
