"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const main = async () => {
    const Factory = await hardhat_1.ethers.getContractFactory('Factory');
    const factory = await Factory.deploy();
    await factory.deployed();
    console.log('Factory deployed to:', factory.address);
};
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
