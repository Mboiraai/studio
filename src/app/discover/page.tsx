"use client";

import { useState } from "react";
import { profiles as initialProfiles } from "@/lib/data";
import { Profile } from "@/lib/types";
import { ProfileCard } from "@/components/profile-card";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { Heart, X, Undo } from "lucide-react";
import { Logo } from "@/components/logo";

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [history, setHistory] = useState<Profile[]>([]);

  const handleSwipe = (swipedProfile: Profile) => {
    setHistory(prev => [swipedProfile, ...prev]);
    setProfiles((prevProfiles) =>
      prevProfiles.filter((p) => p.id !== swipedProfile.id)
    );
  };
  
  const handleUndo = () => {
    if (history.length > 0) {
      const lastSwiped = history[0];
      setProfiles(prev => [lastSwiped, ...prev]);
      setHistory(prev => prev.slice(1));
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center justify-center p-4 border-b">
        <Logo className="h-8 w-8" />
      </header>
      
      <main className="relative flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="relative w-full max-w-sm h-[70vh] max-h-[600px] flex items-center justify-center">
          {profiles.length > 0 ? (
            profiles.map((profile, index) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onSwipe={() => handleSwipe(profile)}
                isTop={index === profiles.length - 1}
              />
            )).reverse()
          ) : (
            <div className="text-center text-muted-foreground">
              <h3 className="text-xl font-semibold">That's everyone for now!</h3>
              <p>Come back later to see new profiles.</p>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-4 w-full max-w-sm">
           <Button variant="outline" size="icon" className="w-16 h-16 rounded-full border-2 border-amber-500 text-amber-500 shadow-lg" onClick={handleUndo} disabled={history.length === 0}>
            <Undo className="w-8 h-8" />
          </Button>
          <Button variant="outline" size="icon" className="w-20 h-20 rounded-full border-2 border-destructive text-destructive shadow-lg">
            <X className="w-10 h-10" />
          </Button>
          <Button variant="outline" size="icon" className="w-20 h-20 rounded-full border-2 border-green-500 text-green-500 shadow-lg">
            <Heart className="w-10 h-10" />
          </Button>
        </div>
      </main>
      
      <div className="h-16" />
      <BottomNav />
    </div>
  );
}
