import React, { useRef } from "react";
import { useContainerWidth } from "../utils/useContainerWidth";
import { useViewModelContext } from "../../context/ViewModelContext";
import "./Timeline.css";
import moment from "moment";

const Timeline = ({ bars }) => {
  const { endDate, startDate } = useViewModelContext();
  const start = moment(startDate, "YYYY-MM-DD");
  const end = moment(endDate, "YYYY-MM-DD");
  const numberOfWeeks = Math.ceil(moment.duration(end.diff(start)).asWeeks());
  const timelineRef = useRef();
  const width = useContainerWidth(timelineRef);
  const weekColumnWidth = Math.ceil(width / numberOfWeeks);
  //console.log("numberOfDays:", numberOfDays, "width:", width);
  //console.log("dayColumnWidth", dayColumnWidth);

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
