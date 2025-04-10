import React, { useEffect, useState } from "react";
import "./Order.scss";
import Visuals from "../../components/Visuals/Visuals";
import newRequest from "../../Utils/newRequest";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import Loading from "../../Utils/Loading";

import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";

const data = [
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
];

const Order = () => {
  const [Orders, setOrders] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [orderType, setOrderType] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [priceInputs, setPriceInputs] = useState({}); // For storing price inputs

  // Refresh data by incrementing refreshKey
  const refreshData = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  // Fetch all or filtered orders
  const fetchOrders = async () => {
    try {
      const endpoint = orderType ? `/order/cate/${orderType}` : "/order/get";
      const res = await newRequest.get(endpoint);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err.message || err);
    }
  };

  // Initial fetch and refresh handling
  useEffect(() => {
    fetchOrders();
  }, [refreshKey, orderType]);

  // Update order status
  const updateStatus = async (e, id) => {
    const newStatus = e.target.value;
    setLoadingStates((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await newRequest.put(`/order/update/${id}`, { status: newStatus });
      if (res.status === 200 || res.status === 204) {
        refreshData(); // Trigger refresh after update
      }
    } catch (err) {
      console.error("Error updating order:", err.message || err);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Update order price
  const updatePrice = async (id) => {
    const newPrice = priceInputs[id]; // Get the current price input for this order
    if (!newPrice) return; // Do nothing if the input is empty

    setLoadingStates((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await newRequest.put(`/order/update/${id}`, { price: newPrice });
      if (res.status === 200 || res.status === 204) {
        refreshData(); // Trigger refresh after update
      }
    } catch (err) {
      console.error("Error updating price:", err.message || err);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Delete order
  const handleDelete = async (id) => {
    try {
      await newRequest.delete(`/order/delete/${id}`);
      refreshData(); // Trigger refresh after delete
    } catch (err) {
      console.error("Error deleting order:", err.message || err);
    }
  };

  return (
    <div>
      <Visuals data={data} order />

      <h3>Sort by Order Category</h3>
      <div className="typeButtons">
        <button onClick={() => setOrderType("")}>All Orders</button>
        <button onClick={() => setOrderType("website")}>Website</button>
        <button onClick={() => setOrderType("mobileapp")}>Mobile App</button>
        <button onClick={() => setOrderType("graphic")}>Graphic</button>
        <button onClick={() => setOrderType("brand")}>Brand</button>
        <button onClick={() => setOrderType("motion")}>Motion</button>
      </div>

      <div className="table-container">
        <div className="head">
          <h3>Active Orders</h3>
        </div>

        <table className="responsive-table">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Order Type</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Orders.map((data, index) => (
              <tr key={data._id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{data._id}</td>
                <td>{data.Cat}</td>
                <td>{format(data.createdAt)}</td>
                <td>
                  {loadingStates[data._id] ? (
                    <Loading size="30px" color="blue" message="Updating status..." />
                  ) : (
                    <select
                      id="status-select"
                      value={data.status}
                      onChange={(e) => updateStatus(e, data._id)}
                    >
                      <option value="pending">Pending</option>
                      <option value="conformed">Conformed</option>
                      <option value="working">Working</option>
                      <option value="revision">Revision</option>
                    </select>
                  )}
                </td>
                <td>
                  {loadingStates[data._id] ? (
                    <Loading size="30px" color="blue" message="Updating price..." />
                  ) : (
                    <input
                      type="number"
                      value={priceInputs[data._id] || data.price}
                      onChange={(e) =>
                        setPriceInputs((prev) => ({ ...prev, [data._id]: e.target.value }))
                      }
                      style={{
                        width: "80px",
                        padding: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </td>
                <td>
                  <Link to={`/order/${data._id}`}>View</Link>
                  <button onClick={() => handleDelete(data._id)}>Delete</button>
                  <button
                    onClick={() => updatePrice(data._id)}
                    style={{
                      marginLeft: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#007BFF",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
