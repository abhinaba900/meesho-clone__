import React, { useContext, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../../authContext/AuthContextProvider";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

import { v4 as uuid } from "uuid";

import { TreggerWithSort } from "../../functions/TreggerWithSort";

function GenderFilter() {
  const {
    TaskPerformedProductData,
    allFilters,
    setAllFilters,
    MainVariableForProducts,
    setTaskPerformedProductData,
    searchValue,
    firstLoad,
    setFirstLoad,
    searchProductCointainer,
    selectedOption,
  } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  // Extract unique genders from product data
  const genders = useMemo(() => {
    const filteredGenders = TaskPerformedProductData.map(
      (item) => item?.gender
    ).filter(Boolean);
    return [...new Set(filteredGenders)];
  }, [TaskPerformedProductData]);

  // Filter data based on all active filters
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    const filteredData = MainVariableForProducts?.filter(
      (item) =>
        (!allFilters?.color || item?.color === allFilters?.color) &&
        (!allFilters?.price ||
          (item?.price >= allFilters?.price[0] &&
            item?.price <= allFilters?.price[1])) &&
        (!searchValue ||
          ((!allFilters?.category || item?.category === allFilters?.category) &&
            (!allFilters?.gender || item?.gender === allFilters?.gender))) &&
        (!searchValue ||
          item?.name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
          item?.color?.toLowerCase().includes(searchValue?.toLowerCase()) ||
          item?.category?.toLowerCase().includes(searchValue?.toLowerCase()) ||
          item?.gender?.toLowerCase().includes(searchValue?.toLowerCase()))
    );
    setTaskPerformedProductData(TreggerWithSort(selectedOption, filteredData));
  }, [allFilters, MainVariableForProducts, setTaskPerformedProductData]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleGenderSelect = (gender) => {
    const newGender = allFilters.gender === gender ? "" : gender;
    setAllFilters({ ...allFilters, gender: newGender });
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={toggleDropdown}
        style={{ cursor: "pointer" }}
        className="d-flex align-items-center justify-content-between"
      >
        <h3 className="comon-font-2">Gender</h3>
        {isOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
      </div>
      {isOpen && (
        <div className="w-100 d-flex flex-wrap gap-3 comon-font">
          {genders.map((gender) => (
            <label
              key={uuid()}
              onClick={() => handleGenderSelect(gender)}
              className={`d-flex align-items-center gap-2 hover-text text-gender-section ${
                allFilters.gender === gender ? "selected" : ""
              }`}
              style={{
                fontSize: "14px",
                fontWeight: "400",
                cursor: "pointer",
                border: "1px solid #ddd",
                borderRadius: "15px",
                padding: "5px 10px",
                backgroundColor:
                  allFilters.gender === gender ? "#f0c2e0" : "white",
              }}
            >
              {gender}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenderFilter;
