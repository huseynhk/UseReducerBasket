import React, { createContext, useReducer } from "react";
import { toast } from "react-toastify";

const GlobalContext = createContext();
const initialState = {
  data: [],
  basket: [],
};
// return {...state, basket:[...state.basket, {...action.payload,count:1}]}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return { ...state, data: action.payload };
    case "ADD_TO_CART":
      const existedProduct = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (!existedProduct) {
        const updatedBasket = [
          ...state.basket,
          { ...action.payload, count: 1 },
        ];
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
        toast.success("Product added successfully!", {
          autoClose: 1000,
        });
        return { ...state, basket: updatedBasket };
      } else {
        toast.error("This Product is already in your cart", {
          autoClose: 1000,
        });
        return { ...state };
      }

    case "INCREMENT":
      const incrementedBasket = state.basket.map((product) =>
        product.id === action.payload.id
          ? { ...product, count: product.count + 1 }
          : product
      );
      localStorage.setItem("basket", JSON.stringify(incrementedBasket));
      return { ...state, basket: incrementedBasket };

    case "DECREMENT":
      const decrementedBasket = state.basket.map((product) =>
        product.id === action.payload.id && product.count > 1
          ? { ...product, count: product.count - 1 }
          : product
      );
      localStorage.setItem("basket", JSON.stringify(decrementedBasket));
      return { ...state, basket: decrementedBasket };

      case "GET_LOCAL_STORAGE":
        return { ...state, basket: action.payload };

    default:
      return state;
  }
};



const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = {
    state,
    dispatch,
  };
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
