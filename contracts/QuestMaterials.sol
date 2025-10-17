// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title QuestMaterials
 * @dev ERC-1155 NFT contract for stackable items (materials, consumables)
 * Supports crafting by burning materials to mint new items
 */
contract QuestMaterials is ERC1155, Ownable {
    using Strings for uint256;

    enum MaterialType { COMMON_MAT, UNCOMMON_MAT, RARE_MAT, EPIC_MAT, LEGENDARY_MAT, CONSUMABLE }

    // Token ID counter
    uint256 private _currentTokenId = 0;

    // Mapping from token ID to material type and name
    mapping(uint256 => MaterialType) public materialTypes;
    mapping(uint256 => string) public materialNames;
    mapping(uint256 => string) public materialDescriptions;

    // Crafting recipes: recipeId => (required materials and amounts)
    struct Recipe {
        uint256[] requiredTokenIds;
        uint256[] requiredAmounts;
        uint256 outputTokenId;
        uint256 outputAmount;
        bool exists;
    }
    
    mapping(uint256 => Recipe) public recipes;
    uint256 private _currentRecipeId = 0;

    // Events
    event MaterialMinted(address indexed to, uint256 indexed tokenId, uint256 amount, MaterialType materialType);
    event ItemCrafted(address indexed crafter, uint256 indexed recipeId, uint256 outputTokenId, uint256 amount);
    event RecipeAdded(uint256 indexed recipeId, uint256 outputTokenId);

    constructor() ERC1155("https://castquest.xyz/api/materials/{id}.json") Ownable(msg.sender) {}

    /**
     * @dev Create a new material type
     */
    function createMaterial(
        MaterialType materialType,
        string memory name,
        string memory description
    ) public onlyOwner returns (uint256) {
        _currentTokenId++;
        uint256 newTokenId = _currentTokenId;

        materialTypes[newTokenId] = materialType;
        materialNames[newTokenId] = name;
        materialDescriptions[newTokenId] = description;

        return newTokenId;
    }

    /**
     * @dev Mint materials to a player (reward from quests)
     */
    function mintMaterial(
        address to,
        uint256 tokenId,
        uint256 amount
    ) public onlyOwner {
        require(bytes(materialNames[tokenId]).length > 0, "Material doesn't exist");
        
        _mint(to, tokenId, amount, "");
        emit MaterialMinted(to, tokenId, amount, materialTypes[tokenId]);
    }

    /**
     * @dev Batch mint multiple materials
     */
    function mintMaterialBatch(
        address to,
        uint256[] memory tokenIds,
        uint256[] memory amounts
    ) public onlyOwner {
        _mintBatch(to, tokenIds, amounts, "");
    }

    /**
     * @dev Add a crafting recipe
     */
    function addRecipe(
        uint256[] memory requiredTokenIds,
        uint256[] memory requiredAmounts,
        uint256 outputTokenId,
        uint256 outputAmount
    ) public onlyOwner returns (uint256) {
        require(requiredTokenIds.length == requiredAmounts.length, "Arrays length mismatch");
        require(bytes(materialNames[outputTokenId]).length > 0, "Output material doesn't exist");

        _currentRecipeId++;
        uint256 newRecipeId = _currentRecipeId;

        recipes[newRecipeId] = Recipe({
            requiredTokenIds: requiredTokenIds,
            requiredAmounts: requiredAmounts,
            outputTokenId: outputTokenId,
            outputAmount: outputAmount,
            exists: true
        });

        emit RecipeAdded(newRecipeId, outputTokenId);
        return newRecipeId;
    }

    /**
     * @dev Craft an item using a recipe (burns materials, mints result)
     */
    function craft(uint256 recipeId) public {
        Recipe memory recipe = recipes[recipeId];
        require(recipe.exists, "Recipe doesn't exist");

        // Check if player has all required materials
        for (uint256 i = 0; i < recipe.requiredTokenIds.length; i++) {
            require(
                balanceOf(msg.sender, recipe.requiredTokenIds[i]) >= recipe.requiredAmounts[i],
                "Insufficient materials"
            );
        }

        // Burn required materials
        for (uint256 i = 0; i < recipe.requiredTokenIds.length; i++) {
            _burn(msg.sender, recipe.requiredTokenIds[i], recipe.requiredAmounts[i]);
        }

        // Mint output item
        _mint(msg.sender, recipe.outputTokenId, recipe.outputAmount, "");
        
        emit ItemCrafted(msg.sender, recipeId, recipe.outputTokenId, recipe.outputAmount);
    }

    /**
     * @dev Get recipe details
     */
    function getRecipe(uint256 recipeId) public view returns (
        uint256[] memory requiredTokenIds,
        uint256[] memory requiredAmounts,
        uint256 outputTokenId,
        uint256 outputAmount
    ) {
        Recipe memory recipe = recipes[recipeId];
        require(recipe.exists, "Recipe doesn't exist");
        
        return (
            recipe.requiredTokenIds,
            recipe.requiredAmounts,
            recipe.outputTokenId,
            recipe.outputAmount
        );
    }

    /**
     * @dev Update base URI for metadata
     */
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    /**
     * @dev Override to provide token-specific URIs
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(super.uri(tokenId), tokenId.toString(), ".json"));
    }
}
