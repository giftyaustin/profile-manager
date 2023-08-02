import React from "react";
import "./card.css"

const Card = ({currUser, createTeam}) => {
  return (
    <div  className="total">
        <div className="total">
      
            
        <div className="card-holder" key={currUser.id}>
          <div className="card">
           <div className="avatar-name-holder">
            {/* <img src={currUser.avatar} alt="avatar" className="avatar"/> */}
            <h4 className="person-name">
              {currUser.first_name} {currUser.last_name}
            </h4>{createTeam? <div><input type="checkbox" onClick={(e)=>{
              if(e.target.checked){
                sessionStorage.setItem(currUser.id, JSON.stringify(currUser))
              }
              else if(sessionStorage.getItem(currUser.id)){
                sessionStorage.removeItem(currUser.id)
              }
            }}/></div>:""}</div>
            <div className="details-holder"><div className="details">ID: {currUser.id}</div>
            <div className="details">Email: {currUser.email}</div>
            <div className="details">Gender: {currUser.gender}</div>
            <div className="details">Domain: {currUser.domain}</div>
            <div className="details">Available: {currUser.available===true?"Yes":"No"}</div></div>
          </div>
        </div>
    </div> </div>
  );
};

export default Card;
