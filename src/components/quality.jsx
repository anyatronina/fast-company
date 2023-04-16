import React from "react";

const Quality = ({ color, name }) => {
  return <div className={"badge m-1 bg-" + color}>{name}</div>;
};

export default Quality;
