import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllPlaces } from "../service/app_service";
import { FaSearch } from "react-icons/fa";
import { usePlacesStore } from "../store/usePlacesStore";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const Places = () => {
  const { loading, getPlaces, places, searchPlaces } = usePlacesStore();
  const [search, setSearch] = useState('')

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  // console.log(places)

  const handleSearch = () => {
    // e.preventDefault();
    searchPlaces({ search: search })
  }

  // if (loading) {
  //   return (
  //     <div style={{ textAlign: "center", alignItems: "center" }}>
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="flex justify-center items-center">
            <Link to={"/menu"} className="back-btn">
              {" "}
              <i className="icon-left" />{" "}
            </Link>
            <h3 className="title">All Places</h3>
            {loading && <div>Loading...</div>}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="rounded-full border-2 border-gray-200 px-4">
          <div className="flex items-center gap-2">
            <FaSearch />
            {/* <GooglePlacesAutocomplete
              placeholder="Your Location"
              selectProps={{
                search,
                onChange: setSearch,
                styles: {
                  selectProps: (provided) => ({
                    ...provided,
                    padding: "0.75rem",
                    backgroundColor: "none",
                    borderRadius: "9999px",
                    outline: "none",
                    width: "100%",
                    transition: "border-color 0.2s ease-in-out",
                  }),
                },
              }}
              apiKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
            /> */}
            {/* <form onSubmit={handleSearch} > */}
            <input
              required
              className="w-full border-xl p-4 focus:outline-none"
              placeholder="Search"
              onClick={(e) => setSearch(e.target.value)}
              type="text"
            />
            <button onClick={handleSearch} className="border-2 border-gray-200 px-4 py-2 rounded-lg">Search</button>
            {/* </form> */}
          </div>
        </div>

        {!places ? (<div>No results found</div>) : (
          <>
            {places.map((item, index) => (
              <div className="list-bill-view mb-4 mt-4" key={index}>
                <img src={item?.imageUrl} style={{ height: 22, width: 22 }} />
                <div className="content">
                  <h4>
                    <Link
                      to={`/place/${item?.id}`}
                      className="fw_6"
                      previewlistener="true"
                    >
                      {item?.name}
                    </Link>
                  </h4>
                  <p>
                    <a href={`tel:${item?.phoneNumber}`}>{item?.phoneNumber}</a>
                  </p>
                  <p>
                    <a
                      href={`http://maps.google.com/maps?q=${item?.address}`}
                      target="_blank"
                    >
                      {item?.address}
                    </a>
                  </p>
                </div>
                <i className="icon-right" />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Places;
