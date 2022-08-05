import React, { useState } from "react";
import Leaf from "./Leaf";
import { getChildren, getChildType, hardcodedPiTypes } from "../../api/wsapi";
import { useQuery } from "react-query";
import "./Tree.css";
const Branch = ({ item, level, handleClick, selectedPiType }) => {
  const [selected, setSelected] = useState(false);

  const hasChildren =
    item.DirectChildrenCount > 0 && item._type !== "PortfolioItem/Feature";

  //const piType = hardcodedPiTypes[item._type];

  const {
    data: childType,
    error: childTypeError,
    isLoading: childTypeIsLoading,
    isFetching: childTypeIsFetching,
    isError: childTypeIsError,
  } = useQuery([item._type, item], () =>
    getChildType(selectedPiType?.Ordinal - level - 1)
  );

  const { data, error, isLoading, isFetching, isError } = useQuery(
    [childType?.TypePath, item],
    () => getChildren(childType?.TypePath, item._ref)
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
            selectedPiType={selectedPiType}
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
