import Link from "next/link";
import { LinktreeIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Beetlehead Designs. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <Link href="https://linktr.ee/beetleheaddesigns?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGntRTMqpj4ouYNLg9wd-gDlFRJhJJ5nXxIBF3cRKPGm4-e0jyRhymXMk3Jv_o_aem_gP6fteq0jdyaI0nGL4E9Ew" target="_blank" rel="noopener noreferrer">
            <div className="w-10 h-10 rounded border border-border hover:border-primary transition-colors duration-300 flex items-center justify-center">
              <LinktreeIcon className="h-5 w-5" />
              <span className="sr-only">Linktree</span>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
}
