"use client";
import React, { useEffect, useState } from "react";
import "./Upload.scss";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [listDsc, setlistDsc] = useState({ icon: "", title: "" });
  const [listDesc, setListDesc] = useState([]);
  const [textDsc, setTextDsc] = useState({ title: "", desc: "" });
  const [textDesc, setTextDesc] = useState([]);

  const [inputs, setInputs] = useState({
    title: "",
    thumbnail: "",
    hoverThumbnail: "",
    gallery: [],
    pCate: "",
    cate: [],
    price: 0,
    salePrice: 0,
    productType: "",
    shortDes: {
      text: "",
      listItem: "",
    },
    description: {
      textDesc: [
        {
          title: "",
          text: "",
        },
      ],
      listDesc: [
        {
          icon: "",
          title: "",
        },
      ],
    },
  });
  // -----------List DSC"
  const handleInputChange = (event, field) => {
    setlistDsc({
      ...listDsc,
      [field]: event.target.value,
    });
  };
  const handleInputDesc = (event, field) => {
    setTextDsc({
      ...textDsc,
      [field]: event.target.value,
    });
  };

  const handleAddItem = () => {
    if (listDsc.icon && listDsc.title) {
      setListDesc([...listDesc, listDsc]);
      setlistDsc({ icon: "", title: "" });
    } else {
      alert("Both icon and title are required.");
    }
  };

  const handleAddtextDesc = () => {
    if (textDsc.title && textDsc.desc) {
      setTextDesc([...textDesc, textDsc]);
      setTextDsc({ title: "", desc: "" });
    } else {
      alert("Both title and description are required.");
    }
  };

  const handleLogListDesc = () => {
    console.log("listDesc:", listDesc);
  };
  const handleLogtextDesc = () => {
    console.log("textDesc:", textDesc);
  };

  const handleRemoveItem = (index) => {
    const updatedList = [...listDesc];
    updatedList.splice(index, 1);
    setListDesc(updatedList);
  };
  const handleRemoveDesc = (index) => {
    const updatedList = [...textDesc];
    updatedList.splice(index, 1);
    setTextDesc(updatedList);
  };

  // List Dsc End ----------

  const handleChange = (e) => {
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

  const handleArrayChange = (e, index, arrayName) => {
    const { value } = e.target;
    setInputs((prev) => {
      const newArray = [...prev[arrayName]];
      newArray[index] = value;
      return { ...prev, [arrayName]: newArray };
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    console.log({
      title: inputs.title,
      thumbnail: inputs.thumbnail,
      hoverThumbnail: inputs.hoverThumbnail,
      gallery: inputs.gallery,
      pCate: inputs.pCate,
      cate: inputs.cate,
      price: inputs.price,
      salePrice: inputs.salePrice,
      productType: inputs.productType,
      shortDes: inputs.shortDes,
      description: { textDesc: textDesc, listDesc: listDesc },
    });
  };

  return (
    <div className="updiv">
      <h2>Upload a new Product </h2>

      <div className="input">
        <div className="col">
          {/* ttile-------------- */}
          <input
            className="title"
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />

          {/* Thumbnail ------------------ */}
          <input
            className="thumbnail"
            type="text"
            placeholder="Thumbnail URL"
            name="thumbnail"
            onChange={handleChange}
          />

          {/* -------- Hover-thumbnail */}
          <input
            className="hover-thumbnail"
            type="text"
            placeholder="Hover Thumbnail URL"
            name="hoverThumbnail"
            onChange={handleChange}
          />
          {/* ----------gellary */}
          <input
            className="gallery"
            type="text"
            placeholder="Gallery Image URL (comma separated)"
            name="gallery"
            onChange={(e) => handleArrayChange(e, 0, "gallery")}
          />

          {/* ----------pcate */}
         
          <label htmlFor="pCate">Primary categore</label>
          <select id="mySelect" name="pCate" onChange={handleChange}>
            <option value="option1">Website</option>
            <option value="option2">Mobile App</option>
            <option value="option3">Brand Design</option>
            <option value="option4">Logo design</option>
            <option value="option5">Motion Design</option>
          </select>
        </div>

        <div className="col">
          {/* -------------Cate */}
          <input
            className="cate"
            type="text"
            placeholder="Categories (comma separated)"
            name="cate"
            onChange={(e) => handleArrayChange(e, 0, "cate")}
          />
          {/* price------------------ */}
          <input
            className="price"
            type="number"
            placeholder="Price"
            name="price"
            onChange={handleChange}
          />
          {/* --------------sale price */}
          <input
            className="sale-price"
            type="number"
            placeholder="Sale Price"
            name="salePrice"
            onChange={handleChange}
          />
          {/* product type-------------- */}
          <label htmlFor="productType">Product Type</label>
          <input
            className="product-type"
            type="text"
            placeholder="Product Type"
            name="productType"
            onChange={handleChange}
          />
          {/* --------short-des text */}
          <textarea
            className="shortDes-text"
            placeholder="Short Description Text"
            name="shortDes.text"
            rows={3}
            onChange={handleChange}
          />
          {/* --------short-des list item */}
        </div>
        <div className="col">
          <textarea
            className="shortDes-listItem"
            placeholder="Short Description List Item"
            name="shortDes.listItem"
            rows={3}
            onChange={handleChange}
          />

          <label>
            title:
            <input
              type="text"
              value={textDsc.title}
              onChange={(e) => handleInputDesc(e, "title")}
            />
          </label>
          <div>
            <label>
              Description:
              <input
                type="text"
                value={textDsc.desc}
                onChange={(e) => handleInputDesc(e, "desc")}
              />
            </label>
            <button className="upbtn" onClick={handleAddtextDesc}>
              Add Desc
            </button>
            <div>
              <h3>Text Description:</h3>
              <ul>
                {textDesc.map((item, index) => (
                  <li key={index}>
                    title: {item.title}, description: {item.desc}
                    <button onClick={() => handleRemoveDesc(index)}>
                      Remove Item
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* -------------List Desc starts ---- */}
            <label>
              Icon:
              <input
                type="text"
                value={listDsc.icon}
                onChange={(e) => handleInputChange(e, "icon")}
              />
            </label>
          </div>
          <div>
            <label>
              Title:
              <input
                type="text"
                value={listDsc.title}
                onChange={(e) => handleInputChange(e, "title")}
              />
            </label>
            <button className="upbtn" onClick={handleAddItem}>
              Add Item
            </button>
            <div>
              <h3>listDesc:</h3>
              <ul>
                {listDesc.map((item, index) => (
                  <li key={index}>
                    Icon: {item.icon}, Title: {item.title}
                    <button onClick={() => handleRemoveItem(index)}>
                      Remove Item
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button className="upbtn" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default Upload;
