import { useState, type ReactNode } from "react";
import { ChevronRight, KeyRound, UserPen, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ChangePassword from "./ChangePassword";
import PersonalDetails from "./PersonalDetails";

function SettingsDialog({
  titleKey,
  icon: Icon,
  children,
}: {
  titleKey: string;
  icon: LucideIcon;
  children: (close: () => void) => ReactNode;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex w-full items-center justify-between rounded-2xl border border-border bg-surface-raised px-6 py-4 text-start hover:bg-surface-control">
        <span className="flex items-center gap-4">
          <Icon className="size-5 text-brand" />
          <span className="text-[15px] font-bold text-card-foreground">{t(titleKey)}</span>
        </span>
        <ChevronRight className="size-4 text-muted-foreground rtl:rotate-180" />
      </DialogTrigger>

      <DialogContent className="w-full bg-background text-foreground sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{t(titleKey)}</DialogTitle>
          <DialogDescription className="sr-only">{t(titleKey)}</DialogDescription>
        </DialogHeader>
        {children(() => setOpen(false))}
      </DialogContent>
    </Dialog>
  );
}

export function AccountSettings() {
  const { t } = useTranslation();

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h3 className="mb-4 text-sm font-bold text-muted-foreground">{t("accountSettings.title")}</h3>

      <div className="flex flex-col gap-3">
        <SettingsDialog titleKey="accountSettings.items.personalDetails" icon={UserPen}>
          {() => <PersonalDetails />}
        </SettingsDialog>
        <SettingsDialog titleKey="accountSettings.items.changePassword" icon={KeyRound}>
          {(close) => <ChangePassword onDone={close} />}
        </SettingsDialog>
      </div>
    </div>
  );
}
