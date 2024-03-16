import { TrashIcon } from "@radix-ui/react-icons"

// import { useQuery } from "@tanstack/react-query"
// import { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

// import { fetchSavedTz } from "~lib/api"

import { Button } from "./Button"
import ControlBar from "./ControlBar"
import { DatePicker } from "./DatePicker"
import { SelectionContextProvider } from "./SelectionContext"
import TimezonesSelection from "./TimezonesSelection"

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
  // const { data, status } = useQuery({
  //   queryKey: ["saved-tz", ...selectedTimezones],
  //   queryFn: () => fetchSavedTz(selectedTimezones)
  // })

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
    <SelectionContextProvider>
      <div className="bg-gray-200 w-[800px] min-h-[450px]">
        <div className="p-2">
          <ControlBar tzs={tzs} saveTz={saveTz} />
          <div className="my-4 flex justify-between items-center">
            <div className="flex gap-2">
              {/* <p>Saved timezones: {tzs.length || 0}</p> */}
              <DatePicker />
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

          <TimezonesSelection
            tzs={tzs}
            moveUp={moveUp}
            moveDown={moveDown}
            setTzToStorage={setTzToStorage}
          />
        </div>
      </div>
    </SelectionContextProvider>
  )
}
