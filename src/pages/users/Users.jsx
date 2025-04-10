import React, { useEffect, useState } from "react";

import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import Add from "../../components/add/Add";
import { userRows } from "../../data";
import newRequest from "../../Utils/newRequest";

const Users = () =>{

  const [users, setUsers] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await newRequest.get("/user/alluser"); 
        console.log("Fetched users:", response.data); 
        setUsers(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err.message || err); 
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading indicator
  if (error) return <div>{error}</div>; // Show error message
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th> Name</th>
            <th className="created"> Admin</th>
            <th className="email">Email</th>
            <th className="created">Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td>
                <img
                  src={user.img}
                  alt={user.username}
                  className="avatar"
                />
              </td>
              <td>{user.username}</td>
              <td className="created">{user.isAdmin ? "✔️" : "❌"}</td>
              <td className="email">{user.email}</td>
              <td className="created">{user.createdAt}</td>
              
             
              <td> <a href={`/users/${user._id}`}> View</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> 

      </div>
      
    </div>
  );
};

export default Users;
