import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, Heart, Zap, Target, TrendingUp } from "lucide-react";

const mockCharacter = {
  name: "@questmaster_hero",
  level: 12,
  class: "Paladin",
  xp: 2500,
  xpToNext: 3000,
  hp: 120,
  maxHp: 120,
  stats: {
    attack: 45,
    defense: 38,
    luck: 22,
  },
  recentActivity: [
    { action: "Defeated Goblin Raider", reward: "+50 XP", time: "2 hours ago" },
    { action: "Crafted Iron Sword", reward: "Epic Weapon", time: "5 hours ago" },
    { action: "Completed Shadow Puzzle", reward: "+100 XP", time: "1 day ago" },
    { action: "Identified Ancient Rune", reward: "+30 XP", time: "1 day ago" },
    { action: "Joined World Boss Event", reward: "Participation Badge", time: "2 days ago" },
  ],
  equippedItems: [
    { slot: "Weapon", name: "Legendary Blade", rarity: "legendary" },
    { slot: "Armor", name: "Dragon Scale Mail", rarity: "epic" },
    { slot: "Helmet", name: "Crown of Wisdom", rarity: "rare" },
    { slot: "Shield", name: "Guardian's Aegis", rarity: "epic" },
  ],
};

const rarityColors: Record<string, string> = {
  legendary: "text-legendary",
  epic: "text-epic",
  rare: "text-rare",
  uncommon: "text-uncommon",
  common: "text-common",
};

export default function Dashboard() {
  const xpPercent = (mockCharacter.xp / mockCharacter.xpToNext) * 100;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="p-8 bg-gradient-primary border-primary/50 shadow-glow">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center text-6xl">
            ⚔️
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{mockCharacter.name}</h2>
            <div className="flex items-center gap-4 justify-center md:justify-start mb-4">
              <span className="text-xl text-muted-foreground">Level {mockCharacter.level}</span>
              <span className="text-xl text-accent">{mockCharacter.class}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Experience</span>
                <span>
                  {mockCharacter.xp} / {mockCharacter.xpToNext} XP
                </span>
              </div>
              <Progress value={xpPercent} className="h-3" />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stats Module */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Character Stats
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Heart className="w-8 h-8 text-destructive" />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Health Points</span>
                  <span>
                    {mockCharacter.hp} / {mockCharacter.maxHp}
                  </span>
                </div>
                <Progress value={(mockCharacter.hp / mockCharacter.maxHp) * 100} className="h-2" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{mockCharacter.stats.attack}</div>
                <div className="text-sm text-muted-foreground">Attack</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{mockCharacter.stats.defense}</div>
                <div className="text-sm text-muted-foreground">Defense</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{mockCharacter.stats.luck}</div>
                <div className="text-sm text-muted-foreground">Luck</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {mockCharacter.recentActivity.map((activity, idx) => (
              <div key={idx} className="flex justify-between items-start p-3 bg-secondary rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
                <span className="text-sm text-accent font-medium whitespace-nowrap ml-2">
                  {activity.reward}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Equipped Items */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-xl font-bold mb-4">Equipped Gear</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockCharacter.equippedItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-secondary rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer"
              >
                <div className="text-sm text-muted-foreground mb-2">{item.slot}</div>
                <div className={`font-bold ${rarityColors[item.rarity]}`}>{item.name}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
