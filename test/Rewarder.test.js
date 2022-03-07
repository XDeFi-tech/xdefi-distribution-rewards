const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Rewarder", function () {
  it("Should return the new rewarder", async function () {
    const [owner, admin2, admin3, sender, destination] =
      await ethers.getSigners();
    const Rewarder = await ethers.getContractFactory("Rewarder");
    const rewarder = await Rewarder.deploy();
    await rewarder.deployed();

    expect(await rewarder.admins(owner.address)).to.equal(true);
  });

  it("Should set admins", async function () {
    const [owner, admin2, admin3, sender, destination] =
      await ethers.getSigners();
    const Rewarder = await ethers.getContractFactory("Rewarder");
    const rewarder = await Rewarder.deploy();
    await rewarder.deployed();

    const setAdminsTx = await rewarder.setAdmins(
      [admin2.address, admin3.address, owner.address],
      [true, true, false]
    );
    await setAdminsTx.wait();

    expect(await rewarder.admins(admin2.address)).to.equal(true);
    expect(await rewarder.admins(admin3.address)).to.equal(true);
    expect(await rewarder.admins(owner.address)).to.equal(false);
  });

  it("Should set senders", async function () {
    const [owner, admin2, admin3, sender, destination] =
      await ethers.getSigners();
    const Rewarder = await ethers.getContractFactory("Rewarder");
    const rewarder = await Rewarder.deploy();
    await rewarder.deployed();

    expect(await rewarder.senders(sender.address)).to.equal(false);

    const setSendersTx = await rewarder.setSenders([sender.address], [true]);
    await setSendersTx.wait();

    expect(await rewarder.senders(sender.address)).to.equal(true);
  });

  it("Should set authorized destinations", async function () {
    const [owner, admin2, admin3, sender, destination] =
      await ethers.getSigners();
    const Rewarder = await ethers.getContractFactory("Rewarder");
    const rewarder = await Rewarder.deploy();
    await rewarder.deployed();

    expect(await rewarder.authorizedDestinations(destination.address)).to.equal(
      false
    );

    const setSendersTx = await rewarder.setAuthorizedDestinations(
      [destination.address],
      [true]
    );
    await setSendersTx.wait();

    expect(await rewarder.authorizedDestinations(destination.address)).to.equal(
      true
    );
  });
});
