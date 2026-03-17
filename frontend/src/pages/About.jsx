import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full bg-gray-50 mt-4">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-primary to-primary-dull text-white rounded-md">
        <div className="max-w-[1260px] mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            About Us
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Smart Online Store & Delivery System is a modern platform that
            enables users to shop online, place orders easily, and receive fast,
            reliable deliveries.
          </p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="max-w-[1260px] mx-auto px-4 py-16 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* TEXT */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              About Smart Online Store
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
              Smart Online Store & Delivery System is a web-based application
              designed to digitalize the shopping and delivery process for
              customers and store owners.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              The system allows customers to browse products, add items to cart,
              make secure payments, and track their orders in real time with
              efficient delivery support.
            </p>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              alt="Team"
              className="rounded-xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16">
        <div className="max-w-[1260px] mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10">
            Why Choose Smart Online Store
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* CARD 1 */}
            <div className="bg-gray-100 p-6 rounded-xl text-center hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2">
                Smart Ordering System
              </h3>
              <p className="text-gray-600 text-sm">
                Users can easily browse products, add items to cart, and place
                orders through a simple and user-friendly interface.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="bg-gray-100 p-6 rounded-xl text-center hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2">
                Fast & Reliable Delivery
              </h3>
              <p className="text-gray-600 text-sm">
                Orders are processed quickly with real-time delivery status
                updates ensuring timely and reliable service.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="bg-gray-100 p-6 rounded-xl text-center hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2">
                Secure & Scalable Platform
              </h3>
              <p className="text-gray-600 text-sm">
                Built using modern technologies with secure authentication and a
                scalable architecture for future growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-primary-dull text-white py-16 rounded-md">
        <div className="max-w-[1260px] mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Experience Smart Shopping Today
          </h2>
          <p className="mb-6 text-sm sm:text-base">
            Shop smarter, order faster, and get delivered with ease using our
            platform.
          </p>
          <Link to="/products">
            <button className="bg-white text-primary-dull px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition">
              Start Shopping
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;