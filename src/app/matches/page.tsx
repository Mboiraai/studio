import { matches } from "@/lib/data";
import { BottomNav } from "@/components/bottom-nav";
import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function MatchesPage() {
  return (
    <div className="flex h-screen flex-col">
      <PageHeader title="Matches" subtitle="Your connections" />
      <main className="flex-1 overflow-y-auto">
        <div className="divide-y">
          {matches.map((match) => (
            <Link href={`/chat/${match.id}`} key={match.id} className="flex items-center gap-4 p-4 hover:bg-primary/5 transition-colors">
              <Avatar className="h-14 w-14 border-2 border-primary/50">
                <AvatarImage src={match.userAvatar} alt={match.userName} data-ai-hint="person portrait" />
                <AvatarFallback>{match.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{match.userName}</h3>
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
