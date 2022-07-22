import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { useDataContext } from "../../context/DataContext";
import { getAllItems } from "../../api/wsapi";
import { useQuery } from "react-query";
import Branch from "./Branch";
import "./Tree.css";

const Tree = ({ handleNodeAdd }) => {
  //const { handleNodeAdd } = useDataContext();
  const [clicked, setClicked] = useState(false);
  const nodesRef = useRef([]);
  const handleClick = () => {
    console.log("IN HANDLE CLICK");
    setClicked((prev) => !prev);
  };
  const piType = "PortfolioItem/Theme";

  const { data, error, isLoading, isFetching, isError } = useQuery(
    [piType],
    () => getAllItems(piType, "2022-04-01", "2022-12-31")
  );
  const treeRef = useRef();

  useLayoutEffect(() => {
    var div = document.querySelector("#tree");
    var nodeIterator = document.createNodeIterator(div, NodeFilter.SHOW_TEXT);
    let temp = [];
    while (nodeIterator.nextNode()) {
      let node = nodeIterator.referenceNode.nodeValue.trim();
      if (!isLoading) {
        console.log(node);
        temp.push(node);
        //const nodes = nodesRef.current;
        //nodesRef.current = new Set([...nodes, node]);
      }
    }
    nodesRef.current = temp;
    console.log(nodesRef.current);
    //handleNodeAdd(nodesRef.current);
  });

  return (
    <div id="tree" ref={treeRef}>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error!</p>
      ) : data ? (
        data.map((item) => (
          <Branch
            key={item.ObjectID}
            item={item}
            level={0}
            handleClick={handleClick}
          />
        ))
      ) : null}
    </div>
  );
};

export default Tree;
