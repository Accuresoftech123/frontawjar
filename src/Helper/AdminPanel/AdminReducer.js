import {
     // District
  GET_DISTRICTS_REQUEST, GET_DISTRICTS_SUCCESS, GET_DISTRICTS_FAIL,
  CREATE_DISTRICT_REQUEST, CREATE_DISTRICT_SUCCESS, CREATE_DISTRICT_FAIL,
  UPDATE_DISTRICT_REQUEST, UPDATE_DISTRICT_SUCCESS, UPDATE_DISTRICT_FAIL,
  DELETE_DISTRICT_REQUEST, DELETE_DISTRICT_SUCCESS, DELETE_DISTRICT_FAIL,


  // Taluka
  GET_TALUKAS_REQUEST, GET_TALUKAS_SUCCESS, GET_TALUKAS_FAIL,
  CREATE_TALUKA_REQUEST, CREATE_TALUKA_SUCCESS, CREATE_TALUKA_FAIL,
  UPDATE_TALUKA_REQUEST, UPDATE_TALUKA_SUCCESS, UPDATE_TALUKA_FAIL,
  DELETE_TALUKA_REQUEST, DELETE_TALUKA_SUCCESS, DELETE_TALUKA_FAIL,

  // Village
  GET_VILLAGES_REQUEST, GET_VILLAGES_SUCCESS, GET_VILLAGES_FAIL,
  CREATE_VILLAGE_REQUEST, CREATE_VILLAGE_SUCCESS, CREATE_VILLAGE_FAIL,
  UPDATE_VILLAGE_REQUEST, UPDATE_VILLAGE_SUCCESS, UPDATE_VILLAGE_FAIL,
  DELETE_VILLAGE_REQUEST, DELETE_VILLAGE_SUCCESS, DELETE_VILLAGE_FAIL,

   //approve users
   FETCH_PENDING_USERS_REQUEST, FETCH_PENDING_USERS_SUCCESS,  FETCH_PENDING_USERS_FAILURE,
  UPDATE_USER_STATUS_REQUEST,  UPDATE_USER_STATUS_SUCCESS,  UPDATE_USER_STATUS_FAILURE,

   //user list
   ROLE_LIST_REQUEST, ROLE_LIST_SUCCESS, ROLE_LIST_FAIL,

   //driver filter list
   FILTER_DRIVERS_REQUEST,
  FILTER_DRIVERS_SUCCESS,
  FILTER_DRIVERS_FAIL,
  FILTER_DRIVERS_RESET,

  //driver filter list
   FILTER_MEMBER_REQUEST,
  FILTER_MEMBER_SUCCESS,
  FILTER_MEMBER_FAIL,
  FILTER_MEMBER_RESET,

    FILTER_VEHICLES_REQUEST,
  FILTER_VEHICLES_SUCCESS,
  FILTER_VEHICLES_FAIL,
  FILTER_VEHICLES_RESET,

  //booking
   BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
   ASSIGN_VEHICLE_REQUEST,
  ASSIGN_VEHICLE_SUCCESS,
  ASSIGN_VEHICLE_FAIL,
  ASSIGN_DRIVER_REQUEST,
  ASSIGN_DRIVER_SUCCESS,
  ASSIGN_DRIVER_FAIL,
    FETCH_BOOKINGS_REQUEST,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_BOOKINGS_FAIL,

    FETCH_GAT_ADHIKARI_REQUEST,
  FETCH_GAT_ADHIKARI_SUCCESS,
  FETCH_GAT_ADHIKARI_FAILURE,
  ASSIGN_GAT_ADHIKARI_REQUEST,
  ASSIGN_GAT_ADHIKARI_SUCCESS,
  ASSIGN_GAT_ADHIKARI_FAILURE,


   // Fetch vendors list 
FETCH_VENDOR_LIST_REQUEST,
FETCH_VENDOR_LIST_SUCCESS,
FETCH_VENDOR_LIST_FAILURE,
 // Fetch member list 
FETCH_MEMBER_LIST_REQUEST,
FETCH_MEMBER_LIST_SUCCESS,
FETCH_MEMBER_LIST_FAILURE,
// Fetch driver list 
FETCH_DRIVER_LIST_REQUEST,
FETCH_DRIVER_LIST_SUCCESS,
FETCH_DRIVER_LIST_FAILURE,
// Fetch All users list 
FETCH_ALL_LIST_REQUEST,
FETCH_ALL_LIST_SUCCESS,
FETCH_ALL_LIST_FAILURE,
//Admin status change
ADMIN_STATUS_REQUEST,
ADMIN_STATUS_SUCCESS,
ADMIN_STATUS_FAILURE,

//
DRIVER_STATUS_REQUEST,
DRIVER_STATUS_SUCCESS,
DRIVER_STATUS_FAILURE,

MEMBER_STATUS_REQUEST,
MEMBER_STATUS_SUCCESS,
MEMBER_STATUS_FAILURE,

VENDOR_STATUS_REQUEST,
VENDOR_STATUS_SUCCESS,
VENDOR_STATUS_FAILURE,

} from './AdminActionType';

