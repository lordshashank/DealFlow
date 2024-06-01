import DealCard from "@/components/DealCard";
import styles from "../../index.module.css";
import { useDeals } from "@/context/DealContext";

const dummyDeal = {
  fileName: "file.txt",
  clientAddress: "t3xv7b7v6",
  miner: "t3xv7b7v6",
  dealId: 1,
  pieceCid: "bafykbzaced6w",
  size: 1000000000,
  startTime: "2021-09-01T00:00:00Z",
  endTime: "2027-09-30T00:00:00Z",
};
export default function Active() {
  const { filterDeals } = useDeals();
  const activeDeals = filterDeals("active");
  return (
    <div className={styles["container"]}>
      {activeDeals.length > 0 ? (
        activeDeals.map((deal) => <DealCard deal={deal} key={deal.fileName} />)
      ) : (
        <h1>No active deals</h1>
      )}
    </div>
  );
}
