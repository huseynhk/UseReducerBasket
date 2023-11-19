import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./components/Products";
import Basket from "./components/Basket";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Products />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
