"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const main = async () => {
    const gameToken = await hardhat_1.ethers.getContractFactory('GameToken');
    const factory = await gameToken.deploy("SKS", "SKS");
    await factory.deployed();
    console.log('Factory deployed to:', factory.address);
};
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
