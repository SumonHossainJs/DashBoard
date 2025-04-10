import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import newRequest from '../../Utils/newRequest';
import Loading from '../../Utils/Loading';
import Single from '../../components/single/Single';

const SingleOrder = () => {
const location = useLocation();
    const lastId = location.pathname.split("/").filter(Boolean).pop();
    const [loading, setLoading] = useState(false);
    const [OrderData, setOrderData] = useState({});

    useEffect(() => {
      const fetchOrder = async () => {
        try {
          const response = await newRequest.get(`/order/product/${lastId}`);
          const Order = response.data;
          setOrderData(Order);
          console.log(Order);
  
        
          
        } catch (error) {
          console.error("Error fetching Order details:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrder();
    }, [lastId]);

  return (
    <div>
       <h2>Order Details</h2>
       <div className="order-info">
        <span>Adjustments : {OrderData.adjustment}</span>
        <span>product Quantity: {OrderData.cartQuantityTotal}</span>
        <span>Order Price: {OrderData.cartTotalAmount}</span>
        <span>Client Contact: {OrderData.whatsapp
        }</span>

        {OrderData?.cartItemIds?.map((data,i)=>(
          <Link to={`/product/${data}`}>View product</Link>
        ))}
       </div>
    </div>
  )
}

export default SingleOrder