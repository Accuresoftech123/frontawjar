
import {
  CREATE_VEHICLE_TYPE_REQUEST, CREATE_VEHICLE_TYPE_SUCCESS, CREATE_VEHICLE_TYPE_FAILURE,
    VEHICLE_TYPE_LIST_REQUEST, VEHICLE_TYPE_LIST_SUCCESS, VEHICLE_TYPE_LIST_FAIL, VEHICLE_TYPE_LIST_RESET,

     VEHICLE_REGISTER_REQUEST,
  VEHICLE_REGISTER_SUCCESS,
  VEHICLE_REGISTER_FAIL,
   GET_VEHICLE_REQUEST,
  GET_VEHICLE_SUCCESS,
  GET_VEHICLE_FAIL,
  GET_VEHICLE_RESET,
} from "./VendorActionType";

const vtInitialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  vehicleTypes: [],
};
export const vehicleRegisterInitialState = {
  loading: false,
  vehicle: null,
  error: null,
  success: false,
  vehicles: [],
};

export const vehicleTypeReducer = (state = vtInitialState, action) => {
  switch (action.type) {
    case CREATE_VEHICLE_TYPE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case CREATE_VEHICLE_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case CREATE_VEHICLE_TYPE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
      // LIST VEHICLE TYPES
    case VEHICLE_TYPE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case VEHICLE_TYPE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicleTypes: action.payload,
        success: true,
      };
    case VEHICLE_TYPE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        vehicleTypes: [],
        success: false,
      };
    case VEHICLE_TYPE_LIST_RESET:
      return {
        ...state,
        vehicleTypes: [],
      };

    default:
      return state;
  }
};

export const vehicleRegisterReducer = (
  state = vehicleRegisterInitialState,
  action
) => {
  switch (action.type) {
    case VEHICLE_REGISTER_REQUEST:
      return { ...state, loading: true, error: null, success: false };

    case VEHICLE_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicle: action.payload,
        success: true,
        error: null,
      };

    case VEHICLE_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload, success: false };
       // LIST VEHICLE 
    case GET_VEHICLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case GET_VEHICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicles: action.payload,
        success: true,
      };
    case GET_VEHICLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        vehicles: [],
        success: false,
      };
    case GET_VEHICLE_RESET:
      return {
        ...state,
        vehicles: [],
      };
    default:
      return state;
  }
};