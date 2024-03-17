import {
  ArrowDownIcon,
  ArrowUpIcon,
  HomeIcon,
  TrashIcon
} from "@radix-ui/react-icons"
import { useContext } from "react"

import { sortHoursArray } from "../lib/utils"
import { Button } from "./Button"
import SelectionArea from "./SelectionArea"
import { SelectionContext } from "./SelectionContext"

const shortMonthsArray = [
  "", // Placeholder for index 0
  "Jan", // Month 1
  "Feb", // Month 2
  "Mar", // Month 3
  "Apr", // Month 4
  "May", // Month 5
  "Jun", // Month 6
  "Jul", // Month 7
  "Aug", // Month 8
  "Sep", // Month 9
  "Oct", // Month 10
  "Nov", // Month 11
  "Dec" // Month 12
]

export default function TimezoneCard({
  isFirst,
  isLast,
  timezone,
  moveUp,
  moveDown,
  handleDelete
}) {
  const { selectedDate } = useContext(SelectionContext)
  console.log(selectedDate)

  const timezoneTime = selectedDate.toLocaleString("en-UK", {
    timeZone: timezone
  })

  console.log(timezoneTime, selectedDate.getDate)

  const dayOfMonthRegExp = /^(\d{2})/
  const match1 = timezoneTime.match(dayOfMonthRegExp)

  const monthRegExp = /\/(\d{2})\//
  const match2 = timezoneTime.match(monthRegExp)

  const day = parseInt(match1[1]) + 1
  const month = parseInt(match2[1])

  return (
    <div
      className="cursor-grab flex gap-4 rounded bg-white p-2 relative pl-4"
      id={`elements-container-${timezone}`}>
      <div className="flex flex-col gap-2 justify-center items-center">
        {isFirst ? (
          <Button disabled={""} className="" styleName={"ghost"}>
            <HomeIcon className="" />
          </Button>
        ) : (
          <>
            <Button
              disabled={""}
              className=""
              styleName={"ghost"}
              onClick={moveUp}>
              <ArrowUpIcon />
            </Button>
            <Button
              className=""
              disabled={isLast}
              styleName={"ghost"}
              onClick={moveDown}>
              <ArrowDownIcon />
            </Button>
          </>
        )}
      </div>
      <Button
        disabled={""}
        className="absolute top-2 right-2 w-auto p-1"
        styleName={"danger"}
        onClick={handleDelete}>
        <TrashIcon />
      </Button>

      <div className="space-y-2 grow overflow-scroll -mr-2 pr-2">
        <p className="font-semibold">{timezone}</p>

        <SelectionArea
          id={timezone}
          zeroCellDate={(isIndex) => (
            <div className="flex flex-col text-[10px] leading-[10px]">
              <span>{isIndex ? day - 1 : day}</span>
              <span>{shortMonthsArray[month]}</span>
            </div>
          )}
          items={sortHoursArray(timezoneTime)}
        />
      </div>
    </div>
  )
}
