// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ReceiveEtherExample is Ownable {

  uint256 public balance;

  constructor() {
  }

  receive() external payable {
    // 当以太币被发送到合约地址时，这个函数将被自动触发
    // 将接收到的以太币添加到合约余额
    balance += msg.value;
  }

  // 查看合约的当前余额
  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  // 函数用于扣除调用者的以太币，并将其存储在合约中
  //不同于receive的是在func中处理扣除操作。也可以作为参数传入
  function deposit() public payable {
    // 扣除调用者的以太币，并将它存储在合约中
    balance += msg.value;
  }

 //也可以作为参数传入
  function depositByParam(uint256 amount) public payable {
    // 扣除调用者的以太币，并将它存储在合约中
    balance += amount;
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
