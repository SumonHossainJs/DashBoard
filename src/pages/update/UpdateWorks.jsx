"use client";

import React, { useEffect, useState } from "react";
import "./Update.scss";
import axios from "axios";
import Items from "./elements/Items";
import { showSuccessAlert } from "../../Utils/Alert";
import newRequest from "../../Utils/newRequest";
import { useLocation } from "react-router-dom";

const UpdateWorks = () => {
  const location = useLocation();
  const lastId = location.pathname.split("/").filter(Boolean).pop();

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
    shortDes: { text: "", listItem: [] },
  });

  const [categories, setCategories] = useState([]);
  const [cateValue, setCateValue] = useState("");

  const [features, setfeatures] = useState([]);

  const [featuresValue, setfeaturesValue] = useState("");

  const [urls, setUrls] = useState([]);
  const [urlValue, setUrlValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [actionlink, setActionlink] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await newRequest.get(`/workItem/get/${lastId}`);
        const workItem = response.data;

        console.log(workItem);

        setInputs({
          title: workItem.title || "",
          thumbnail: workItem.thumbnail || "",
          hoverThumbnail: workItem.hoverThumbnail || "",
          budget: workItem.budget || 0,
          solutions: workItem.solutions || "",
          clientReq: workItem.clientReq || "",
          clientRev: workItem.clientRev || "",
          clientPP: workItem.clientPP || "",
          clientName: workItem.clientName || "",
          viewlink: workItem.viewlink || "",
          actionlink:workItem.actionlink || "",
          time: workItem.time || "",
          star: workItem.star || 0,
          pages: workItem.pages || "",
          shortDes: {
            text: workItem.shortDes?.text || "",
            listItem: workItem.shortDes?.listItem || [],
          },
        });

        setActionlink(workItem.actionlink || "");
        setCategories(workItem.subCat || []);
        setCateValue(workItem.subCat?.join(", ") || "");
        setSelectedCategory(workItem.type || "");
        setUrls(workItem.gallery || []);
        setfeatures(workItem?.shortDes?.listItem || []);
      } catch (error) {
        console.error("Error fetching work item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [lastId]);

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

  const handleArrayInputChange = (value, setValue, setArray, separator = ",") => {
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
      ...inputs,
      gallery: urls,
      type: selectedCategory,
      subCat: categories,
      actionlink:actionlink,
      shortDes: { text:inputs.shortDes.text, listItem : features}
    };

    console.log(payload);

    try {
      await newRequest.put(`/workItem/update/${lastId}`, payload);
      showSuccessAlert("WorkItem updated successfully.");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="updiv">
      <h2>Update Work Item</h2>
      <div className="input">
        <div className="col">
          <label htmlFor="title">Title</label>
          <input
            className="title"
            type="text"
            placeholder="Title"
            name="title"
            value={inputs.title}
            onChange={handleInputChangeWrapper}
          />

          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            className="thumbnail"
            type="text"
            placeholder="Thumbnail URL"
            name="thumbnail"
            value={inputs.thumbnail}
            onChange={handleInputChangeWrapper}
          />

          <label htmlFor="hoverThumbnail">Hover Thumbnail</label>
          <input
            className="hover-thumbnail"
            type="text"
            placeholder="Hover Thumbnail URL"
            name="hoverThumbnail"
            value={inputs.hoverThumbnail}
            onChange={handleInputChangeWrapper}
          />

          <label htmlFor="gallery">Gallery Images</label>
          <div className="items">
            <Items
              data={urls}
              remove={(index) =>
                setUrls((prev) => prev.filter((_, i) => i !== index))
              }
            />
          </div>
          <input
            className="gallery"
            type="text"
            placeholder="Gallery Image URL (comma separated)"
            name="gallery"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
          />

          <label htmlFor="type">Primary Category</label>
          <select
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
            name="actionlink"
            value={actionlink}
            onChange={(e) => setActionlink(e.target.value)}
          >
            <option value={"/newprojct"}>Website</option>
            <option value={"/new-project?project=mobile-app"}>
              Mobile App
            </option>
            <option value={"/new-project?project=graphic-design"}>
              Graphic
            </option>
          </select>
        </div>

        <div className="col">
          <label htmlFor="budget">Budget</label>
          <input
            className="budget"
            type="number"
            placeholder="Budget"
            name="budget"
            value={inputs.budget}
            onChange={handleInputChangeWrapper}
          />

          <label htmlFor="clientReq">Client Request</label>
          <input
            className="clientReq"
            type="text"
            placeholder="Client Request"
            name="clientReq"
            value={inputs.clientReq}
            onChange={handleInputChangeWrapper}
          />

          <label htmlFor="solutions">Solutions</label>
          <input
            className="solutions"
            type="text"
            placeholder="Our Solutions"
            name="solutions"
            value={inputs.solutions}
            onChange={handleInputChangeWrapper}
          />

          <label htmlFor="clientName">Client Name</label>
          <input
            className="clientName"
            type="text"
            placeholder="Client Name"
            name="clientName"
            value={inputs.clientName}
            onChange={handleInputChangeWrapper}
          />
        </div>

        <div className="col">
          <label htmlFor="clientRev">Client Review</label>
          <input
            className="clientRev"
            type="text"
            placeholder="Client Review"
            name="clientRev"
            value={inputs.clientRev}
            onChange={handleInputChangeWrapper}
          />

          <label htmlFor="star">Review Star</label>
          <input
            className="star"
            type="number"
            placeholder="Stars"
            name="star"
            value={inputs.star}
            onChange={handleInputChangeWrapper}
          />
          <div className="items">
            <Items
              data={features}
              remove={(index) => handleRemoveItem(index, setfeatures)}
            />
          </div>
          <textarea
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

          <label htmlFor="shortDes.text">Short Description</label>
          <textarea
            name="shortDes.text"
            rows={3}
            placeholder="Short Description"
            value={inputs.shortDes.text}
            onChange={handleInputChangeWrapper}
          />
        </div>
      </div>

      <button className="upbtn" onClick={handleUpload}>
        Update
      </button>
    </div>
  );
};

export default UpdateWorks;
