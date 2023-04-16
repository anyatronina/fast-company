import React from "react";

const Bookmark = ({ status, ...rest }) => {
  return !status ? (
    <i className="bi bi-suit-heart"></i>
  ) : (
    <i className="bi bi-suit-heart-fill"></i>
  );
};

export default Bookmark;
