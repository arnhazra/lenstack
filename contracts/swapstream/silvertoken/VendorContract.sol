// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./TokenContract.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VendorContract is Ownable {
    SilverTokenContract tokenContract;
    uint256 public tokensPerMatic = 50000;
    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);

    constructor(address tokenAddress) {
        tokenContract = SilverTokenContract(tokenAddress);
    }

    function buyTokens() public payable returns (uint256 tokenAmount) {
        require(msg.value > 0, "You need to send some ETH to proceed");
        uint256 amountToBuy = msg.value * tokensPerMatic;

        uint256 vendorBalance = tokenContract.balanceOf(address(this));
        require(vendorBalance >= amountToBuy, "Vendor has insufficient tokens");

        bool sent = tokenContract.transfer(msg.sender, amountToBuy);
        require(sent, "Failed to transfer token to user");

        emit BuyTokens(msg.sender, msg.value, amountToBuy);
        return amountToBuy;
    }

    function sellTokens(uint256 tokenAmountToSell) public {
        require(
            tokenAmountToSell > 0,
            "Specify an amount of token greater than zero"
        );

        uint256 userBalance = tokenContract.balanceOf(msg.sender);
        require(
            userBalance >= tokenAmountToSell,
            "You have insufficient tokens"
        );

        uint256 amountOfETHToTransfer = tokenAmountToSell / tokensPerMatic;
        uint256 ownerETHBalance = address(this).balance;
        require(
            ownerETHBalance >= amountOfETHToTransfer,
            "Vendor has insufficient funds"
        );
        bool sent = tokenContract.transferFrom(
            msg.sender,
            address(this),
            tokenAmountToSell
        );
        require(sent, "Failed to transfer tokens from user to vendor");

        (sent, ) = msg.sender.call{value: amountOfETHToTransfer}("");
        require(sent, "Failed to send ETH to the user");
    }
}
