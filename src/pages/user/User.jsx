import { useEffect, useState } from "react"
import Single from "../../components/single/Single"
import UserCard from "../../components/UserCard/UserCard"
import { singleUser } from "../../data"
import "./user.scss"
import { useLocation } from "react-router-dom"
import newRequest from "../../Utils/newRequest"
import UserOrder from "../../components/UserOrder/UserOrder"

const User = () => {
  const location = useLocation();
    const lastId = location.pathname.split("/").filter(Boolean).pop();

    const [user, setUser] = useState({})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await newRequest.get(`/user/find/${lastId}`); 
        setUser(response.data);
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
    <div className="user">
      <UserCard user={user}/>
      <UserOrder lastId={user._id}/>
    </div>
  )
}

export default User