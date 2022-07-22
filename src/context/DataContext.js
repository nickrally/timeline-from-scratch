import React, { createContext, useContext, useState } from "react";

export const DataContext = createContext({});

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used in DataContextProvider");
  }
  return context;
};

export const DataContextProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const handleNodeAdd = (item) => setNodes([...nodes, item]);
  return (
    <DataContext.Provider value={{ nodes, handleNodeAdd }}>
      {children}
    </DataContext.Provider>
  );
};
