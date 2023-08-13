import React from "react";
import PropTypes from "prop-types";

const Quality = ({ _id, color, name }) => {
  return (
    <div className={"badge m-1 bg-" + color} key={_id}>
      {name}
    </div>
  );
};

Quality.propTypes = {
  _id: PropTypes.string,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Quality;
