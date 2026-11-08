import { useAuth } from "@/modules/auth/context/AuthContext";
import { getFullName, getInitials } from "@/modules/auth/utils/user";

export function Details() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6 sm:gap-6">
      <div
        aria-hidden="true"
        className="flex size-16.5 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand to-brand-strong text-[26px] font-extrabold tracking-tight text-white shadow-[0_0_24px_rgba(239,68,68,0.45)]"
      >
        {getInitials(user)}
      </div>

      <div className="flex min-w-0 flex-col items-start gap-1">
        <h2 className="max-w-full truncate text-xl leading-tight font-bold text-card-foreground">{getFullName(user)}</h2>
        <p className="max-w-full truncate text-[15px] text-muted-foreground">{user.email}</p>
        {user.phoneNumber && (
          <span dir="ltr" className="mt-1 rounded-md border border-info/30 bg-info/10 px-2.5 py-1 text-xs font-bold text-info">
            {user.phoneNumber}
          </span>
        )}
      </div>
    </div>
  );
}
