import React from "react";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-3 py-10">
      <div className="w-full max-w-6xl bg-gradient-to-r from-[#2c2a63] to-[#3e3c76] backdrop-blur-xl p-5 sm:p-8 md:p-10 rounded-2xl shadow-2xl border border-white/10">
        {/* Title */}
        <h2 className="text-center text-xl sm:text-2xl md:text-4xl font-bold text-white">
          Get in Touch with{" "}
          <span className="text-primary">Smart Online Store</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* LEFT SIDE - Contact Info */}
          <div className="text-white space-y-5">
            <h3 className="text-lg sm:text-xl font-semibold">
              Contact Information
            </h3>

            <p className="text-slate-300 text-sm sm:text-base">
              Need help or have questions? Reach out to us anytime.
            </p>

            <div className="space-y-4 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <HiLocationMarker className="text-primary text-xl sm:text-2xl" />
                <p>
                  <span className="font-semibold">Address:</span> Bhimdatt-18,
                  Kanchanpur, Nepal
                </p>
              </div>

              <div className="flex items-start gap-3">
                <HiMail className="text-primary text-xl sm:text-2xl" />
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  harkdhami08@gmail.com
                </p>
              </div>

              <div className="flex items-start gap-3">
                <HiPhone className="text-primary text-xl sm:text-2xl" />
                <p>
                  <span className="font-semibold">Phone:</span> +977 986 2460
                  586
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <form className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Hark Dhami"
                className="w-full mt-1 px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                placeholder="harkdhami08@gmail.com"
                className="w-full mt-1 px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium">
                Your Message
              </label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                className="w-full mt-1 px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-base sm:text-lg font-semibold rounded-lg bg-primary text-white hover:opacity-90 transition"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
