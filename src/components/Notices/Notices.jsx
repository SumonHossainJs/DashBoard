import React, { useEffect, useState } from "react";
import axios from "axios";
import newRequest from "../../Utils/newRequest";
import Swal from "sweetalert2";

const Notices = () => {
  const [showcases, setShowcases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Website");
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3030/topNotice/get");
      setShowcases(response.data);
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

  const handleSave = async (index, id) => {
    try {
      const updatedData = { title: editTitle, url: editUrl,type: selectedCategory };
      const response = await newRequest.put(
        `/topNotice/update/${id}`,
        updatedData
      );
      const updatedShowcases = [...showcases];
      updatedShowcases[index] = response.data;
      setShowcases(updatedShowcases);
      setEditingIndex(null);
      showSuccessAlert("Notice updated successfully.");
    } catch (err) {
      handleError(err, "Failed to update the notice.");
    }
  };

  const handleUpload = async () => {
    const payload = { title: editTitle, url: editUrl, type: selectedCategory };
    try {
      await newRequest.post("/topNotice/add", payload);
      showSuccessAlert("Notice added successfully.");
      refreshData();
    } catch (err) {
      handleError(err, "Failed to upload the notice.");
    }
  };
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditTitle(showcases[index].title);
    setEditUrl(showcases[index].url);
  };

  const handleDelete = async (id) => {
    try {
      await newRequest.delete(`/topNotice/delete/${id}`);
      showSuccessAlert("Notice deleted successfully.");
      refreshData();
    } catch (err) {
      handleError(err, "Failed to delete the notice.");
    }
  };

  const refreshData = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: "Success",
      text: message,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditTitle("");
    setEditUrl("");
  };

  useEffect(() => {
    fetchNotices();
  }, [refreshKey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="pl-con">
      <h3>Top Notices</h3>
      {showcases.length < 4 ? (
        <div className="add-notice">
          <h4>Add a New Notice</h4>
          <input
            type="text"
            placeholder="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="URL"
            value={editUrl}
            onChange={(e) => setEditUrl(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>Website</option>
            <option>Mobile_app</option>
            <option>Graphic</option>
            <option>Motion</option>
          </select>
          <button onClick={handleUpload}>Upload</button>
        </div>
      ) : (
        <div className="warning">
          The maximum number of notices is 4. Edit or delete an existing notice
          to upload a new one.
        </div>
      )}

      <h4>Existing Notices</h4>
      <div className="notice-items">
        {showcases.map((data, index) => (
          <div className="box" key={data._id}>
            {editingIndex === index ? (
              <div className="inputs">
                <label htmlFor="type">Type:</label>
                <select
                name="type"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>Website</option>
                  <option>Mobile_app</option>
                  <option>Graphic</option>
                  <option>Motion</option>
                </select>
                <label htmlFor="ttile">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editTitle}
                  placeholder="Enter Url"
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <label htmlFor="url">Url:</label>
                <input
                  type="text"
                  name="url"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                />
                <div className="btns">
                  <button onClick={() => handleSave(index, data._id)}>
                    <i class="fas fa-save"></i>
                  </button>
                  <button onClick={handleCancel}>
                    <i class="fas fa-window-close"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div className="notice-box">
                <div className="notice">
                  <span>Type: {data.type}</span>
                  <h3>Title: {data.title}</h3>
                  <div className="btns">
                    <button onClick={() => handleEdit(index)}>
                      <i class="fas fa-edit"></i>
                    </button>
                    <button onClick={() => handleDelete(data._id)}>
                      {" "}
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notices;
