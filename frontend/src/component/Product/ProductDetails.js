import React, { Fragment, useLayoutEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  // const { products, loading } = useSelector((state) => state.productDetails);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useLayoutEffect(() => {
    if (error) {
      alert.message(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
    // console.log(product);
  }, [dispatch, id, error, alert]);

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />

          <div className="ProductDetails">
            <div>
              <Carousel className="CarouselImg">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailBlock-3">
                <h1>{`${product.price}`}</h1>
                <div className="detailBlock-3-1">
                  <div className="detailBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Out of Stock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
