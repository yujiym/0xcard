import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const wait = (msec: number) =>
  new Promise(resolve => setTimeout(resolve, msec))

export const copyClipboard = async (str: string) => {
  navigator.clipboard.writeText(str)
}
