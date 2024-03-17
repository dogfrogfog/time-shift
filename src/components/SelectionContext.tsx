import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction
} from "react"

import { useStorage } from "@plasmohq/storage/hook"

export const SelectionContext = createContext({
  selectedIndexes: [] as number[],
  setSelectedIndexes: (() => ({})) as Dispatch<SetStateAction<number[]>>,
  selectedDate: null as any,
  setTzToStorage: (() => ({})) as Dispatch<SetStateAction<string[]>>,
  timezones: [] as string[],
  setSelectedDate: (() => ({})) as Dispatch<SetStateAction<Date>>
})

function createDateWithTimezone() {}

export function SelectionContextProvider({ children }) {
  const [tzStorage, setTzToStorage] = useStorage("saved-tz")
  const timezones = tzStorage || []

  const now = new Date() // new date but for main timezone
  now.setHours(0, 0, 0)

  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(now)

  // take main timezone into account
  const handleSelectedDateChange = (date: Date) => {
    setSelectedDate(date)

    // const
  }

  return (
    <SelectionContext.Provider
      value={{
        selectedIndexes,
        setSelectedIndexes,
        selectedDate,
        setSelectedDate: handleSelectedDateChange,
        setTzToStorage,
        timezones
      }}>
      {children}
    </SelectionContext.Provider>
  )
}
