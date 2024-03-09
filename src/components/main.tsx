import { useStorage } from "@plasmohq/storage/hook"

import ControlBar from "./ControlBar"
import Header from "./Header"

export default function Main() {
  const [tz, setTz] = useStorage("serial-number", "")

  const setToStorage = async (value: string) => {
    setTz(value)

    const a = await fetch(`http://worldtimeapi.org/api/timezone/${value}`)

    setTz(JSON.stringify(await a.json()))
  }

  return (
    <div className="w-[600px] h-[400px] bg-gray-200">
      <Header />
      {tz}
      <div className="px-2 py-4">
        <ControlBar setToStorage={setToStorage} />
      </div>
    </div>
  )
}
