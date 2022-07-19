import React, { useState, useEffect } from "react";
import Leaf from "./Leaf";
import { getChildren } from "../../api/wsapi";
import { useQuery } from "react-query";

const Branch = ({ item, level }) => {
  const [selected, setSelected] = useState(false);
  const hasChildren = item.DirectChildrenCount > 0;
  const piType = "PortfolioItem/Feature";
  const { data, error, isLoading, isFetching, isError } = useQuery(
    [piType],
    () => getChildren(piType, item.ObjectID)
  );

  const renderBranches = () => {
    if (hasChildren) {
      const nextLevel = level + 1;
      return data.map((child) => {
        return <Branch key={child.ObjectID} item={child} level={nextLevel} />;
      });
    }
    return null;
  };

  const toggleSelected = () => {
    setSelected((prev) => !prev);
  };

  return (
    <>
      <Leaf
        item={item}
        hasChildren={hasChildren}
        level={level}
        onSelected={toggleSelected}
        selected={selected}
      />
      {selected && renderBranches()}
    </>
  );
};

export default Branch;
