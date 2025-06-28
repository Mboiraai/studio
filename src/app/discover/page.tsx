
"use client";

import { useState } from "react";
import { profiles as initialProfiles } from "@/lib/data";
import { Profile } from "@/lib/types";
import { ProfileCard } from "@/components/profile-card";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import { AppHeader } from "@/components/app-header";

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);

  const handleSwipe = (swipedProfile: Profile) => {
    if (!swipedProfile) return;
    setProfiles((prevProfiles) =>
      prevProfiles.filter((p) => p.id !== swipedProfile.id)
    );
  };
  
  const currentProfile = profiles[profiles.length - 1];

  return (
    <div className="flex h-screen flex-col bg-background">
      <AppHeader />
      
      <main className="relative flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
        <div className="relative w-full max-w-sm h-[65vh] sm:h-[70vh] max-h-[600px] flex items-center justify-center">
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
            <div className="text-center text-muted-foreground p-8 bg-card rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">That's everyone for now!</h3>
              <p>Come back later to see new profiles.</p>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-center gap-8 mt-6 w-full max-w-sm sm:max-w-md">
          <Button variant="outline" size="icon" className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-destructive text-destructive shadow-lg" onClick={() => handleSwipe(currentProfile)} disabled={!currentProfile}>
            <X className="w-10 h-10 md:w-12 md:h-12" />
          </Button>
          <Button variant="outline" size="icon" className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-green-500 text-green-500 shadow-lg" onClick={() => handleSwipe(currentProfile)} disabled={!currentProfile}>
            <Heart className="w-10 h-10 md:w-12 md:h-12" />
          </Button>
        </div>
      </main>
      
      <div className="h-16 md:hidden" />
      <BottomNav />
    </div>
  );
}
