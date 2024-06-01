import styles from "../../index.module.css";
import DealCard from "@/components/DealCard";
import { useDeals } from "@/context/DealContext";
export default function Challenged() {
  const { filterDeals } = useDeals();
  const challengedDeals = filterDeals("challenged");
  return (
    <div className={styles.container}>
      {challengedDeals.length > 0 ? (
        challengedDeals.map((deal) => (
          <DealCard deal={deal} key={deal.fileName} />
        ))
      ) : (
        <h1>No challenged deals</h1>
      )}
    </div>
  );
}
