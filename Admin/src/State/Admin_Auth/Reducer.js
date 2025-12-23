import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "./Types"

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: localStorage.getItem('jwt') || null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
        case LOGIN_USER_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null };

        case REGISTER_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload.jwt }; // Save JWT in state

        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload };

        case REGISTER_USER_FAILURE:
        case LOGIN_USER_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case LOGOUT:
            return { ...initialState, jwt: null }; // Reset state and remove JWT

        default:
            return state;
    }
};