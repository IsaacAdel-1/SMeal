
import { Soup } from "lucide-react";

interface RestaurantHeaderProps {
  name: string;
  description: string;
  logoUrl?: string | null;
}

export default function RestaurantHeader({
  name,
  description,
  logoUrl,
}: RestaurantHeaderProps) {
  return (
    <div className="flex items-center gap-6 rounded-3xl border border-brand/25 bg-linear-to-r from-brand/10 via-brand/5 to-surface p-6">
      <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-brand to-brand-strong shadow-[0_8px_24px_rgba(255,59,48,0.35)]">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={name}
            className="size-full object-cover"
          />
        ) : (
          <Soup className="size-9 text-white" />
        )}
      </div>

      <div className="min-w-0">
        <h1 className="truncate text-2xl font-bold text-foreground">
          {name}
        </h1>
        <p className="truncate text-info">{description}</p>
      </div>
    </div>
  );
}
