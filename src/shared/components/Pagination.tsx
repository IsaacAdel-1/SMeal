import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  /** When given, a "Showing x–y of z" line is rendered above the buttons. */
  totalCount?: number;
  pageSize?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  totalCount,
  pageSize,
}: PaginationProps) {
  const { t } = useTranslation();

  const summary =
    totalCount !== undefined && pageSize && totalCount > 0
      ? t("common.showing", {
          from: (currentPage - 1) * pageSize + 1,
          to: Math.min(currentPage * pageSize, totalCount),
          total: totalCount,
        })
      : null;

  if (totalPages <= 1) {
    return summary ? <p className="text-sm text-muted-foreground">{summary}</p> : null;
  }

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
    <div className="flex flex-col items-center gap-3">
      {summary && <p className="self-start text-sm text-muted-foreground">{summary}</p>}
      <nav aria-label={t("common.pagination")} className="flex flex-wrap items-center justify-center gap-1">
        <Button
          aria-label={t("common.previousPage")}
          variant="outline"
          size="icon"
          disabled={disabled || currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="rtl:rotate-180" />
        </Button>
        {entries.map((entry, index) =>
          entry === "gap" ? (
            <span key={`gap-${index}`} aria-hidden="true" className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <Button
              key={entry}
              aria-label={t("common.page", { page: entry })}
              aria-current={entry === currentPage ? "page" : undefined}
              variant={entry === currentPage ? "default" : "outline"}
              className="min-w-8"
              disabled={disabled}
              onClick={() => entry !== currentPage && onPageChange(entry)}
            >
              {entry}
            </Button>
          ),
        )}
        <Button
          aria-label={t("common.nextPage")}
          variant="outline"
          size="icon"
          disabled={disabled || currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="rtl:rotate-180" />
        </Button>
      </nav>
    </div>
  );
}
