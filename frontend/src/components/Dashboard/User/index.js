import DashboardNav from "@/reusables/DashboardNav";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Active, Pending, Challenged } from "../components";
import { Store } from "./components";
import { useReadContract } from "wagmi";
import { contractAddress, abi } from "../../../../constants";
import { useUser } from "@/context/userContext";
export default function User() {
  const list = ["pending", "active", "challenged", "store"];
  const [selected, setSelected] = useState("store");
  const { user } = useUser();
  const handleSelectMenuItem = (item) => {
    setSelected(item);
  };
  console.log(user.address);
  const result = useReadContract({
    address: contractAddress.DealFlow,
    args: [user.address],
    abi: abi.DealFlow,
    functionName: "userDeals",
  });
  console.log(result.data, result.isFetched, result.isSuccess);
  return (
    <div className={styles.container}>
      <DashboardNav
        list={list}
        handleSelectMenuItem={handleSelectMenuItem}
        selected={selected}
      />
      <div className={styles["selected-container"]}>
        {selected === "active" && <Active />}
        {selected === "pending" && <Pending />}
        {selected === "challenged" && <Challenged />}
        {selected === "store" && <Store />}
      </div>
    </div>
  );
}
