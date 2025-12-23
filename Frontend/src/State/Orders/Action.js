import { api } from "../../Config/apiConfig"
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER, GET_ALL_ORDERS_FAILURE, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, LOGOUT, RESET_ORDERS } from "./Types"

export const createOrder = (reqData) => async (dispatch) => {

    dispatch({ type: CREATE_ORDER_REQUEST })

    try {

        const { data } = await api.post('/api/orders/create', reqData.address);
        if (data._id) {
            reqData.navigate({ search: `step=3&order_id=${data._id}` });
        }
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message })

    }


}

export const getOrderById = (orderId) => async (dispatch) => {

    dispatch({ type: GET_ORDER_BY_ID_REQUEST })

    try {

        const { data } = await api.get(`/api/orders/${orderId}`);

        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data })

    } catch (error) {

        dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message })
    }

}


export const getAllOrders = () => async (dispatch) => {
    dispatch({ type: GET_ALL_ORDERS_REQUEST });

    try {
        const { data } = await api.get('/api/orders/');
        dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_ORDERS_FAILURE, payload: error.message });
    }
};


export const deleteOrder = (orderId) => async (dispatch) => {
    try {
        await api.delete(`/api/orders/${orderId}`);
        dispatch({ type: DELETE_ORDER, payload: orderId });
    } catch (error) {
        console.error('Failed to delete order:', error);
    }
};

export const resetOrders = () => ({ type: RESET_ORDERS });

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT }); 
};
