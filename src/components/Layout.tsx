import { Sword, Backpack, Hammer, ScrollText, Trophy, Zap, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppKit } from '@reown/appkit/react';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/", icon: Sword, label: "Dashboard" },
  { path: "/inventory", icon: Backpack, label: "Inventory" },
  { path: "/crafting", icon: Hammer, label: "Crafting" },
  { path: "/quests", icon: ScrollText, label: "Quest Log" },
  { path: "/leaderboards", icon: Trophy, label: "Leaderboards" },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CastQuest
              </h1>
            </div>
            {isConnected && address ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
                  <Wallet className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                </div>
                <Button 
                  onClick={() => disconnect()} 
                  variant="outline"
                  size="sm"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => open()} 
                className="bg-primary text-primary-foreground hover:opacity-90"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-[73px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};
