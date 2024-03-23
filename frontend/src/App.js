import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import UserOption from "./component/layout/Header/UserOption";
import Profile from "./component/User/Profile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrder";
import OrderDetails from "./component/Order/OrderDetails";
import Payment from "./component/Cart/Payment.js";

import { Element } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "./App.css";

import WebFont from "webfontloader";
import LoginSignUp from "./component/User/LoginSignup";
import { loadUser } from "./actions/userActions";

import store from "./store";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";

import axios from "axios";
import { API_URL } from "./config/config.js";
import Prepayment from "./component/Cart/Prepayment.js";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, SetstripeApiKey] = useState("");
  // console.log(jwt, "JQQQ");
  // async function getStripeApiKey(jwt) {
  //   const { data } = await axios.get(`${API_URL}api/v1/stripeapiKey`, {
  //     headers: {
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //   });

  //   // SetstripeApiKey(data.stripeApiKey);
  //   // console.log(data.stripeApiKey);
  // }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sense", "Chilanka"],
      },
    });

    const jwt = localStorage.getItem("jwt");
    store.dispatch(loadUser(jwt));

    // getStripeApiKey(jwt);
    // console.log(stripeApiKey, "APP stripe key");
  }, []);
  return (
    <Router>
      {/* <Header /> */}
      {isAuthenticated && <UserOption user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route element={<ProtectedRoute />}>
          <Route path="account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/login/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>

        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/process/payment" element={<Prepayment />} /> */}

        {/* {stripeApiKey && (
          <Element stripe={loadStripe(stripeApiKey)}>
          </Element>
        )} */}
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
