import React, { useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

function Contact() {
  const [data , setData] = useState({
    name:""
    ,
    email:""
    ,
    message:""
  })
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {

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
   
    const { name, email, message } = data;

    if (name && email && message ) {
      if (name) {
        const fetchdata = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/conatct`,
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
          Navigate("/login");
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
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 p-4 text-white">
        <h1 className="text-3xl font-semibold">Contact Us</h1>
      </header>
      <section className="p-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="mt-2">
            If you have any questions or need assistance, please don't hesitate
            to contact us. Our dedicated customer support team is here to help
            you.
          </p>
          <form className="mt-4"  onSubmit={hanldeonsubmit}  >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold"
              >
                Name
              </label>
              <input 
                type="text"
                id="name"
                value={data.name}
                onChange={handleChange}
                name="name"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={data.email}
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                onChange={handleChange}
                value={data.message}
                placeholder="Your Message"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
