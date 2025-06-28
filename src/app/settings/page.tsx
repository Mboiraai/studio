"use client"

import { BottomNav } from "@/components/bottom-nav";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  const [ageRange, setAgeRange] = useState([24, 35]);
  const [distance, setDistance] = useState(50);

  return (
    <div className="flex h-screen flex-col">
      <PageHeader title="Profile & Settings" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
               <Avatar className="h-20 w-20">
                  <AvatarImage src="https://placehold.co/200x200.png" data-ai-hint="person smiling" />
                  <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Jessica" className="text-lg font-semibold" />
              </div>
            </CardHeader>
            <CardContent>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" defaultValue="Coffee enthusiast and book lover. Looking for my next adventure." />
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
                <div className="flex justify-between">
                  <Label>Distance Preference</Label>
                  <span className="text-muted-foreground">{distance} km</span>
                </div>
                <Slider value={[distance]} onValueChange={(val) => setDistance(val[0])} max={150} step={5} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Age Range</Label>
                  <span className="text-muted-foreground">{ageRange[0]} - {ageRange[1]}</span>
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
              <div className="flex items-center justify-between">
                <Label htmlFor="new-matches">New Matches</Label>
                <Switch id="new-matches" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="new-messages">New Messages</Label>
                <Switch id="new-messages" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="promotions">Promotions</Label>
                <Switch id="promotions" />
              </div>
            </CardContent>
          </Card>
          
          <Separator />
          
          <div className="space-y-2">
              <Button variant="outline" className="w-full">Log Out</Button>
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
      <div className="h-16" />
      <BottomNav />
    </div>
  );
}
