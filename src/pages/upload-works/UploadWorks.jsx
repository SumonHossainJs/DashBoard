import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./UploadWorks.scss";

import { showSuccessAlert } from "../../Utils/Alert";
import newRequest from "../../Utils/newRequest";
import Upload from "../../components/Upload/Upload";

const UploadWorks = () => {
  const [content, setContent] = useState("");
  const [urls, setUrls] = useState([]); // gallery image URLs
  const [urlValue, setUrlValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [cateValue, setCateValue] = useState("");
  const [progress, setProgress] = useState(0);
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const quillRef = useRef();

  const [inputs, setInputs] = useState({
    title: "",
    thumbnail: "",
    hoverThumbnail: "",
    budget: 0,
    type: "website",
    actionlink: "",
    viewlink: "",
    time: "",
    star: 0,
    pages: "",
    // new fields
    clientReq: "",
    ourSolution: "",
    clientPP: "",
    clientReview: "",
  });

  // Insert uploaded image/video into editor content
  useEffect(() => {
    if (img) {
      const src = typeof img === "object" && img.url ? img.url : img;
      if (src) setContent((prev) => prev + `<p><img src="${src}" alt="" /></p>`);
    }
  }, [img]);

  useEffect(() => {
    if (video) {
      const src = typeof video === "object" && video.url ? video.url : video;
      if (src)
        setContent(
          (prev) =>
            prev +
            `<p><iframe class="ql-video" src="${src}" frameborder="0" allowfullscreen></iframe></p>`
        );
    }
  }, [video]);

  // Handlers for image uploads
  const handleThumbnailUpload = (data) => {
    const src = typeof data === "object" && data.url ? data.url : data;
    if (src) setInputs((prev) => ({ ...prev, thumbnail: src }));
  };

  const handleHoverThumbnailUpload = (data) => {
    const src = typeof data === "object" && data.url ? data.url : data;
    if (src) setInputs((prev) => ({ ...prev, hoverThumbnail: src }));
  };

  // Single client profile picture upload
  const handleClientPPUpload = (data) => {
    const src = typeof data === "object" && data.url ? data.url : data;
    if (src) setInputs((prev) => ({ ...prev, clientPP: src }));
  };

  // Handles multiple or single uploads for gallery images
  const handleGalleryUpload = (data) => {
    if (!data) return;

    if (Array.isArray(data)) {
      const newUrls = data.map((item) =>
        typeof item === "object" && item.url ? item.url : item
      );
      setUrls((prev) => [...prev, ...newUrls]);
    } else {
      const url = typeof data === "object" && data.url ? data.url : data;
      setUrls((prev) => [...prev, url]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "budget" || name === "star" ? Number(value) : value,
    }));
  };

  const handleUrlArrayChange = (e) => {
    const value = e.target.value;
    setUrlValue(value);
    if (value.endsWith(",")) {
      const newUrl = value.slice(0, -1).trim();
      if (newUrl) {
        setUrls((prev) => [...prev, newUrl]);
      }
      setUrlValue("");
    }
  };

  const handleCateArrayChange = (e) => {
    const value = e.target.value;
    setCateValue(value);
    if (value.endsWith(",")) {
      const newCategory = value.slice(0, -1).trim();
      if (newCategory) {
        setCategories((prev) => [...prev, newCategory]);
      }
      setCateValue("");
    }
  };

  const resetForm = () => {
    setInputs({
      title: "",
      thumbnail: "",
      hoverThumbnail: "",
      budget: 0,
      type: "website",
      actionlink: "",
      viewlink: "",
      time: "",
      star: 0,
      pages: "",
      clientReq: "",
      ourSolution: "",
      clientPP: "",
      clientReview: "",
    });
    setContent("");
    setUrls([]);
    setCategories([]);
    setUrlValue("");
    setCateValue("");
    setImg("");
    setVideo("");
    setProgress(0);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    let finalUrls = [...urls];
    let finalCategories = [...categories];
    if (urlValue.trim()) finalUrls.push(urlValue.trim());
    if (cateValue.trim()) finalCategories.push(cateValue.trim());

    const finalContent = content;

    const payload = {
      title: inputs.title,
      thumbnail: inputs.thumbnail,
      hoverThumbnail: inputs.hoverThumbnail,
      gallery: finalUrls,
      type: inputs.type,
      subCat: finalCategories,
      budget: Number(inputs.budget),
      actionlink: inputs.actionlink,
      viewlink: inputs.viewlink,
      time: inputs.time,
      pages: inputs.pages,
      star: Number(inputs.star),
      shortDes: { listItem: [] },
      content: finalContent,
      // new fields
      clientReq: inputs.clientReq,
      ourSolution: inputs.ourSolution,
      clientPP: inputs.clientPP,
      clientReview: inputs.clientReview,
    };

    try {
      await newRequest.post("/workItem/add", payload);
      showSuccessAlert("Work added successfully.");
      console.log("Uploaded:", payload);
      resetForm();
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="updiv">
      <h2 className="title">Upload a New Work Item</h2>
      <form className="input" onSubmit={handleUpload}>
        <div className="inputs-columns">
          {/* Left Column */}
          <div className="col">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleChange}
              required
            />

            <label>Thumbnail</label>
            <Upload
              type="image"
              setProgress={setProgress}
              setData={handleThumbnailUpload}
            >
              <button
                type="button"
                className="upload-btn"
                disabled={progress > 0 && progress < 100}
              >
                Upload Thumbnail
              </button>
            </Upload>
            {inputs.thumbnail && (
              <div className="image-preview">
                <img src={inputs.thumbnail} alt="Thumbnail Preview" />
              </div>
            )}

            <label>Hover Thumbnail</label>
            <Upload
              type="image"
              setProgress={setProgress}
              setData={handleHoverThumbnailUpload}
            >
              <button
                type="button"
                className="upload-btn"
                disabled={progress > 0 && progress < 100}
              >
                Upload Hover Thumbnail
              </button>
            </Upload>
            {inputs.hoverThumbnail && (
              <div className="image-preview">
                <img src={inputs.hoverThumbnail} alt="Hover Thumbnail Preview" />
              </div>
            )}

            <label>Gallery Images (comma separated)</label>
            <input
              type="text"
              value={urlValue}
              onChange={handleUrlArrayChange}
              placeholder="Add image URL, then comma"
            />
            {urls.length > 0 && (
              <ul className="preview-list">
                {urls.map((u, i) => (
                  <li key={i}>{u}</li>
                ))}
              </ul>
            )}

            {/* Multiple Gallery Upload */}
            <label>Upload Gallery Images</label>
            <Upload
              type="image"
              multiple={true}
              setProgress={setProgress}
              setData={handleGalleryUpload}
            >
              <button
                type="button"
                className="upload-btn"
                disabled={progress > 0 && progress < 100}
              >
                Upload Gallery Images
              </button>
            </Upload>

            {urls.length > 0 && (
              <div
                className="gallery-preview"
                style={{
                  marginTop: 10,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {urls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Gallery Image ${index + 1}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Middle Column */}
          <div className="col">
            <label>Primary Category</label>
            <select name="type" value={inputs.type} onChange={handleChange}>
              <option value="website">Website</option>
              <option value="mobile-app">Mobile App</option>
              <option value="graphic-design">Graphic Design</option>
              <option value="motion">Motion Design</option>
            </select>

            <label>Sub Categories (comma separated)</label>
            <input
              type="text"
              value={cateValue}
              onChange={handleCateArrayChange}
              placeholder="Add category, then comma"
            />
            {categories.length > 0 && (
              <ul className="preview-list">
                {categories.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            )}

            <label>Budget</label>
            <input
              type="number"
              name="budget"
              value={inputs.budget}
              onChange={handleChange}
              min="0"
            />

            <label>Action Link</label>
            <input
              type="text"
              name="actionlink"
              value={inputs.actionlink}
              onChange={handleChange}
            />

            {/* Client Requirements */}
            <label>Client Requirements</label>
            <textarea
              name="clientReq"
              value={inputs.clientReq}
              onChange={handleChange}
              placeholder="Describe the client's requirements..."
              rows={4}
            />

            {/* Our Solution */}
            <label>Our Solution</label>
            <textarea
              name="ourSolution"
              value={inputs.ourSolution}
              onChange={handleChange}
              placeholder="Describe the solution provided..."
              rows={4}
            />
          </div>

          {/* Right Column */}
          <div className="col">
            <label>View Link</label>
            <input
              type="text"
              name="viewlink"
              value={inputs.viewlink}
              onChange={handleChange}
            />

            <label>Timeline</label>
            <input
              type="text"
              name="time"
              value={inputs.time}
              onChange={handleChange}
            />

            <label>Pages / Revisions</label>
            <input
              type="text"
              name="pages"
              value={inputs.pages}
              onChange={handleChange}
            />

            <label>Review Star</label>
            <input
              type="number"
              name="star"
              value={inputs.star}
              onChange={handleChange}
              min="0"
              max="5"
            />

            {/* Client Profile Picture upload */}
            <label>Client Profile Picture</label>
            <Upload
              type="image"
              setProgress={setProgress}
              setData={handleClientPPUpload}
            >
              <button
                type="button"
                className="upload-btn"
                disabled={progress > 0 && progress < 100}
              >
                Upload Client Photo
              </button>
            </Upload>
            {inputs.clientPP && (
              <div className="image-preview" style={{ marginTop: 8 }}>
                <img
                  src={inputs.clientPP}
                  alt="Client Profile Preview"
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                />
              </div>
            )}

            {/* Client Review text */}
            <label>Client Review</label>
            <textarea
              name="clientReview"
              value={inputs.clientReview}
              onChange={handleChange}
              placeholder="Client's testimonial or review..."
              rows={4}
            />
          </div>
        </div>

        {/* Editor Section */}
        <div className="editor-section">
          <label>Description</label>
          <div className="editor-wrapper">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              readOnly={progress > 0 && progress < 100}
              className="react-quill-editor"
              ref={quillRef}
            />
            <div className="editor-upload-buttons">
              <Upload type="image" setProgress={setProgress} setData={setImg}>
                <button
                  type="button"
                  title="Upload Image"
                  className="icon-btn"
                  disabled={progress > 0 && progress < 100}
                >
                  🌆
                </button>
              </Upload>
              <Upload type="video" setProgress={setProgress} setData={setVideo}>
                <button
                  type="button"
                  title="Upload Video"
                  className="icon-btn"
                  disabled={progress > 0 && progress < 100}
                >
                  ▶️
                </button>
              </Upload>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="upbtn"
          disabled={progress > 0 && progress < 100}
        >
          {progress > 0 && progress < 100 ? "Uploading..." : "Upload"}
        </button>
        <p className="progress-text">Progress: {progress}%</p>
      </form>
    </div>
  );
};

export default UploadWorks;
