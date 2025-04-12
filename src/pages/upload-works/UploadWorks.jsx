"use client";
import React, { useEffect, useState } from "react";
import "./UploadWorks.scss";
import Items from "../upload/elements/Items";
import { showSuccessAlert } from "../../Utils/Alert";
import newRequest from "../../Utils/newRequest";

const UploadWorks = () => {
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
  const [actionlink, setActionlink] = useState("");

  const [inputs, setInputs] = useState({
    title: "",
    thumbnail: "",
    hoverThumbnail: "",
    gallery: [],

    budget: 0,
   
    solutions: "",
    clientReq: "",
    clientRev: "",
    clientPP: "",
    clientName: "",
    

    viewlink: "",
    time: "",
    star: 0,
    pages: "",
    shortDes: {
      text: "",
      listItem: [],
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
      const newCategory = value.slice(0, -1).trim();
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      setCateValue("");
    }
  };
  const handleUrlArrayChange = (e, index, name) => {
    const value = e.target.value;
    setUrlValue(value);
    if (value.endsWith(",")) {
      const urls = value.slice(0, -1).trim();
      setUrls((prevCategories) => [...prevCategories, urls]);
      setUrlValue("");
    }
  };

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
      setCateValue((prevState) => {
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
      setUrlValue((prevState) => {
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

  const handleArrayInputChange = (
    value,
    setValue,
    setArray,
    separator = ","
  ) => {
    if (value.endsWith(separator)) {
      setArray((prev) => [...prev, value.slice(0, -1).trim()]);
      setValue("");
    } else {
      setValue(value);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const payload = {
      title: inputs.title,
      thumbnail: inputs.thumbnail,
      hoverThumbnail: inputs.hoverThumbnail,
      gallery: urls,
      type: selectedCategory,
      subCat: categories,
      budget: inputs.budget,
     
      solutions: inputs.solutions,
      clientReq: inputs.clientReq,
      clientRev: inputs.clientRev,
      clientPP: inputs.clientPP,
      clientName: inputs.clientName,
      actionlink: actionlink,
      viewlink: inputs.viewlink,
      star: inputs.star,
      time: inputs.time,
      pages: inputs.pages,
      
    };

    console.log(payload);
    try {
      const res = await newRequest.post("/workItem/add", payload);
      showSuccessAlert("Works added successfully.");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="updiv">
      <h2>Upload a new Work Item </h2>

      <div className="input">
        <div className="col">
          {/* ttile-------------- */}
          <label htmlFor="title">Title</label>
          <input
            className="title"
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />

          {/* Thumbnail ------------------ */}
          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            className="thumbnail"
            type="text"
            placeholder="Thumbnail URL"
            name="thumbnail"
            onChange={handleChange}
          />

          {/* -------- Hover-thumbnail */}
          <label htmlFor="hoverThumnail">Hover Thumbnail</label>
          <input
            className="hover-thumbnail"
            type="text"
            placeholder="Hover Thumbnail URL"
            name="hoverThumbnail"
            onChange={handleChange}
          />
          {/* ----------gellary */}
          <div className="items">
            <Items data={urls} remove={handleRemoveUrl} />
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

          <label htmlFor="type"> Select Primary categore</label>
          <select
            id="mySelect"
            name="type"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="website">Website</option>
            <option value="mobile-app">Mobile App</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="motion">Motion Design</option>
          </select>

          <label htmlFor="actionlink">Action Link</label>

          <select
            id="mySelect"
            name="type"
            value={actionlink}
            onChange={(e) => setActionlink(e.target.value)}
          >
            <option value={"/newprojct"}>Website</option>

            <option value={"/new-project?project=mobile-app"}>
              Mobile_app
            </option>
            <option value={"/new-project?project=graphic-design"}>
              Graphic
            </option>
          </select>
        </div>

        

        <div className="col">
          {/* -------------Cate */}
          <div className="items">
            <Items data={categories} remove={handleRemoveCate} />
          </div>
          <label htmlFor="subCat">Categories (comma separated)</label>
          <input
            className="subCat"
            type="text"
            placeholder="Categories (comma separated)"
            name="subCat"
            value={cateValue}
            onChange={(e) => handleCateArrayChange(e, 0, "subCat")}
          />
          {/* budget------------------ */}
          <label htmlFor="budget">Budget</label>
          <input
            className="budget"
            type="number"
            placeholder="Price"
            name="budget"
            onChange={handleChange}
          />

        

          <label htmlFor="clientReq">Client Request</label>
          <input
            className="product-type"
            type="text"
            placeholder="Client Request"
            name="clientReq"
            onChange={handleChange}
          />
          <label htmlFor="solutions">Solutions</label>
          <input
            className="product-type"
            type="text"
            placeholder="Our solution"
            name="solutions"
            onChange={handleChange}
          />
          <label htmlFor="clientPP">Client PP</label>
          <input
            className="product-type"
            type="text"
            placeholder="Client PP"
            name="clientPP"
            onChange={handleChange}
          />
          <label htmlFor="clientName">Client Name</label>
          <input
            className="product-type"
            type="text"
            placeholder="Client Name"
            name="clientName"
            onChange={handleChange}
          />

          

          <label htmlFor="viewlink">View Link</label>
          <input
            className="product-type"
            type="text"
            placeholder="View Link"
            name="viewlink"
            onChange={handleChange}
          />
          <label htmlFor="time">Timeline</label>
          <input
            className="product-type"
            type="text"
            placeholder="Time line"
            name="time"
            onChange={handleChange}
          />
          <label htmlFor="Page Or Rev Count"></label>
          <input
            className="product-type"
            type="text"
            placeholder="Pages or Revision count"
            name="pages"
            onChange={handleChange}
          />
         
        </div>
        <div className="col">
          <label>Client Review</label>
          <input
            className="product-type"
            type="text"
            placeholder="Client Review"
            name="clientRev"
            onChange={handleChange}
          />
          <label for={"star"}>Review Star</label>
          <input
            className="product-type"
            type="number"
            placeholder="Client Star"
            name="star"
            onChange={handleChange}
          />

          <div className="items">
            <Items
              data={features}
              remove={(index) => handleRemoveItem(index, setfeatures)}
            />
          </div>
          <label htmlFor="shortDes.listItem">List Desc </label>
          <input
            placeholder="Short Description List Item (separated by coma)"
            name="shortDes.listItem"
            value={featuresValue}
            onChange={(e) =>
              handleArrayInputChange(
                e.target.value,
                setfeaturesValue,
                setfeatures
              )
            }
          />
          <label htmlFor="shortDes.text">SD Text</label>
          <textarea
            className="shortDes-text"
            placeholder="Short Description Text"
            name="shortDes.text"
            rows={3}
            onChange={handleChange}
          />
        </div>
      </div>
      <button className="upbtn" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default UploadWorks;
