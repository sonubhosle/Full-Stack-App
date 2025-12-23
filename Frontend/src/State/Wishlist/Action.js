import { api } from "../../Config/apiConfig.js";
import {
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_FAILURE,
  REMOVE_FROM_WISHLIST_REQUEST,
  REMOVE_FROM_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_FAILURE,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAILURE,
} from "./Types.js";

// Add to Wishlist
export const addToWishlist = (productId, variantId = null) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_WISHLIST_REQUEST });

    const { data } = await api.post(`/api/wishlist/add`, { productId, variantId });

    dispatch({
      type: ADD_TO_WISHLIST_SUCCESS,
      payload: data.wishlist, // directly pass array
    });
  } catch (error) {
    dispatch({
      type: ADD_TO_WISHLIST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Remove from Wishlist
export const removeFromWishlist = (productId, variantId = null) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_FROM_WISHLIST_REQUEST });

    const { data } = await api.post(`/api/wishlist/remove`, { productId, variantId });

    dispatch({
      type: REMOVE_FROM_WISHLIST_SUCCESS,
      payload: data, // directly pass updated array
    });
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_WISHLIST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Get Wishlist
export const getWishlist = () => async (dispatch) => {
  try {
    dispatch({ type: GET_WISHLIST_REQUEST });

    const { data } = await api.get(`/api/wishlist/`);

    dispatch({
      type: GET_WISHLIST_SUCCESS,
      payload: data.wishlist, // directly pass array
    });
  } catch (error) {
    dispatch({
      type: GET_WISHLIST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
