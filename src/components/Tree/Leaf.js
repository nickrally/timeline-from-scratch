import React, { useEffect } from "react";
import "./Tree.css";
import { useDataContext } from "../../context/DataContext";

const Leaf = ({ item, hasChildren, level, onSelected, selected }) => {
  /*   const { handleNodeAdd } = useDataContext();
  useEffect(() => {
    handleNodeAdd(item);
  }, []); */
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
