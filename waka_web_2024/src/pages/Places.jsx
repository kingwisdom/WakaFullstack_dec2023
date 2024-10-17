import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllPlaces } from "../service/app_service";
import { FaSearch } from "react-icons/fa";
import { usePlacesStore } from "../store/usePlacesStore";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const Places = () => {
  const { loading, getPlaces, places, searchPlaces, searchPlacesResult } = usePlacesStore();
  const [search, setSearch] = useState('')

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  // console.log(places)

  const handleSearch = () => {
    // e.preventDefault();
    if (search.length < 3) return
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

            <input
              required
              className="w-full border-xl p-4 focus:outline-none"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={handleSearch}
              type="text"
            />
            {/* <button onClick={handleSearch} className="border-2 border-gray-200 px-4 py-2 rounded-lg">Search</button> */}
          </div>

        </div>
        {searchPlacesResult.length > 0 && search.length > 0 && (

          <div className="mt-4 p-4 bg-white border rounded-lg shadow-md">
            <h3 className="font-bold">Search Result:</h3>
            <hr />
            {searchPlacesResult.map((item, index) => (
              <div className="collapse collapse-plus bg-base-200 mb-4" key={index}>
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-xl font-medium">{item?.name}</div>
                <div className="collapse-content">
                  <p>{item?.address}</p>
                </div>
              </div>

              // <p key={index}>{item?.name}</p>
            ))}
          </div>
        )}

        {!places ? (<div>No results found</div>) : (
          <>
            {places.map((item, index) => (
              <div className="flex flex-col md:flex-row list-bill-view mb-4" key={index}>
                <div className="card bg-base-100 w-76 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">{item?.name}</h2>
                    <p>{item.address}</p>
                    <div className="card-actions justify-end">
                      <a href={`http://maps.google.com/maps?q=${item?.address}`} target="_blank" className="btn btn-primary">Visit</a>
                    </div>
                  </div>
                </div>
              </div>
              // <div className="list-bill-view mb-4 mt-4" key={index}>
              //   <img src={item?.imageUrl} style={{ height: 22, width: 22 }} />
              //   <div className="content">
              //     <h4>
              //       <Link
              //         to={`/place/${item?.id}`}
              //         className="fw_6"
              //         previewlistener="true"
              //       >
              //         {item?.name}
              //       </Link>
              //     </h4>
              //     <p>
              //       <a href={`tel:${item?.phoneNumber}`}>{item?.phoneNumber}</a>
              //     </p>
              //     <p>
              //       <a
              //         href={`http://maps.google.com/maps?q=${item?.address}`}
              //         target="_blank"
              //       >
              //         {item?.address}
              //       </a>
              //     </p>
              //   </div>
              //   <i className="icon-right" />
              // </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Places;
