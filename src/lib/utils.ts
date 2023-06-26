import { JournalEntry } from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(entry: JournalEntry): string {
  // turn the `createdAt` value into a formatted date string
  return new Date(entry.createdAt).toDateString()
}
