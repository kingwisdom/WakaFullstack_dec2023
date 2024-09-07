import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FaLocationDot } from "react-icons/fa6";
import { MdMyLocation } from "react-icons/md";

const Home = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState();
  let [response, setResponse] = useState();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [DATA, setDATA] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(to.label, from.label)
    if (!from || !to) {
      return window.alert("Please fill your location");
    }
    setIsLoading(true);
    fetch(
      `https://dev.virtualearth.net/REST/V1/Routes/Driving?o=json&wp.0=${from.label}&wp.1=${to?.label}&maxSolns=3&optmz=timeWithTraffic&key=AjFc0im6uSRCTMsEeyIcgHnTlc-E1O42J0G0mIVeU65vDw1cmc_eHB-8z8xh7tRo#`
    )
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(false);
        console.log(result);
        const returnObj = trafficAnalysis(result);
        // console.log(returnObj)
        setDATA(returnObj);
        // setTo('');
        // setFrom('');
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
        console.log(error);

        setTo("");
        setFrom("");
      });
  };

  const formatTime = (timeString) => {
    let timeArr = timeString.split(":");
    if (timeArr[0].charAt(0) == "0") {
      timeArr[0] = timeArr[0].charAt(1);
    }
    let timeres =
      timeArr[0] == "00" || timeArr[0] == "0"
        ? `${timeArr[1]} mins`
        : `${timeArr[0]}hr ${timeArr[1]} mins`;
    return timeres;
  };

  const getTrafficColor = (trafficStatus) => {
    let colour = "";
    switch (trafficStatus) {
      case "None":
        colour = "#00FF00";
        break;
      case "Mild":
        colour = "#e2f567";
        break;
      case "Medium":
        colour = "#FFBF00";
        break;
      case "Heavy":
        colour = "#FF0000";
        break;

      default:
        colour = "#282929";
        break;
    }
    return colour;
  };
  const getContent = () => {
    if (isLoading) {
      // return <ActivityIndicator size={"large"} />
    }
  };

  const trafficAnalysis = (respObj) => {
    let returnedRouteData = [];
    let majorRoutes = respObj.resourceSets[0].resources;
    for (let i = 0; i < majorRoutes.length; i++) {
      let routeData = {
        trafficStatus: majorRoutes[i].trafficCongestion,
        trafficColor: getTrafficColor(majorRoutes[i].trafficCongestion),
        normalTime: formatTime(
          new Date(majorRoutes[i].travelDuration * 1000)
            .toISOString()
            .substring(11, 19)
        ),
        trafficTime: formatTime(
          new Date(majorRoutes[i].travelDurationTraffic * 1000)
            .toISOString()
            .substring(11, 19)
        ),
        distance: `${Math.round(majorRoutes[i].travelDistance)}km`,
        via: majorRoutes[i].routeLegs[0].description,
        startLocation:
          majorRoutes[i].routeLegs[0].startLocation?.address.formattedAddress,
        endLocation:
          majorRoutes[i].routeLegs[0].endLocation?.address.formattedAddress,
      };

      returnedRouteData.push(routeData);
    }
    return returnedRouteData;
  };
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-col items-center p-6">
        <h2 className="text-lg font-semibold mb-6">
          Get Your Destination Traffic
        </h2>

        {/* Location & Destination Inputs */}
        <div className="space-y-4 w-full max-w-xs">
          {/* Your Location */}
          <form onSubmit={handleSearch}>
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className=" text-yellow-500">
                  <MdMyLocation />
                </span>
                <div className="w-full mb-3">
                  <GooglePlacesAutocomplete
                    placeholder="Your Location"
                    selectProps={{
                      from,
                      onChange: setFrom,
                      styles: {
                        input: (provided) => ({
                          ...provided,
                          padding: "0.75rem", // Tailwind `py-3` and `pl-4`
                          backgroundColor: "#f3f4f6", // Tailwind `bg-gray-100`
                          borderRadius: "9999px", // Tailwind `rounded-full`
                          border: "1px solid #e5e7eb", // Tailwind `border-gray-200`
                          outline: "none",
                          transition: "border-color 0.2s ease-in-out",
                          "&:focus": {
                            borderColor: "#f59e0b", // Tailwind `focus:border-yellow-500`
                            boxShadow: "0 0 0 2px #f59e0b", // Tailwind `focus:ring-2 focus:ring-yellow-500`
                          },
                        }),
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "#f3f4f6", // Tailwind `bg-gray-100`
                          borderRadius: "9999px", // Tailwind `rounded-full`
                          border: "1px solid #e5e7eb", // Tailwind `border-gray-200`
                          "&:hover": {
                            borderColor: "#f59e0b", // Tailwind `hover:border-yellow-500`
                          },
                        }),
                        dropdownIndicator: (provided) => ({
                          ...provided,
                          color: "#f59e0b", // Tailwind `text-yellow-500`
                          "&:hover": {
                            color: "#f59e0b", // Tailwind `hover:text-yellow-500`
                          },
                        }),
                        menu: (provided) => ({
                          ...provided,
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", // Tailwind `shadow-lg`
                          padding: "0.5rem 0", // Tailwind `py-2`
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isFocused ? "#fef3c7" : "#fff", // Tailwind `bg-yellow-100`
                          color: "#000",
                          transition: "background-color 0.2s ease-in-out",
                        }),
                      },
                    }}
                    apiKey="AIzaSyDdPA4KvHJqpbTOI2Ed_wve_eUIGh9w5p0"
                  />
                </div>
                {/* <GooglePlacesAutocomplete
                  selectProps={{
                    from,
                    onChange: setFrom,
                  }}
                  placeholder="Current Location"
                  apiKey="AIzaSyDdPA4KvHJqpbTOI2Ed_wve_eUIGh9w5p0"
                  className="pl-4 w-full p-3 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                /> */}
                {/* <input
                type="text"
                placeholder="Your Location"
                className="pl-4 w-full p-3 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              /> */}
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
            {/* View Traffic Options Button */}
            <button
              type="submit"
              className="mt-6 w-full max-w-xs p-3 bg-yellow-500 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600"
            >
              View Traffic Options
            </button>
          </form>
        </div>
      </div>

      <div className="min-h-screen sm:w-[65%] mx-auto bg-gray-50 p-6">
        <h2 className="text-lg font-semibold mb-4">Results</h2>

        {/* First Card */}
        <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2 space-x-2">
            <span className="bg-green-200 text-green-700 font-semibold py-1 px-3 rounded-full text-xs">
              Light
            </span>
            <span className="bg-yellow-200 text-yellow-700 font-semibold py-1 px-3 rounded-full text-xs">
              Route A
            </span>
            <span className="bg-gray-200 text-gray-700 font-semibold py-1 px-3 rounded-full text-xs">
              125 Km
            </span>
          </div>
          <h3 className="text-xl font-semibold">Eputu Mall</h3>
          <p className="text-gray-600">
            Via Third Mainland Bridge, Lagos - Ojo Expressway
          </p>

          <hr className="my-4" />

          <p className="text-gray-600 text-sm mb-4">
            On normal traffic, estimated time is usually{" "}
            <span className="font-bold">1hr 17 min</span>. Current traffic shows
            a <span className="font-bold">43 min</span> delay, giving a total of{" "}
            <span className="font-bold">2hrs</span> on this route.
          </p>
          <div className="bg-yellow-100 text-yellow-700 font-semibold text-center py-3 rounded-lg">
            Estimated Arrival at 2:42 PM
          </div>
        </div>

        {/* Second Card */}
        {/* <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="flex items-center mb-2 space-x-2">
            <span className="bg-yellow-300 text-yellow-800 font-semibold py-1 px-3 rounded-full text-xs">
              Moderate
            </span>
            <span className="bg-yellow-200 text-yellow-700 font-semibold py-1 px-3 rounded-full text-xs">
              Route B
            </span>
            <span className="bg-gray-200 text-gray-700 font-semibold py-1 px-3 rounded-full text-xs">
              120 Km
            </span>
          </div>
          <h3 className="text-xl font-semibold">Eputu Mall</h3>
          <p className="text-gray-600">
            Via, Carter Bridge, Idumota - CMS Expressway
          </p>

          <hr className="my-4" />

          <p className="text-gray-600 text-sm mb-4">
            On normal traffic, estimated time is usually{" "}
            <span className="font-bold">1hr 17 min</span>. Current traffic shows
            a <span className="font-bold">1hr 43 min</span> delay, giving a
            total of <span className="font-bold">3hrs</span> on this route.
          </p>
          <div className="bg-yellow-100 text-yellow-700 font-semibold text-center py-3 rounded-lg">
            Estimated Arrival at 4:30 PM
          </div>
        </div> */}
      </div>

      <div className="h-[500px]"></div>
    </div>
  );
};

export default Home;
