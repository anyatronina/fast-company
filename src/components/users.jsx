import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import api from "../api";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = ({ users, onDelete, onToggleBookmark }) => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setselectedProf] = useState();
  let maxPage = 1;

  const handleProfessionSelect = (item) => {
    setselectedProf(item);
    console.log(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
    maxPage = pageIndex;
  };

  const clearFilter = () => {
    setselectedProf();
  };

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession._id === selectedProf._id)
    : users;
  const count = filteredUsers.length;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  useEffect(() => {
    // const isNullPage = currentPage > maxPage && userCrop.length === 0;
    if (currentPage > maxPage && userCrop.length === 0)
      return setCurrentPage(currentPage - 1);
  }, [users]);

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus usersCount={count} />
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
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
};

export default Users;
