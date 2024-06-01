require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
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
      accounts: ["Ox"],
    },
    FilecoinMainnet: {
      chainId: 314,
      url: "https://api.node.glif.io",
      accounts: ["0x"],
    },
  },
};
