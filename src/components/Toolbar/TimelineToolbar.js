import React, { useState } from "react";
import moment from "moment";
import TimeLineDateEditor from "./TimelineDateEditor";
import { useViewModelContext } from "../../context/ViewModelContext";
import { hardcodedPiTypes, getPiTypes } from "../../api/wsapi";
import { useQuery } from "react-query";
import Dropdown from "./Dropdown";

const TimelineToolbar = ({ selectedPiType, setSelectedPiType }) => {
  const { updateEndDate, updateStartDate, endDate, startDate } =
    useViewModelContext();

  //const hardcodedPiTypeNames = Object.keys(hardcodedPiTypes);

  const { data: piTypes } = useQuery(["piTypes"], () => getPiTypes());

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
    const found = piTypes?.filter(
      (type) => type.TypePath === e.currentTarget.value
    );
    if (found) {
      setSelectedPiType(found[0]);
    }
  };

  const contcretePiTypes = piTypes?.filter((type) => type.Ordinal >= 0);
  return (
    <div>
      {!selectedPiType && <p>Make a selection</p>}
      {piTypes && (
        <Dropdown onOptionChange={handleSelection} options={contcretePiTypes} />
      )}
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
