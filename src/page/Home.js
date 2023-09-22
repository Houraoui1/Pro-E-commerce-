import React, { useEffect, useRef, useState } from "react";
import HomeCard from "../components/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../components/CardFeature";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";

import FilterProduct from "../components/FilterProduct";
import Allproduct from "../components/Allproduct";

function Home() {
  const productdata = useSelector((state) => state.product.productList);
  console.log(productdata, "helloo from home data ");
  const homeProductCartList = productdata.slice(1, 5);
  const homeProductCartListvegetable = productdata.filter(
    (data) => data.category === "Vegetable",
    []
  );
  const loadingArry = new Array(4).fill(null);
  const loadingArryFeature = new Array(10).fill(null);

  const SlideProductRef = useRef();
  const nextProduct = () => {
    SlideProductRef.current.scrollLeft   += 292;
    
  };
  const previousProduct = () => {
    SlideProductRef.current.scrollLeft -= 292;
  };

  console.log(typeof setDatafilterby, "helooooooooooooooooooo");

  console.log(homeProductCartListvegetable, "helloo from home data ");
  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2 ">
          <div className="flex gap-3 bg-slate-300 w-32 px-2 items-center rounded-full ">
            <p className=" text-sm font-medium text-slate-900  ">
              Bike Delivery
            </p>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6678nwPmSe1dHNp5ajzSGmRqZGaV0p963Ww&usqp=CAU"
              className="h-4"
            />
          </div>
          <h2 className="text-4xl md:text-7xl  font-bold py-3">
            The Fasted Delivery in{" "}
            <span className="text-red-600">Your home</span>
          </h2>
          <p className="py-3 text-base">
          Welcome to a culinary revolution that comes straight to your doorstep <strong> "The Fastest Food Delivery to Your Home."</strong> In a world where life moves at an extraordinary pace, we understand the desire for convenience without compromising on taste, quality, or safety.

At you, we're not just delivering meals; we're delivering experiences. Whether you crave a gourmet delight, your favorite comfort food, or something entirely new and exciting, our mission is to bring it to you faster than ever before.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Order Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 justify-center p-4">
          {homeProductCartList[0]
            ? homeProductCartList.map((event) => {
                return (
                  <HomeCard
                    key={event.id +'featuree '}
                    _id={event._id}
                    image={event.image}
                    name={event.name}
                    price={event.price}
                    category={event.category}
                  />
                );
              })
            : loadingArry.map((el, index) => {
                return <HomeCard key={index +'laodingarry'} loading={"...loading"} />;
              })}
        </div>
      </div>
      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 ">
            fresh vegitables{" "}
          </h2>
          {/* buttoon next and previous                 */}
          <div className="ml-auto flex gap-4">
            <button
              onClick={previousProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <FcPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <FcNext />
            </button>
          </div>
        </div>

        <div
          className="flex gap-3 pt-5 overflow-scroll scrollbar-none  "
          ref={SlideProductRef}
        >
          {homeProductCartListvegetable[0]
            ? homeProductCartListvegetable.map((el) => {
                return (
                  <CardFeature
                    key={el.id +'List vegitable'}
                    _id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArryFeature.map((el , index) => (
                <CardFeature key={index +'arrayloading'} loading={"...loading"} />
              ))}
        </div>
      </div>
      <Allproduct loading={"...loading"} heading={"Your Product"} />
    </div>
  );
}

export default Home;
