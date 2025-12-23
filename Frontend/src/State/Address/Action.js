import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
} from './Types';

// Fetch all addresses
export const getAddresses = (userId, jwt) => async (dispatch) => {
  try {
    dispatch({ type: GET_ADDRESSES_REQUEST });
    const { data } = await axios.get(`http://localhost:4000/api/user/addresses/${userId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: GET_ADDRESSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ADDRESSES_FAILURE, payload: error.message });
    toast.error(error.message);
  }
};

// Delete address
export const deleteAddress = (id, jwt) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADDRESS_REQUEST });
    await axios.delete(`http://localhost:4000/api/user/address/${id}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: id });
    toast.success('Address deleted successfully!');
  } catch (error) {
    dispatch({ type: DELETE_ADDRESS_FAILURE, payload: error.message });
    toast.error('Failed to delete address.');
  }
};

// Update address
export const updateAddress = (id, addressData, jwt) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });
    const { data } = await axios.put(`http://localhost:4000/api/user/address/${id}`, addressData, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: data });
    toast.success('Address updated successfully!');
  } catch (error) {
    dispatch({ type: UPDATE_ADDRESS_FAILURE, payload: error.message });
    toast.error('Failed to update address.');
  }
};
