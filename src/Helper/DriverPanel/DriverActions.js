import {
  CREATE_COMPLAINT_REQUEST,
  CREATE_COMPLAINT_SUCCESS,
  CREATE_COMPLAINT_FAIL,
  
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
