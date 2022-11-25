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
部署：npx hardhat  run scripts/VaultDeploy.ts --network bsctest
开源：npx hardhat verify --network bscTestnet 0x180A78b0Cc6cca50ffc738d91328cd94a5810aeF SKS  SKS
测试：1.npx hardhat test --grep owner 	   2.npx hardhat test --parallel
```
