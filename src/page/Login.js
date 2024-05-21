import React, { useState } from "react";
import logosignup from "../images/login-animation.gif";
import { Link, NavLink, json, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginredux } from "../reduxx/userSlice";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //data from redux
  const userdata = useSelector((state) => state);
  const dispatch = useDispatch();
  

  const handlechange = (event) => {

    const { name, value } = event.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const hanldeonsubmit = async (e) => {
    e.preventDefault();

    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const fdata = await fetchData.json();
      console.log(fdata, "hey");

      if (fdata.messagesucces) {
        dispatch(loginredux(fdata));
        toast.success(fdata.messagesucces, { duration: 1000 });
        navigate("/");
      } else {
        toast.error(fdata.messagefalse);
      }
    } else {
      alert("error");
    }
  };
  console.log(data, "hello data");
  console.log(userdata, "hello useslice");

  return (
    <div className="p-3 md:p-4 ">
      <div className=" w-full max-w-sm bg-white m-auto flex items-center  flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img src={logosignup} className="w-full" />
        </div>
        <form className="w-full py-3" onSubmit={hanldeonsubmit}>
          <label htmlFor="email">email</label>
          <input
            type={"email"}
            id="email"
            placeholder="example@gmail.com"
            name="email"
            value={data.email}
            onChange={'""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""handlechange""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""'}
            className=" mt-1 mb-2 w-full bg-slate-200 px-2 py-1 focus-within:outline-blue-300"
            required
          />
          <label htmlFor="password">password</label>
          <input
            type={"password"}
            id="password"
            placeholder="**********"
            name="password"
            value={data.password}
            onChange={handlechange}
            className=" mt-1 mb-2 w-full bg-slate-200 px-2 py-1 focus-within:outline-blue-300"
            required
          />

          <div className="flex items-center flex-col p-4 ">
            <button
              className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>

            <span className=" mt-4 inline-block align-baseline font-bold text-sm">
              adon't have account ?
              <NavLink
                className=" ml-1 text-blue-500 hover:text-blue-800"
                to={"/signup"}
              >
                sign up
              </NavLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
