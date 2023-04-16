import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (id) => {
    const newUsersList = users.map((user) => {
      user._id === id && (user.bookmark = !user.bookmark);
      return user;
    });

    setUsers(newUsersList);
  };

  return (
    <>
      <SearchStatus length={users.length} />

      {users.length !== 0 ? (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookmark={handleToggleBookmark}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default App;
