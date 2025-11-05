"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ArtworkCategory } from "@/types";

interface FilterControlsProps {
  categories: ['All', ...ArtworkCategory[]];
  activeFilter: 'All' | ArtworkCategory;
  onFilterChange: (category: 'All' | ArtworkCategory) => void;
}

export function FilterControls({ categories, activeFilter, onFilterChange }: FilterControlsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeFilter === category ? "default" : "secondary"}
          onClick={() => onFilterChange(category)}
          className={cn(
            "transition-all duration-200",
            activeFilter === category && "bg-primary text-primary-foreground scale-105"
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
