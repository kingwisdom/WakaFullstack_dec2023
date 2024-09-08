import React from "react";

const About = () => {
  return (
    <>
      <div className="header">
        <div className="container">
          <div className="">
            <a href="/" className="back-btn">
              {" "}
              <i className="icon-left" />{" "}
            </a>
            <h3 className="title">About</h3>
          </div>
        </div>
      </div>

      <div className="container">
        <ul className="mt-1">
          <li>
            <a href="#" className="list-profile outline" previewlistener="true">
              <p>Developer Details</p>
            </a>
          </li>
          <li>
            <a href="#" className="list-profile" previewlistener="true">
              <p>
                <strong>adeoyetemitayo99@gmail.com</strong>
              </p>
              <p>
                <strong>afeexclusive@gmail.com</strong>
              </p>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default About;