const districtInitialState = {
  loading: false,
  error: null,
  districts: [],
  success: false,
};

const talukaInitialState = {
  loading: false,
  error: null,
  talukas: [],
   success: false,
};

const villageInitialState = {
  loading: false,
  error: null,
  villages: [],
   success: false,
};

const pendingInitialState = {
  loading: false,
  pendingUsers: [],
  error: null,
  updatingStatus: false,
  updateError: null,
};
const userListInitialState = {
  loading: false,
  users: [],
  error: null,
};
const filterVehiclesInitialState = {
  loading: false,
  error: null,
  vehicles: [],
};
const bookingInitialState = {
  loading: false,
  booking: null,       // Will hold the created booking data after success
  error: null,         // Holds error message if request fails
   bookings: [],
   vehicleAssignLoading: false,
  vehicleAssignSuccess: false,
  vehicleAssignError: null,
  driverAssignLoading: false,
  driverAssignSuccess: false,
  driverAssignError: null,
};

const gatadhikariInitialState = {
  loading: false,
  gatAdhikaris: [],
  error: null,
  assignLoading: false,
  assignError: null,
};

// Initial States
const vendorListInitialState = {
  loading: false,
  vendors: [],
  error: null,
};

const memberListInitialState = {
  loading: false,
  members: [],
  error: null,
};

const driverListInitialState = {
  loading: false,
  drivers: [],
  error: null,
};

const allUsersListInitialState = {
  loading: false,
  users: [],
  error: null,
};

// Initial State for Admin Status
const adminStatusInitialState = {
  loading: false,
  error: null,
  success: false,
};

// Initial States
const driverStatusInitialState = {
  loading: false,
  error: null,
  success: false,
};

const memberStatusInitialState = {
  loading: false,
  error: null,
  success: false,
};

const vendorStatusInitialState = {
  loading: false,
  error: null,
  success: false,
};


