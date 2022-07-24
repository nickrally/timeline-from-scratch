import React, { createContext, useContext, useState } from "react";

export const ViewModelContext = createContext({});

export const useViewModelContext = () => {
  return useContext(ViewModelContext);
};

export const ViewModelContextProvider = ({ children }) => {
  const [startDate, setStartDate] = useState("2022-04-01");
  const [endDate, setEndDate] = useState("2022-12-31");

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
  };
  return (
    <ViewModelContext.Provider value={contextProps}>
      {children}
    </ViewModelContext.Provider>
  );
};
