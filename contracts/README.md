# CastQuest Smart Contracts

This directory contains the Solidity smart contracts for CastQuest.

## Contracts

### 1. QuestGear.sol (ERC-721)
Manages unique equipment NFTs (weapons, armor, helmets, shields).

**Features:**
- Mint unique gear with stats (attack, defense, bonuses)
- Rarity system (Common → Legendary)
- Equip/Unequip system
- Query player stats from equipped gear

**Key Functions:**
- `mintGear()` - Mint new gear item
- `equipGear(tokenId)` - Equip a gear item
- `unequipGear(gearType)` - Unequip from slot
- `getPlayerStats(player)` - Get total stats from equipped gear

### 2. QuestMaterials.sol (ERC-1155)
Manages stackable items (materials, consumables).

**Features:**
- Create and mint materials
- Crafting system with recipes
- Burn materials to craft new items
- Batch operations

**Key Functions:**
- `createMaterial()` - Define new material type
- `mintMaterial()` - Award materials to players
- `addRecipe()` - Create crafting recipes
- `craft(recipeId)` - Craft items using recipe

### 3. GameManager.sol
Central contract for player progression and quest management.

**Features:**
- Player registration with Farcaster FID
- XP and leveling system
- Quest completion tracking
- Anti-spam cooldowns

**Key Functions:**
- `registerPlayer(fid)` - Link wallet to Farcaster
- `awardXP(player, amount)` - Grant XP rewards
- `completeQuest()` - Record quest completion
- `getPlayerData(player)` - Query player stats

## Deployment

### Prerequisites
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install @openzeppelin/contracts
```

### Deploy to Base Sepolia (Testnet)
```bash
npx hardhat run scripts/deploy.js --network base-sepolia
```

### Deploy to Base Mainnet
```bash
npx hardhat run scripts/deploy.js --network base
```

### After Deployment
1. Update contract addresses in `src/lib/contracts.ts`
2. Set the VITE_REOWN_PROJECT_ID in `.env`
3. Configure the bot backend to use the deployed contract addresses

## Environment Setup

Create a `.env` file in the project root:
```
PRIVATE_KEY=your_deployer_wallet_private_key
BASE_RPC_URL=https://mainnet.base.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASESCAN_API_KEY=your_basescan_api_key
```

## Security Considerations

1. **Owner Privileges**: Only the contract owner (game server) can mint items and award XP
2. **Cooldowns**: Quest cooldowns prevent spam and abuse
3. **Reentrancy Guards**: All state-changing functions are protected
4. **Input Validation**: All functions validate inputs and player state

## Testing

```bash
# Run tests
npx hardhat test

# Check coverage
npx hardhat coverage

# Verify contracts on Basescan
npx hardhat verify --network base <contract-address> <constructor-args>
```

## Gas Optimization

- Use ERC-1155 for stackable items (more efficient than multiple ERC-721s)
- Batch operations where possible
- Efficient storage patterns
- Minimal on-chain computation

## Integration with @questmaster Bot

The bot should:
1. Listen for quest responses on Farcaster
2. Validate player actions
3. Call smart contract functions via backend
4. Reply with transaction results

Example flow:
```
Player: @questmaster !attack dragon
Bot Backend: 
  - Validate quest
  - Call GameManager.completeQuest()
  - Call QuestMaterials.mintMaterial() for rewards
Bot Reply: "Victory! You earned 100 XP and 2x Dragon Scales"
```
