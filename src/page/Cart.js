import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import Contact from "./Contact";
import CardFeature from "../components/CardFeature";
import empty from "../images/empty.gif";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

function Cart() {
  const productCartitem = useSelector((state) => state.product.cartitem);
  console.log(productCartitem, "heloooooooooooooooooooooosdgjhgqsdooooo");

  const Totaleprice = productCartitem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const TotaleQty = productCartitem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    // const res = await fetch(
    //     `${process.env.REACT_APP_SERVER_DOMAIN}/check-payment `,
    //     {
    //       method: "POST",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify(productCartitem),
    //     }
    //   );

    //   const data = await res.json();

    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

console.log("hello");

try {
  const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Corrected header field name
    },
    body: JSON.stringify(productCartitem),
  });

  if (res.statusCode === 500) {
    // Handle the error here, e.g., display an error message
    console.error("Server error");
    return;
  }

  const data = await res.json();
  console.log(data, "hello");
  toast("Redirecting to payment Gateway...");

  // Redirect to the Stripe checkout page
 const stripp =  await stripePromise.redirectToCheckout({ sessionId: data.sessionId });
} catch (error) {
  // Handle any network or other errors here
  console.error(error);
}
  };
  return (
    <>
      <div className="p-2    md:p-4">
        <h2 className="text-lg md:text-2xl  font-blod text-slate-600">
          Your Cart items
        </h2>

        {productCartitem[0] ? (
          <div className="my-4  flex gap-3 flex-wrap">
            {/* Display Cart itam  aaaaaaaaaaaaaaa */}

            <div className="w-full   max-w-lg">
              {productCartitem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    _id={el._id}
                    name={el.name}
                    image={el.image}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                    category={el.category}
                  />
                );
              })}
            </div>

            {/* total cart item aaaaaaaaaaaaaaa */}
            <div className="w-full  max-w-md bg-slate-100 ml-auto">
              <div className="bg-white p-1 shadow-2xl rounded">
                <h2 className="bg-blue-400 text-white p-2 text-lg rounded">
                  Summary{" "}
                </h2>
                <div className=" flex w-full py-2 text-lg ">
                  <p>Total Quantity : </p>
                  <p className="ml-auto w-32 font-bold ">{TotaleQty}</p>
                </div>
                <div className=" flex w-full py-2 text-lg ">
                  <p>Total Price :</p>
                  <p className="ml-auto w-32 font-bold ">{Totaleprice}</p>
                </div>
                <button
                  onClick={handlePayment}
                  className="bg-slate-300 w-full hover:bg-slate-400  text-black font-bold    py-2 rounded"
                >
                  Payment
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img src={empty} className=" w-full max-w-sm" />
              <p className=" text-slate-500 text-3xl font-blod">EMPTY CART</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
