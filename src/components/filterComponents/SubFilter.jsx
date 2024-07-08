import React from "react";
import { AuthContext } from "../../authContext/AuthContextProvider";

function SubFilter() {
  const {
    TaskPerformedProductData,
    setSearchValue,
    setAllFilters,
    setSelectedOption,
  } = React.useContext(AuthContext);
  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-start custom-select-container">
        <div>
          <h3 className="comon-font-2">Filters</h3>
          <p className="comon-small-font">
            {TaskPerformedProductData.length} results
          </p>
        </div>
        <div>
          <button
            className="clear-btn"
            onClick={() => {
              setSearchValue("");
              setAllFilters({
                category: null,
                price: null,
                color: null,
                gender: null,
              });
              setSelectedOption("");
            }}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubFilter;
