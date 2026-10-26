import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export default function Pagination({ currentPage, totalPages, onPageChange, disabled = false }: PaginationProps) {
  if (totalPages <= 1) return null;

  const visiblePages = new Set([1, totalPages]);
  for (let page = Math.max(1, currentPage - 1); page <= Math.min(totalPages, currentPage + 1); page += 1) {
    visiblePages.add(page);
  }
  const pages = [...visiblePages].sort((a, b) => a - b);
  const entries: (number | "gap")[] = [];
  pages.forEach((page, index) => {
    if (index > 0 && page - pages[index - 1] > 1) entries.push("gap");
    entries.push(page);
  });

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1">
      <Button aria-label="Previous page" variant="outline" size="icon" disabled={disabled || currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
        <ChevronLeft className="rtl:rotate-180" />
      </Button>
      {entries.map((entry, index) => entry === "gap" ? (
        <span key={`gap-${index}`} aria-hidden="true" className="px-2 text-muted-foreground">...</span>
      ) : (
        <Button key={entry} aria-label={`Page ${entry}`} aria-current={entry === currentPage ? "page" : undefined} variant={entry === currentPage ? "default" : "outline"} disabled={disabled || entry === currentPage} onClick={() => onPageChange(entry)}>
          {entry}
        </Button>
      ))}
      <Button aria-label="Next page" variant="outline" size="icon" disabled={disabled || currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>
        <ChevronRight className="rtl:rotate-180" />
      </Button>
    </nav>
  );
}
