// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EquipmentLog {

    // Each equipment entry
    struct Equipment {
        string name;
        string description;
        uint256 timestamp;
    }

    // Array that stores all equipment logs
    Equipment[] public logs;

    // Add a new equipment entry
    function addEquipment(string memory _name, string memory _description) public {
        Equipment memory newEntry = Equipment({
            name: _name,
            description: _description,
            timestamp: block.timestamp
        });

        logs.push(newEntry);
    }

    // Returns how many logs we have
    function getTotalLogs() public view returns (uint256) {
        return logs.length;
    }

    // Returns one log by index (index starts from 0)
    function getLog(uint256 index) public view returns (Equipment memory) {
        require(index < logs.length, "Index out of range");
        return logs[index];
    }
}
