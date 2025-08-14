import {
  CREATE_COMPLAINT_REQUEST,
  CREATE_COMPLAINT_SUCCESS,
  CREATE_COMPLAINT_FAIL,
  CREATE_DRIVER_USAGE_LOG_REQUEST,
  CREATE_DRIVER_USAGE_LOG_SUCCESS,
  CREATE_DRIVER_USAGE_LOG_FAIL,
  LIST_DRIVER_USAGE_LOG_REQUEST,
  LIST_DRIVER_USAGE_LOG_SUCCESS,
  LIST_DRIVER_USAGE_LOG_FAIL,
  DETAIL_DRIVER_USAGE_LOG_REQUEST,
  DETAIL_DRIVER_USAGE_LOG_SUCCESS,
  DETAIL_DRIVER_USAGE_LOG_FAIL,
  COMPLETE_DRIVER_USAGE_LOG_REQUEST,
  COMPLETE_DRIVER_USAGE_LOG_SUCCESS,
  COMPLETE_DRIVER_USAGE_LOG_FAIL,
  LIST_ALL_BOOKINGS_REQUEST,
  LIST_ALL_BOOKINGS_SUCCESS,
  LIST_ALL_BOOKINGS_FAIL,

  DRIVER_BREAK_REQUEST,
  DRIVER_BREAK_SUCCESS,
  DRIVER_BREAK_FAIL
} from "./DriverActionType";

// Create driver complaint
export const createDriverComplaint = (bookingId, complaintData) => async (dispatch) => {
  dispatch({ type: CREATE_COMPLAINT_REQUEST });

  try {
    const { data } = await API.post(
      `/booking/${bookingId}/complaint/`,
      complaintData
    );

    dispatch({ type: CREATE_COMPLAINT_SUCCESS, payload: data });
    return { success: true, message: data?.detail || "Complaint submitted successfully" };
  } catch (error) {
    const errorMsg = error.response?.data?.detail || error.message;
    dispatch({ type: CREATE_COMPLAINT_FAIL, payload: errorMsg });
    return { success: false, message: errorMsg };
  }
};


// Create driver usage log
export const createDriverUsageLog = (logData) => async (dispatch) => {
  dispatch({ type: CREATE_DRIVER_USAGE_LOG_REQUEST });
  try {
    const { data } = await API.post("/driver-usage-log/create/", logData);
    dispatch({ type: CREATE_DRIVER_USAGE_LOG_SUCCESS, payload: data });
    return { success: true, message: "Usage log created successfully" };
  } catch (error) {
    const errorMsg = error.response?.data?.detail || error.message;
    dispatch({ type: CREATE_DRIVER_USAGE_LOG_FAIL, payload: errorMsg });
    return { success: false, message: errorMsg };
  }
};


// List driver usage logs
export const listDriverUsageLogs = () => async (dispatch) => {
  dispatch({ type: LIST_DRIVER_USAGE_LOG_REQUEST });
  try {
    const { data } = await API.get("/driver-usage-log/");
    dispatch({ type: LIST_DRIVER_USAGE_LOG_SUCCESS, payload: data });
  } catch (error) {
    const errorMsg = error.response?.data?.detail || error.message;
    dispatch({ type: LIST_DRIVER_USAGE_LOG_FAIL, payload: errorMsg });
  }
};


// Driver usage log detail
export const getDriverUsageLogDetail = (id) => async (dispatch) => {
  dispatch({ type: DETAIL_DRIVER_USAGE_LOG_REQUEST });
  try {
    const { data } = await API.get(`/driver-usage-log/${id}/`);
    dispatch({ type: DETAIL_DRIVER_USAGE_LOG_SUCCESS, payload: data });
  } catch (error) {
    const errorMsg = error.response?.data?.detail || error.message;
    dispatch({ type: DETAIL_DRIVER_USAGE_LOG_FAIL, payload: errorMsg });
  }
};


// Complete usage log
export const completeDriverUsageLog = (pk, completeData) => async (dispatch) => {
  dispatch({ type: COMPLETE_DRIVER_USAGE_LOG_REQUEST });
  try {
    const { data } = await API.post(`/driver-usage-log/${pk}/complete/`, completeData);
    dispatch({ type: COMPLETE_DRIVER_USAGE_LOG_SUCCESS, payload: data });
    return { success: true, message: "Usage log completed successfully" };
  } catch (error) {
    const errorMsg = error.response?.data?.detail || error.message;
    dispatch({ type: COMPLETE_DRIVER_USAGE_LOG_FAIL, payload: errorMsg });
    return { success: false, message: errorMsg };
  }
};


// List all bookings for driver
export const listAllBookings = () => async (dispatch) => {
  dispatch({ type: LIST_ALL_BOOKINGS_REQUEST });
  try {
    const { data } = await API.get("/bookings/all/");
    dispatch({ type: LIST_ALL_BOOKINGS_SUCCESS, payload: data });
  } catch (error) {
    const errorMsg = error.response?.data?.detail || error.message;
    dispatch({ type: LIST_ALL_BOOKINGS_FAIL, payload: errorMsg });
  }
};


// Start/end driver break
export const toggleDriverBreak = (breakData) => async (dispatch) => {
  dispatch({ type: DRIVER_BREAK_REQUEST });
  try {
    const { data } = await API.post("/driver/break/", breakData);
    dispatch({ type: DRIVER_BREAK_SUCCESS, payload: data });
    return { success: true, message: "Driver break updated successfully" };
  } catch (error) {
    const errorMsg = error.response?.data?.detail || error.message;
    dispatch({ type: DRIVER_BREAK_FAIL, payload: errorMsg });
    return { success: false, message: errorMsg };
  }
};