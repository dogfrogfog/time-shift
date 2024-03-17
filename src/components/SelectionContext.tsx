import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction
} from "react"

import { useStorage } from "@plasmohq/storage/hook"

const now = new Date()

export const SelectionContext = createContext({
  selectedIndexes: [] as number[],
  setSelectedIndexes: (() => ({})) as Dispatch<SetStateAction<number[]>>,
  selectedDate: now,
  setTzToStorage: (() => ({})) as Dispatch<SetStateAction<string[]>>,
  timezones: [] as string[],
  setSelectedDate: (() => ({})) as Dispatch<SetStateAction<Date>>,
  baselineTime: ""
})

export function SelectionContextProvider({ children }) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(now)

  const [tzStorage, setTzToStorage] = useStorage("saved-tz")
  const timezones = tzStorage || []

  const baselineTime = selectedDate.toLocaleString("en-UK", {
    timeZone: timezones[0]
  })

  return (
    <SelectionContext.Provider
      value={{
        selectedIndexes,
        setSelectedIndexes,
        selectedDate,
        setSelectedDate,
        setTzToStorage,
        timezones,
        baselineTime
      }}>
      {children}
    </SelectionContext.Provider>
  )
}
