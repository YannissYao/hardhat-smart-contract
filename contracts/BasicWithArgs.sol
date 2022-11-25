// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract BasicWithArgs {
  string public value;
  uint256 public number;

  constructor(string memory _value, uint256 _number) {
    value = _value;
    number = _number;
  }

  function getInfo() public view returns (string memory, uint256) {
    return (value, number);
  }
}
