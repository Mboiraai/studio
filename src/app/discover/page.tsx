
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
import { collection, getDocs, query, where, limit, doc, getDoc, setDoc, serverTimestamp, writeBatch } from "firebase/firestore";
import { differenceInYears } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function DiscoverPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentUserProfile, setCurrentUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchCurrentUserProfile = async () => {
        if (user) {
            const profileDoc = await getDoc(doc(db, 'profiles', user.uid));
            if (profileDoc.exists()) {
                setCurrentUserProfile({ id: user.uid, ...profileDoc.data() } as Profile);
            }
        }
    };
    fetchCurrentUserProfile();
  }, [user]);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (user) {
        setLoading(true);
        try {
          const profilesCollection = collection(db, 'profiles');
          // Limit to 20 profiles for faster initial load
          const q = query(profilesCollection, where('__name__', '!=', user.uid), limit(20));
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


  const handleSwipe = (swipedProfileId: string) => {
    if (!swipedProfileId) return;
    setProfiles((prevProfiles) =>
      prevProfiles.filter((p) => p.id !== swipedProfileId)
    );
  };
  
  const handleLike = async (likedProfile: Profile) => {
    if (!user || !currentUserProfile || !likedProfile) return;

    handleSwipe(likedProfile.id);

    const batch = writeBatch(db);
    const likeRef = doc(db, `users/${user.uid}/likes`, likedProfile.id);
    batch.set(likeRef, { likedAt: serverTimestamp() });

    await batch.commit();

    // Check for a match
    const otherUserLikeRef = doc(db, `users/${likedProfile.id}/likes`, user.uid);
    const otherUserLikeDoc = await getDoc(otherUserLikeRef);

    if (otherUserLikeDoc.exists()) {
        toast({
            title: "It's a Match! 🎉",
            description: `You and ${likedProfile.name} have liked each other.`,
        });

        const chatId = [user.uid, likedProfile.id].sort().join('_');
        const chatRef = doc(db, 'chats', chatId);

        await setDoc(chatRef, {
            participants: [user.uid, likedProfile.id],
            participantInfo: {
                [user.uid]: {
                    name: currentUserProfile.name,
                    avatar: currentUserProfile.images?.[0] || '',
                },
                [likedProfile.id]: {
                    name: likedProfile.name,
                    avatar: likedProfile.images?.[0] || '',
                },
            },
            createdAt: serverTimestamp(),
        }, { merge: true });
    }
  };

  const handleNope = async (nopedProfile: Profile) => {
     if (!user || !nopedProfile) return;
     handleSwipe(nopedProfile.id);
     // Optionally, you can record the "nope" to prevent seeing them again.
     // For now, we just remove them from the current session.
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
                onSwipe={() => handleSwipe(profile.id)}
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
          <Button variant="outline" size="icon" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-destructive text-destructive shadow-lg" onClick={() => handleNope(currentProfile)} disabled={!currentProfile || loading}>
            <X className="w-8 h-8 md:w-10 md:h-10" />
          </Button>
          <Button variant="outline" size="icon" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-green-500 text-green-500 shadow-lg" onClick={() => handleLike(currentProfile)} disabled={!currentProfile || loading}>
            <Heart className="w-8 h-8 md:w-10 md:h-10" />
          </Button>
        </div>
      </main>
      
      <div className="h-16 md:hidden" />
      <BottomNav />
    </div>
  );
}
