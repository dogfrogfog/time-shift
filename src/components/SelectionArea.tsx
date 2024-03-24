import {
  boxesIntersect,
  useSelectionContainer
} from "@air/react-drag-to-select"
import { useContext, useEffect, useRef, type ReactNode } from "react"

import { cn } from "~lib/utils"

import { SelectionContext } from "./SelectionContext"

export default function SelectionArea({
  id,
  items,
  zeroCellDate
}: {
  id: string
  items: any[]
  zeroCellDate: any
}) {
  const { selectedIndexes, setSelectedIndexes, activeHourIndex } =
    useContext(SelectionContext)
  const selectableItems = useRef<any[]>([])
  const elementsContainerRef = useRef<HTMLDivElement | null>(null)

  // console.log(selectedIndexes, setSelectedIndexes)

  const { DragSelection } = useSelectionContainer({
    eventsElement: document.getElementById(`elements-container-${id}`),
    onSelectionChange: (box) => {
      /**
       * Here we make sure to adjust the box's left and top with the scroll position of the window
       * @see https://github.com/AirLabsTeam/react-drag-to-select/#scrolling
       */
      const scrollAwareBox = {
        ...box,
        top: box.top + window.scrollY,
        left: box.left + window.scrollX
      }

      const indexesToSelect: number[] = []
      selectableItems.current.forEach((item, index) => {
        if (boxesIntersect(scrollAwareBox, item)) {
          indexesToSelect.push(index)
        }
      })

      setSelectedIndexes(indexesToSelect)
    },
    onSelectionStart: () => {},
    onSelectionEnd: () => {},
    selectionProps: {
      style: {
        borderRadius: 4,
        backgroundColor: "yellow",
        opacity: 0.5,
        border: "1px solid yellow"
      }
    },
    shouldStartSelecting: (target) => {
      // do something with target to determine if the user should start selecting

      return true
    }
  })

  useEffect(() => {
    if (elementsContainerRef.current) {
      Array.from(elementsContainerRef.current.children).forEach((item) => {
        const { left, top, width, height } = item.getBoundingClientRect()
        selectableItems.current.push({
          left,
          top,
          width,
          height
        })
      })
    }

    setSelectedIndexes([])
  }, [])

  return (
    <div className="relative">
      <DragSelection />
      <div className="flex rounded gap-1" ref={elementsContainerRef}>
        {Array.from(items, (v, i) => (
          <div
            key={i}
            className={cn(
              "w-[30px] rounded text-center text-xs flex items-center justify-center odd:bg-gray-50 font-semibold bg-gray-100 p-1",
              {
                "bg-yellow-300 odd:bg-yellow-200": selectedIndexes.includes(i),
                "bg-gradient-to-r from-gray-500 to-bg-gray-100": v === 0,
                "!bg-green-300": activeHourIndex === i,
                "!bg-lime-400":
                  activeHourIndex === i && selectedIndexes.includes(i)
                // "bg-green-200": v === currentHour
              }
            )}>
            {v === 0 ? zeroCellDate : v}
          </div>
        ))}
      </div>
    </div>
  )
}
