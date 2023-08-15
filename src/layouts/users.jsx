import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
  const params = useParams();
  const { userId } = params;

  return (
    <>
      <UsersLoader>
        {userId ? <UserPage userId={userId} /> : <UsersListPage />}
      </UsersLoader>
    </>
  );
};

export default Users;
