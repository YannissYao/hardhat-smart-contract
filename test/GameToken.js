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
        const gameToken = await GameToken.deploy("SKS", "SKS");
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
