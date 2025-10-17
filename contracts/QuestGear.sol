// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title QuestGear
 * @dev ERC-721 NFT contract for unique equipment items (weapons, armor, shields, helmets)
 * Each item has rarity, stats, and can be equipped by players
 */
contract QuestGear is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    enum Rarity { COMMON, UNCOMMON, RARE, EPIC, LEGENDARY }
    enum GearType { WEAPON, ARMOR, HELMET, SHIELD }

    struct GearStats {
        GearType gearType;
        Rarity rarity;
        uint16 attack;
        uint16 defense;
        uint16 bonus; // Can be HP, crit, luck, etc.
        string bonusType; // "hp", "crit", "luck"
        uint256 mintedAt;
    }

    // Mapping from token ID to gear stats
    mapping(uint256 => GearStats) public gearStats;
    
    // Mapping from player address to equipped items
    mapping(address => mapping(GearType => uint256)) public equippedGear;

    // Events
    event GearMinted(address indexed to, uint256 indexed tokenId, GearType gearType, Rarity rarity);
    event GearEquipped(address indexed player, uint256 indexed tokenId, GearType gearType);
    event GearUnequipped(address indexed player, uint256 indexed tokenId, GearType gearType);

    constructor() ERC721("CastQuest Gear", "QUEST") Ownable(msg.sender) {}

    /**
     * @dev Mint a new gear item
     * @param to Address to mint the gear to
     * @param gearType Type of gear (weapon, armor, etc.)
     * @param rarity Rarity level
     * @param attack Attack stat
     * @param defense Defense stat
     * @param bonus Bonus stat value
     * @param bonusType Type of bonus stat
     * @param tokenURI Metadata URI for the NFT
     */
    function mintGear(
        address to,
        GearType gearType,
        Rarity rarity,
        uint16 attack,
        uint16 defense,
        uint16 bonus,
        string memory bonusType,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        gearStats[newTokenId] = GearStats({
            gearType: gearType,
            rarity: rarity,
            attack: attack,
            defense: defense,
            bonus: bonus,
            bonusType: bonusType,
            mintedAt: block.timestamp
        });

        emit GearMinted(to, newTokenId, gearType, rarity);
        return newTokenId;
    }

    /**
     * @dev Equip a gear item (player must own it)
     */
    function equipGear(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You don't own this gear");
        
        GearStats memory stats = gearStats[tokenId];
        
        // Unequip previous item in this slot if exists
        uint256 currentEquipped = equippedGear[msg.sender][stats.gearType];
        if (currentEquipped != 0) {
            emit GearUnequipped(msg.sender, currentEquipped, stats.gearType);
        }
        
        equippedGear[msg.sender][stats.gearType] = tokenId;
        emit GearEquipped(msg.sender, tokenId, stats.gearType);
    }

    /**
     * @dev Unequip a gear item
     */
    function unequipGear(GearType gearType) public {
        uint256 tokenId = equippedGear[msg.sender][gearType];
        require(tokenId != 0, "No gear equipped in this slot");
        
        equippedGear[msg.sender][gearType] = 0;
        emit GearUnequipped(msg.sender, tokenId, gearType);
    }

    /**
     * @dev Get all equipped gear for a player
     */
    function getEquippedGear(address player) public view returns (
        uint256 weapon,
        uint256 armor,
        uint256 helmet,
        uint256 shield
    ) {
        return (
            equippedGear[player][GearType.WEAPON],
            equippedGear[player][GearType.ARMOR],
            equippedGear[player][GearType.HELMET],
            equippedGear[player][GearType.SHIELD]
        );
    }

    /**
     * @dev Get total stats from equipped gear
     */
    function getPlayerStats(address player) public view returns (
        uint256 totalAttack,
        uint256 totalDefense
    ) {
        for (uint256 i = 0; i < 4; i++) {
            uint256 tokenId = equippedGear[player][GearType(i)];
            if (tokenId != 0) {
                GearStats memory stats = gearStats[tokenId];
                totalAttack += stats.attack;
                totalDefense += stats.defense;
            }
        }
        return (totalAttack, totalDefense);
    }
}
