"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const DPRegister_json_1 = require("../artifacts/contracts/DPRegister.sol/DPRegister.json");
const encoder = (types, values) => {
    const abiCoder = hardhat_1.ethers.utils.defaultAbiCoder;
    const encodedParams = abiCoder.encode(types, values);
    return encodedParams.slice(2);
};
const create2Address = (factoryAddress, saltHex, initCode) => {
    const create2Addr = hardhat_1.ethers.utils.getCreate2Address(factoryAddress, saltHex, hardhat_1.ethers.utils.keccak256(initCode));
    return create2Addr;
};
const main = async () => {
    // 工厂合约的地址
    const factoryAddr = '0xD6A4da6B866139B17538C2d9246dfDFDd1824b1a';
    // 盐
    const saltHex = hardhat_1.ethers.utils.id('nnn');
    hardhat_1.ethers.getContractAt;
    //dpRegister 0xcfD28499FC7E1C32503082C6c16fe267c0A5E907
    //erc20 0x018B5633FC0A28fACb5F41AE2C185cFf87c182e1
    const initCode = DPRegister_json_1.bytecode + encoder(['address'], ['0x018B5633FC0A28fACb5F41AE2C185cFf87c182e1']);
    const create2Addr = create2Address(factoryAddr, saltHex, initCode);
    console.log('precomputed address:', create2Addr);
    const Factory = await hardhat_1.ethers.getContractFactory('Factory');
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
