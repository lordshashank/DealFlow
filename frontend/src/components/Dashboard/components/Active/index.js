import DealCard from "@/components/DealCard";
import styles from "../../index.module.css";

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
  const dummyDeals = Array.from({ length: 5 }, (_, i) => ({
    ...dummyDeal,
    dealId: i + 1,
  }));
  return (
    <div className={styles["container"]}>
      {dummyDeals.map((deal) => (
        <DealCard deal={deal} key={deal.dealId} />
      ))}
    </div>
  );
}
