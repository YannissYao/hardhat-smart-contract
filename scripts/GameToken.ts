import { ethers } from 'hardhat';

const main = async () => {
  const gameToken = await ethers.getContractFactory('GameToken');


  //部署后调用mint
//   const gameTokenAddress = await gameToken.deploy("SKS","SKS");
//   await gameTokenAddress.deployed();
//   console.log('Factory deployed to:', gameTokenAddress.address);


    //指定合约地址方式
    const gameTokenAddress = gameToken.attach("0x84871C022b1aDa21A37dF38b97ddD0A6006247C1");
    gameTokenAddress.mint("0x32645003Cb69DeA779c742dB07C152cEFbEaA1de", 9999999999);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
