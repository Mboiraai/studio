import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute inset-0 bg-primary-gradient opacity-10 blur-3xl"></div>
      <div className="relative z-10 flex flex-col items-center text-center">
        <Logo className="mb-6 h-24 w-24" />
        <h1 className="text-5xl font-bold tracking-tight bg-primary-gradient text-fill-transparent md:text-6xl">
          Linderr
        </h1>
        <p className="mt-4 max-w-sm text-lg text-muted-foreground">
          Discover meaningful connections with people nearby. Your next story starts here.
        </p>
        <Button asChild size="lg" className="mt-10 bg-primary-gradient text-primary-foreground font-bold text-lg px-10 py-6 rounded-full shadow-lg transition-transform hover:scale-105">
          <Link href="/discover">
            Start Swiping
          </Link>
        </Button>
      </div>
      <footer className="absolute bottom-4 text-center text-sm text-muted-foreground">
        <p>Ready to find your spark? <Link href="/moderation" className="underline hover:text-primary">Moderation Tool</Link></p>
      </footer>
    </div>
  );
}
