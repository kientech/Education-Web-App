import React, { useState, useEffect } from "react";

const Collapsible = ({ title, children, isOpen }) => {
  const [open, setOpen] = useState(isOpen);

  const toggleCollapse = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div className="border border-gray-300 rounded-lg my-4 overflow-hidden">
      <button
        onClick={toggleCollapse}
        className="w-full text-left p-4 bg-[#fff] hover:bg-gray-50 focus:outline-none flex justify-between items-center"
      >
        <span className="font-medium">{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        className={`transition-max-height duration-500 ease-in-out ${
          open ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
