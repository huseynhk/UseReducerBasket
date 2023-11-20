import React, { createContext, useReducer } from "react";
import { toast } from "react-toastify";

const GlobalContext = createContext();
const initialState = {
  data: [],
  basket: [],
  totalCount: 0,
  totalPrice: 0,
  filteredData: [],
};

// {...state , basket:[...state.basket,{...action.payload , count:1} , totalCount:state.totalCount + 1]}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return { ...state, data: action.payload };

    case "ADD_TO_CART":
      const existedProduct = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (!existedProduct) {
        toast.success("Product added successfully!", {
          autoClose: 1000,
        });
        const updatedBasket = [
          ...state.basket,
          { ...action.payload, count: 1 },
        ];
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
        return {
          ...state,
          basket: updatedBasket,
          totalCount: state.totalCount + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
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
      return {
        ...state,
        basket: incrementedBasket,
        totalCount: state.totalCount + 1,
        totalPrice: state.totalPrice + action.payload.price,
      };

    case "DECREMENT":
      const decrementedBasket = state.basket.map((product) =>
        product.id === action.payload.id && product.count > 1
          ? { ...product, count: product.count - 1 }
          : product
      );
      localStorage.setItem("basket", JSON.stringify(decrementedBasket));

      return {
        ...state,
        basket: decrementedBasket,
        totalCount: state.totalCount > 1 ? state.totalCount - 1 : 1,
        totalPrice:
          state.totalPrice - action.payload.price > 1
            ? state.totalPrice - action.payload.price
            : action.payload.price,
      };

    case "GET_LOCAL_STORAGE":
      const localBasket = JSON.parse(localStorage.getItem("basket")) || [];
      const localTotalCount = localBasket.reduce(
        (acc, product) => acc + product.count,
        0
      );
      const localTotalPrice = localBasket.reduce(
        (acc, product) => acc + product.count * product.price,
        0
      );
      return {
        ...state,
        basket: localBasket,
        totalCount: localTotalCount,
        totalPrice: localTotalPrice,
      };

    case "DELETE":
      const deletedProduct = state.basket.filter(
        (product) => product.id !== action.payload.id
      );
      const deletedTotalPrice =
        state.totalPrice - action.payload.count * action.payload.price;
      localStorage.setItem("basket", JSON.stringify(deletedProduct));

      return {
        ...state,
        basket: deletedProduct,
        totalCount: state.totalCount - action.payload.count,
        totalPrice: deletedTotalPrice,
      };

    case "ALLDELETE":
      localStorage.removeItem("basket");
      return { ...state, basket: [], totalCount: 0, totalPrice: 0 };

    case "SET_FILTER":
      return { ...state, filteredData: action.payload };

    case "RESET":
      return { ...state, filteredData: state.data };

    default:
      return state;
  }
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filterProducts = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const searchData = [...state.data];
    const filteredProduct = searchData.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchValue) ||
        product.brand.toLowerCase().includes(searchValue)
      );
    });
    dispatch({ type: "SET_FILTER", payload: filteredProduct });
  };

  const searchProducts = (event) => {
    const searchValue = event.target.value;
    const searchData = [...state.filteredData];

    searchData.sort((a, b) => {
      switch (searchValue) {
        case "title":
          return a.title.localeCompare(b.title);

        case "brand":
          return a.brand.localeCompare(b.brand);

        case "price-low-to-high":
          return a.price - b.price;

        case "price-high-to-low":
          return b.price - a.price;

        default:
          return 0;
      }
    });
    dispatch({ type: "SET_FILTER", payload: searchData });
  };

  const contextValue = {
    state,
    dispatch,
    filterProducts,
    searchProducts,
  };
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
