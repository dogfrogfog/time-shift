import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const defaultHours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23
]

// gpt generated
export function sortHoursArray(timezoneTime: string) {
  const hoursRegExp = /\b(\d{2}):/
  const match = timezoneTime.match(hoursRegExp)

  const currentHour = parseInt(match[1])

  // console.log(timezoneTime, currentHour)

  // Find the index of the current hour in the hours array
  const currentIndex = defaultHours.indexOf(currentHour)

  // Calculate the number of hours to shift to make the current hour first
  const shift = -currentIndex

  // Create a new array with hours shifted appropriately
  const sortedHours = []
  for (let i = 0; i < defaultHours.length; i++) {
    const newIndex = (i + shift + defaultHours.length) % defaultHours.length
    sortedHours[newIndex] = defaultHours[i]
  }

  return sortedHours
}
