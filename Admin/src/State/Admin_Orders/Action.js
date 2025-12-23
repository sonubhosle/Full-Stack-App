import { api } from '../../Config/apiConfig'
import { CANCELED_ORDER_FAILURE, CANCELED_ORDER_REQUEST, CANCELED_ORDER_SUCESS, CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCESS } from './Types'


export const getOrder = () => async (dispatch) => {
    dispatch({ type: GET_ORDER_REQUEST });
    try {

        const response = await api.get(`/api/admin/orders/`);
        dispatch({ type: GET_ORDER_SUCCESS, payload: response.data })

    } catch (error) {
        dispatch({ type: GET_ORDER_FAILURE, payload: error.message })

    }
}


export const confirmOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CONFIRMED_ORDER_REQUEST });

    try {

        const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);

        const data = response.data;
        dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error.message })
    }
}



export const shipOrder = (orderId) => async (dispatch) => {
    dispatch({ type: SHIP_ORDER_REQUEST });

    try {

        const { data } = await api.put(`/api/admin/orders/${orderId}/ship`);
        dispatch({ type: SHIP_ORDER_SUCESS, payload: data });

    } catch (error) {
        dispatch({ type: SHIP_ORDER_FAILURE, payload: error.message })
    }
}


export const deliverOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELIVERED_ORDER_REQUEST });

    try {

        const response = await api.put(`/api/admin/orders/${orderId}/deliver`);
        const data = response.data;
        dispatch({ type: DELIVERED_ORDER_SUCESS, payload: data });

    } catch (error) {
        dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error.message })
    }
}


export const cancelOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CANCELED_ORDER_REQUEST });

    try {

        const response = await api.put(`/api/admin/orders/${orderId}/cancel`);
        const data = response.data;
        dispatch({ type: CANCELED_ORDER_SUCESS, payload: data });

    } catch (error) {
        dispatch({ type: CANCELED_ORDER_FAILURE, payload: error.message })
    }
}



export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST });
 

    try {

        const { data } = await api.delete(`/api/admin/orders/${orderId}/delete`);
        dispatch({ type: DELETE_ORDER_SUCESS, payload: data });

    } catch (error) {
        dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message })
    }
}