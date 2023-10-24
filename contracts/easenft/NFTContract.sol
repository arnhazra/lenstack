// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTContract is ERC721, Ownable {
    IERC20 public tokenContract;
    uint256 public currentTokenId;

    constructor() ERC721("EaseNFT", "ENFT") {
        currentTokenId = 0;
    }

    function mintNFT() public {
        _safeMint(msg.sender, currentTokenId);
        currentTokenId++;
    }
}
