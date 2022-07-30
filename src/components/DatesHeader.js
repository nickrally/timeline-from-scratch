import React, { useRef } from "react";
import moment from "moment";
import { useViewModelContext } from "../context/ViewModelContext";
import { useContainerWidth } from "./utils/useContainerWidth";

const DatesHeader = () => {
  const { endDate, numberOfWeeks } = useViewModelContext();
  const datesHeaderRef = useRef();
  const width = useContainerWidth(datesHeaderRef);
  const weekColumnWidth = width / numberOfWeeks;

  const renderDates = () => {
    const dates = new Array(numberOfWeeks).fill(0).map((_, idx) => (
      <div
        key={idx}
        className="foo"
        style={{ right: `${idx * weekColumnWidth}px` }}
      >
        {idx % 3 === 0 &&
          moment(endDate, "YYYY-MM-DD")
            .subtract(7 * (idx + 1), "days")
            .toISOString()
            .split("T")[0]}
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
