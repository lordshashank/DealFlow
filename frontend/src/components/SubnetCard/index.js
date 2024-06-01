import styles from "./index.module.css";

export default function SubnetCard({ subnet }) {
  return (
    <div className={styles.container}>
      <div className={styles["subnet-header"]}>
        <div className={styles["subnet-size"]}>
          <p>{subnet.size} GB</p>
        </div>
      </div>
      <div className={styles["subnet-body"]}>
        <div className={styles["subnet-address"]}>
          <p>
            {subnet.subnet} {" ("}
            <span>Subnet</span>
            {")"}
          </p>
        </div>
        <div className={styles["subnet-address"]}>
          <p>
            {subnet.cid} {" ("}
            <span>CID</span>
            {")"}
          </p>
        </div>
      </div>
    </div>
  );
}
