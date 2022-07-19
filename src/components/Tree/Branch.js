import React, { useState } from "react";
import Leaf from "./Leaf";

const Branch = ({ item, level }) => {
  const [selected, setSelected] = useState(item.selected ?? false);
  console.log("ITEM", item);
  //const hasChildren = item.children && item.children.length !== 0;

  /* const renderBranches = () => {
    if (hasChildren) {
      const nextLevel = level + 1;

      return item.children.map((child) => {
        return (
          <Branch
            key={child.id}
            item={child}
            level={nextLevel}
            selected={selected}
          />
        );
      });
    }
    return null;
  }; */
  const toggleSelected = () => {
    setSelected((prev) => !prev);
  };

  return (
    <>
      <Leaf
        item={item}
        //hasChildren={hasChildren}
        level={level}
        onSelected={toggleSelected}
        selected={selected}
      />
      {selected && renderBranches()}
    </>
  );
};

export default Branch;
