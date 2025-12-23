import { api } from '../../Config/apiConfig';
import {
    CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAILURE,
    GET_ALL_REVIEWS_REQUEST, GET_ALL_REVIEWS_SUCCESS, GET_ALL_REVIEWS_FAILURE,
    UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS, UPDATE_REVIEW_FAILURE,
    DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE
} from './Types';

// Create Review (product or variant)
export const createReview = (productId, description, variantId = null) => async (dispatch) => {
    dispatch({ type: CREATE_REVIEW_REQUEST });
    try {
        const { data } = await api.post('/api/review/add', { productId, description, variantId });
        dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_REVIEW_FAILURE, payload: error.response?.data?.message || error.message });
    }
};




// Get all reviews for product or variant
export const getAllReviews = (productId, variantId = null) => async (dispatch) => {
    dispatch({ type: GET_ALL_REVIEWS_REQUEST });
    try {
        let url = `/api/review/all/${productId}`;
        if (variantId) url += `?variantId=${variantId}`;
        const { data } = await api.get(url);
        dispatch({ type: GET_ALL_REVIEWS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_REVIEWS_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

// Update Review
export const updateReview = (reviewId, description) => async (dispatch) => {
    dispatch({ type: UPDATE_REVIEW_REQUEST });
    try {
        const { data } = await api.put(`/api/review/${reviewId}`, { description });
        dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_REVIEW_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

// Delete Review
export const deleteReview = (reviewId) => async (dispatch) => {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    try {
        await api.delete(`/api/review/${reviewId}`);
        dispatch({ type: DELETE_REVIEW_SUCCESS, payload: reviewId });
    } catch (error) {
        dispatch({ type: DELETE_REVIEW_FAILURE, payload: error.response?.data?.message || error.message });
    }
};
