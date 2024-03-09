import { useState } from "react"

import ControlBar from "./ControlBar"
import Header from "./Header"

export function Main({ name = "Extension" }) {
  const [data, setData] = useState("")

  return (
    <div className="w-[600px] h-[400px] bg-gray-200">
      <Header />
      <div className="px-2 py-4">
        <ControlBar />
      </div>
    </div>
  )
}
