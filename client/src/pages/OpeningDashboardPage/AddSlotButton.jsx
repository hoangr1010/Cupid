import React from "react";
import { Link } from "react-router-dom";

const AddSlotButton = () => {
  return (
    <Link to="./create">
      <button
        type="button"
        className="filled-btn"
        style={{ display: "block", margin: "0 auto", padding: "10px 20px" }}
      >
        Create Opening Slots
      </button>
    </Link>
  );
};

export default AddSlotButton;
