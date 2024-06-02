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
import { useState } from "react";
import { sub } from "date-fns";
import { useMiner } from "@/context/minerContext";
import { getSubnetParams } from "@/utils/helper";

export default function SubnetModal({ isOpen, handleClose }) {
  const { user } = useUser();
  const [subnet, setSubnet] = useState({
    chainId: "317149",
    route: "0x52b832b3b44394c51297aea8f6dda56aae677eab",
    minActivationCollateral: 100000,
    minValidators: 1,
    bottomUpCheckPeriod: 2,
    activeValidatorsLimit: 5,
    majorityPercentage: 60,
    consensus: "fendermint",
    powerScale: 1,
    permissionMode: "collateral",
    supplySource: "native",
    subnetID: "314159",
  });
  const { handleAddSubnet } = useMiner();
  const { spinSubnet } = useDealFlow();
  const handleChangeDetails = (e) => {
    const { name, value } = e.target;
    setSubnet({ ...subnet, [name]: value });
  };

  const handleSelectMenuItem = (key, item) => {
    setSubnet({ ...subnet, [key]: item });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const minerId = user.minerDetails.minerId;
      const subnetParams = getSubnetParams(subnet);
      await spinSubnet(minerId, subnetParams);
      handleAddSubnet(subnet);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={isOpen}>
      <div className={styles.modal}>
        <h2>Subnet Details</h2>
        <div className={styles["role-container"]}>
          <TextField
            type={"number"}
            name="minActivationCollateral"
            placeholder="MINIMUM ACTIVATION COLLATERAL"
            value={subnet.minActivationCollateral}
            onChange={handleChangeDetails}
          />
          <TextField
            type={"number"}
            name="minValidators"
            placeholder="MINIMUM VALIDATORS"
            value={subnet.minValidators}
            onChange={handleChangeDetails}
          />
          <TextField
            type={"number"}
            name="bottomUpCheckPeriod"
            placeholder="BOTTOM UP CHECK PERIOD"
            value={subnet.bottomUpCheckPeriod}
            onChange={handleChangeDetails}
          />
          <TextField
            type={"number"}
            name="activeValidatorsLimit"
            placeholder="ACTIVE VALIDATORS LIMIT"
            value={subnet.activeValidatorsLimit}
            onChange={handleChangeDetails}
          />
          <TextField
            type={"number"}
            name="majorityPercentage"
            placeholder="MAJORITY PERCENTAGE"
            value={subnet.majorityPercentage}
            onChange={handleChangeDetails}
          />
          <Selector
            variant="single"
            name="consensus"
            placeholder="CONSENSUS"
            state={"enabled"}
            selected={subnet.consensus}
            list={["Fendermint"]}
            handleSelectMenuItem={(item) => {
              handleSelectMenuItem("consensus", item);
            }}
            menuHeight="150px"
            width="100%"
          />
          <TextField
            type={"number"}
            name="powerScale"
            placeholder="POWER SCALE"
            value={subnet.powerScale}
            onChange={handleChangeDetails}
          />
          <Selector
            variant="single"
            name="permissionMode"
            placeholder="PERMISSION MODE"
            state={"enabled"}
            selected={subnet.permissionMode}
            list={["collateral", "federated", "static"]}
            handleSelectMenuItem={(item) => {
              handleSelectMenuItem("permissionMode", item);
            }}
            menuHeight="150px"
            width="100%"
          />
          <Selector
            variant="single"
            name="supplySource"
            placeholder="SUPPLY SOURCE"
            state={"enabled"}
            selected={subnet.supplySource}
            list={["FIL", "USDC", "USDT"]}
            handleSelectMenuItem={(item) => {
              handleSelectMenuItem("supplySource", item);
            }}
            menuHeight="150px"
            width="100%"
          />
          <Selector
            variant="single"
            name="subnetID"
            placeholder="SUBNET ID"
            state={"enabled"}
            selected={subnet.subnetID}
            list={["314159"]}
            handleSelectMenuItem={(item) => {
              handleSelectMenuItem("subnetID", item);
            }}
            menuHeight="150px"
            width="100%"
          />
        </div>
        <div className={styles.actions}>
          <Button
            label={"Register"}
            variant="primary"
            onClick={handleRegister}
          />
          <Button label={"Cancel"} variant="secondary" onClick={handleClose} />
        </div>
      </div>
    </Modal>
  );
}
