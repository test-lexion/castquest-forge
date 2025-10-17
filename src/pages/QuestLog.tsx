import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

const mockQuests = [
  {
    id: 1,
    title: "Slay the Shadow Dragon",
    status: "completed",
    action: "!attack with Legendary Blade",
    outcome: "Victory! Critical hit for 250 damage",
    rewards: ["+150 XP", "Dragon Scale x2", "Legendary Badge"],
    date: "2 hours ago",
    image: "🐉",
  },
  {
    id: 2,
    title: "Identify the Ancient Rune",
    status: "completed",
    action: "!guess ancient wisdom",
    outcome: "Correct! The rune translates to 'power'",
    rewards: ["+50 XP", "Magic Essence"],
    date: "1 day ago",
    image: "📿",
  },
  {
    id: 3,
    title: "Defeat the Goblin Horde",
    status: "failed",
    action: "!attack",
    outcome: "Defeated. Your attack was too weak.",
    rewards: [],
    date: "1 day ago",
    image: "👹",
  },
  {
    id: 4,
    title: "Solve the Crystal Puzzle",
    status: "in_progress",
    action: "!inspect",
    outcome: "The crystals glow with an ethereal light...",
    rewards: ["???"],
    date: "Just now",
    image: "💎",
  },
  {
    id: 5,
    title: "Identify Mysterious Creature",
    status: "completed",
    action: "!guess basilisk",
    outcome: "Correct! You've encountered a basilisk",
    rewards: ["+75 XP", "Rare Token"],
    date: "2 days ago",
    image: "🐍",
  },
];

const statusConfig = {
  completed: { icon: CheckCircle2, color: "text-uncommon", bgColor: "bg-uncommon/10", label: "Completed" },
  failed: { icon: XCircle, color: "text-destructive", bgColor: "bg-destructive/10", label: "Failed" },
  in_progress: { icon: Clock, color: "text-gold", bgColor: "bg-gold/10", label: "In Progress" },
};

const filterQuests = (quests: typeof mockQuests, filter: string) => {
  if (filter === "all") return quests;
  return quests.filter((quest) => quest.status === filter);
};

export default function QuestLog() {
  const tabs = [
    { value: "all", label: "All Quests" },
    { value: "completed", label: "Completed" },
    { value: "in_progress", label: "In Progress" },
    { value: "failed", label: "Failed" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Quest Log</h1>
        <p className="text-muted-foreground">Your adventure history and ongoing quests</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            <div className="space-y-4">
              {filterQuests(mockQuests, tab.value).map((quest) => {
                const status = statusConfig[quest.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                return (
                  <Card key={quest.id} className="p-6 hover:border-primary transition-colors">
                    <div className="flex gap-6">
                      <div className="text-6xl flex-shrink-0">{quest.image}</div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold mb-2">{quest.title}</h3>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${status.bgColor}`}>
                              <StatusIcon className={`w-4 h-4 ${status.color}`} />
                              <span className={`text-sm font-medium ${status.color}`}>
                                {status.label}
                              </span>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{quest.date}</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Your Action: </span>
                            <code className="px-2 py-1 bg-secondary rounded text-accent">
                              {quest.action}
                            </code>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Outcome: </span>
                            <span>{quest.outcome}</span>
                          </div>
                        </div>
                        {quest.rewards.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-muted-foreground">Rewards:</span>
                            {quest.rewards.map((reward, idx) => (
                              <Badge key={idx} className="bg-gradient-primary">
                                {reward}
                              </Badge>
                            ))}
                          </div>
                        )}
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
