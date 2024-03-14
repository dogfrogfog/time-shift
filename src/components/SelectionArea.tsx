import {
  boxesIntersect,
  useSelectionContainer
} from "@air/react-drag-to-select"
import { useEffect, useRef, useState } from "react"

import { cn } from "~lib/utils"

export default function SelectionArea({
  id,
  items
}: {
  id: string
  items: any[]
}) {
  const [selectionBox, setSelectionBox] = useState<any>()
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const selectableItems = useRef<any[]>([])
  const elementsContainerRef = useRef<HTMLDivElement | null>(null)

  console.log()

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

      setSelectionBox(scrollAwareBox)
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
  }, [])

  return (
    <div className="relative">
      <DragSelection />
      <div className="flex gap-1 rounded" ref={elementsContainerRef}>
        {Array.from(items, (v, i) => (
          <div
            key={i}
            className={cn(
              "min-w-[24px] text-center rounded text-xs font-semibold bg-gray-100 p-1",
              {
                "bg-yellow-300": selectedIndexes.includes(i)
              }
            )}>
            {v}
          </div>
        ))}
      </div>
    </div>
  )
}
