import { useContext } from "react"

import { SelectionContext } from "./SelectionContext"
import TimezoneCard from "./TimezoneCard"

export default function TimezonesSelection() {
  const { timezones, setTzToStorage } = useContext(SelectionContext)

  const moveUp = (index: number) => {
    const temp = timezones[index]
    timezones[index] = timezones[index - 1]
    timezones[index - 1] = temp
    setTzToStorage({ selectedTz: timezones })
  }

  const moveDown = (index: number) => {
    const temp = timezones[index]
    timezones[index] = timezones[index + 1]
    timezones[index + 1] = temp
    setTzToStorage({ selectedTz: timezones })
  }
  return (
    <div className="flex flex-col text-md gap-2">
      {timezones.map((tz, i) => (
        <TimezoneCard
          moveUp={() => moveUp(i)}
          moveDown={() => moveDown(i)}
          isFirst={i === 0}
          isLast={i === timezones.length - 1}
          key={tz.timezone}
          handleDelete={() => {
            const newTzs = timezones.filter((_, index) => index !== i)

            setTzToStorage({ selectedTz: newTzs })
          }}
          {...tz}
        />
      ))}
    </div>
  )
}
