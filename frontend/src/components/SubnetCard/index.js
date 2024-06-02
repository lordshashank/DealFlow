import styles from "./index.module.css";
import Button from "@/reusables/Button";
import Actions from "../DealCard/Actions";
import { useState } from "react";
import Image from "next/image";
import { useMiner } from "@/context/minerContext";

export default function SubnetCard({ subnet, handleOpenInfoModal }) {
  const { route, chainId, consensus, supplySource, permissionMode } = subnet;
  const [showActions, setShowActions] = useState(false);
  const { handleDeleteSubnet } = useMiner();
  const actions = [
    {
      label: "Delete",
      onClick: () => {
        handleDeleteSubnet(subnet.subnetID);
      },
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles["subnet-header"]}>
        <div className={styles["deal-size"]}>
          <p>{chainId}</p>
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
      <div className={styles["subnet-body"]}>
        <div className={styles["subnet-address"]}>
          <p>
            {route} {" ("}
            <span>Route</span>
            {")"}
          </p>
        </div>
        <div className={styles["subnet-address"]}>
          <p>
            {consensus} {" ("}
            <span>CONSENSUS</span>
            {")"}
          </p>
        </div>
        <div className={styles["subnet-address"]}>
          <p>
            {permissionMode} {" ("}
            <span>PERMISSION</span>
            {")"}
          </p>
        </div>
        <div className={styles["subnet-address"]}>
          <p>
            {supplySource} {" ("}
            <span>TOKEN</span>
            {")"}
          </p>
        </div>
      </div>
      <div className={styles.actions}>
        <Button label="View Info" size="medium" onClick={handleOpenInfoModal} />
      </div>
    </div>
  );
}
