import React, { useEffect, useState } from "react";
import axios from "axios";
import newRequest from "../../../Utils/newRequest";
import Swal from "sweetalert2";
import "./Banners.scss";
import { showSuccessAlert } from "../../../Utils/Alert";

const Banners = () => {
  const [showcases, setShowcases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSubTitle, setEditSubTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Website");
  const [fetchCategory, setfetchCategory] = useState("Website");
  const [refreshKey, setRefreshKey] = useState(0);
  const [days, setDays] = useState("");
  const [price, setPrice] = useState("");
  const [pages, setPages] = useState("");
  const [thumb, setThumb] = useState("");
  const [actionUrl, setActionUrl] = useState("");


useEffect(() => {
  const fetchShowcase = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await newRequest.get(`showcase/type/${fetchCategory}`);
      setShowcases(response.data);
      console.log(response.data);
    } catch (err) {
      handleError(err, "Failed to fetch notices.");
    } finally {
      setLoading(false);
    }
  };
  if (fetchCategory) {
   fetchShowcase();
  }
  
}, [fetchCategory])


  const fetchShowcase = async () => {
    try {
    
      setLoading(true);
      const response = await newRequest.get(`showcase/type/${fetchCategory}`);
      setShowcases(response.data);
      console.log(response.data);
    } catch (err) {
      handleError(err, "Failed to fetch notices.");
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error, message) => {
    console.error(error);
    setError(error.response?.data?.message || message || "An error occurred.");
  };
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditTitle(showcases[index].title);
    setEditSubTitle(showcases[index].subTitle);
    setEditUrl(showcases[index].viewlink);
    setDays(showcases[index].days);
    setPrice(showcases[index].price);
    setPages(showcases[index].pages);
    setThumb(showcases[index].thumb);
    setActionUrl(showcases[index].actionlink);
  };
  const handleSave = async (index, id) => {
    try {
      const updatedData = {
        title: editTitle,
        thumb: thumb,
        subTitle: editSubTitle,
        price: price,
        days: days,
        pages: pages,
        viewlink: editUrl,
        type: selectedCategory,
      };
      const response = await newRequest.put(
        `/showcase/update/${id}`,
        updatedData
      );
      console.log(response);
      const updatedShowcases = [...showcases];
      updatedShowcases[index] = response.data;
      setShowcases(updatedShowcases);
      setEditingIndex(null);
      showSuccessAlert("Home banner updated successfully.");
    } catch (err) {
      handleError(err, "Failed to update the Home banner.");
    }
  };

  const handleUpload = async () => {
    const payload = {
      title: editTitle,
      thumb: thumb,
      subTitle: editSubTitle,
      price: price,
      days: days,
      pages: pages,
      viewlink: editUrl,
      type: selectedCategory,
      actionlink: actionUrl,
    };
    try {
      await newRequest.post("/showcase/add", payload);
      showSuccessAlert("Notice added successfully.");
      refreshData();
    } catch (err) {
      handleError(err, "Failed to upload the notice.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await newRequest.delete(`/showcase/delete/${id}`);
      showSuccessAlert("Notice deleted successfully.");
      refreshData();
    } catch (err) {
      handleError(err, "Failed to delete the notice.");
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

  useEffect(() => {
    fetchShowcase();
  }, [refreshKey]);


  if (loading) return <p>Loading...</p>;

  return (
    <div className="pl-con">
      <h3>Top Banners</h3>
      {showcases.length < 5 ? (
        <div className="add-notice">
          <h4>Add a New Banner item</h4>
          <div className="input">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="title">Sub title:</label>
            <input
              type="text"
              placeholder="SubTitle"
              onChange={(e) => setEditSubTitle(e.target.value)}
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
            <label htmlFor="Days">Days:</label>
            <input
              type="number"
              placeholder="Add days"
              onChange={(e) => setDays(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="Pages">Pages:</label>
            <input
              type="nubmer"
              placeholder="How many paes?"
              onChange={(e) => setPages(e.target.value)}
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
          <div className="input">
            <label htmlFor="Pages">View Link:</label>
            <input
              type="text"
              placeholder="Add view Url"
              onChange={(e) => setEditUrl(e.target.value)}
            />
          </div>
          <div className="select">
                  <label htmlFor=""> Action url:</label>
                  <select
                    value={actionUrl}
                    onChange={(e) => setActionUrl(e.target.value)}
                  >
                    <option value={"/newprojct"}>Website</option>
                    
                    <option value={"/new-project?project=mobile-app"}>Mobile_app</option>
                    <option value={"/new-project?project=graphic-design"}>Graphic</option>
                  </select>
                </div>

          <div className="select">
            <label htmlFor=""> Type:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value={'Website'}>Website</option>
              <option value={'Mobile_app'}>Mobile_app</option>
              <option value={'home-show'}>home-show</option>
              <option value={"graphic-design"}>Graphic</option>
              <option value={"Motion"}>Motion</option>
            </select>
          </div>

          <button onClick={handleUpload}>Upload</button>
        </div>
      ) : (
        <div className="warning">
          The maximum number of Banners is 4. Edit or delete an existing notice
          to upload a new one.
        </div>
      )}
      <div className="top-heading">
        
      <h4>Existing Banners</h4>
      <div className="select">
            <label htmlFor=""> Showcase Type: </label>
            <select
              value={fetchCategory}
              onChange={(e) => setfetchCategory(e.target.value)}
            >
             <option value={'Website'}>Website</option>
              <option value={'Mobile_app'}>Mobile_app</option>
              <option value={'home-show'}>home-show</option>
              <option value={"graphic-design"}>Graphic</option>
              <option value={"Motion"}>Motion</option>
            </select>
          </div>
      </div>
      {error || showcases.length === 0 ? <h1>NO items Found</h1>:
      <div className="items">
      {showcases.map((data, index) => (
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
                    <option value={'website'}>Website</option>
                    <option value={'home-show'}>Home Showcase</option>
                    <option value={'moible-app'}>Mobile app</option>
                    <option value={'graphic-desing'}>Graphic</option>
                    <option value={'motion'}>Motion</option>
                  </select>
                </div>
                <div className="subtitle">
                  <span>Subtitle:</span>
                  <input
                    type="text"
                    value={editSubTitle}
                    onChange={(e) => setEditSubTitle(e.target.value)}
                  />
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
                  <span>Days</span>
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                  />
                  <span>Pages:</span>
                  <input
                    type="number"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                  />
                </div>
                <div className="viewUrl">
                <span>View Url:</span>
              <input
                type="text"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
              />
                </div>
                <div className="viewUrl">
               
                <div className="select">
                  <label htmlFor=""> Action url:</label>
                  <select
                    value={actionUrl}
                    onChange={(e) => setActionUrl(e.target.value)}
                  >
                    <option value={"/newprojct"}>Website</option>
                    
                    <option value={"/new-project?project=mobile-app"}>Mobile_app</option>
                    <option value={"/new-project?project=graphic-design"}>Graphic</option>
                  </select>
                </div>
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
                  <p>Days:{data.days}</p>
                  <p>Price:{data.price}</p>
                  <p>Pages:{data.pages}</p>
                </div>

                <a href={data.viewlink}>View Link</a>
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
      }
      
    </div>
  );
};

export default Banners;
