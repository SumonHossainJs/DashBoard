import "./topBox.scss";
import newRequest from "../../Utils/newRequest.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAccessTokenCookie } from "../../store/slices/userSlice.js";
import { useNavigate } from "react-router-dom";

const TopBox = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);
  const dispatch = useDispatch(); // Error state
  const currentUser = useSelector((state) => state.user.currentUser);
const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(checkAccessTokenCookie());
      if (!currentUser) {
        navigate("/auth");
      }
      try {
        const response = await newRequest.get("/user/alluser");
        console.log("Fetched users:", response.data);
        setUsers(response.data);
        setError(null);
      } catch (err) {
        if (!currentUser) {
          navigate("/auth");
        }
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
    <div className="topBox">
      <h1>Top Users</h1>
      <div className="list">
        {users.slice(0, 7).map((user) => (
          <div className="listItem" key={user.id}>
            <div className="user">
              <img
                src={user.img || "/placeholder.jpg"}
                alt={`${user.username}`}
              />{" "}
              {/* Fallback image */}
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <a href={`/users/${user._id}`}> View</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
