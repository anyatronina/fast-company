import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
  _id,
  name,
  profession,
  qualities,
  completedMeetings,
  rate,
  bookmark,
  onDelete,
  onToggleBookmark
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Quality {...quality} key={quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <Bookmark
          id={_id}
          isFavorite={bookmark}
          onToggleBookmark={onToggleBookmark}
        />
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          delete
        </button>
      </td>
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
