import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePrice(year: number) {
  if (Date.now() - year < 0) {
    return "Pre-order";
  } else if (new Date().getFullYear() - year < 2) {
    return 70;
  } else if (new Date().getFullYear() - year < 5) {
    return 50;
  } else if (new Date().getFullYear() - year < 10) {
    return 30;
  } else {
    return 10;
  }
}
