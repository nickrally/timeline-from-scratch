import React, { useRef } from "react";
import { useContainerWidth } from "../utils/useContainerWidth";
import { useDataContext } from "../../context/DataContext";
import "./Timeline.css";

const Timeline = ({ nodes }) => {
  console.log("NODES", nodes);
  //const { nodes } = useDataContext();
  console.log("NODES", nodes.current);
  const timelineRef = useRef();
  const width = useContainerWidth(timelineRef);
  return (
    <>
      <div ref={timelineRef} className="container">
        {nodes?.map((node, idx) => (
          <span className="row" key={idx}>
            {node}
          </span>
        ))}
      </div>
    </>
  );
};

export default Timeline;
