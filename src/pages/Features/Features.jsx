import React, { useEffect, useState } from "react";
import axios from "axios";
import newRequest from "../../Utils/newRequest";
import Swal from "sweetalert2";
import "./Features.scss";
import { AlertonDelete, showSuccessAlert } from "../../Utils/Alert";


const Features = () => {
  const [showcases, setShowcases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Website");
  const [fetchCategory, setfetchCategory] = useState("Website");
  const [refreshKey, setRefreshKey] = useState(0)
  const [thumb, setThumb] = useState("");
  const [links, setLinks] = useState([]);
  const [link, setLink] = useState({ url: "", icon: "" });


  useEffect(() => {
    const Featureditems = async () => {
      try {
        setLoading(true);
        const response = await newRequest.get(`homeShow/type/${fetchCategory}`);
        setShowcases(response.data);
        console.log(response.data);
      } catch (err) {
        handleError(err, "Failed to fetch notices.");
      } finally {
        setLoading(false);
      }
    };
    if (fetchCategory) {
      Featureditems();
    }
  }, [fetchCategory]);


  const Featureditems = async () => {
    try {
      setLoading(true);
      const response = await newRequest.get(`homeShow/type/${fetchCategory}`);
      setShowcases(response.data);
      console.log(response.data);
    } catch (err) {
      handleError(err, "Failed to fetch notices.");
    } finally {
      setLoading(false);
    }
  };

  const handleLink = (event, field) => {
    setLink({
      ...link,
      [field]: event.target.value,
    });
  };

  

  const handleError = (error, message) => {
    console.error(error);
    setError(error.response?.data?.message || message || "An error occurred.");
  };
  

  const handleUpload = async () => {
    const payload = {
      title: editTitle,
        thumb: thumb,
        link: links, 
        type: selectedCategory,
        url:editUrl
    };
    try {
      await newRequest.post("/homeShow/add", payload);
      showSuccessAlert("Notice added successfully.");
      refreshData();
    } catch (err) {
      handleError(err, "Failed to upload the notice.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await newRequest.delete(`/homeShow/delete/${id}`);
      showSuccessAlert("homeShow deleted successfully.");
      refreshData();
    } catch (err) {
      handleError(err, "Failed to delete the homeShow.");
    }
  };

  const refreshData = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

 useEffect(() => {
  Featureditems()
  }, [refreshKey]);

 


  const handleAddLink = () => {
    if (link.url && link.icon) {
      setLinks((prev) => [...prev, link]);
      setLink({ url: "", icon: "" }); 
    } else {
      alert("Please fill both URL and Icon fields before adding.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="pl-con">
      <h3>Top Featureditems</h3>

      <div className="add-notice">
        <h4>Add a New Home featured  item</h4>
        <div className="input">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </div>
        

       
        <label> Url:</label>
        <input
          type="text"
          
          placeholder="Add url"
          onChange={(e) => handleLink(e, "url")}
        />
        <label> icon:</label>
        <input
          type="text"
          
          placeholder="Add add Icon"
          onChange={(e) => handleLink(e, "icon")}
        />

        <button className="AddItems" onClick={handleAddLink}>
          Add link
        </button>
        {links.map((data,i)=>(
          <div className="link" key={i}>
            <span>icon:{data.icon}</span>
            <span>url:{data.url}</span>
          </div>
        ))}
        
        
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
          <label htmlFor=""> Type:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>Website</option>
            <option>Mobile_app</option>
            <option>Graphic</option>
            <option>Motion</option>
          </select>
        </div>

        <button onClick={handleUpload}>Upload</button>
      </div>

      <div className="top-heading">
        <h4>Existing Featureditems</h4>
        <div className="select">
          <label htmlFor=""> FeturedItemType Type: </label>
          <select
            value={fetchCategory}
            onChange={(e) => setfetchCategory(e.target.value)}
          >
                      <option>Website</option>
                      <option>Mobile_app</option>
                      <option>Graphic</option>
                      <option>Motion</option>
          </select>
        </div>
      </div>

      <div className="items">
        {showcases.map((data, index) => (
          <div className="box" key={data._id}>
            
              <div className="showcase-items">
                <div className="left">
                  <span className="type">{data.type}</span>
                  <h4>
                    <i class="fas fa-fire"></i> {data.subTitle}
                  </h4>
                  <h3> {data.title}</h3>
                  {data.link.map((l,i)=>(
                    <div className="complements" key={i}>
                    <p>icon:{l.icon}</p>
                    <p>url:{l.url}</p>
                    
                  </div>
                  ))}
                  

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
                  
                  <button onClick={() => AlertonDelete(data._id , handleDelete)}>
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
