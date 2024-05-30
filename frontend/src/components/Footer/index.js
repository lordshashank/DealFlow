import styles from "./index.module.css";
import Navigation from "../Header/components/Navigation";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Image src="/logo-large.png" alt="logo" width={181} height={181} />
      </div>
      <p className={styles.email}>contact@dealflow.com</p>
      <div className={styles["social-links"]}>
        <Link
          href="https://twitter.com/dealflow"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
        </Link>
        <Link
          href="https://facebook.com/dealflow"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
        </Link>
        <Link
          href="https://instagram.com/dealflow"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
        </Link>
      </div>
      <div className={styles["nav-wrapper"]}>
        <Navigation />
      </div>

      <p className={styles.copyright}>Copyright © 2024 • DealFlow.</p>
    </footer>
  );
}
