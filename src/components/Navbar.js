import React from "react";
import covid from "../images/Covid.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={covid} alt={covid} width="70"></img>
          <span className="text-danger">
            Egyption Covid-19 vaccination
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-danger me-lg-1 mb-sm-2">login</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary">signup</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
