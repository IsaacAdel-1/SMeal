
import { useRef, useState } from "react";
import { Camera, User } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EditPersonalDetails() {
  const { t } = useTranslation();

  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="w-full bg-background text-foreground">
      <div className="mb-6 flex justify-center">
        <div className="relative">
          <div className="flex size-24 items-center justify-center overflow-hidden rounded-full bg-surface-raised">
            {preview ? (
              <img
                src={preview}
                alt={t("editPersonalDetails.profilePicture")}
                className="size-full object-cover"
              />
            ) : (
              <User className="size-10 text-muted-foreground" />
            )}
          </div>

          <button
            type="button"
            aria-label={t("editPersonalDetails.changeProfilePicture")}
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-brand text-white"
          >
            <Camera className="size-4" />
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onPickImage}
            className="hidden"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="firstName"
            className="text-sm font-semibold text-foreground"
          >
            {t("editPersonalDetails.firstName")}
          </label>

          <input
            id="firstName"
            type="text"
            className="rounded-xl bg-surface-raised px-4 py-3 text-foreground outline-none w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="lastName"
            className="text-sm font-semibold text-foreground"
          >
            {t("editPersonalDetails.lastName")}
          </label>

          <input
            id="lastName"
            type="text"
            className="rounded-xl bg-surface-raised px-4 py-3 text-foreground outline-none"
          />
        </div>
      </div>
    </div>
  );
}
