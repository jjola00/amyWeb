import Link from "next/link";
import { LinktreeIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Beetlehead Designs. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon">
              <LinktreeIcon className="h-5 w-5" />
              <span className="sr-only">Linktree</span>
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
