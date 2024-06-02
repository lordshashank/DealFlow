import { contractAddress, abi } from "../../constants";
import { useWriteContract, useReadContract } from "wagmi";
import { bytesToHex, parseEther } from "viem";

const useDealFlow = () => {
  const { writeContractAsync } = useWriteContract();
  // const minerParams = [
  //   "t017840",
  //   "0x9299eac94952235Ae86b94122D2f7c77F7F6Ad30",
  //   "0x4a8c75f0318C1D9Aeff3e9345f4BAcC78D6D6779",
  //   "10000",
  //   "asia",
  //   "10000000",
  //   true,
  //   true,
  // ];

  const registerMiner = async (minerParams) => {
    try {
      const response = await writeContractAsync(
        {
          address: contractAddress.DealFlow,
          args: minerParams,
          abi: abi.DealFlow,
          functionName: "registerMiner",
          value: "10000000000000",
        },
        {
          onSuccess: () => {
            console.log("Miner Registered Successfully!");
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const proposeDeal = async (minerId, dealParams) => {
    try {
      const piece_cid = bytesToHex(new Uint8Array(dealParams.shift()));
      const deal = [piece_cid, ...dealParams];
      console.log(deal);
      const response = await writeContractAsync(
        {
          address: contractAddress.DealFlow,
          args: [minerId, deal],
          abi: abi.DealFlow,
          functionName: "proposeDeal",
          // value
        },
        {
          onSuccess: () => {
            console.log("Deal Proposal Created Successfully!");
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  // const subnetParams = [
  //   "100000", // minActivationCollateral
  //   "1", // minValidators
  //   "2", // bottomUpCheckPeriod
  //   "0x6d25fbFac9e6215E03C687E54F7c74f489949EaF", // ipc gateway
  //   "5", // activeValidatorlimit
  //   "60", // majority percentage
  //   "0", //"fendermint", // consensus type
  //   "1", // power scale
  //   "0", //"Collateral", // permission mode
  //   [
  //     "0", //native supply
  //     "0x0000000000000000000000000000000000000000",
  //   ],
  //   [
  //     "317149", //chain id
  //     ["0x52b832b3b44394c51297aea8f6dda56aae677eab"], //route
  //   ],
  // ];
  const spinSubnet = async (minerId, subnetParams) => {
    try {
      const response = await writeContractAsync(
        {
          address: contractAddress.DealFlow,
          args: [minerId, subnetParams],
          abi: abi.DealFlow,
          functionName: "spinSubnet",
        },
        {
          onSuccess: () => {
            console.log("Subnet Spun Successfully!");
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const challengeDeal = async (dealId) => {
    try {
      const response = await writeContractAsync(
        {
          address: contractAddress.DealFlow,
          args: [dealId],
          abi: abi.DealFlow,
          functionName: "challenge",
        },
        {
          onSuccess: () => {
            console.log("Deal Challenged Successfully!");
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getDealPrice = (pricePerGb, sizeInBytes) => {
    try {
      const response = useReadContract(
        {
          address: contractAddress.DealFlow,
          args: [pricePerGb, sizeInBytes],
          abi: abi.DealFlow,
          functionName: "getDealPrice",
        },
        {
          onSuccess: () => {
            console.log("Deal Price Calculated Successfully!");
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getAllRegisteredMiners = () => {
    try {
      const response = useReadContract(
        {
          address: contractAddress.DealFlow,
          // args: [],
          abi: abi.DealFlow,
          functionName: "getAllRegisteredMiners",
        },
        {
          onSuccess: () => {
            console.log("All Registered Miners Fetched Successfully!");
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getUserDeals = (userAddress) => {
    try {
      const response = useReadContract(
        {
          address: contractAddress.DealFlow,
          args: [userAddress],
          abi: abi.DealFlow,
          functionName: "userDeals",
        },
        {
          onSuccess: () => {
            console.log("User Deals Fetched Successfully!");
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getMinerDeals = (minerId) => {
    try {
      const response = useReadContract(
        {
          abi: abi.DealFlow,
          address: contractAddress.DealFlow,
          functionName: "minerDeals",
          args: [minerId],
        },
        {
          onSuccess: () => {
            console.log("Miner Deals Fetched Successfully!");
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getMinerId = (minerAddress) => {
    try {
      const response = useReadContract(
        {
          address: contractAddress.DealFlow,
          args: [minerAddress],
          abi: abi.DealFlow,
          functionName: "minerAuth",
        },
        {
          onSuccess: () => {
            console.log("Miner ID Fetched Successfully!");
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getMinerDetails = (minerId) => {
    try {
      const response = useReadContract(
        {
          address: contractAddress.DealFlow,
          args: [minerId],
          abi: abi.DealFlow,
          functionName: "minerRecord",
        },
        {
          onSuccess: () => {
            console.log("Miner Details Fetched Successfully!");
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const minerStake = () => {
    try {
      const response = useReadContract(
        {
          abi: abi.DealFlow,
          address: contractAddress.DealFlow,
          functionName: "stakeAmount",
        },
        {
          onSuccess: () => {
            console.log("Fetched stake amount successfully!");
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
      console.log(Number(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const challengeDealDup = async () => {
    try {
      const response = await writeContractAsync(
        {
          address: contractAddress.DealFlow,
          abi: abi.DealFlow,
          functionName: "getAllRegisteredMiners",
        },
        {
          onSuccess: () => {
            console.log("Deal Challenged Successfully!");
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    registerMiner,
    proposeDeal,
    spinSubnet,
    getDealPrice,
    getAllRegisteredMiners,
    getUserDeals,
    getMinerDeals,
    getMinerId,
    getMinerDetails,
    minerStake,
    challengeDeal,
    challengeDealDup,
  };
};
export default useDealFlow;
