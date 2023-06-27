// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTContract is ERC721, Ownable {
    IERC20 public tokenContract;

    constructor(address _tokenAddress) ERC721("Platinum NFT", "PNFT") {
        tokenContract = IERC20(_tokenAddress);
    }

    function mintNFT(uint256 tokenId) public {
        _mint(address(this), tokenId);
    }

    function purchaseNFT(uint256 tokenId, uint256 nftPrice) public {
        address nftOwner = ownerOf(tokenId);
        require(
            nftOwner != msg.sender,
            "You are already the owner of this token"
        );
        tokenContract.transferFrom(msg.sender, nftOwner, nftPrice);
        _transfer(nftOwner, msg.sender, tokenId);
    }

    function sellNFT(uint256 tokenId) public {
        address nftOwner = ownerOf(tokenId);
        require(msg.sender == nftOwner, "Only owner can sell nft");
        _transfer(msg.sender, address(this), tokenId);
    }
}
