import React, { useState, createContext, useContext } from "react";
import { getAllItems } from "../api/wsapi";
import { useQuery } from "react-query";
import { useViewModelContext } from "./ViewModelContext";

export const DataContext = createContext();

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used in DataContextProvider");
  }
  return context;
};

export const DataContextProvider = ({ children }) => {
  const { startDate, endDate } = useViewModelContext();
  const { data, error, isLoading, isFetching, isError } = useQuery(
    ["features"],
    () => getAllItems("features", startDate, endDate)
  );
  const value = [data, error, isLoading, isFetching, isError];
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
