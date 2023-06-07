import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ usersCount }) => {
  if (usersCount === 0) {
    return (
      <span className="badge bg-danger m-2 p-1">
        <h4>Никто с тобой не тусанет</h4>
      </span>
    );
  }

  return (
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

SearchStatus.propTypes = {
  usersCount: PropTypes.number.isRequired
};

export default SearchStatus;
