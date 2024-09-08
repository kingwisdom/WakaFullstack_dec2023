import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllPlaces } from "../service/app_service";
import { FaSearch } from "react-icons/fa";

const Places = () => {
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    getPlace();
  }, []);

  const getPlace = () => {
    setLoading(true);
    GetAllPlaces()
      .then((resp) => {
        setPlaces(resp.data.returnObj);
        // console.log(resp.data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", alignItems: "center" }}>
        Loading...
      </div>
    );
  }

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
              type="text"
            />
          </div>
        </div>

        {places?.map((item, index) => (
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
      </div>
    </>
  );
};

export default Places;
