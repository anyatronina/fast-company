import React from "react";

const Quality = ({ color, name, _id }) => {
  return (
    <div key={_id} className={"badge m-1 bg-" + color}>
      {name}
    </div>
  );
};

export default Quality;
