import React from "react";
import { NavLink } from "react-router-dom";



function Navbar() {
  return (
    <div className="navbar">
      <div className="home">
        <NavLink to="/">SMOOVIES</NavLink>
      </div>
      <div className="nav-links">
      <NavLink to="/about">About</NavLink>
      <NavLink to="/movies">Movies</NavLink>
      <NavLink to="/tvshows">Tv Shows</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
