import React, { useState } from "react";
import "./single.scss";
import newRequest from "../../Utils/newRequest";

const Single = ({ data, refreshData }) => {
  const [loadingStates, setLoadingStates] = useState({});

  const updatePrice = async (id, index) => {
    setLoadingStates((prev) => ({ ...prev, [index]: true })); // Set loading for the specific milestone

    try {
      const res = await newRequest.put(`/order/admin/update/${id}`);
      
    } catch (err) {
      console.error("Error updating Milestone:", err.message || err);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [index]: false })); // Reset loading state
    }
  };

  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <h1>{data.Cat}</h1>
          </div>
          <div className="details">
            <div className="item">
              <span className="itemTitle">Price: {data.price}</span>
              <span className="itemValue">Status: {data.status}</span>
              <span className="itemValue">ID: {data._id}</span>
            </div>

            <div className="mileStones">
              {data?.milestones?.map((mile, index) => (
                <div className="stone" key={index}>
                  <h4>Stage: {mile.stage}</h4>
                  <span>Percentage: {mile.percentage}</span>
                  <span>Amount: {((data.price * mile.percentage) / 100).toFixed(2)}</span>
                  <span>Released: {mile.released ? "Yes" : "No"}</span>
                  {!mile.released ? (
                    <button
                      onClick={() => updatePrice(data._id, index)}
                      disabled={loadingStates[index]}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: loadingStates[index] ? "#ccc" : "#007BFF",
                        color: loadingStates[index] ? "#555" : "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: loadingStates[index] ? "not-allowed" : "pointer",
                      }}
                    >
                      {loadingStates[index] ? "Releasing..." : "Release"}
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        {data.details && (
          <ul>
            {Object.entries(data.details).map((item, index) => (
              <li key={index}>
                <div className="item">
                  <h4 className="itemTitle">{item[0]}</h4>
                  <p className="itemValue">{item[1]}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Single;
