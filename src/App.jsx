import "./App.css";
import { products } from "./products";
import { useState, useEffect, useRef } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const [list, setList] = useState(products);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = products.reduce((acc, curr) => {
    if (acc.indexOf(curr.category) === -1) {
      return [...acc, curr.category];
    }
    return acc;
  }, []);

  console.log(categories);

  const handleSearch = () => {
    if (value === "") {
      setList(products);
      return;
    }

    const avail = products.filter((item) =>
      item.category.toLowerCase().includes(value.toLowerCase()),
    );
    setList(avail);
  };

  const handleCategory = (cat) => {
    if (cat === "all") {
      setList(products);
      setOpen(false);
      return;
    }
    const avail = products.filter((item) => item.category === cat);
    setList(avail);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <main className="app-main">
        <div className="top-bar">
          <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-button" onClick={() => setOpen(!open)}>
              Category
            </button>

            <div className={`dropdown-menu ${open ? "show" : ""}`}>
              <button
                onClick={() => {
                  handleCategory("all");
                }}
                className="dropdown-menu-button"
              >
                All
              </button>
              {categories.map((item) => (
                <button
                  onClick={() => {
                    handleCategory(item);
                  }}
                  className="dropdown-menu-button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <input
            placeholder="Search for a product"
            className="bar-input"
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="container">
          {list.map((item) => (
            <ProductCard key={item.name} item={item} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
