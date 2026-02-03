import { useState, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/assets";

const Menu = () => {
  const { products } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState("popular");

  const tabs = [
    {
      id: "popular",
      label: "Popular",
      icon: "fa-star",
      subtitle: "Most loved",
    },
    { id: "veg", label: "Veg", icon: "fa-leaf", subtitle: "Vegetarian" },
    {
      id: "nonveg",
      label: "Non-Veg",
      icon: "fa-drumstick-bite",
      subtitle: "Delicious",
    },
  ];

  const getDisplayItems = useMemo(() => {
    if (!Array.isArray(products)) return { popular: [], veg: [], nonveg: [] };

    return {
      popular: products.filter((p) => p.bestseller).slice(0, 8),
      veg: products.filter((p) => p.isVeg).slice(0, 8),
      nonveg: products.filter((p) => !p.isVeg).slice(0, 8),
    };
  }, [products]);

  const priceText = (item) => {
    if (
      Array.isArray(item.types) &&
      item.types.length === 2 &&
      item.priceHalf &&
      item.priceFull
    ) {
      return `₹${item.priceHalf} / ₹${item.priceFull}`;
    }
    if (Array.isArray(item.types) && item.types.length === 1) {
      return `₹${item.types[0].price}`;
    }
    if (typeof item.price === "number") return `₹${item.price}`;
    return `₹${item.lowestPrice !== Infinity ? item.lowestPrice : "--"}`;
  };

  const getImg = (item) => item.images?.[0] || assets.placeholder_food;

  const truncate = (text, n = 60) => {
    if (!text) return "";
    return text.length > n ? text.slice(0, n).trim() + "..." : text;
  };

  return (
    <div className="py-12 px-4 lg:px-12" id="menu">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h5 className="section-title font-secondary text-center text-primary font-normal mb-2">
            Food Menu
          </h5>
          <h1 className="mb-4 text-3xl font-bold">
            Most <i className="text-4xl text-orange-500">Popular</i> Items
          </h1>
        </div>

        <div className="text-center">
          <div className="flex justify-center gap-6 mb-8 border-b-2 border-gray-200 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center text-center text-left mx-0 sm:mx-3 pb-3 bg-transparent border-0 ${
                  activeTab === tab.id ? "border-b-2 border-orange-300" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="pl-2">
                  <small className="text-gray-600 block">{tab.subtitle}</small>
                  <h6 className="-mt-1 mb-0 font-semibold text-orange-500">
                    {tab.label}
                  </h6>
                </div>
              </button>
            ))}
          </div>

          <div>
            <div className={`${activeTab === "popular" ? "block" : "hidden"}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {getDisplayItems.popular.map((item, index) => (
                  <div key={item._id || index} className="w-full">
                    <Link to={`/product/${item._id}`} className="w-full">
                      <div className="flex items-center">
                        <img
                          className="flex-shrink-0 w-20 h-20 object-cover rounded"
                          src={getImg(item)}
                          alt={item.name}
                        />
                        <div className="w-full flex flex-col text-left pl-4">
                          <h5 className="flex items-start gap-3 border-b-2 border-gray-200 pb-2 mb-2">
                            <span className="font-semibold text-sm">
                              {item.name}
                            </span>
                            <span className="text-primary font-bold text-sm whitespace-nowrap ml-auto">
                              {priceText(item)}
                            </span>
                          </h5>
                          <small className="text-gray-600 italic">
                            {truncate(item.description)}
                          </small>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${activeTab === "veg" ? "block" : "hidden"}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {getDisplayItems.veg.map((item, index) => (
                  <div key={item._id || index} className="w-full">
                    <Link to={`/product/${item._id}`} className="w-full">
                      <div className="flex items-center">
                        <img
                          className="flex-shrink-0 w-20 h-20 object-cover rounded"
                          src={getImg(item)}
                          alt={item.name}
                        />
                        <div className="w-full flex flex-col text-left pl-4">
                          <h5 className="flex justify-between border-b-2 border-gray-200 pb-2 mb-2">
                            <span className="font-semibold text-sm">
                              {item.name}
                            </span>
                            <span className="text-primary font-bold text-sm whitespace-nowrap ml-auto">
                              {priceText(item)}
                            </span>
                          </h5>
                          <small className="text-gray-600 italic">
                            {truncate(item.description)}
                          </small>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${activeTab === "nonveg" ? "block" : "hidden"}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {getDisplayItems.nonveg.map((item, index) => (
                  <div key={item._id || index} className="w-full">
                    <Link to={`/product/${item._id}`} className="w-full">
                      <div className="flex items-center">
                        <img
                          className="flex-shrink-0 w-20 h-20 object-cover rounded"
                          src={getImg(item)}
                          alt={item.name}
                        />
                        <div className="w-full flex flex-col text-left pl-4">
                          <h5 className="flex justify-between border-b-2 border-gray-200 pb-2 mb-2">
                            <span className="font-semibold text-sm">
                              {item.name}
                            </span>
                            <span className="text-primary font-bold text-sm whitespace-nowrap ml-auto">
                              {priceText(item)}
                            </span>
                          </h5>
                          <small className="text-gray-600 italic">
                            {truncate(item.description)}
                          </small>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
