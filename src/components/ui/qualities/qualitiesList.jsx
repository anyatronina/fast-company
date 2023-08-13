import React, { useEffect } from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());

  if (!isLoading) {
    const qualitiesList = useSelector(getQualitiesByIds(qualities));

    useEffect(() => {
      dispatch(loadQualitiesList());
    }, []);

    return (
      <>
        {qualitiesList.map((quality) => {
          return <Quality {...quality} key={quality._id} />;
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
