import React, { useEffect, useState, useRef } from "react";
import "../Styles/EmailVerification.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../Helper/Interceptor"; // Import your axios instance
import { toast } from "react-toastify";
import { userCheckEmail, verifyUserOtp } from "../Helper/Actions";
import { useDispatch } from "react-redux";

const EmailVerificationPopup = ({ email,role, onVerify }) => {
  const [otp, setOtp] = useState(new Array(6).fill("")); // OTP as 6 digits
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const intervalRef = useRef(null);
  const inputRefs = useRef([]); // Refs for input focus
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const [loading, setLoading] = useState(false);


// Start countdown when component mounts
 useEffect(() => {
  startCountdown(); // only starts timer
}, []);

  // Function to start 30-second resend countdown
 const startCountdown = () => {
  clearInterval(intervalRef.current);
  setResendDisabled(true);
  setTimer(30);

  intervalRef.current = setInterval(() => {
    setTimer((prev) => {
      if (prev <= 1) {
        clearInterval(intervalRef.current);
        setResendDisabled(false);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};
//resend otp funtion 
const handleResendOtp = async () => {
  setLoading(true);
  const payload = { email, role };
  const response = await dispatch(userCheckEmail(payload));
  setLoading(false);

  if (response.success) {
    toast.success(response.message);
    startCountdown();
  } else {
    toast.error(response.message);
  }
};

  // Handle OTP input and auto-focus
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Only digits
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Move back on backspace
    if (!value && index > 0 && e.nativeEvent.inputType === "deleteContentBackward") {
      inputRefs.current[index - 1].focus();
    }
  };

  // Verify OTP with server
const verifyOtp = async () => {
  const otpValue = otp.join("");

  if (otpValue.length !== 6) {
    toast.warning("Please enter a 6-digit OTP.");
    return;
  }

  const loadingToastId = toast.loading("Verifying OTP...");
   let backendRole = role.toLowerCase();
  if (backendRole === "operator") backendRole = "driver";
  const payload = { 
    email:email,
    role:backendRole, 
    otp: otpValue };
  const response = await dispatch(verifyUserOtp(payload));
  toast.dismiss(loadingToastId);
console.log(payload);
console.log(response);
  if (response.success) {
    toast.success(response.message);
    onVerify();
  } else {
    toast.error(response.message);
  }
};





  return (
    <div className="email-verification-backdrop">
    <div className="email-verification-popup">
      <div className="email-verification-container">
        <h3>Verify Your Email ID</h3>
        <p>
          We've sent a 6-digit OTP to <b>{email}</b>. Please enter the code below.
        </p>

        <div className="email-verification-otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              maxLength="1"
              className="email-verification-otp-input"
            />
          ))}
        </div>

        <button
          onClick={verifyOtp}
          className="email-verification-verify-button"
          disabled={otp.join("").length !== 6}
        >
          Verify
        </button>

        <div className="email-verification-resend-otp">
          <span>Didn't receive the email?</span>
          <button onClick={handleResendOtp} disabled={resendDisabled || loading}>
            {loading ? "Sending..." : `Resend OTP ${resendDisabled ? `in ${timer}s` : ""}`}
          </button>

        </div>
      </div>
    </div>
    </div>
  );
};

export default EmailVerificationPopup;
