import React from "react";
import { NavLink } from "react-router-dom";

function HomeCard(data) {
  return (
    <div className="bg-white shadow-md rounded p-2 min-h-[200px]  cursor-pointer">
      {data.name ? (
        <>
          <NavLink
            to={`/menu/${data._id} `}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="w-40 min-h-[200px] ">
              <img src={data.image} className="w-full h-full " />
            </div>
            <h3 className="  font-semibold text-slate-600 text-center  capitalize text-lg">
              {data.name}
            </h3>
            <p className="text-center text-slate-400 font-medium">
              {data.category}
            </p>
            <p className="text-center text-slate-900 font-black">
              {data.price}
            </p>
          </NavLink>
        </>
      ) : (
        <div className="w-40  h-full flex justify-center items-center ">
          <p className="">{data.loading}</p>
        </div>
      )}
    </div>
  );
}

export default HomeCard;
