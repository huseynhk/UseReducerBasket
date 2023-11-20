import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";
import { BsFillBasket2Fill } from "react-icons/bs";

const NavBar = () => {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    dispatch({ type: "GET_LOCAL_STORAGE" });
  }, []);

  return (
    <div className="bg-black py-7 px-4 flex justify-center items-center">
      <Link to={"/"} className="text-blue-200 text-2xl">
        Home
      </Link>

      <h2 className="text-violet-200 text-lg mx-7 mt-1">
        TotalPrice: {state.totalPrice}
      </h2>

      <div className="flex flex-col md:flex-row">
        <Link to={"/basket"} className="text-blue-200 text-2xl ">
          <BsFillBasket2Fill size={30} color="gray" />
        </Link>
        <span className="text-red-200 ms-2 text-lg">{state.totalCount}</span>
      </div>
    </div>
  );
};

export default NavBar;
