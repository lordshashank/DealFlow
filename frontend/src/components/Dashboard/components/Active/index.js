import DealCard from "@/components/DealCard";
import styles from "../../index.module.css";

export default function Active({ deals, message }) {
  return (
    <div className={styles["container"]}>
      {deals.length > 0 ? (
        deals.map((deal) => <DealCard deal={deal} key={deal.fileName} />)
      ) : (
        <h1>{message}</h1>
      )}
    </div>
  );
}
