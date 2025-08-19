import {
  FETCH_GA_MEMBERS_REQUEST,
  FETCH_GA_MEMBERS_SUCCESS,
  FETCH_GA_MEMBERS_FAILURE,
  FETCH_GA_MEMBER_BOOKINGS_REQUEST,
  FETCH_GA_MEMBER_BOOKINGS_SUCCESS,
  FETCH_GA_MEMBER_BOOKINGS_FAILURE,
} from "./GatAdhikariActionType";

// Members Reducer
const membersInitialState = {
  loading: false,
  members: [],
  error: null,
};

export const gaMembersReducer = (state = membersInitialState, action) => {
  switch (action.type) {
    case FETCH_GA_MEMBERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_GA_MEMBERS_SUCCESS:
      return { ...state, loading: false, members: action.payload };
    case FETCH_GA_MEMBERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Members Booking Reducer
const bookingsInitialState = {
  loading: false,
  bookings: [],
  error: null,
};

export const gaMemberBookingsReducer = (state = bookingsInitialState, action) => {
  switch (action.type) {
    case FETCH_GA_MEMBER_BOOKINGS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_GA_MEMBER_BOOKINGS_SUCCESS:
      return { ...state, loading: false, bookings: action.payload };
    case FETCH_GA_MEMBER_BOOKINGS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
