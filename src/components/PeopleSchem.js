import CONFIG from "../app.config"; // adjust path as needed
import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const PeopleSchem = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  const services = [
    {
      id: 1,
      title:
        "भा.इ - परिचयपत्र क्र. ४९ अन्यचे सहकार विभागाच्या अहवाल नुसार झोपडझोळमधीलच्या बँक खात्यावर भा.इ प्रदान तपशीलाच्या प्रमाणित प्रती देणे.",
    },
    {
      id: 2,
      title:
        "ना. हरकत (एन. आ. सो.) परिचयपत्र क्र. ३ अंतर्गत प्राप्त प्रस्तावाच्या अनुशंगाने निर्मित केलेल्या ना. हरकत (NOC) प्रमाणपत्राच्या प्रमाणित प्रती देणे.",
    },
    {
      id: 3,
      title: "परीशिष्ट IV च्या अधिकाऱ्याशी प्रमाणित प्रत्त",
    },
    // Add more services as needed
  ];

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const itemHeight =
        container.querySelector(".service-item")?.offsetHeight || 0;
      const scrollAmount = direction === "up" ? -itemHeight : itemHeight;

      container.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  useEffect(() => {
    let interval;
    if (isAutoScrolling && containerRef.current) {
      interval = setInterval(() => {
        handleScroll("down");
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  return (
    <div className="bg-[#3b3f82] min-h-screen flex items-start justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#3b3f82] text-white rounded-md shadow-md">
          {/* Search Bar */}
          <div className="flex items-center border-b border-[#2e3163] px-3 py-2">
            <input
              type="text"
              placeholder="Search service input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#3b3f82] placeholder-white text-white text-sm py-1 px-3 rounded focus:outline-none"
            />
            <FaSearch className="ml-2 text-white text-sm" />
          </div>

          {/* Services Grid */}
          <div className="relative">
            {/* Scroll Controls */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10">
              <button
                onClick={() => handleScroll("up")}
                className="bg-[#6a6fbd] p-1 rounded-full hover:bg-[#5a5fad] transition-colors"
              >
                <IoIosArrowUp className="text-white" />
              </button>
              <button
                onClick={toggleAutoScroll}
                className={`p-1 rounded-full transition-colors ${
                  isAutoScrolling
                    ? "bg-red-500"
                    : "bg-[#6a6fbd] hover:bg-[#5a5fad]"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </button>
              <button
                onClick={() => handleScroll("down")}
                className="bg-[#6a6fbd] p-1 rounded-full hover:bg-[#5a5fad] transition-colors"
              >
                <IoIosArrowDown className="text-white" />
              </button>
            </div>

            {/* Services List */}
            <div
              ref={containerRef}
              className="grid grid-cols-[60px_1fr] border-t border-[#2e3163] max-h-[500px] overflow-y-auto scrollbar-hide"
            >
              {/* Header */}
              <div className="border-b border-r border-[#2e3163] px-3 py-2 font-semibold text-center sticky top-0 bg-[#3b3f82]">
                सेवा क्र.
              </div>
              <div className="border-b px-3 py-2 font-semibold sticky top-0 bg-[#3b3f82]">
                Search service input
              </div>

              {/* Services */}
              {filteredServices.map((service, index) => (
                <React.Fragment key={service.id}>
                  <div
                    className={`border-b border-r border-[#2e3163] px-3 py-3 text-center service-item ${
                      index % 2 === 0 ? "bg-[#6a6fbd]" : ""
                    }`}
                  >
                    {service.id}
                  </div>
                  <div
                    className={`border-b px-3 py-3 text-sm leading-relaxed service-item ${
                      index % 2 === 0 ? "bg-[#6a6fbd]" : ""
                    }`}
                  >
                    {service.title}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleSchem;
