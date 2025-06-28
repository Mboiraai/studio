import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <svg
    className={cn("text-primary", className)}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Linderr Logo"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "hsl(var(--primary))" }} />
        <stop offset="100%" style={{ stopColor: "#A044FF" }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#logoGradient)"
      d="M12 2C8.13 2 5 5.13 5 9c0 4.17 4.42 9.92 6.24 12.11a1 1 0 001.52 0C14.58 18.92 19 13.17 19 9c0-3.87-3.13-7-7-7zm0 11.5a4.5 4.5 0 01-4.5-4.5A4.5 4.5 0 0112 4.5a4.5 4.5 0 014.5 4.5A4.5 4.5 0 0112 13.5z"
    />
    <path
      fill="hsl(var(--primary-foreground))"
      d="M12 6.41c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m0-2.5c-1.48 0-2.75.81-3.45 2.03-.23.4-.1.88.31 1.11.41.23.9.1 1.11-.31.45-.81 1.28-1.33 2.23-1.33s1.78.52 2.23 1.33c.21.41.69.64 1.11.31.4-.23.64-.71.31-1.11C14.75 4.72 13.48 3.91 12 3.91z"
    />
  </svg>
);
