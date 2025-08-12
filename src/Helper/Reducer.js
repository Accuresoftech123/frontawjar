import { combineReducers } from "redux";
import {districtReducer, talukaReducer, userApprovalReducer, villageReducer, UserListAdminReducer, filterDriversReducer, filterMembersReducer, filterVehiclesReducer} from "./AdminPanel/AdminReducer";
import {
  // Auth-related
  SULOGIN_REQUEST, SULOGIN_SUCCESS, SULOGIN_FAILED, SULOGOUT,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT,

  //register
  ADMINREGISTER_REQUEST, ADMINREGISTER_SUCCESS, ADMINREGISTER_FAILURE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,

  //verify email
  CHECK_EMAIL_REQUEST, CHECK_EMAIL_SUCCESS, CHECK_EMAIL_FAILURE,
  USER_CHECK_EMAIL_REQUEST, USER_CHECK_EMAIL_SUCCESS, USER_CHECK_EMAIL_FAILURE,
  VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE,

  //user
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAIL,
  GET_USER_COUNT_REQUEST, GET_USER_COUNT_SUCCESS, GET_USER_COUNT_FAIL, 
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL,  
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL,
} from "./ActionType";
import { vehicleRegisterReducer, vehicleTypeReducer } from "./VendorPanel/VendorReducer";
import { bookingCreateReducer, gatAdhikariReducer } from "./AdminPanel/AdminReducer";

const suloginInitialState = {
  isAuthenticated: false,
  superuser: null,
  loading: false,
  error: null,
};
const adminUserInitialState = {
  loading: false,
  error: null,
  adminUser: [],
};
const loginInitialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};
const userInitialState = {
  loading: false,
  error: null,
  User: [],
  UserCount: 0,
};
const verifyInitialState = {
  loading: false,
  verified: false,
  error: null,
};
const initialCheckEmailState = {
  checkemail: false,
  loading: false,
  sent: false,
  error: null,
};
{
  /*SUPER USER REDUCER*/
}
export const superuserloginReducer = (state = suloginInitialState, action) => {
  switch (action.type) {
    case SULOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case SULOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        superuser: action.payload,
      };
    case SULOGIN_FAILED:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case SULOGOUT:
      return {
        ...state,
        loading: false,
        superuser: null,
        error: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

{
  /*ADMIN AND ALL OTHER USERS COMMON LOGIN REDUCER*/
}
export const loginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

//admin reg reducer
export const adminUserReducer = (state = adminUserInitialState, action) => {
  switch (action.type) {
    case ADMINREGISTER_REQUEST:
      return { ...state, loading: true, error: null };

    case ADMINREGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };

    case ADMINREGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

//Users reducer
export const UserReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case GET_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case GET_USER_COUNT_REQUEST:
    case DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        User: action.payload,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        User: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return { ...state, loading: true, error: null };

    case GET_USER_COUNT_SUCCESS:
      return { ...state, loading: false, UserCount: action.payload };

    case REGISTER_FAILURE:
    case GET_USER_FAIL:
    case UPDATE_USER_FAIL:
    case GET_USER_COUNT_FAIL:
    case DELETE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

//otp reducer
export const otpReducer = (state = verifyInitialState, action) => {
  switch (action.type) {
    case VERIFY_OTP_REQUEST:
      return { ...state, loading: true, error: null };
    case VERIFY_OTP_SUCCESS:
      return { ...state, loading: false, verified: true };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        verified: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
//check email
export const checkEmailReducer = (state = initialCheckEmailState, action) => {
  switch (action.type) {
    case CHECK_EMAIL_REQUEST:
    case USER_CHECK_EMAIL_REQUEST:
      return { ...state, checkemail: true, error: null };
    case CHECK_EMAIL_SUCCESS:
    case USER_CHECK_EMAIL_SUCCESS:
      return { ...state, checkemail: false, sent: true };
    case CHECK_EMAIL_FAILURE:
    case USER_CHECK_EMAIL_FAILURE:
      return { ...state, checkemail: false, error: action.payload };
    default:
      return state;
  }
};


// Combine all reducers
const rootReducer = combineReducers({
  superuserlogin: superuserloginReducer,
  admin: adminUserReducer,
  user: UserReducer,
  login: loginReducer,
  verifyotp: otpReducer,
  checkemail: checkEmailReducer,

  district: districtReducer,
  taluka: talukaReducer,
  village: villageReducer,
  userApproval: userApprovalReducer,
  useradminlist: UserListAdminReducer, 

  vehicletype: vehicleTypeReducer,
  vehicle: vehicleRegisterReducer,
  filterdriver: filterDriversReducer,
  filtermember: filterMembersReducer,
  filtervehicle: filterVehiclesReducer,
  bookingadmincreate: bookingCreateReducer,
  gatAdhikari: gatAdhikariReducer,
});

export default rootReducer;
