"use client";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./upload.scss";
import { showSuccessAlert } from "../../Utils/Alert";
import newRequest from "../../Utils/newRequest";
import Upload from "../../components/Upload/Upload";
import Items from "./elements/Items";

const UploadProduct = () => {
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [cateValue, setCateValue] = useState("");
  const [progress, setProgress] = useState(0);
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Gallery states
  const [urls, setUrls] = useState([]);
  const [urlValue, setUrlValue] = useState("");

  const [inputs, setInputs] = useState({
    title: "",
    thumbnail: "",
    hoverThumbnail: "",
    price: "",
    salePrice: "",
    productType: "",
    shortDes: "",
  });

  // Add uploaded image directly into editor
  useEffect(() => {
    if (img) {
      const src = typeof img === "object" && img.url ? img.url : img;
      setContent((prev) => prev + `<p><img src="${src}" alt="" /></p>`);
    }
  }, [img]);

  // Add uploaded video directly into editor
  useEffect(() => {
    if (video) {
      const src = typeof video === "object" && video.url ? video.url : video;
      setContent(
        (prev) =>
          prev +
          `<p><iframe class="ql-video" src="${src}" frameborder="0" allowfullscreen></iframe></p>`
      );
    }
  }, [video]);

  // Handle text/number changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Handle categories list
  const handleCateArrayChange = (e) => {
    const value = e.target.value;
    setCateValue(value);
    if (value.endsWith(",")) {
      const newCategory = value.slice(0, -1).trim();
      if (newCategory) {
        setCategories((prev) => [...prev, newCategory]);
        setCateValue("");
      }
    }
  };

  const handleRemoveCate = (index) => {
    const updatedList = [...categories];
    updatedList.splice(index, 1);
    setCategories(updatedList);
  };

  const handleThumbnailUpload = (data) => {
    const src = typeof data === "object" && data.url ? data.url : data;
    setInputs((prev) => ({ ...prev, thumbnail: src }));
  };

  const handleHoverThumbnailUpload = (data) => {
    const src = typeof data === "object" && data.url ? data.url : data;
    setInputs((prev) => ({ ...prev, hoverThumbnail: src }));
  };

  // Gallery Upload Handlers
  const handleUrlArrayChange = (e) => {
    const value = e.target.value;
    setUrlValue(value);
    if (value.endsWith(",")) {
      const newUrl = value.slice(0, -1).trim();
      if (newUrl) setUrls((prev) => [...prev, newUrl]);
      setUrlValue("");
    }
  };

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

  const handleUpload = async (e) => {
    e.preventDefault();

    let finalUrls = [...urls];
    if (urlValue.trim()) finalUrls.push(urlValue.trim());

    const payload = {
      ...inputs,
      pCate: selectedCategory,
      cate: categories,
      gallery: finalUrls,
      description: content,
    };

    try {
      await newRequest.post("/product/upload", payload);
      showSuccessAlert("Product added successfully.");
      console.log("Uploaded:", payload);

      // Reset form
      setInputs({
        title: "",
        thumbnail: "",
        hoverThumbnail: "",
        price: "",
        salePrice: "",
        productType: "",
        shortDes: "",
      });
      setCategories([]);
      setUrls([]);
      setUrlValue("");
      setCateValue("");
      setSelectedCategory("");
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="updiv">
      <h2 className="title">Upload a New Product</h2>

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
            <Upload type="image" setProgress={setProgress} setData={handleThumbnailUpload}>
              <button type="button" className="upload-btn">Upload Thumbnail</button>
            </Upload>
            {inputs.thumbnail && (
              <div className="image-preview">
                <img src={inputs.thumbnail} alt="Thumbnail Preview" />
              </div>
            )}

            <label>Hover Thumbnail</label>
            <Upload type="image" setProgress={setProgress} setData={handleHoverThumbnailUpload}>
              <button type="button" className="upload-btn">Upload Hover Thumbnail</button>
            </Upload>
            {inputs.hoverThumbnail && (
              <div className="image-preview">
                <img src={inputs.hoverThumbnail} alt="Hover Thumbnail Preview" />
              </div>
            )}

            {/* Gallery Upload Section */}
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
            <select
              name="pCate"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="website">Website</option>
              <option value="mobile-app">Mobile App</option>
              <option value="graphic-design">Graphic Design</option>
              <option value="motion">Motion Design</option>
            </select>

            <label>Sub Categories (comma separated)</label>
            <Items data={categories} remove={handleRemoveCate} />
            <input type="text" value={cateValue} onChange={handleCateArrayChange} />

            <label>Price</label>
            <input type="number" name="price" value={inputs.price} onChange={handleChange} />

            <label>Sale Price</label>
            <input type="number" name="salePrice" value={inputs.salePrice} onChange={handleChange} />
          </div>

          {/* Right Column */}
          <div className="col">
            <label>Product Type</label>
            <input
              type="text"
              name="productType"
              value={inputs.productType}
              onChange={handleChange}
            />

            <label>Short Description</label>
            <textarea
              name="shortDes"
              rows={3}
              value={inputs.shortDes}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Editor Section */}
        <div className="editor-section">
          <label>Description (Rich Text)</label>
          <div className="editor-wrapper">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              readOnly={progress > 0 && progress < 100}
              className="react-quill-editor"
            />
            <div className="editor-upload-buttons">
              <Upload type="image" setProgress={setProgress} setData={setImg}>
                <button type="button" title="Upload Image" className="icon-btn">🌆</button>
              </Upload>
              <Upload type="video" setProgress={setProgress} setData={setVideo}>
                <button type="button" title="Upload Video" className="icon-btn">▶️</button>
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

export default UploadProduct;
