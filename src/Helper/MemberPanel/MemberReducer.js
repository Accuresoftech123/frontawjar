import {
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,

  // member complaint
  CREATE_COMPLAINT_REQUEST,
  CREATE_COMPLAINT_SUCCESS,
  CREATE_COMPLAINT_FAIL,
} from './MemberActionType';

const bookingInitialState = {
  bookings: [],
  booking: null,
  loading: false,
  error: null,
};

export const bookingmemberReducer = (state = bookingInitialState, action) => {
  switch (action.type) {
    case BOOKING_LIST_REQUEST:
    case BOOKING_CREATE_REQUEST:
      return { ...state, loading: true, error: null };

    case BOOKING_LIST_SUCCESS:
      return { ...state, loading: false, bookings: action.payload };

    case BOOKING_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        booking: action.payload,
        bookings: [action.payload, ...state.bookings],
      };

    case BOOKING_LIST_FAIL:
    case BOOKING_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error:
          typeof action.payload === "string"
            ? action.payload
            : JSON.stringify(action.payload),
      };

    default:
      return state;
  }
};

const complaintInitialState = {
  complaints: [],
  loading: false,
  error: null,
  success: false,
};

export const complaintMemberReducer = (state = complaintInitialState, action) => {
  switch (action.type) {
    case CREATE_COMPLAINT_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_COMPLAINT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        complaints: [...state.complaints, action.payload],
      };

    case CREATE_COMPLAINT_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};