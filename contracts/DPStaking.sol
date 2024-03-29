// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";

//import "@openzeppelin/contracts/utils/Context.sol";
//import "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol";
//import "@openzeppelin/contracts/utils/Address.sol";

contract DPStaking is Ownable {
  using SafeERC20 for IERC20;
  IERC20 public stakingToken;

  error IllegalArgument();
  error Unauthorized(address unauthorizedUser);
  error StakingTokenAlreadySet();
  error NoEnoughStakeToLock();

  struct StakeInfo {
    uint128 totalStake;
    uint128 lockedStake;
  }

  event Stake(address staker, uint256 amount);
  event Unstake(address staker, uint256 stakeAmount);
  event LockStake(address staker, uint256 dpId, uint256 lockAmount);
  event UnlockStake(address staker, uint256 dpId, uint256 lockAmount);

  mapping(address => StakeInfo) public userStake;

  constructor(address stakingToken_) {
    stakingToken = IERC20(stakingToken_);
  }

  function stake(uint256 amount) external {
    if (amount == 0) revert IllegalArgument();
    address staker = msg.sender;
    uint256 balanceBefore = stakingToken.balanceOf(address(this));
    stakingToken.safeTransferFrom(staker, address(this), amount);
    uint256 balanceAfter = stakingToken.balanceOf(address(this));
    uint256 stakeAmount = balanceAfter - balanceBefore;

    userStake[staker].totalStake += SafeCast.toUint128(stakeAmount);

    emit Stake(staker, stakeAmount);
  }

  function unstake(uint256 amount) external {
    if (amount == 0) revert IllegalArgument();
    address staker = msg.sender;
    uint256 freeStakeAmount = userStake[staker].totalStake - userStake[staker].lockedStake;
    if (freeStakeAmount < amount) revert IllegalArgument();
    stakingToken.safeTransfer(staker, amount);

    emit Unstake(staker, freeStakeAmount);
  }

  function lockStake(uint256 dpId, uint256 amount) internal {
    address staker = msg.sender;
    uint256 freeStakeAmount = userStake[staker].totalStake - userStake[staker].lockedStake;
    if (freeStakeAmount < amount) revert NoEnoughStakeToLock();

    userStake[staker].lockedStake += SafeCast.toUint128(amount);

    emit LockStake(staker, dpId, amount);
  }

  function unlockStake(uint256 dpId, uint256 amount) internal {
    address staker = msg.sender;
    userStake[staker].lockedStake -= SafeCast.toUint128(amount);

    emit UnlockStake(staker, dpId, amount);
  }

  function setStakingToken(address newStakingToken) onlyOwner external {
    if (address(stakingToken) != address(0x0)) revert StakingTokenAlreadySet();
    stakingToken = IERC20(newStakingToken);
  }
}
