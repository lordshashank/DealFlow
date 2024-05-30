"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { useAccount } from "wagmi";

const defaultUser = {
  address: "",
  chainId: 1,
  role: "user",
  roleChoose: false,
  isConnected: false,
  minerDetails: {
    token: "",
    price: "",
    location: "",
    dealDuration: "",
    retrievalProvided: false,
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

  const changeRole = (role) => {
    setUser((prev) => ({ ...prev, role, roleChoose: true }));
  };

  useEffect(() => {
    if (isConnected) {
      setUser((prev) => ({ ...prev, address, isConnected }));
    } else {
      setUser(defaultUser);
    }
  }, [isConnected]);
  return (
    <UserContext.Provider value={{ user, changeRole }}>
      {children}
    </UserContext.Provider>
  );
};
