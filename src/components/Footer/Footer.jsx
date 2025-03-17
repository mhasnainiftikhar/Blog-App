import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t-2 border-gray-700 animate-fadeIn">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap justify-between">
          {/* Left Section: Logo & Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="120px" />
              </div>
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} All Rights Reserved by PlanTech.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          {[
            { title: "Company", links: ["Features", "Pricing", "Affiliate Program", "Press Kit"] },
            { title: "Support", links: ["Account", "Help", "Contact Us", "Customer Support"] },
            { title: "Legals", links: ["Terms & Conditions", "Privacy Policy", "Licensing"] },
          ].map((section, index) => (
            <div key={index} className="w-full p-6 md:w-1/2 lg:w-2/12">
              <div className="h-full">
                <h3 className="tracking-wide mb-5 text-xs font-semibold uppercase text-gray-300">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((item) => (
                    <li key={item}>
                      <Link
                        className="text-base font-medium text-gray-300 hover:text-white hover:scale-105 transition duration-300 ease-in-out"
                        to="/"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Glowing Light Effect */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-40 pointer-events-none"></div>
    </section>
  );
}

export default Footer;
