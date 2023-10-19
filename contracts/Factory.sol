// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract Factory {

  address public owner;

  event Deploy(address addr);


  constructor() {
    owner = msg.sender;
    // 工厂合约的创建者成为初始 owner
  }

  function deploy(bytes memory bytecode, uint256 _salt, address contractToDeploy) external {
    address addr;
    assembly {
      addr := create2(0, add(bytecode, 0x20), mload(bytecode), _salt)
      if iszero(extcodesize(addr)) {
        revert(0, 0)
      }
    }
    // 根据传入的合同地址实例化合同,如果合约继承的是Ownable，如果继承的是Ownable2Step则调用_transferOwnership
    Ownable newContract = Ownable(contractToDeploy);
    // 设置新合同的 owner 为工厂合约的 owner
    newContract.transferOwnership(owner);
    emit Deploy(addr);
  }

  function changeOwner(address newOwner) public {
    require(msg.sender == owner, "Only the owner can change the owner");
    owner = newOwner;
  }
}
