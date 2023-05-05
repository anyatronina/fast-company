import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import api from "../api";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import UserTable from "./usersTable";
import _ from "lodash";

const Users = () => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setselectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  let maxPage = 1;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
  }, []);

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

  const handleProfessionSelect = (item) => {
    setselectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
    maxPage = pageIndex;
  };

  const clearFilter = () => {
    setselectedProf();
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession._id === selectedProf._id)
    : users;
  const count = filteredUsers.length;
  const sortedUsers = _.orderBy(filteredUsers, sortBy.path, sortBy.order);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  useEffect(() => {
    if (currentPage > maxPage && userCrop.length === 0)
      setCurrentPage(currentPage - 1);
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
          <UserTable
            users={userCrop}
            onDelete={handleDelete}
            onToggleBookmark={handleToggleBookmark}
            onSort={handleSort}
            selectedSort={sortBy}
          />
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
