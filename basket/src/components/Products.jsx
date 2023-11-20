import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { GetProducts } from "../api/GetRequest";
import { Link } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { FaEye } from "react-icons/fa";

const Products = () => {
  const { state, dispatch, filterProducts, searchProducts } =
    useContext(GlobalContext);

  const fetchProducts = async () => {
    const response = await GetProducts();
    dispatch({ type: "ADD_DATA", payload: response.products });
    dispatch({ type: "SET_FILTER", payload: response.products });
  };

  const inputRef = useRef(null);

  useEffect(() => {
    fetchProducts();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className="bg-gray-900 p-3 flex flex-col justify-center items-center md:flex-row">
        <input
          type="text"
          placeholder="Serach"
          ref={inputRef}
          name="search"
          className="m-3 px-4 py-1 rounded-md"
          onChange={filterProducts}
        />

        <select className="px-6 py-1 rounded-md" onChange={searchProducts}>
          <option value="title">Sort by Title</option>
          <option value="brand">Sort by Brand</option>
          <option value="price-low-to-high">Low To High</option>
          <option value="price-high-to-low">High To Low</option>
        </select>

        <button className="bg-violet-200 text-violet-950 ms-3 rounded-md px-4 py-1" onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      </div>

      <div>
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 ">
          {state.filteredData.length > 0 ? (
            state.filteredData.map((product) => (
              <li
                key={product.id}
                className="bg-violet-100 rounded-md shadow-md p-2 m-4"
              >
                <h2 className="text-lg font-semibold text-blue-600 mb-3">
                  {product.title}
                </h2>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="mb-5 w-full h-60 object-cover rounded-md"
                />
                <p className="text-gray-600 mb-2 font-semibold">
                  {product.description.slice(0, 30)}
                </p>
                <strong className="text-green-600">${product.price}</strong>
                <div className="mt-2">
                  <p className="text-green-600 my-3 font-semibold">
                    Brand: {product.brand}
                  </p>
                  <div className="flex justify-center items-center flex-col">
                    <Link
                      to={`${ROUTER.Detail}/${product.id}`}
                      className="mb-3"
                    >
                      <FaEye size={30} color="gray" />
                    </Link>

                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded-md"
                      onClick={() =>
                        dispatch({
                          type: "ADD_TO_CART",
                          payload: product,
                        })
                      }
                    >
                      {state.basket.find(
                        (basketProduct) => basketProduct.id === product.id
                      )
                        ? "Added"
                        : "Add To Cart"}
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <h1 className="mx-auto mt-24 text-4xl text-red-100">
              Products Not Found
            </h1>
          )}
        </ul>
      </div>
    </>
  );
};

export default Products;
