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
  setTzToStorage: (() => ({})) as Dispatch<
    SetStateAction<{ selectedTz: any[] }>
  >,
  timezones: [] as any[],
  setSelectedDate: (() => ({})) as Dispatch<SetStateAction<Date>>
})

export function SelectionContextProvider({ children }) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(now)

  const [tzStorage, setTzToStorage] = useStorage("saved-tz")
  const timezones = tzStorage?.selectedTz.filter(Boolean) || []

  // const baselineTimezone = timezones[0]?.timezone

  return (
    <SelectionContext.Provider
      value={{
        selectedIndexes,
        setSelectedIndexes,
        selectedDate,
        setSelectedDate,
        setTzToStorage,
        timezones
      }}>
      {children}
    </SelectionContext.Provider>
  )
}
