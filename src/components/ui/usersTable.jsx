import React from "react";
import Table from "../common/table";
import Bookmark from "../common/bookmark";
import Quality from "./qualities";
import PropTypes from "prop-types";
import Profession from "./profession";

const UserTable = ({ users, onToggleBookmark, onSort, selectedSort }) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (user) => <Quality qualities={user.qualities} />
    },
    professions: {
      name: "Профессия",
      component: (user) => <Profession id={user.profession} />
    },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          id={user._id}
          isFavorite={user.bookmark}
          onToggleBookmark={onToggleBookmark}
        />
      )
    }
  };

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};
UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
};

export default UserTable;
