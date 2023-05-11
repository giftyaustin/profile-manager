import React, { useState } from "react";
import "./navbar.css";

const Navbar = ({changeToUser}) => {
const [searchedName,setSearchedName]= useState();
const searchUser=()=>{
    changeToUser(searchedName)
}

  return (
    <div>
      <nav className="navbar search-component">
        <div className="">
          <div className="search-holder">
            <div className="search-input-holder">
              <input
                placeholder="search name"
                className="search-input"
                onChange={(e) => setSearchedName(e.target.value)}
              />
            </div>
            <div className="search-btn-holder">
              <button className="search-btn" onClick={searchUser}>search</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
