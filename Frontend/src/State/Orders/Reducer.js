import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ALL_ORDERS_FAILURE,
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    DELETE_ORDER,
    RESET_ORDERS, 
    LOGOUT 
} from "./Types";

const initialState = {
    orders: [],
    order: null,
    loading: false,
    error: null,
    success: false,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
        case GET_ORDER_BY_ID_REQUEST:
        case GET_ALL_ORDERS_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_ORDER_SUCCESS:
            return { ...state, loading: false, success: true, order: action.payload, error: null };

        case GET_ORDER_BY_ID_SUCCESS:
            return { ...state, loading: false, order: action.payload, error: null };

        case GET_ALL_ORDERS_SUCCESS:
            return { ...state, loading: false, orders: action.payload, error: null };

        case CREATE_ORDER_FAILURE:
        case GET_ORDER_BY_ID_FAILURE:
        case GET_ALL_ORDERS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case DELETE_ORDER: 
            return {
                ...state,
                orders: state.orders.filter(order => order._id !== action.payload),
            };

        case RESET_ORDERS: // reset on logout
        case LOGOUT:
            return { ...initialState };

        default:
            return state;
    }
};
