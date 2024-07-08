import React, { useEffect } from "react";
import { data } from "../data";

export const AuthContext = React.createContext();

function AuthContextProvider({ children }) {
  const [MainVariableForProducts, setMainVariableForProducts] =
    React.useState(data);

  const [TaskPerformedProductData, setTaskPerformedProductData] =
    React.useState(data);
  const [searchProductCointainer, setSearchProductCointainer] = React.useState(
    []
  );
  const [searchValue, setSearchValue] = React.useState(null);

  const [allFilters, setAllFilters] = React.useState({
    category: null,
    gender: null,
    color: null,
    price: null,
  });
  const [selectedOption, setSelectedOption] = React.useState("");

  const [loader, setLoader] = React.useState(true);
  const [firstLoad, setFirstLoad] = React.useState(true);

  // useEffect(() => {
  //   try {
  //     fetch("http://localhost:3001/products", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setMainVariableForProducts(data);
  //         setTaskPerformedProductData(data);
  //       })
  //       .catch((err) => console.log(err));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  return (
    <AuthContext.Provider
      value={{
        MainVariableForProducts,
        setMainVariableForProducts,
        TaskPerformedProductData,
        setTaskPerformedProductData,
        searchProductCointainer,
        setSearchProductCointainer,
        searchValue,
        setSearchValue,
        allFilters,
        setAllFilters,
        loader,
        setLoader,
        firstLoad,
        setFirstLoad,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
