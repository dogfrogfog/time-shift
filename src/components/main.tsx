import { TrashIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { fetchSavedTz } from "~lib/api"

import { Button } from "./Button"
import ControlBar from "./ControlBar"
import { DatePickerDemo } from "./DatePicker"
import TimezoneCard from "./TimezoneCard"

export default function Main() {
  const [tzStorage, setTzToStorage] = useStorage("saved-tz")

  const saveTz = async (value: string) => {
    const response = await fetch(
      `http://worldtimeapi.org/api/timezone/${value}`
    )

    const data = await response.json()
    const current = tzStorage?.selectedTz || []

    setTzToStorage({ selectedTz: current.concat([data]) })
  }

  const selectedTimezones: string[] =
    tzStorage?.selectedTz?.map((v) => v.timezone) || []

  const { data, status } = useQuery({
    queryKey: ["saved-tz", ...selectedTimezones],
    queryFn: () => fetchSavedTz(selectedTimezones)
  })

  // for (const tz of data || []) {
  console.log(data)
  //   // console.log(new Date(tz.datetime).getTimezoneOffset())
  // }

  return (
    <div className="w-[600px] h-[400px] bg-gray-200">
      <div className="p-2">
        <ControlBar tzStorage={tzStorage} saveTz={saveTz} />
        <div className="my-4 flex justify-between items-center">
          <div className="flex gap-2">
            {/* <p>Saved timezones: {tzStorage?.selectedTz?.length || 0}</p> */}
            <DatePickerDemo />
          </div>
          <div>
            <Button
              className=""
              disabled={!tzStorage?.selectedTz?.length}
              styleName={"danger"}
              onClick={() => setTzToStorage({ selectedTz: [] })}>
              <TrashIcon /> Delete all
            </Button>
          </div>
        </div>
        <div className="flex flex-col text-md gap-2">
          {tzStorage?.selectedTz?.map((tz) => (
            <TimezoneCard key={tz.datetime} {...tz} />
          ))}
        </div>
      </div>
    </div>
  )
}
