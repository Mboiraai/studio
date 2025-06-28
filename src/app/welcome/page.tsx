'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldAlert } from 'lucide-react';
import { AppHeader } from '@/components/app-header';

export default function WelcomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
         <main className="flex-1 flex items-center justify-center p-4">
            <Card className="w-full max-w-md text-center shadow-lg">
                <CardHeader>
                    <div className="mx-auto bg-destructive/20 rounded-full p-4 w-fit">
                      <ShieldAlert className="h-12 w-12 text-destructive" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-destructive">Access Denied</CardTitle>
                    <CardDescription className="text-muted-foreground text-lg">
                        You must be logged in to view this page.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button asChild size="lg" className="w-full">
                        <Link href="/">Go to Login</Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
        <AppHeader />
        <main className="flex-1 flex items-center justify-center p-4">
            <Card className="w-full max-w-md text-center shadow-lg animate-in fade-in zoom-in-95">
                <CardHeader>
                    <div className="mx-auto mb-4">
                        <Image 
                            src={user.photoURL ?? 'https://placehold.co/100x100.png'} 
                            alt={user.displayName ?? 'User'} 
                            width={100} 
                            height={100} 
                            className="rounded-full border-4 border-primary"
                            data-ai-hint="person portrait"
                        />
                    </div>
                    <CardTitle className="text-3xl font-bold">Welcome, {user.displayName?.split(' ')[0] ?? 'Friend'}!</CardTitle>
                    <CardDescription className="text-muted-foreground text-lg">
                        You're all set to find your spark.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Your profile is ready. You can customize it anytime in the settings. Let's start discovering new people!</p>
                </CardContent>
                <CardFooter>
                    <Button asChild size="lg" className="w-full bg-primary-gradient font-bold">
                        <Link href="/discover">Start Discovering</Link>
                    </Button>
                </CardFooter>
            </Card>
        </main>
    </div>
  );
}
