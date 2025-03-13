import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-800 border-t-2 border-t-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          {/* Company Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-wide mb-5 text-xs font-semibold uppercase text-gray-300">
                Company
              </h3>
              <ul className="space-y-4">
                {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        className="text-base font-medium text-gray-200 hover:text-white transition duration-300"
                        to="/"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Support Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-wide mb-5 text-xs font-semibold uppercase text-gray-300">
                Support
              </h3>
              <ul className="space-y-4">
                {["Account", "Help", "Contact Us", "Customer Support"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        className="text-base font-medium text-gray-200 hover:text-white transition duration-300"
                        to="/"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Legals Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-wide mb-5 text-xs font-semibold uppercase text-gray-300">
                Legals
              </h3>
              <ul className="space-y-4">
                {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        className="text-base font-medium text-gray-200 hover:text-white transition duration-300"
                        to="/"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
