"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
const dotenv_1 = __importDefault(require("dotenv"));
const ethers_1 = require("ethers");
require("hardhat-abi-exporter");
// 使用 .env 文件
dotenv_1.default.config();
// account 指令方法相关配置
const NETWORKS = {
    goerli: process.env.API_URL_GOERLI,
    bscTestnet: process.env.API_URL_BSCT,
    spiketest: process.env.API_URL_SPIKET,
};
// hh account 调用的方法，这里直接写在配置文件，可以从外部引入
const getAccountNonceInfo = async (address) => {
    const getRpcProvider = (rpcUrl) => {
        return new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
    };
    const networkIDArr = [];
    const providerArr = [];
    const resultArr = [];
    Object.keys(NETWORKS).forEach((network) => {
        const rpcUrl = NETWORKS[network];
        if (rpcUrl) {
            const provider = getRpcProvider(rpcUrl);
            networkIDArr.push(network);
            providerArr.push(provider);
        }
    });
    for (let i = 0; i < providerArr.length; i++) {
        const nonce = await providerArr[i].getTransactionCount(address, 'latest');
        const balance = await providerArr[i].getBalance(address);
        resultArr.push([networkIDArr[i], nonce, ethers_1.ethers.utils.formatEther(balance)]);
    }
    resultArr.unshift(['  |NETWORK|   |NONCE|   |BALANCE|  ']);
    console.log(resultArr);
};
// 添加 hardhat 指令，此指令主要查看下地址在目标网络的 nonce 和 balance
// 终端输入 hh 可以查看到 account 已经加入 hardhat 命令列表
(0, config_1.task)('account', 'returns nonce and balance for specified address on multiple networks')
    .addParam('address')
    .setAction(async ({ address }) => {
    await getAccountNonceInfo(address);
});
// hardhad 工程总配置
// etherscan / networks 为 @nomicfoundation/hardhat-toolbox 综合包内插件 hardhat-etherscan 相关配置，用于 evm 链进行部署和合约验证
// abiExporter 为插件 hardhat-abi-exporter 的配置
const config = {
    solidity: '0.8.17',
    etherscan: {
        apiKey: {
            goerli: process.env.ETHERSCAN_API_KEY,
            bscTestnet: process.env.BSCSCAN_API_KEY,
        },
    },
    networks: {
        goerli: {
            url: process.env.API_URL_GOERLI,
            accounts: [`0x${process.env.PRIVATE_KEY}`],
        },
        mainnet: {
            url: process.env.API_URL_ETHMAIN,
            accounts: [`0x${process.env.PRIVATE_KEY}`],
        },
        bscTestnet: {
            url: process.env.API_URL_BSCT,
            accounts: [`0x${process.env.PRIVATE_KEY}`],
        },
        bsc: {
            url: process.env.API_URL_BSCMain,
            accounts: [`0x${process.env.PRIVATE_KEY}`],
        },
        spiketest: {
            url: process.env.API_URL_SPIKET,
            accounts: [`0x${process.env.PRIVATE_KEY}`],
        },
    },
    abiExporter: {
        path: './abi',
        clear: true,
        format: 'json',
    },
};
exports.default = config;