// District Reducer
export const districtReducer = (state = districtInitialState, action) => {
  switch (action.type) {
    case GET_DISTRICTS_REQUEST:
    case CREATE_DISTRICT_REQUEST:
    case UPDATE_DISTRICT_REQUEST:
    case DELETE_DISTRICT_REQUEST:
      return { ...state, loading: true, error: null, success: false, };

    case GET_DISTRICTS_SUCCESS:
      return { ...state, loading: false, districts: action.payload };

   case CREATE_DISTRICT_SUCCESS:
  return {
    ...state,
    loading: false,
    districts: [...state.districts, action.payload],
    success: true
  };


    case UPDATE_DISTRICT_SUCCESS:
      return {
        ...state,
        loading: false,
        districts: state.districts.map((d) =>
          d.id === action.payload.id ? action.payload : d
        ),
      };

    case DELETE_DISTRICT_SUCCESS:
      return {
        ...state,
        loading: false,
        districts: state.districts.filter((d) => d.id !== action.payload),
      };

    case GET_DISTRICTS_FAIL:
    case CREATE_DISTRICT_FAIL:
    case UPDATE_DISTRICT_FAIL:
    case DELETE_DISTRICT_FAIL:
      return { ...state, loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

// Taluka Reducer
export const talukaReducer = (state = talukaInitialState, action) => {
  switch (action.type) {
    case GET_TALUKAS_REQUEST:
    case CREATE_TALUKA_REQUEST:
    case UPDATE_TALUKA_REQUEST:
    case DELETE_TALUKA_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_TALUKAS_SUCCESS:
  return { 
    ...state, 
    loading: false, 
    talukas: Array.isArray(action.payload) 
      ? action.payload 
      : action.payload?.data || [] 
  };

case CREATE_TALUKA_SUCCESS:
  return {
    ...state,
    loading: false,
    talukas: Array.isArray(state.talukas) 
      ? [...state.talukas, action.payload] 
      : [action.payload],
  };

    case UPDATE_TALUKA_SUCCESS:
      return {
        ...state,
        loading: false,
        talukas: state.talukas.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case DELETE_TALUKA_SUCCESS:
      return {
        ...state,
        loading: false,
        talukas: state.talukas.filter((t) => t.id !== action.payload),
      };

    case GET_TALUKAS_FAIL:
    case CREATE_TALUKA_FAIL:
    case UPDATE_TALUKA_FAIL:
    case DELETE_TALUKA_FAIL:
      return { ...state, loading: false, error: action.payload };
 
    default:
      return state;
  }
};

// Village Reducer
export const villageReducer = (state = villageInitialState, action) => {
  switch (action.type) {
    case GET_VILLAGES_REQUEST:
    case CREATE_VILLAGE_REQUEST:
    case UPDATE_VILLAGE_REQUEST:
    case DELETE_VILLAGE_REQUEST:
      return { ...state, loading: true, error: null };
 
    case GET_VILLAGES_SUCCESS:
      return { ...state, loading: false, villages: action.payload };

    case CREATE_VILLAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        villages: [...state.villages, action.payload],
      };

    case UPDATE_VILLAGE_SUCCESS:
      return { ...state, loading: false, village: action.payload };

    case DELETE_VILLAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        villages: state.villages.filter((v) => v.id !== action.payload),
      };
   
    case GET_VILLAGES_FAIL:
    case CREATE_VILLAGE_FAIL:
    case UPDATE_VILLAGE_FAIL:
    case DELETE_VILLAGE_FAIL:
      return { ...state, loading: false, error: action.payload };
   
    default:
      return state;
  }
};

// user approval
export const userApprovalReducer = (state = pendingInitialState, action) => {
  switch (action.type) {
    case FETCH_PENDING_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PENDING_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        pendingUsers: action.payload,
      };
    case FETCH_PENDING_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_STATUS_REQUEST:
      return {
        ...state,
        updatingStatus: true,
        updateError: null,
      };
    case UPDATE_USER_STATUS_SUCCESS:
      return {
        ...state,
        updatingStatus: false,
        pendingUsers: state.pendingUsers.filter(
          (user) => user.id !== action.payload.userId
        ), // Remove user from pending list after status update
      };
    case UPDATE_USER_STATUS_FAILURE:
      return {
        ...state,
        updatingStatus: false,
        updateError: action.payload,
      };
    default:
      return state;
  }
};

// user list

export const UserListAdminReducer = (state = userListInitialState, action) => {
  switch (action.type) {
    case ROLE_LIST_REQUEST:
      return { loading: true, users: [] };
    case ROLE_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case ROLE_LIST_FAIL:
      return { loading: false, error: action.payload, users: [] };
    default:
      return state;
  }
};


// --- Initial States ---
const filterDriversInitialState = {
  loading: false,
  error: null,
  drivers: [],
};

const filterMembersInitialState = {
  loading: false,
  error: null,
  members: [],
};

// --- Reducers ---

export const filterDriversReducer = (state = filterDriversInitialState, action) => {
  switch (action.type) {
    case FILTER_DRIVERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FILTER_DRIVERS_SUCCESS:
      return { ...state, loading: false, drivers: action.payload };
    case FILTER_DRIVERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case FILTER_DRIVERS_RESET:
      return { ...filterDriversInitialState };
    default:
      return state;
  }
};

export const filterMembersReducer = (state = filterMembersInitialState, action) => {
  switch (action.type) {
    case FILTER_MEMBER_REQUEST:
      return { ...state, loading: true, error: null };
    case FILTER_MEMBER_SUCCESS:
      return { ...state, loading: false, members: action.payload };
    case FILTER_MEMBER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case FILTER_MEMBER_RESET:
      return { ...filterMembersInitialState };
    default:
      return state;
  }
};
export const filterVehiclesReducer = (state = filterVehiclesInitialState, action) => {
  switch (action.type) {
    case FILTER_VEHICLES_REQUEST:
      return { ...state, loading: true, error: null };
    case FILTER_VEHICLES_SUCCESS:
      return { ...state, loading: false, vehicles: action.payload };
    case FILTER_VEHICLES_FAIL:
      return { ...state, loading: false, error: action.payload };
    case FILTER_VEHICLES_RESET:
      return { ...filterVehiclesInitialState };
    default:
      return state;
  }
};

export const bookingCreateReducer = (state = bookingInitialState, action) => {
  switch (action.type) {
    case BOOKING_CREATE_REQUEST:
      return { ...state, loading: true, error: null };
    case BOOKING_CREATE_SUCCESS:
      return { loading: false, booking: action.payload, error: null };
    case BOOKING_CREATE_FAIL:
      return { loading: false, booking: null, error: action.payload };
    
    case ASSIGN_VEHICLE_REQUEST:
      return { ...state, vehicleAssignLoading: true, vehicleAssignError: null, vehicleAssignSuccess: false };
    case ASSIGN_VEHICLE_SUCCESS:
      return { ...state, vehicleAssignLoading: false, vehicleAssignSuccess: true };
    case ASSIGN_VEHICLE_FAIL:
      return { ...state, vehicleAssignLoading: false, vehicleAssignError: action.payload };

    case ASSIGN_DRIVER_REQUEST:
      return { ...state, driverAssignLoading: true, driverAssignError: null, driverAssignSuccess: false };
    case ASSIGN_DRIVER_SUCCESS:
      return { ...state, driverAssignLoading: false, driverAssignSuccess: true };
    case ASSIGN_DRIVER_FAIL:
      return { ...state, driverAssignLoading: false, driverAssignError: action.payload };

      case FETCH_BOOKINGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload,
      };
    case FETCH_BOOKINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const gatAdhikariReducer = (state = gatadhikariInitialState, action) => {
  switch (action.type) {
    case FETCH_GAT_ADHIKARI_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_GAT_ADHIKARI_SUCCESS:
      return { ...state, loading: false, gatAdhikaris: action.payload, error: null };
    case FETCH_GAT_ADHIKARI_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ASSIGN_GAT_ADHIKARI_REQUEST:
      return { ...state, assignLoading: true, assignError: null };
    case ASSIGN_GAT_ADHIKARI_SUCCESS:
      return {
        ...state,
        assignLoading: false,
        assignError: null,
        gatAdhikaris: state.gatAdhikaris.map(member =>
          member.id === action.payload.memberId
            ? { ...member, is_gat_adhikari: action.payload.isGatAdhikari }
            : member
        ),
      };
    case ASSIGN_GAT_ADHIKARI_FAILURE:
      return { ...state, assignLoading: false, assignError: action.payload };

    default:
      return state;
  }
};




// Vendor List Reducer
export const vendorListReducer = (state = vendorListInitialState, action) => {
  switch (action.type) {
    case FETCH_VENDOR_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_VENDOR_LIST_SUCCESS:
      return { ...state, loading: false, vendors: action.payload, error: null };
    case FETCH_VENDOR_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload, vendors: [] };
    default:
      return state;
  }
};

// Member List Reducer
export const memberListReducer = (state = memberListInitialState, action) => {
  switch (action.type) {
    case FETCH_MEMBER_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MEMBER_LIST_SUCCESS:
      return { ...state, loading: false, members: action.payload, error: null };
    case FETCH_MEMBER_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload, members: [] };
    default:
      return state;
  }
};

