import axios from 'axios';
import {
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL
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
