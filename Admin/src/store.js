import { applyMiddleware, legacy_createStore, combineReducers } from 'redux'
import { thunk } from 'redux-thunk';
import { authReducer } from './State/Admin_Auth/Reducer';
import { productReducer } from './State/Admin_Products/Reducer';
import { adminOrderReducer } from './State/Admin_Orders/Reducer';


const rootReducers = combineReducers({
   auth: authReducer,
   products: productReducer,
   adminOrder: adminOrderReducer,
})


export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));