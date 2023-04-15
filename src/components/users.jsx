import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    return (
      <span className="badge bg-primary m-2 p-1">
        <h4>
          {number === 1 || number > 4
            ? number + " человек "
            : number + " человека "}
          тусанет с тобой сегодня
        </h4>
      </span>
    );
  };

  const renderQualities = (qualities) => {
    return (
      <>
        {qualities.map((quality) => (
          <div key={quality._id} className={"badge m-1 bg-" + quality.color}>
            {quality.name}
          </div>
        ))}
      </>
    );
  };

  if (users.length === 0)
    return (
      <span className="badge bg-danger m-2 p-1">
        <h4>Никто с тобой не тусанет</h4>
      </span>
    );

  return (
    <>
      {renderPhrase(users.length)}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{renderQualities(user.qualities)}</td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}/5</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
