import {
    GET_ALL_PRODUCTS_FAILURE,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_REQUEST,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    DELETE_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE
} from './Types';

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    deletedProduct: null
};

export const productReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
        case UPDATE_PRODUCT_REQUEST:  // Handle the update request action
            return { ...state, loading: true, error: null };

        case GET_ALL_PRODUCTS_SUCCESS:
            return { ...state, loading: false, error: null, products: action.payload };

        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, product: action.payload };

        case DELETE_PRODUCTS_SUCCESS:
            return { ...state, loading: false, error: null, deletedProduct: action.payload };

        case UPDATE_PRODUCT_SUCCESS:  // Handle the update success action
            return {
                ...state,
                loading: false,
                error: null,
                products: state.products.map(product =>
                    product._id === action.payload._id ? action.payload : product
                ),
                product: action.payload  
            };

        case GET_ALL_PRODUCTS_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:
        case UPDATE_PRODUCT_FAILURE:  
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
