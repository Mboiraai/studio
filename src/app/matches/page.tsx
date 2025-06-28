
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Loader2 } from "lucide-react";
import { matches } from "@/lib/data";
import { BottomNav } from "@/components/bottom-nav";
import { AppHeader } from "@/components/app-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function MatchesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <main className="flex-1 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto">
          <div className="p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Matches</h1>
            <p className="text-sm md:text-base text-muted-foreground">Your connections</p>
          </div>
          <div className="border-t">
            {matches.map((match) => (
              <Link href={`/chat/${match.id}`} key={match.id} className="flex items-start gap-4 p-4 hover:bg-primary/5 transition-colors md:p-6 border-b">
                <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-primary/50 shrink-0">
                  <AvatarImage src={match.userAvatar} alt={match.userName} data-ai-hint="person portrait" />
                  <AvatarFallback>{match.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base md:text-lg">{match.userName}</h3>
                  <p className="text-sm text-muted-foreground truncate">{match.lastMessage}</p>
                </div>
                <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground shrink-0">
                  <span className="whitespace-nowrap">{match.lastMessageTimestamp}</span>
                  {match.unreadCount > 0 && (
                    <Badge className="bg-primary text-primary-foreground h-5 w-5 flex items-center justify-center">{match.unreadCount}</Badge>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <div className="h-16 md:hidden" />
      <BottomNav />
    </div>
  );
}
