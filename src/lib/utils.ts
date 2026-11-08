import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BASE_URL } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Compares two ids (GUIDs / user ids) ignoring letter case. */
export function sameId(a?: string | null, b?: string | null) {
  return !!a && !!b && a.toLowerCase() === b.toLowerCase();
}

/** Turns a relative file path returned by the API into an absolute URL. */
export function resolveAssetUrl(url?: string | null) {
  if (!url) return null;
  if (/^(https?:|data:|blob:)/i.test(url)) return url;
  return `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}
