import React, { useState } from "react";
import logosignup from "../images/login-animation.gif";
import { Await, Link, NavLink, useNavigate } from "react-router-dom";
import { Imagetobase64 } from "../utility/Imagetobae64";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    image: "",
  });
  const handleUploadProfileImage = async (e) => {
    const file = e.target.files[0];

    const data = await Imagetobase64(file);
    console.log(data);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleChange = (event) => {
    //const name = event.target.name
    //const value =event.target.value
    const { name, value } = event.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  console.log(process.env.REACT_APP_SERVER_DOMAIN);
  const hanldeonsubmit = async (e) => {
    e.preventDefault();
   
    const { firstname, email, password, confirmpassword } = data;

    if (firstname && email && password && confirmpassword) {
      if (password === confirmpassword) {
        const fetchdata = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const fedata = await fetchdata.json();
        console.log(fedata, "hello");

        // for taking message from backend to frontend and use toast
        if (fedata.messagesucces) {
          toast.success(fedata.messagesucces);
        } else {
          toast.error(fedata.messagefalse, { duration: 1000 });
        }

        if (fedata.alert) {
          navigate("/login");
        }
      } else {
        toast.error("password and confirme password not equal");
      }
    } else {
      toast.error("pleas entre field ");
    }
  };
  console.log(data);

  return (
    <div className="p-3 md:p-4 ">
      <div className=" w-full max-w-sm bg-white m-auto flex items-center  flex-col p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md ">
          <img
            src={data.image ? data.image : logosignup}
            className="w-full h-full"
          />

          <label htmlFor="profileImage">
            <div className=" bg-opacity-50 absolute  bottom-0 h-1/3 text-center bg-slate-500 w-full cursor-pointer">
              <p className=" text-sm p-0  text-white">upload</p>
            </div>
            <input
              type={"file"}
              id="profileImage"
              className="hidden"
              onChange={handleUploadProfileImage}
              accept="image/*"
            />
          </label>
        </div>
        <form className="w-full py-3" onSubmit={hanldeonsubmit}>
          <label htmlFor="firstname">first name</label>
          <input
            type={"text"}
            id="firstname"
            name="firstname"
            value={data.firstname}
            placeholder="firstname"
            onChange={handleChange}
            className=" mt-1 mb-2 w-full bg-slate-200 px-2 py-1 focus-within:outline-blue-300"
            required
          />
          <label htmlFor="lastname">last name</label>
          <input
            type={"text"}
            id="lastname"
            name="lastname"
            placeholder="lastname"
            value={data.lastname}
            onChange={handleChange}
            className=" mt-1 mb-2 w-full bg-slate-200 px-2 py-1 focus-within:outline-blue-300"
            required
          />
          <label htmlFor="email">email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            value={data.email}
            placeholder="example@gmail.com"
            onChange={handleChange}
            className=" mt-1 mb-2 w-full bg-slate-200 px-2 py-1 focus-within:outline-blue-300"
            required
          />
          <label htmlFor="password">password</label>
          <input
            type={"password"}
            id="password"
            name="password"
            placeholder="*******"
            value={data.password}
            onChange={handleChange}
            className=" mt-1 mb-2 w-full bg-slate-200 px-2 py-1 focus-within:outline-blue-300"
            required
          />
          <label htmlFor="confirmpassword">confirm password</label>
          <input
            type={"password"}
            id="confirmpassword"
            name="confirmpassword"
            placeholder="*******" 
            value={data.confirmpassword}
            onChange={handleChange}
            className=" mt-1 mb-2 w-full bg-slate-200 px-2 py-1 focus-within:outline-blue-300"
            required
          />
          <div className="flex items-center flex-col p-4 ">
            <button
              className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>

            <span className=" mt-4 inline-block align-baseline font-bold text-sm">
              already have an account ?
              <NavLink
                className=" ml-1 text-blue-500 hover:text-blue-800"
                to={"/login"}
              >
                login
              </NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
