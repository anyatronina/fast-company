import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import SearchBox from "../../common/searchBox";
import api from "../../../api";
import { paginate } from "../../../utils/paginate";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const [searchString, setSearchString] = useState("");

  const { users } = useUser();

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);

  const handleDelete = (userId) => {
    // setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    console.log(userId);
  };

  const handleToggleBookmark = (id) => {
    // setUsers((prevState) => {
    //   return prevState.map((user) => {
    //     if (user._id === id) {
    //       return { ...user, bookmark: !user.bookmark };
    //     }
    //     return user;
    //   });
    // });

    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });

    console.log(newArray);
  };

  const handleProfessionSelect = (item) => {
    setSearchString("");
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearchUser = ({ target }) => {
    setSelectedProf();
    setSearchString(target.value);
  };

  const getFilteredUsers = (selectedProf, searchString) => {
    if (selectedProf)
      return users.filter((user) => user.profession._id === selectedProf._id);
    if (searchString.trim() !== "") {
      return users.filter((user) =>
        user.name.toLowerCase().includes(searchString.toLowerCase())
      );
    }
    return users;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  useEffect(() => {
    if (users) {
      const filteredUsers = getFilteredUsers(selectedProf, searchString);
      const usersCrop = paginate(filteredUsers, currentPage, pageSize);

      if (usersCrop.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  }, [users, searchString]);

  if (users) {
    const filteredUsers = getFilteredUsers(selectedProf, searchString);

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, sortBy.path, sortBy.order);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSearchString("");
      setSelectedProf();
    };

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
        <div className="d-flex flex-column flex-grow-1">
          <SearchStatus usersCount={count} />
          <SearchBox value={searchString} onChange={handleSearchUser} />
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
  }
  return <h6>Loading...</h6>;
};

export default UsersListPage;
