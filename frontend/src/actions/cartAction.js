import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import { API_URL } from "../config/config";

import axios from "axios";

// Add item to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${API_URL}api/v1/admin/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//  Remove item from cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
