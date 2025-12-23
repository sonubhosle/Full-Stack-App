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

const initialState = {
  addresses: [],
  loading: false,
  error: null,
};

export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESSES_REQUEST:
    case DELETE_ADDRESS_REQUEST:
    case UPDATE_ADDRESS_REQUEST:
      return { ...state, loading: true };

    case GET_ADDRESSES_SUCCESS:
      return { ...state, loading: false, addresses: action.payload, error: null };

    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: state.addresses.filter((item) => item._id !== action.payload),
        error: null,
      };

    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: state.addresses.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        error: null,
      };

    case GET_ADDRESSES_FAILURE:
    case DELETE_ADDRESS_FAILURE:
    case UPDATE_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
