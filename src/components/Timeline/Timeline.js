import React, { useRef } from "react";
import { useContainerWidth } from "../utils/useContainerWidth";
import { useViewModelContext } from "../../context/ViewModelContext";
import "./Timeline.css";
import moment from "moment";

const Timeline = ({ bars }) => {
  const pills = bars?.map((bar) => bar.split("*")[1]);
  console.log("bars", bars);
  const { startDate, numberOfWeeks } = useViewModelContext();
  const timelineRef = useRef();
  const width = useContainerWidth(timelineRef);
  const weekColumnWidth = width / numberOfWeeks;

  const numberOfDays = numberOfWeeks * 7;
  const unit = width / numberOfDays;
  //const tempBarStartDate = "2022-05-15";

  const start = moment(startDate, "YYYY-MM-DD");
  //const barStart = moment(tempBarStartDate, "YYYY-MM-DD");

  //console.log("diff", diff);

  const calcStartPos = (pill) => {
    //const barStart = moment(pill, "YYYY-MM-DD");
    const barStart = moment(pill.split("=")[0], "YYYY-MM-DD");
    return Math.ceil(moment.duration(barStart.diff(start)).asDays());
  };

  const calcPos = (pill) => {
    console.log("pill", pill);
    const barStart = moment(pill.split("=")[0], "YYYY-MM-DD");
    console.log("start", start);
    const barEnd = moment(pill.split("=")[1], "YYYY-MM-DD");
    const length = Math.ceil(moment.duration(barEnd.diff(barStart)).asDays());
    console.log("length", length);
    console.log("start: `${start * unit}px`", start * unit);
    return {
      start: Math.ceil(moment.duration(barStart.diff(start)).asDays()),
      length: length,
    };
  };

  return (
    <>
      <div ref={timelineRef} className="container">
        {new Array(numberOfWeeks).fill(0).map((_, idx) => (
          <div
            key={idx}
            className={idx % 3 === 0 ? "vl vl3" : "vl"}
            style={{ right: `${idx * weekColumnWidth}px` }}
          ></div>
        ))}
        {pills?.map((pill, idx) => (
          <span className="row" key={idx}>
            <span
              style={{
                paddingLeft: `${calcPos(pill).start * unit}px`,
                width: `${calcPos(pill).length * unit}px`,
              }}
            >
              <span style={{ backgroundColor: "green" }}>{pill}</span>
            </span>
          </span>
        ))}
      </div>
    </>
  );
};

export default Timeline;
