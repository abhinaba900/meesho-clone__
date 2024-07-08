import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { AuthContext } from "../../authContext/AuthContextProvider";

function SortComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    setTaskPerformedProductData,
    MainVariableForProducts,
    allFilters,
    searchValue,
    selectedOption,
    setSelectedOption,
  } = useContext(AuthContext);

  useEffect(() => {
    let data = MainVariableForProducts;

    // Filter based on search value
    if (searchValue) {
      data = data?.filter(
        (item) =>
          item?.name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
          item?.color?.toLowerCase().includes(searchValue?.toLowerCase()) ||
          item?.category?.toLowerCase().includes(searchValue?.toLowerCase()) ||
          item?.gender?.toLowerCase().includes(searchValue?.toLowerCase())
      );
    }

    // Filter based on category
    if (allFilters?.category) {
      data = data?.filter((item) => item.category === allFilters?.category);
    }

    // Filter based on price
    if (allFilters?.price || allFilters?.price === 0) {
      data = data?.filter((item) =>
        Array.isArray(allFilters.price)
          ? item.price >= allFilters?.price[0] &&
            item.price <= allFilters?.price[1]
          : item.price >= allFilters?.price
      );
    }

    // Filter based on gender
    if (allFilters?.gender) {
      data = data?.filter((item) => item.gender === allFilters?.gender);
    }

    // Filter based on color
    if (allFilters?.color) {
      data = data?.filter((item) => item.color === allFilters?.color);
    }

    // Sort data
    if (selectedOption === "asc") {
      data = [...data].sort((a, b) => a.price - b.price);
    } else if (selectedOption === "desc") {
      data = [...data].sort((a, b) => b.price - a.price);
    }
    else if (selectedOption === "rating") {
      data = [...data].sort((a, b) => b.star - a.star);
    }

    setTaskPerformedProductData(data);
  }, [MainVariableForProducts, allFilters, searchValue, selectedOption]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const options = [
    { value: "Relevance", text: "Relevance" },
    { value: "asc", text: "Price (low to high)" },
    { value: "desc", text: "Price (high to low)" },
    { value: "rating", text: "Rating" },
  ];

  return (
    <div className="sort-parent-container">
      <span className="w-25">Sort by:</span>
      <div className="custom-select-container">
        <div className="custom-select-display" onClick={toggleDropdown}>
          {selectedOption
            ? options.find((o) => o.value === selectedOption).text
            : "Select an option"}
          <span className="custom-select-arrow">
            {isOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
          </span>
        </div>
        {isOpen && (
          <div className="custom-select-options">
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option.value)}
                className="custom-option"
              >
                {option.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SortComponent;
