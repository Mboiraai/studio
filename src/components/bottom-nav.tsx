
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Swords, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/discover", icon: Flame, label: "Discover" },
  { href: "/matches", icon: Swords, label: "Matches" },
  { href: "/settings", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="mx-auto flex h-16 items-center justify-around px-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href === '/matches' && pathname.startsWith('/chat'));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-md p-2 text-muted-foreground transition-colors hover:text-primary",
                isActive && "text-primary"
              )}
            >
              <link.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
