import React, { useState } from "react";
import lo from "../images/logo.avif";
import { Link, NavLink } from "react-router-dom";
import { BsCartFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutredux } from "../reduxx/userSlice";
import toast from "react-hot-toast";
const Header = () => {
  //une fois tu click sur un link (home ) change directement le <a href={} classe =active > a active et chnger le couleur
  //   const navstyle = ({ isActive }) => {
  //     return {
  //       color: isActive ? "red" : "none",
  //     };
  //   };
  const productCartitem = useSelector((state) => state.product.cartitem);
  const dispatch = useDispatch();
  const [showMenu, setshowmenu] = useState(false);
  const userdata = useSelector((state) => state.user);
  console.log(userdata, "hello from header data");
  const handlelogout = () => {
    dispatch(logoutredux());
    toast.success("Logout seccessfuly");
  };
  const handlshowmenu = () => {
    setshowmenu((t) => !t);
  };
  console.log(process.env.REACT_APP_ADMIN_EMAIL);
  return (
    <header  className="fixed shadow-md bg-white  w-full h-16  z-[100]">
      <div className="flex items-center h-full justify-between ">
        <Link to={""}>
          <div className="h-10">
            <img src={lo} className="h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7 ">
          <nav className="  gap-4 md:gap-6 text-base md:text-lg hidden md:flex  ">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-bold " : " hover:text-blue-500"
              }
              to={""}
            >
              home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-bold " : " hover:text-blue-500"
              }
              to={"menu/64f081cd2d77bb45ace01478"}
            >
              menu
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-bold " : " hover:text-blue-500"
              }
              to={"about"}
            >
              about
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-bold " : " hover:text-blue-500"
              }
              to={"contact"}
            >
              contact
            </NavLink>
          </nav>
          <div className="text-2xl text-slate-600 relative  ">
           <NavLink  to={"cart"}><BsCartFill />
            <div
              className="  absolute bottom-5 text-white bg-red-500  left-4 h-4 w-4 text-sm m-0 p-0  text-center rounded-full "
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {productCartitem.length}
            </div></NavLink> 
          </div>
          <div className="text-slate-600 mr-5">
            <div className="text-3xl cursor-pointer " onClick={handlshowmenu}>
              {userdata.image ? (
                <img
                  className="w-10 h-10 overflow-hidden rounded-full drop-shadow-md shadow-md "
                  src={userdata.image}
                />
              ) : (
                <FaUserCircle />
              )}

              <div>
                {showMenu && (
                  <div className="absolute  right-2   bg-white py-2 px-2 shadow drop-shadow-md min-w-[120px] text-left " >
                    {userdata.email === process.env.REACT_APP_ADMIN_EMAIL && (
                      <p className="whitespace-nowrap  hover:bg-slate-300 hover:rounded text-lg px-2">
                        <NavLink to={"newproduct"}>new product</NavLink>
                      </p>
                    )}
                    {userdata.image ? (
                      <p className="whitespace-nowrap hover:bg-slate-300 hover:rounded  text-lg px-2">
                        <NavLink to={""} onClick={handlelogout}>
                          Logout ({userdata.firstname})
                        </NavLink>
                      </p>
                    ) : (
                      <div>
                        <p className="whitespace-nowrap hover:bg-slate-300 hover:rounded text-lg px-2 ">
                          <NavLink to={"login"}>login</NavLink>
                        </p>

                        <p className="whitespace-nowrap hover:bg-slate-300 hover:rounded text-lg  px-2">
                          <NavLink to={"signup"}>Signup</NavLink>
                        </p>
                      </div>
                    )}
                   <nav className="   md:text-lg flex flex-col  text-lg px-2  md:hidden">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-bold " : " hover:text-blue-500"
              }
              to={""}
            >
              home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-bold " : " hover:text-blue-500"
              }
              to={"menu/64f081cd2d77bb45ace01478"}
            >
              menu
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-bold " : " hover:text-blue-500"
              }
              to={"about"}
            >
              about
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-bold " : " hover:text-blue-500"
              }
              to={"contact"}
            >
              contact
            </NavLink>
          </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
