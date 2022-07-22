import React, { useState, useEffect } from "react";
import Leaf from "./Leaf";
import { getChildren, getPiTypes } from "../../api/wsapi";
import { useQuery } from "react-query";

const Branch = ({ item, level, handleClick }) => {
  const [selected, setSelected] = useState(false);

  const hasChildren =
    item.DirectChildrenCount > 0 && item._type !== "PortfolioItem/Feature";

  const {
    data: piTypes,
    isLoading: isLoadingPiTypes,
    isFetching: isFetchingPiTypes,
    isError: isErrorPiTypes,
  } = useQuery(["piTypes"], () => getPiTypes());

  console.log("piTypes", piTypes);

  //const piType = piTypes[item._type];

  const { data, error, isLoading, isFetching, isError } = useQuery(
    ["PortfolioItem/Feature", item],
    () => getChildren("PortfolioItem/Feature", item._ref)
  );

  const renderBranches = () => {
    if (hasChildren) {
      const nextLevel = level + 1;

      return data?.map((item) => {
        return (
          <Branch
            key={item.ObjectID}
            item={item}
            level={nextLevel}
            handleClick={handleClick}
          />
        );
      });
    }
    return null;
  };

  const toggleSelected = () => {
    setSelected((prev) => !prev);
    handleClick();
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
