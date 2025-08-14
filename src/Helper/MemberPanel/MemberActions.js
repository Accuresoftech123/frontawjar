import axios from 'axios';
import {
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,

// create complaint member
  CREATE_COMPLAINT_REQUEST,
  CREATE_COMPLAINT_SUCCESS,
  CREATE_COMPLAINT_FAIL,
} from './MemberActionType';
import { baseURL, API } from '../Interceptor';

// Fetch booking list
export const listBookings = () => async (dispatch) => {
  try {
    dispatch({ type: BOOKING_LIST_REQUEST });

    const response = await API.get(`member/member-booking-list/`);
    console.log(response,"bookings");

    dispatch({ type: BOOKING_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    const message = error.response?.data?.detail || error.message;
    dispatch({
      type: BOOKING_LIST_FAIL,
      payload: message
    });
    window.alert(message);
  }
};

// Create booking
export const createBooking = (bookingData) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_CREATE_REQUEST });

    const response = await API.post(
      'member/bookings/',
      bookingData
    );
console.log(response);
    dispatch({ type: BOOKING_CREATE_SUCCESS, payload: response.data });
  } catch (error) {
    const message = error.response?.data?.detail || error.message;
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload: message
    });
    window.alert(message);
  }
};


// Create member complaint
export const createMemberComplaint = (booking_id, complaintData) => async (dispatch) => {
  dispatch({ type: CREATE_COMPLAINT_REQUEST });
    

  console.log("booking_id, com",booking_id,complaintData)
  try {
    const { data } = await API.post(
      `member/member-bookings/${booking_id}/member-complaint/`,
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

