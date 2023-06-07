import React from "react";
import PropTypes from "prop-types";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={onChange}
      className="form-control m-2"
    ></input>
  );
};
SearchBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default SearchBox;
