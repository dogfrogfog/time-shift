import Link from "next/link"
import { useContext } from "react"

import { convertToRFC5545Date } from "~lib/utils"

import ControlBar from "./ControlBar"
import { DatePicker } from "./DatePicker"
import { SelectionContext } from "./SelectionContext"
import TimezoneCard from "./TimezoneCard"
import TimezonesSelection from "./TimezonesSelection"

export default function Main() {
  const { selectedIndexes, selectedDate } = useContext(SelectionContext)

  const meetingStartDate = new Date(selectedDate)
  meetingStartDate.setHours(selectedIndexes[0])

  const meetingEndDate = new Date(selectedDate)
  meetingEndDate.setHours(selectedIndexes[selectedIndexes.length - 1] + 1)

  const googleMeetParams = new URLSearchParams({
    text: "New meeting",
    details:
      "Please, leave a 3 clicks feedback when you finish your thing. https://feedback.something",
    dates: `${convertToRFC5545Date(meetingStartDate)}/${convertToRFC5545Date(meetingEndDate)}`,
    ctz: Intl.DateTimeFormat().resolvedOptions().timeZone
  }).toString()

  const googleCalendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?${googleMeetParams}`

  return (
    <div className="bg-gray-200 w-[800px] min-h-[450px]">
      <div className="p-2">
        <ControlBar />
        <div className="my-2 flex justify-end gap-2 items-center">
          <Link
            href={googleCalendarUrl}
            className="cursor-pointer bg-white p-2 rounded hover:bg-yellow-400 transition-all"
            target="_blank">
            Schedule in Google Calendar
          </Link>
          <DatePicker />
        </div>

        <div className="mb-2">
          {/* @ts-ignore */}
          <TimezoneCard
            moveUp={undefined}
            moveDown={undefined}
            timezone={"default"}
            selfTime={selectedDate.toLocaleString("en-UK")}
          />
        </div>

        <TimezonesSelection />
      </div>
    </div>
  )
}
