import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {expect} from "chai";
import {ethers} from "hardhat";

describe("GameToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function initGameToken() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const GameToken = await ethers.getContractFactory("GameToken");
    const gameToken = await GameToken.deploy("SKS", "SKS");
    gameToken.mint(owner.address, 9999999999);
    return {gameToken, owner, otherAccount};
  }

  it("balanceOf shoule ", async function () {
    const {gameToken, owner, otherAccount} = await loadFixture(initGameToken);
    const amount = await gameToken.balanceOf(owner.address);
    expect(amount).to.equal(9999999999);
  });


  it("owner shoule ", async function () {
    const {gameToken, owner, otherAccount} = await loadFixture(initGameToken);
    const realOwner = await gameToken.owner( );
    expect(realOwner).to.equal(owner.address);
  });
});
