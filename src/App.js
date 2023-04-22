import React, { useState } from "react";
import api from "./api";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

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
      <SearchStatus usersCount={users.length} />

      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookmark={handleToggleBookmark}
      />
    </>
  );
}

export default App;
