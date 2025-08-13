import {
  CREATE_COMPLAINT_REQUEST,
  CREATE_COMPLAINT_SUCCESS,
  CREATE_COMPLAINT_FAIL,
} from "./DriverActionType";

const initialState = {
  complaints: [],
  loading: false,
  error: null,
  success: false,
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
