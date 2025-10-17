/**
 * Smart Contract ABIs and Addresses
 * These should be updated after deployment
 */

// Contract addresses (update after deployment)
export const CONTRACTS = {
  // Base Mainnet
  base: {
    QuestGear: '0x0000000000000000000000000000000000000000',
    QuestMaterials: '0x0000000000000000000000000000000000000000',
    GameManager: '0x0000000000000000000000000000000000000000',
  },
  // Base Sepolia Testnet
  baseSepolia: {
    QuestGear: '0x0000000000000000000000000000000000000000',
    QuestMaterials: '0x0000000000000000000000000000000000000000',
    GameManager: '0x0000000000000000000000000000000000000000',
  },
}

// Simplified ABIs for frontend usage
export const QUEST_GEAR_ABI = [
  {
    name: 'mintGear',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'gearType', type: 'uint8' },
      { name: 'rarity', type: 'uint8' },
      { name: 'attack', type: 'uint16' },
      { name: 'defense', type: 'uint16' },
      { name: 'bonus', type: 'uint16' },
      { name: 'bonusType', type: 'string' },
      { name: 'tokenURI', type: 'string' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'equipGear',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'unequipGear',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'gearType', type: 'uint8' }],
    outputs: [],
  },
  {
    name: 'getEquippedGear',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'player', type: 'address' }],
    outputs: [
      { name: 'weapon', type: 'uint256' },
      { name: 'armor', type: 'uint256' },
      { name: 'helmet', type: 'uint256' },
      { name: 'shield', type: 'uint256' },
    ],
  },
  {
    name: 'getPlayerStats',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'player', type: 'address' }],
    outputs: [
      { name: 'totalAttack', type: 'uint256' },
      { name: 'totalDefense', type: 'uint256' },
    ],
  },
  {
    name: 'gearStats',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '', type: 'uint256' }],
    outputs: [
      { name: 'gearType', type: 'uint8' },
      { name: 'rarity', type: 'uint8' },
      { name: 'attack', type: 'uint16' },
      { name: 'defense', type: 'uint16' },
      { name: 'bonus', type: 'uint16' },
      { name: 'bonusType', type: 'string' },
      { name: 'mintedAt', type: 'uint256' },
    ],
  },
] as const

export const QUEST_MATERIALS_ABI = [
  {
    name: 'craft',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'recipeId', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'getRecipe',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'recipeId', type: 'uint256' }],
    outputs: [
      { name: 'requiredTokenIds', type: 'uint256[]' },
      { name: 'requiredAmounts', type: 'uint256[]' },
      { name: 'outputTokenId', type: 'uint256' },
      { name: 'outputAmount', type: 'uint256' },
    ],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'id', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'materialNames',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '', type: 'uint256' }],
    outputs: [{ name: '', type: 'string' }],
  },
] as const

export const GAME_MANAGER_ABI = [
  {
    name: 'registerPlayer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'fid', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'getPlayerData',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'player', type: 'address' }],
    outputs: [
      { name: 'xp', type: 'uint256' },
      { name: 'level', type: 'uint16' },
      { name: 'questsCompleted', type: 'uint256' },
      { name: 'xpToNextLevel', type: 'uint256' },
    ],
  },
  {
    name: 'canCompleteQuest',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'player', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'getPlayerByFID',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'fid', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }],
  },
] as const

// Helper to get contract address for current network
export function getContractAddress(
  chainId: number,
  contract: 'QuestGear' | 'QuestMaterials' | 'GameManager'
): string {
  // Base Mainnet
  if (chainId === 8453) {
    return CONTRACTS.base[contract]
  }
  // Base Sepolia
  if (chainId === 84532) {
    return CONTRACTS.baseSepolia[contract]
  }
  // Default to Base Sepolia for development
  return CONTRACTS.baseSepolia[contract]
}
