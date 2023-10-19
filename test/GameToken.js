"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_network_helpers_1 = require("@nomicfoundation/hardhat-network-helpers");
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
describe("GameToken", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function initGameToken() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await hardhat_1.ethers.getSigners();
        const GameToken = await hardhat_1.ethers.getContractFactory("GameToken");
        //部署后拿到地址方式
        //加了个参数，owner地址，用工厂来部署，这个默认是工厂的地址
        const gameToken = await GameToken.deploy("SKS", "SKS", "0x32645003Cb69DeA779c742dB07C152cEFbEaA1de");
        //指定合约地址方式
        //     const gameToken = GameToken.attach("0xf5b1A0F2baCF0F5F436a13713022298002C96523");
        gameToken.mint(owner.address, 9999999999);
        return { gameToken, owner, otherAccount };
    }
    it("balanceOf shoule ", async function () {
        const { gameToken, owner, otherAccount } = await (0, hardhat_network_helpers_1.loadFixture)(initGameToken);
        const amount = await gameToken.balanceOf(owner.address);
        (0, chai_1.expect)(amount).to.equal(9999999999);
    });
    it("owner shoule ", async function () {
        const { gameToken, owner, otherAccount } = await (0, hardhat_network_helpers_1.loadFixture)(initGameToken);
        const realOwner = await gameToken.owner();
        (0, chai_1.expect)(realOwner).to.equal(owner.address);
    });
});
