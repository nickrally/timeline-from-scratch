import React, { useEffect } from "react";
import "./Tree.css";

const Leaf = ({ item, hasChildren, level, onSelected, selected }) => {
  const shortref = item._ref.split("v2.0")[1];
  return (
    <div style={{ paddingLeft: `${level * 16}px` }}>
      {`${shortref}^${item.Name}*${item.PlannedStartDate.split("T")[0]}=${
        item.PlannedEndDate.split("T")[0]
      }`}
      {hasChildren && (
        <span
          className={!selected ? "arrow" : "arrow-down"}
          onClick={onSelected}
        ></span>
      )}
    </div>
  );
};

export default Leaf;
