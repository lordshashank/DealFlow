"use client";
import styles from "../../index.module.css";
import Link from "next/link";
import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  console.log(pathname);
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
        {isConnected && (
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
