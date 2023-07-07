// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract PrototypeContract {
    struct Prototype {
        uint256 id;
        string name;
        string description;
        string link;
        address owner;
        uint256 createdAt;
        string apiKey;
    }

    Prototype[] public prototypes;
    uint256 public prototypeCount;
    mapping(address => Prototype[]) public prototypesByOwner;

    event PrototypeCreated(uint256 id, string name, string description, string link, address owner, uint256 createdAt, string apiKey);

    function createPrototypeItem(string memory _name, string memory _description, string memory _link, string memory _apiKey) public {
        uint256 newPrototypeId = prototypeCount;
        uint256 currentTime = block.timestamp;
        Prototype memory newPrototype = Prototype(newPrototypeId, _name, _description, _link, msg.sender, currentTime, _apiKey);
        prototypes.push(newPrototype);
        prototypesByOwner[msg.sender].push(newPrototype);
        prototypeCount++;
        emit PrototypeCreated(newPrototypeId, _name, _description, _link, msg.sender, currentTime, _apiKey);
    }

    function getPrototypesByOwner(address _owner) public view returns (Prototype[] memory) {
        return prototypesByOwner[_owner];
    }

    function getPrototypeItem(uint256 _id) public view returns (uint256, string memory, string memory, string memory, address, uint256, string memory) {
        require(_id < prototypeCount, "Invalid prototype item ID");
        Prototype memory prototype = prototypes[_id];
        return (prototype.id, prototype.name, prototype.description, prototype.link, prototype.owner, prototype.createdAt, prototype.apiKey);
    }

    function getTotalPrototypeCount() public view returns (uint256) {
        return prototypeCount;
    }

    function getPrototypeCountByAPIKey(string memory _apiKey) public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < prototypeCount; i++) {
            if (keccak256(bytes(prototypes[i].apiKey)) == keccak256(bytes(_apiKey))) {
                count++;
            }
        }
        return count;
    }
}
