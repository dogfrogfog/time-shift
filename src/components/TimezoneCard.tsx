import {
  ArrowDownIcon,
  ArrowUpIcon,
  HomeIcon,
  TrashIcon
} from "@radix-ui/react-icons"

import { Button } from "./Button"
import SelectionArea from "./SelectionArea"

export default function TimezoneCard({
  isFirst,
  isLast,
  timezone,
  utc_offset,
  moveUp,
  moveDown,
  handleDelete
}) {
  return (
    <div
      className="flex gap-4 rounded bg-white p-2 relative pl-4"
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

        <SelectionArea
          id={timezone}
          items={[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 0
          ]}
        />
      </div>
    </div>
  )
}
