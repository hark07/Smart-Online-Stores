import React from "react";
import { assets, footerLinks } from "../assets/assets";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-5 bg-primary/10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        {/* Logo + Description */}
        <div>
          <Link to="/">
            <img
              src={assets.Logo1}
              alt="Logo"
              className="w-35 h-10 rounded-md"
            />
          </Link>

          <p className="max-w-[410px] mt-6">
            Smart Online Store & Delivery System is your trusted platform for
            fast and reliable product delivery.
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-pink-500 hover:text-white transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-400 hover:text-white transition"
            >
              <FaTwitter />
            </a>

            <a className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-700 hover:text-white transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="hover:underline transition">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright {new Date().getFullYear()} © Hark Dhami. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
