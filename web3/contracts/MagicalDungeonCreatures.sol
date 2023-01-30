// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MagicalDungeonCreatures is ERC1155 {
  string public baseURI;
  /// @dev Initializes the contract by setting a `metadataURI` to the token collection
  /// @param _metadataURI baseURI where token metadata is stored
  constructor(string memory _metadataURI) ERC1155(_metadataURI) {
    baseURI = _metadataURI;
  }
}