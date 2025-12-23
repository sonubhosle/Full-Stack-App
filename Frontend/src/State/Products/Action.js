import {  api } from '../../Config/apiConfig.js';
import {

    FIND_PRODUCT_BY_ID_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    GET_ALL_PRODUCTS_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS
} from './Types.js';



export const findProducts = () => async (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST });


    try {
        const { data } = await api.get(`/api/products/`);
        

        dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: error.message });
    }
};

export const findProductsById = ({ productId }) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

    try {
        const { data } = await api.get(`/api/products/id/${productId}`);

        const productData = data.selectedVariant || data;

        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: productData });
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
};


export const getRelatedProducts = (productId) => async (dispatch) => {
    dispatch({ type: "GET_RELATED_PRODUCTS_REQUEST" });

    try {
        const { data } = await api.get(`/api/products/${productId}/related`);
        
        dispatch({
            type: "GET_RELATED_PRODUCTS_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "GET_RELATED_PRODUCTS_FAILURE",
            payload: error.response?.data?.message || error.message,
        });
    }
};
