import { ModerationForm } from "@/components/moderation-form";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ModerationPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="User Moderation Tool" subtitle="Review and flag user reports with AI assistance.">
        <Button asChild variant="outline">
          <Link href="/"><ChevronLeft /> Back to App</Link>
        </Button>
      </PageHeader>
      <main className="p-4 md:p-8">
        <ModerationForm />
      </main>
    </div>
  );
}
