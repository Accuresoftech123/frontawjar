import axios from "axios";
import { baseURL,API } from "../Interceptor";
import {
  CREATE_VEHICLE_TYPE_REQUEST,
  CREATE_VEHICLE_TYPE_SUCCESS,
  CREATE_VEHICLE_TYPE_FAILURE,
  VEHICLE_TYPE_LIST_REQUEST,
  VEHICLE_TYPE_LIST_SUCCESS,
  VEHICLE_TYPE_LIST_FAIL,
   VEHICLE_REGISTER_REQUEST,
  VEHICLE_REGISTER_SUCCESS,
  VEHICLE_REGISTER_FAIL,
   GET_VEHICLE_REQUEST,
  GET_VEHICLE_SUCCESS,
  GET_VEHICLE_FAIL,

   FETCH_BOOKING_HISTORY,
  FETCH_BOOKING_HISTORY_SUCCESS,
  FETCH_BOOKING_HISTORY_FAILURE,
} from "./VendorActionType";
import { toast } from "react-toastify";

//vehicle type
export const createVehicleType = (formData) => async (dispatch) => {
  dispatch({ type: CREATE_VEHICLE_TYPE_REQUEST });

  try {
    const response = await axios.post(
      `${baseURL}/vendor/vehicle-types/`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          // Add auth header if needed
        },
      }
    );
    console.log(response);
    window.alert("Vehicle Type created successfully");
    dispatch({
      type: CREATE_VEHICLE_TYPE_SUCCESS,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_VEHICLE_TYPE_FAILURE,
      payload:
        error.response?.data?.detail || "वाहन प्रकार नोंदवताना त्रुटी आली.",
    });
    window.alert(
      error.response?.data?.detail || "वाहन प्रकार नोंदवताना त्रुटी आली."
    );
  }
};

export const listVehicleTypes = () => async (dispatch) => {
  try {
    dispatch({ type: VEHICLE_TYPE_LIST_REQUEST });

    const response = await axios.get(`${baseURL}/vendor/vehicle-types/`); // replace with your actual endpoint

    dispatch({
      type: VEHICLE_TYPE_LIST_SUCCESS,
      payload: response.data,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
    dispatch({
      type: VEHICLE_TYPE_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


//vehicle

export const registerVehicle = (formData) => async (dispatch) => {
  try {
    dispatch({ type: VEHICLE_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await API.post(`admin-panel/${formData.vendor_id}/add-vehicle/`, formData, config);

    dispatch({
      type: VEHICLE_REGISTER_SUCCESS,
      payload: response.data, // this should be the created vehicle object
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    dispatch({
      type: VEHICLE_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
window.alert(error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message || "vehicle creation failed")
    return { success: false };
  }
};

export const listVehicles = () => async (dispatch) => {
  try {
    dispatch({ type: GET_VEHICLE_REQUEST });

    const response = await axios.get(`${baseURL}/vendor/vehicles-list/`); // replace with your actual endpoint

    dispatch({
      type: GET_VEHICLE_SUCCESS,
      payload: response.data,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_VEHICLE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const fetchBookingHistory = (statuses = ["completed", "cancelled","booked"]) => async (dispatch) => {
  dispatch({ type: FETCH_BOOKING_HISTORY });

  try {
    const params = { status: statuses }; // Axios will serialize ?status=value&status=value
    const res = await API.get("member/member-booking-list/", { params });

    dispatch({
      type: FETCH_BOOKING_HISTORY_SUCCESS,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_BOOKING_HISTORY_FAILURE,
      payload: err.response?.data?.detail || err.message,
    });
  }
};