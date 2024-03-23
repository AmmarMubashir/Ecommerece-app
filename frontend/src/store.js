import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newReviewReducer,
  productDetailReducer,
  productReducers,
} from "./reducers/productReducers";
import {
  forgotPasswordReducer,
  profileReducers,
  userReducers,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailReducer,
  user: userReducers,
  profile: profileReducers,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrders: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
