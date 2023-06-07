import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/qualitiesList";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((user) => {
      setUser(user);
    });
  }, []);

  const handleUsersList = () => {
    history.push("/users");
  };

  const handleEditPage = () => {
    history.push(`/users/${userId}/edit`);
  };

  if (user) {
    return (
      <div className="m-2">
        <h1>{user.name}</h1>
        <h3>Профессия: {user.profession.name}</h3>
        <h6>{<QualitiesList qualities={user.qualities} />}</h6>
        <h6>completedMeetings: {user.completedMeetings}</h6>
        <h3>Rate: {user.rate}</h3>

        <div className="mb-2">
          <button onClick={handleEditPage}>Изменить</button>
        </div>

        <button onClick={handleUsersList}>Все Пользователи</button>
      </div>
    );
  }
  return <h6>Loading...</h6>;
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
