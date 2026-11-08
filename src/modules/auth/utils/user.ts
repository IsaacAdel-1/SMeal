import type { User } from "../types";

export function getInitials(user: Pick<User, "firstName" | "lastName"> | null | undefined) {
  return `${user?.firstName?.trim()[0] ?? ""}${user?.lastName?.trim()[0] ?? ""}`.toUpperCase();
}

export function getFullName(user: Pick<User, "firstName" | "lastName"> | null | undefined) {
  return [user?.firstName, user?.lastName].filter(Boolean).join(" ");
}
