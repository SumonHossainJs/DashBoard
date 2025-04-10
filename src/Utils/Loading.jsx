import React from "react";
import PropTypes from "prop-types";

const Loading = ({ size = "50px", color = "#3498db", message = "Loading..." }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `5px solid ${color}`,
    borderTop: `5px solid transparent`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <div style={spinnerStyle} />
      {message && <p style={{ color, marginTop: "10px" }}>{message}</p>}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  message: PropTypes.string,
};

export default Loading;
