import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaClockRotateLeft, FaLocationDot } from "react-icons/fa6";
import { AuthContext } from "../../../authContext/AuthContextProvider";
import debounce from "lodash/debounce";
import { v4 as uuid } from "uuid";
import { TreggerWithSort } from "../../../functions/TreggerWithSort";

function SearchBox() {
  const [showTheDropdown, setShowTheDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [resentSearch, setResentSearch] = useState([]);
  const {
    MainVariableForProducts,
    setTaskPerformedProductData,
    setSearchProductCointainer,
    searchValue,
    setSearchValue,
    allFilters,
    firstLoad,
    setFirstLoad,
    selectedOption,
    setLoader,
  } = React.useContext(AuthContext);
  const [popularSearch, setPopularSearch] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestionsCategory, setSuggestionsCategory] = useState([]);

  const toggleDropdown = useCallback(() => {
    setShowTheDropdown((prev) => !prev);
  }, []);

  useEffect(() => {
    const sortedProductsByName = [...MainVariableForProducts].sort((a, b) => {
      const nameA = a.name.trim();
      const nameB = b.name.trim();

      const containsDigitsA = /\d/.test(nameA);
      const containsDigitsB = /\d/.test(nameB);

      if (!containsDigitsA && containsDigitsB) {
        return -1;
      } else if (containsDigitsA && !containsDigitsB) {
        return 1;
      }

      return nameA.localeCompare(nameB);
    });

    setPopularSearch(sortedProductsByName);
    const dropdownContent = MainVariableForProducts?.filter((item) =>
      item?.name?.toLowerCase().includes(searchValue?.toLowerCase())
    );

    console.log("dropdownContent", dropdownContent);

    setSuggestions(dropdownContent);

    if (dropdownContent.length > 0) {
      const findUniqueCategory = [
        ...new Set(dropdownContent.map((item) => item.category)),
      ];
      setSuggestionsCategory(findUniqueCategory);
    }
  }, [MainVariableForProducts, searchValue]);

  useEffect(() => {
    if (
      !searchValue &&
      Object.values(allFilters).every(
        (val) => !val || (Array.isArray(val) && val.length === 0)
      )
    ) {
      setTaskPerformedProductData(TreggerWithSort(selectedOption, MainVariableForProducts));
    }
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTheDropdown(false);
        setIsTyping(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [showTheDropdown, searchValue]);

  useEffect(() => {
    setLoader(true);
    const timer = setTimeout(() => {
      setLoader(false);
      executeSearch(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue && searchValue.length > 0]);

  useEffect(() => {
    setIsTyping(!!searchValue);
    const dropdownContent = MainVariableForProducts?.filter((item) =>
      item?.name?.toLowerCase().includes(searchValue?.toLowerCase())
    );
    setSuggestions(dropdownContent);
  }, [MainVariableForProducts, searchValue, showTheDropdown]);

  const handleSearch = (value) => {
    setSearchValue(value);
    setIsTyping(() => false);
    toggleDropdown();
  };

  const executeSearch = useCallback(
    debounce((value) => {
      if (firstLoad) {
        setFirstLoad(false);
        return;
      }
      setLoader(true);
      const searchLower = value?.toLowerCase();
      const filteredData = MainVariableForProducts?.filter((item) =>
        item?.name?.toLowerCase().includes(searchLower)
      );
      setSearchProductCointainer(TreggerWithSort(selectedOption, filteredData));
      setTaskPerformedProductData(
        TreggerWithSort(selectedOption, filteredData)
      );
      setLoader(false);
      setResentSearch((prev) => [...new Set([value, ...prev])]);
    }, 300),
    [
      MainVariableForProducts,
      setLoader,
      setSearchProductCointainer,
      setTaskPerformedProductData,
      firstLoad,
      setFirstLoad,
      searchValue,
    ]
  );

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdbtn">
        <div className="ui icon input rem25">
          <input
            required
            className="prompt"
            type="text"
            placeholder="Search By Product code"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={toggleDropdown}
          />
          <i className="icon search" />
        </div>
      </div>
      <div className={`dropdown-content-2${isTyping ? "show-2" : ""}`}>
        {suggestions?.length > 0 &&
          suggestionsCategory?.map((category) => (
            <div key={uuid()}>
              <div className="poppins-bold common-font-2 d-flex flex-column align-items-start gap-2">
                <span className="poppins-bold">{category}</span>
                {suggestions
                  ?.filter((item) => item.category === category)
                  .map((item) => (
                    <span
                      className="poppins-regular"
                      key={uuid()}
                      onClick={() => {
                        handleSearch(item.name);
                        setIsTyping(false);
                      }}
                      style={{ cursor: "pointer", width: "100%" }}
                    >
                      <FaLocationDot /> {item.name}
                    </span>
                  ))}
              </div>
            </div>
          ))}
      </div>

      <div
        className={`dropdown-content${showTheDropdown ? "show" : ""}`}
        onClick={() => setIsTyping(false)}
      >
        <div className="inside-dropdon-content">
          <h5 className="poppins-semibold">Recent Searches</h5>
          <div
            className="d-flex gap-3 flex-wrap mt-3"
            style={{
              height: "80px",
              overflowY: "scroll",
            }}
          >
            {resentSearch
              .filter((item) => item !== "")
              ?.sort((a, b) => b - a)
              .map((item) => (
                <div
                  className="d-flex align-items-center gap-3 hover-effect"
                  key={uuid()}
                  onClick={() => handleSearch(item)}
                >
                  <FaClockRotateLeft />
                  <p className="poppins-regular">{item}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="inside-dropdon-content mt-3">
          <h5 className="poppins-semibold">Popular Searches</h5>
          <div className="" style={{ height: "200px", overflowY: "scroll" }}>
            {popularSearch?.map((item) => (
              <div
                className=""
                key={uuid()}
                onClick={() => {
                  handleSearch(item?.name);
                }}
              >
                <h4 className="poppins-bold comon-font-2 d-flex gap-2 align-items-center justify-content-between">
                  <span className="poppins-regular border-right">
                    <FaLocationDot /> {item.name}
                  </span>{" "}
                  <span className="border-left">{item?.category}</span>
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
