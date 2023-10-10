// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PlatinumTokenContract is ERC20 {
    constructor() ERC20("Platinum FT", "PT") {
        _mint(msg.sender, 3000000 * 10 ** decimals());
    }

    function mintCustomAmount(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}
