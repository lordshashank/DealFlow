"use client";
import { useUser } from "@/context/userContext";
import { User, Miner } from "@/components/Dashboard";
import styles from "@/styles/dashboard.module.css";

export default function Page() {
  const { user } = useUser();
  const { role } = user;
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {role === "user" && <User />}
        {role === "miner" && <Miner />}
      </div>
    </main>
  );
}
