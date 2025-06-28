
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Loader2 } from "lucide-react";
import { Profile } from "@/lib/types";
import { ProfileCard } from "@/components/profile-card";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { differenceInYears } from "date-fns";

export default function DiscoverPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (user) {
        setLoading(true);
        try {
          const profilesCollection = collection(db, 'profiles');
          const q = query(profilesCollection, where('__name__', '!=', user.uid));
          const querySnapshot = await getDocs(q);
          
          const fetchedProfiles: Profile[] = querySnapshot.docs
            .map(doc => {
              const data = doc.data();
              let age = 0;
              if (data.dob) {
                  try {
                      age = differenceInYears(new Date(), new Date(data.dob));
                  } catch (e) {
                      console.error("Could not parse date of birth:", data.dob);
                  }
              }
              return {
                id: doc.id,
                name: data.name || 'User',
                age: age,
                bio: data.bio || '',
                images: data.images && data.images.length > 0 ? data.images.filter((img: string) => img) : [],
                interests: data.interests || [],
                occupation: data.occupation,
                education: data.education,
                height: data.height,
                zodiac: data.zodiac,
                lookingFor: data.lookingFor,
              } as Profile;
            })
            .filter(p => p.images.length > 0);

          setProfiles(fetchedProfiles.sort(() => Math.random() - 0.5));
        } catch (error) {
          console.error("Error fetching profiles: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (user) {
      fetchProfiles();
    }
  }, [user]);


  const handleSwipe = (swipedProfile: Profile) => {
    if (!swipedProfile) return;
    setProfiles((prevProfiles) =>
      prevProfiles.filter((p) => p.id !== swipedProfile.id)
    );
  };
  
  const currentProfile = profiles[profiles.length - 1];

  if (authLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <AppHeader />
      
      <main className="relative flex-1 flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 overflow-hidden">
        <div className="relative w-full max-w-sm flex-1 flex items-center justify-center mb-4">
          {loading ? (
             <Loader2 className="h-8 w-8 animate-spin" />
          ) : profiles.length > 0 ? (
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
        
        <div className="flex items-center justify-center gap-8 w-full max-w-sm sm:max-w-md">
          <Button variant="outline" size="icon" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-destructive text-destructive shadow-lg" onClick={() => handleSwipe(currentProfile)} disabled={!currentProfile || loading}>
            <X className="w-8 h-8 md:w-10 md:h-10" />
          </Button>
          <Button variant="outline" size="icon" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-green-500 text-green-500 shadow-lg" onClick={() => handleSwipe(currentProfile)} disabled={!currentProfile || loading}>
            <Heart className="w-8 h-8 md:w-10 md:h-10" />
          </Button>
        </div>
      </main>
      
      <div className="h-16 md:hidden" />
      <BottomNav />
    </div>
  );
}
