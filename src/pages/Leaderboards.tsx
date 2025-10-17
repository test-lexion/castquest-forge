import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, TrendingUp, Zap, Hammer, Crown } from "lucide-react";

const mockLeaderboards = {
  allTime: [
    { rank: 1, name: "@dragonslayer", level: 42, xp: 125000, avatar: "🐉" },
    { rank: 2, name: "@shadowmaster", level: 38, xp: 98000, avatar: "🌑" },
    { rank: 3, name: "@questlord", level: 35, xp: 87000, avatar: "⚔️" },
    { rank: 4, name: "@wizardking", level: 33, xp: 76000, avatar: "🧙" },
    { rank: 5, name: "@knightcaptain", level: 31, xp: 68000, avatar: "🛡️" },
  ],
  weekly: [
    { rank: 1, name: "@speedrunner", level: 28, xp: 15000, avatar: "⚡" },
    { rank: 2, name: "@grindmaster", level: 25, xp: 12500, avatar: "💪" },
    { rank: 3, name: "@adventurer", level: 22, xp: 10000, avatar: "🗺️" },
  ],
  daily: [
    { rank: 1, name: "@todayschamp", level: 18, xp: 3500, avatar: "🌟" },
    { rank: 2, name: "@hustler", level: 16, xp: 2800, avatar: "🔥" },
    { rank: 3, name: "@riser", level: 15, xp: 2200, avatar: "📈" },
  ],
  crafters: [
    { rank: 1, name: "@mastersmith", level: 40, items: 287, avatar: "🔨" },
    { rank: 2, name: "@craftguru", level: 36, items: 245, avatar: "⚒️" },
    { rank: 3, name: "@artisan", level: 33, items: 198, avatar: "🛠️" },
  ],
};

const tabs = [
  { value: "allTime", label: "All-Time XP", icon: Crown },
  { value: "weekly", label: "Weekly", icon: TrendingUp },
  { value: "daily", label: "Daily", icon: Zap },
  { value: "crafters", label: "Master Crafters", icon: Hammer },
];

const rankColors: Record<number, string> = {
  1: "bg-gradient-legendary text-background shadow-legendary",
  2: "bg-gradient-rare text-primary-foreground",
  3: "bg-gradient-uncommon text-primary-foreground",
};

export default function Leaderboards() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Trophy className="w-8 h-8 text-gold" />
          Leaderboards
        </h1>
        <p className="text-muted-foreground">Compete with fellow adventurers for glory</p>
      </div>

      <Tabs defaultValue="allTime" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-3xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {Object.entries(mockLeaderboards).map(([key, players]) => (
          <TabsContent key={key} value={key} className="mt-6">
            <div className="space-y-4">
              {players.map((player) => {
                const isTopThree = player.rank <= 3;
                return (
                  <Card
                    key={player.rank}
                    className={`p-6 ${
                      isTopThree ? rankColors[player.rank] : "hover:border-primary"
                    } transition-all`}
                  >
                    <div className="flex items-center gap-6">
                      <div
                        className={`w-16 h-16 flex items-center justify-center rounded-full text-3xl font-bold ${
                          isTopThree ? "bg-background/20" : "bg-secondary"
                        }`}
                      >
                        {player.rank <= 3 ? (
                          <Trophy className={`w-8 h-8 ${player.rank === 1 ? "text-gold" : ""}`} />
                        ) : (
                          `#${player.rank}`
                        )}
                      </div>
                      <div className="text-6xl">{player.avatar}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{player.name}</h3>
                        <p className={isTopThree ? "opacity-90" : "text-muted-foreground"}>
                          Level {player.level}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {"xp" in player
                            ? player.xp.toLocaleString()
                            : player.items.toLocaleString()}
                        </div>
                        <div className={`text-sm ${isTopThree ? "opacity-90" : "text-muted-foreground"}`}>
                          {"xp" in player ? "XP" : "Items Crafted"}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
