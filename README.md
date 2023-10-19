# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

https://saszr.notion.site/hardhat-ts-fcef4e44cd4e4aad9d73607719fbbd12
官网：https://hardhat.org/hardhat-runner/docs/guides/test-contracts
```shell
npx hardhat help
npx hardhat test --parallel
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts


清理：npx hardhat clean
编译：npx hardhat compile
部署：npx hardhat run scripts/VaultDeploy.ts --network bscTestnet
开源： npx hardhat verify --network bscTestnet 0x5767334Cb2268F5Eea3F64e164229a0c48123328 SKS  SKS
测试：1.npx hardhat test test/ErrorTest.ts --grep ErrorTest 	   2.npx hardhat test --parallel
```
