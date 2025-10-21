

# CastQuest Forge - A Farcaster-Powered On-Chain RPG

CastQuest Forge is the frontend interface and smart contract suite for a persistent, on-chain social RPG designed to be played on Farcaster. Players can register their Farcaster identity, complete quests, battle monsters, craft powerful NFT-based gear, and compete on leaderboards, with all significant progress and ownership recorded on the blockchain.

This project represents a complete and well-architected Web3 application, featuring a modern React frontend, a sophisticated smart contract system for game logic and assets, and seamless wallet integration.

*(Note: Add a screenshot of the application dashboard here)*

---

## ✨ Core Features

*   **On-Chain Player Progression:** Player data, including Experience Points (XP), levels, and quest completions, are managed by the `GameManager` smart contract, creating a persistent and verifiable player history.
*   **Farcaster Integration:** Players register using their Farcaster FID, linking their social identity to their on-chain character. The game is designed to be interacted with via a Farcaster bot (e.g., `@questmaster`).
*   **NFT-Based Equipment (ERC-721):** Unique game items like weapons, armor, and shields are represented as individual NFTs (`QuestGear.sol`). Each item has distinct stats and rarity, and players have true ownership.
*   **Crafting & Materials (ERC-1155):** Stackable items like crafting materials and consumables are managed by an efficient ERC-1155 contract (`QuestMaterials.sol`), allowing players to gather resources and craft new items based on on-chain recipes.
*   **Comprehensive UI:** A clean, responsive user interface for players to manage their game state:
    *   **Dashboard:** View character stats, level progression, and recent activity.
    *   **Inventory:** See all owned ERC-721 gear and ERC-1155 materials.
    *   **Crafting Station:** A UI to combine materials into new items.
    *   **Quest Log:** A history of all completed, failed, and in-progress quests.
    *   **Leaderboards:** View rankings for top players.
*   **Modern Web3 Wallet Integration:** Seamless wallet connection powered by **@reown/appkit** and **wagmi**, providing a smooth and user-friendly experience.

---

## ⛓️ Smart Contract Architecture

The game's logic is powered by a modular and gas-efficient set of Solidity smart contracts, designed for the Base network.

| Contract              | Standard  | Purpose                                                                                                           |
| --------------------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| **`GameManager.sol`**     | Custom    | The core engine. Manages player registration (FID-to-wallet), XP, levels, and quest completion with cooldowns.      |
| **`QuestGear.sol`**       | ERC-721   | Manages unique, equippable NFT items like weapons and armor, each with specific stats and rarity.                 |
| **`QuestMaterials.sol`**  | ERC-1155  | Manages stackable items like crafting resources and potions. Includes the logic for on-chain crafting recipes. |

---

## 🛠️ Technology Stack

This project is built with a modern and robust technology stack, emphasizing performance, developer experience, and scalability.

| Category          | Technology                                                                                                  |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| **Framework**     | [**React**](https://react.dev/) with [**Vite**](https://vitejs.dev/)                                          |
| **Language**      | [**TypeScript**](https://www.typescriptlang.org/) & [**Solidity**](https://soliditylang.org/)                  |
| **Styling**       | [**Tailwind CSS**](https://tailwindcss.com/)                                                                 |
| **UI Components** | [**shadcn/ui**](https://ui.shadcn.com/) (built on Radix UI & Lucide React)                                    |
| **Web3**          | [**`wagmi`**](https://wagmi.sh/), [**`viem`**](https://viem.sh/), & [**@reown/appkit**](https://reown.com/appkit) |
| **Smart Contracts**| **Hardhat** (implied) & **OpenZeppelin Contracts**                                                          |
| **Routing**       | [**React Router DOM**](https://reactrouter.com/)                                                            |

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18.x or later recommended) and an `npm`-compatible package manager installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/test-lexion-castquest-forge.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd test-lexion-castquest-forge
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Set up environment variables:**
    Create a file named `.env` in the root of the project by copying the example:
    ```sh
    cp .env.example .env
    ```
    Then, edit the `.env` file and add your WalletConnect `projectId`.
    ```env
    # Get yours at: https://cloud.reown.com
    VITE_REOWN_PROJECT_ID="YOUR_PROJECT_ID_HERE"
    ```

### Running the Application

Once the dependencies are installed, you can run the development server:

```sh
npm run dev
```

This will start the Vite development server. Open your browser and navigate to `http://localhost:8080`.

---

## 📜 Available Scripts

*   `npm run dev`: Runs the app in development mode with hot-reloading.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run lint`: Lints the project files for code quality and errors.
*   `npm run preview`: Serves the production build locally to preview it before deployment.

---

## 📂 Project Structure

The codebase is organized into a clean and scalable structure.

```
test-lexion-castquest-forge/
├── contracts/             # Solidity smart contracts (GameManager, QuestGear, etc.)
├── public/                # Static assets
└── src/
    ├── components/
    │   ├── Layout.tsx     # Main application layout with header and navigation
    │   └── ui/            # Core UI components from shadcn/ui
    ├── hooks/             # Custom React hooks
    ├── lib/               # Utility functions and Web3/contract configuration
    ├── pages/             # Top-level page components for each route
    ├── providers/         # React context providers (e.g., Web3Provider)
    ├── App.tsx            # Main application component with routing
    └── main.tsx           # Application entry point
```
