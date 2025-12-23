import { CANCELED_ORDER_FAILURE, CANCELED_ORDER_REQUEST, CANCELED_ORDER_SUCESS, CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, PLACED_ORDER_FAILURE, PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCESS } from './Types'


const initialState = {
  loading: false,
  orders: [],
  error: null,
};

export const adminOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all orders
    case GET_ORDER_REQUEST:
      return { ...state, loading: true };
    case GET_ORDER_SUCCESS:
      return { ...state, loading: false, orders: action.payload, error: null };
    case GET_ORDER_FAILURE:
      return { ...state, loading: false, orders: [], error: action.payload };

    // Confirm, Ship, Deliver, Cancel order
    case CONFIRMED_ORDER_REQUEST:
    case SHIP_ORDER_REQUEST:
    case DELIVERED_ORDER_REQUEST:
    case CANCELED_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case CONFIRMED_ORDER_SUCCESS:
    case SHIP_ORDER_SUCESS:
    case DELIVERED_ORDER_SUCESS:
    case CANCELED_ORDER_SUCESS:
      // Update the specific order in the array
      return {
        ...state,
        loading: false,
        orders: state.orders.map(order =>
          order._id === action.payload._id ? action.payload : order
        ),
        error: null,
      };

    case CONFIRMED_ORDER_FAILURE:
    case SHIP_ORDER_FAILURE:
    case DELIVERED_ORDER_FAILURE:
    case CANCELED_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Delete order
    case DELETE_ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_ORDER_SUCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter(order => order._id !== action.payload._id),
        error: null,
      };
    case DELETE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
