import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: '+02:00'
})
export const formatDateFromMs = (ms: number) => dateFormatter.format(ms)
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
