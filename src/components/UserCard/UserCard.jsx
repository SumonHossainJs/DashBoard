import React from "react";
import "./UserCard.scss";
import { format } from "timeago.js";


const UserCard = ({user}) => {
    const handleDelete = (id) => {
        console.log(id);
    }
  return (
    <div className="next-patient-card">
      <div className="card-header">
        <h4>User Details</h4>
        <div className="navigation-icons">
          <span>{"<"}</span>
          <span>{">"}</span>
        </div>
      </div>
      <div className="card-body">
        <div className="patient-info">
          <img
            src={user.img}
            alt={user.username}
            className="patient-avatar"
          />
          <div className="patient-details">
            <p className="patient-name">{user.username}</p>
            <p className="patient-test">ID:{user._id}</p>
          </div>
          <div className="call-icon">
           
          </div>
        </div>
        <hr />
        <div className="appointment-time">
         <div>
            <span>Joined:</span>
         <span>{format(user.createdAt)}</span>
         </div>
         
          <div className="more-options" onClick={handleDelete(user._id)}>Delete</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
