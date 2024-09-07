import React from "react";
import { FaUser } from "react-icons/fa6";
import { PiTrafficSignFill } from "react-icons/pi";
import { SiChatbot } from "react-icons/si";
import { TbMapPins } from "react-icons/tb";

const Footer = () => {
  return (
    <div className="w-full sm:w-[65%] sm:left-[18%] bg-white shadow-md fixed bottom-0">
      <div className="flex justify-around p-2">
        {/* Traffic Icon */}
        <button className="flex flex-col items-center text-yellow-500">
          <PiTrafficSignFill />
          <span className="text-xs font-medium">Traffic</span>
        </button>

        {/* Parking Icon */}
        <button className="flex flex-col items-center text-gray-500 hover:text-yellow-500">
          <TbMapPins />
          <span className="text-xs font-medium">Parking</span>
        </button>

        {/* Messages Icon */}
        <button className="flex flex-col items-center text-gray-500 hover:text-yellow-500">
          <SiChatbot />
          <span className="text-xs font-medium">Messages</span>
        </button>

        {/* Profile Icon */}
        <button className="flex flex-col items-center text-gray-500 hover:text-yellow-500">
          <FaUser />
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default Footer;
