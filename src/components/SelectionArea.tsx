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
        backgroundColor: "green",
        opacity: 0.5
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
      <div
        id={`elements-container-${id}`}
        className="flex gap-2 border-2 rounded-md border-white px-4 py-8"
        ref={elementsContainerRef}>
        {Array.from(items, (_, i) => (
          <div
            key={i}
            className={cn("border-2 border-black w-16 h-16", {
              "bg-yellow-300": selectedIndexes.includes(i)
            })}
          />
        ))}
      </div>
    </div>
  )
}
