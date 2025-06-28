import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, children, className, ...props }: PageHeaderProps) {
  return (
    <header className={cn("flex items-center justify-between p-4 border-b md:p-6", className)} {...props}>
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="text-sm md:text-base text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        {children}
        <ThemeToggle />
      </div>
    </header>
  );
}
