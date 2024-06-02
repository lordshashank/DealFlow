"use client";
import styles from "../../index.module.css";
import Link from "next/link";
import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";
import useDealFlow from "@/hooks/useDealFlow";
import { useUser } from "@/context/userContext";
const navigationItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];
function Navigation() {
  const { isConnected } = useAccount();
  const { user } = useUser();
  const pathname = usePathname();
  const minerParams = [
    "t017840",
    "0x68de4962694b8e8ee61d59d8acb4e142e8e5ba51",
    "0x68de4962694b8e8ee61d59d8acb4e142e8e5ba51",
    "1000000",
    "asia",
    "10000000",
    true,
    true,
  ];
  const { registerMiner, minerStake } = useDealFlow();
  const handleRegisterMiner = async () => {
    try {
      await registerMiner(minerParams);
    } catch (error) {
      console.log(error);
    }
  };
  const handleMinerStake = async () => {
    try {
      const response = await minerStake();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className={styles.nav}>
      <ul className={styles["nav-list"]}>
        {navigationItems.map((item) => (
          <li key={item.label} className={styles["nav-item"]}>
            <Link
              href={item.path}
              className={`${styles["nav-link"]} ${
                pathname === item.path ? styles.active : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
        {isConnected && user.roleChoose && (
          <li className={styles["nav-item"]}>
            <Link
              href="/dashboard"
              className={`${styles["nav-link"]} ${
                pathname === "/dashboard" ? styles.active : ""
              }`}
            >
              Dashboard
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
