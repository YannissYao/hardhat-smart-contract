import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import dotenv from 'dotenv';
import { ethers, providers } from 'ethers';
import 'hardhat-abi-exporter';

// 使用 .env 文件
dotenv.config();

// account 指令方法相关配置
const NETWORKS: Record<string, string | undefined> = {
  goerli: process.env.API_URL_GOERLI,
  bscTestnet: process.env.API_URL_BSCT,
  spiketest: process.env.API_URL_SPIKET,
};

// hh account 调用的方法，这里直接写在配置文件，可以从外部引入
const getAccountNonceInfo = async (address: string) => {
  const getRpcProvider = (rpcUrl: string) => {
    return new ethers.providers.JsonRpcProvider(rpcUrl);
  };

  const networkIDArr: string[] = [];
  const providerArr: providers.JsonRpcProvider[] = [];
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
    resultArr.push([networkIDArr[i], nonce, ethers.utils.formatEther(balance)]);
  }
  resultArr.unshift(['  |NETWORK|   |NONCE|   |BALANCE|  ']);
  console.log(resultArr);
};

// 添加 hardhat 指令，此指令主要查看下地址在目标网络的 nonce 和 balance
// 终端输入 hh 可以查看到 account 已经加入 hardhat 命令列表
task('account', 'returns nonce and balance for specified address on multiple networks')
  .addParam('address')
  .setAction(async ({ address }: { address: string }) => {
    await getAccountNonceInfo(address);
  });

// hardhad 工程总配置
// etherscan / networks 为 @nomicfoundation/hardhat-toolbox 综合包内插件 hardhat-etherscan 相关配置，用于 evm 链进行部署和合约验证
// abiExporter 为插件 hardhat-abi-exporter 的配置
const config: HardhatUserConfig = {
  solidity: '0.8.17',
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY!,
      bscTestnet: process.env.BSCSCAN_API_KEY!,
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

export default config;
