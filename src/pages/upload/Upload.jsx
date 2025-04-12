"use client";
import React, { useState } from "react";
import "./upload.scss";
import Items from "./elements/Items";
import { showSuccessAlert } from "../../Utils/Alert";
import newRequest from "../../Utils/newRequest";

const Upload = () => {
  const [listDsc, setlistDsc] = useState({ icon: "", Icontitle: "" });
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
      listItem: "",
    },
    description: {
      textDesc: [{ title: "", text: "" }],
      listDesc: [{ icon: "", Icontitle: "" }],
    },
  });

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

  const handleUrlArrayChange = (e) => {
    const value = e.target.value;
    setUrlValue(value);
    if (value.endsWith(",")) {
      const newUrl = value.slice(0, -1).trim();
      if (newUrl) {
        setUrls((prev) => [...prev, newUrl]);
        setUrlValue("");
      }
    }
  };

  const handleArrayInputChange = (value, setValue, setArray, separator = ",") => {
    if (value.endsWith(separator)) {
      const item = value.slice(0, -1).trim();
      if (item) {
        setArray((prev) => [...prev, item]);
        setValue("");
      }
    } else {
      setValue(value);
    }
  };

  const handleInputChange = (e, field) => {
    setlistDsc({
      ...listDsc,
      [field]: e.target.value,
    });
  };

  const handleInputDesc = (e, field) => {
    setTextDsc({
      ...textDsc,
      [field]: e.target.value,
    });
  };

  const handleAddItem = () => {
    if (listDsc.icon && listDsc.Icontitle) {
      setListDesc([...listDesc, listDsc]);
      setlistDsc({ icon: "", Icontitle: "" });
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

  const handleRemoveCate = (index) => {
    const updatedList = [...categories];
    updatedList.splice(index, 1);
    setCategories(updatedList);
  };

  const handleRemoveUrl = (index) => {
    const updatedList = [...urls];
    updatedList.splice(index, 1);
    setUrls(updatedList);
  };

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

  const handleUpload = async (e) => {
    e.preventDefault();
    const payload = {
      title: inputs.title,
      thumbnail: inputs.thumbnail,
      hoverThumbnail: inputs.hoverThumbnail,
      gallery: urls,
      pCate: selectedCategory,
      cate: categories,
      price: inputs.price,
      salePrice: inputs.salePrice,
      productType: inputs.productType,
      shortDes: {
        text: inputs.shortDes.text,
        listItem: features,
      },
      description: {
        textDesc: textDesc,
        listDesc: listDesc,
      },
    };

    try {
      const res = await newRequest.post("/product/upload", payload);
      showSuccessAlert("Product added successfully.");
      console.log(res);

      // Reset form
      setInputs({
        title: "",
        thumbnail: "",
        hoverThumbnail: "",
        gallery: [],
        price: 0,
        salePrice: 0,
        productType: "",
        shortDes: { text: "", listItem: "" },
        description: {
          textDesc: [{ title: "", text: "" }],
          listDesc: [{ icon: "", Icontitle: "" }],
        },
      });
      setUrls([]);
      setCategories([]);
      setCateValue("");
      setUrlValue("");
      setfeatures([]);
      setfeaturesValue("");
      setTextDesc([]);
      setListDesc([]);
      setSelectedCategory("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="updiv">
      <h2>Upload a new Product</h2>

      <div className="input">
        <div className="col">
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Thumbnail URL"
            name="thumbnail"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Hover Thumbnail URL"
            name="hoverThumbnail"
            onChange={handleChange}
          />
          <div className="items">
            <Items data={urls} remove={handleRemoveUrl} />
          </div>
          <input
            type="text"
            placeholder="Gallery Image URL (comma separated)"
            value={urlValue}
            onChange={handleUrlArrayChange}
          />

          <label htmlFor="pCate">Select Primary Category</label>
          <select
            id="pCate"
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
        </div>

        <div className="col">
          <div className="items">
            <Items data={categories} remove={handleRemoveCate} />
          </div>
          <input
            type="text"
            placeholder="Categories (comma separated)"
            value={cateValue}
            onChange={handleCateArrayChange}
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Sale Price"
            name="salePrice"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Product Type"
            name="productType"
            onChange={handleChange}
          />
          <textarea
            placeholder="Short Description Text"
            name="shortDes.text"
            rows={3}
            onChange={handleChange}
          />
        </div>

        <div className="col">
          <div className="items">
            <Items data={features} remove={(index) => {
              const updated = [...features];
              updated.splice(index, 1);
              setfeatures(updated);
            }} />
          </div>
          <textarea
            placeholder="Short Description List Item (comma separated)"
            value={featuresValue}
            onChange={(e) =>
              handleArrayInputChange(e.target.value, setfeaturesValue, setfeatures)
            }
          />

          <input
            type="text"
            value={textDsc.title}
            placeholder="Add Title"
            onChange={(e) => handleInputDesc(e, "title")}
          />
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

          <input
            type="text"
            value={listDsc.icon}
            placeholder="Add Icon"
            onChange={(e) => handleInputChange(e, "icon")}
          />
          <input
            type="text"
            value={listDsc.Icontitle}
            placeholder="Add Title"
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

      <button className="upbtn" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default Upload;
