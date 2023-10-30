// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract gasTest {
    uint256 public constant amount = 1 ether;
    uint256 public constant amount2 = 5 ether;

    function testEq() external pure returns (bool) {
        return amount == 1000000000000000000 wei;
    }

    function testEq2() external pure returns (bool) {
        return amount == 1000000000000000000;
    }

    function testEq3() external pure returns (bool) {
        return amount2 == 1000000000000000000;
    }
}
