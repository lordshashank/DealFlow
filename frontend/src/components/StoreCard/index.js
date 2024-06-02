import Button from "@/reusables/Button";
import styles from "./index.module.css";
import { getKeyByValue, getTimeInDays } from "@/utils/helper";
import Actions from "../DealCard/Actions";
import Image from "next/image";
import { useState } from "react";
import { contractAddress, abi } from "../../../constants";
import { useReadContract } from "wagmi";
import { paymentTokens } from "@/utils/paymentTokens";
import CardSkeleton from "@/reusables/CardSkeleton";

export default function StoreCard({
  miner,
  handleOpenDealModal,
  handleOpenInfoModal,
}) {
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
  const { data: minerDetails, isLoading } = useReadContract({
    address: contractAddress.DealFlow,
    args: [miner],
    abi: abi.DealFlow,
    functionName: "minerRecord",
  });

  if (isLoading) return <CardSkeleton />;

  if (!minerDetails)
    return <h2 className={styles.heading}>No Active Miners Found!</h2>;

  const [
    minerId,
    paymentReciever,
    token,
    price,
    location,
    dealDuration,
    verifiedDeal,
    retrievalProvided,
  ] = minerDetails;

  console.log(minerDetails);

  return (
    <div className={styles.container}>
      <div className={styles["deal-header"]}>
        <div className={styles["deal-size"]}>
          <p>${Number(price)}/GB</p>
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
            For <b>{getTimeInDays(Number(dealDuration))} DAYS</b>
          </p>
        </div>
        <div className={styles["miner-address"]}>
          <p>
            <span>Miner: </span>
            {minerId}
          </p>
        </div>
        <div className={styles["miner-address"]}>
          <p>
            <span>TOKEN: </span>
            {getKeyByValue(paymentTokens, token)}
          </p>
        </div>
      </div>
      <Button label="Make Deal" size="small" onClick={handleOpenDealModal} />
    </div>
  );
}
