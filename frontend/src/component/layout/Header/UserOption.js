import React, { Fragment, useState } from "react";
import "./Header.css";
import { Backdrop } from "@material-ui/core";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import { logout } from "../../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const UserOption = ({ user }) => {
  const dispatch = useDispatch();
  // console.log("url", user.avatar.url);
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const alert = useAlert();

  const orders = () => {
    navigate("/orders");
  };
  const account = () => {
    navigate("/account");
  };
  const cart = () => {
    navigate("/cart");
  };
  const logoutUser = () => {
    // navigate("/logoutUser");
    dispatch(logout());
    alert.success("Logout successfully");
  };
  const dashboard = () => {
    navigate("/admin/dashboard");
  };
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <SpeedDial
        ariaLabel="speedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        style={{ zIndex: 11 }}
        icon={
          <img
            className="speedDialIcon"
            src={
              user.avatar.url !== "profile Url"
                ? user.avatar.url
                : "./Profile.png"
            }
            alt="profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          ></SpeedDialAction>
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOption;
