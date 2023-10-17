import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {expect} from "chai";
import {ethers} from "hardhat";

describe("ErrorTest", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function init() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ErrorTest = await ethers.getContractFactory("ErrorTest");

    //部署后拿到地址方式
    //加了个参数，owner地址，用工厂来部署，这个默认是工厂的地址
    const errorTest = await ErrorTest.deploy();

    //指定合约地址方式
//     const gameToken = GameToken.attach("0xf5b1A0F2baCF0F5F436a13713022298002C96523");
    return {errorTest, owner, otherAccount};
  }

// 加上only只会测试这个，没有only的不会被测试
  it.only("ErrorTest shoule ", async function () {
    const {errorTest, owner, otherAccount} = await loadFixture(init);
    const result = await errorTest.testThrowErr();
    console.log("Result:", result);
    //满足期望才会测试成功，后面可以加equal等方法
    expect(result);
  });

  it("ErrorTest2 shoule ", async function () {
      const {errorTest, owner, otherAccount} = await loadFixture(init);
      const result = await errorTest.testThrowErr();
      console.log("Result2:", result);
      expect(result);
    });
});
