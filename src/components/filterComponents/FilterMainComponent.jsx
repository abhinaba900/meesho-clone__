import React from "react";
import SortComponent from "./SortComponent";
import "../../css/FilterMainComponent.css";
import SubFilter from "./SubFilter";
import CategoryFilter from "./CategoryFilter";
import GenderFilter from "./GenderFilter";
import ColorFilter from "./ColorFilter";
import PriceFilter from "./PriceRangeFilter";

function FilterMainComponent() {
  return (
    <div className="w-30 d-flex flex-column align-items-center gap-3">
      <SortComponent />
      <div className="parent-container-filter">
        <SubFilter />
        <hr />
        <CategoryFilter />
        <hr />
        <GenderFilter />
        
        <ColorFilter />
        <hr />
        <PriceFilter />
      </div>
    </div>
  );
}

export default FilterMainComponent;
