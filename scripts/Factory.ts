import { ethers } from 'hardhat';

const main = async () => {
  const Factory = await ethers.getContractFactory('Factory');
  const factoryContract = await Factory.deploy();
  await factoryContract.deployed();
  console.log('Factory deployed to:', factoryContract.address);

   //修改工厂合约的owner
   const factoryContractAddress = Factory.attach(factoryContract.address);
   const changeOwnerTx = await factoryContractAddress.changeOwner("0x32645003Cb69DeA779c742dB07C152cEFbEaA1de");
   const receipt = await changeOwnerTx.wait();
    // 检查交易状态，成功的状态码为1
      if (receipt.status === 1) {
        console.log("Ownership change successful.");
      } else {
        console.error("Ownership change failed.");
      }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


