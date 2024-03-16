import { useThrottle } from "@uidotdev/usehooks"
import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction
} from "react"

export const SelectionContext = createContext({
  selectedIndexes: [] as number[],
  setSelectedIndexes: (() => ({})) as Dispatch<SetStateAction<number[]>>
})

export function SelectionContextProvider({ children }) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const throttledValue = useThrottle(selectedIndexes, 50)

  return (
    <SelectionContext.Provider
      value={{ selectedIndexes: throttledValue, setSelectedIndexes }}>
      {children}
    </SelectionContext.Provider>
  )
}
