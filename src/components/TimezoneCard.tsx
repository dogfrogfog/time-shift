import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons"

import { Button } from "./Button"

export default function TimezoneCard({ timezone, utc_offset }) {
  return (
    <div className="flex gap-2 rounded bg-white p-2">
      <div className="flex flex-col gap-2 justify-center items-center">
        <Button disabled={""} className="" styleName={"ghost"}>
          <ArrowUpIcon />
        </Button>
        <Button className="" disabled={""} styleName={"ghost"}>
          <ArrowDownIcon />
        </Button>
      </div>
      <div className="space-y-2 grow overflow-scroll -mr-2 pr-2">
        <p className="font-semibold">
          {timezone} / UTC {utc_offset}
        </p>
        <div className="w-full rounded flex gap-1">
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 0
          ].map((v) => (
            <div
              key={v}
              className="min-w-[24px] text-center rounded text-xs font-semibold bg-gray-100 p-1">
              {v}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
