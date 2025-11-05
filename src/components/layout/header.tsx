"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/shop', label: 'Shop' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label }: { href: string, label: string }) => {
    const isActive = (pathname === '/' && href === '/') || (href !== '/' && pathname.startsWith(href));
    return (
      <Link
        href={href}
        onClick={() => setIsMobileMenuOpen(false)}
        className={cn(
          "text-lg font-medium transition-colors hover:text-primary",
          isActive ? "text-primary font-bold" : "text-muted-foreground"
        )}
      >
        {label}
      </Link>
    );
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Sprout className="h-7 w-7 text-accent" />
          <span className="font-headline text-2xl font-bold">Beetlehead Designs</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                  <Sprout className="h-7 w-7 text-accent" />
                  <span className="font-headline text-xl font-bold">Beetlehead Designs</span>
                </Link>
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
