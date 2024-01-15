import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import { CgMouse } from "react-icons/cg";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

// const product = {
//   name: "Blue Tshirt",
//   images: [{ url: top1 }],
//   price: "$500",
//   _id: "ammar",
// };

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    // console.log(loading, error, products, productCount);
    if (error) {
      return alert.error("error");
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Ecommerce" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Feature Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
