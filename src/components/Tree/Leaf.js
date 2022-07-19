import React from "react";
import "./Tree.css";

const Leaf = ({ item, hasChildren, level, onSelected, selected }) => {
  return (
    <div style={{ paddingLeft: `${level * 16}px` }}>
      {item.Name}
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
