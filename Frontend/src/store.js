import { applyMiddleware, legacy_createStore, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { authReducer } from './State/Authentication/Reducer';
import { productReducer } from './State/Products/Reducer';
import { cartReducer } from './State/Carts/Reducer';
import { orderReducer } from './State/Orders/Reducer';
import { reviewsReducer } from './State/Reviews/Reducer';
import { ratingsReducer } from './State/Rating/Reducer';
import { addressReducer } from './State/Address/Reducer';
import { wishlistReducer } from './State/Wishlist/Reducer';
import { adminOrderReducer } from './Admin/State/Admin_Orders/Reducer';
import { AdminProductReducer } from './Admin/State/Admin_Products/Reducer';

const rootReducers = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  reviews: reviewsReducer,
  ratings: ratingsReducer,
  address: addressReducer,
  wishlist: wishlistReducer,
  adminProducts: AdminProductReducer,
  adminOrder: adminOrderReducer,
})


export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));