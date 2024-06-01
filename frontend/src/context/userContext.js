"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { useAccount } from "wagmi";

const defaultUser = {
  address: "",
  chainId: 1,
  role: "user",
  roleChoose: false,
  isConnected: false,
  isRegistered: false,
  minerDetails: {
    minerId: "t017840",
    paymentReceiver: "0x68de4962694b8e8ee61d59d8acb4e142e8e5ba51",
    token: "",
    price: "1000000",
    location: "asia",
    dealDuration: "10000000",
    retrievalProvided: true,
    verifiedDeal: true,
  },
};

const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const { address, isConnected } = useAccount();

  const handleChangeRole = (role) => {
    setUser((prev) => ({ ...prev, role, roleChoose: true }));
  };

  const handleChangeUser = (key, value) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeMinerDetails = (key, value) => {
    setUser((prev) => ({
      ...prev,
      minerDetails: {
        ...prev.minerDetails,
        [key]: value,
      },
    }));
  };

  useEffect(() => {
    if (isConnected) {
      setUser((prev) => ({ ...prev, address, isConnected }));
    } else {
      setUser(defaultUser);
    }
  }, [isConnected]);
  return (
    <UserContext.Provider
      value={{
        user,
        handleChangeRole,
        handleChangeUser,
        handleChangeMinerDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
