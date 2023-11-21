import React, { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";
import { BsFillBasket2Fill } from "react-icons/bs";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { ROUTER } from "../constant/Router";

const NavBar = () => {
  const { state, dispatch } = useGlobalContext();

  useEffect(() => {
    dispatch({ type: "GET_LOCAL_STORAGE" });
  }, []);

  return (
    <div className="bg-black  py-7 px-4 flex flex-col  items-center md:flex-row md:justify-center">
      <div className="flex justify-center items-center">
        <Link to={ROUTER.Products} className="text-blue-200 text-2xl">
          <IoHome size={40} color="gray" />
        </Link>
        <Link to={ROUTER.Wish} className="text-blue-200 text-2xl mx-3">
          <FaHeart size={40} color="gray" />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row bg-gray-900 px-3 my-2 md:my-0 md:p-1 rounded-md text-violet-200">
        <Link to={ROUTER.Basket} className="text-blue-200 text-2xl ">
          <BsFillBasket2Fill size={40} color="gray" />
        </Link>
        <span className="bg-red-600 rounded-full flex justify-center items-center h-6 w-6 text-violet-100 mx-2 text-lg">
          {state.totalCount}
        </span>
      </div>

      <h2 className="bg-gray-900 p-1 rounded-md text-violet-200 text-xl md:ms-3 flex justify-center items-center">
        <HiMiniCurrencyDollar size={40} color="gray" />
        <span className="text-violet-100 mx-1">{state.totalPrice}</span>
      </h2>
    </div>
  );
};

export default NavBar;
