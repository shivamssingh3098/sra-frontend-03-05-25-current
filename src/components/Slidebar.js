// src/components/Sidebar.js
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    "Dashboard",
    "Applications",
    "Services",
    "Reports",
    "Settings",
  ];

  return (
    <>
      {/* Hamburger (Mobile Only) */}
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={28} />
      </button>

      {/* Sidebar (Overlay for Mobile, Static for Desktop) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-800 text-white z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:flex md:flex-col`}
      >
        {/* Close button (Mobile only) */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="p-6 flex flex-col space-y-4 text-lg">
          {links.map((link, idx) => (
            <a
              key={idx}
              href="#"
              className="hover:bg-blue-600 p-2 rounded transition-all"
              onClick={() => setIsOpen(false)} // auto close on mobile click
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Backdrop when sidebar open (Mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
