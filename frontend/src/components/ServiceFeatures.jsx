import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineHeadsetMic } from "react-icons/md";

const ServiceFeatures = () => {
  const features = [
    {
      icon: (
        <LiaShippingFastSolid className="text-5xl transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
      ),
      title: "Free Shipping",
      subtitle: "For all Orders Over $100",
    },
    {
      icon: (
        <IoWalletOutline className="text-5xl transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
      ),
      title: "Secured Payment",
      subtitle: "Payment Cards Accepted",
    },
    {
      icon: (
        <MdOutlineHeadsetMic className="text-5xl transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
      ),
      title: "Support 24/7",
      subtitle: "Contact us Anytime",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-1">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="group flex flex-col items-center text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4 cursor-pointer"
          aria-label={feature.title}
        >
          {feature.icon}
          <p className="text-lg font-semibold mt-3">{feature.title}</p>
          <p className="text-sm font-medium mt-1 text-gray-600">
            {feature.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ServiceFeatures;
