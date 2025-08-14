import { API, baseURL } from "../Interceptor";
import  axios from "axios";
import {
     // District
  GET_DISTRICTS_REQUEST, GET_DISTRICTS_SUCCESS, GET_DISTRICTS_FAIL,
  CREATE_DISTRICT_REQUEST, CREATE_DISTRICT_SUCCESS, CREATE_DISTRICT_FAIL,
  UPDATE_DISTRICT_REQUEST, UPDATE_DISTRICT_SUCCESS, UPDATE_DISTRICT_FAIL,
  DELETE_DISTRICT_REQUEST, DELETE_DISTRICT_SUCCESS, DELETE_DISTRICT_FAIL,
  
  // Taluka
  GET_TALUKAS_REQUEST, GET_TALUKAS_SUCCESS, GET_TALUKAS_FAIL,
  CREATE_TALUKA_REQUEST, CREATE_TALUKA_SUCCESS, CREATE_TALUKA_FAIL,
  UPDATE_TALUKA_REQUEST, UPDATE_TALUKA_SUCCESS, UPDATE_TALUKA_FAIL,
  DELETE_TALUKA_REQUEST, DELETE_TALUKA_SUCCESS, DELETE_TALUKA_FAIL,

  // Village
  GET_VILLAGES_REQUEST, GET_VILLAGES_SUCCESS, GET_VILLAGES_FAIL,
  CREATE_VILLAGE_REQUEST, CREATE_VILLAGE_SUCCESS, CREATE_VILLAGE_FAIL,
  UPDATE_VILLAGE_REQUEST, UPDATE_VILLAGE_SUCCESS, UPDATE_VILLAGE_FAIL,
  DELETE_VILLAGE_REQUEST, DELETE_VILLAGE_SUCCESS, DELETE_VILLAGE_FAIL,

  //approve users
  FETCH_PENDING_USERS_REQUEST, FETCH_PENDING_USERS_SUCCESS, FETCH_PENDING_USERS_FAILURE,
  UPDATE_USER_STATUS_REQUEST, UPDATE_USER_STATUS_SUCCESS, UPDATE_USER_STATUS_FAILURE,

  //user list
   ROLE_LIST_REQUEST, ROLE_LIST_SUCCESS, ROLE_LIST_FAIL,

   //driver filter list
   FILTER_DRIVERS_REQUEST,
  FILTER_DRIVERS_SUCCESS,
  FILTER_DRIVERS_FAIL,

   //member filter list
  FILTER_MEMBER_REQUEST,
  FILTER_MEMBER_SUCCESS,
  FILTER_MEMBER_FAIL,

   FILTER_VEHICLES_REQUEST,
  FILTER_VEHICLES_SUCCESS,
  FILTER_VEHICLES_FAIL,

  //booking
   BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
   ASSIGN_VEHICLE_REQUEST,
  ASSIGN_VEHICLE_SUCCESS,
  ASSIGN_VEHICLE_FAIL,
  ASSIGN_DRIVER_REQUEST,
  ASSIGN_DRIVER_SUCCESS,
  ASSIGN_DRIVER_FAIL,
   FETCH_BOOKINGS_REQUEST,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_BOOKINGS_FAIL,

   FETCH_GAT_ADHIKARI_REQUEST,
  FETCH_GAT_ADHIKARI_SUCCESS,
  FETCH_GAT_ADHIKARI_FAILURE,
  ASSIGN_GAT_ADHIKARI_REQUEST,
  ASSIGN_GAT_ADHIKARI_SUCCESS,
  ASSIGN_GAT_ADHIKARI_FAILURE,

} from './AdminActionType';

//district actions
export const getDistricts = () => async (dispatch) => {
  dispatch({ type: GET_DISTRICTS_REQUEST });

  try {
    const res = await axios.get(`${baseURL}/admin-panel/list/districts/`);
    console.log(res);
    dispatch({
      type: GET_DISTRICTS_SUCCESS,
      payload: res.data, 
    });
  } catch (error) {
    dispatch({
      type: GET_DISTRICTS_FAIL,
      payload: error.response?.data?.detail || error.message || "Failed to load districts",
    });
  }
};

