import { API_BASE_URL, api } from '../../Config/apiConfig.js';
import {
    CREATE_PRODUCTS_FAILURE,
    CREATE_PRODUCTS_REQUEST,
    CREATE_PRODUCTS_SUCCESS,
    DELETE_PRODUCTS_FAILURE,
    DELETE_PRODUCTS_REQUEST,
    DELETE_PRODUCTS_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    GET_ALL_PRODUCTS_FAILURE,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS
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

export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

    const { productId } = reqData;

    try {
        const { data } = await api.get(`/api/products/id/${productId}`);

        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
};

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCTS_REQUEST });

  try {
    // product is expected to be a FormData object from the form
    const { data } = await api.post('/api/admin/products/', product, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    dispatch({ type: CREATE_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCTS_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const updateProduct = (productId, updatedData) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });

  try {
    // updatedData should be a FormData object if images are included
    const { data } = await api.put(
      `${API_BASE_URL}/api/admin/products/${productId}`,
      updatedData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCTS_REQUEST })

    try {
        const { data } = await api.delete(`${API_BASE_URL}/api/admin/products/${productId}`);
        dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: productId })
    } catch (error) {
        dispatch({ type: DELETE_PRODUCTS_FAILURE, payload: error.message })

    }
}
