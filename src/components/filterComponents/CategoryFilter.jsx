import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../../authContext/AuthContextProvider";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import debounce from "lodash.debounce";
import { TreggerWithSort } from "../../functions/TreggerWithSort";

function CategoryFilter() {
  const {
    TaskPerformedProductData,
    allFilters,
    setAllFilters,
    MainVariableForProducts,
    setTaskPerformedProductData,
    searchProductCointainer,
    searchValue,
    firstLoad,
    setFirstLoad,
    selectedOption,
  } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const categories = TaskPerformedProductData.map(
    (item) => item?.category
  ).filter(Boolean);
  const uniqueCategories = Array.from(new Set(categories));

  const handleCategoryFilter = useCallback(
    debounce(() => {
      if (firstLoad) {
        setFirstLoad(false);
        return;
      }
      let sourceData =
        searchProductCointainer.length > 0
          ? searchProductCointainer
          : MainVariableForProducts;
      let filteredData = sourceData.filter((item) => {
        return (
          (!searchValue ||
            Object.keys(item).some((key) =>
              item[key]
                ?.toString()
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            )) &&
          (!allFilters.gender ||
            item.gender?.toLowerCase() === allFilters.gender.toLowerCase()) &&
          (!allFilters.color ||
            item.color?.toLowerCase() === allFilters.color.toLowerCase()) &&
          (!allFilters.price ||
            (item.price >= allFilters.price[0] &&
              item.price <= allFilters.price[1])) &&
          (!allFilters.category ||
            item.category?.toLowerCase() === allFilters.category.toLowerCase())
        );
      });

      setTaskPerformedProductData(
        TreggerWithSort(selectedOption, filteredData)
      );
    }, 300),
    [
      firstLoad,
      allFilters,
      searchProductCointainer,
      MainVariableForProducts,
      searchValue,
      selectedOption,
      setFirstLoad,
      setTaskPerformedProductData,
    ]
  );

  useEffect(() => {
    handleCategoryFilter();
    return () => handleCategoryFilter.cancel();
  }, [handleCategoryFilter]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={toggleDropdown}
        style={{ cursor: "pointer" }}
        className="d-flex align-items-center justify-content-between"
      >
        <h3 className="comon-font-2">Category</h3>
        {isOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
      </div>
      {isOpen && (
        <div className="w-100 d-flex flex-wrap gap-3 common-font">
          {uniqueCategories.map((item, index) => (
            <label
              key={index}
              className="d-flex align-items-center gap-2 hover-text"
              style={{ fontSize: "14px", fontWeight: "400", cursor: "pointer" }}
            >
              <input
                type="checkbox"
                checked={allFilters?.category === item}
                onChange={(e) => {
                  const newCategory = e.target.checked ? item : "";
                  setAllFilters((prev) => ({
                    ...prev,
                    category: newCategory,
                  }));
                  handleCategoryFilter();
                }}
                value={item}
              />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryFilter;
