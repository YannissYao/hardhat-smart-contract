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
  const factoryAddr = '0xeB63d196bb2c15f4e06927AA2ebe243Df5dD6724';
  // 盐
  const saltHex = ethers.utils.id('ttt');
  // const initCode = bytecode ;
  const initCode = bytecode + encoder(['string','string'], ['SKS','SKS']);
  const create2Addr = create2Address(factoryAddr, saltHex, initCode);
  console.log('precomputed address:', create2Addr);

  const Factory = await ethers.getContractFactory('DeterministicDeployFactory');
  const factory = Factory.attach(factoryAddr);

  const deploy = await factory.deploy(initCode, saltHex);
  const txReceipt = await deploy.wait();
  console.log('Deployed to:', txReceipt.events?.[0].args?.[0]);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
