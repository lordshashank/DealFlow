import styles from "./index.module.css";
import Modal from "@/reusables/Modal";
import Image from "next/image";
import { useUser } from "@/context/userContext";
import TextField from "@/reusables/TextField";
import Selector from "@/reusables/Selector";
import Button from "@/reusables/Button";
import { useRouter } from "next/navigation";
import useDealFlow from "@/hooks/useDealFlow";
import { paymentTokens } from "@/utils/paymentTokens";

export default function MinerModal() {
  const { user, handleChangeMinerDetails, handleChangeUser } = useUser();
  const router = useRouter();
  const { minerStake, registerMiner } = useDealFlow();
  console.log(user);

  const openModal =
    user.role === "miner" && !user.isRegistered && user.isConnected;
  const handleChangeDetails = (e) => {
    const { name, value } = e.target;
    handleChangeMinerDetails(name, value);
  };

  const handleSelectMenuItem = (key, item) => {
    handleChangeMinerDetails(key, item);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const minerDetails = Object.values(user.minerDetails);
      console.log(minerDetails);
      // await registerMiner(minerDetails);
      // await minerStake();
      // handleChangeUser("isRegistered", true);
      // router.push("/dashboard?");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = (e) => {
    console.log("Cancel");
  };

  const cancelDisabled =
    user.minerDetails.token === "" ||
    user.minerDetails.price === "" ||
    user.minerDetails.location === "" ||
    user.minerDetails.dealDuration === "" ||
    user.minerDetails.verifiedDeal === "" ||
    user.minerDetails.retrievalProvided === "";
  return (
    <Modal open={openModal}>
      <div className={styles.modal}>
        <h2>Miner Details</h2>
        <div className={styles["role-container"]}>
          <Selector
            variant="single"
            name="token"
            placeholder="PREFERRED PAYMENT TOKEN"
            state={"enabled"}
            selected={user.minerDetails.token}
            list={Object.keys(paymentTokens)}
            handleSelectMenuItem={(item) => {
              handleSelectMenuItem("token", paymentTokens[item]);
            }}
            menuHeight="150px"
            width="100%"
          />
          <TextField
            name="price"
            placeholder="PRICE PER GB"
            value={user.minerDetails.price}
            onChange={handleChangeDetails}
          />
          <TextField
            name="location"
            placeholder="LOCATION"
            value={user.minerDetails.location}
            onChange={handleChangeDetails}
          />
          <TextField
            name="dealDuration"
            placeholder="MAX DEAL DURATION (IN MINS)"
            value={user.minerDetails.dealDuration}
            onChange={handleChangeDetails}
          />
          <Selector
            variant="single"
            name="verifiedDeal"
            placeholder="VERIFIED DEAL"
            state={"enabled"}
            selected={user.minerDetails.verifiedDeal ? "Yes" : "No"}
            list={["Yes", "No"]}
            handleSelectMenuItem={(item) => {
              handleSelectMenuItem("verifiedDeal", item === "Yes");
            }}
            menuHeight="150px"
            width="100%"
          />
          <Selector
            variant="single"
            name="retrievalProvided"
            placeholder="RETRIEVAL PROVIDED"
            state={"enabled"}
            selected={user.minerDetails.retrievalProvided ? "Yes" : "No"}
            list={["Yes", "No"]}
            handleSelectMenuItem={(item) => {
              handleSelectMenuItem("retrievalProvided", item === "Yes");
            }}
            menuHeight="150px"
            width="100%"
          />
        </div>
        <div className={styles.note}>
          <h6>Note : </h6>
          <p>
            Once you confirm the details you will have to stake <b>1 Ether</b>{" "}
            to proceed further and to host user data{" "}
          </p>
        </div>
        <div className={styles.actions}>
          <Button
            label={"Register"}
            variant="primary"
            onClick={handleRegister}
          />
          <Button
            label={"Cancel"}
            variant="secondary"
            onClick={handleCancel}
            disabled={cancelDisabled}
          />
        </div>
      </div>
    </Modal>
  );
}
