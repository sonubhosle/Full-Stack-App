import { 
    GET_ALL_PRODUCTS_REQUEST, 
    GET_ALL_PRODUCTS_SUCCESS, 
    GET_ALL_PRODUCTS_FAILURE, 
    FIND_PRODUCT_BY_ID_REQUEST, 
    FIND_PRODUCT_BY_ID_SUCCESS, 
    FIND_PRODUCT_BY_ID_FAILURE, 
    DELETE_PRODUCTS_SUCCESS,
    GET_RELATED_PRODUCTS_REQUEST,
    GET_RELATED_PRODUCTS_SUCCESS,
    GET_RELATED_PRODUCTS_FAILURE
} from './Types';

const initialState = {
    products: [],
    product: null,
    relatedProducts: [], 
    loading: false,
    error: null
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        // Loading states
        case GET_ALL_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
        case GET_RELATED_PRODUCTS_REQUEST:
            return { ...state, loading: true, error: null };

        // Success states
        case GET_ALL_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload, error: null };

        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, product: action.payload, error: null };

        case GET_RELATED_PRODUCTS_SUCCESS:
            return { ...state, loading: false, relatedProducts: action.payload, error: null };

        // Failure states
        case GET_ALL_PRODUCTS_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:
        case GET_RELATED_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Delete success
        case DELETE_PRODUCTS_SUCCESS:
            return { 
                ...state, 
                products: state.products.filter(p => p._id !== action.payload), 
                loading: false, 
                error: null 
            };

        default:
            return state;
    }
};
