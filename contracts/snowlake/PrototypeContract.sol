// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract PrototypeContract {
    event CreatePrototype(address owner, uint256 id);
    event ArchivePrototype(uint256 id, bool isArchived);

    struct Prototype {
        uint256 id;
        string name;
        string description;
        string link;
        address owner;
        uint256 createdAt;
        string apiKey;
        bool isArchived;
    }

    Prototype[] public prototypes;
    mapping(uint256 => address) prototypesByOwner;

    function createPrototype(string memory _name, string memory _description, string memory _link, string memory _apiKey, bool _isArchived) public {
        uint256 newPrototypeId = prototypes.length;
        uint256 currentTime = block.timestamp;
        prototypes.push(Prototype(newPrototypeId, _name, _description, _link, msg.sender, currentTime, _apiKey, _isArchived));
        prototypesByOwner[newPrototypeId] = msg.sender;
        emit CreatePrototype(msg.sender, newPrototypeId);
    }

    function getPrototypeCountByAPIKey(string memory _apiKey) public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < prototypes.length; i++) {
            if (keccak256(bytes(prototypes[i].apiKey)) == keccak256(bytes(_apiKey))) {
                count++;
            }
        }
        return count;
    }

    function getPrototypesByOwner() public view returns (Prototype[] memory) {
        Prototype[] memory temporary = new Prototype[](prototypes.length);
        uint256 counter = 0;
        for(uint256 i=0; i<prototypes.length; i++) {
            if(prototypesByOwner[i] == msg.sender && prototypes[i].isArchived == false) {
                temporary[counter] = prototypes[i];
                counter++;
            }
        }

        Prototype[] memory result = new Prototype[](counter);
        for(uint256 i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function archivePrototype(uint256 _id) external {
        if(prototypesByOwner[_id] == msg.sender) {
            prototypes[_id].isArchived = true;
            emit ArchivePrototype(_id, true);
        }
    }
}
