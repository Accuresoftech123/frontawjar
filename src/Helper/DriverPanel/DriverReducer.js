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

  DRIVER_BREAK_REQUEST,
  DRIVER_BREAK_SUCCESS,
  DRIVER_BREAK_FAIL,

  LIST_ALL_BOOKINGS_REQUEST,
  LIST_ALL_BOOKINGS_SUCCESS,
  LIST_ALL_BOOKINGS_FAIL,
} from "./DriverActionType";

const initialState = {
  complaints: [],
  loading: false,
  error: null,
  success: false,
};

const usagelogInitialState = {
  logs: [],          // list of usage logs
  activeLog: null,   // currently active usage log
  detail: null,      // detail of a specific log
  loading: false,
  error: null,
  success: false,
};


const bookingInitialState = {
  bookings: [],
  loading: false,
  error: null,
};

export const complaintDriverReducer = (state = initialState, action) => {
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


export const driverUsageLogReducer = (state = usagelogInitialState, action) => {
  switch (action.type) {
    // ==== CREATE LOG ====
    case CREATE_DRIVER_USAGE_LOG_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case CREATE_DRIVER_USAGE_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        activeLog: action.payload, // store active usage log
        logs: [...state.logs, action.payload], // add new log in list
      };
    case CREATE_DRIVER_USAGE_LOG_FAIL:
      return { ...state, loading: false, error: action.payload };

    // ==== LIST LOGS ====
    case LIST_DRIVER_USAGE_LOG_REQUEST:
      return { ...state, loading: true, error: null };
    case LIST_DRIVER_USAGE_LOG_SUCCESS:
      return { ...state, loading: false, logs: action.payload };
    case LIST_DRIVER_USAGE_LOG_FAIL:
      return { ...state, loading: false, error: action.payload };

    // ==== LOG DETAIL ====
    case DETAIL_DRIVER_USAGE_LOG_REQUEST:
      return { ...state, loading: true, error: null };
    case DETAIL_DRIVER_USAGE_LOG_SUCCESS:
      return { ...state, loading: false, detail: action.payload };
    case DETAIL_DRIVER_USAGE_LOG_FAIL:
      return { ...state, loading: false, error: action.payload };

    // ==== COMPLETE LOG ====
    case COMPLETE_DRIVER_USAGE_LOG_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case COMPLETE_DRIVER_USAGE_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        activeLog: null, // clear active log after completion
        logs: state.logs.map((log) =>
          log.id === action.payload.id ? action.payload : log
        ),
      };
    case COMPLETE_DRIVER_USAGE_LOG_FAIL:
      return { ...state, loading: false, error: action.payload };

    // ==== BREAK LOG ====
    case DRIVER_BREAK_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case DRIVER_BREAK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        activeLog: { ...state.activeLog, break: action.payload },
      };
    case DRIVER_BREAK_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const dbookingListReducer = (state = bookingInitialState, action) => {
  switch (action.type) {
    case LIST_ALL_BOOKINGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LIST_ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload, // API gives full booking list
      };

    case LIST_ALL_BOOKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};