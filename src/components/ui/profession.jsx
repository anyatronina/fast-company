import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  getProfessionById,
  getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
  const prof = useSelector(getProfessionById(id));
  const isLoading = useSelector(getProfessionsLoadingStatus());

  if (!isLoading) {
    return <p>{prof.name}</p>;
  } else {
    return "loading...";
  }
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
