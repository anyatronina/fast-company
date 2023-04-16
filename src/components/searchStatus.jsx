import React from "react";

const SearchStatus = ({ length }) => {
  const result =
    length === 0 ? (
      <span className="badge bg-danger m-2 p-1">
        <h4>Никто с тобой не тусанет</h4>
      </span>
    ) : (
      <span className="badge bg-primary m-2 p-1">
        <h4>
          {length === 1 || length > 4
            ? length + " человек "
            : length + " человека "}
          тусанет с тобой сегодня
        </h4>
      </span>
    );

  return result;
};

export default SearchStatus;
