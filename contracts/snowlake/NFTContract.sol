// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTContract is ERC721, Ownable {
    event CreateNFT(address owner, uint256 id);
    event ArchiveNFT(uint256 id, bool isArchived);
    uint256 public currentTokenId;

    constructor() ERC721("SnowlakeNFT", "SNFT") {
        currentTokenId = 0;
    }

    struct NFT {
        uint256 id;
        string name;
        string description;
        string link;
        address owner;
        uint256 createdAt;
        string apiKey;
        bool isArchived;
    }

    NFT[] public nfts;
    mapping(uint256 => address) nftsByOwner;

    function createNFT(
        string memory _name,
        string memory _description,
        string memory _link,
        string memory _apiKey,
        bool _isArchived
    ) public {
        uint256 newNFTId = nfts.length;
        uint256 currentTime = block.timestamp;
        nfts.push(
            NFT(
                newNFTId,
                _name,
                _description,
                _link,
                msg.sender,
                currentTime,
                _apiKey,
                _isArchived
            )
        );
        nftsByOwner[newNFTId] = msg.sender;
        emit CreateNFT(msg.sender, newNFTId);
        _safeMint(msg.sender, currentTokenId);
        currentTokenId++;
    }

    function getNFTsByOwner() public view returns (NFT[] memory) {
        NFT[] memory temporary = new NFT[](nfts.length);
        uint256 counter = 0;
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nftsByOwner[i] == msg.sender && nfts[i].isArchived == false) {
                temporary[counter] = nfts[i];
                counter++;
            }
        }

        NFT[] memory result = new NFT[](counter);
        for (uint256 i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function archiveNFT(uint256 _id) external {
        if (nftsByOwner[_id] == msg.sender) {
            nfts[_id].isArchived = true;
            emit ArchiveNFT(_id, true);
        }
    }
}
