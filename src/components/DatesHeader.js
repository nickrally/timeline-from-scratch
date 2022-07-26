import React, { useRef } from "react";
import moment from "moment";
import { useViewModelContext } from "../context/ViewModelContext";
import { useContainerWidth } from "./utils/useContainerWidth";

const DatesHeader = () => {
  const { endDate, numberOfWeeks, numberOfDays } = useViewModelContext();
  const datesHeaderRef = useRef();
  const width = useContainerWidth(datesHeaderRef);
  const weekColumnWidth = width / numberOfWeeks;
  const dayColumnWidth = width / numberOfDays;

  const renderDates = () => {
    const dates = new Array(numberOfDays).fill(0).map((_, idx) => (
      <div
        key={idx}
        className="foo"
        style={{ right: `${idx * dayColumnWidth}px` }}
      >
        {idx % 14 === 0 &&
          moment(endDate, "YYYY-MM-DD")
            .subtract(idx + 1, "days")
            .toISOString()
            .split("T")[0]
            .split("2022-")[1]}
      </div>
    ));
    return dates;
  };

  return (
    <div className="header" ref={datesHeaderRef}>
      {renderDates()}
    </div>
  );
};

export default DatesHeader;
