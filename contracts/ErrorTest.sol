// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract ErrorTest {

  error Unauthorized(address unauthorizedUser);

  function testThrowErr() public view returns (string memory) {
    //    bool r = true;
    //    if (r) revert Unauthorized(msg.sender);
    revert Unauthorized(msg.sender);
    return "success";
  }
}
