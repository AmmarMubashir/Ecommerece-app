import React, { useEffect } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { UseDispatch, useDispatch } from "react-redux";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const data = sessionStorage.getItem("orderInfo");
  // dispatch(data, jwt);

  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
