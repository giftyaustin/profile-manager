import React from "react";
import "./card.css"

const Card = ({ count, data }) => {
  return (
    <div >
        <div className="total">
      {count.map((c, i) => {
        return(
            
        <div className="card-holder" key={data[i].id}>
          <div className="card">
           <div className="avatar-name-holder">
            <img src={data[i].avatar} alt="avatar" className="avatar"/>
            <h4 className="person-name">
              {data[i].first_name} {data[i].last_name}
            </h4></div>
            <div className="details-holder"><div className="details">ID: {data[i].id}</div>
            <div className="details">Email: {data[i].email}</div>
            <div className="details">Gender: {data[i].gender}</div>
            <div className="details">Domain: {data[i].domain}</div>
            <div className="details">Available: {data[i].available===true?"Yes":"No"}</div></div>
          </div>
        </div>);
      })}
    </div> </div>
  );
};

export default Card;
