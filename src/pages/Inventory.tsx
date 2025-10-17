import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sword, Shield, Package, Sparkles } from "lucide-react";

const mockInventory = [
  { id: 1, name: "Legendary Blade", type: "Equipment", rarity: "legendary", stats: "+50 ATK", icon: "⚔️" },
  { id: 2, name: "Dragon Scale Mail", type: "Equipment", rarity: "epic", stats: "+40 DEF", icon: "🛡️" },
  { id: 3, name: "Crown of Wisdom", type: "Equipment", rarity: "rare", stats: "+15 INT", icon: "👑" },
  { id: 4, name: "Goblin Ear", type: "Materials", rarity: "common", stats: "Crafting Material", icon: "👂" },
  { id: 5, name: "Dragon Scale", type: "Materials", rarity: "epic", stats: "Rare Material", icon: "🐉" },
  { id: 6, name: "Health Potion", type: "Consumables", rarity: "uncommon", stats: "Restores 50 HP", icon: "🧪" },
  { id: 7, name: "Enchanted Scroll", type: "Consumables", rarity: "rare", stats: "+10% XP Boost", icon: "📜" },
  { id: 8, name: "Guardian's Aegis", type: "Equipment", rarity: "epic", stats: "+35 DEF, +10 HP", icon: "🛡️" },
  { id: 9, name: "Phoenix Feather", type: "Materials", rarity: "legendary", stats: "Legendary Material", icon: "🪶" },
  { id: 10, name: "Iron Sword", type: "Equipment", rarity: "uncommon", stats: "+20 ATK", icon: "⚔️" },
];

const rarityStyles: Record<string, string> = {
  legendary: "border-legendary bg-legendary/10 shadow-legendary",
  epic: "border-epic bg-epic/10 shadow-epic",
  rare: "border-rare bg-rare/10",
  uncommon: "border-uncommon bg-uncommon/10",
  common: "border-common bg-common/10",
};

const rarityBadge: Record<string, string> = {
  legendary: "bg-gradient-legendary text-background",
  epic: "bg-gradient-epic text-primary-foreground",
  rare: "bg-gradient-rare text-primary-foreground",
  uncommon: "bg-gradient-uncommon text-primary-foreground",
  common: "bg-muted text-foreground",
};

const filterItems = (items: typeof mockInventory, filter: string) => {
  if (filter === "All") return items;
  return items.filter((item) => item.type === filter);
};

export default function Inventory() {
  const tabs = ["All", "Equipment", "Materials", "Consumables"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Inventory</h1>
          <p className="text-muted-foreground">Manage your collected items and gear</p>
        </div>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Total Items</div>
              <div className="text-2xl font-bold">{mockInventory.length}</div>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filterItems(mockInventory, tab).map((item) => (
                <Card
                  key={item.id}
                  className={`p-4 border-2 hover:scale-105 transition-all cursor-pointer ${
                    rarityStyles[item.rarity]
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="text-6xl">{item.icon}</div>
                    <div className="w-full">
                      <Badge className={`mb-2 ${rarityBadge[item.rarity]}`}>
                        {item.rarity.toUpperCase()}
                      </Badge>
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.type}</p>
                      <p className="text-sm text-accent">{item.stats}</p>
                    </div>
                    <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                      {item.type === "Equipment" ? "Equip" : "Use"}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
