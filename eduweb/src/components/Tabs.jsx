import React, { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`py-2 px-4 text-sm font-medium focus:outline-none transition-colors duration-300 ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative mt-4">
        <div className="transition-all duration-500 ease-in-out">
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              activeTab === 0 ? "block" : "hidden"
            }`}
          >
            {tabs[0].content}
          </div>
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              activeTab === 1 ? "block" : "hidden"
            }`}
          >
            {tabs[1].content}
          </div>
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              activeTab === 2 ? "block" : "hidden"
            }`}
          >
            {tabs[2].content}
          </div>
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              activeTab === 3 ? "block" : "hidden"
            }`}
          >
            {tabs[3].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
