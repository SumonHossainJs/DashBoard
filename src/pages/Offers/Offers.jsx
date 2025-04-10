import React, { useEffect, useState } from "react";

import "./Offers.scss";
import { AlertError, showSuccessAlert } from "../../Utils/Alert";
import newRequest from "../../Utils/newRequest.js";

const Offers = () => {
  const [offer, SetOffer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSubTitle, setEditSubTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("website");
  const [fetchCategory, setfetchCategory] = useState("website");
  const [refreshKey, setRefreshKey] = useState(0);
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");

  const [thumb, setThumb] = useState("");
  const [actionUrl, setActionUrl] = useState("");

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        setError(null)
        setLoading(true);
        const response = await newRequest.get(`offer/type/${fetchCategory}`);
        SetOffer(response.data);
        console.log(response.data);
      } catch (err) {
        handleError(err, "Failed to fetch notices.");
      } finally {
        setLoading(false);
      }
    };
    if (fetchCategory) {
      fetchOffer();
    }
  }, [fetchCategory]);

  const handleError = (error, message) => {
    console.error(error);
    AlertError(error.response?.data?.message || "An error occurred.");
    setError(error.response?.data?.message || message || "An error occurred.");
  };
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditTitle(offer[index].title);
    setTime(offer[index].time);
    setPrice(offer[index].price);
    setThumb(offer[index].thumb);
  };
  const handleSave = async (index, id) => {
    try {
      const updatedData = {
        title: editTitle,
        thumb: thumb,

        price: price,
        time: time,

        type: selectedCategory,
      };

      console.log(updatedData);
      const response = await newRequest.put(`/offer/update/${id}`, updatedData);
      console.log(response);
      const updatedOffer = [...offer];
      updatedOffer[index] = response.data;
      SetOffer(updatedOffer);
      setEditingIndex(null);
      showSuccessAlert("Offer updated successfully.");
    } catch (err) {
      handleError(err, "Failed to update the Offer.");
    }
  };

  const handleUpload = async () => {
    const payload = {
      title: editTitle,
      thumb: thumb,
      price: price,
      time: time,
      type: selectedCategory,
    };
    try {
      await newRequest.post("/offer/upload", payload);
      showSuccessAlert("Offer added successfully.");
      refreshData();
    } catch (err) {
      handleError(err, "Failed to upload the notice.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await newRequest.delete(`/offer/delete/${id}`);
      showSuccessAlert("Offer deleted successfully.");
      refreshData();
    } catch (err) {
      handleError(err, "Failed to delete the Offer.");
    }
  };

  const refreshData = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditTitle("");
    setEditUrl("");
  };

  if (loading) return <p>Loading...</p>;
  

  return (
    <div className="pl-con">
      <h3>Top Offer</h3>

      <div className="add-notice">
        <h4>Add a New Offer item</h4>
        <div className="input">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="title">Price:</label>
          <input
            type="text"
            placeholder="USD"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="Days">Add time:</label>
          <input
            type="text"
            placeholder="2026-01-28T23:59:59"
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="input">
          <label htmlFor="Pages">Image Url:</label>
          <input
            type="text"
            placeholder="Add Image Url"
            onChange={(e) => setThumb(e.target.value)}
          />
        </div>

        <div className="select">
          <label htmlFor=""> Type:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value={"website"}>Website</option>
            <option value={"mobile-app"}>Mobile_app</option>

            <option value={"graphic-design"}>Graphic</option>
          </select>
        </div>

        <button onClick={handleUpload}>Upload</button>
      </div>
    
        <div className="top-heading">
          <h4>Existing Offers</h4>
          <div className="select">
            <label htmlFor=""> Offer Type: </label>
            <select
              value={fetchCategory}
              onChange={(e) => setfetchCategory(e.target.value)}
            >
              <option value={"website"}>Website</option>
              <option value={"mobile-app"}>Mobile_app</option>
              <option value={"graphic-design"}>Graphic</option>
            </select>
          </div>
        </div>
        {error ? (
        <h4>{error}</h4>
      ) : (
      <div className="items">
        {offer?.map((data, index) => (
          <div className="box" key={data._id}>
            {editingIndex === index ? (
              <div className="showcase-items edit">
                <div className="left">
                  <div className="select">
                    <label htmlFor=""> Type:</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value={"website"}>Website</option>
                      <option value={"mobile-app"}>Mobile app</option>
                      <option value={"graphic-design"}>Graphic design</option>
                    </select>
                  </div>

                  <div className="title">
                    <span>Title:</span>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </div>

                  <div className="comp-input">
                    <span>Price</span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <span>time</span>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="right">
                  <img src={thumb} alt="" />
                  <span>Image Url:</span>
                  <input
                    type="text"
                    value={thumb}
                    onChange={(e) => setThumb(e.target.value)}
                  />
                </div>

                <div className="btns">
                  <button onClick={() => handleSave(index, data._id)}>
                    Save
                  </button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="showcase-items">
                <div className="left">
                  <span className="type">{data.type}</span>
                  <h4>
                    <i class="fas fa-fire"></i> {data.subTitle}
                  </h4>
                  <h3> {data.title}</h3>
                  <div className="complements">
                    <p>time:{data.time}</p>
                    <p>Price:{data.price}</p>
                  </div>
                </div>
                <div className="right">
                  <div className="img">
                    <img
                      src={
                        data.thumb
                          ? data.thumb
                          : "https://images.unsplash.com/photo-1731271140119-34ad9551ff10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
                      }
                      alt=""
                    />
                  </div>
                </div>

                <div className="btns">
                  <button onClick={() => handleEdit(index)}>
                    <i class="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(data._id)}>
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default Offers;
