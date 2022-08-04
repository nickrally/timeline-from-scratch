import moment from "moment";
import React, { createContext, useContext, useState } from "react";

export const ViewModelContext = createContext({});

export const useViewModelContext = () => {
  return useContext(ViewModelContext);
};

export const ViewModelContextProvider = ({ children }) => {
  const today = new Date();
  const initStartDate = new Date().setDate(today.getDate() - 120);
  const initEndDate = new Date().setDate(today.getDate() + 120);

  const [startDate, setStartDate] = useState(
    moment(initStartDate).toISOString()
  );
  const [endDate, setEndDate] = useState(moment(initEndDate).toISOString());
  const start = moment(startDate, "YYYY-MM-DD");
  const end = moment(endDate, "YYYY-MM-DD");
  const numberOfWeeks = Math.floor(moment.duration(end.diff(start)).asWeeks());
  const numberOfDays = Math.floor(moment.duration(end.diff(start)).asDays());

  const updateStartDate = (date) => {
    setStartDate(date);
  };

  const updateEndDate = (date) => {
    setEndDate(date);
  };

  const contextProps = {
    updateEndDate,
    updateStartDate,
    startDate,
    endDate,
    numberOfWeeks,
    numberOfDays,
  };
  return (
    <ViewModelContext.Provider value={contextProps}>
      {children}
    </ViewModelContext.Provider>
  );
};
