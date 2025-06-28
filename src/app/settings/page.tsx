
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
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [ageRange, setAgeRange] = useState([24, 35]);
  const [distance, setDistance] = useState(50);
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
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
        <div className="mx-auto max-w-3xl space-y-6">
           <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Profile & Settings</h1>
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-center gap-4 p-4 md:p-6">
               <Avatar className="h-24 w-24 sm:h-20 sm:w-20 shrink-0">
                  <AvatarImage src={user.photoURL ?? "https://placehold.co/200x200.png"} data-ai-hint="person smiling" />
                  <AvatarFallback>{user.displayName?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
              </Avatar>
              <div className="w-full text-center sm:text-left">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user.displayName ?? ""} className="text-lg font-semibold" />
              </div>
            </CardHeader>
            <CardContent>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself..." rows={3} />
               <Button className="w-full mt-4">Save Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Discovery Settings</CardTitle>
              <CardDescription>Control who you see.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
