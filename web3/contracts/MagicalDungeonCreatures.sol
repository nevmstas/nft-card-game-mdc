// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MagicalDungeonCreatures is ERC1155 {
  string public baseURI;

  /// @dev Player struct to store player info
  struct Player {
    address playerAddress; /// @param playerAddress player wallet address
    string playerName; /// @param playerName player name; set by player during registration
    uint256 playerMana; /// @param playerMana player mana; affected by battle results
    uint256 playerHealth; /// @param playerHealth player health; affected by battle results
    bool inBattle; /// @param inBattle boolean to indicate if a player is in battle
  }

  Player[] public players; // Array of players

  mapping(address => uint256) public playerInfo;

  event NewPlayer(address indexed owner, string name);

  /// @dev Initializes the contract by setting a `metadataURI` to the token collection
  /// @param _metadataURI baseURI where token metadata is stored
  constructor(string memory _metadataURI) ERC1155(_metadataURI) {
    baseURI = _metadataURI;
  }

  function isPlayer(address addr) public view returns (bool) {
    if(playerInfo[addr] == 0) {
      return false;
    } else {
      return true;
    }
  }
  
  /// @dev Registers a player
  /// @param _name player name; set by player
  function registerPlayer(string memory _name) external {
    require(!isPlayer(msg.sender), "Player already registered"); // Require that player is not already registered
    
    uint256 _id = players.length;
    players.push(Player(msg.sender, _name, 10, 25, false)); // Adds player to players array
    playerInfo[msg.sender] = _id; // Creates player info mapping

    //TODO: Csreate game token
    
    emit NewPlayer(msg.sender, _name); // Emits NewPlayer event
  }
}