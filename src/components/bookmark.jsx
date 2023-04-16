import React from "react";

const Bookmark = ({ id, isFavorite, onToggleBookmark }) => {
  return (
    <button onClick={() => onToggleBookmark(id)}>
      <i className={`bi bi-suit-heart${isFavorite ? "-fill" : ""}`} />
    </button>
  );
};

export default Bookmark;
