import React from "react";
import PropTypes from "prop-types";

const Quality = ({ color, name }) => {
  return <div className={"badge m-1 bg-" + color}>{name}</div>;
};

Quality.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Quality;
