
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Swords, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/discover", icon: Flame, label: "Discover" },
  { href: "/matches", icon: Swords, label: "Matches" },
  { href: "/settings", icon: User, label: "Profile" },
];

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href === '/matches' && pathname.startsWith('/chat'));
          return (
            <Button key={link.href} asChild variant={isActive ? "secondary" : "ghost"} size="sm">
              <Link
                href={link.href}
                className="flex items-center gap-2"
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            </Button>
          );
        })}
    </nav>
  );
}
