import Link from "next/link"
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

  const googleMeetParams = new URLSearchParams({
    text: "[TOPIC]",
    details: "Multiple timezones meeting."
    // thread/81344786
  }).toString()
  const googleMeetUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?${googleMeetParams}`

  // https://calendar.google.com/calendar/u/0/r/eventedit?text=Example+Google+Calendar+Event&details=More+help+see:+https://support.google.com/calendar/thread/81344786&dates=20201231T160000/20201231T170000&recur=RRULE:FREQ%3DWEEKLY;UNTIL%3D20210603&ctz=America/Toronto
  return (
    <div className="bg-gray-200 w-[800px] min-h-[450px]">
      <div className="p-2">
        <ControlBar />
        <div className="my-2 flex justify-between items-center">
          {/* <div className="flex gap-2"> */}
          {/* <p>Saved timezones: {tzs.length || 0}</p> */}
          <DatePicker />

          <div className=" space-x-2">
            <Link
              href="/"
              className="bg-white p-2 rounded hover:text-white hover:bg-yellow-400 transition-all">
              Google Meet
            </Link>
            <Link
              href="/"
              className="bg-white p-2 rounded hover:bg-[#3e3e78] hover:text-white transition-all">
              MS Teams
            </Link>
          </div>
          {/* </div> */}
          {/* <div>
            <Button
              className=""
              disabled={!timezones.length}
              styleName={"danger"}
              onClick={() => setTzToStorage([])}>
              <TrashIcon /> Delete all
            </Button>
          </div> */}
        </div>

        <TimezonesSelection />
      </div>
    </div>
  )
}
