import DashboardNav from "@/reusables/DashboardNav";
import { useState, useEffect } from "react";
import { Active, Pending, Challenged } from "../components";
import { Subnet } from "./components";
import useDealFlow from "@/hooks/useDealFlow";
import styles from "./index.module.css";
import { useReadContract } from "wagmi";
import { contractAddress, abi } from "../../../../constants";
export default function Miner() {
  const list = ["pending", "active", "challenged", "subnet"];
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
  // const minerDetails = {
  //   miner: minerData[0],
  //   paymentReciever: minerData[1],
  //   token: minerData[2],
  //   price: minerData[3],
  //   location: minerData[4],
  //   dealDuration: minerData[5],
  //   verifiedDeal: minerData[6],
  //   retrievalProvided: minerData[7],
  // };

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
        {selected === "subnet" && <Subnet />}
      </div>
    </div>
  );
}
