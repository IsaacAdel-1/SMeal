
import Cookies from "js-cookie";
const getInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export function Details() {
  const raw = Cookies.get("user");
  const user = raw ? JSON.parse(raw) : null;
  if (!user) return null;

  const initial = getInitials(`${user.firstName} ${user.lastName}`);

  return (
    <div className="flex items-center gap-6 rounded-3xl border border-border bg-card px-6 py-6">
      {/* Avatar */}
      <div
        aria-hidden="true"
        className="flex size-16.5 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand to-brand-strong text-[26px] font-extrabold tracking-tight text-white shadow-[0_0_24px_rgba(239,68,68,0.45)]"
      >
        {initial}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-col items-start gap-1">
        <h3 className="truncate text-xl font-bold leading-tight text-card-foreground">
          {user.firstName + " " + user.lastName}
        </h3>

        <p className="truncate text-[15px] text-muted-foreground">
          {user.email}
        </p>

        <span className="mt-1 rounded-md border border-info/30 bg-info/10 px-2.5 py-1 text-xs font-bold text-info">
          {user.phoneNumber}
        </span>
      </div>
    </div>
  );
}
