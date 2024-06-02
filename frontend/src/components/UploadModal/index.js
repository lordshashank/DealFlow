import Button from "@/reusables/Button";
import styles from "./index.module.css";
import Modal from "@/reusables/Modal";
import Image from "next/image";

export default function UploadModal({
  file,
  setFile,
  isOpen,
  handleClose,
  handleMakeDeal,
  isLoading,
}) {
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <Modal open={isOpen} handleClose={handleClose}>
      <div className={styles.container}>
        <div className={styles["input-field-wrapper"]}>
          <Image src="/cloud.svg" alt="cloud" width={174} height={174} />
          <p>Drag or Drop your file here</p>
          <label htmlFor="file">Choose</label>
          <input
            type="file"
            id="file"
            className={styles.input}
            onChange={handleFileChange}
          />
        </div>
        <div className={styles.files}>
          {file && (
            <div className={styles.file}>
              <p>{file.name}</p>
              <Button
                variant="secondary"
                label="X"
                size="small"
                onClick={() => setFile(null)}
              />
            </div>
          )}
        </div>
        <div className={styles.actions}>
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <Button
              variant="primary"
              label="Make Deal"
              onClick={handleMakeDeal}
              isLoading={isLoading}
            />
          )}

          <Button variant="secondary" label="cancel" onClick={handleClose} />
        </div>
      </div>
    </Modal>
  );
}
