import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Allproduct from "../components/Allproduct";
import { addCartItem } from "../reduxx/Productslice";
import toast from "react-hot-toast";

const Menu = () => {
  const { filterby } = useParams();
const dispatch= useDispatch()

  const productdata = useSelector((state) => state.product.productList);
  console.log(productdata, "hello frome dataaa menu ");
  const productDisplay = productdata.filter((el) => el._id === filterby)[0];
  console.log(productDisplay, "hello   from menu");


  const handleADDcartProduct = () => {
    dispatch(
      addCartItem(productDisplay)
    );
    
    
  };
  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl  m-auto  md:flex  bg-white">
        <div className="max-w-lg shodow overflow-hidden p-5 ">
          <img
            src={productDisplay.image}
            className="hover:scale-105 transition-all "
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <h3 className="  font-semibold text-slate-600  capitalize text-2xl md:text-4xl   ">
            {productDisplay.name}
          </h3>
          <p className=" text-slate-900 font-medium">
            {productDisplay.category}
          </p>
          <p className=" text-slate-900 text-2xl font-black">
            {productDisplay.price}
          </p>
        
          <div className="flex gap-5 ">
            <button className="bg-yellow-400 w-auto hover:bg-yellow-600 text-black font-bold px-3 py-3  mt-1 rounded">
              buy
            </button>
            <button onClick={handleADDcartProduct} className="bg-yellow-400 w-auto hover:bg-yellow-600 text-black font-bold px-3 py-3  mt-1 rounded">
              Add cart
            </button>

          </div>
          <p className="text-slate-600 font-medium">description :</p>
          <p>{productDisplay.description}</p>
        </div>
      </div>
      <Allproduct heading={"Related Product"}/>
    </div>
  );
};

export default Menu;
