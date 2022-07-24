import React, { useState } from "react";
import moment from "moment";
import TimeLineDateEditor from "./TimelineDateEditor";
import { useViewModelContext } from "../../context/ViewModelContext";
import { hardcodedPiTypes } from "../../api/wsapi";
import Dropdown from "./Dropdown";

const TimelineToolbar = ({ selectedPiType, setSelectedPiType }) => {
  const { updateEndDate, updateStartDate, endDate, startDate } =
    useViewModelContext();

  //const [selectedOption, setSelectedOption] = useState(null);

  const hardcodedPiTypeNames = Object.keys(hardcodedPiTypes);

  //must use moment to convert date to ISOString:
  const endDatePickerProps = {
    onChange: (date) => {
      updateEndDate(moment(date).toISOString());
    },
    value: moment(endDate).toISOString(),
  };

  const startDatePickerProps = {
    onChange: (date) => {
      updateStartDate(moment(date).toISOString());
    },
    value: moment(startDate).toISOString(),
  };

  const handleSelection = (e) => {
    console.log("e.currentTarget.value", e.currentTarget.value);
    const found = hardcodedPiTypeNames?.filter(
      (pi) => pi === e.currentTarget.value
    );
    console.log("found?", found[0]);
    if (found) {
      setSelectedPiType(found[0]);
    }
  };

  return (
    <div>
      {!selectedPiType && <p>Make a selection</p>}
      <Dropdown
        onOptionChange={handleSelection}
        options={hardcodedPiTypeNames}
      />
      <div id="startDatePicker">
        <TimeLineDateEditor {...startDatePickerProps} />
      </div>
      <div id="endDatePicker">
        <TimeLineDateEditor {...endDatePickerProps} />
      </div>
    </div>
  );
};

export default TimelineToolbar;
