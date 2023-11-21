import React, { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { FaEye } from "react-icons/fa";

const WishList = () => {
  const { state, dispatch } = useGlobalContext();

  useEffect(() => {
    dispatch({ type: "GET_LOCAL_STORAGE" });
  }, []);

  return (
    <>
      <div>
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 ">
          {state.favoriteProducts.length > 0 ? (
            state.favoriteProducts.map((product) => (
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
                <strong className="text-pink-600">${product.price}</strong>
                <div className="mt-2">
                  <p className="text-gray-600 my-3 font-semibold">
                    Brand: {product.brand}
                  </p>
                  <div className="flex justify-center items-center">
                    <Link to={`${ROUTER.Detail}/${product.id}`}>
                      <FaEye size={40} color="blue" />
                    </Link>
                    <button
                      className="bg-violet-100 py-1 my-2 px-2 md:px-4 rounded-md text-white"
                      onClick={() =>
                        dispatch({ type: "DELETEFAVORITE", payload: product })
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
              Your WishList is Empty...
            </h1>
          )}
        </ul>
      </div>
    </>
  );
};

export default WishList;