export const createDistrict = (userData) => async (dispatch) => {
  dispatch({ type: CREATE_DISTRICT_REQUEST });

  try {
    const FormDataToSend = new FormData();
    for (const key in userData) {
      if (userData[key] !== null && userData[key] !== undefined) {
        FormDataToSend.append(key, userData[key]);
      }
    }

    const response = await API.post('admin-panel/districts/', FormDataToSend); // No need to set Content-Type

    dispatch({ type: CREATE_DISTRICT_SUCCESS, payload: response.data });
    window.alert("District created successfully!");
  } catch (error) {
    console.error("District Creation Error:", error);
    dispatch({
      type: CREATE_DISTRICT_FAIL,
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

export const updateDistrict = (id, userData) => async (dispatch) => {
   dispatch({ type: UPDATE_DISTRICT_REQUEST });

  try {
    const FormDataToSend = new FormData();
    for (const key in userData) {
      if (userData[key] !== null && userData[key] !== undefined) {
        FormDataToSend.append(key, userData[key]);
      }
    }

    const response = await API.put(`admin-panel/districts/${id}/`, FormDataToSend);

    dispatch({ type: UPDATE_DISTRICT_SUCCESS, payload: response.data });
    window.alert("District Updated successfully!");
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_DISTRICT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    window.alert(error.response?.data?.name || error.message);
  }
};

export const deleteDistrict = (id) => async (dispatch) => {
  dispatch({ type: DELETE_DISTRICT_REQUEST });

  try {
    const response = await API.delete(`admin-panel/districts/${id}/`);
    dispatch({
      type: DELETE_DISTRICT_SUCCESS,
      payload: id,
    });
    console.log(response);
    window.alert("district deleted successfully")
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_DISTRICT_FAIL,
      payload: error.message,
    });
    window.alert(error.response?.data?.name || error.message);
  }
};


// Taluka Actions
export const getTalukas = () => async (dispatch) => {
  dispatch({ type: GET_TALUKAS_REQUEST });

  try {
    const res = await axios.get(`${baseURL}/admin-panel/list/talukas/`);
    dispatch({
      type: GET_TALUKAS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TALUKAS_FAIL,
      payload: error.response?.data?.detail || error.message || "Failed to load talukas",
    });
  }
};

export const createTaluka = (talukaData) => async (dispatch) => {
  dispatch({ type: CREATE_TALUKA_REQUEST });

  try {
    const FormDataToSend = new FormData();
    for (const key in talukaData) {
      if (talukaData[key] !== null && talukaData[key] !== undefined) {
        FormDataToSend.append(key, talukaData[key]);
      }
    }

    const response = await API.post('admin-panel/talukas/', FormDataToSend);

    dispatch({ type: CREATE_TALUKA_SUCCESS, payload: response.data });
    window.alert("Taluka created successfully!");
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_TALUKA_FAIL,
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

export const updateTaluka = (id, talukaData) => async (dispatch) => {
   dispatch({ type: UPDATE_TALUKA_REQUEST });

  try {
    const FormDataToSend = new FormData();
    for (const key in talukaData) {
      if (talukaData[key] !== null && talukaData[key] !== undefined) {
        FormDataToSend.append(key, talukaData[key]);
      }
    }

    const response = await API.put(`admin-panel/talukas/${id}/`, FormDataToSend);

    dispatch({ type: UPDATE_TALUKA_SUCCESS, payload: response.data });
    dispatch(getTalukas());
    window.alert("Taluka Updated successfully!");
  } catch (error) {
    dispatch({
      type: UPDATE_TALUKA_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    window.alert("Taluka Updation failed");
  }
};

export const deleteTaluka = (id) => async (dispatch) => {
  dispatch({ type: DELETE_TALUKA_REQUEST });

  try {
    await API.delete(`admin-panel/talukas/${id}/`, { method: "DELETE" });

    dispatch({ type: DELETE_TALUKA_SUCCESS, payload: id });
    window.alert("Taluka deleted successfully");
  } catch (error) {
    dispatch({
      type: DELETE_TALUKA_FAIL,
      payload: error.message,
    });
    window.alert("Taluka deleted failed");
  }
};


// Village Actions
export const getVillages = () => async (dispatch) => {
  dispatch({ type: GET_VILLAGES_REQUEST });

  try {
    const res = await axios.get(`${baseURL}/admin-panel/list/villages/`);
   
    dispatch({
      type: GET_VILLAGES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_VILLAGES_FAIL,
      payload: error.response?.data?.detail || error.message || "Failed to load villages",
    });
  }
};

export const createVillage = (villageData) => async (dispatch) => {
  dispatch({ type: CREATE_VILLAGE_REQUEST });

  try {
    const FormDataToSend = new FormData();
    for (const key in villageData) {
      if (villageData[key] !== null && villageData[key] !== undefined) {
        FormDataToSend.append(key, villageData[key]);
      }
    }

    const response = await API.post('admin-panel/villages/', FormDataToSend);

    dispatch({ type: CREATE_VILLAGE_SUCCESS, payload: response.data });
    window.alert("Village created successfully!");
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_VILLAGE_FAIL,
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

export const updateVillage = (id, villageData) => async (dispatch) => {
   dispatch({ type: UPDATE_VILLAGE_REQUEST });

  try {
    const FormDataToSend = new FormData();
    for (const key in villageData) {
      if (villageData[key] !== null && villageData[key] !== undefined) {
        FormDataToSend.append(key, villageData[key]);
      }
    }

    const response = await API.put(`admin-panel/villages/${id}/`, FormDataToSend);

    dispatch({ type: UPDATE_VILLAGE_SUCCESS, payload: response.data });
    dispatch(getVillages());
    window.alert("Village Updated successfully!");
  } catch (error) {
    dispatch({
      type: UPDATE_VILLAGE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    window.alert("Village Updation failed");
  }
};

export const deleteVillage = (id) => async (dispatch) => {
  dispatch({ type: DELETE_VILLAGE_REQUEST });

  try {
    await API.delete(`admin-panel/villages/${id}/`, { method: "DELETE" });

    dispatch({ type: DELETE_VILLAGE_SUCCESS, payload: id });
    window.alert("Village deleted successfully");
  } catch (error) {
    dispatch({
      type: DELETE_VILLAGE_FAIL,
      payload: error.message,
    });
    window.alert("village deleted failed");
  }
};

// Fetch pending users for given role
export const fetchPendingUsers = (role) => async (dispatch) => {
  dispatch({ type: FETCH_PENDING_USERS_REQUEST });

 try {
    const res = await API.get(`admin-panel/${role}/pending/`);
    dispatch({
      type: FETCH_PENDING_USERS_SUCCESS,
      payload: res.data,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_PENDING_USERS_FAILURE,
      payload: error.response?.data?.detail || error.message || "Failed to load pending users",
    });
  }
};

// Update user status (approve/reject)
export const updateUserStatus = (role, userId, status) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_STATUS_REQUEST });
try {
    const response = await API.patch(`admin-panel/${role}/${userId}/status/`, {status});
  console.log(response);
  console.log(role, userId, status);
    dispatch({ type: UPDATE_USER_STATUS_SUCCESS, payload: { userId, status } });
    dispatch(fetchPendingUsers(role));
    window.alert("Status Updated successfully!");
  } catch (error) {
    dispatch({
      type: UPDATE_USER_STATUS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    window.alert("Status Updation failed");
  }
};

//user list

export const getRoleList = (role) => async (dispatch) => {
  try {
    dispatch({ type: ROLE_LIST_REQUEST });

    const response = await API.get(`admin-panel/${role}/`);
    dispatch({
      type: ROLE_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ROLE_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const filterDriversByLocation = (district, taluka, village) => async (dispatch, getState) => {
 dispatch({ type: FILTER_DRIVERS_REQUEST });
  const data = {
    district:district,
    taluka:taluka,
    village:village
  }
  try {
    const res = await API.get(`admin-panel/drivers/filter/`, { params: data });
   console.log("driver",res);
    dispatch({
      type: FILTER_DRIVERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FILTER_DRIVERS_FAIL,
      payload: error.response?.data?.detail || error.message || "Failed to load villages",
    });
  }
};


export const filterMembersByLocation = (district, taluka, village) => async (dispatch, getState) => {
 dispatch({ type: FILTER_MEMBER_REQUEST });
  const data = {
    district:district,
    taluka:taluka,
    village:village
  }
  try {
    const res = await API.get(`admin-panel/member/filter/`,data);
   console.log(res);
    dispatch({
      type: FILTER_MEMBER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FILTER_MEMBER_FAIL,
      payload: error.response?.data?.detail || error.message || "Failed to load villages",
    });
  }
};


export const filterVehiclesByLocation = (district, taluka, village) => async (dispatch) => {
  dispatch({ type: FILTER_VEHICLES_REQUEST });
  try {
    const res = await API.get('admin-panel/vehicles/filter/', {
      params: { district, taluka, village }
    });
    dispatch({
      type: FILTER_VEHICLES_SUCCESS,
      payload: res.data,
    });
    console.log(res,"vehicle");
  } catch (error) {
    dispatch({
      type: FILTER_VEHICLES_FAIL,
      payload: error.response?.data?.detail || error.message || "Failed to load vehicles",
    });
  }
};

export const createBooking = (bookingData) => async (dispatch) => {
  dispatch({ type: BOOKING_CREATE_REQUEST });

  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await API.post('admin-panel/bookings/create/', bookingData, config);

    dispatch({
      type: BOOKING_CREATE_SUCCESS,
      payload: response.data,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error)
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload: error.response && error.response.data ? error.response.data : error.message,
    });
  }
};
// Assign Vehicle to Booking
export const assignVehicle = ({ bookingId, vehicleId }) => async (dispatch) => {
  try {
    dispatch({ type: ASSIGN_VEHICLE_REQUEST });

    const response = await API.post(
      `admin-panel/bookings/${bookingId}/assign-vehicle/`,
      { vehicle_id: vehicleId }
    );

    dispatch({
      type: ASSIGN_VEHICLE_SUCCESS,
      payload: response.data,
    });
console.log(response);
// window.alert(response.data.message);
    return response.data;
  } catch (error) {
    console.log(error);
    dispatch({
      type: ASSIGN_VEHICLE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
    throw error;
  }
};

// Assign Driver to Booking
export const assignDriver = ({ bookingId, driverId }) => async (dispatch) => {
  try {
    dispatch({ type: ASSIGN_DRIVER_REQUEST });

    const response = await API.post(
      `admin-panel/bookings/${bookingId}/assign-driver/`,
      { driver_id: driverId }
    );
console.log()
    dispatch({
      type: ASSIGN_DRIVER_SUCCESS,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    dispatch({
      type: ASSIGN_DRIVER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
    throw error;
  }
};

export const fetchBookings = () => async (dispatch) => {
  dispatch({ type: FETCH_BOOKINGS_REQUEST });
  try {
    const response = await API.get(`admin-panel/vehicle-bookings/`); // Adjust endpoint as needed
    dispatch({
      type: FETCH_BOOKINGS_SUCCESS,
      payload: response.data,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_BOOKINGS_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.detail || error.response.data.message
          : error.message,
    });
  }
};

// Fetch Gat Adhikari list
export const fetchGatAdhikari = () => async (dispatch) => {
  dispatch({ type: FETCH_GAT_ADHIKARI_REQUEST });
  try {
    const response = await API.get('admin-panel/list/gat-adhikaris/'); // Adjust baseURL if needed
    dispatch({
      type: FETCH_GAT_ADHIKARI_SUCCESS,
      payload: response.data,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_GAT_ADHIKARI_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

// Assign or unassign Gat Adhikari status for a member
export const assignGatAdhikari = (memberId, isGatAdhikari) => async (dispatch) => {
  dispatch({ type: ASSIGN_GAT_ADHIKARI_REQUEST });
  try {
    const response = await API.patch(`admin-panel/members/${memberId}/gat-adhikari/`, {
      is_gat_adhikari: isGatAdhikari,
    });
    dispatch({
      type: ASSIGN_GAT_ADHIKARI_SUCCESS,
      payload: { memberId, isGatAdhikari },
    });
    window.alert("GatAdhikari Selection Successfully done!");
    console.log(response);
  } catch (error) {
    console.log(error);
    dispatch({
      type: ASSIGN_GAT_ADHIKARI_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};