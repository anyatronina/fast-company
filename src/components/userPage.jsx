import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = () => {
  const { postId } = useParams();
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(postId).then((user) => {
      setUser(user);
    });
  }, []);

  const handleUsersList = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <div className="m-2">
        <h1>{user.name}</h1>
        <h3>Профессия: {user.profession.name}</h3>
        <h6>{<QualitiesList qualities={user.qualities} />}</h6>
        <h6>completedMeetings: {user.completedMeetings}</h6>
        <h3>Rate: {user.rate}</h3>
        <button onClick={handleUsersList}>Все Пользователи</button>
      </div>
    );
  }
  return <h6>Loading...</h6>;
};

export default UserPage;
