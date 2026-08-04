import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Approximate USD -> INR conversion used to display catalog prices (stored in USD) as rupees.
export const USD_TO_INR = 83;

export function toINR(usd: number) {
  return Math.round(usd * USD_TO_INR);
}

export function formatINR(usd: number) {
  return toINR(usd).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
}
