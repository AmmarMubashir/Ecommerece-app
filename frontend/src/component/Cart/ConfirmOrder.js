import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { API_URL } from "../../config/config";
import axios from "axios";
import { useAlert } from "react-alert";
import { createOrder, clearErrors } from "../../actions/orderAction";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrders);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = async () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    const jwt = localStorage.getItem("jwt");

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    // navigate("/process/payment");
    // console.log("confirm");

    // axios
    //   .post(`${API_URL}api/v1/checkout_session/6559ea3616dc2773598c2dd8`)
    //   .then((res) => {
    //     console.log(res.data.success);
    //     if (res.data.url) {
    //       window.location.href = res.data.url;
    //       // console.log(res);
    //     }
    //   })
    //   .catch((err) => console.log(err));

    dispatch(createOrder(data, jwt));

    // setTimeout(() => dispatch(createOrder(data, jwt)), 1000);

    try {
      const res = await axios.post(
        `${API_URL}api/v1/checkout_session/6559ea3616dc2773598c2dd8`
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
