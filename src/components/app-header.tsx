import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function AppHeader({ className }: { className?: string }) {
  return (
    <header className={cn("flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-30", className)}>
      <Link href="/discover" className="flex items-center gap-2">
        <Logo className="h-8 w-8" />
        <h1 className="text-xl font-bold tracking-tight bg-primary-gradient text-fill-transparent">
          Linderr
        </h1>
      </Link>
      <ThemeToggle />
    </header>
  );
}
