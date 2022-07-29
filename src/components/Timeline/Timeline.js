import React, { useRef } from "react";
import { useContainerWidth } from "../utils/useContainerWidth";
import { useViewModelContext } from "../../context/ViewModelContext";
import "./Timeline.css";

const Timeline = ({ bars }) => {
  const { numberOfWeeks } = useViewModelContext();
  const timelineRef = useRef();
  const width = useContainerWidth(timelineRef);
  const weekColumnWidth = Math.ceil(width / numberOfWeeks);

  return (
    <>
      <div ref={timelineRef} className="container">
        {new Array(numberOfWeeks).fill(0).map((_, idx) => (
          <div
            key={idx}
            className="vl"
            style={{ right: `${idx * weekColumnWidth}px` }}
          ></div>
        ))}
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
