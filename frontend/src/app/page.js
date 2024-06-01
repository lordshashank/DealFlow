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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only{" "}
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only{" "}
            </p>
            <Button
              label="Know More"
              onClick={() => {}}
              variant="primary"
              size="medium"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
