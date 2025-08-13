import {
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL
} from './MemberActionType';

const initialState = {
  bookings: [],
  booking: null,
  loading: false,
  error: null
};

export const bookingmemberReducer = (state = initialState, action) => {
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
        bookings: [action.payload, ...state.bookings]
      };

    case BOOKING_LIST_FAIL:
    case BOOKING_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: typeof action.payload === 'string'
          ? action.payload
          : JSON.stringify(action.payload)
      };

    default:
      return state;
  }
};
