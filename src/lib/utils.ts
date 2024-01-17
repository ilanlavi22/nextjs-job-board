import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { UserResource } from "@clerk/types";
import { User } from "@clerk/nextjs/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-") // Replaces spaces with -
    .replace(/[^\w-]+/g, ""); // Removes all non-word characters
}

export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === "admin";
}
