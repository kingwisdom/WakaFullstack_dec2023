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
        <a href="/">
          <button className="flex flex-col items-center text-yellow-500">
            <PiTrafficSignFill />
            <span className="text-xs font-medium">Traffic</span>
          </button>
        </a>

        {/* Parking Icon */}
        <a href="/places">
          <button className="flex flex-col items-center text-gray-500 hover:text-yellow-500">
            <TbMapPins />
            <span className="text-xs font-medium">Popular places</span>
          </button>
        </a>

        {/* Messages Icon */}
        <a href="https://mimic-ai.vercel.app/">
          <button className="flex flex-col items-center text-gray-500 hover:text-yellow-500">
            <SiChatbot />
            <span className="text-xs font-medium">AI Chat</span>
          </button>
        </a>

        {/* Profile Icon */}
        <a href="/about">
          <button className="flex flex-col items-center text-gray-500 hover:text-yellow-500">
            <FaUser />
            <span className="text-xs font-medium">About</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Footer;
