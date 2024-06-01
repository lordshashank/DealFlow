import StoreCard from "@/components/StoreCard";
import styles from "../../../index.module.css";
import UploadModal from "@/components/UploadModal";
import { useState } from "react";
import useDealClient from "@/hooks/useDealClient";

const dummyMiner = {
  miner: "t3xv7b7v6",
  pieceCid: "bafykbzaced6w",
  time: 3049483,
  price: 12,
};

export default function Store() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const { makeDealProposal } = useDealClient();

  const handleOpenDealModal = () => {
    setIsOpen(true);
  };
  const handleMakeDeal = () => {
    if (!file) return;
    console.log(file);
  };
  return (
    <div className={styles.container}>
      <StoreCard
        minerDetails={dummyMiner}
        handleOpenDealModal={handleOpenDealModal}
      />
      <UploadModal
        file={file}
        setFile={setFile}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        handleMakeDeal={handleMakeDeal}
      />
    </div>
  );
}
