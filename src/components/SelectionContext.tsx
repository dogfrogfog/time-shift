import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction
} from "react"

const now = new Date()

export const SelectionContext = createContext({
  selectedIndexes: [] as number[],
  setSelectedIndexes: (() => ({})) as Dispatch<SetStateAction<number[]>>,
  selectedDate: now,
  setSelectedDate: (() => ({})) as Dispatch<SetStateAction<Date>>
})

export function SelectionContextProvider({ children }) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(now)

  console.log("selectedDate, setSelectedDate")
  console.log(selectedDate, setSelectedDate)

  return (
    <SelectionContext.Provider
      value={{
        selectedIndexes,
        setSelectedIndexes,
        selectedDate,
        setSelectedDate
      }}>
      {children}
    </SelectionContext.Provider>
  )
}
