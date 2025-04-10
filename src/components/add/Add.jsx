import React from "react";
import "./add.scss";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

const Add = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setOpen(false);
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
