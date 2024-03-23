import axios from "axios";
import { API_URL } from "../config/config";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstant";

export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let request = `${API_URL}api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        request = `${API_URL}api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(request);
      // console.log(data);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
        error,
      });
    }
  };

// export const getProductDetails = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_DETAILS_REQUEST });

//     const { data } = await axios.get(`/api/v1/product/${id}`);

//     dispatch({
//       type: PRODUCT_DETAILS_SUCCESS,
//       payload: data.product,
//     });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_DETAILS_FAIL,
//       payload: error.response.data.message,
//       error,
//     });
//   }
// };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${API_URL}api/v1/admin/product/${id}`);
    // console.log(data);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData, jwt) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    // const config = {
    //   headers: { "Content-Type": "application/json" },
    // };

    const { data } = await axios.put(`${API_URL}api/v1/review`, reviewData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// for clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
