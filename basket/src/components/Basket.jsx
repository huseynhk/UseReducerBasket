import React, { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { FaEye } from "react-icons/fa";

const Basket = () => {
  const { state, dispatch } = useGlobalContext();

  useEffect(() => {
    dispatch({ type: "GET_LOCAL_STORAGE" });
  }, []);

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          className="bg-red-600 px-4 py-2  mt-3 rounded-md text-white "
          onClick={() => dispatch({ type: "ALLDELETE" })}
        >
          Remove All
        </button>
      </div>
      <div>
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 ">
          {state.basket.length > 0 ? (
            state.basket.map((product) => (
              <li
                key={product.id}
                className="bg-violet-100 rounded-md shadow-md p-2 m-4"
              >
                <h2 className="text-lg font-semibold text-cyan-700 mb-3">
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
                <strong className="text-cyan-700">${product.price}</strong>
                <div className="mt-2">
                  <p className="text-green-800 my-3 font-semibold">
                    Brand: {product.brand}
                  </p>
                  <p className="text-cyan-700 my-3 font-semibold">
                    Total: $ {product.price * product.count}
                  </p>
                  <div className="flex justify-center items-center">
                    <button
                      className="bg-red-700  px-2 md:px-4 rounded-md text-white"
                      onClick={() =>
                        dispatch({ type: "DECREMENT", payload: product })
                      }
                    >
                      -
                    </button>
                    <h4 className="mx-2  text-3xl text-gray-600 font-semibold">
                      {product.count}
                    </h4>
                    <button
                      className="bg-green-700 px-2 rounded-md md:px-4 text-white"
                      onClick={() =>
                        dispatch({ type: "INCREMENT", payload: product })
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="flex justify-center items-center">
                    <Link
                      className="mt-1"
                      to={`${ROUTER.Detail}/${product.id}`}
                    >
                      <FaEye size={40} color="blue" />
                    </Link>
                    <button
                      className="bg-violet-100 py-1 my-2 px-2 md:px-4 rounded-md text-white"
                      onClick={() =>
                        dispatch({ type: "DELETE", payload: product })
                      }
                    >
                      <FaTrashAlt size={30} color="red" />
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <h1 className="mx-auto mt-24 text-3xl text-red-100">
              Your Basket is Empty...
            </h1>
          )}
        </ul>
      </div>
    </>
  );
};

export default Basket;
