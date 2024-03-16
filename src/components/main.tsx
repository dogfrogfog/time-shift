import { TrashIcon } from "@radix-ui/react-icons"
import { useContext } from "react"

// import { useQuery } from "@tanstack/react-query"
// import { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

// import { fetchSavedTz } from "~lib/api"

import { Button } from "./Button"
import ControlBar from "./ControlBar"
import { DatePicker } from "./DatePicker"
import { SelectionContext } from "./SelectionContext"
import TimezonesSelection from "./TimezonesSelection"

export default function Main() {
  const { timezones, setTzToStorage } = useContext(SelectionContext)

  // const selectedTimezones: string[] = timezones.map((v) => v.timezone)
  // const { data, status } = useQuery({
  //   queryKey: ["saved-tz", ...selectedTimezones],
  //   queryFn: () => fetchSavedTz(selectedTimezones)
  // })

  return (
    <div className="bg-gray-200 w-[800px] min-h-[450px]">
      <div className="p-2">
        <ControlBar />
        <div className="my-4 flex justify-between items-center">
          <div className="flex gap-2">
            {/* <p>Saved timezones: {tzs.length || 0}</p> */}
            <DatePicker />
          </div>
          <div>
            <Button
              className=""
              disabled={!timezones.length}
              styleName={"danger"}
              onClick={() => setTzToStorage({ selectedTz: [] })}>
              <TrashIcon /> Delete all
            </Button>
          </div>
        </div>

        <TimezonesSelection />
      </div>
    </div>
  )
}
