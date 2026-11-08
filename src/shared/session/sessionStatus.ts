export const SessionStatus = {
  Open: 0,
  Closed: 1,
  Ordered: 2,
  Arrived: 3,
  InvoiceReady: 4,
  Completed: 5,
} as const;

export type SessionStatusValue = (typeof SessionStatus)[keyof typeof SessionStatus];

const FALLBACK_LABELS: Record<number, string> = {
  0: "Open",
  1: "Closed",
  2: "Ordered",
  3: "Arrived",
  4: "Invoice ready",
  5: "Completed",
};

export function getSessionStatusLabel(status: number): string {
  return FALLBACK_LABELS[status] ?? "Unknown";
}
