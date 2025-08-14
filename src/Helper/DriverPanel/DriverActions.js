import {
  CREATE_COMPLAINT_REQUEST,
  CREATE_COMPLAINT_SUCCESS,
  CREATE_COMPLAINT_FAIL,
  
} from "./DriverActionType";

import {API} from "../Interceptor"

// Create driver complaint
export const createDriverComplaint = (booking_id, complaintData) => async (dispatch) => {
  dispatch({ type: CREATE_COMPLAINT_REQUEST });
    

  console.log("booking_id, com",booking_id,complaintData)
  try {
    const { data } = await API.post(
      `/driver/driver-booking/${booking_id}/complaint/`,
      complaintData
    );

    dispatch({ type: CREATE_COMPLAINT_SUCCESS, payload: data });
    return { success: true, message: data?.detail || "Complaint submitted successfully" };
  } catch (error) {
    console.log(error);
    const errorMsg = error.response?.data?.detail || error.message;
    dispatch({ type: CREATE_COMPLAINT_FAIL, payload: errorMsg });
    return { success: false, message: errorMsg };
  }
};
