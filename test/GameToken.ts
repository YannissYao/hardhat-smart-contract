import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("GameToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function initGameToken() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const GameToken = await ethers.getContractFactory("GameToken");

    //部署后拿到地址方式
    //加了个参数，owner地址，用工厂来部署，这个默认是工厂的地址
    const gameToken = await GameToken.deploy("SKS", "SKS");

    //指定合约地址方式
    //     const gameToken = GameToken.attach("0xf5b1A0F2baCF0F5F436a13713022298002C96523");
    gameToken.mint(owner.address, 9999999999);
    return { gameToken, owner, otherAccount };
  }

  it("balanceOf shoule ", async function () {
    const { gameToken, owner, otherAccount } = await loadFixture(initGameToken);
    const amount = await gameToken.balanceOf(owner.address);
    expect(amount).to.equal(9999999999);
  });


  it("owner shoule ", async function () {
    const { gameToken, owner, otherAccount } = await loadFixture(initGameToken);
    const realOwner = await gameToken.owner();
    expect(realOwner).to.equal(owner.address);
  });
});
