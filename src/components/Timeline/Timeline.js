import React, { useRef } from "react";
import { useContainerWidth } from "../utils/useContainerWidth";
import "./Timeline.css";

const Timeline = ({ bars }) => {
  const timelineRef = useRef();
  const width = useContainerWidth(timelineRef);
  return (
    <>
      <div ref={timelineRef} className="container">
        {bars?.map((bar, idx) => (
          <span className="row" key={idx}>
            {bar}
          </span>
        ))}
      </div>
    </>
  );
};

export default Timeline;
