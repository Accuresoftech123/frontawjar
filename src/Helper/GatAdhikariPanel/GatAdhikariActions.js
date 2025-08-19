import { baseURL,API } from "../Interceptor"; // axios interceptor
import {
  FETCH_GA_MEMBERS_REQUEST,
  FETCH_GA_MEMBERS_SUCCESS,
  FETCH_GA_MEMBERS_FAILURE,
  FETCH_GA_MEMBER_BOOKINGS_REQUEST,
  FETCH_GA_MEMBER_BOOKINGS_SUCCESS,
  FETCH_GA_MEMBER_BOOKINGS_FAILURE,
} from "./GatAdhikariActionType";

// 🔹 Fetch GatAdhikari Members
export const fetchGAMembers = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_GA_MEMBERS_REQUEST });
    const village = "karad";
    const response = await API.get("member/gat-adhikari/members/", village);
    dispatch({
      type: FETCH_GA_MEMBERS_SUCCESS,
      payload: response.data,
    });
    console.log(response);
  } catch (error) {
    dispatch({
      type: FETCH_GA_MEMBERS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// 🔹 Fetch GatAdhikari Members Bookings
export const fetchGAMemberBookings = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_GA_MEMBER_BOOKINGS_REQUEST });

    const response = await API.get("member/gat-adhikari/members/bookings/");
    dispatch({
      type: FETCH_GA_MEMBER_BOOKINGS_SUCCESS,
      payload: response.data,
    });
    console.log(response);
  } catch (error) {
    dispatch({
      type: FETCH_GA_MEMBER_BOOKINGS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
