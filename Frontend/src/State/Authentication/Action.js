import axios from "axios";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
   FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE

} from "./Types";
import { API_BASE_URL } from '../../Config/apiConfig'

// Action Creators
const registerRequest = () => ({ type: REGISTER_USER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_USER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_USER_FAILURE, payload: error });

const loginRequest = () => ({ type: LOGIN_USER_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_USER_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_USER_FAILURE, payload: error });

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });


const updateProfileRequest = () => ({ type: UPDATE_PROFILE_REQUEST });
const updateProfileSuccess = (user) => ({ type: UPDATE_PROFILE_SUCCESS, payload: user });
const updateProfileFailure = (error) => ({ type: UPDATE_PROFILE_FAILURE, payload: error });


// Helper function to save JWT
const saveJwt = (jwt) => {
  localStorage.setItem("jwt", jwt);
};


export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/authenticate/signup`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const user = response.data;

    if (user.jwt) {
      saveJwt(user.jwt);
      dispatch(registerSuccess(user));
    } else {
      dispatch(registerFailure('Email Already Exist'));
    }
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || 'Email Already Exist'));
  }
};


export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/api/authenticate/signin`, userData);
    const user = response.data;
    if (user.jwt) {
      saveJwt(user.jwt);
      dispatch(loginSuccess(user));
    } else {
      dispatch(loginFailure('Login failed'));
    }
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Email or password is incorrect'));
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const user = response.data;
    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.response?.data?.message || 'Failed to fetch user data'));
  }
};



// FORGOT PASSWORD
export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });

  try {
    const response = await axios.post(`${API_BASE_URL}/api/authenticate/forgot-password`, { email });
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data.message });
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.response?.data?.error || 'Failed to send reset link' });
  }
};

// RESET PASSWORD
export const resetPassword = (token, newPassword, confirmPassword) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });

  try {
    const response = await axios.post(`${API_BASE_URL}/api/authenticate/reset-password`, {
      token,
      newPassword,
      confirmPassword
    });
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data.message });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.response?.data?.error || 'Failed to reset password' });
  }
};


export const updateProfile = (userData, jwt) => async (dispatch) => {
  dispatch(updateProfileRequest());

  try {
    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    const response = await axios.put(
      `${API_BASE_URL}/api/user/update-profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const updatedUser = response.data.user;
    dispatch(updateProfileSuccess(updatedUser));
  } catch (error) {
    dispatch(updateProfileFailure(error.response?.data?.error || 'Failed to update profile'));
  }
};



export const getAllUsers = (jwt) => async (dispatch) => {
  dispatch({ type: GET_ALL_USERS_REQUEST });

  try {
    const response = await axios.get(`${API_BASE_URL}/api/user/all-users`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch users",
    });
  }
};


export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.clear();
};
