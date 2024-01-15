import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";

import "./App.css";

import WebFont from "webfontloader";

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sense", "Chilanka"],
      },
    });
  }, []);
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
