import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { MdMyLocation } from 'react-icons/md'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-col items-center p-6">
        <h2 className="text-lg font-semibold mb-6">Get Your Destination Traffic</h2>
        
        {/* Location & Destination Inputs */}
        <div className="space-y-4 w-full max-w-xs">
          {/* Your Location */}
          <div className="relative">
            <div className="flex items-center gap-2">
            <span className=" text-yellow-500">
            <MdMyLocation />
            </span>
            <input
              type="text"
              placeholder="Your Location"
              className="pl-4 w-full p-3 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            </div>
          </div>

          {/* Choose Destination */}
          <div className="flex items-center gap-2">
            <span className=" left-2 top-2 text-yellow-500">
            <FaLocationDot />
            </span>
            <input
              type="text"
              placeholder="Choose destination"
              className="pl-4 w-full p-3 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* View Traffic Options Button */}
        <button className="mt-6 w-full max-w-xs p-3 bg-yellow-500 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600">
          View Traffic Options
        </button>
      </div>

      <div className="h-[500px]"></div>
</div>
    
  )
}

export default Home