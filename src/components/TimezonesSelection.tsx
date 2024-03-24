import { useContext } from "react"

import { SelectionContext } from "./SelectionContext"
import TimezoneCard from "./TimezoneCard"

export default function TimezonesSelection() {
  const { timezones, setTzToStorage } = useContext(SelectionContext)

  let tzs = [...timezones]
  const moveUp = (index: number) => {
    const temp = tzs[index]
    tzs[index] = tzs[index - 1]
    tzs[index - 1] = temp

    setTzToStorage(tzs)
  }

  const moveDown = (index: number) => {
    const temp = tzs[index]
    tzs[index] = tzs[index + 1]
    tzs[index + 1] = temp
    setTzToStorage(tzs)
  }

  return (
    <div className="flex flex-col text-md gap-2">
      {timezones.map((tz, i) => (
        // @ts-ignore
        <TimezoneCard
          moveUp={() => moveUp(i)}
          moveDown={() => moveDown(i)}
          isFirst={i === 0}
          isLast={i === timezones.length - 1}
          timezone={tz}
          key={tz}
          handleDelete={() => {
            const newTzs = timezones.filter((_, index) => index !== i)

            setTzToStorage(newTzs)
          }}
        />
      ))}
    </div>
  )
}
