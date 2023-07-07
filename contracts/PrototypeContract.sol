// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract PrototypeContract {
    struct Prototype {
        uint256 id;
        string name;
        string description;
        string link;
        address owner;
    }

    Prototype[] public prototypes;
    uint256 public prototypeCount;
    mapping(address => Prototype[]) public prototypesByOwner;

    event PrototypeCreated(uint256 id, string name, string description, string link, address owner);

    function createPrototypeItem(string memory _name, string memory _description, string memory _link) public {
        uint256 newPrototypeId = prototypeCount;
        Prototype memory newPrototype = Prototype(newPrototypeId, _name, _description, _link, msg.sender);
        prototypes.push(Prototype(newPrototypeId, _name, _description, _link, msg.sender));
        prototypesByOwner[msg.sender].push(newPrototype);
        prototypeCount++;
        emit PrototypeCreated(newPrototypeId, _name, _description, _link, msg.sender);
    }

    function getPrototypesByOwner(address _owner) public view returns (Prototype[] memory) {
        return prototypesByOwner[_owner];
    }

    function getPrototypeItem(uint256 _id) public view returns (uint256, string memory, string memory, string memory, address) {
        require(_id < prototypeCount, "Invalid prototype item ID");
        Prototype memory prototype = prototypes[_id];
        return (prototype.id, prototype.name, prototype.description, prototype.link, prototype.owner);
    }

    function getTotalPrototypeCount() public view returns (uint256) {
        return prototypeCount;
    }
}
