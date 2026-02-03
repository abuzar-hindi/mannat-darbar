import React, { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { Link } from "react-router-dom";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  // top-level diet categories (values: "Veg", "Non-Veg")
  const [category, setCategory] = useState([]);
  // product-level subcategories (derived from product.category, e.g. "Biryani", "Chinese Starter")
  const [subCategory, setSubCategory] = useState([]);
  // spice-level filters (mild / medium / high)
  const [spiceLevelFilter, setSpiceLevelFilter] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [bestsellerOnly, setBestsellerOnly] = useState(false);

  const [orderType, setOrderType] = useState(
    localStorage.getItem("orderType") || "Home Delivery",
  );



  // dynamically compute subcategories available for the selected top-level category(ies)
  const availableSubcategories = useMemo(() => {
    const s = new Set();
    products.forEach((p) => {
      if (category.length && !category.includes(p.mainCategory)) return;
      if (p.subCategory) s.add(p.subCategory);
    });
    return Array.from(s).sort();
  }, [products, category]);

  const toggleCategory = (e) => {
    {
      /* e is an event that triggers when user click on UI element to select/deselect category */
    }
    if (category.includes(e.target.value)) {
      {
        /* 'e.target.value' gives the selected value from the user, in this case, it'll give the selected category*/
      }
      {
        /* EG: "category.includes(value)" category is an array - Values should be check inside this array, and "e.target.value" is a value that developer checks wheather */
      }
      {
        /* "includes" --> checks if the value is in the list or not and returns 'True' or 'False */
      }

      setCategory((prev) => prev.filter((item) => item !== e.target.value));
      {
        /* "filter" makes a new array while "prev" have the previous list and filter is going to update it by Item (that's deselected) means the value that user deselects is going to stored in the 'item' and it'll update the prev means remove the deselected (now) category. */
      }
    } else {
      setCategory((prev) => [...prev, e.target.value]);
      {
        /* else Took the previous array (...prev), and Add the new selected category in the previous list */
      }
    }
  };

  // toggle product subcategory (e.g. "Biryani", "Chinese Starter")
  const toggleSubCategory = (e) => {
    const v = e.target.value;
    setSubCategory((prev) =>
      prev.includes(v) ? prev.filter((i) => i !== v) : [...prev, v],
    );
  };

  // toggle spice-level filter (mild / medium / high)
  const toggleSpiceLevel = (e) => {
    const v = e.target.value;
    setSpiceLevelFilter((prev) =>
      prev.includes(v) ? prev.filter((i) => i !== v) : [...prev, v],
    );
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    // 1) top-level diet category filter (Veg / Non-Veg)
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.mainCategory),
      );
    }

    // 2) subCategory (e.g. "Biryani", "Chinese Starter")
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    // 3) spice-level filter (mild/medium/high)
    if (spiceLevelFilter.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        spiceLevelFilter.includes(item.spiceLevel),
      );
    }

    // 3b) bestseller only
    if (bestsellerOnly) {
      productsCopy = productsCopy.filter((item) => item.bestseller);
    }

    // 4) search
    if (search && showSearch) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilterProducts(productsCopy);
  };

  {
    /* --------- Custom Event Handler "const sortProducts = () =>" VS useEffect ------- 
    here below, sortProducts is an event handler which calls when user given an input or take an action like user adds an item in cart by clicking on ADD TO CART button.....
    whereas
    useEffect is a lifecycle hook that calls or triggers automatically to component mount, update or to handle side effects when a component renders.
  */
  }

  const getPriceForSort = (item) =>
    typeof item.lowestPrice === "number" && isFinite(item.lowestPrice)
      ? item.lowestPrice
      : Infinity;

  const sortProducts = () => {
    const copy = [...filterProducts];

    if (sortType === "low-high") {
      copy.sort((a, b) => getPriceForSort(a) - getPriceForSort(b));
      setFilterProducts(copy);
      return;
    }

    if (sortType === "high-low") {
      copy.sort((a, b) => getPriceForSort(b) - getPriceForSort(a));
      setFilterProducts(copy);
      return;
    }

    // 'relevant' — re-apply base filters (keeps original order)
    applyFilter();
  };

  // auto-run sort when sortType changes
  useEffect(() => {
    sortProducts();
  }, [sortType]);

  // If filters change while a non-default sort is active, re-run the sort
  useEffect(() => {
    if (sortType === "low-high" || sortType === "high-low") {
      sortProducts();
    }
  }, [filterProducts]);

  useEffect(() => {
    applyFilter();
  }, [
    category,
    subCategory,
    spiceLevelFilter,
    showSearch,
    search,
    products,
    bestsellerOnly,
  ]);

  // when main category changes, remove any selected subcategories that are no longer available
  useEffect(() => {
    setSubCategory((prev) =>
      prev.filter((sc) =>
        products.some(
          (p) =>
            p.subCategory === sc &&
            (category.length ? category.includes(p.mainCategory) : true),
        ),
      ),
    );
  }, [category, products]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 pt-12 border-t border-gray-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* ----------------------------------- Left Side ----------------------------------- */}

      <aside className="w-full lg:w-72">
        <div className="sticky top-24 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowFilter(!showFilter)}
          >
            <p className="text-lg font-semibold tracking-wide">Filters</p>
            <img
              className={`h-3 md:hidden ${showFilter ? "rotate-90" : ""}`}
              src={assets.dropdown_icon}
              alt=""
            />
          </div>

          <div className={`${showFilter ? "" : "hidden"} sm:block mt-4`}>
            <p className="mb-3 text-sm font-medium text-gray-500">Diet</p>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                <label className="flex items-center gap-3 font-medium">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    value={"Veg"}
                    checked={category.includes("Veg")}
                    onChange={toggleCategory}
                  />
                  Veg
                </label>

                <label className="flex items-center gap-3 font-medium">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    value={"Non-Veg"}
                    checked={category.includes("Non-Veg")}
                    onChange={toggleCategory}
                  />
                  Non-Veg
                </label>

                <div className="mt-3">
                  <p className="mb-2 text-sm font-medium text-gray-500">
                    Subcategories
                  </p>
                  {availableSubcategories.length ? (
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      {availableSubcategories.map((sc) => (
                        <label
                          key={sc}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4"
                            value={sc}
                            checked={subCategory.includes(sc)}
                            onChange={toggleSubCategory}
                          />
                          <span className="truncate">{sc}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400">
                      Select a category to see subcategories
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-medium text-gray-500">
                Preferences
              </p>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <label className="flex gap-3 items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    value={"mild"}
                    checked={spiceLevelFilter.includes("mild")}
                    onChange={toggleSpiceLevel}
                  />
                  Mild
                </label>
                <label className="flex gap-3 items-center text-sm text-gray-700 mt-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    value={"medium"}
                    checked={spiceLevelFilter.includes("medium")}
                    onChange={toggleSpiceLevel}
                  />
                  Medium
                </label>
                <label className="flex gap-3 items-center text-sm text-gray-700 mt-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    value={"high"}
                    checked={spiceLevelFilter.includes("high")}
                    onChange={toggleSpiceLevel}
                  />
                  High
                </label>

                <label className="flex gap-3 items-center mt-4 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={bestsellerOnly}
                    onChange={() => setBestsellerOnly((s) => !s)}
                  />
                  Show Bestsellers Only
                </label>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ----------------------------------- Right Side ----------------------------------- */}

      <main className="flex-1 w-full">
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <Title text1={"ORDER &"} text2={"DINE"} />
                <button
                  onClick={() => setShowFilter((s) => !s)}
                  className="sm:hidden text-sm text-orange-500 ml-2 px-3 py-1 rounded-lg border border-orange-200 bg-orange-50"
                  aria-label="Toggle filters"
                >
                  Filters
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                Premium curated menu — {filterProducts.length} item
                {filterProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="border border-gray-200 bg-white text-sm px-3 py-2 rounded-lg shadow-sm outline-none"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low - High</option>
                <option value="high-low">Sort by: High - Low</option>
              </select>

              <div className="inline-flex rounded-full bg-gray-100 p-1 border border-gray-200">
                <button
                  onClick={() => {
                    setOrderType("Home Delivery");
                    localStorage.setItem("orderType", "Home Delivery");
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    orderType === "Home Delivery"
                      ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow"
                      : "text-gray-700 hover:bg-white"
                  }`}
                >
                  Home
                </button>

                <button
                  onClick={() => {
                    setOrderType("Pick-up");
                    localStorage.setItem("orderType", "Pick-up");
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    orderType === "Pick-up"
                      ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow"
                      : "text-gray-700 hover:bg-white"
                  }`}
                >
                  Pick-up
                </button>
              </div>
            </div>
          </div>

          {/* ----------------------------------- Mapping of Products ----------------------------------- */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterProducts.length > 0 ? (
              filterProducts.map((item, index) => (
                <ProductItem
                  key={item._id || index}
                  name={item.name}
                  id={item._id}
                  types={item.types}
                  images={item.images}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-base py-20">
                <p className="mb-4">
                  We're working on it and will upload soon.
                </p>
                <Link
                  className="bg-blue-700 text-white rounded-lg py-2 px-5 hover:bg-blue-800 transition ease-in-out mt-3 inline-block"
                  to={"/"}
                >
                  Go to Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Collection;
