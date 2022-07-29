import React, { useRef } from "react";
import { useViewModelContext } from "../context/ViewModelContext";
import { useContainerWidth } from "./utils/useContainerWidth";

const DatesHeader = () => {
  const { numberOfWeeks } = useViewModelContext();
  console.log("numberOfWeeks", numberOfWeeks);
  const datesHeaderRef = useRef();
  const width = useContainerWidth(datesHeaderRef);
  const weekColumnWidth = Math.ceil(width / numberOfWeeks);
  return (
    <div className="header" ref={datesHeaderRef}>
      {new Array(numberOfWeeks).fill(0).map((_, idx) => (
        <div
          key={idx}
          className="foo"
          style={{ right: `${idx * weekColumnWidth}px` }}
        >
          {idx}
        </div>
      ))}
    </div>
  );
};

export default DatesHeader;
