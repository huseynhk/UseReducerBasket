import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { GetProducts } from "../api/GetRequest";

const Products = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const fetchProducts = async () => {
    const response = await GetProducts();
    dispatch({ type: "ADD_DATA", payload: response.products });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div>
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 ">
          {state.data.map((product) => (
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
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Products;
