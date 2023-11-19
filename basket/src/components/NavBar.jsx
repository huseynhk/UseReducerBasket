import React, { useContext,useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { state,dispatch } = useContext(GlobalContext);

  useEffect(() => {
    dispatch({ type: "GET_LOCAL_STORAGE"});
  }, []);
  
  return (
    <div className="bg-black p-5 flex justify-center items-center">
      <Link to={"/"} className="text-blue-200 text-xl">
        Go Home
      </Link>
      <h2 className="text-blue-200 text-xl mx-5">{state.totalCount}</h2>
      <h2 className="text-red-200 text-xl mx-5">{state.totalPrice}</h2>

      <Link to={"/basket"} className="text-blue-200 text-xl ">
        Go Basket
      </Link>
    </div>
  );
};

export default NavBar;
