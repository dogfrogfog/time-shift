import { CalendarIcon } from "@heroicons/react/20/solid"
import { useContext } from "react"

import { Button } from "~components/ui/button"
import { Calendar } from "~components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "~components/ui/popover"
import { cn } from "~lib/utils"

import { SelectionContext } from "./SelectionContext"

export function DatePicker() {
  const { selectedDate, setSelectedDate } = useContext(SelectionContext)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            `${selectedDate.toLocaleDateString("en", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}`
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  )
}
