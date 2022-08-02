import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../LogOut/Logout";

export default function Navbar({ token, getToken }) {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-transparent shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to="home">
            FraGne
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex"
            id="collapsibleNavId"
          >
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              {token ? <>
                <li className="nav-item">
                  <Link to="home" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="movie" className="nav-link">
                    Movie
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="tv" className="nav-link">
                    Tv show
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="people" className="nav-link">
                    People
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="network" className="nav-link">
                    Network
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="about" className="nav-link">
                    About
                  </Link>
                </li>
              </> : ""}
            </ul>
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="fa-brands fa-facebook px-1"></i>
                <i className="fa-brands fa-instagram px-1"></i>
                <i className="fa-brands fa-twitter px-1"></i>
                <i className="fa-brands fa-spotify px-1"></i>
              </li>
              {token ? <>
                <li className="nav-item">
                  <Logout getToken={getToken} />
                </li>
              </> : <>
                <li className="nav-item">
                  <Link to="register" className="nav-link">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="login" className="nav-link">
                    Sign in
                  </Link>
                </li>
              </>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
