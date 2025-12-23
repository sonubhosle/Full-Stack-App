import { CANCELED_ORDER_FAILURE, CANCELED_ORDER_REQUEST, CANCELED_ORDER_SUCESS, CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, PLACED_ORDER_FAILURE, PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCESS } from './Types'

const initialState = {
    loading: false,
    orders: [],
    error: "",
}

export const adminOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return { ...state, loading: true }
        case GET_ORDER_SUCCESS:
            return { ...state, loading: false, orders: action.payload, error: "" }
        case GET_ORDER_FAILURE:
            return { ...state, loading: false, order: [], error: action.payload }
        case CONFIRMED_ORDER_REQUEST:
        case PLACED_ORDER_REQUEST:
        case DELIVERED_ORDER_REQUEST:
        case CANCELED_ORDER_REQUEST:
            return { ...state, loading: true }
        case CONFIRMED_ORDER_SUCCESS:
            return { ...state, confirmed: action.payload, loading: false }
        case PLACED_ORDER_SUCCESS:
            return { ...state, placed: action.payload, loading: false }
        case DELIVERED_ORDER_SUCESS:
            return { ...state, delivered: action.payload, loading: false }
        case CANCELED_ORDER_SUCESS:
            return { ...state, canceled: action.payload, loading: false }
        case CONFIRMED_ORDER_FAILURE:
        case PLACED_ORDER_FAILURE:
        case DELIVERED_ORDER_FAILURE:
        case CANCELED_ORDER_FAILURE:
            return { ...state, error: action.payload, loading: false }
        case DELETE_ORDER_REQUEST:
            return { ...state, loading: true }
        case DELETE_ORDER_SUCESS:
            return { ...state, loading: false, deletedOrder: action.payload }
        case DELETE_ORDER_FAILURE:
            return { ...state, error: action.payload, loading: false }
        case SHIP_ORDER_REQUEST:
            return { ...state, loading: true, error: null }
        case SHIP_ORDER_SUCESS:
            return { ...state, loading: false, shipped: action.payload }
        case SHIP_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    };

}