import { React, Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (loading) {
    return <Loader />;
  }

  return isAuthenticated ? <Outlet /> : navigate("/login");
};

export default ProtectedRoute;
