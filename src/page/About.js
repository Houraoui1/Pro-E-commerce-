import React from "react";
import  track from "../images/delivery-track.jpeg";
function About() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 p-4 text-white">
        <h1 className="text-3xl font-semibold">
          Fastest Delivery to Your Home
        </h1>
      </header>
      <section className="p-4">
        <div className="flex justify-start items-center">
          <img src={track} alt="Delivery Truck" className="" />
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">
            Why Choose Our Fast Delivery Service?
          </h2>
          <p className="mt-2">
            We understand the importance of getting your orders to your doorstep
            as quickly as possible. That's why we offer the fastest delivery
            service in town.
          </p>
          <ul className="mt-2 list-disc list-inside">
            <li>Same-day delivery available.</li>
            <li>Wide range of products to choose from.</li>
            <li>Reliable and on-time delivery.</li>
            <li>Competitive delivery fees.</li>
          </ul>
          <p className="mt-2">
            Our dedicated team works around the clock to ensure your orders are
            processed and delivered with care.
          </p>
        </div>
      </section>
      <section className="p-4">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <ol className="mt-2 list-decimal list-inside">
          <li>Choose your products and add them to your cart.</li>
          <li>Proceed to checkout and select our fast delivery option.</li>
          <li>Confirm your order, and we'll take care of the rest.</li>
          <li>Track your delivery in real-time.</li>
          <li>Enjoy your products delivered to your doorstep.</li>
        </ol>
      </section>
      <section className="p-4">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p className="mt-2">
          Have questions or need assistance? Our customer support team is here
          to help you 24/7. Feel free to reach out to us through our
          <a href="/contact" className="text-blue-500 hover:underline">
            contact page
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default About;
