"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/components/auth-provider";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user) {
      router.push('/discover');
    }
  }, [user, loading, router]);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Successful sign-in will trigger the useEffect to redirect.
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: "There was an error signing in with Google. Please try again.",
      });
    }
  };

  if (loading || (!loading && user)) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4 overflow-hidden">
      <div className="absolute inset-0 bg-primary-gradient opacity-10 blur-3xl"></div>
      <div className="relative z-10 flex flex-col items-center text-center">
        <Logo className="mb-6 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24" />
        <h1 className="text-4xl font-bold tracking-tight bg-primary-gradient text-fill-transparent sm:text-5xl md:text-6xl">
          Linderr
        </h1>
        <p className="mt-4 max-w-xs text-base text-muted-foreground sm:text-lg md:max-w-md">
          Discover meaningful connections with people nearby. Your next story starts here.
        </p>
        <Button
          onClick={handleSignIn}
          size="lg"
          className="mt-10 bg-primary-gradient text-primary-foreground font-bold text-lg px-8 py-5 sm:px-10 sm:py-6 rounded-full shadow-lg transition-transform hover:scale-105"
        >
          Get Started Free
        </Button>
      </div>
      <footer className="absolute bottom-4 text-center text-sm text-muted-foreground">
        <p>Ready to find your spark? <Link href="/moderation" className="underline hover:text-primary">Moderation Tool</Link></p>
      </footer>
    </div>
  );
}
