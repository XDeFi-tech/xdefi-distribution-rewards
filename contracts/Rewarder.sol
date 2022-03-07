//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}

/**
Rewarder contractor will receive some $XDEFI tokens (out of fees for instance)

Admins can set `admins`, `senders` and `authorizedDestinations`

Senders are allowed to send tokens to `authorizedDestinations`
    -- in practice they will be oracle that would periodically (automatically) send tokens to the Staking contract
        and then call `updateDistribution()`

Authorized Destinations are target for the tokens
 */
contract Rewarder {
    mapping(address => bool) public admins;
    mapping(address => bool) public authorizedDestinations;
    mapping(address => bool) public senders;

    constructor() {
        console.log("Deploying a Rewarder");
        admins[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender]);
        _;
    }

    modifier onlySenders() {
        require(senders[msg.sender]);
        _;
    }

    function setAdmins(address[] memory adminAddresses, bool[] memory flags)
        public
        onlyAdmin
    {
        require(adminAddresses.length == flags.length);
        for (uint256 i = 0; i < adminAddresses.length; i++) {
            admins[adminAddresses[i]] = flags[i];
        }
    }

    function setSenders(address[] memory senderAddresses, bool[] memory flags)
        public
        onlyAdmin
    {
        require(senderAddresses.length == flags.length);
        for (uint256 i = 0; i < senderAddresses.length; i++) {
            senders[senderAddresses[i]] = flags[i];
        }
    }

    function setAuthorizedDestinations(
        address[] memory destinations,
        bool[] memory flags
    ) public onlyAdmin {
        require(destinations.length == flags.length);
        for (uint256 i = 0; i < destinations.length; i++) {
            authorizedDestinations[destinations[i]] = flags[i];
        }
    }

    function transferToken(
        address ercTokenAddress,
        uint256 amount,
        address destination
    ) public onlySenders {
        require(authorizedDestinations[destination]);
        require(IERC20(ercTokenAddress).transfer(destination, amount));
    }
}
