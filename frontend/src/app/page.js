"use client";
import Image from "next/image";
import styles from "@/styles/page.module.css";
import Button from "@/reusables/Button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import RoleModal from "@/components/RoleModal";
import MinerModal from "@/components/MinerModal";
import { useAccount } from "wagmi";

export default function Home() {
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  return (
    <main className={styles.main}>
      <RoleModal />
      <MinerModal />
      <div className={styles.description}>
        <section className={styles.section}>
          <div className={styles["content-box"]}>
            <h1>
              <span className={styles.bold}>D</span>eal
              <span className={styles.bold}>F</span>low
            </h1>
            <p>
              DealFlow is an on-chain solution for the complete verifiable flow
              of storing files in Filecoin for SPs and end-users. It aims to
              give complete autonomy to both SPs to decide on their needs and
              specs and users to choose from different miners having various
              deliverables{" "}
            </p>
            <Button
              label="Get Started"
              onClick={openConnectModal}
              variant="primary"
              size="medium"
            />
          </div>
          <div className={styles["img-container"]}>
            <Image src={"/hero.png"} width={415} height={411} alt="hero" />
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles["img-container"]}>
            <Image src={"/about.png"} width={326} height={326} alt="about us" />
          </div>
          <div className={styles["content-box"]}>
            <h1 className={styles.bold}>How it works ?</h1>
            <p>
              DealFlow works with help of various tech stacks like Filecoin,
              FVM, IPC, Tellor, Beryx, etc. All our deal making process works
              through FVM, scaled with IPC. Tellor oracles ensure deal and
              retrieval reliability. Beryx helps to improve UX by fetching all
              on-chain data easily.{" "}
            </p>
            <Button
              label="Know More"
              onClick={() =>
                window.open(
                  "https://github.com/lordshashank/DealFlow",
                  "_blank"
                )
              }
              variant="primary"
              size="medium"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
