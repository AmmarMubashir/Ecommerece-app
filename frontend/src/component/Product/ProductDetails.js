import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productDetails);

  useEffect(() => {
    console.log(products);
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  return (
    <Fragment>
      <div className="ProductDetails">
        <div>
          <Carousel>
            {products.images &&
              products.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
