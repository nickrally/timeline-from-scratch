import React, { useRef } from "react";
import { useContainerWidth } from "../utils/useContainerWidth";
import "./Timeline.css";

const Timeline = ({ rows }) => {
  const timelineRef = useRef();
  const width = useContainerWidth(timelineRef);
  console.log("Width:", width);
  return (
    <>
      <div ref={timelineRef} className="container">
        {rows.map((row) => (
          <span className="row" key={row.ObjectID}>
            {row.Name}
          </span>
        ))}
      </div>
    </>
  );
};

export default Timeline;
