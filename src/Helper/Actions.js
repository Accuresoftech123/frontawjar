import { API, baseURL } from "./Interceptor";
import axios from "axios";
import {
  // Auth-related
  SULOGIN_REQUEST,
  SULOGIN_SUCCESS,
  SULOGIN_FAILED,
  SULOGOUT,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,

  ADMINREGISTER_REQUEST,
  ADMINREGISTER_SUCCESS,
  ADMINREGISTER_FAILURE,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  //verify email
  CHECK_EMAIL_REQUEST,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_FAILURE,

  USER_CHECK_EMAIL_REQUEST,
  USER_CHECK_EMAIL_SUCCESS,
  USER_CHECK_EMAIL_FAILURE,
  
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,

  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,

  GET_USER_COUNT_REQUEST,
  GET_USER_COUNT_SUCCESS,
  GET_USER_COUNT_FAIL,

  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,

  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "./ActionType";
import { toast } from "react-toastify";

// login for super user
export const SULogin = (credentials) => async (dispatch) => {
  dispatch({ type: SULOGIN_REQUEST });

  try {
    const FormDataToSend = new FormData();

    for (const key in credentials) {
      if (credentials[key] !== null && credentials[key] !== undefined) {
        FormDataToSend.append(key, credentials[key]);
      }
    }

    const response = await axios.post(
      `${baseURL}/users/superuser/login/`,
      FormDataToSend,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log("login response", response);
    localStorage.setItem("accessToken", response.data.access);
    dispatch({ type: SULOGIN_SUCCESS, payload: response.data });
    window.alert(`Login Successfully!`);
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    dispatch({
      type: SULOGIN_FAILED,
      payload: error.response?.data?.message || error.message,
    });
    window.alert("Login Failed");
  }
};

// logout
export const SULogout = () => (dispatch) => {
  window.alert("Logged out successfully!");
  localStorage.removeItem("accessToken");
  sessionStorage.clear();

  dispatch({ type: SULOGOUT });
};

// admin check email
export const checkEmail = (userData) => async (dispatch) => {
  dispatch({ type: CHECK_EMAIL_REQUEST });

  try {
    const FormDataToSend = new FormData();
    for (const key in userData) {
      if (userData[key] !== null && userData[key] !== undefined) {
        FormDataToSend.append(key, userData[key]);
      }
    }

    const response = await API.post(`users/register/admin/`, FormDataToSend);
    dispatch({ type: CHECK_EMAIL_SUCCESS, payload: response.data });

    // Return success message to component
    return { success: true, message: response.data?.message || "OTP sent successfully!" };

  } catch (err) {
    console.log(err);
    const errorMessage = err.response?.data?.error || err.message;
    toast(errorMessage);
    dispatch({ type: CHECK_EMAIL_FAILURE, payload: errorMessage });

    // Return error message to component
    return { success: false, message: errorMessage };
  }
};

// admin registration
export const registerAdmin = (userData) => async (dispatch) => {
  dispatch({ type: ADMINREGISTER_REQUEST });

  try {
    const FormDataToSend = new FormData();
    for (const key in userData) {
      if (userData[key] !== null && userData[key] !== undefined) {
        FormDataToSend.append(key, userData[key]);
      }
    }

    const response = await axios.post(
      `${baseURL}/users/register/admin/set-password/`,
      FormDataToSend,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    dispatch({ type: ADMINREGISTER_SUCCESS, payload: response.data });

    // ✅ Return success to component
    return { success: true, message: response.data?.message || "Registered successfully!" };

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("Registration Error:", error.response?.data || error.message);

    dispatch({ type: ADMINREGISTER_FAILURE, payload: errorMessage });

    // ✅ Return error to component
    return { success: false, message: errorMessage };
  }
};

// login for admin and all other users
export const ALLLogin = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const FormDataToSend = new FormData();

    for (const key in credentials) {
      if (credentials[key] !== null && credentials[key] !== undefined) {
        FormDataToSend.append(key, credentials[key]);
      }
    }

    const response = await axios.post(
      `${baseURL}/users/login/`,
      FormDataToSend,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
     console.log("logingData",response.data)
    localStorage.setItem("accessToken", response.data.access);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });

    return { success: true }; // ✅ RETURN success
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAILED,
      payload: error.response?.data?.message || error.message,
    });

    return {
      success: false,
      error: error.response?.data?.message || "Login failed", // ✅ RETURN failure
    };
  }
};

// logout
export const Logout = () => (dispatch) => {
  // Clear localStorage/sessionStorage if token was stored

  localStorage.removeItem("accessToken"); // Adjust key if needed
  sessionStorage.clear(); // Optional

  dispatch({ type: LOGOUT }); // or USERLOGOUT

  window.alert("Logged out successfully!");
  window.location.href = "/"; // Or use navigate() if using React Router
};

// User registration
export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const FormDataToSend = new FormData();

    for (const key in userData) {
      if (userData[key] !== null && userData[key] !== undefined) {
        FormDataToSend.append(key, userData[key]);
      }
    }

    const response = await axios.post(
      `${baseURL}/users/register/complete/`,
      FormDataToSend,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    alert("Registered Successfully!");
    window.location.reload();
  } catch (error) {
    console.error("Registration Error:", error);
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
     let errMsg = "Something went wrong";

  if (error.response && error.response.data) {
    const data = error.response.data;

    // If it's an object with keys and array of messages per key
    if (typeof data === "object") {
      // Collect all messages in an array
      const messages = [];

      for (const key in data) {
        if (Array.isArray(data[key])) {
          messages.push(...data[key]);
        } else if (typeof data[key] === "string") {
          messages.push(data[key]);
        }
      }

      if (messages.length > 0) {
        errMsg = messages.join("\n"); // Join multiple messages by newline
      }
    } else if (typeof data === "string") {
      errMsg = data;
    }
  } else if (error.message) {
    errMsg = error.message;
  }

  alert(errMsg);
  }
};

//verify otp users
export const verifyUserOtp = (userData) => async (dispatch) => {
  dispatch({ type: VERIFY_OTP_REQUEST });

  try {
    const FormDataToSend = new FormData();
    for (const key in userData) {
      if (userData[key] !== null && userData[key] !== undefined) {
        FormDataToSend.append(key, userData[key]);
      }
    }

    const res = await axios.post(`${baseURL}/users/register/verify-otp/`, FormDataToSend);

    dispatch({ type: VERIFY_OTP_SUCCESS, payload: res.data });

    return { success: true, message: res.data?.message || "OTP verified successfully" };
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message;
    dispatch({ type: VERIFY_OTP_FAILURE, payload: errorMessage });

    return { success: false, message: errorMessage };
  }
};


// user check email
export const userCheckEmail = (userData) => async (dispatch) => {
  dispatch({ type: USER_CHECK_EMAIL_REQUEST });

  try {
    const FormDataToSend = new FormData();
    for (const key in userData) {
      if (userData[key] !== null && userData[key] !== undefined) {
        FormDataToSend.append(key, userData[key]);
      }
    }

    const response = await axios.post(`${baseURL}/users/register/check-email/`, FormDataToSend);
    dispatch({ type: USER_CHECK_EMAIL_SUCCESS, payload: response.data });

    // Return success message to component
    return { success: true, message: response.data?.message || "OTP sent successfully!" };

  } catch (err) {
    console.log(err);
    const errorMessage = err.response?.data?.error || err.message;
    dispatch({ type: USER_CHECK_EMAIL_FAILURE, payload: errorMessage });

    // Return error message to component
    return { success: false, message: errorMessage };
  }
};

