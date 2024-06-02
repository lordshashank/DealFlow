import Button from "@/reusables/Button";
import styles from "./index.module.css";
import { getTimeInDays } from "@/utils/helper";
import Actions from "../DealCard/Actions";
import Image from "next/image";
import { useState } from "react";

export default function StoreCard({
  minerDetails,
  handleOpenDealModal,
  handleOpenInfoModal,
}) {
  const { miner, price, token, time } = minerDetails;
  const [showActions, setShowActions] = useState(false);

  const actions = [
    {
      label: "View Info",
      onClick: () => {
        handleOpenInfoModal();
        setShowActions(false);
      },
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles["deal-header"]}>
        <div className={styles["deal-size"]}>
          <p>${price}/GB</p>
        </div>
        <div className={styles["deal-actions"]}>
          <Image
            className={styles.img}
            src={"/three-dot.svg"}
            alt="actions"
            width={24}
            height={24}
            onClick={() => {
              setShowActions(!showActions);
            }}
          />
          {showActions && <Actions actions={actions} />}
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
            <span>Miner: </span>
            {miner}
          </p>
        </div>
        <div className={styles["miner-address"]}>
          <p>
            <span>TOKEN: </span>
            {token}
          </p>
        </div>
      </div>
      <Button label="Make Deal" size="small" onClick={handleOpenDealModal} />
    </div>
  );
}
