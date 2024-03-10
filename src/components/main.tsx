import { useStorage } from "@plasmohq/storage/hook"

import ControlBar from "./ControlBar"
import Header from "./Header"

export default function Main() {
  const [tzStorage, setTzToStorage] = useStorage("saved-tz")

  const saveTz = async (value: string) => {
    const response = await fetch(
      `http://worldtimeapi.org/api/timezone/${value}`
    )

    const data = await response.json()
    const current = tzStorage?.selectedTz || []

    // setTzToStorage({ selectedTz: [] })
    setTzToStorage({ selectedTz: current.concat([data]) })
  }

  console.log(tzStorage)

  return (
    <div className="w-[600px] h-[400px] bg-gray-200">
      <Header />
      <div className="p-2">
        <ControlBar tzStorage={tzStorage} saveTz={saveTz} />
        <div className="mt-8">
          Saved timezones: {tzStorage?.selectedTz?.length || 0}
        </div>
        <div className="flex flex-col">
          {tzStorage?.selectedTz?.map((tz, index) => (
            <div key={index} className="flex justify-between">
              <div>{tz.timezone}</div>
              <div>{tz.datetime}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
