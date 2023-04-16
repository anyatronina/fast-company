import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = ({
  _id,
  name,
  profession,
  qualities,
  completedMeetings,
  rate,
  bookmark,
  onDelete,
  onToggleBookmark,
}) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Quality {...quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <button onClick={() => onToggleBookmark(_id)}>
          <Bookmark status={bookmark} />
        </button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
