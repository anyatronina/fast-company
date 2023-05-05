import React from "react";
// import Quality from "./quality";
// import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
  // _id,
  name,
  profession,
  // qualities,
  completedMeetings,
  rate
  // bookmark,
  // onDelete,
  // onToggleBookmark
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td></td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td></td>
      <td></td>
    </tr>
  );
};

User.propTypes = {
  _id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
};

export default User;
