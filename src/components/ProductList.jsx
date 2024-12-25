import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseFetch from "../utils/UseFetch";
import Loader from "./Loader";

const ProductList = () => {
  const [searchItem, setSearchItem] = useState("");
  const [products, setProducts] = useState([]);
  const { data, error, loading } = UseFetch("https://dummyjson.com/products");

  useEffect(() => {
    if (data && data.products) {
      setProducts(data.products);
    }
  }, [data]);

  const handleSearch = () => {
    const filteredProducts = data.products.filter((item) => {
      return item.title.toLowerCase().includes(searchItem.toLowerCase());
    });
    setProducts(filteredProducts);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="px-4 py-4 font-bold">
        Error Occured Fetching Product Data.{" "}
      </p>
    );
  }

  return (
    <div className="px-3 xs:px-8 ">
      <h2 className="font-bold text-xl py-4">
        {" "}
        Product <span className="text-[#4fb6a8]">List</span>
      </h2>
      <div className="search flex-col xs:flex-row  flex gap-4 my-4">
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="border border-black px-4 py-1"
          placeholder="Product name"
        />
        <button
          className="border border-black px-4 py-1 "
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="products flex gap-6 flex-wrap py-2">
        {products.length >= 1 ? (
          products?.map((item) => (
            <div
              key={item.id}
              className="bookCard w-[16rem] border-2 border-slate-100 shadow-lg p-2 flex gap-4 flex-col justify-between"
            >
              <div className="data">
                <img
                  src={item.images[0]}
                  className="w-[15rem] border border-slate-200 h-[20rem] object-cover mx-auto"
                  alt=""
                />
                <h2 className="font-bold pt-2">
                  {" "}
                  {item.title.length > 24
                    ? `${item.title.slice(0, 24)}...`
                    : item.title}{" "}
                </h2>
                <h3 className="font-semibold  py-2">{item.author}</h3>
                <p className="text-justify   text-wrap">
                  {item.description.length > 85
                    ? `${item.description.slice(0, 84)}...`
                    : item.description}
                </p>
                <h3 className="font-semibold py-2">Price : ${item.price}</h3>
              </div>
              <Link
                to={`/productDetail/${item.id}`}
                className="py-2 text-center mb-4 border-2 text-[#4fb6a8] font-bold border-[#4fb6a8] shadow-lg hover:bg-[#4fb6a8] hover:text-white transition-all"
              >
                Visit Item
              </Link>
            </div>
          ))
        ) : (
          <h2 className="font-bold text-black underline ">
            No Product to display{" "}
          </h2>
        )}
      </div>
    </div>
  );
};

export default ProductList;