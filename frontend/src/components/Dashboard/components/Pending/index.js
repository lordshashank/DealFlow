import styles from "../../index.module.css";
import { useDeals } from "@/context/DealContext";
import DealCard from "@/components/DealCard";

export default function Pending() {
  const { filterDeals } = useDeals();
  const pendingDeals = filterDeals("pending");
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
