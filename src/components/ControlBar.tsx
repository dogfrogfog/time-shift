import { Combobox, Transition } from "@headlessui/react"
import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusIcon
} from "@heroicons/react/20/solid"
import { Fragment, useState, useTransition } from "react"

import { cn } from "~lib/utils"

import groupedTimezones from "../data/timezones.json"

export default function Example({ saveTz, tzStorage }) {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState("")
  const [filteredTz, setFilteredTz] = useState([])
  const [_, startTransition] = useTransition()

  const isCurrentValuesSavedToStorage = tzStorage?.selectedTz
    ?.map((tz) => tz.timezone)
    .includes(selected)

  const timezonesArray = groupedTimezones.timezones.reduce((acc, group) => {
    const timezoneWithGroup = group.zones.map((v) => ({
      ...v,
      group: group.group
    }))
    return [...acc, ...timezoneWithGroup]
  }, [])

  const handleChange = (event) => {
    const search = event.target.value
    const normSearch = search.toLowerCase().replace(/\s+/g, "")

    setQuery(search)
    startTransition(() => {
      setFilteredTz(
        timezonesArray.filter(
          (tz) =>
            tz.name.toLowerCase().includes(normSearch) ||
            tz.group.toLowerCase().includes(normSearch) ||
            tz.value.toLowerCase().includes(normSearch)
        )
      )
    })
  }

  const handleSaveTz = () => {
    if (!isCurrentValuesSavedToStorage) {
      saveTz(selected)
    }
  }

  const correctTz = query === "" ? timezonesArray : filteredTz

  return (
    <div className="w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default">
            <Combobox.Input
              placeholder="Search by city or timezone name..."
              className="rounded w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline outline-gray-300 outline-2"
              onChange={handleChange}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}>
            <Combobox.Options className="z-10 box-shadow absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredTz.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                correctTz.map((tz) => (
                  <Combobox.Option
                    key={tz.value + tz.name + tz.group}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-gray-200" : ""
                      }`
                    }
                    value={tz.value}>
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}>
                          {tz.name} - {tz.group}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3`}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <button
        disabled={isCurrentValuesSavedToStorage}
        aria-disabled={isCurrentValuesSavedToStorage}
        onClick={handleSaveTz}
        className={cn(
          "text-left mt-2 py-1 px-3 rounded-md bg-white w-full text-xs focus:outline active:shadow-md outline-yellow-300 outline-2 leading-3",
          {
            "opacity-35 pointer-events-none": isCurrentValuesSavedToStorage
          }
        )}>
        {isCurrentValuesSavedToStorage
          ? "Selected timezone is already saved"
          : "Save timezone"}
      </button>
    </div>
  )
}
