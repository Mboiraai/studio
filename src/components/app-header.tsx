
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./desktop-nav";
import { AuthButton } from "./auth-button";

export function AppHeader({ className }: { className?: string }) {
  return (
    <header className={cn("flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-30", className)}>
      <Link href="/discover" className="flex items-center gap-2">
        <Logo className="h-8 w-8" />
        <h1 className="text-xl font-bold tracking-tight bg-primary-gradient text-fill-transparent hidden sm:block">
          Linderr
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <DesktopNav />
        <AuthButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
