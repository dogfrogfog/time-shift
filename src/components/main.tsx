import { TrashIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { fetchSavedTz } from "~lib/api"

import { Button } from "./Button"
import ControlBar from "./ControlBar"
import { DatePickerDemo } from "./DatePicker"
import SelectionArea from "./SelectionArea"
import TimezoneCard from "./TimezoneCard"

export default function Main() {
  const [tzStorage, setTzToStorage] = useStorage("saved-tz")
  const tzs = tzStorage?.selectedTz.filter(Boolean) || []

  const saveTz = async (value: string) => {
    const response = await fetch(
      `http://worldtimeapi.org/api/timezone/${value}`
    )

    const data = await response.json()

    setTzToStorage({ selectedTz: tzs.concat([data]) })
  }

  const selectedTimezones: string[] = tzs.map((v) => v.timezone)

  const { data, status } = useQuery({
    queryKey: ["saved-tz", ...selectedTimezones],
    queryFn: () => fetchSavedTz(selectedTimezones)
  })

  const moveUp = (index: number) => {
    const temp = tzs[index]
    tzs[index] = tzs[index - 1]
    tzs[index - 1] = temp
    setTzToStorage({ selectedTz: tzs })
  }

  const moveDown = (index: number) => {
    const temp = tzs[index]
    tzs[index] = tzs[index + 1]
    tzs[index + 1] = temp
    setTzToStorage({ selectedTz: tzs })
  }

  return (
    <div className="bg-gray-200 w-[800px]">
      <div className="p-2">
        <ControlBar tzs={tzs} saveTz={saveTz} />
        <div className="my-4 flex justify-between items-center">
          <div className="flex gap-2">
            {/* <p>Saved timezones: {tzs.length || 0}</p> */}
            <DatePickerDemo />
          </div>
          <div>
            <Button
              className=""
              disabled={!tzs.length}
              styleName={"danger"}
              onClick={() => setTzToStorage({ selectedTz: [] })}>
              <TrashIcon /> Delete all
            </Button>
          </div>
        </div>

        {/* <SelectionArea id="ytimezone-id" items={Array(24).fill(1)} /> */}

        <div className="flex flex-col text-md gap-2">
          {tzs.map((tz, i) => (
            <TimezoneCard
              moveUp={() => moveUp(i)}
              moveDown={() => moveDown(i)}
              isFirst={i === 0}
              isLast={i === tzs.length - 1}
              key={tz.timezone}
              handleDelete={() => {
                const newTzs = tzs.filter((_, index) => index !== i)

                setTzToStorage({ selectedTz: newTzs })
              }}
              {...tz}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
