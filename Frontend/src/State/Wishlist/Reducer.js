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

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST_REQUEST:
    case REMOVE_FROM_WISHLIST_REQUEST:
    case GET_WISHLIST_REQUEST:
      return { ...state, loading: true, error: null };

    case ADD_TO_WISHLIST_SUCCESS:
    case REMOVE_FROM_WISHLIST_SUCCESS:
   case GET_WISHLIST_SUCCESS:
  return {
    ...state,
    loading: false,
    wishlist: Array.isArray(action.payload) ? action.payload : action.payload.wishlist || [],
    error: null,
  };

    case ADD_TO_WISHLIST_FAILURE:
    case REMOVE_FROM_WISHLIST_FAILURE:
    case GET_WISHLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
