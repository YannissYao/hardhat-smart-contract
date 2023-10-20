import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {expect} from "chai";
import {ethers} from "hardhat";

describe("ReceiveEtherExample", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function init() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();


    const ReceiveEtherExample = await ethers.getContractFactory("ReceiveEtherExample");
    const contract = await ReceiveEtherExample.deploy();


//     //给其他合约授权金额
//     const allowance= await gameToken.approve(contract.address,5000);
//     const txReceipt = await allowance.wait();
//     console.log('授权结果:', txReceipt.status);
    return {contract, owner, otherAccount};
  }

// 加上only只会测试这个，没有only的不会被测试
  it.only("test", async function () {
    const {contract, owner, otherAccount} = await loadFixture(init);
    const ownerBalance = await ethers.provider.getBalance(owner.address);
    console.log("初始owner账户余额:", ethers.utils.formatUnits(ownerBalance, "ether"));
    const result = await contract.getBalance();
    console.log("初始合约余额:", ethers.utils.formatUnits(result, "ether"));
    //owner向合约转账
     const etherToSend = ethers.utils.parseEther("1"); // 1 ETH
      await owner.sendTransaction({
        to:    contract.address,
        value: etherToSend,
      });
    //转账后合约账户余额
    const result2 = await contract.getBalance();
    console.log("转账后合约账户余额:", ethers.utils.formatUnits(result2, "ether"));

    const  ownerBalance2 = await ethers.provider.getBalance(owner.address);
    console.log("转账后owner账户余额:", ethers.utils.formatUnits(ownerBalance2, "ether"));
    //提款
    await contract.withdrawBalance(owner.address);

    const ownerBalance3 = await ethers.provider.getBalance(owner.address);
    console.log("提取后owner账户余额:", ethers.utils.formatUnits(ownerBalance3, "ether"));


   const result3 = await contract.getBalance();
    console.log("提取后合约账户余额:",  ethers.utils.formatUnits(result3, "ether"));
    expect(result);
  });

});
