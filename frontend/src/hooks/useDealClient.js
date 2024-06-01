import { contractAddress, abi } from "../../constants";
import { useWriteContract } from "wagmi";
import { bytesToHex, parseEther } from "viem";
// import CID from "cids";
// const cid = new CID(
//   "baga6ea4seaqim3kdcgv4psrxyfobuihyvgs3h5ks6qcv5he3keoasdkxot6gihi"
// );
// const extraParamsV1 = [
//   "https://data-depot.lighthouse.storage/api/download/download_car?fileId=740eaf77-0516-4cdf-bb8b-02229eacadb5.car",
//   "138641223", //carSize,
//   false, // taskArgs.skipIpniAnnounce,
//   false, // taskArgs.removeUnsealedCopy
// ];
// const DealRequestStruct = [
//   cid.bytes, //cidHex
//   "268435456", //taskArgs.pieceSize,
//   true, //taskArgs.verifiedDeal,
//   "bafybeib3e32n2isls5yertlfcmsaqxpisryunis3rknxca26n4jcqdpymm", //taskArgs.label,
//   // 520000, // startEpoch
//   1800000, // startEpoch
//   2255200, // endEpoch
//   0, // taskArgs.storagePricePerEpoch,
//   0, // taskArgs.providerCollateral,
//   0, // taskArgs.clientCollateral,
//   1, //taskArgs.extraParamsVersion,
//   extraParamsV1,
// ];

const useDealClient = () => {
  const { writeContractAsync } = useWriteContract();

  const makeDealProposal = async (dealsArray) => {
    try {
      const piece_cid = bytesToHex(new Uint8Array(dealsArray.shift()));
      const deal = [piece_cid, ...dealsArray];
      const response = await writeContractAsync(
        {
          address: contractAddress.DealClient,
          args: [deal],
          abi: abi.DealClient,
          functionName: "makeDealProposal",
          // value: parseEther("0.1"),
        },
        {
          onSuccess: () => {
            console.log("Deal Proposal Created Successfully!");
            // showNotification({
            //   type: "SUCCESS",
            //   message: "Deal Proposal Created Successfully!",
            // });
          },
          onError: (error) => {
            console.log(error);
            // showNotification({
            //   type: "ERROR",
            //   message: "Something Went Wrong!",
            // });
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return { makeDealProposal };
};
export default useDealClient;
