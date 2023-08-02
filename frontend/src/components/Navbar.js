import React, {  useEffect, useState } from "react";
import "./navbar.css";
import { sendGETRequest } from "../utils/sendRequest";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  updateSearchedData,
  availabilityList,
  genderList,
  domainList,
  filterAvailable,
  filterDomain,
  filterGender
}) => {
  const history = useNavigate()
  const [searchedName, setSearchedName] = useState();
  const search = () => {
    if (searchedName) {
      updateSearchedData(searchedName);
    }
  };
  const [availability, setAvailability] = useState(Array(2).fill(false));
  
  const [gender, setGender] = useState(Array(8).fill(false));
  const [domain, setDomain] = useState(Array(7).fill(false));

const applyFilters=()=>{
  
  filterAvailable(availability,gender,domain);
  // filterGender(gender);
  // filterDomain(domain);
  

}



  return (
    <div>
      <nav className="navbar search-component">
        <div className="nav-holder">
          <div className="search-holder">
            <div className="search-input-holder">
              <input
                placeholder="search name"
                className="search-input"
                onChange={(e) => setSearchedName(e.target.value)}
              />
            </div>
            <div className="search-btn-holder">
              <button className="search-btn" onClick={search}>
                search
              </button>
            </div>
          </div>

  {/* ================= filters holder =============== */}
          <div className="filter-holder">
            <div className="filters">


        {/* ================ availability ================ */}
              <div className="A-holder">
                <p>Availability: </p>
                <div>
                  {availabilityList.map((c, i) => {
                    return (
                      
                        <label key={i}>
                          {c?"Yes":"No"} <input type="checkbox" onClick={(e)=>{
                            setAvailability(availability.map((ele,ind)=>{
                              if(i===ind){
                                return(e.target.checked)
                              }
                              else{
                                return ele;
                              }
                            }))
                          }}/>
                        </label>
                      
                    );
                  })}
                </div>
              </div>

 {/* ================ Gender ================ */}


              <div className="A-holder">
                <p>Gender: </p>
                <div>
                  {genderList.map((c, i) => {
                    return (
                      
                        <label key={i}>
                          {c} <input type="checkbox" onClick={(e)=>{
                            setGender(gender.map((ele,ind)=>{
                              if(i===ind){
                                return(e.target.checked)
                              }
                              else{
                                return ele;
                              }
                            }))
                          }}/>
                        </label>
                     
                    );
                  })}
                </div>
              </div>

 {/* ================ Domain ================ */}


              <div className="A-holder">
                <p>Domain: </p>
                <div>
                  {domainList.map((c, i) => {
                    return (
                      
                        <label key={i}>
                          {c} <input type="checkbox" onClick={(e)=>{
                            setDomain(domain.map((ele,ind)=>{
                              if(i===ind){
                                return(e.target.checked)
                              }
                              else{
                                return ele;
                              }
                            }))
                          }}/>
                        </label>
                     
                    );
                  })}
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </nav>
      {(availability.includes(true)||gender.includes(true)||domain.includes(true))?<button onClick={applyFilters}>Apply</button>:""}
    </div>
  );
};

export default Navbar;
