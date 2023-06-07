import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ id, isFavorite, onToggleBookmark }) => {
  return (
    <button onClick={() => onToggleBookmark(id)}>
      <i className={`bi bi-suit-heart${isFavorite ? "-fill" : ""}`} />
    </button>
  );
};

Bookmark.propTypes = {
  id: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
};

export default Bookmark;
