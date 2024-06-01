import Button from "@/reusables/Button";
import styles from "./index.module.css";
import { getTimeInDays } from "@/utils/helper";

export default function StoreCard({ minerDetails, handleOpenDealModal }) {
  const { miner, price, pieceCid, time } = minerDetails;

  return (
    <div className={styles.container}>
      <div className={styles["deal-header"]}>
        <div className={styles["deal-size"]}>
          <p>${price}/GB</p>
        </div>
      </div>
      <div className={styles["deal-body"]}>
        <div className={styles["miner-address"]}>
          <p>
            For <b>{getTimeInDays(time)} DAYS</b>
          </p>
        </div>
        <div className={styles["miner-address"]}>
          <p>
            {miner} {" ("}
            <span>Miner</span>
            {")"}
          </p>
        </div>
        <div className={styles["miner-address"]}>
          <p>
            {pieceCid} {" ("}
            <span>CID</span>
            {")"}
          </p>
        </div>
      </div>
      <Button label="Make Deal" size="small" onClick={handleOpenDealModal} />
    </div>
  );
}
