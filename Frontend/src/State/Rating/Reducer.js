import {
    CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, CREATE_RATING_FAILURE,
    GET_ALL_RATINGS_REQUEST, GET_ALL_RATINGS_SUCCESS, GET_ALL_RATINGS_FAILURE,
    UPDATE_RATING_REQUEST, UPDATE_RATING_SUCCESS, UPDATE_RATING_FAILURE,
    GET_RATING_BY_ID_REQUEST, GET_RATING_BY_ID_SUCCESS, GET_RATING_BY_ID_FAILURE,
    DELETE_RATING_REQUEST, DELETE_RATING_SUCCESS, DELETE_RATING_FAILURE
} from './Types';

const initialState = {
    ratings: [],
    rating: null,
    loading: false,
    error: null,
    success: false,
};

export const ratingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RATING_REQUEST:
        case GET_ALL_RATINGS_REQUEST:
        case UPDATE_RATING_REQUEST:
        case GET_RATING_BY_ID_REQUEST:
        case DELETE_RATING_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_RATING_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                rating: action.payload,
                error: null
            };

        case GET_ALL_RATINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                ratings: action.payload,
                error: null
            };

        case UPDATE_RATING_SUCCESS:
            return {
                ...state,
                loading: false,
                ratings: state.ratings.map(rating =>
                    rating._id === action.payload._id ? action.payload : rating
                ),
                success: true,
                error: null
            };

        case DELETE_RATING_SUCCESS:
            return {
                ...state,
                loading: false,
                ratings: state.ratings.filter(r => r._id !== action.payload),
                success: true,
                error: null
            };

        case GET_RATING_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                rating: action.payload,
                error: null
            };

        case CREATE_RATING_FAILURE:
        case GET_ALL_RATINGS_FAILURE:
        case UPDATE_RATING_FAILURE:
        case GET_RATING_BY_ID_FAILURE:
        case DELETE_RATING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};
