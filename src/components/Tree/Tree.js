import React from "react";
import Branch from "./Branch";
import { useDataContext } from "../../context/DataContextProvider";

const Tree = () => {
  const [data, error, isLoading, isFetching, isError] = useDataContext();
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Oh, noes!</p>
      ) : data.QueryResult.Results ? (
        <div>
          {data.QueryResult.Results.map((item) => (
            <Branch key={item.ObjectID} item={item} level={0} />
          ))}
        </div>
      ) : (
        <p>nothing</p>
      )}
    </>
  );
};

export default Tree;
