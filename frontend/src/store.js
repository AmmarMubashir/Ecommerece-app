import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailReducer,
  productReducers,
} from "./reducers/productReducers";
import { userReducers } from "./reducers/userReducers";

const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailReducer,
  user: userReducers,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
