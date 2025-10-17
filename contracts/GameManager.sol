// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title GameManager
 * @dev Central contract for managing player progress, XP, levels, and quest completions
 */
contract GameManager is Ownable, ReentrancyGuard {
    
    struct PlayerData {
        uint256 xp;
        uint16 level;
        uint256 questsCompleted;
        uint256 lastQuestTime;
        bool registered;
    }

    // Mapping from player address to their data
    mapping(address => PlayerData) public players;
    
    // Mapping from Farcaster FID to wallet address
    mapping(uint256 => address) public fidToAddress;
    
    // Quest cooldown time (to prevent spam)
    uint256 public constant QUEST_COOLDOWN = 1 minutes;
    
    // XP required for levels (can be calculated: 1000 * level^1.5)
    mapping(uint16 => uint256) public xpForLevel;

    // Events
    event PlayerRegistered(address indexed player, uint256 fid);
    event XPAwarded(address indexed player, uint256 amount, uint256 newTotal);
    event LevelUp(address indexed player, uint16 newLevel);
    event QuestCompleted(address indexed player, uint256 questId, uint256 xpAwarded);

    constructor() Ownable(msg.sender) {
        // Initialize XP requirements for first 50 levels
        for (uint16 i = 1; i <= 50; i++) {
            xpForLevel[i] = calculateXPForLevel(i);
        }
    }

    /**
     * @dev Calculate XP required for a level (1000 * level^1.5)
     */
    function calculateXPForLevel(uint16 level) public pure returns (uint256) {
        if (level == 0) return 0;
        // Using fixed point math for power calculation
        uint256 base = uint256(level) * 1000;
        uint256 power = sqrt(uint256(level) * uint256(level) * uint256(level));
        return base * power / sqrt(level);
    }

    /**
     * @dev Square root function for XP calculation
     */
    function sqrt(uint256 x) private pure returns (uint256) {
        if (x == 0) return 0;
        uint256 z = (x + 1) / 2;
        uint256 y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
        return y;
    }

    /**
     * @dev Register a player with their Farcaster FID
     */
    function registerPlayer(uint256 fid) public {
        require(!players[msg.sender].registered, "Player already registered");
        require(fidToAddress[fid] == address(0), "FID already registered");

        players[msg.sender] = PlayerData({
            xp: 0,
            level: 1,
            questsCompleted: 0,
            lastQuestTime: 0,
            registered: true
        });

        fidToAddress[fid] = msg.sender;
        emit PlayerRegistered(msg.sender, fid);
    }

    /**
     * @dev Award XP to a player (only owner/game server can call)
     */
    function awardXP(address player, uint256 amount) public onlyOwner {
        require(players[player].registered, "Player not registered");

        PlayerData storage playerData = players[player];
        playerData.xp += amount;

        emit XPAwarded(player, amount, playerData.xp);

        // Check for level up
        checkLevelUp(player);
    }

    /**
     * @dev Record quest completion
     */
    function completeQuest(
        address player,
        uint256 questId,
        uint256 xpReward
    ) public onlyOwner nonReentrant {
        require(players[player].registered, "Player not registered");
        
        PlayerData storage playerData = players[player];
        
        // Check cooldown
        require(
            block.timestamp >= playerData.lastQuestTime + QUEST_COOLDOWN,
            "Quest cooldown active"
        );

        playerData.questsCompleted++;
        playerData.lastQuestTime = block.timestamp;
        playerData.xp += xpReward;

        emit QuestCompleted(player, questId, xpReward);
        emit XPAwarded(player, xpReward, playerData.xp);

        // Check for level up
        checkLevelUp(player);
    }

    /**
     * @dev Check if player should level up
     */
    function checkLevelUp(address player) internal {
        PlayerData storage playerData = players[player];
        uint16 currentLevel = playerData.level;
        
        // Keep leveling up until XP requirement not met
        while (currentLevel < 50 && playerData.xp >= xpForLevel[currentLevel + 1]) {
            currentLevel++;
            playerData.level = currentLevel;
            emit LevelUp(player, currentLevel);
        }
    }

    /**
     * @dev Get player data
     */
    function getPlayerData(address player) public view returns (
        uint256 xp,
        uint16 level,
        uint256 questsCompleted,
        uint256 xpToNextLevel
    ) {
        PlayerData memory data = players[player];
        uint256 nextLevelXP = data.level < 50 ? xpForLevel[data.level + 1] : 0;
        
        return (
            data.xp,
            data.level,
            data.questsCompleted,
            nextLevelXP > data.xp ? nextLevelXP - data.xp : 0
        );
    }

    /**
     * @dev Get player address from Farcaster FID
     */
    function getPlayerByFID(uint256 fid) public view returns (address) {
        return fidToAddress[fid];
    }

    /**
     * @dev Check if address can complete a quest (cooldown check)
     */
    function canCompleteQuest(address player) public view returns (bool) {
        if (!players[player].registered) return false;
        return block.timestamp >= players[player].lastQuestTime + QUEST_COOLDOWN;
    }
}
