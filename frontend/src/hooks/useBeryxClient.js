import { Beryx } from "@zondax/beryx";

import useAccount from "wagmi";
const jwt = process.env.ZONDAX_JWT_TOKEN;
const client = new Beryx.Filecoin({ jwt, network: "calibration" });

async function getTransactionInfo() {
  const { address: userAccount, isConnected } = useAccount();

  async function getClientDeals() {
    return await client.data.getDealsByClient(userAccount);
  }
  async function getTipsetDeals() {
    return await client.data.getDealsByTipset(1);
  }
  async function getTransactionData(hash) {
    const response = await client.tools.convertHash(hash, "fil");
    console.log(response);
  }
  return { getClientDeals, getTipsetDeals, getTransactionData };
}
// getTransactionInfo();
export default getTransactionInfo;
