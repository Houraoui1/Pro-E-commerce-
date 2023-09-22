import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, setDataProduct } from "./reduxx/Productslice";

function App() {
  const product = useSelector((state) => state.product.productList);
  console.log(product, "ellof fdsnfskjdf");
  const Dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/product`
      );

      const result = await response.json();
      Dispatch(setDataProduct(result));

      console.log(result);
    })();
  }, []);
  return (
    <div>
      <Toaster />
      <Header />
      <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
