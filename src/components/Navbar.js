import React from "react";
import { NavLink , Link} from "react-router-dom";



function Navbar() {
  return (
    <div className="navbar">
      <div className="home">
        <Link to="/"><h4>SMOOVIES</h4></Link>
      </div>
      <div className="nav-links">
      <NavLink to="/movies">Movies</NavLink>
      <NavLink to="/tvshows">Tv Shows</NavLink>
      <NavLink to="/about">About</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
