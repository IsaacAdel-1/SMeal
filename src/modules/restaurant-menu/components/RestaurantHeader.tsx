import { MapPin, Phone, Soup } from "lucide-react";
import { resolveAssetUrl } from "@/lib/utils";

interface RestaurantHeaderProps {
  name: string;
  description: string | null;
  logoUrl?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
}

export default function RestaurantHeader({ name, description, logoUrl, address, phoneNumber }: RestaurantHeaderProps) {
  const logo = resolveAssetUrl(logoUrl);

  return (
    <div className="flex items-center gap-4 rounded-3xl border border-brand/25 bg-linear-to-r from-brand/10 via-brand/5 to-surface p-4 sm:gap-6 sm:p-6 rtl:bg-linear-to-l">
      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-brand to-brand-strong shadow-[0_8px_24px_rgba(255,59,48,0.35)] sm:size-20">
        {logo ? <img src={logo} alt="" className="size-full object-cover" /> : <Soup className="size-9 text-white" />}
      </div>

      <div className="min-w-0">
        <h2 className="truncate text-2xl font-bold text-foreground">{name}</h2>
        {description && <p className="line-clamp-2 text-info">{description}</p>}
        {(address || phoneNumber) && (
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {address && (
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" /> {address}
              </span>
            )}
            {phoneNumber && (
              <span className="flex items-center gap-1" dir="ltr">
                <Phone className="size-3.5" /> {phoneNumber}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
