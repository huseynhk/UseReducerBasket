import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const Basket = () => {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const storedData = localStorage.getItem("basket");
    if (storedData) {
      dispatch({ type: "GET_LOCAL_STORAGE", payload: JSON.parse(storedData) });
    }
  }, []);


  return (
    <>
      <div>
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 ">
          {state.basket.length > 0 ? (
            state.basket.map((product) => (
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
                  <div className="flex justify-center items-center">
                    <button
                      className="bg-red-500  px-2 md:px-4 rounded-md text-white"
                      onClick={() =>
                        dispatch({ type: "DECREMENT", payload: product })
                      }
                    >
                      -
                    </button>
                    <h4 className="mx-2 mb-1 text-2xl text-violet-700">
                      {product.count}
                    </h4>
                    <button
                      className="bg-green-500 px-2 rounded-md md:px-4 text-white"
                      onClick={() =>
                        dispatch({ type: "INCREMENT", payload: product })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>Your basket is empty</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default Basket;
