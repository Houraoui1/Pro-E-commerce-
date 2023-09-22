import React from "react";
import { Link, NavLink } from "react-router-dom";
import { addCartItem } from "../reduxx/Productslice";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";

function CardFeature(data) {
  const dispatch = useDispatch();

  const handleADDcartProduct = () => {
    dispatch(
      addCartItem({
        _id: data._id,
        image: data.image,
        name: data.name,
        category: data.category,
        price: data.price,
      })
    );
    console.log(data);
  };

  return (
    <div 
      
      className="w-full min-w-[200px] max-w-[200px] min-h-[200px] bg-white drop-shadow-lg pt-5  px-4 cursor-pointer  flex flex-col  "
    >
        
      {data.image ? (
        <>
          <NavLink
            to={`/menu/${data._id} `}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className=" flex  flex-col  items-center justify-center">
              <img src={data.image} className="h-28" />
              <div>
                <h3 className="  font-semibold text-slate-600  capitalize text-lg mt-4  whitespace-nowrap overflow-hidden ">
                  {data.name}
                </h3>
                <p className="text-center text-slate-400 font-medium">
                  {data.category}
                </p>
                <p className="text-center text-slate-900 font-black">
                  {data.price}
                </p>
              </div>
            </div>
          </NavLink>
          <button
            className="bg-yellow-400 w-full hover:bg-yellow-600 text-black font-bold py-2 px-4 mb-2 rounded"
            onClick={handleADDcartProduct}
          >
            Add to cart
          </button>
        </>
      ) : (
        <div className="w-40  h-full flex justify-center  items-center p-5 text-center ">
          <p className=" ">{data.loading}</p>
        </div>
      )}
    </div>
  );
}

export default CardFeature;
