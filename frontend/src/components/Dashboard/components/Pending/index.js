import styles from "../../index.module.css";
import { useDeals } from "@/context/DealContext";
import DealCard from "@/components/DealCard";
import { useEffect } from "react";
import { set } from "date-fns";

export default function Pending() {
  const { filterDeals, handleStatusChange } = useDeals();
  const pendingDeals = filterDeals("pending");

  useEffect(() => {
    if (pendingDeals.length > 0) {
      setTimeout(() => {
        handleStatusChange(pendingDeals[0].fileName, "active");
      }, 10000);
    }
  }, []);
  return (
    <div className={styles.container}>
      {pendingDeals.length > 0 ? (
        pendingDeals.map((deal) => <DealCard deal={deal} key={deal.fileName} />)
      ) : (
        <h1>No pending deals</h1>
      )}
    </div>
  );
}
