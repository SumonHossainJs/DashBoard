import React, { useEffect, useState } from "react";
import newRequest from "../../Utils/newRequest";
import { Link } from "react-router-dom";
import "./Porder.scss";
import { AlertonDelete, showSuccessAlert } from "../../Utils/Alert";

const Porders = () => {
  const [orders, setOrders] = useState([]);
  const [productOrders, setProductOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const [ordersRes, productOrdersRes] = await Promise.all([
          newRequest.get(`/order/get`),
          newRequest.get(`/order/get/product`),
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
  }, [refreshKey]);
  console.log(orders)
  console.log(productOrders)

  if (loading) return <p className="loading">Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  const handleDelete = async (id) => {
    try {
      await newRequest.delete(`/order/product/delete/${id}`);
      showSuccessAlert("Product Order deleted successfully.");
      refreshData();
    } catch (err) {
      console.log(err, "Failed to delete the Product Order.");
    }
  };

  const refreshData = () => {
  
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="user-order-container">
      

      <h4>Product Orders</h4>
      <div className="box-container">
        {productOrders.length === 0 ? (
          <p className="no-orders">No product orders found.</p>
        ) : (
          productOrders.map((productOrder, index) => (
            <div className="order-box" key={productOrder._id || index}>
                <button className="dbtn" onClick={()=> AlertonDelete(productOrder._id,handleDelete)}>X</button>
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

export default Porders;
