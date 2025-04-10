import React, { useEffect, useState } from "react";
import "./Products.scss";
import Add from "../../components/add/Add";

import axios from "axios";
import newRequest from "../../Utils/newRequest.js";
import { showSuccessAlert, AlertonDelete, AlertError } from "../../Utils/Alert.js";
import { Link } from "react-router-dom";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("website");
  const [products, setproducts] = useState([]);


  useEffect(() => {
    const getProductsBytype = async () => {
      try {
        const data = await axios.get(
          `http://localhost:3030/product/pCate/${type}`
        );
        console.log(data.data);
        setproducts(data?.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProductsBytype();
  }, [type]);

  const handleDelete = async (id, refreshData) => {
    try {
      const res = await newRequest.delete(`/product/delete/${id}`);
      console.log("Delete response:", res);
  
      if (res.status !== 200 && res.status !== 204) {
        throw new Error(`Unexpected status code: ${res.status}`);
      }
  
      
      if (refreshData) {
        refreshData();
      }
      return res; 
    } catch (err) {
      console.error("Error in handleDelete:", err);
      throw err;
    }
  };
  

  return (
    <div className="products">
      <h3>Select a Item category</h3>
      <div className="typeButtons">
        <button onClick={() => setType("website")}>Website</button>
        <button onClick={() => setType("mobile-app")}>Mobile app</button>
        <button onClick={() => setType("graphic-design")}>Graphic Design</button>
        <button onClick={() => setType("motion")}>Motion</button>
      </div>
      <div className="info">
        <h2> {type} Products</h2>
        <Link to={"/upload"}>
          <button onClick={() => setOpen(true)}>Add New Products</button>
        </Link>
      </div>
      <div className="product-container">
        {products.map((data, index) => (
          <div className="p-box" key={index}>
            <img
              src={
                data.thumbnail
              }
              alt=""
            />

            <div className="actions">
              <Link to={`/update/${data?._id}`}>
                <button>
                  <i class="fas fa-edit"></i>
                </button>
              </Link>

              <Link to={`/product/${data._id}`} className="view">
                <i class="fas fa-eye"></i> View
              </Link>
              <button
                onClick={() =>
                  AlertonDelete(
                    data?._id,
                    handleDelete,
                    "Are you sure you want to delete this product?",
                    "Product deleted successfully!"
                  )
                }
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
            <div className="p-info">
              <h3>{data.title}</h3>
              <p>$ {data.price}</p>
            </div>
          </div>
        ))}
      </div>

      {open && <Add slug="product" setOpen={setOpen} />}
    </div>
  );
};

export default Products;
