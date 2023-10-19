import { ethers } from 'hardhat';
import {bytecode} from '../artifacts/contracts/GameToken.sol/GameToken.json';


const encoder = (types: string[], values: any[]) => {
  const abiCoder = ethers.utils.defaultAbiCoder;
  const encodedParams = abiCoder.encode(types, values);
  return encodedParams.slice(2);
};


const create2Address = (
  factoryAddress: string,
  saltHex: string,
  initCode: ethers.utils.BytesLike,
) => {
  const create2Addr = ethers.utils.getCreate2Address(
    factoryAddress,
    saltHex,
    ethers.utils.keccak256(initCode),
  );
  return create2Addr;
};

const main = async () => {
  // 工厂合约的地址
  const factoryAddr = '0x03bE1316B6b71d16d1c345478995E55469aF1c1C';
  // 盐
  const saltHex = ethers.utils.id('123qwe');
  // const initCode = bytecode ;
  const initCode = bytecode + encoder(['string','string'], ['SKS','SKS']);
  const create2Addr = create2Address(factoryAddr, saltHex, initCode);
  //0x189F891d56caa0609BF88207536D88F9bbcd8aB3
  console.log('precomputed address:', create2Addr);

  const Factory = await ethers.getContractFactory('Factory');
  const factoryContract = Factory.attach(factoryAddr);

  //以工厂合约的身份部署当前合约
  const deploy = await factoryContract.deploy(initCode, saltHex, create2Addr);
  const txReceipt = await deploy.wait();
  console.log('Deployed to:', txReceipt.events?.[0].args?.[0]);

};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
