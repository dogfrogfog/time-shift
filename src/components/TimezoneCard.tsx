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

export default function TimezoneCard({
  isFirst,
  isLast,
  timezone,
  utc_offset,
  moveUp,
  moveDown,
  handleDelete
}) {
  const { selectedDate } = useContext(SelectionContext)

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
        <p className="font-semibold">
          {timezone} / UTC {utc_offset}
        </p>

        <SelectionArea id={timezone} items={sortHoursArray(selectedDate)} />
      </div>
    </div>
  )
}
