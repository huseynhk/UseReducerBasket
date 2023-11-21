import React, { useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useParams } from "react-router-dom";
import { GetSingleProduct } from "../api/GetRequest";

const Detail = () => {
  const { state, dispatch } = useGlobalContext();
  const { productId } = useParams();

  const fectchSingleProduct = async () => {
    const response = await GetSingleProduct(productId);
    dispatch({ type: "SELECTEDPRODUCT", payload: response });
  };

  useEffect(() => {
    fectchSingleProduct();
  }, [productId]);

  if (!state.selectedProduct) {
    return <h1 className="m-24 text-3xl text-violet-200">Loading...</h1>;
  }
  const { title, description, price, brand, images } = state.selectedProduct;

  return (
    <>
      <div className="max-w-lg mx-auto bg-white rounded-xl overflow-hidden shadow-xl shadow-gray-900 mt-24">
        <img
          className="w-full h-64 object-cover object-center"
          src={images[0]}
          alt={title}
        />
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-700">{description}</p>
          <p className="text-gray-700">{price}</p>
          <p className="text-gray-700">{brand}</p>
        </div>
      </div>
    </>
  );
};

export default Detail;
