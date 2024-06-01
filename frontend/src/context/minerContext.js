"use client";
import { useState, createContext, useContext } from "react";

const defaultSubnet = [
  {
    fileName: "high-fi.png",
    size: "83473847",
    miner: "t017840",
    pieceCid: "bafybeib3e32n2isls5yertlfcmsaqxpisryunis3rknxca26n4jcqdpymm",
    startTime: "2024-06-01T00:00:00.000Z",
    endTime: "2024-09-05T00:00:00.000Z",
    status: "active",
  },
];

const MinerContext = createContext(null);

export const useMiner = () => {
  const context = useContext(MinerContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const MinerProvider = ({ children }) => {
  const [subnets, setSubnets] = useState(defaultSubnet);

  const handleAddSubnet = (deal) => {
    setSubnets((prev) => [...prev, deal]);
  };

  return (
    <MinerContext.Provider
      value={{
        subnets,
        handleAddSubnet,
      }}
    >
      {children}
    </MinerContext.Provider>
  );
};
