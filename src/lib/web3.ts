import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base, optimism, baseSepolia, optimismSepolia } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID_HERE'

if (!projectId) {
  console.warn('VITE_REOWN_PROJECT_ID is not set. Please add it to your .env file.')
}

// Create Wagmi adapter
export const networks = [base, optimism, baseSepolia, optimismSepolia] as const

export const wagmiAdapter = new WagmiAdapter({
  networks: [base, optimism, baseSepolia, optimismSepolia],
  projectId,
  ssr: false
})

// Create modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: [base, optimism, baseSepolia, optimismSepolia],
  projectId,
  metadata: {
    name: 'CastQuest',
    description: 'A persistent, social RPG powered by Farcaster',
    url: 'https://castquest.xyz',
    icons: ['https://castquest.xyz/icon.png']
  },
  features: {
    analytics: true,
    email: false,
    socials: []
  }
})

export const config = wagmiAdapter.wagmiConfig
