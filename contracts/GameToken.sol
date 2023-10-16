// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "./Ownable.sol";

contract GameToken is ERC20Burnable, Ownable {


  constructor(string memory name_, string memory symbol_, address  ownerAddress) ERC20(name_, symbol_) Ownable(ownerAddress)  {
  }

  function mint(address account, uint256 amount) external onlyOwner {
    _mint(account, amount);
  }
}
