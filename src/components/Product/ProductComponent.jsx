import React from "react";
import { AuthContext } from "../../authContext/AuthContextProvider";
import ProductCard from "./ProductCard";
import Loading from "../../Loading";
import { v4 as uuid } from "uuid";

function ProductComponent() {
  const { TaskPerformedProductData, loader } =
    React.useContext(AuthContext);

  return (
    <div className="w-60">
      <div className="product-card-parent-container">
        {loader ? (
          <div className="temp-loader">
            <Loading />
          </div>
        ) : TaskPerformedProductData.length > 0 ? (
          TaskPerformedProductData.map((item) => (
            <ProductCard item={item} ids={item.id} key={uuid()} />
          ))
        ) : (
          <h1
            className="text-center text-danger temp-loader"
            style={{
              width: "100%",
              height: "100%",
              margin: "auto",
              marginTop: "10vh",
              marginLeft: "100%",
            }}
          >
            No Products Found
          </h1>
        )}
      </div>
    </div>
  );
}

export default ProductComponent;
