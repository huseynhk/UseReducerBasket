import { Routes, Route } from "react-router-dom";
import { ROUTER } from "./constant/Router";
import Products from "./components/Products";
import Basket from "./components/Basket";
import Detail from "./components/Detail";
import WishList from "./components/WishList";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={ROUTER.Products} exact element={<Products />} />
        <Route path={ROUTER.Basket} element={<Basket />} />
        <Route path={ROUTER.Detail + "/:productId"} element={<Detail />} />
        <Route path={ROUTER.Wish} element={<WishList />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
