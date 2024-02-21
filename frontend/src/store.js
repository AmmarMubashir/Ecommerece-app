import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailReducer,
  productReducers,
} from "./reducers/productReducers";
import {
  forgotPasswordReducer,
  profileReducers,
  userReducers,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailReducer,
  user: userReducers,
  profile: profileReducers,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
