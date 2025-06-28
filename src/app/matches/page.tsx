import { matches } from "@/lib/data";
import { BottomNav } from "@/components/bottom-nav";
import { AppHeader } from "@/components/app-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function MatchesPage() {
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <div className="p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Matches</h1>
        <p className="text-sm md:text-base text-muted-foreground">Your connections</p>
      </div>
      <main className="flex-1 overflow-y-auto">
        <div className="divide-y">
          {matches.map((match) => (
            <Link href={`/chat/${match.id}`} key={match.id} className="flex items-center gap-4 p-3 hover:bg-primary/5 transition-colors md:p-4">
              <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-primary/50">
                <AvatarImage src={match.userAvatar} alt={match.userName} data-ai-hint="person portrait" />
                <AvatarFallback>{match.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-base md:text-lg">{match.userName}</h3>
                <p className="text-sm text-muted-foreground truncate">{match.lastMessage}</p>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                <span>{match.lastMessageTimestamp}</span>
                {match.unreadCount > 0 && (
                  <Badge className="bg-primary text-primary-foreground">{match.unreadCount}</Badge>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
      <div className="h-16" />
      <BottomNav />
    </div>
  );
}
