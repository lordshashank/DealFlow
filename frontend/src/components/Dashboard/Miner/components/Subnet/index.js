import StoreCard from "@/components/StoreCard";
import styles from "./index.module.css";
import SubnetModal from "@/components/SubnetModal";
import Button from "@/reusables/Button";
import { useState } from "react";
import useDealClient from "@/hooks/useDealClient";

const dummyMiner = {
  miner: "t3xv7b7v6",
  pieceCid: "bafykbzaced6w",
  time: 3049483,
  price: 12,
};

export default function Subnet() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const { makeDealProposal } = useDealClient();

  const handleOpenSubnetModal = () => {
    setIsOpen(true);
  };
  const handleMakeDeal = () => {
    if (!file) return;
    console.log(file);
  };
  return (
    <div className={styles.container}>
      <Button
        label="CREATE SUBNET"
        variant="primary"
        size="large"
        onClick={handleOpenSubnetModal}
      />
      <SubnetModal
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
}
