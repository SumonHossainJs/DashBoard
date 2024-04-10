"use client";
import React, { useEffect, useState } from "react";
import "./Upload.scss";
import axios from "axios";
import Items from "./elements/Items";
// import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [listDsc, setlistDsc] = useState({ icon: "", Icontitle: "" });
  const [textDsc, setTextDsc] = useState({ title: "", desc: "" });

  const [textDesc, setTextDesc] = useState([]);
  const [listDesc, setListDesc] = useState([]);

  const [categories, setCategories] = useState([]);
  const [cateValue, setCateValue] = useState("");
  const [urls, setUrls] = useState([]);
  const [urlValue, setUrlValue] = useState("");

  const [inputs, setInputs] = useState({
    title: "",
    thumbnail: "",
    hoverThumbnail: "",
    gallery: [],
    pCate: "",

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
          Icontitle: "",
        },
      ],
    },
  });
  const handleCateArrayChange = (e, index, name) => {
    const value = e.target.value;
    setCateValue(value);
    if (value.endsWith(",")) {
      const newCategory = value.slice(0, -1).trim(); // Remove the comma and trim whitespace
      setCategories((prevCategories) => [...prevCategories, newCategory]); // Update categories
      setCateValue(""); // Clear input field
    }
  };
  const handleUrlArrayChange = (e, index, name) => {
    const value = e.target.value;
    setUrlValue(value);
    if (value.endsWith(",")) {
      const urls = value.slice(0, -1).trim(); // Remove the comma and trim whitespace
      setUrls((prevCategories) => [...prevCategories, urls]); // Update categories
      setUrlValue(""); // Clear input field
    }
  };
  // -----------List DSC"
  const handleInputChange = (event, field) => {
    setlistDsc({
      ...listDsc,
      [field]: event.target.value,
    });
    console.log(listDsc);
  };
  const handleInputDesc = (event, field) => {
    setTextDsc({
      ...textDsc,
      [field]: event.target.value,
    });
  };

  const handleAddItem = () => {
    if (listDsc.icon && listDsc.Icontitle) {
      setListDesc([...listDesc, listDsc]);

      setlistDsc({ icon: "", Icontitle: "" });
      console.log(listDesc);
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
    updatedList[index].fadeOut = true;
    setListDesc(updatedList);

    setTimeout(() => {
      const newList = [...listDesc];
      newList.splice(index, 1);
      setListDesc(newList);
    }, 500);
  };
  const handleRemoveDesc = (index) => {
    const updatedList = [...textDesc];
    updatedList[index].fadeOut = true;
    setTextDesc(updatedList);

    setTimeout(() => {
      const newList = [...textDesc];
      newList.splice(index, 1);
      setTextDesc(newList);
    }, 500); // Adjust timing to match the CSS transition duration
  };
  
  const handleRemoveCate = (index) => {
   
    const updatedList = [...categories];
    updatedList.splice(index, 1);
    setCategories(updatedList);

    setTimeout(() => {
      setCateValue(prevState => {
       
        const newList = [...prevState];
        
       
        newList.splice(index, 1);
        
       
        return newList;
      });
    }, 500);
  };
  const handleRemoveUrl = (index) => {
   
    const updatedList = [...urls];
    updatedList.splice(index, 1);
    setUrls(updatedList);

    setTimeout(() => {
      setUrlValue(prevState => {
       
        const newList = [...prevState];
        
       
        newList.splice(index, 1);
        
       
        return newList;
      });
    }, 500);
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
      gallery: urls,
      pCate: inputs.pCate,
      cate: categories,
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
          <div className="items">
            <Items data={urls} remove={handleRemoveUrl}/>
          </div>
          <input
            className="gallery"
            type="text"
            placeholder="Gallery Image URL (comma separated)"
            name="gallery"
            value={urlValue}
            onChange={(e) => handleUrlArrayChange(e, 0, "gallery")}
          />

          {/* ----------pcate */}

          <label htmlFor="pCate"> Select Primary categore</label>
          <select id="mySelect" name="pCate" onChange={handleChange}>
            <option value="Website">Website</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Brand design">Brand Design</option>
            <option value="Logo Design">Logo design</option>
            <option value="Motion Design">Motion Design</option>
          </select>
        </div>

        <div className="col">
          {/* -------------Cate */}
          <div className="items">
            <Items data={categories} remove={handleRemoveCate} />
          </div>
          <input
            className="cate"
            type="text"
            placeholder="Categories (comma separated)"
            name="cate"
            value={cateValue}
            onChange={(e) => handleCateArrayChange(e, 0, "cate")}
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

          <input
            type="text"
            value={textDsc.title}
            placeholder="Add Title"
            onChange={(e) => handleInputDesc(e, "title")}
          />

          <div>
            <input
              type="text"
              value={textDsc.desc}
              placeholder="Add Description"
              onChange={(e) => handleInputDesc(e, "desc")}
            />

            <button className="AddItems" onClick={handleAddtextDesc}>
              Add Desc
            </button>
            <div className="items">
              <Items data={textDesc} remove={handleRemoveDesc} />
            </div>
            {/* -------------List Desc starts ---- */}

            <input
              type="text"
              value={listDsc.icon}
              placeholder=" Add Icon"
              onChange={(e) => handleInputChange(e, "icon")}
            />
          </div>
          <div>
            <input
              type="text"
              value={listDsc.Icontitle}
              placeholder="Add title"
              onChange={(e) => handleInputChange(e, "Icontitle")}
            />

            <button className="AddItems" onClick={handleAddItem}>
              Add Item
            </button>
            <div className="items">
              <Items data={listDesc} remove={handleRemoveItem} />
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
