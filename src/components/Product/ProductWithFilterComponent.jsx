import React from "react";
import FilterMainComponent from "../filterComponents/FilterMainComponent";
import ProductComponent from "./ProductComponent";
import { AuthContext } from "../../authContext/AuthContextProvider";

function ProductWithFilterComponent() {
  const { searchValue } = React.useContext(AuthContext);
  return (
    <div>
      <h2 className=" ml-5  fs-1" style={{ marginLeft: "8%" }}>
        {searchValue?.toUpperCase()}
      </h2>
      <div className="container d-flex  align-items-start gap-5">
        <FilterMainComponent />
        <ProductComponent />
      </div>
    </div>
  );
}

export default ProductWithFilterComponent;
