import { api } from '../../Config/apiConfig';
import {
    CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, CREATE_RATING_FAILURE,
    GET_ALL_RATINGS_REQUEST, GET_ALL_RATINGS_SUCCESS, GET_ALL_RATINGS_FAILURE,
    UPDATE_RATING_REQUEST, UPDATE_RATING_SUCCESS, UPDATE_RATING_FAILURE,
    DELETE_RATING_REQUEST, DELETE_RATING_SUCCESS, DELETE_RATING_FAILURE
} from './Types';

// Create Rating (product or variant)
// Rating Action.js
export const createRating = (productId, ratingValue, variantId = null) => async (dispatch) => {
    dispatch({ type: CREATE_RATING_REQUEST });
    try {
        const payload = { productId, rating: ratingValue };
        if (variantId) payload.variantId = variantId;

        const { data } = await api.post('/api/rating/add', payload);
        dispatch({ type: CREATE_RATING_SUCCESS, payload: data });
        return data; // return data on success
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        dispatch({ type: CREATE_RATING_FAILURE, payload: message });
        throw new Error(message); // throw to frontend
    }
};



// Get all ratings for product or variant
export const getAllRatings = (productId, variantId = null) => async (dispatch) => {
    dispatch({ type: GET_ALL_RATINGS_REQUEST });
    try {
        let url = `/api/rating/all/${productId}`;
        if (variantId) url += `?variantId=${variantId}`;
        const { data } = await api.get(url);
        dispatch({ type: GET_ALL_RATINGS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_RATINGS_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

// Update Rating
export const updateRating = (ratingId, newRatingValue) => async (dispatch) => {
    dispatch({ type: UPDATE_RATING_REQUEST });
    try {
        const { data } = await api.put(`/api/rating/${ratingId}`, { rating: newRatingValue });
        dispatch({ type: UPDATE_RATING_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_RATING_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

// Delete Rating
export const deleteRating = (ratingId) => async (dispatch) => {
    dispatch({ type: DELETE_RATING_REQUEST });
    try {
        await api.delete(`/api/rating/${ratingId}`);
        dispatch({ type: DELETE_RATING_SUCCESS, payload: ratingId });
    } catch (error) {
        dispatch({ type: DELETE_RATING_FAILURE, payload: error.response?.data?.message || error.message });
    }
};
