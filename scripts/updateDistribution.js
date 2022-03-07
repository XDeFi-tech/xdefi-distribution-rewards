const hre = require("hardhat");

async function main() {
  await hre.run("compile");
  console.log("updateDistribution");

  const DESTINATION = "0x1dfd9029d89f87c8c63ed8ef2be1b5393b2348ef"; // XDEFI Badgies
  const XDistrib = await hre.ethers.getContractAt(
    "IXDEFIDistribution",
    DESTINATION
  );
  const tx = await XDistrib.updateDistribution();
  console.log(tx);
  await tx.wait();

  console.log("end");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
