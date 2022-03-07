// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  await hre.run("compile");

  const REWARDER_ADDRESS = `${process.env.REWARDER_ADDRESS}`;
  const AMOUNT = 100;
  const XDEFI_ADDRESS = "0x72b886d09c117654ab7da13a14d603001de0b777"; // Token address
  const DESTINATION = "0x1dfd9029d89f87c8c63ed8ef2be1b5393b2348ef"; // XDEFI Badgies
  const Rewarder = await hre.ethers.getContractFactory("Rewarder");
  const rewarder = Rewarder.attach(REWARDER_ADDRESS);
  const tx = rewarder.transferToken(XDEFI_ADDRESS, AMOUNT, DESTINATION);

  await tx.mined();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
