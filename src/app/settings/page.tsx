
"use client"

import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AppHeader } from "@/components/app-header";
import { useAuth } from "@/components/auth-provider";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Camera, Loader2, PlusCircle } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

export default function SettingsPage() {
  const [ageRange, setAgeRange] = useState([24, 35]);
  const [distance, setDistance] = useState(50);
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [bio, setBio] = useState("");
  const [photos, setPhotos] = useState<string[]>(Array(6).fill(""));

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
    if (user?.photoURL) {
      const newPhotos = [...photos];
      newPhotos[0] = user.photoURL;
      setPhotos(newPhotos);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
      toast({
        variant: "destructive",
        title: "Sign Out Failed",
        description: "There was an error signing out. Please try again.",
      });
    }
  };

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
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl space-y-8">
           <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Profile & Settings</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>This is how you'll appear to others. Start with your best photos!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Your Photos (1-6)</Label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative aspect-square rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50 overflow-hidden cursor-pointer group">
                      {photo ? (
                        <>
                          <Image src={photo} alt={`Profile photo ${index + 1}`} fill className="object-cover" data-ai-hint="person smiling" />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="h-6 w-6 text-white" />
                          </div>
                        </>
                      ) : (
                        <PlusCircle className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">First Name</Label>
                  <Input id="name" defaultValue={user.displayName?.split(' ')[0] ?? ""} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between items-center">
                    <Label htmlFor="bio">About Me</Label>
                    <span className="text-xs text-muted-foreground">{bio.length} / 300</span>
                 </div>
                <Textarea id="bio" placeholder="A little something about you..." rows={3} maxLength={300} value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>My Basics</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-x-4 gap-y-6">
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger><SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Non-binary">Non-binary</SelectItem>
                      <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent></Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input id="height" placeholder="e.g., 5'10&quot;" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Input id="education" placeholder="e.g., University of Arts" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Job Title</Label>
                  <Input id="occupation" placeholder="e.g., Graphic Designer" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="languages">Languages Spoken</Label>
                  <Input id="languages" placeholder="e.g., English, Spanish" />
                </div>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader><CardTitle>My Lifestyle</CardTitle></CardHeader>
             <CardContent className="grid sm:grid-cols-2 gap-x-4 gap-y-6">
                <div className="space-y-2">
                  <Label>Body Type</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select body type" /></SelectTrigger><SelectContent>
                      <SelectItem value="Slim">Slim</SelectItem>
                      <SelectItem value="Athletic">Athletic</SelectItem>
                      <SelectItem value="Curvy">Curvy</SelectItem>
                      <SelectItem value="Average">Average</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                  </SelectContent></Select>
                </div>
                <div className="space-y-2">
                  <Label>Pets</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger><SelectContent>
                      <SelectItem value="Dog lover">Dog lover</SelectItem>
                      <SelectItem value="Cat owner">Cat owner</SelectItem>
                      <SelectItem value="Has other pets">Has other pets</SelectItem>
                      <SelectItem value="No pets">No pets</SelectItem>
                      <SelectItem value="Wants pets">Wants pets</SelectItem>
                  </SelectContent></Select>
                </div>
                 <div className="space-y-2">
                    <Label>Drinking Habits</Label>
                     <Select><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger><SelectContent>
                        <SelectItem value="Socially">Socially</SelectItem>
                        <SelectItem value="Frequently">Frequently</SelectItem>
                        <SelectItem value="Rarely">Rarely</SelectItem>
                        <SelectItem value="Never">Never</SelectItem>
                    </SelectContent></Select>
                </div>
                 <div className="space-y-2">
                    <Label>Smoking Habits</Label>
                     <Select><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger><SelectContent>
                        <SelectItem value="Socially">Socially</SelectItem>
                        <SelectItem value="Frequently">Frequently</SelectItem>
                        <SelectItem value="Rarely">Rarely</SelectItem>
                        <SelectItem value="Never">Never</SelectItem>
                    </SelectContent></Select>
                </div>
                <div className="space-y-2">
                    <Label>Kids</Label>
                     <Select><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger><SelectContent>
                        <SelectItem value="Has and wants more">Has and wants more</SelectItem>
                        <SelectItem value="Has and doesn't want more">Has and doesn't want more</SelectItem>
                        <SelectItem value="Doesn't have and wants">Doesn't have and wants</SelectItem>
                        <SelectItem value="Doesn't have and doesn't want">Doesn't have and doesn't want</SelectItem>
                    </SelectContent></Select>
                </div>
                <div className="space-y-2">
                    <Label>Zodiac Sign</Label>
                     <Select><SelectTrigger><SelectValue placeholder="Select a sign" /></SelectTrigger><SelectContent>
                        {zodiacSigns.map(sign => <SelectItem key={sign} value={sign}>{sign}</SelectItem>)}
                     </SelectContent></Select>
                </div>
                <div className="space-y-2">
                    <Label>Religion</Label>
                    <Input id="religion" placeholder="Optional" />
                </div>
             </CardContent>
          </Card>
          
           <Card>
             <CardHeader>
                <CardTitle>My Interests</CardTitle>
                <CardDescription>Add some of your hobbies and passions to show who you are.</CardDescription>
             </CardHeader>
             <CardContent>
                <Textarea placeholder="Add interests, separated by commas (e.g. music, fitness, movies)" />
             </CardContent>
          </Card>

           <Button size="lg" className="w-full bg-primary-gradient font-bold text-lg">Save All Changes</Button>

          <Card>
            <CardHeader>
              <CardTitle>Discovery Settings</CardTitle>
              <CardDescription>Control who you see and your location.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>I'm interested in</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>
                        <SelectItem value="Men">Men</SelectItem>
                        <SelectItem value="Women">Women</SelectItem>
                        <SelectItem value="Everyone">Everyone</SelectItem>
                    </SelectContent></Select>
                </div>
                <div className="space-y-2">
                  <Label>I'm looking for</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>
                        <SelectItem value="Long-term">Long-term</SelectItem>
                        <SelectItem value="Casual">Casual</SelectItem>
                        <SelectItem value="Friendship">Friendship</SelectItem>
                        <SelectItem value="Open to anything">Open to anything</SelectItem>
                    </SelectContent></Select>
                </div>
              </div>
               <div className="space-y-2">
                  <Label htmlFor="location">My Location</Label>
                  <Input id="location" placeholder="e.g., San Francisco, CA" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Distance Preference</Label>
                  <span className="text-sm text-muted-foreground">{distance} km</span>
                </div>
                <Slider value={[distance]} onValueChange={(val) => setDistance(val[0])} max={150} step={5} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Age Range</Label>
                  <span className="text-sm text-muted-foreground">{ageRange[0]} - {ageRange[1]}</span>
                </div>
                <Slider value={ageRange} onValueChange={setAgeRange} min={18} max={65} step={1} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>How we can contact you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="new-matches" className="flex-1">New Matches</Label>
                <Switch id="new-matches" defaultChecked />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="new-messages" className="flex-1">New Messages</Label>
                <Switch id="new-messages" defaultChecked />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="promotions" className="flex-1">Promotions</Label>
                <Switch id="promotions" />
              </div>
            </CardContent>
          </Card>
          
          <Separator />
          
          <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={handleSignOut}>Log Out</Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </div>
        </div>
      </main>
      <div className="h-16 md:hidden" />
      <BottomNav />
    </div>
  );
}
