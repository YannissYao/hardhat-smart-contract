import { ethers } from 'hardhat';

const main = async () => {
  const gameToken = await ethers.getContractFactory('GameToken');
  const factory = await gameToken.deploy("SKS","SKS");
  await factory.deployed();
  console.log('Factory deployed to:', factory.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
