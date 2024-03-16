import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// gpt generated
export function sortHoursArray(currentDate) {
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23
  ]

  // Extract current hour from the provided date
  const currentHour = currentDate.getHours()

  // Find the index of the current hour in the hours array
  const currentIndex = hours.indexOf(currentHour)

  // Calculate the number of hours to shift to make the current hour first
  const shift = -currentIndex

  // Create a new array with hours shifted appropriately
  const sortedHours = []
  for (let i = 0; i < hours.length; i++) {
    const newIndex = (i + shift + hours.length) % hours.length
    sortedHours[newIndex] = hours[i]
  }

  return sortedHours
}
