import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
  const { isLoading, getQualities } = useQualities();

  if (!isLoading) {
    return (
      <>
        {qualities.map((quality) => {
          const item = getQualities(quality);
          return <Quality {...item} key={item} />;
        })}
      </>
    );
  } else {
    return "loading...";
  }

  // return (
  //   <>
  //     {qualities.map((quality) => (
  //       <Quality {...quality} key={quality} />
  //     ))}
  //   </>
  // );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
