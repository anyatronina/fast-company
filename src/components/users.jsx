import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = ({ users, onDelete, onToggleBookmark }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  let maxPage = 1;

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
    maxPage = pageIndex;
  };

  const userCrop = paginate(users, currentPage, pageSize);

  useEffect(() => {
    // const isNullPage = currentPage > maxPage && userCrop.length === 0;
    if (currentPage > maxPage && userCrop.length === 0)
      return setCurrentPage(currentPage - 1);
  }, [users]);

  return (
    <>
      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              <User
                key={user._id}
                onDelete={onDelete}
                onToggleBookmark={onToggleBookmark}
                {...user}
              />
            ))}
          </tbody>
        </table>
      )}

      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
};

export default Users;
