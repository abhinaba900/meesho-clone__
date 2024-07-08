import "./App.css";
import ProductWithFilterComponent from "./components/Product/ProductWithFilterComponent";
import MainNavbar from "./components/searchbarComponents/MainNavbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <MainNavbar />
      <ProductWithFilterComponent />
    </div>
  );
}

export default App;
