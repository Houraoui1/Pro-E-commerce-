import React, { useEffect } from "react";
import { IoMdAdd } from "react-icons/io";

import { AiOutlineMinus } from "react-icons/ai";
import {TiDelete} from "react-icons/ti"
import { useDispatch } from "react-redux";
 import { deletCartItem ,TotalPrice, IncreaseQyt,decreaseQyt } from "../reduxx/Productslice";

export const CartProduct = ({
  _id,
  price,
  image,
  name,
  qty,
  total,
  category,
}) => {

const dispatch = useDispatch() 
const handledeletCartItem = ()=>{
    dispatch(deletCartItem(_id))

}
const handlIncreaseQyt = ()=>{
    dispatch(IncreaseQyt(_id))
}
const handldecreaseQyt = ()=>{
    dispatch(decreaseQyt(_id))
}


  return (
    <div  className=" bg-slate-200  p-2 flex gap-4 rounded border-2 border-slate-300  z-1 ">
      <div className="p-3 bg-white rounded overflow-hidden">
        <img src={image} className="h-28 w-40 object-cover " />
      </div>
      <div className="w-full flex flex-col gap-2 ">
        <div className="flex justify-between">
        <h3 className="  font-semibold text-slate-600  capitalize text-2xl md:text-3xl   ">
          {name}
        </h3>
        <div className="" onClick={handledeletCartItem}>
        <TiDelete className="w-10 h-10 text-slate-600 hover:text-red-500 cursor-pointer" />
        </div>
        </div>
         <p className=" text-slate-900 font-medium">{category}</p>
        <p className=" text-slate-900   font-black">{price}</p>
        <div className="flex justify-between ">
          <div className="flex gap-5  ">
            <button onClick={handlIncreaseQyt} className="bg-slate-300 w-auto hover:bg-slate-400  text-black font-bold   mt-2 p-2 rounded">
              <IoMdAdd />
            </button>
            <p className="font-semibold mt-2 text-lg  ">{qty}</p>
            <button className="bg-slate-300 w-auto hover:hover:bg-slate-400  text-black font-bold  mt-2 p-2 rounded">
              <AiOutlineMinus onClick={handldecreaseQyt} />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700 ">
            <p>Total :</p>
            <p className="">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartProduct;
