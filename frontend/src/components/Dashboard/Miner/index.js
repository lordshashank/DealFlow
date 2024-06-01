import DashboardNav from "@/reusables/DashboardNav";
import { useState, useEffect } from "react";
import { Active, Pending, Challenged } from "../components";
import useDealFlow from "@/hooks/useDealFlow";
import styles from "./index.module.css";
import { useReadContract } from "wagmi";
import { contractAddress, abi } from "../../../../constants";
export default function Miner() {
  const list = ["pending", "active", "challenged", "profile"];
  const [selected, setSelected] = useState("active");
  const handleSelectMenuItem = (item) => {
    setSelected(item);
  };

  const { data, isFetched, isPending, refetch, isSuccess } = useReadContract({
    address: contractAddress.DealFlow,
    abi: abi.DealFlow,
    functionName: "getAllRegisteredMiners",
  });
  const { data: minerData, refetch: refetchMiner } = useReadContract({
    address: contractAddress.DealFlow,
    abi: abi.DealFlow,
    args: data,
    functionName: "minerRecord",
  });
  console.log(minerData);

  useEffect(() => {
    async function fetchData() {
      const result = await refetchMiner();
      console.log(result.data);
    }
    isFetched && fetchData();
  }, [isFetched]);
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
      </div>
    </div>
  );
}
