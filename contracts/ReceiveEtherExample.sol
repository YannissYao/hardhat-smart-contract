// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ReceiveEtherExample is Ownable {

  uint public balance;

  constructor() {
  }

  receive() external payable {
    // 当以太币被发送到合约地址时，这个函数将被自动触发
    // 将接收到的以太币添加到合约余额
    balance += msg.value;
  }


  // 查看合约的当前余额
  function getBalance() public view returns (uint) {
    return address(this).balance;
  }

  // 提取合约余额到指定地址（只有合约所有者可以执行）
  function withdrawBalance(address payable recipient) public onlyOwner{
    require(balance > 0, "No balance to withdraw");

    recipient.transfer(balance);
    // 将余额发送到指定地址
    balance = 0;
    // 重置余额
  }
}
