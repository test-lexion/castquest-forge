import { Card } from "@/components/ui/card";
import { Hammer, Plus, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockRecipes = [
  {
    id: 1,
    name: "Enchanted Blade",
    rarity: "epic",
    ingredients: ["Iron Sword", "Dragon Scale", "Magic Essence"],
    result: { icon: "⚔️", stats: "+65 ATK, +10 Crit" },
  },
  {
    id: 2,
    name: "Dragon Armor",
    rarity: "legendary",
    ingredients: ["Dragon Scale x3", "Phoenix Feather", "Ancient Rune"],
    result: { icon: "🛡️", stats: "+80 DEF, +50 HP" },
  },
  {
    id: 3,
    name: "Greater Health Potion",
    rarity: "rare",
    ingredients: ["Health Potion x2", "Herb Bundle"],
    result: { icon: "🧪", stats: "Restores 150 HP" },
  },
  {
    id: 4,
    name: "Lucky Charm",
    rarity: "uncommon",
    ingredients: ["Goblin Ear x3", "Gold Coin"],
    result: { icon: "🍀", stats: "+15 Luck" },
  },
];

const rarityBadge: Record<string, string> = {
  legendary: "bg-gradient-legendary text-background",
  epic: "bg-gradient-epic text-primary-foreground",
  rare: "bg-gradient-rare text-primary-foreground",
  uncommon: "bg-gradient-uncommon text-primary-foreground",
};

export default function Crafting() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Crafting Station</h1>
        <p className="text-muted-foreground">
          Combine materials to create powerful equipment and items
        </p>
      </div>

      {/* Active Crafting Area */}
      <Card className="p-8 bg-gradient-primary border-primary/50">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Hammer className="w-6 h-6" />
          Craft Item
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-2">Select Ingredients</div>
            {[1, 2, 3].map((slot) => (
              <Card key={slot} className="p-4 bg-secondary/50 border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Plus className="w-5 h-5" />
                  <span>Ingredient Slot {slot}</span>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <ArrowRight className="w-12 h-12 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-2">Result Preview</div>
            <Card className="p-8 bg-secondary/50 border-dashed border-2">
              <div className="text-center text-muted-foreground">
                <div className="text-6xl mb-4">❓</div>
                <p>Select ingredients to see result</p>
              </div>
            </Card>
            <button
              disabled
              className="w-full mt-4 py-3 bg-primary text-primary-foreground rounded-lg opacity-50 cursor-not-allowed"
            >
              Craft Item
            </button>
          </div>
        </div>
      </Card>

      {/* Recipe Book */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recipe Book</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockRecipes.map((recipe) => (
            <Card key={recipe.id} className="p-6 hover:border-primary transition-colors cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="text-5xl">{recipe.result.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{recipe.name}</h3>
                    <Badge className={rarityBadge[recipe.rarity]}>
                      {recipe.rarity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-accent mb-3">{recipe.result.stats}</p>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Required:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {recipe.ingredients.map((ing, idx) => (
                        <Badge key={idx} variant="outline">
                          {ing}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
