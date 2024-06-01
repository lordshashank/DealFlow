import { contractAddress, abi } from "../../constants";
import { useWriteContract } from "wagmi";

const useDealFlow = () => {
  const { writeContractAsync, readContractAsync } = useWriteContract();
  const registerMiner = async (minerParams) => {
    try {
      const response = await writeContractAsync(
        {
          address: contractAddress.DealFlow,
          args: minerParams,
          abi: abi.DealFlow,
          functionName: "registerMiner",
          value: "1000000000000",
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
    } catch (error) {
      console.log(error);
    }
  };

  const proposeDeal = async (minerId, dealParams) => {
    try {
      const response = await writeContractAsync(
        {
          address: contractAddress.DealFlow,
          args: [minerId, dealParams],
          abi: abi.DealFlow,
          functionName: "proposeDeal",
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
  const getDealPrice = async (pricePerGb, sizeInBytes) => {
    try {
      const response = await writeContractAsync(
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
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getAllRegisteredMiners = async () => {
    try {
      const response = await writeContractAsync(
        {
          address: contractAddress.DealFlow,
          args: [],
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
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getUserDeals = async (userAddress) => {
    try {
      const response = await writeContractAsync(
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
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getMinerDeals = async (minerId) => {
    try {
      const response = await writeContractAsync(
        {
          address: contractAddress.DealFlow,
          args: [minerId],
          abi: abi.DealFlow,
          functionName: "minerDeals",
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
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getMinerId = async (minerAddress) => {
    try {
      const response = await writeContractAsync(
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
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getMinerDetails = async (minerId) => {
    try {
      const response = await writeContractAsync(
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
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const minerStake = async () => {
    try {
      const response = await writeContractAsync(
        {
          address: contractAddress.DealFlow,
          args: [],
          abi: abi.DealFlow,
          functionName: "stakeAmount",
        },
        {
          onSuccess: () => {
            console.log("Miner Staked Successfully!");
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
  };
};
export default useDealFlow;
