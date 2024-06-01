import { contractAddress, abi } from "../../constants";
import { useWriteContract, useReadContract } from "wagmi";

const UseToken = () => {
  const { writeContractAsync } = useWriteContract();

  const mint = async (to, amount) => {
    try {
      const response = await writeContractAsync(
        {
          address: contractAddress.Token,
          args: [to, amount],
          abi: abi.Token,
          functionName: "mint",
        },
        {
          onSuccess: () => {
            console.log("Minted Successfully!");
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

  const approve = async (spender, amount) => {
    try {
      const response = await writeContractAsync(
        {
          address: contractAddress.Token,
          args: [spender, amount],
          abi: abi.Token,
          functionName: "approve",
        },
        {
          onSuccess: () => {
            console.log("Approved Successfully!");
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

  const allowance = (owner, spender) => {
    try {
      const response = useReadContract(
        {
          address: contractAddress.Token,
          args: [owner, spender],
          abi: abi.Token,
          functionName: "allowance",
        },
        {
          onSuccess: () => {
            console.log("Allowance Checked Successfully!");
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

  const balanceOf = (address) => {
    try {
      const response = useReadContract(
        {
          address: contractAddress.Token,
          args: [address],
          abi: abi.Token,
          functionName: "balanceOf",
        },
        {
          onSuccess: () => {
            console.log("Balance Checked Successfully!");
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

  return { mint, approve, allowance, balanceOf };
};
export default UseToken;
