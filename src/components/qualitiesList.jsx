import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality) => (
        <Quality {...quality} key={quality} />
      ))}
    </>
  );
};
QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
