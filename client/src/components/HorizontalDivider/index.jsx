import React from "react";

// type: "primary" | "gray"
const HorizontalDivider = ({ type, className }) => {
  return (
    <div className={className}>
      {type === "primary" && <div className="h-0.5 w-90 bg-primary mx-3"></div>}
      {type === "gray" && <div className="h-0.5 w-full bg-grayLighter"></div>}
    </div>
  );
};

export default HorizontalDivider;
