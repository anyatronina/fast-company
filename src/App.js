import React, { useState, useEffect } from "react";
import api from "./api";
import Users from "./components/users";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
  });

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (id) => {
    setUsers((prevState) => {
      return prevState.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      });
    });
  };

  return (
    <>
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookmark={handleToggleBookmark}
      />
    </>
  );
}

export default App;
