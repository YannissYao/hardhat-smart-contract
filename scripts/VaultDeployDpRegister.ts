import { ethers } from 'hardhat';
import {bytecode} from '../artifacts/contracts/DPRegister.sol/DPRegister.json';
import {IERC20} from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';


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
  const factoryAddr = '0x3C7715fBD12cf7C2B713b00a66d3e851A5E001CD';
  // 盐
  const saltHex = ethers.utils.id('nnn');
  ethers.getContractAt
  //dpRegister 0xcfD28499FC7E1C32503082C6c16fe267c0A5E907
  //erc20 0x018B5633FC0A28fACb5F41AE2C185cFf87c182e1
  const initCode = bytecode + encoder(['address'], ['0x018B5633FC0A28fACb5F41AE2C185cFf87c182e1']) ;

  const create2Addr = create2Address(factoryAddr, saltHex, initCode);
  console.log('precomputed address:', create2Addr);

  const Factory = await ethers.getContractFactory('Factory');
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
