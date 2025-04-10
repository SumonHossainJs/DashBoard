"use client";

import React, { useEffect, useState } from "react";
import "./Update.scss";
import axios from "axios";
import Items from "./elements/Items";
import { showSuccessAlert } from "../../Utils/Alert";
import newRequest from "../../Utils/newRequest";
import { useLocation } from "react-router-dom";

const Update = () => {
  const location = useLocation();
  const lastId = location.pathname.split("/").filter(Boolean).pop();

  const [listDsc, setListDsc] = useState({ icon: "", Icontitle: "" });
  const [textDsc, setTextDsc] = useState({ title: "", desc: "" });
  const [textDesc, setTextDesc] = useState([]);
  const [listDesc, setListDesc] = useState([]);


  const [categories, setCategories] = useState([]);
  const [cateValue, setCateValue] = useState("");

  const [features, setfeatures] = useState([]);

  const [featuresValue, setfeaturesValue] = useState("");


  const [urls, setUrls] = useState([]);
  const [urlValue, setUrlValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inputs, setInputs] = useState({
    title: "",
    thumbnail: "",
    hoverThumbnail: "",
    gallery: [],
    price: 0,
    salePrice: 0,
    productType: "",
    shortDes: {
      text: "",
      listItem: [],
    },
    description: {
      textDesc: [],
      listDesc: [],
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/product/${lastId}`);
        const product = response.data;
        console.log(product);

        setInputs({
          title: product.title || "",
          thumbnail: product.thumbnail || "",
          hoverThumbnail: product.hoverThumbnail || "",
          gallery: product.gallery || [],
          price: product.price || 0,
          salePrice: product.salePrice || 0,
          productType: product.productType || "",
          shortDes: product.shortDes || { text: "", listItem: [] },
          description: product.description || { textDesc: [], listDesc: [] },
        });
        setTextDesc(product.description?.textDesc || []);
        setListDesc(product.description?.listDesc || []);
        setCategories(product.cate || []);
        setSelectedCategory(product.pCate || "");
        setUrls(product.gallery || []);
        setfeatures(product.shortDes.listItem || []);
        
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [lastId]);

  const handleInputChange = (e, field) => {
    setListDsc((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleTextDescChange = (e, field) => {
    setTextDsc((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleArrayInputChange = (value, setValue, setArray, separator = ",") => {
    if (value.endsWith(separator)) {
      setArray((prev) => [...prev, value.slice(0, -1).trim()]);
      setValue("");
    } else {
      setValue(value);
    }
  };

  const handleRemoveItem = (index, setArray) => {
    setArray((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddListDesc = () => {
    if (listDsc.icon && listDsc.Icontitle) {
      setListDesc((prev) => [...prev, listDsc]);
      setListDsc({ icon: "", Icontitle: "" });
    } else {
      alert("Both icon and title are required.");
    }
  };

  const handleAddTextDesc = () => {
    if (textDsc.title && textDsc.desc) {
      setTextDesc((prev) => [...prev, textDsc]);
      setTextDsc({ title: "", desc: "" });
    } else {
      alert("Both title and description are required.");
    }
  };

  const handleInputChangeWrapper = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const payload = {
      ...inputs,
      gallery: urls,
      pCate: selectedCategory,
      cate: categories,
      description: { textDesc, listDesc },
      shortDes: { text:inputs.shortDes.text, listItem : features}
    };

    console.log(payload);

    try {
      await newRequest.put(`/product/update/${lastId}`, payload);
      showSuccessAlert("Product updated successfully.");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="updiv">
      <h2>Update Product</h2>

      <div className="input">
        <div className="col">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={inputs.title}
            onChange={handleInputChangeWrapper}
          />
          <input
            type="text"
            placeholder="Thumbnail URL"
            name="thumbnail"
            value={inputs.thumbnail}
            onChange={handleInputChangeWrapper}
          />
          <input
            type="text"
            placeholder="Hover Thumbnail URL"
            name="hoverThumbnail"
            value={inputs.hoverThumbnail}
            onChange={handleInputChangeWrapper}
          />
          <div className="items">
            <Items data={urls} remove={(index) => handleRemoveItem(index, setUrls)} />
          </div>
          <label htmlFor="gallery">Gallery Images</label>
          <input
            type="text"
            placeholder="Gallery URLs (comma separated)"
            value={urlValue}
            onChange={(e) => handleArrayInputChange(e.target.value, setUrlValue, setUrls)}
          />

          <label htmlFor="pCate">Select Primary Category</label>
          <select
            id="pCate"
            name="pCate"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="website">Website</option>
            <option value="mobile-app">Mobile App</option>
            <option value="brand-identity">Brand Design</option>
            <option value="graphic-design">Logo Design</option>
            <option value="motion">Motion Design</option>
          </select>
        </div>

        <div className="col">
          <label htmlFor="cate">Categories</label>
          <div className="items">
            <Items data={categories} remove={(index) => handleRemoveItem(index, setCategories)} />
          </div>
          <input
            type="text"
            placeholder="Categories (comma separated)"
            value={cateValue}
            onChange={(e) => handleArrayInputChange(e.target.value, setCateValue, setCategories)}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={inputs.price}
            onChange={handleInputChangeWrapper}
          />
          <label htmlFor="salePrice">Sale Price</label>
          <input
            type="number"
            placeholder="salePrice"
            name="salePrice"
            value={inputs.salePrice}
            onChange={handleInputChangeWrapper}
          />
        
          <input
            type="text"
            placeholder="Product Type"
            name="productType"
            value={inputs.productType}
            onChange={handleInputChangeWrapper}
          />
          <textarea
            placeholder="Short Description Text"
            name="shortDes.text"
            value={inputs.shortDes.text}
            onChange={handleInputChangeWrapper}
          />
        </div>

        <div className="col">
        <div className="items">
            <Items data={features} remove={(index) => handleRemoveItem(index, setfeatures)} />
          </div>
          <textarea
            placeholder="Short Description List Item (separated by coma)"
            name="shortDes.listItem"
            value={featuresValue}
            onChange={(e) => handleArrayInputChange(e.target.value, setfeaturesValue, setfeatures)}
          />
          <input
            type="text"
            value={textDsc.title}
            placeholder="Add Title"
            onChange={(e) => handleTextDescChange(e, "title")}
          />
          <input
            type="text"
            value={textDsc.desc}
            placeholder="Add Description"
            onChange={(e) => handleTextDescChange(e, "desc")}
          />
          <button onClick={handleAddTextDesc}>Add Description</button>
          <div className="items">
            <Items data={textDesc} remove={(index) => handleRemoveItem(index, setTextDesc)} />
          </div>

          <input
            type="text"
            value={listDsc.icon}
            placeholder="Add Icon"
            onChange={(e) => handleInputChange(e, "icon")}
          />
          <input
            type="text"
            value={listDsc.Icontitle}
            placeholder="Add Icon Title"
            onChange={(e) => handleInputChange(e, "Icontitle")}
          />
          <button onClick={handleAddListDesc}>Add Item</button>
          <div className="items">
            <Items list data={listDesc} remove={(index) => handleRemoveItem(index, setListDesc)} />
          </div>
        </div>
      </div>

      <button onClick={handleUpload}>Update</button>
    </div>
  );
};

export default Update;
