import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient()

export const fetchSavedTz = async (selectedTimezones) => {
  console.log(selectedTimezones)
  if (selectedTimezones.length === 0) return []

  const timezonePromises = selectedTimezones.map((tz) =>
    fetch(`http://worldtimeapi.org/api/timezone/${tz}`)
  )

  try {
    console.log("Start fetching timezones⏳")
    const timezoneResponses = await Promise.all(timezonePromises)

    const timezoneData = await Promise.all(
      timezoneResponses.map((response) => response.json())
    )

    console.log("Finish fetching timezones✅")
    return timezoneData.map((tz) => ({
      ...tz
    }))
  } catch (e) {
    console.log("Error fetching timezones🛑")
    console.log(e)
  }
}
