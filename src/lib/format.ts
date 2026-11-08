import i18n from "@/i18n";

const isArabic = () => (i18n.resolvedLanguage ?? i18n.language)?.startsWith("ar");
const locale = () => (isArabic() ? "ar-EG-u-nu-latn" : "en-GB");

/** Parses API dates; values without a time zone are UTC on the server. */
export function parseApiDate(date: string | Date) {
  if (date instanceof Date) return date;
  const hasZone = /(Z|[+-]\d{2}:?\d{2})$/i.test(date);
  const trimmed = date.replace(/(\.\d{3})\d+/, "$1");
  return new Date(hasZone ? trimmed : `${trimmed}Z`);
}

export function formatDate(date: string | Date): string {
  const parsed = parseApiDate(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString(locale(), { day: "numeric", month: "short", year: "numeric" });
}

export function formatDateTime(date: string | Date): string {
  const parsed = parseApiDate(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleString(locale(), {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat(isArabic() ? "ar-EG-u-nu-latn" : "en-EG", {
    style: "currency",
    currency: "EGP",
  }).format(Number.isFinite(amount) ? amount : 0);
}
