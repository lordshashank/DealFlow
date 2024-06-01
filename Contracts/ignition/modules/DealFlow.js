const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DealFLowModule", (m) => {
  const dealContractAddress = m.getParameter(
    "dealClientAddress",
    "0xFe643b54727d53C49835f9f6c1a2B9861E741d98"
  );
  const subnetRegistryAddress = m.getParameter(
    "subnetRegistryAddress",
    "0xc938B2B862d4Ef9896E641b3f1269DabFB2D2103"
  );
  const stakeAmount = m.getParameter("stakeAmount", "1000000000000");

  const dealFlow = m.contract("DealFlow", [
    dealContractAddress,
    subnetRegistryAddress,
    stakeAmount,
  ]);

  return { dealFlow };
});
