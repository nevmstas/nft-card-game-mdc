// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.16;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MagicalDungeonCreatures is ERC1155 {
  string public baseURI;
  uint256 public totalSupply; // Total number of tokens minted

  uint256 public constant MAX_ATTACK_DEFEND_STRENGTH = 10;

  enum BattleStatus{ PENDING, STARTED, ENDED }

  /// @dev Player struct to store player info
  struct Player {
    address playerAddress; /// @param playerAddress player wallet address
    string playerName; /// @param playerName player name; set by player during registration
    uint256 playerMana; /// @param playerMana player mana; affected by battle results
    uint256 playerHealth; /// @param playerHealth player health; affected by battle results
    bool inBattle; /// @param inBattle boolean to indicate if a player is in battle
  }

  /// @dev GameToken struct to store player token info
  struct GameToken {
    string name; /// @param name battle card name; set by player
    uint256 id; /// @param id battle card token id; will be randomly generated
    uint256 attackStrength; /// @param attackStrength battle card attack; generated randomly
    uint256 defenseStrength; /// @param defenseStrength battle card defense; generated randomly
  }

  /// @dev Battle struct to store battle info
  struct Battle {
    BattleStatus battleStatus; /// @param battleStatus enum to indicate battle status
    bytes32 battleHash; /// @param battleHash a hash of the battle name
    string name; /// @param name battle name; set by player who creates battle
    address[2] players; /// @param players address array representing players in this battle
    uint8[2] moves; /// @param moves uint array representing players' move
    address winner; /// @param winner winner address
  }

  Player[] public players; // Array of players
  GameToken[] public gameTokens; // Array of game tokens
  Battle[] public battles; // Array of battles

  mapping(address => uint256) public playerInfo;
  mapping(address => uint256) public playerTokenInfo; // Mapping of player addresses to player token index in the gameTokens array
  mapping(string => uint256) public battleInfo; // Mapping of battle name to battle index in the battles array

  event NewPlayer(address indexed owner, string name);
  event NewBattle(string battleName, address indexed player1, address indexed player2);
  event NewGameToken(address indexed owner, uint256 id, uint256 attackStrength, uint256 defenseStrength);

  /// @dev Initializes the contract by setting a `metadataURI` to the token collection
  /// @param _metadataURI baseURI where token metadata is stored
  constructor(string memory _metadataURI) ERC1155(_metadataURI) {
    baseURI = _metadataURI;
    initialize();
  }

  function initialize() private {
    gameTokens.push(GameToken("", 0, 0, 0));
    players.push(Player(address(0), "", 0, 0, false));
    battles.push(Battle(BattleStatus.PENDING, bytes32(0), "", [address(0), address(0)], [0, 0], address(0)));
  }


  function isPlayer(address addr) public view returns (bool) {
    console.log("isPlayer func", addr, playerInfo[addr] == 0);
    if(playerInfo[addr] == 0) {
      return false;
    } else {
      return true;
    }
  }

  // Battle getter function
  function isBattle(string memory _name) public view returns (bool) {
    if(battleInfo[_name] == 0) {
      return false;
    } else {
      return true;
    }
  }

  function getBattle(string memory _name) public view returns (Battle memory) {
    require(isBattle(_name), "Battle doesn't exist!");
    return battles[battleInfo[_name]];
  }
  
  function updateBattle(string memory _name, Battle memory _newBattle) private {
    require(isBattle(_name), "Battle doesn't exist");
    battles[battleInfo[_name]] = _newBattle;
  }

  function getPlayer(address addr) public view returns (Player memory) {
    require(isPlayer(addr), "Player doesn't exist!");
    return players[playerInfo[addr]];
  }

  function getAllPlayers() public view returns (Player[] memory) {
    return players;
  }

  function getAllBattles() public view returns (Battle[] memory) {
    return battles;
  }
  
  function isPlayerToken(address addr) public view returns (bool) {
    if(playerTokenInfo[addr] == 0) {
      return false;
    } else {
      return true;
    }
  }

  /// @dev Registers a player
  /// @param _name player name; set by player
  function registerPlayer(string memory _name, string memory _gameTokenName) external {
    require(!isPlayer(msg.sender), "Player already registered"); // Require that player is not already registered
    
    uint256 _id = players.length;
    players.push(Player(msg.sender, _name, 10, 25, false)); // Adds player to players array
    playerInfo[msg.sender] = _id; // Creates player info mapping
    
    createRandomGameToken(_gameTokenName);
    
    emit NewPlayer(msg.sender, _name); // Emits NewPlayer event
  }

  /// @dev internal function to generate random number; used for Battle Card Attack and Defense Strength
  function _createRandomNum(uint256 _max, address _sender) internal view returns (uint256 randomValue) {
    uint256 randomNum = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, _sender)));

    randomValue = randomNum % _max;
    if(randomValue == 0) {
      randomValue = _max / 2;
    }

    return randomValue;
  }

  /// @dev internal function to create a new Battle Card
  function _createGameToken(string memory _name) internal returns (GameToken memory) {
    uint256 randAttackStrength = _createRandomNum(MAX_ATTACK_DEFEND_STRENGTH, msg.sender);
    uint256 randDefenseStrength = MAX_ATTACK_DEFEND_STRENGTH - randAttackStrength;
    
    uint8 randId = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 100);
    randId = randId % 6;
    if (randId == 0) {
      randId++;
    }
    
    GameToken memory newGameToken = GameToken(
      _name,
      randId,
      randAttackStrength,
      randDefenseStrength
    );

    uint256 _id = gameTokens.length;
    gameTokens.push(newGameToken);
    playerTokenInfo[msg.sender] = _id;

    _mint(msg.sender, randId, 1, '0x0');
    totalSupply++;
    
    emit NewGameToken(msg.sender, randId, randAttackStrength, randDefenseStrength);
    return newGameToken;
  }

  /// @dev Creates a new game token
  /// @param _name game token name; set by player
  function createRandomGameToken(string memory _name) public {
    require(!getPlayer(msg.sender).inBattle, "Player is in a battle"); // Require that player is not already in a battle
    require(isPlayer(msg.sender), "Please Register Player First"); // Require that the player is registered
    
    _createGameToken(_name); // Creates game token
  }

   /// @dev Creates a new battle
  /// @param _name battle name; set by player
  function createBattle(string memory _name) external returns (Battle memory) {
    require(isPlayer(msg.sender), "Please Register Player First"); // Require that the player is registered
    require(!isBattle(_name), "Battle already exists!"); // Require battle with same name should not exist

    bytes32 battleHash = keccak256(abi.encode(_name));
    
    Battle memory _battle = Battle(
      BattleStatus.PENDING, // Battle pending
      battleHash, // Battle hash
      _name, // Battle name
      [msg.sender, address(0)], // player addresses; player 2 empty until they joins battle
      [0, 0], // moves for each player
      address(0) // winner address; empty until battle ends
    );

    uint256 _id = battles.length;
    battleInfo[_name] = _id;
    battles.push(_battle);
    
    return _battle;
  }

  /// @dev Player joins battle
  /// @param _name battle name; name of battle player wants to join
  function joinBattle(string memory _name) external returns (Battle memory) {
    Battle memory _battle = getBattle(_name);

    require(_battle.battleStatus == BattleStatus.PENDING, "Battle already started!"); // Require that battle has not started
    require(_battle.players[0] != msg.sender, "Only player two can join a battle"); // Require that player 2 is joining the battle
    require(!getPlayer(msg.sender).inBattle, "Already in battle"); // Require that player is not already in a battle
    
    _battle.battleStatus = BattleStatus.STARTED;
    _battle.players[1] = msg.sender;
    updateBattle(_name, _battle);

    players[playerInfo[_battle.players[0]]].inBattle = true;
    players[playerInfo[_battle.players[1]]].inBattle = true;

    emit NewBattle(_battle.name, _battle.players[0], msg.sender); // Emits NewBattle event
    return _battle;
  }
}