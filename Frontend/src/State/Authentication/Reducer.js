import {
  GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS,
  LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
  UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_REQUEST,
  GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAILURE
} from "./Types";

const initialState = {
  user: null,
  users: [], // fixed typo: "usrs" → "users"
  isLoading: false,
  error: null,
  jwt: null,
  message: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // REQUESTS
    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case GET_USER_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case UPDATE_PROFILE_REQUEST:
    case GET_ALL_USERS_REQUEST:
      return { ...state, isLoading: true, error: null, message: null };

    // SUCCESS
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload.jwt,
        user: action.payload.user,
        error: null,
      };

    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload, error: null };

    case GET_ALL_USERS_SUCCESS:
      return { ...state, isLoading: false, users: action.payload, error: null };

    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, message: action.payload, error: null };

    case UPDATE_PROFILE_SUCCESS:
      return { ...state, isLoading: false, user: action.payload, error: null };

    // FAILURES
    case REGISTER_USER_FAILURE:
    case LOGIN_USER_FAILURE:
    case GET_USER_FAILURE:
    case FORGOT_PASSWORD_FAILURE:
    case RESET_PASSWORD_FAILURE:
    case UPDATE_PROFILE_FAILURE:
    case GET_ALL_USERS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    // LOGOUT
    case LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};
