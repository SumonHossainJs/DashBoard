import React, { useEffect, useState } from "react";
import newRequest from "../../Utils/newRequest";
import { Link } from "react-router-dom";
import "./userOrder.scss";

const UserOrder = ({ lastId }) => {
  const [orders, setOrders] = useState([]);
  const [productOrders, setProductOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const [ordersRes, productOrdersRes] = await Promise.all([
          newRequest.get(`/order/user/${lastId}`),
          newRequest.get(`/order/product/user/${lastId}`),
        ]);
        setOrders(ordersRes.data);
        setProductOrders(productOrdersRes.data);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
        console.error("Error fetching orders:", err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [lastId]);
  console.log(orders)
  console.log(productOrders)

  if (loading) return <p className="loading">Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="user-order-container">
      <h4>User Orders</h4>
      <div className="box-container">
        {orders.length === 0 ? (
          <p className="no-orders">No user orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div className="order-box" key={order._id || index}>
              <div className="card-head">
                <div className="left">
                  <h4>{order?.Cat || "Category Not Available"}</h4>
                  <span>Submitted: {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="right">
                  Status: <span>{order.status || "Unknown"}</span>
                </div>
              </div>
              <div className="card-body">
                <div className="item">
                  <p>Customer ID:</p> <span>{order.userId || "N/A"}</span>
                </div>
                <div className="item">
                  <p>Price:</p> <span>{order.price || "N/A"}</span>
                </div>
                <div className="item">
                  <p>Paid:</p> <span>{order.paid ? "Yes" : "No"}</span>
                </div>
              </div>
              <Link to={`/order/${order._id}`}>View Order Details</Link>
            </div>
          ))
        )}
      </div>

      <h4>Product Orders</h4>
      <div className="box-container">
        {productOrders.length === 0 ? (
          <p className="no-orders">No product orders found.</p>
        ) : (
          productOrders.map((productOrder, index) => (
            <div className="order-box" key={productOrder._id || index}>
              <div className="card-head">
                <div className="left">
                  <p>Product IDs:</p>
                  {productOrder?.cartItemIds?.map((id, i) => (
                    <h4 key={i}>{id}</h4>
                  ))}
                  <span>
                    Submitted:{" "}
                    {new Date(productOrder.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="card-body">
                <div className="item">
                  <p>Customer ID:</p> <span>{productOrder.userId || "N/A"}</span>
                </div>
                <div className="item">
                  <p>WhatsApp:</p> <span>{productOrder.whatsapp || "N/A"}</span>
                </div>
                <div className="item">
                  <p>Adjustments:</p> <span>{productOrder.adjustment || "None"}</span>
                </div>
                <div className="item">
                  <p>Paid:</p> <span>{productOrder.paid ? "Yes" : "No"}</span>
                </div>
              </div>
              <Link to={`/order/${productOrder._id}`}>View Order Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserOrder;
