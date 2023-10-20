import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {expect} from "chai";
import {ethers} from "hardhat";

describe("DpRegister", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function init() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    //先部署erc20
    const GameToken = await ethers.getContractFactory("GameToken");
    const gameToken = await GameToken.deploy("SKS", "SKS");
    gameToken.mint(owner.address, 9999999999);
    //再部署dp
    const DpRegister = await ethers.getContractFactory("DPRegister");

    //部署后拿到地址方式
    //加了个参数，owner地址，用工厂来部署，这个默认是工厂的地址
    const contract = await DpRegister.deploy(gameToken.address);

    //给其他合约授权金额
    const allowance= await gameToken.approve(contract.address,5000);
    const txReceipt = await allowance.wait();
    console.log('授权结果:', txReceipt.status);
    return {contract, owner, otherAccount};
  }

// 加上only只会测试这个，没有only的不会被测试
  it.only("stake", async function () {
    const {contract, owner, otherAccount} = await loadFixture(init);
    const result = await contract.stake(5000);
    console.log("Result:", result);
    //满足期望才会测试成功，后面可以加equal等方法
    expect(result);
  });

});
