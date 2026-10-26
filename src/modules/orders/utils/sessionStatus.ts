export const SessionStatus = {
  Open: 0,
  Closed: 1,
  Ordered: 2,
  Arrived: 3,
  InvoiceReady: 4,
  Completed: 5,
} as const;

export function getSessionStatusLabel(status: number): string {
  switch (status) {
    case SessionStatus.Open: return "Open";
    case SessionStatus.Closed: return "Closed";
    case SessionStatus.Ordered: return "Ordered";
    case SessionStatus.Arrived: return "Arrived";
    case SessionStatus.InvoiceReady: return "Invoice ready";
    case SessionStatus.Completed: return "Completed";
    default: return "Unknown";
  }
}
