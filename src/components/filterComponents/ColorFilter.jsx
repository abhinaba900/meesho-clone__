import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { AuthContext } from "../../authContext/AuthContextProvider";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import debounce from "lodash/debounce"; // Import debounce function
import { v4 as uuid } from "uuid";
import { TreggerWithSort } from "../../functions/TreggerWithSort";

function ColorFilter() {
  const {
    TaskPerformedProductData,
    allFilters,
    setAllFilters,
    MainVariableForProducts,
    setTaskPerformedProductData,
    searchValue,
    firstLoad,
    setFirstLoad,
    selectedOption,
  } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Memoize color list to avoid recalculations on each render
  const colors = useMemo(() => {
    const uniqueColors = new Set(
      TaskPerformedProductData.map((item) => item?.color).filter(Boolean)
    );
    return Array.from(uniqueColors);
  }, [TaskPerformedProductData]);

  // Debounce search function for filtering products
  const debouncedSearch = useCallback(
    debounce((value) => {
      const filteredData = MainVariableForProducts.filter((item) =>
        itemFilters(item, value)
      );
      setTaskPerformedProductData(
        TreggerWithSort(selectedOption, filteredData)
      );
    }, 500),
    [MainVariableForProducts, allFilters, setTaskPerformedProductData]
  );

  const itemFilters = (item, value) => {
    const searchLower = searchValue?.toLowerCase();
    return (
      (!allFilters?.color || item?.color === allFilters?.color) &&
      (!allFilters?.price ||
        priceRangeFilter(item?.price, allFilters?.price)) &&
      (!allFilters?.gender || item?.gender === allFilters?.gender) &&
      (!allFilters?.category || item?.category === allFilters?.category) &&
      (!searchLower ||
        item?.name?.toLowerCase().includes(searchLower) ||
        item?.color?.toLowerCase().includes(searchLower) ||
        item?.category?.toLowerCase().includes(searchLower) ||
        item?.gender?.toLowerCase().includes(searchLower))
    );
  };

  const priceRangeFilter = (price, filter) => {
    if (Array.isArray(filter)) {
      return price >= filter[0] && price <= filter[1];
    }
    return price >= filter;
  };

  
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    debouncedSearch(searchValue);
  }, [allFilters, searchValue, debouncedSearch, firstLoad]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleColorSelect = (color) => {
    setAllFilters((prev) => ({
      ...prev,
      color: prev.color === color ? null : color,
    }));
  };

  return (
    <div ref={ref}>
      <hr />
      {colors.length > 0 && (
        <div style={{ position: "relative" }}>
          <div
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
            className="d-flex align-items-center justify-content-between"
          >
            <h3 className="comon-font-2">Color</h3>
            {isOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
          </div>
          {isOpen && (
            <div className="w-100 d-flex flex-wrap gap-3 common-font">
              {colors.map((color) => (
                <label
                  key={uuid()}
                  onClick={() => handleColorSelect(color)}
                  className={`d-flex align-items-center gap-2 hover-text text-gender-section ${
                    allFilters.color === color ? "selected" : ""
                  }`}
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    cursor: "pointer",
                    border: "1px solid #ddd",
                    borderRadius: "15px",
                    padding: "5px 10px",
                    backgroundColor:
                      allFilters.color === color ? "#f0c2e0" : "white",
                  }}
                >
                  {color}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ColorFilter;
