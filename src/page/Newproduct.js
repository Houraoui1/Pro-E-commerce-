import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { Form } from "react-router-dom";
import { Imagetobase64 } from "../utility/Imagetobae64";
import toast from "react-hot-toast";
import playClickSound from "../sounds/Sounds";
function Newproduct() {
  const [data, setdata] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });
  console.log(data);

  const handleUploadimage = async (e) => {
    const file = e.target.files[0];
    const dataimg = await Imagetobase64(file);
    setdata((preve) => {
      return {
        ...preve,
        image: dataimg,
      };
    });
    console.log(dataimg);
  };
  const handlechange = (event) => {
    //const name = event.target.name
    //const value =event.target.value
    const { name, value } = event.target;
    setdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  console.log(data, "hello from data images");
  const handlsubmit = async (e) => {
    e.preventDefault();

    const { name, category, price, image, description } = data;
    if (name && category && price && image && description) {
      const fetchdataa = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/uploadproduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const fetchRes = await fetchdataa.json();
      if (fetchRes) {
        toast(fetchRes.message, "hello from data response ", {
          onOpen: playClickSound(),
        });
      } else {
        toast.error(fetchRes.message, "this data ");
      }
    }
  };
  return (
    <div className="p-4 ">
      <form
        className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white"
        onSubmit={handlsubmit}
      >
        <label htmlFor="name">name</label>

        <input
          id="name"
          type={"text"}
          name="name"
          value={data.name}
          onChange={handlechange}
          className="bg-slate-200 p-1 my-1"
          required
        />
        <label htmlFor="category">category</label>
        <select
          value={data.category}
          name="category"
          onChange={handlechange}
          className="bg-slate-200 p-1 my-1"
          id="category"
        >
          <option></option>
          <option>Others</option>
          <option>Fruit</option>
          <option>Vegetable</option>
          <option>Ice Cream</option>
          <option>Dosa</option>
          <option>Pizza</option>
        </select>
        <label
          htmlFor="image"
          className=" bg-slate-300 w-full h-40 my-3 rounded flex items-center justify-center "
        >
          <div>
            {data.image ? (
              <img src={data.image} className=" h-40" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}
            {/* <img src={data.image ? data.image : "sorry"}  />
            <span className="text-5xl">
              <BsCloudUpload /></span> */}
            <input
              type={"file"}
              id="image"
              name="image"
              className="hidden"
              onChange={handleUploadimage}
              accept="image/*"
            />
          </div>
        </label>

        <label htmlFor="price">price</label>
        <input
          type={"text"}
          id="price"
          value={data.price}
          name="price"
          className="bg-slate-200 p-1 my-1"
          onChange={handlechange}
        />

        <label htmlFor="description">description</label>
        <textarea
          value={data.description}
          rows={3}
          onChange={handlechange}
          id="description"
          name="description"
          className="bg-slate-200 resize-none "
        />
        <button className="my-2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          save
        </button>
      </form>
    </div>
  );
}

export default Newproduct;
