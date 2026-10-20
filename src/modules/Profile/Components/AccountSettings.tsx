
import { ChevronRight, KeyRound, ShieldHalf, UserPen } from "lucide-react";
import { useTranslation } from "react-i18next";
import EditPersonalDetails from "./EditPersonalDetails";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import ChangePassword from "./ChangePassword";

const items = [
  {
    key: "editPersonalDetails",
    icon: UserPen,
    content: <EditPersonalDetails />,
  },
  {
    key: "changePassword",
    icon: KeyRound,
    content: <ChangePassword />,
  },
  {
    key: "securityPrivacy",
    icon: ShieldHalf,
    content: "",
  },
];

export function AccountSettings() {
  const { t } = useTranslation();

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h4 className="mb-4 text-sm font-bold text-muted-foreground">
        {t("accountSettings.title")}
      </h4>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <Dialog key={item.key}>
            <form>
              <DialogTrigger className="w-full">
                <div className="flex items-center w-full justify-between rounded-2xl border border-border bg-surface-raised px-6 py-4">
                  <div className="flex items-center gap-4">
                    <item.icon className="size-5 fill-brand/90 text-brand" />
                    <span className="text-[15px] font-bold text-card-foreground">
                      {t(`accountSettings.items.${item.key}`)}
                    </span>
                  </div>

                  <ChevronRight className="size-4 text-muted-foreground" />
                </div>
              </DialogTrigger>

              <DialogContent className="sm:max-w-sm bg-background text-foreground w-full">
                {item.content}

                <DialogFooter className="bg-background text-foreground">
                  <DialogClose asChild>
                    <Button variant="outline">
                      {t("common.cancel")}
                    </Button>
                  </DialogClose>

                  <Button type="submit">
                    {t("common.saveChanges")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
