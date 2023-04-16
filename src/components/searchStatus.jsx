import React from "react";

const SearchStatus = ({ usersCount }) => {
  return usersCount === 0 ? (
    <span className="badge bg-danger m-2 p-1">
      <h4>Никто с тобой не тусанет</h4>
    </span>
  ) : (
    <span className="badge bg-primary m-2 p-1">
      <h4>
        {usersCount === 1 || usersCount > 4
          ? usersCount + " человек "
          : usersCount + " человека "}
        тусанет с тобой сегодня
      </h4>
    </span>
  );
};

export default SearchStatus;
