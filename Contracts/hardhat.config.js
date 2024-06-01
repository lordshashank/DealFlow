require("@nomicfoundation/hardhat-toolbox");
// config dotenv
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
      },
      // {
      //   version: "0.8.20",
      // },
      {
        version: "0.8.3",
      },
      {
        version: "0.8.23",
        settings: {
          optimizer: {
            enabled: true,
            runs: 20,
          },
        },
      },
    ],
  },
  defaultNetwork: "Calibration",
  networks: {
    Calibration: {
      chainId: 314159,
      url: "https://api.calibration.node.glif.io/rpc/v1",
      accounts: [PRIVATE_KEY],
    },
    FilecoinMainnet: {
      chainId: 314,
      url: "https://api.node.glif.io",
      accounts: [PRIVATE_KEY],
    },
  },
};
