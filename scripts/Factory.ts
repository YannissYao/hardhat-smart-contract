import { ethers } from 'hardhat';

const main = async () => {
  const Factory = await ethers.getContractFactory('Factory');
  const factory = await Factory.deploy();
  await factory.deployed();
  console.log('Factory deployed to:', factory.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