// Driver List Reducer
export const driverListReducer = (state = driverListInitialState, action) => {
  switch (action.type) {
    case FETCH_DRIVER_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DRIVER_LIST_SUCCESS:
      return { ...state, loading: false, drivers: action.payload, error: null };
    case FETCH_DRIVER_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload, drivers: [] };
    default:
      return state;
  }
};

// All Users List Reducer
export const allUsersListReducer = (state = allUsersListInitialState, action) => {
  switch (action.type) {
    case FETCH_ALL_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_LIST_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: null };
    case FETCH_ALL_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload, users: [] };
    default:
      return state;
  }
};



// Admin Status Reducer



// Driver Status Reducer
export const driverStatusReducer = (state = driverStatusInitialState, action) => {
  switch (action.type) {
    case DRIVER_STATUS_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case DRIVER_STATUS_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case DRIVER_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

// Member Status Reducer
export const memberStatusReducer = (state = memberStatusInitialState, action) => {
  switch (action.type) {
    case MEMBER_STATUS_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case MEMBER_STATUS_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case MEMBER_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

// Vendor Status Reducer
export const vendorStatusReducer = (state = vendorStatusInitialState, action) => {
  switch (action.type) {
    case VENDOR_STATUS_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case VENDOR_STATUS_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case VENDOR_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};