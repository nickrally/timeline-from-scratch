import React, { useState } from "react";
//import { useDataContext } from "../../context/DataContextProvider";
import { getAllItems } from "../../api/wsapi";
import { useQuery } from "react-query";
import Branch from "./Branch";
import "./Tree.css";

const Tree = () => {
  //const piType = "PortfolioItem/Initiative";
  const piType = "PortfolioItem/Theme";

  const { data, error, isLoading, isFetching, isError } = useQuery(
    [piType],
    () => getAllItems(piType, "2022-04-01", "2022-12-31")
  );

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error!</p>
      ) : data ? (
        data.map((item) => <Branch key={item.ObjectID} item={item} level={0} />)
      ) : null}
    </div>
  );
};

export default Tree;
