import React, { createContext, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const state = {
    fundingRound: "Seed",
    raisedAmount: "0.8M",
    teamSize: 8,
    milestones: { done: 8, total: 15 },
    compliance: { done: 9, total: 12 },
  };

  return (
    <DataContext.Provider value={{ state }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
