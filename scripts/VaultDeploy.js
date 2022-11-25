"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const GameToken_json_1 = require("../artifacts/contracts/GameToken.sol/GameToken.json");
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
    const factoryAddr = '0xeB63d196bb2c15f4e06927AA2ebe243Df5dD6724';
    // 盐
    const saltHex = hardhat_1.ethers.utils.id('ttt');
    // const initCode = bytecode ;
    const initCode = GameToken_json_1.bytecode + encoder(['string', 'string'], ['SKS', 'SKS']);
    const create2Addr = create2Address(factoryAddr, saltHex, initCode);
    console.log('precomputed address:', create2Addr);
    const Factory = await hardhat_1.ethers.getContractFactory('DeterministicDeployFactory');
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
