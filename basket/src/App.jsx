import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./components/Products";
import Basket from "./components/Basket";
import Detail from "./components/Detail";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { ROUTER } from "./constant/Router";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={ROUTER.Products} exact element={<Products />} />
        <Route path={ROUTER.Basket} element={<Basket />} />
        <Route path={ROUTER.Detail + "/:productId"} element={<Detail />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
