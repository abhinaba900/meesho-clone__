import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../authContext/AuthContextProvider";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

import { v4 as uuid } from "uuid";

import { TreggerWithSort } from "../../functions/TreggerWithSort";

function PriceFilter() {
  const {
    searchValue,
    setTaskPerformedProductData,
    allFilters,
    setAllFilters,
    MainVariableForProducts,
    setLoader,
    firstLoad,
    setFirstLoad,
    searchProductCointainer,
    selectedOption,
  } = useContext(AuthContext);
  const [priceRanges, setPriceRanges] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const ranges = [
      { label: `Under ₹1000`, value: [0, 1000] },
      { label: `₹1000 - ₹5000`, value: [1000, 5000] },
      { label: `Above ₹5000`, value: [5000, Infinity] },
    ];

    setPriceRanges(ranges);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePriceSelect = (price) => {
    if (selectedPrice === price) {
      setSelectedPrice(null);
      setAllFilters({ ...allFilters, price: null });
    } else {
      setSelectedPrice(price);
      setAllFilters({ ...allFilters, price });
    }
  };

  useEffect(() => {
    setLoader(true);
    const timer = setTimeout(() => {
      let filteredData = MainVariableForProducts;

      if (firstLoad) {
        setFirstLoad(false);
        return;
      }

      if (searchValue && searchProductCointainer?.length > 0) {
        filteredData = filteredData?.filter(
          (item) =>
            item?.name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
            item?.color?.toLowerCase().includes(searchValue?.toLowerCase()) ||
            item?.category
              ?.toLowerCase()
              .includes(searchValue?.toLowerCase()) ||
            item?.gender?.toLowerCase().includes(searchValue?.toLowerCase())
        );
      }

      if (allFilters?.color) {
        filteredData = filteredData?.filter(
          (item) => item?.color === allFilters?.color
        );
      }

      if (allFilters?.price) {
        filteredData = filteredData?.filter((item) =>
          Array.isArray(allFilters?.price)
            ? item?.price >= allFilters?.price[0] &&
              item?.price <= allFilters?.price[1]
            : item?.price === allFilters?.price
        );
      }

      if (allFilters?.category) {
        filteredData = filteredData?.filter(
          (item) => item?.category === allFilters?.category
        );
      }

      if (allFilters?.gender) {
        filteredData = filteredData?.filter(
          (item) => item?.gender === allFilters?.gender
        );
      }

      setTaskPerformedProductData(
        TreggerWithSort(selectedOption, filteredData)
      );
      setLoader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [allFilters, MainVariableForProducts, setTaskPerformedProductData]);

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={toggleDropdown}
        style={{ cursor: "pointer" }}
        className="d-flex align-items-center justify-content-between"
      >
        <h3 className="comon-font-2">Price</h3>
        {isOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
      </div>
      {isOpen && (
        <div className="w-100 d-flex flex-wrap gap-3 comon-font">
          {priceRanges.map((item, index) => (
            <button
              key={uuid()}
              onClick={() => handlePriceSelect(item.value)}
              className={`d-flex align-items-center gap-2 hover-text text-gender-section ${
                selectedPrice === item.value ? "selected" : ""
              }`}
              style={{
                fontSize: "14px",
                fontWeight: "400",
                cursor: "pointer",
                border: "1px solid #ddd",
                borderRadius: "15px",
                padding: "5px 10px",
                backgroundColor:
                  selectedPrice === item.value ? "#f0c2e0" : "white",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default PriceFilter;
