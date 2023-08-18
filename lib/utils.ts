import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import prismadb from "./prismadb";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: 'currency',
  currency: 'USD'
})

export function isLastDayOfMonth(): boolean {
  const today = new Date();
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return today.getDate() === endOfMonth.getDate();
}


  

